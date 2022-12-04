import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { MongoOutboxModule } from 'nest-outbox-typeorm';
import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET,
            signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
        }),
        MongoOutboxModule,
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy, FacebookStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
