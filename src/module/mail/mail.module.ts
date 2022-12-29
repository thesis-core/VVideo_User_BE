import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/repository/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MailerModule.forRoot({
            // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
            // or
            transport: {
                host: process.env.MAIL_HOST,
                secure: false,
                auth: {
                    type: 'OAuth2',
                    user: 'thai.nt05112000@gmail.com',
                    clientId: process.env.MAIL_USER,
                    clientSecret: process.env.MAIL_PASSWORD,
                    refreshToken: process.env.MAIL_REFRESH,
                    accessToken: process.env.MAIL_ACCESS,
                },
            },
            defaults: {
                from: process.env.MAIL_FROM,
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [MailController],
    providers: [MailService, UserRepository],
    exports: [MailService], // 👈 export for DI
})
export class MailModule {}
