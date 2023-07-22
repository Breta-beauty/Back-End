import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class StripeChargeInput {
  @Field(() => Int)
  @IsNumber()
  amount: number;

  @Field()
  @IsString()
  paymentMethodId: string;
}
