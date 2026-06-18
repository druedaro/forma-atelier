import React, { useRef, useEffect } from 'react';
import type { Look } from '../../lib/types';
import { initImageParallax } from '../../animations/imageParallax';

export interface LookCardProps {
  look: Look;
  onClick?: () => void;
}

export function LookCard({ look, onClick }: LookCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      initImageParallax(imageRef.current);
    }
  }, []);

  return (
    <div 
      className="relative flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] h-[70vh] group cursor-none"
      onClick={onClick}
      data-cursor="text"
      data-cursor-text="Ver"
    >
      <div className="w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src={look.image}
          alt={look.title}
          className="w-full h-[120%] object-cover object-center"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-noir/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <h3 className="font-display text-3xl text-ivory tracking-widest uppercase font-light mb-2">
          {look.title}
        </h3>
        <p className="font-body text-[10px] text-linen uppercase tracking-widest">
          {look.expand?.products?.length || look.products.length} prendas
        </p>
      </div>
    </div>
  );
}
