import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../user/repository/user.repository';

import * as generator from 'generate-password';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService, private readonly userRepository: UserRepository) {}

    async sendForgotPasswordEmail(email: string): Promise<void> {
        const user = await this.userRepository.findOneBy({ email: email });
        if (!user) {
            throw new BadRequestException({ message: 'User is not existed' });
        }
        const newPassword = generator.generate({
            length: 10,
            numbers: true,
        });
        user.password = newPassword;
        await this.userRepository.save(user);
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Nice App! Confirm your Email',
            template: './confirmation.hbs',
            context: {
                email: email,
                password: newPassword,
            },
        });
    }
}
