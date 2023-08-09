import { Field, InputType } from '@nestjs/graphql';
import { number } from 'joi';

@InputType()
export class CreateAppointmentInput {
  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field(() => [String])
  services_ids: string[];

  @Field(() => Number)
  salon_id: number;
}
