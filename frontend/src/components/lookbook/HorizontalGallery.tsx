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
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !scrollContainerRef.current) return;

      const getScrollWidth = () => scrollContainerRef.current!.offsetWidth - window.innerWidth;

      gsap.to(scrollContainerRef.current, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          end: () => `+=${getScrollWidth()}`,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [looks]);

  return (
    <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-noir relative">
      <div 
        ref={scrollContainerRef} 
        className="h-full flex flex-nowrap items-center px-[10vw]"
        style={{ width: `${looks.length * 50 + 50}vw` }}
      >
        <div className="flex-shrink-0 w-[40vw] mr-[10vw]">
          <h1 className="font-display text-5xl md:text-8xl text-[#F5F0EA] font-light leading-none mb-6">
            L'Édition
          </h1>
          <p className="font-body text-sm md:text-base tracking-widest uppercase text-[#E8DDD0] max-w-sm">
            Nuestra colección completa, estructurada a través de narrativas visuales y contrastes texturales.
          </p>
        </div>

        {looks.map((look) => {
          const slug = collectionSlugs[look.collection] || '#';
          return (
            <div key={look.id} className="flex-shrink-0 mr-[10vw]">
              <LookCard look={look} href={`/collections/${slug}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
