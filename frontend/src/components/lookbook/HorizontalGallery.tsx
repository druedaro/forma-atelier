import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { Look } from '../../lib/types';
import { LookCard } from './LookCard';

gsap.registerPlugin(ScrollTrigger);

export interface HorizontalGalleryProps {
  looks: Look[];
  collectionSlugs: Record<string, string>;
}

export function HorizontalGallery({ looks, collectionSlugs }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    ScrollTrigger.getAll().forEach(st => st.kill());

    const ctx = gsap.context(() => {
      const getScrollWidth = () => {
        if (!scrollContainerRef.current) return 0;
        return scrollContainerRef.current.offsetWidth - window.innerWidth;
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${getScrollWidth()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!scrollContainerRef.current) return;
          gsap.set(scrollContainerRef.current, {
            x: -getScrollWidth() * self.progress
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [looks]);

  return (
    <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-noir relative">
      <div 
        ref={scrollContainerRef} 
        className="h-full flex flex-nowrap items-center px-[10vw] w-max"
      >
        <div className="flex-shrink-0 w-[40vw] mr-[10vw]">
          <h1 className="font-display text-5xl md:text-8xl text-ivory font-light leading-none mb-6">
            L'Édition
          </h1>
          <p className="font-body text-sm md:text-base tracking-widest uppercase text-linen max-w-sm">
            Nuestra colección completa, estructurada a través de narrativas visuales y contrastes texturales.
          </p>
        </div>

        {looks.map((look, idx) => {
          return (
            <div key={look.id} className="flex-shrink-0 mr-[10vw]">
              <LookCard look={look} href={`/campaigns/${look.id}`} priority={idx === 0} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
