import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '../../lib/store/cartStore';
import { Button } from '../ui/Button';
import { createOrder } from '../../lib/api/orders';
import type { CartItem } from '../../lib/types';

const STRIPE_PK = import.meta.env.PUBLIC_STRIPE_KEY ?? '';
const stripePromise = STRIPE_PK ? loadStripe(STRIPE_PK) : null;

const stripeAppearance = {
  theme: 'flat' as const,
  variables: {
    colorPrimary: '#0A0A0A',
    colorBackground: '#FFFFFF',
    colorText: '#0A0A0A',
    colorDanger: '#c0392b',
    borderRadius: '0px',
    spacingUnit: '4px',
    fontSizeBase: '14px',
  },
  rules: {
    '.Input': { border: '1px solid #E8DDD0', padding: '12px 16px', height: '48px' },
    '.Input:focus': { border: '1px solid #0A0A0A', boxShadow: 'none' },
    '.Label': {
      fontSize: '10px', textTransform: 'uppercase' as const,
      letterSpacing: '0.12em', color: '#6B5D52', fontWeight: '400', marginBottom: '6px',
    },
  },
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

interface InnerProps {
  form: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  items: CartItem[];
  total: number;
  shipping: number;
  grandTotal: number;
}

// ─── Inner form — must be a child of <Elements> to use Stripe hooks ───────────
function CheckoutInner({ form, onChange, items, total, shipping, grandTotal }: InnerProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setError(null);


    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        payment_method_data: {
          billing_details: {
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            address: {
              line1: form.address,
              line2: '',      
              city: form.city,
              postal_code: form.zip,
              state: '',      
              country: 'ES',
            },
          },
        },
      },

      redirect: 'if_required',
    });

    if (stripeError) {
      setError(
        stripeError.type === 'card_error'
          ? (stripeError.message ?? 'Tarjeta rechazada.')
          : 'Ha ocurrido un error al procesar el pago. Por favor inténtalo de nuevo.'
      );
      setIsSubmitting(false);
      return;
    }


    try {
      const order = await createOrder({
        email: form.email,
        items,
        total: grandTotal,
        shipping,
        paymentIntentId: paymentIntent?.id ?? '',
        shipping_name: `${form.firstName} ${form.lastName}`.trim(),
        shipping_address: form.address,
        shipping_city: form.city,
        shipping_zip: form.zip,
      });

      sessionStorage.setItem('forma_order_id', order.id);
    } catch (err) {
      console.warn('[Checkout] Order save failed after payment:', err);

    }


    window.location.href = `/success?payment_intent=${paymentIntent?.id ?? ''}&redirect_status=succeeded`;
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 w-full">


      <div className="lg:col-span-7 flex flex-col gap-12 w-full">


        <section>
          <h2 className="font-display text-xl uppercase tracking-widest text-noir mb-6">1. Información de Envío</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName" className="font-body text-xs tracking-widest text-stone uppercase">Nombre</label>
              <input
                required id="firstName" name="firstName" type="text"
                value={form.firstName} onChange={onChange}
                placeholder="Ana" autoComplete="given-name"
                className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors placeholder:text-[#C4B8AC]"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastName" className="font-body text-xs tracking-widest text-stone uppercase">Apellidos</label>
              <input
                required id="lastName" name="lastName" type="text"
                value={form.lastName} onChange={onChange}
                placeholder="García Martínez" autoComplete="family-name"
                className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors placeholder:text-[#C4B8AC]"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 w-full">
              <label htmlFor="email" className="font-body text-xs tracking-widest text-stone uppercase">Correo Electrónico</label>
              <input
                required id="email" name="email" type="email"
                value={form.email} onChange={onChange}
                placeholder="ana@ejemplo.com" autoComplete="email"
                className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors placeholder:text-[#C4B8AC]"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 w-full">
              <label htmlFor="address" className="font-body text-xs tracking-widest text-stone uppercase">Dirección completa</label>
              <input
                required id="address" name="address" type="text"
                value={form.address} onChange={onChange}
                placeholder="Calle Mayor 12, 3º B" autoComplete="street-address"
                className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors placeholder:text-[#C4B8AC]"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="city" className="font-body text-xs tracking-widest text-stone uppercase">Ciudad</label>
              <input
                required id="city" name="city" type="text"
                value={form.city} onChange={onChange}
                placeholder="Barcelona" autoComplete="address-level2"
                className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors placeholder:text-[#C4B8AC]"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="zip" className="font-body text-xs tracking-widest text-stone uppercase">Código Postal</label>
              <input
                required id="zip" name="zip" type="text"
                value={form.zip} onChange={onChange}
                placeholder="08001" autoComplete="postal-code"
                pattern="[0-9]{5}" title="Introduce un código postal de 5 dígitos"
                className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors placeholder:text-[#C4B8AC]"
              />
            </div>
          </div>
        </section>


        <section>
          <h2 className="font-display text-xl uppercase tracking-widest text-noir mb-6">2. Pago Seguro</h2>
          <div className="p-6 border border-[#E8DDD0] bg-white w-full">
            <PaymentElement
              options={{
                layout: 'tabs',
                fields: { billingDetails: { address: 'never', name: 'never', email: 'never' } },
              }}
            />
            <p className="font-body text-[10px] text-[#C4B8AC] tracking-wider mt-4 leading-relaxed">
              Modo test — tarjeta:{' '}
              <span className="font-mono text-stone tracking-widest">4242 4242 4242 4242</span>
              {' '}· fecha futura · CVV cualquiera
            </p>
          </div>
        </section>

        {error && (
          <div className="p-4 border border-red-200 bg-red-50 text-red-700 font-body text-sm tracking-wider">
            {error}
          </div>
        )}
      </div>


      <div className="lg:col-span-5 w-full">
        <div className="bg-white p-8 border border-[#E8DDD0] sticky top-8">
          <h2 className="font-display text-xl uppercase tracking-widest text-noir mb-6">Tu Pedido</h2>

          <div className="flex flex-col gap-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 aspect-[3/4] bg-smoke flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-display text-sm uppercase tracking-widest text-noir">{item.product.name}</h3>
                  <p className="font-body text-xs text-stone tracking-wider mt-1">
                    Talla: {item.size} <span className="mx-2">|</span> Cantidad: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-end font-body text-sm text-noir">
                  {(item.product.price * item.quantity).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 mb-6 font-body text-sm tracking-wider border-t border-[#E8DDD0] pt-6">
            <div className="flex justify-between items-center text-stone">
              <span>Subtotal</span>
              <span className="text-noir">{total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center text-stone">
              <span>Envío</span>
              <span className="text-noir">{shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)} €`}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-noir mb-8">
            <div className="flex justify-between items-end font-body tracking-widest uppercase">
              <span className="text-sm text-noir">Total a pagar</span>
              <span className="text-2xl font-medium text-noir">{grandTotal.toFixed(2)} €</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-14 rounded-none text-xs flex items-center justify-center"
            disabled={isSubmitting || !stripe}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-ivory" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : 'Confirmar Pago'}
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[#8C7B6B]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="font-body text-[10px] uppercase tracking-widest">Transacción cifrada · Stripe</span>
          </div>
        </div>
      </div>
    </form>
  );
}

// ─── Outer wrapper — creates PaymentIntent, provides Elements context ─────────
export function CheckoutForm() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
  });

  useEffect(() => { setMounted(true); }, []);

  const total     = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping  = total > 0 ? (total > 200 ? 0 : 15) : 0;
  const grandTotal = total + shipping;


  useEffect(() => {
    if (!mounted || items.length === 0 || grandTotal <= 0) return;
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Math.round(grandTotal * 100) }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.clientSecret) setClientSecret(d.clientSecret);
        else setInitError('No se pudo inicializar el pago.');
      })
      .catch(() => setInitError('Error de conexión. Por favor, recarga la página.'));
  }, [mounted, items.length, grandTotal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-sm text-[#8C7B6B] tracking-widest uppercase mb-8">
          Tu cesta está vacía
        </p>
        <Button onClick={() => window.location.href = '/'}>Volver al inicio</Button>
      </div>
    );
  }

  if (initError) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-sm text-red-600 tracking-wider mb-6">{initError}</p>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg className="animate-spin h-6 w-6 text-stone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: stripeAppearance }}>
      <CheckoutInner
        form={form}
        onChange={handleChange}
        items={items}
        total={total}
        shipping={shipping}
        grandTotal={grandTotal}
      />
    </Elements>
  );
}
