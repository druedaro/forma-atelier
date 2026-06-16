import React, { useEffect, useRef } from 'react';
import type { Collection } from '../../lib/types';
import { initTextReveal } from '../../animations/textReveal';

export interface CollectionHeroProps {
  collection: Collection;
}

export function CollectionHero({ collection }: CollectionHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Adding a slight delay so it works well with page transitions
    const timer = setTimeout(() => {
      if (titleRef.current) initTextReveal(titleRef.current);
      if (subtitleRef.current) initTextReveal(subtitleRef.current);
      if (ctaRef.current) initTextReveal(ctaRef.current);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-ivory overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={collection.hero_image} 
          alt={collection.name} 
          className="w-full h-full object-cover opacity-40 mix-blend-multiply"
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-16">
        <p 
          ref={subtitleRef}
          className="font-body text-[10px] md:text-xs uppercase tracking-widest text-stone mb-6 font-medium opacity-0 translate-y-8"
        >
          {collection.season} Collection
        </p>
        
        <h1 
          ref={titleRef}
          className="font-display text-7xl md:text-[9rem] text-noir tracking-wider font-light uppercase mb-16 opacity-0 translate-y-8"
        >
          {collection.name}
        </h1>
        
        <div ref={ctaRef} className="opacity-0 translate-y-8">
          <button 
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            className="flex flex-col items-center gap-6 text-noir hover:text-stone transition-colors duration-400 group"
            data-cursor="expand"
          >
            <span className="font-body text-[10px] uppercase tracking-widest">Scroll to explore</span>
            <span className="block w-[1px] h-12 bg-noir group-hover:h-20 transition-all duration-400"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
