import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomeManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text) => {
        if (!text) return;
        gsap.fromTo(text,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 px-8 md:px-24 bg-ivory flex flex-col items-start justify-center"
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-0">

        <p
          ref={addToRefs}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] text-noir font-light leading-[1.05] tracking-tight mb-8 md:mb-12"
        >
          Creemos en la<br />
          atemporalidad<br />
          de las formas.
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-24 border-t border-[#E8DDD0] pt-10 md:pt-14">
          <p
            ref={addToRefs}
            className="font-display text-[clamp(1rem,2.2vw,1.75rem)] text-stone font-light leading-relaxed max-w-lg italic"
          >
            Una exploración meticulosa entre la arquitectura,<br />
            la naturaleza y la silueta humana.
          </p>

          <p
            ref={addToRefs}
            className="font-body text-[11px] uppercase tracking-[0.3em] text-stone/70 md:text-right self-start md:self-end pb-1"
          >
            Diseñado en Barcelona,<br />creado para perdurar.
          </p>
        </div>

      </div>
    </section>
  );
}
