import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
      typescript: true,
    });
  }
  return stripeInstance;
}

export const PRICE_IDS: Record<string, string> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY ?? 'price_monthly',
  quarterly: process.env.STRIPE_PRICE_QUARTERLY ?? 'price_quarterly',
  yearly: process.env.STRIPE_PRICE_YEARLY ?? 'price_yearly',
};
