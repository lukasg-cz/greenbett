import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.text();

  // TODO: Uncomment when Stripe webhook is configured
  /*
  const stripe = getStripe();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook error';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan ?? 'monthly';

      if (userId) {
        await supabase.from('subscriptions').insert({
          user_id: userId,
          plan,
          status: 'active',
          stripe_subscription_id: session.subscription as string,
          stripe_customer_id: session.customer as string,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
        });
      }
      break;
    }
    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;

      await supabase.from('subscriptions')
        .update({
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
        })
        .eq('stripe_subscription_id', subscriptionId);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const status = subscription.status === 'active' ? 'active' :
        subscription.status === 'past_due' ? 'past_due' : 'canceled';

      await supabase.from('subscriptions')
        .update({ status })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase.from('subscriptions')
        .update({ status: 'expired' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
  }
  */

  console.log('[Stripe Webhook] Received event (mock mode)', body.slice(0, 100));

  return NextResponse.json({ received: true });
}
