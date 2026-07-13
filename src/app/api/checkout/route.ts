import { NextRequest, NextResponse } from 'next/server';
import { PRICE_IDS } from '@/lib/stripe/client';

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json() as { plan: string };

    if (!['monthly', 'quarterly', 'yearly'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // TODO: Uncomment when Stripe is configured
    /*
    const stripe = getStripe();
    const origin = request.headers.get('origin') ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cenik`,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
    */

    return NextResponse.json({
      message: 'Stripe není nakonfigurován. Nastavte STRIPE_SECRET_KEY a price IDs v .env',
      plan,
      priceId: PRICE_IDS[plan],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
