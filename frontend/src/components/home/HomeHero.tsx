import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HomeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set([titleRef.current, subtitleRef.current], { 
      y: 100, 
      opacity: 0 
    });
    
    gsap.set(imageRef.current, { 
      scale: 1.1 
    });

    tl.to(imageRef.current, {
      scale: 1,
      duration: 2.5,
      ease: "power3.out"
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out"
    }, "-=1.5")
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-noir flex flex-col items-center justify-center"
      data-cursor="text"
      data-cursor-text="Explorar"
    >
      <div className="absolute inset-0 w-full h-full">
        <img 
          ref={imageRef as any}
          src="/assets/photo-1469334031218-e382a71b716b.avif" 
          alt="Forma Atelier Home"
          className="w-full h-full object-cover opacity-60"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-auto pb-32">
        <h1 
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-[#F5F0EA] font-light tracking-widest uppercase mb-6"
        >
          Forma Atelier
        </h1>
        <p 
          ref={subtitleRef}
          className="font-body text-sm md:text-base text-[#E8DDD0] tracking-[0.3em] uppercase max-w-md mx-auto"
        >
          Redefiniendo la silueta moderna
        </p>
      </div>
    </section>
  );
}
