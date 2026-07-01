import React, { useEffect, useRef, useState } from 'react';
import type { Product } from '../../lib/types';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';
import { Drawer } from '../ui/Drawer';
import { SizeGuide } from './SizeGuide';
import { initTextReveal } from '../../animations/textReveal';
import { useCartStore } from '../../lib/store/cartStore';

export interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (infoRef.current) {
      const elements = infoRef.current.querySelectorAll('.reveal');
      if (elements.length > 0) {
        initTextReveal(elements as NodeListOf<HTMLElement>);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-ivory pt-20 lg:pt-32 pb-24 px-gutter">
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        <div className="flex-1 flex flex-col gap-8 lg:gap-16">
          {product.images.map((img, idx) => (
            <div key={idx} className="w-full aspect-[3/4] bg-smoke">
              <img 
                src={img} 
                alt={`${product.name} detail ${idx + 1}`} 
                className="w-full h-full object-cover"
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[400px] xl:w-[500px] 2xl:w-[600px] flex-shrink-0 xl:pr-16 2xl:pr-32">
          <div ref={infoRef} className="sticky top-32 flex flex-col gap-10">
            <div className="flex flex-col gap-4 reveal">
              <h1 className="font-display text-4xl uppercase tracking-widest text-noir font-light">
                {product.name}
              </h1>
              <p className="font-body text-xl text-stone tracking-wider">
                {product.price} €
              </p>
            </div>

            <Divider className="reveal" />

            <div className="flex flex-col gap-6 reveal">
              <p className="font-body text-sm leading-relaxed text-noir">
                {product.description}
              </p>
              <div className="flex flex-col gap-2 font-body text-xs text-stone tracking-wider uppercase">
                <p>Material: {product.material}</p>
                <p>Origen: {product.origin}</p>
              </div>
            </div>

            <Divider className="reveal" />

            <div className="flex flex-col gap-4 reveal">
              <div className="flex justify-between items-center font-body text-xs uppercase tracking-widest text-noir border-b border-linen pb-3">
                <span>Talla</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="underline hover:text-stone transition-colors" 
                  data-cursor="expand"
                >
                  Guía de tallas
                </button>
              </div>
              <div className="flex flex-col gap-0 border-b border-linen">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 flex justify-between items-center px-2 font-body text-xs tracking-widest transition-all duration-300 border-t border-linen first:border-t-0 ${
                      selectedSize === size 
                        ? 'font-bold bg-smoke/50 text-noir' 
                        : 'text-stone hover:text-noir hover:bg-smoke/30'
                    }`}
                    data-cursor="expand"
                  >
                    <span>{size}</span>
                    {selectedSize === size && (
                      <svg className="w-4 h-4 text-noir" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-4 reveal">
              <Button 
                variant="primary" 
                size="lg" 
                className={`flex-1 uppercase tracking-widest text-xs h-[50px] rounded-none transition-all duration-300 ${isAdded ? 'bg-[#8C7B6B] border-[#8C7B6B] text-ivory' : ''}`}
                disabled={!product.available || !selectedSize || isAdded}
                onClick={() => {
                  addItem(product, selectedSize);
                  setIsAdded(true);
                  window.dispatchEvent(new CustomEvent('open-cart'));
                  setTimeout(() => setIsAdded(false), 2000);
                }}
              >
                {!product.available ? 'Agotado' : !selectedSize ? 'Selecciona una talla' : isAdded ? '✓ Añadido' : 'Añadir a la cesta'}
              </Button>
              <button 
                className="w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center border border-linen hover:border-noir transition-colors bg-white text-noir rounded-none"
                aria-label="Añadir a Wishlist"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

          </div>
        </div>

      </div>

      <Drawer 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
        title="Guía de Tallas"
      >
        <SizeGuide />
      </Drawer>
    </div>
  );
}
