import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../lib/store/cartStore';
import { Button } from '../ui/Button';

export function CartPageContent() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total > 0 ? (total > 200 ? 0 : 15) : 0; 
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-body text-sm text-[#8C7B6B] tracking-widest uppercase mb-8">
          Tu cesta está vacía
        </p>
        <a href="/collections" className="font-body text-xs uppercase tracking-[0.2em] px-8 py-4 border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F0EA] transition-colors duration-300">
          Descubrir Colecciones
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

      <div className="lg:col-span-8 flex flex-col gap-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-6 lg:gap-8 pb-8 border-b border-[#E8DDD0] last:border-b-0">
            <a href={`/products/${item.product.id}`} className="w-32 lg:w-48 aspect-[3/4] bg-smoke flex-shrink-0 block group">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </a>

            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-4">
                  <a href={`/products/${item.product.id}`} className="hover:opacity-70 transition-opacity">
                    <h3 className="font-display text-base md:text-lg uppercase tracking-widest text-noir">{item.product.name}</h3>
                  </a>
                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="text-stone hover:text-noir transition-colors p-2 -mr-2" 
                    aria-label="Eliminar artículo"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="font-body text-sm text-stone tracking-wider">{item.product.price} €</p>
                <p className="font-body text-sm text-stone tracking-wider">Talla: <span className="text-noir">{item.size}</span></p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-4 border border-[#E8DDD0] w-max h-10">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-full flex items-center justify-center text-stone hover:text-noir transition-colors"
                  >
                    -
                  </button>
                  <span className="font-body text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-stone hover:text-noir transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="font-body text-sm font-medium tracking-wider text-noir">
                  {(item.product.price * item.quantity).toFixed(2)} €
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="lg:col-span-4">
        <div className="bg-white p-8 border border-[#E8DDD0] sticky top-32">
          <h2 className="font-display text-xl uppercase tracking-widest text-noir mb-8">Resumen</h2>

          <div className="flex flex-col gap-4 mb-8 font-body text-sm tracking-wider">
            <div className="flex justify-between items-center text-stone">
              <span>Subtotal</span>
              <span className="text-noir">{total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center text-stone">
              <span>Envío</span>
              <span className="text-noir">{shipping === 0 ? 'Gratis' : `${shipping.toFixed(2)} €`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-[#8C7B6B] mt-[-0.5rem]">Envío gratis a partir de 200 €</p>
            )}
          </div>

          <div className="pt-6 border-t border-[#E8DDD0] mb-8">
            <div className="flex justify-between items-end font-body tracking-widest uppercase">
              <span className="text-sm text-stone">Total</span>
              <span className="text-lg font-medium text-noir">{grandTotal.toFixed(2)} €</span>
            </div>
            <p className="text-[10px] text-stone mt-2 text-right">IVA INCLUIDO</p>
          </div>

          <Button 
            className="w-full h-14 rounded-none text-xs"
            onClick={() => window.location.href = '/checkout'}
          >
            Proceder al pago
          </Button>
        </div>
      </div>
    </div>
  );
}
