import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  configOptions = {
    host: "smtp.example.com",
    port: 587,
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2"
    }
  }

  async sendMail(params: any) {

  }
}
