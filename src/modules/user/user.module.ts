import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule, JwtModule, ConfigModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
