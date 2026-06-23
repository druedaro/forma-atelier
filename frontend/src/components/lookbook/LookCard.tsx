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
  const linkProps = href 
    ? { href } 
    : { 
        role: "button", 
        tabIndex: 0, 
        onKeyDown: (e: React.KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') { 
            e.preventDefault(); 
            onClick?.(); 
          } 
        } 
      };

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
      
      <div 
        className="absolute bottom-0 left-0 w-full p-8 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-[400ms]"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 50%, transparent 100%)',
        }}
      >
        <h3 
          className="text-3xl tracking-widest uppercase font-light mb-2"
          style={{ 
            fontFamily: 'var(--font-display)', 
            color: '#F5F0EA',
            letterSpacing: '0.2em',
          }}
        >
          {look.title}
        </h3>
        <p 
          className="text-[10px] uppercase tracking-widest"
          style={{ 
            fontFamily: 'var(--font-body)', 
            color: '#E8DDD0',
            letterSpacing: '0.2em',
          }}
        >
          {look.expand?.products?.length || look.products.length} prendas
        </p>
      </div>
    </Container>
  );
}
