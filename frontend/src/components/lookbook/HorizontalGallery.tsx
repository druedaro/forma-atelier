import React, { useEffect, useRef } from 'react';
import type { Look } from '../../lib/types';
import { LookCard } from './LookCard';

export interface HorizontalGalleryProps {
  looks: Look[];
  collectionSlugs: Record<string, string>;
}

export function HorizontalGallery({ looks, collectionSlugs }: HorizontalGalleryProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const getScrollWidth = () => inner.scrollWidth - window.innerWidth;

    const setHeight = () => {
      outer.style.height = `${getScrollWidth() + window.innerHeight}px`;
    };
    setHeight();

    const onScroll = () => {
      const outerRect = outer.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -outerRect.top / getScrollWidth()));
      inner.style.transform = `translateX(${-getScrollWidth() * progress}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setHeight, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setHeight);
      outer.style.height = '';
      inner.style.transform = '';
    };
  }, [looks]);

  return (
    <div ref={outerRef} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ivory">
        <div
          ref={innerRef}
          className="h-full flex flex-nowrap items-center px-[10vw] w-max will-change-transform"
        >
          <div className="flex-shrink-0 w-[40vw] mr-[10vw]">
            <h1 className="font-display text-5xl md:text-8xl text-noir font-light leading-none mb-6">
              L'Édition
            </h1>
            <p className="font-body text-sm md:text-base tracking-widest uppercase text-stone max-w-sm">
              Nuestra colección completa, estructurada a través de narrativas visuales y contrastes texturales.
            </p>
          </div>

          {looks.map((look, idx) => (
            <div key={look.id} className="flex-shrink-0 mr-[10vw]">
              <LookCard look={look} href={`/campaigns/${look.id}`} priority={idx === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
