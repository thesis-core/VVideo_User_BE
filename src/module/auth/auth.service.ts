import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
    private refreshTokenConfig = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        secret: process.env.REFRESH_TOKEN_SECRET,
    };

    constructor(
        private usersService: UserService,
        @InjectRepository(User) private usersRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.usersRepository.findOneBy({ email: email });
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new ForbiddenException({ message: 'UnAuthorized' });
        }
        return {
            id: user.id,
            email: user.email,
        };
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.usersRepository.findOne({
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
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, this.refreshTokenConfig),
        };
    }

    async signUp(signUpDt: SignUpDto): Promise<any> {}
    async getAccessToken(refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        let refreshTokenDecode;
        try {
            refreshTokenDecode = await this.jwtService.verify(refreshToken, this.refreshTokenConfig);
        } catch (e) {
            throw new UnauthorizedException({ message: 'INVALID_TOKEN' });
        }
        return {
            access_token: this.jwtService.sign(refreshTokenDecode),
        };
    }
}
