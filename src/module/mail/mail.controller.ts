import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@Controller('mail')
@ApiTags('mail')
export class MailController {
    constructor(private mailService: MailService) {}

    @Get()
    async testFilmGroup() {
        return this.mailService.sendForgotPasswordEmail();
    }
}
