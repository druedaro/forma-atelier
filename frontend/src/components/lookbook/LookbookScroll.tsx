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

    // Small delay to ensure DOM is fully painted
    const timer = setTimeout(() => {
      if (wrapperRef.current && containerRef.current) {
        const tl = initLookbookScroll(wrapperRef.current, containerRef.current);
        return () => {
          tl.kill();
        };
      }
    }, 100);

    return () => clearTimeout(timer);
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
