import { Module } from '@nestjs/common';
import { SalonService } from './salon.service';
import { SalonResolver } from './salon.resolver';

@Module({
  providers: [SalonResolver, SalonService]
})
export class SalonModule {}
