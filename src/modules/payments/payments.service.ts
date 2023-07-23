import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  public async createStripeCustomer(
    name: string,
    email: string,
    type: 'customer' | 'owner',
  ) {
    if (type !== 'customer') return;

    return this.stripe.customers.create({
      name,
      email,
    });
  }

  public async deleteStripeCustomer(stripeCustomerId: string) {
    return this.stripe.customers.del(stripeCustomerId);
  }

  public async stripeCharge(
    amount: number,
    paymentMethodId: string,
    stripeCustomerId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY'),
      confirm: true,
    });
  }
}
