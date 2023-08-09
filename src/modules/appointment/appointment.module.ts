import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from '../notifications/notifications.module';

import { Appointment } from './entities/appointment.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Service } from '../services/entities/service.entity';
import { Salon } from '../salon/entities/salon.entity';

import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Profile, Service, Salon]),
    NotificationsModule,
  ],
  providers: [AppointmentResolver, AppointmentService],
})
export class AppointmentModule {}
