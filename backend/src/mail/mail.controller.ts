import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/sent-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('')
  async sendMail(@Body() sendMailDto: SendMailDto) {
    return await this.mailService.sendMail(sendMailDto)

  }
}
