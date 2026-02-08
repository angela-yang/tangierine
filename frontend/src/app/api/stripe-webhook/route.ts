import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const signature = (await headersList).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const userId = session.metadata?.userId;
      const cartItems = JSON.parse(session.metadata?.cartItems || '[]');

      if (!userId || !cartItems.length) {
        throw new Error('Missing metadata');
      }

      // Create orders in database
      const orders = cartItems.map((item: any) => ({
        user_id: userId,
        product_name: item.product_name,
        product_image: item.product_image,
        price: item.price * item.quantity,
        stripe_session_id: session.id,
        payment_status: 'paid',
      }));

      const { error: orderError } = await supabaseAdmin
        .from('orders')
        .insert(orders);

      if (orderError) throw orderError;

      // Clear the user's cart
      const { error: cartError } = await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

      if (cartError) throw cartError;

      console.log('✅ Order created and cart cleared for user:', userId);
    } catch (error) {
      console.error('Error processing payment:', error);
      return NextResponse.json({ error: 'Order creation failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}