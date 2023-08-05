import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Salon } from './entities/salon.entity';
import { User } from '../user/entities/user.entity';

import { SalonService } from './salon.service';

import { SalonResolver } from './salon.resolver';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([Salon, User]), AddressModule],
  providers: [SalonResolver, SalonService],
  exports: [SalonService],
})
export class SalonModule {}
