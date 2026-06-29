import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../lib/store/cartStore';

export function CartButton() {
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button 
      onClick={() => toggleCart(true)}
      aria-label="Cesta" 
      className="p-2 hover:opacity-60 transition-opacity duration-200 relative" 
      data-cursor="expand"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      {mounted && totalQuantity > 0 && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-noir text-ivory text-[9px] font-body flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
