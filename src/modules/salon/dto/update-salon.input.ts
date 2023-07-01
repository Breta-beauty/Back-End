import { CreateSalonInput } from './create-salon.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSalonInput extends PartialType(CreateSalonInput) {
  @Field(() => Int)
  id: number;
}
