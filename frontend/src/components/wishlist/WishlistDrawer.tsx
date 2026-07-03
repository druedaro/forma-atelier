import React, { useEffect, useRef, useState } from 'react';
import { useWishlistStore } from '../../lib/store/wishlistStore';
import { getWishlistProducts } from '../../lib/api/wishlist';
import { gsap } from 'gsap';
import { Button } from '../ui/Button';
import type { Product } from '../../lib/types';

export function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist, items, removeItem } = useWishlistStore();
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isWishlistOpen) {
      getWishlistProducts().then(setProducts);
    }
  }, [isWishlistOpen, items]);

  useEffect(() => {
    if (isWishlistOpen && backdropRef.current && drawerRef.current) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out', delay: 0.1 });
    } else {
      document.body.style.overflow = '';
    }
  }, [isWishlistOpen]);

  const handleClose = () => {
    if (backdropRef.current && drawerRef.current) {
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.15, onComplete: closeWishlist });
    } else {
      closeWishlist();
    }
  };

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-noir/40 backdrop-blur-sm"
        style={{ opacity: 0 }}
        onClick={handleClose}
        data-cursor="expand"
      />
      <div
        ref={drawerRef}
        className="absolute top-0 right-0 w-full md:w-[450px] h-full shadow-2xl flex flex-col"
        style={{ backgroundColor: '#F5F0EA', transform: 'translateX(100%)' }}
      >
        <div className="p-8 flex justify-between items-center border-b-[0.5px] border-linen">
          <h2 className="font-display text-2xl uppercase tracking-widest text-noir font-light">
            Wishlist ({items.length})
          </h2>
          <button 
            onClick={handleClose}
            className="text-noir hover:text-stone transition-colors p-2"
            aria-label="Close wishlist"
            data-cursor="expand"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          {products.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-stone">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p className="font-body text-sm tracking-wider">Tu lista de deseos está vacía.</p>
              <Button variant="outline" onClick={handleClose} className="mt-4">
                Explorar colección
              </Button>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex gap-6 group">
                <div className="w-24 h-32 flex-shrink-0 bg-smoke overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center gap-2 flex-1">
                  <h3 className="font-body text-xs uppercase tracking-widest text-noir font-medium">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs text-stone tracking-wider">{product.price} €</p>

                  <div className="mt-4 flex gap-4">
                    <a 
                      href={`/products/${product.slug}`}
                      className="font-body text-[10px] uppercase tracking-widest text-gold hover:text-noir transition-colors"
                      data-cursor="expand"
                    >
                      Ver Detalles
                    </a>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="font-body text-[10px] uppercase tracking-widest text-stone hover:text-noir transition-colors"
                      data-cursor="expand"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
