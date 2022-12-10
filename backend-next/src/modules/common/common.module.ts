import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MailService } from './mail/mail.service';

@Module({
  providers: [CommonService, MailService],
  exports: [MailService]
})
export class CommonModule { }
