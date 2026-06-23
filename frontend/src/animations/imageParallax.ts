import { gsap } from 'gsap';

export function initImageParallax(images: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>) {
  const elements = images instanceof NodeList || Array.isArray(images) ? Array.from(images) : [images];
  
  elements.forEach((img) => {
    gsap.fromTo(img, 
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement || img,
          scrub: true,
        }
      }
    );
  });
}
