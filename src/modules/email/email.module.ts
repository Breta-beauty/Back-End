import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

import { EmailConfirmationService } from './email-confirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [EmailService, EmailConfirmationService],
  exports: [EmailConfirmationService]
})
export class EmailModule {}
