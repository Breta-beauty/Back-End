import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { StripeChargeInput } from './dto/stripe-charge.input';
import { CreatePaymentInput } from './dto/create-payment.input';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation()
  stripeCharge(
    @Args('stripe_customer_id') stripeCustomerID: string,
    @Args('stripeChargeInput') stripeChargeInput: StripeChargeInput,
  ) {
    return this.paymentsService.stripeCharge(
      stripeChargeInput.amount,
      stripeChargeInput.paymentMethodId,
      stripeCustomerID,
    );
  }

  @Mutation()
  middlewareTest(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return createPaymentInput;
  }
}
