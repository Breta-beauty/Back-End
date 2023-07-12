import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';

import { User } from './entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';

import { UserService } from './user.service';

import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    EmailModule,
    JwtModule,
    ProfileModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
