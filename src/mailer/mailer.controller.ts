import { Body, Controller, Post, Query } from '@nestjs/common';
import { MailerService } from './mailer.service';
@Controller('mailer')
export class MailerController {
    constructor(private mailerService:MailerService){}

    @Post('sendMails')
    sendMails(@Query('user') name,@Query('pass') pass,@Body() body){
        return this.mailerService.sendMails(name,pass,body);
    }
}
