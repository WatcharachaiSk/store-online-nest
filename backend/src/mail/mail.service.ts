import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/sent-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from 'dotenv'

config()
const { MAILER_SENT } = process.env
@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService
  ) { }

  async sendMail(sendMailDto: SendMailDto) {
    try {
      await this.mailService.sendMail({
        to: MAILER_SENT,
        from: sendMailDto.from,
        subject: sendMailDto.subject,
        text: sendMailDto.text
      })
      return sendMailDto
    } catch (error) {
      console.log(error);
    }

  }
}
