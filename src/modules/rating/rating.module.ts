import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Rating } from './entities/rating.entity';
import { Salon } from '../salon/entities/salon.entity';
import { Profile } from '../profile/entities/profile.entity';

import { RatingService } from './rating.service';

import { RatingResolver } from './rating.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Salon, Profile])],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
