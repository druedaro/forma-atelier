import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CreativeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !text1Ref.current || !text2Ref.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set([text1Ref.current, text2Ref.current], { y: '100%', opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.1 });

      tl.to(imageRef.current, {
        scale: 1,
        duration: 2.5,
        ease: 'power3.out',
      })
        .to(text1Ref.current, { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=1.8')
        .to(text2Ref.current, { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=1.0');

      if (containerRef.current && text1Ref.current) {
        gsap.to(text1Ref.current, {
          y: -100,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (containerRef.current && text2Ref.current) {
        gsap.to(text2Ref.current, {
          y: -200,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    const onMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(imageRef.current, { x, y, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', onMouseMove);
      ScrollTrigger.getAll()
        .filter(st => st.trigger === containerRef.current)
        .forEach(st => st.kill());
    };
  }, []);


  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-[#F5F0EA] flex flex-col justify-center"
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        <div 
          ref={imageRef} 
          className="w-[80%] h-[80%] md:w-[60%] md:h-[90%] relative overflow-hidden"
        >
          <img 
            src="/assets/photo-1469334031218-e382a71b716b.avif" 
            alt=""
            role="presentation"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full pointer-events-none mix-blend-difference text-white">
        <div className="overflow-hidden">
          <h1 
            ref={text1Ref}
            className="font-display text-[15vw] md:text-[12vw] leading-[0.8] uppercase font-light tracking-widest text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Forma
          </h1>
        </div>
        <div className="overflow-hidden mt-4">
          <h1 
            ref={text2Ref}
            className="font-display text-[15vw] md:text-[12vw] leading-[0.8] uppercase font-light tracking-widest text-center italic"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Atelier
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 font-body text-xs tracking-widest uppercase text-[#0A0A0A]">
        Scroll para explorar
      </div>
    </section>
  );
}
