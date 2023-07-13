import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { Appointment } from './entities/appointment.entity';

import { AppointmentService } from './appointment.service';

import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Mutation(() => Appointment)
  createAppointment(
    @Args('profile_id') profile_id: string,
    @Args('createAppointmentInput')
    createAppointmentInput: CreateAppointmentInput,
  ) {
    return this.appointmentService.create(profile_id, createAppointmentInput);
  }

  @Query(() => [Appointment], { name: 'appointment' })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Mutation(() => Appointment)
  updateAppointment(
    @Args('profile_id', { type: () => ID }) appointment_id: number,
    @Args('updateAppointmentInput')
    updateAppointmentInput: UpdateAppointmentInput,
  ) {
    return this.appointmentService.update(
      appointment_id,
      updateAppointmentInput,
    );
  }

  @Mutation(() => Appointment)
  removeAppointment(
    @Args('appointment_id', { type: () => ID }) appointment_id: number,
  ) {
    return this.appointmentService.remove(appointment_id);
  }
}
