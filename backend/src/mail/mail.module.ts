import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { config } from 'dotenv'
import { MailerModule } from '@nestjs-modules/mailer';

config()
const { MAILER_HOST, MAILER_PORT, MAILER_USERNAME, MAILER_PASSWORD } = process.env
@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: MAILER_HOST,
      port: MAILER_PORT,
      secure: true,
      auth: {
        user: MAILER_USERNAME,
        pass: MAILER_PASSWORD
      },
    }
  })],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule { }
