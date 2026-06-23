import React, { useEffect, useRef, useState } from 'react';
import type { Product } from '../../lib/types';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';
import { initTextReveal } from '../../animations/textReveal';

export interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (infoRef.current) {
      const elements = infoRef.current.querySelectorAll('.reveal');
      if (elements.length > 0) {
        initTextReveal(elements as NodeListOf<HTMLElement>);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24 px-gutter">
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

        <div className="w-full lg:w-[450px] flex-shrink-0">
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
              <div className="flex justify-between items-center font-body text-xs uppercase tracking-widest text-noir">
                <span>Talla</span>
                <button className="underline hover:text-stone transition-colors" data-cursor="expand">
                  Guía de tallas
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 px-4 font-body text-xs tracking-widest border transition-all duration-300 ${
                      selectedSize === size 
                        ? 'border-noir bg-noir text-ivory' 
                        : 'border-linen text-noir hover:border-noir'
                    }`}
                    data-cursor="expand"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4 reveal">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={!product.available || !selectedSize}
              >
                {!product.available ? 'Agotado' : selectedSize ? 'Añadir a la cesta' : 'Selecciona una talla'}
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Añadir a Wishlist
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
