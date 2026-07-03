import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CampaignManifestoProps {
  manifesto: string;
  image?: string;
}

export function CampaignManifesto({ manifesto, image }: CampaignManifestoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );


      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );


      if (imgWrapRef.current && imgRef.current) {
        gsap.fromTo(imgWrapRef.current,
          { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 1.8,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imgWrapRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.to(imgRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-ivory py-24 md:py-40 px-8 md:px-16 overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">

        <div className="w-full md:w-5/12 flex flex-col">
          <div className="flex gap-6">
            <div ref={lineRef} className="w-[1px] h-32 md:h-48 bg-stone/40 shrink-0"></div>
            <p 
              ref={textRef} 
              className="font-display text-2xl md:text-3xl lg:text-4xl text-noir font-light leading-[1.4] italic"
            >
              "{manifesto}"
            </p>
          </div>
        </div>

        {image && (
          <div className="w-full md:w-5/12">
            <div ref={imgWrapRef} className="relative aspect-[3/4] overflow-hidden bg-smoke">
              <img 
                ref={imgRef}
                src={image} 
                alt="Manifesto detail" 
                className="absolute inset-[-10%] w-[120%] h-[120%] object-cover"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
