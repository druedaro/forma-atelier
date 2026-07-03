import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.scrollTo(0, { immediate: true });

    const handlePageLoad = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    };

    const handleBeforePreparation = () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };

    document.addEventListener('astro:page-load', handlePageLoad);
    document.addEventListener('astro:before-preparation', handleBeforePreparation);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
      document.removeEventListener('astro:before-preparation', handleBeforePreparation);
      ScrollTrigger.getAll().forEach(st => st.kill());
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null;
}
