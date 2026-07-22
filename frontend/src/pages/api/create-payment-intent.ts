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
    const { items = [], shipping = 0, email = '' } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const lineItems = items.map((item: any) => ({
      quantity: Number(item.quantity ?? 1),
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(Number(item.product?.price ?? 0) * 100),
        product_data: {
          name: String(item.product?.name ?? 'Forma Atelier item'),
          images: Array.isArray(item.product?.images) ? item.product.images.slice(0, 1) : [],
        },
      },
    }));

    if (Number(shipping) > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(Number(shipping) * 100),
          product_data: {
            name: 'Envío',
            images: [],
          },
        },
      });
    }

    const returnUrl = new URL('/success?session_id={CHECKOUT_SESSION_ID}', request.url).toString();

    // ui_mode: 'elements' is required for CheckoutElementsProvider / Custom Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'elements',
      customer_email: email || undefined,
      line_items: lineItems,
      return_url: returnUrl,
      automatic_tax: { enabled: false },
      shipping_address_collection: { allowed_countries: ['ES'] },
    });

    if (!session.client_secret) {
      throw new Error('Stripe did not return a client_secret for the session');
    }

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Stripe] Error creating checkout session:', err?.message);
    return new Response(
      JSON.stringify({ error: 'Checkout session creation failed', detail: err?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
