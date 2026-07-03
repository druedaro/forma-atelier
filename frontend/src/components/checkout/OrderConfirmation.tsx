import React, { useEffect, useState } from 'react';
import { getOrder } from '../../lib/api/orders';
import type { Order } from '../../lib/types';

// ─── Skeleton loader ─────────────────────────────────────────────────────────
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-[#E8DDD0] animate-pulse rounded-none ${className}`}
      aria-hidden="true"
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentRef, setPaymentRef] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectStatus = params.get('redirect_status');
    const paymentIntent = params.get('payment_intent');

    // Guard: if Stripe redirected with a failed status, send back to checkout
    if (redirectStatus && redirectStatus !== 'succeeded') {
      window.location.href = '/checkout';
      return;
    }

    // Build the human-readable payment reference
    if (paymentIntent) {
      setPaymentRef('#FA-' + paymentIntent.slice(-8).toUpperCase());
    } else {
      setPaymentRef('#FA-' + Math.floor(Math.random() * 90000 + 10000));
    }

    // Try to load the full order from Firestore via the orderId stored in sessionStorage
    const orderId = sessionStorage.getItem('forma_order_id');
    if (!orderId) {
      setLoading(false);
      return;
    }

    getOrder(orderId)
      .then((data) => {
        setOrder(data);
        // Clear sensitive data from sessionStorage
        sessionStorage.removeItem('forma_order_id');
        // Clear the cart store
        try {
          localStorage.removeItem('forma-atelier-cart');
        } catch {}
      })
      .catch(() => {
        // Non-critical — still show the confirmation page
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto z-10 flex flex-col items-center w-full">
      {/* Check icon */}
      <svg
        className="w-16 h-16 text-noir mb-8 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth={1}
          d="M5 13l4 4L19 7"
        />
      </svg>

      <h1 className="font-display text-4xl md:text-5xl text-noir uppercase font-light tracking-widest mb-6 text-center">
        Gracias por tu pedido
      </h1>

      <p className="font-body text-sm md:text-base text-stone tracking-wider leading-relaxed mb-4 text-center">
        Hemos recibido tu pedido correctamente. En breve recibirás un correo de
        confirmación con los detalles del envío y seguimiento.
      </p>

      <p className="font-body text-xs text-stone tracking-[0.2em] uppercase mb-10 text-center">
        Nº Pedido:{' '}
        <span className="text-noir font-medium">{paymentRef || '—'}</span>
      </p>

      {/* ── Order summary card ──────────────────────────────────────────────── */}
      {loading ? (
        <div className="w-full border border-[#E8DDD0] bg-white p-8 mb-10 flex flex-col gap-4">
          <Skeleton className="h-4 w-1/3 mb-2" />
          <div className="flex gap-4">
            <Skeleton className="w-16 h-20 flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-2 justify-center">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-3 w-12 self-center" />
          </div>
          <div className="border-t border-[#E8DDD0] pt-4 flex flex-col gap-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-4 w-1/3 mt-1" />
          </div>
        </div>
      ) : order ? (
        <div className="w-full border border-[#E8DDD0] bg-white p-8 mb-10 text-left">
          <h2 className="font-display text-lg uppercase tracking-widest text-noir mb-6">
            Resumen del Pedido
          </h2>

          {/* Items */}
          <div className="flex flex-col gap-5 mb-6">
            {(order.items as any[]).map((item: any, i: number) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-14 aspect-[3/4] bg-smoke flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E8DDD0]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-display text-xs uppercase tracking-widest text-noir">
                    {item.productName}
                  </p>
                  <p className="font-body text-xs text-stone tracking-wider mt-1">
                    Talla: {item.size} · Cantidad: {item.quantity}
                  </p>
                </div>
                <p className="font-body text-sm text-noir text-right">
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-[#E8DDD0] pt-5 flex flex-col gap-2 mb-5">
            <div className="flex justify-between font-body text-sm text-stone tracking-wider">
              <span>Subtotal</span>
              <span className="text-noir">
                {(order.total - (order.shipping ?? 0)).toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between font-body text-sm text-stone tracking-wider">
              <span>Envío</span>
              <span className="text-noir">
                {order.shipping === 0
                  ? 'Gratis'
                  : `${(order.shipping ?? 0).toFixed(2)} €`}
              </span>
            </div>
            <div className="flex justify-between font-body text-base tracking-widest uppercase border-t border-noir pt-3 mt-1">
              <span className="text-noir font-medium">Total</span>
              <span className="text-noir font-medium">
                {order.total.toFixed(2)} €
              </span>
            </div>
          </div>

          {/* Shipping address */}
          <div className="border-t border-[#E8DDD0] pt-5">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-stone mb-2">
              Dirección de envío
            </p>
            <p className="font-body text-sm text-noir leading-relaxed">
              {order.shipping_name}
              <br />
              {order.shipping_address}
              <br />
              {order.shipping_zip} {order.shipping_city}
            </p>
          </div>
        </div>
      ) : null}

      {/* CTA */}
      <a
        href="/"
        className="inline-flex items-center justify-center h-14 px-12 bg-noir text-ivory font-body text-xs tracking-[0.2em] uppercase hover:bg-stone transition-colors duration-300"
      >
        Volver al Atelier
      </a>
    </div>
  );
}
