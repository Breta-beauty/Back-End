import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  date: Date;

  @Field(() => [String], { nullable: true })
  services_ids: string[];
}
