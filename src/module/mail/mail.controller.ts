import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';

@Controller('mail')
@ApiTags('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @Post()
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        return this.mailService.sendForgotPasswordEmail(forgotPasswordDto.email);
    }
}
