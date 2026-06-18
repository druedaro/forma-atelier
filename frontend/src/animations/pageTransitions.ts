import { gsap } from 'gsap';

export function initPageTransition() {
  const overlay = document.querySelector('.page-overlay') as HTMLElement;
  if (!overlay) return;

  gsap.fromTo(
    overlay,
    { scaleY: 1, transformOrigin: 'bottom' },
    { scaleY: 0, duration: 1.2, ease: 'power3.inOut' }
  );
}

export function navigateWithTransition(url: string) {
  const overlay = document.querySelector('.page-overlay') as HTMLElement;
  if (!overlay) {
    window.location.href = url;
    return;
  }

  gsap.fromTo(
    overlay,
    { scaleY: 0, transformOrigin: 'top' },
    { 
      scaleY: 1, 
      duration: 0.8, 
      ease: 'power3.inOut',
      onComplete: () => {
        window.location.href = url;
      }
    }
  );
}
