import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { MongoEventDispatcher, MongoOutboxEvent } from 'nest-outbox-typeorm';
import { SignUpEvent } from './event/signUp.event';
import { Request } from 'express';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class AuthService {
    private refreshTokenConfig = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        secret: process.env.REFRESH_TOKEN_SECRET,
    };

    constructor(
        private usersService: UserService,
        @InjectRepository(User) private userRepository: UserRepository,
        private jwtService: JwtService,
        private entityManager: EntityManager,
        private mongoEventDispatcher: MongoEventDispatcher,
    ) {}

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.userRepository.findOneBy({ email: email });
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new ForbiddenException({ message: 'UnAuthorized' });
        }
        return {
            _id: user._id,
            email: user.email,
        };
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email,
            },
        });
        if (!user) {
            throw new BadRequestException({ message: 'User is not exist' });
        }
        const comparePassword = await bcrypt.compare(loginUserDto.password, user.password);
        if (!comparePassword) {
            throw new ForbiddenException({ message: 'Password was wrong' });
        }
        const payload = { email: user.email, id: user._id };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, this.refreshTokenConfig),
        };
    }

    async facebookLogin(req: Request): Promise<any> {
        const user: any = req.user as any;
        const exist = await this.userRepository.findOneBy({ email: user.email });
        let payload;
        if (!exist) {
            let newUser = new User();
            if (user.email) {
                newUser.email = user.email;
            }
            newUser.fullName = user.firstName + ' ' + user.lastName;
            newUser.avatarUrl = user.avatarUrl;
            newUser.facebookId = user.facebookId;
            await this.entityManager.transaction(async (tx) => {
                newUser = await tx.save(newUser);
                await this.mongoEventDispatcher.onDomainEvent(
                    new SignUpEvent(
                        newUser._id.toString(),
                        'UserFacebookCreated',
                        newUser as unknown as Record<string, unknown>,
                    ),
                    async (outbox) => {
                        const outboxRecord = await tx.save(outbox);
                        await tx.delete(MongoOutboxEvent, { id: outboxRecord.id });
                    },
                );
            });
            payload = { email: newUser.email, id: newUser._id };
        } else {
            payload = { email: exist.email, id: exist._id };
        }
        if (exist && !exist.facebookId) {
            exist.facebookId = user.facebookId;
            await this.entityManager.transaction(async (tx) => {
                const newUser = await tx.save(exist);
                await this.mongoEventDispatcher.onDomainEvent(
                    new SignUpEvent(
                        newUser._id.toString(),
                        'UserFacebookCreated',
                        newUser as unknown as Record<string, unknown>,
                    ),
                    async (outbox) => {
                        const outboxRecord = await tx.save(outbox);
                        await tx.delete(MongoOutboxEvent, { id: outboxRecord.id });
                    },
                );
            });
        }
        return {
            // facebook_access_token: req.user.accessToken ,
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, this.refreshTokenConfig),
        };
    }
    async signUp(signUpDto: SignUpDto): Promise<void> {
        const { email, password, fullName, avatarUrl } = signUpDto;
        const exist = await this.userRepository.findOneBy({ email: email });
        if (exist) {
            throw new BadRequestException('User is existed');
        }
        const user = new User();
        user.email = email;
        user.password = password;
        user.fullName = fullName;
        if (avatarUrl) {
            user.avatarUrl = avatarUrl;
        }
        await this.entityManager.transaction(async (tx) => {
            const newUser = await tx.save(user);
            await this.mongoEventDispatcher.onDomainEvent(
                new SignUpEvent(newUser._id.toString(), 'UserCreated', newUser as unknown as Record<string, unknown>),
                async (outbox) => {
                    const outboxRecord = await tx.save(outbox);
                    await tx.delete(MongoOutboxEvent, { id: outboxRecord.id });
                },
            );
        });
    }

    async getAccessToken(refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        let refreshTokenDecode;
        try {
            refreshTokenDecode = await this.jwtService.verify(refreshToken, this.refreshTokenConfig);
            const payload = { email: refreshTokenDecode.email, id: refreshTokenDecode.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (e) {
            throw new ForbiddenException({ message: 'INVALID_TOKEN' });
        }
    }

    async changePassword(changePasswordDto: ChangePasswordDto, req: Request): Promise<void> {
        const user: Partial<User> = req.user;
        const exist = await this.userRepository.findOneBy({ email: user.email });
        const comparePassword = await bcrypt.compare(changePasswordDto.oldPassword, exist.password);
        if (!comparePassword) {
            throw new BadRequestException({ message: 'Old password is wrong' });
        }
        exist.password = changePasswordDto.newPassword;
        await this.userRepository.save(exist);
    }
}
