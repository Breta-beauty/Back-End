import { InputType, Field } from '@nestjs/graphql';
import { passwordMiddleware } from 'src/middleware/password/password.middleware';

@InputType()
export class CreatePaymentInput {
  @Field()
  name: string;

  @Field({ middleware: [passwordMiddleware] })
  password: string;
}
