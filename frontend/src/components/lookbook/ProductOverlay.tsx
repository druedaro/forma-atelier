import React, { useEffect, useRef } from 'react';
import type { Look } from '../../lib/types';
import { gsap } from 'gsap';

export interface ProductOverlayProps {
  look: Look | null;
  onClose: () => void;
}

export function ProductOverlay({ look, onClose }: ProductOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (look && overlayRef.current && contentRef.current) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
        .fromTo(contentRef.current, 
          { x: '100%' }, 
          { x: '0%', duration: 0.6, ease: 'power3.out' }, 
          '-=0.2'
        );
    } else {
      document.body.style.overflow = '';
    }
  }, [look]);

  const handleClose = () => {
    if (overlayRef.current && contentRef.current) {
      const tl = gsap.timeline({ onComplete: onClose });
      tl.to(contentRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' })
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
    } else {
      onClose();
    }
  };

  if (!look) return null;

  const products = look.expand?.products || [];

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[150] invisible"
    >
      <div 
        className="absolute inset-0 bg-noir/40 backdrop-blur-sm"
        onClick={handleClose}
        data-cursor="expand"
      />
      
      <div 
        ref={contentRef}
        className="absolute top-0 right-0 w-full md:w-[450px] h-full bg-ivory shadow-2xl flex flex-col"
      >
        <div className="p-8 flex justify-between items-center border-b-[0.5px] border-linen">
          <h2 className="font-display text-2xl uppercase tracking-widest text-noir font-light">{look.title}</h2>
          <button 
            onClick={handleClose}
            className="text-noir hover:text-stone transition-colors p-2"
            aria-label="Close overlay"
            data-cursor="expand"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex gap-6 group">
              <div className="w-24 h-32 flex-shrink-0 overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <h3 className="font-body text-xs uppercase tracking-widest text-noir font-medium">{product.name}</h3>
                <p className="font-body text-xs text-stone tracking-wider">{product.price} €</p>
                <a 
                  href={`/products/${product.slug}`}
                  className="mt-2 font-body text-[10px] uppercase tracking-widest text-gold hover:text-noir transition-colors"
                  data-cursor="expand"
                >
                  Ver Detalles
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
