import { CreateAppointmentInput } from './create-appointment.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentInput extends PartialType(
  CreateAppointmentInput,
) {}
