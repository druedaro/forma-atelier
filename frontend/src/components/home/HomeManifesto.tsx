import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomeManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text, i) => {
        if (!text) return;
        
        gsap.fromTo(text, 
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%", 
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLParagraphElement) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-32 md:py-48 px-8 md:px-16 bg-ivory text-center flex flex-col items-center justify-center min-h-[70vh]"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-24">
        <p 
          ref={addToRefs} 
          className="font-display text-3xl md:text-5xl text-noir font-light leading-relaxed"
        >
          Creemos en la atemporalidad de las formas.
        </p>
        <p 
          ref={addToRefs} 
          className="font-display text-3xl md:text-5xl text-stone font-light leading-relaxed"
        >
          Una exploración meticulosa entre la arquitectura, la naturaleza y la silueta humana.
        </p>
        <p 
          ref={addToRefs} 
          className="font-display text-3xl md:text-5xl text-noir font-light leading-relaxed"
        >
          Diseñado en Barcelona, creado para perdurar.
        </p>
      </div>
    </section>
  );
}
