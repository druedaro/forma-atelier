export function initImageParallax(images: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>) {
  const elements = images instanceof NodeList || Array.isArray(images) ? Array.from(images) : [images];

  elements.forEach((img) => {
    const parent = img.parentElement;
    if (!parent) return;

    const onScroll = () => {
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom < 0 || rect.top > vh) return;

      const progress = (vh - rect.top) / (vh + rect.height);
      const yPercent = -10 + progress * 20;
      img.style.transform = `translateY(${yPercent}%)`;
    };

    img.style.willChange = 'transform';
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      img.style.transform = '';
      img.style.willChange = '';
    };

    document.addEventListener('astro:before-preparation', cleanup, { once: true });
  });
}
