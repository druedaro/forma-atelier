import { gsap } from 'gsap';

export function initLookbookScroll(wrapper: HTMLElement, container: HTMLElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      pin: true,
      scrub: 1,
      end: () => `+=${container.scrollWidth - window.innerWidth}`,
    }
  });

  tl.to(container, {
    x: () => -(container.scrollWidth - window.innerWidth),
    ease: 'none',
  });

  return tl;
}
