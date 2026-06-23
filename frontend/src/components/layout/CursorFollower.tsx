import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;
    setIsActive(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for highly optimized cursor following
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    let isExpanded = false;

    const onMouseMove = (e: MouseEvent) => {
      // Center the cursor
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement;
      const expandEl = target.closest('[data-cursor="expand"]');
      const textEl = target.closest('[data-cursor="text"]') as HTMLElement | null;

      if (expandEl || textEl) {
        if (!isExpanded) {
          isExpanded = true;
          gsap.to(cursor, {
            width: 80,
            height: 80,
            backgroundColor: '#F5F0EA', // Ivory
            mixBlendMode: 'difference',
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        if (textEl && textEl.dataset.cursorText && textRef.current) {
          textRef.current.innerText = textEl.dataset.cursorText;
          gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
        }
      } else {
        if (isExpanded) {
          isExpanded = false;
          gsap.to(cursor, {
            width: 12,
            height: 12,
            backgroundColor: '#0A0A0A', // Noir
            mixBlendMode: 'normal',
            duration: 0.3,
            ease: "power2.out"
          });
          
          if (textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
          }
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = '';
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
      style={{
        width: '12px',
        height: '12px',
        backgroundColor: '#0A0A0A',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span
        ref={textRef}
        className="text-[10px] uppercase tracking-widest font-body text-[#0A0A0A] opacity-0 whitespace-nowrap"
      ></span>
    </div>
  );
}
