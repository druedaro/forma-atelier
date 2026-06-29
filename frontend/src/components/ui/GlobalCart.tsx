import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../lib/store/cartStore';
import { Drawer } from './Drawer';
import { Button } from './Button';

export function GlobalCart() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <Drawer isOpen={isOpen} onClose={() => toggleCart(false)} title="Cesta">
      <div className="flex flex-col h-full">
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 opacity-50">
            <svg className="w-12 h-12 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="font-body text-sm tracking-widest uppercase">Tu cesta está vacía</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-linen pb-6 last:border-b-0">
                <div className="w-24 aspect-[3/4] bg-smoke">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-sm uppercase tracking-widest text-noir">{item.product.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-stone hover:text-noir transition-colors p-1 -mt-1 -mr-1" aria-label="Eliminar">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="font-body text-xs text-stone tracking-wider">{item.product.price} €</p>
                    <p className="font-body text-xs text-stone tracking-wider mt-1">Talla: {item.size}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 border border-linen w-max h-8">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-full flex items-center justify-center text-stone hover:text-noir transition-colors"
                    >
                      -
                    </button>
                    <span className="font-body text-xs min-w-[1rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-full flex items-center justify-center text-stone hover:text-noir transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-linen pt-6 mt-6 shrink-0 bg-white">
          <div className="flex justify-between items-center mb-6 font-body text-sm tracking-widest uppercase">
            <span className="text-stone">Total</span>
            <span className="font-medium text-noir">{total} €</span>
          </div>
          <Button 
            className="w-full h-12 rounded-none text-xs" 
            disabled={items.length === 0}
            onClick={() => window.location.href = '/cart'}
          >
            Tramitar pedido
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
