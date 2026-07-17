import React, { useRef, useEffect } from 'react';
import type { Look } from '../../lib/types';
import { initImageParallax } from '../../animations/imageParallax';

export interface LookCardProps {
  look: Look;
  href?: string;
  onClick?: () => void;
  priority?: boolean;
}

export function LookCard({ look, href, onClick, priority }: LookCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      initImageParallax(imageRef.current);
    }
  }, []);

  const Container = href ? 'a' : 'div';
  const linkProps = href 
    ? { href } 
    : onClick 
      ? { 
          role: "button", 
          tabIndex: 0, 
          onKeyDown: (e: React.KeyboardEvent) => { 
            if (e.key === 'Enter' || e.key === ' ') { 
              e.preventDefault(); 
              onClick(); 
            } 
          } 
        }
      : {};

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
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full p-6 md:p-8 transition-opacity duration-[400ms] opacity-90 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.45) 55%, transparent 100%)',
        }}
      >
        <h2 
          className="text-2xl md:text-3xl tracking-widest uppercase font-light mb-1"
          style={{ 
            fontFamily: 'var(--font-display)', 
            color: '#F5F0EA',
            letterSpacing: '0.2em',
          }}
        >
          {look.title}
        </h2>
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
