import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../lib/store/cartStore';
import { Button } from '../ui/Button';

export function CheckoutForm() {
  const { items, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-sm text-[#8C7B6B] tracking-widest uppercase mb-8">
          Tu cesta está vacía
        </p>
        <Button onClick={() => window.location.href = '/'}>Volver al inicio</Button>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total > 0 ? (total > 200 ? 0 : 15) : 0;
  const grandTotal = total + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      clearCart();
      window.location.href = '/success';
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 w-full">
      {/* Columna Izquierda (Formularios) */}
      <div className="lg:col-span-7 flex flex-col gap-12 w-full">
        
        {/* Contacto y Envío */}
        <section>
          <h2 className="font-display text-xl uppercase tracking-widest text-noir mb-6">1. Información de Envío</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="firstName" className="font-body text-xs tracking-widest text-stone uppercase">Nombre</label>
              <input required id="firstName" type="text" className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="lastName" className="font-body text-xs tracking-widest text-stone uppercase">Apellidos</label>
              <input required id="lastName" type="text" className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 w-full">
              <label htmlFor="email" className="font-body text-xs tracking-widest text-stone uppercase">Correo Electrónico</label>
              <input required id="email" type="email" className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 w-full">
              <label htmlFor="address" className="font-body text-xs tracking-widest text-stone uppercase">Dirección completa</label>
              <input required id="address" type="text" className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="city" className="font-body text-xs tracking-widest text-stone uppercase">Ciudad</label>
              <input required id="city" type="text" className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="zip" className="font-body text-xs tracking-widest text-stone uppercase">Código Postal</label>
              <input required id="zip" type="text" className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors" />
            </div>
          </div>
        </section>

        {/* Pago */}
        <section>
          <h2 className="font-display text-xl uppercase tracking-widest text-noir mb-6">2. Pago Seguro</h2>
          <div className="p-6 border border-[#E8DDD0] bg-white flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="card" className="font-body text-xs tracking-widest text-stone uppercase">Número de Tarjeta</label>
              <input required id="card" type="text" placeholder="0000 0000 0000 0000" maxLength={19} className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors tracking-widest placeholder:opacity-50" />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="exp" className="font-body text-xs tracking-widest text-stone uppercase">Caducidad</label>
                <input required id="exp" type="text" placeholder="MM/YY" maxLength={5} className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors tracking-widest placeholder:opacity-50" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="cvv" className="font-body text-xs tracking-widest text-stone uppercase">CVV</label>
                <input required id="cvv" type="text" placeholder="123" maxLength={4} className="w-full h-12 border border-[#E8DDD0] bg-transparent px-4 font-body text-sm text-noir outline-none focus:border-noir transition-colors tracking-widest placeholder:opacity-50" />
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Columna Derecha (Resumen y Botón Final) */}
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
                  <p className="font-body text-xs text-stone tracking-wider mt-1">Talla: {item.size} <span className="mx-2">|</span> Cantidad: {item.quantity}</p>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-ivory" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Confirmar Pago'
            )}
          </Button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-[#8C7B6B]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="font-body text-[10px] uppercase tracking-widest">Transacción cifrada y segura</span>
          </div>
        </div>
      </div>
    </form>
  );
}
