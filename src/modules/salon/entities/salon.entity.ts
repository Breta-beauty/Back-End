import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Salon {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
