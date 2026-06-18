import React, { useEffect, useRef } from 'react';
import { useWishlistStore } from '../../store/wishlistStore';
import { gsap } from 'gsap';
import { mockProducts } from '../../lib/mock/data';
import { Button } from '../ui/Button';

export function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist, items, removeItem } = useWishlistStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // In a real implementation we would fetch products by their IDs from the API
  const wishlistProducts = mockProducts.filter(p => items.includes(p.id));

  useEffect(() => {
    if (isWishlistOpen && overlayRef.current && drawerRef.current) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
        .fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' }, '-=0.2');
    } else {
      document.body.style.overflow = '';
    }
  }, [isWishlistOpen]);

  const handleClose = () => {
    if (overlayRef.current && drawerRef.current) {
      const tl = gsap.timeline({ onComplete: closeWishlist });
      tl.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' })
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
    } else {
      closeWishlist();
    }
  };

  if (!isWishlistOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] invisible">
      <div 
        className="absolute inset-0 bg-noir/40 backdrop-blur-sm"
        onClick={handleClose}
        data-cursor="expand"
      />
      <div 
        ref={drawerRef}
        className="absolute top-0 right-0 w-full md:w-[450px] h-full bg-ivory shadow-2xl flex flex-col"
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
          {wishlistProducts.length === 0 ? (
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
            wishlistProducts.map((product) => (
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
