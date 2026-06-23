import React, { useEffect, useRef } from 'react';
import { initLookbookScroll } from '../../animations/lookbookScroll';
import { registerScrollTrigger } from '../../animations/scrollTrigger';

export interface LookbookScrollProps {
  children: React.ReactNode;
}

export function LookbookScroll({ children }: LookbookScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerScrollTrigger();

    if (!wrapperRef.current || !containerRef.current) return;

    let tl: gsap.core.Timeline | null = null;

    const timer = setTimeout(() => {
      if (!wrapperRef.current || !containerRef.current) return;
      tl = initLookbookScroll(wrapperRef.current, containerRef.current);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tl) {
        const st = tl.scrollTrigger;
        if (st) st.kill(false);
        tl.kill();
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="h-screen w-full overflow-hidden bg-ivory">
      <div
        ref={containerRef}
        className="flex h-full items-center px-gutter gap-32 w-max"
      >
        {children}
      </div>
    </div>
  );
}
