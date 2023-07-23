import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { Payment } from './entities/payment.entity';

import { PaymentsService } from './payments.service';

import { StripeChargeInput } from './dto/stripe-charge.input';
import { PaymentResponse } from './dto/payment.response';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => PaymentResponse)
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
}
