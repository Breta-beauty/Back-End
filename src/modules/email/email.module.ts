import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { EmailConfirmationService } from './email-confirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [EmailResolver, EmailService, EmailConfirmationService],
})
export class EmailModule {}
