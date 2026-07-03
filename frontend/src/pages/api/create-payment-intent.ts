import type { APIRoute } from 'astro';
import Stripe from 'stripe';

// This is an Astro API Route — portable across Vercel, Netlify, Node.js, etc.
// Change the adapter in astro.config.mjs to switch platforms (single line).
export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-06-24.dahlia' as any,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount || typeof amount !== 'number' || amount < 50) {
      return new Response(
        JSON.stringify({ error: 'Invalid amount (minimum 5 €)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // in euro cents
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
      JSON.stringify({ error: 'Payment intent creation failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
