import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import VerificationTokenPayload from './interfaces/verificationTokenPayload.interface';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  public sendVerificationLink(email: string, name: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;
    const text = `Welcome to Breta. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
      html: `<html>
              <h1>Hello ${name}!</h1>
              <p>Click in the link below to verify your email account</p>
              <form action="http://127.0.0.1:3000/?token=${token}">
                <input type="submit" value="Click Here" />
              </form>
            </html>`,
    });
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
