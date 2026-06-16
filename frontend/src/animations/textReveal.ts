import { gsap } from 'gsap';

export function initTextReveal(elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elements instanceof NodeList || Array.isArray(elements) ? elements[0] : elements,
      start: 'top 85%',
    }
  });

  tl.fromTo(
    elements,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
  );

  return tl;
}
