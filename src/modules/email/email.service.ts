import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

const configService = new ConfigService();
@Injectable()
export class EmailService {
  private nodemailerTrasport: Mail;
  constructor() {
    this.nodemailerTrasport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTrasport.sendMail(options);
  }
}
