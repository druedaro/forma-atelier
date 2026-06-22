import React, { useRef, useEffect } from 'react';
import type { Look } from '../../lib/types';
import { initImageParallax } from '../../animations/imageParallax';

export interface LookCardProps {
  look: Look;
  href?: string;
  onClick?: () => void;
}

export function LookCard({ look, href, onClick }: LookCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      initImageParallax(imageRef.current);
    }
  }, []);

  const Container = href ? 'a' : 'div';
  const linkProps = href ? { href } : {};

  return (
    <Container 
      className="relative flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] h-[70vh] group block"
      onClick={onClick}
      {...linkProps}
    >
      <div className="w-full h-full overflow-hidden bg-noir">
        <img
          ref={imageRef}
          src={look.image}
          alt={look.title}
          className="w-full h-[120%] object-cover object-center"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-400">
        <h3 
          className="font-display text-3xl text-[#F5F0EA] tracking-widest uppercase font-light mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {look.title}
        </h3>
        <p className="font-body text-[10px] text-[#E8DDD0] uppercase tracking-widest">
          {look.expand?.products?.length || look.products.length} prendas
        </p>
      </div>
    </Container>
  );
}
