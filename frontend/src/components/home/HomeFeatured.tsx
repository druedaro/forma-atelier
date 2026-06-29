import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomeFeatured() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLAnchorElement>(null);
  const card2Ref = useRef<HTMLAnchorElement>(null);
  const card3Ref = useRef<HTMLAnchorElement>(null);

  const wrap1Ref = useRef<HTMLDivElement>(null);
  const wrap2Ref = useRef<HTMLDivElement>(null);
  const wrap3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([wrap1Ref.current, wrap2Ref.current, wrap3Ref.current],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      if (window.innerWidth > 768) {
        gsap.to(card1Ref.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(card2Ref.current, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(card3Ref.current, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-8 md:px-16 bg-smoke overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <header className="mb-16 flex justify-between items-end">
          <h2 className="font-display text-4xl md:text-5xl text-noir uppercase tracking-widest font-light">
            Selección<br/>Exclusiva
          </h2>
          <a href="/lookbook" className="font-body text-xs uppercase tracking-widest text-stone hover:text-noir transition-colors underline underline-offset-4">
            Ver Colecciones completas
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div ref={wrap1Ref} className="mt-0 md:mt-16">
            <a 
              ref={card1Ref}
              href="/products/vestido-silk-georgette" 
              className="group block"
              data-cursor="text"
              data-cursor-text="Ver prenda"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-linen mb-6">
                <img 
                  src="/assets/photo-1512436991641-6745cdb1723f.avif" 
                  alt="Vestido Silk Georgette" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              <h3 className="font-body text-sm text-noir uppercase tracking-widest">Vestido Silk Georgette</h3>
              <p className="font-body text-xs text-stone mt-2">1.850 €</p>
            </a>
          </div>

          <div ref={wrap2Ref} className="mt-0 md:-mt-8">
            <a 
              ref={card2Ref}
              href="/products/abrigo-lana-cashmere" 
              className="group block"
              data-cursor="text"
              data-cursor-text="Ver prenda"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-linen mb-6">
                <img 
                  src="/assets/photo-1539533018447-63fcce2678e3.avif" 
                  alt="Abrigo Lana Cashmere" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              <h3 className="font-body text-sm text-noir uppercase tracking-widest">Abrigo Lana Cashmere</h3>
              <p className="font-body text-xs text-stone mt-2">2.400 €</p>
            </a>
          </div>

          <div ref={wrap3Ref} className="mt-0 md:mt-32">
            <a 
              ref={card3Ref}
              href="/products/pantalon-lana-plisado" 
              className="group block"
              data-cursor="text"
              data-cursor-text="Ver prenda"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-linen mb-6">
                <img 
                  src="/assets/photo-1509631179647-0177331693ae.avif" 
                  alt="Pantalón Lana Plisado" 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
              <h3 className="font-body text-sm text-noir uppercase tracking-widest">Pantalón Lana Plisado</h3>
              <p className="font-body text-xs text-stone mt-2">720 €</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
