import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const secretKey = import.meta.env.STRIPE_SECRET_KEY ?? '';

  if (!secretKey) {
    console.error('[Stripe] STRIPE_SECRET_KEY is not set in environment variables');
    return new Response(
      JSON.stringify({ error: 'Stripe secret key is not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const stripe = new Stripe(secretKey);

  try {
    const body = await request.json();
    const { amount } = body;

    const amountNum = Number(amount);
    if (!amountNum || amountNum < 50) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount (minimum 0.50 €)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountNum),
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Stripe] Error creating payment intent:', err?.message);
    return new Response(
      JSON.stringify({ error: 'Payment intent creation failed', detail: err?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
