import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { MailDto } from 'src/common.dto';

@Injectable()
export class MailService {
    private readonly nodemailer = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS,
      },
    })

  sendSingleEmail(payload: MailDto) {
    return this.nodemailer.sendMail(payload);
  }
}
