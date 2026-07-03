import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-06-24.dahlia',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount < 50) {
    return res.status(400).json({ error: 'Invalid amount (minimum 0.50 €)' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // in cents
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error('[Stripe] Error creating payment intent:', err?.message);
    return res.status(500).json({ error: 'Payment intent creation failed' });
  }
}
