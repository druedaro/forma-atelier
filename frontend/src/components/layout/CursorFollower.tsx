import React, { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 1024) return;
    setIsActive(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isExpanded = false;
    let hoverText = '';

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const expandEl = target.closest('[data-cursor="expand"]');
      const textEl = target.closest('[data-cursor="text"]') as HTMLElement | null;

      if (expandEl || textEl) {
        isExpanded = true;
        if (textEl && textEl.dataset.cursorText) {
          hoverText = textEl.dataset.cursorText;
        } else {
          hoverText = '';
        }
      } else {
        isExpanded = false;
        hoverText = '';
      }
    };

    const render = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        
        if (isExpanded) {
          cursor.style.width = 'var(--cursor-size-hover, 48px)';
          cursor.style.height = 'var(--cursor-size-hover, 48px)';
          cursor.style.mixBlendMode = 'difference';
          cursor.style.backgroundColor = 'var(--color-ivory)';
        } else {
          cursor.style.width = 'var(--cursor-size-default, 12px)';
          cursor.style.height = 'var(--cursor-size-default, 12px)';
          cursor.style.mixBlendMode = 'normal';
          cursor.style.backgroundColor = 'var(--color-noir)';
        }

        if (textRef.current) {
          textRef.current.innerText = hoverText;
          textRef.current.style.opacity = hoverText ? '1' : '0';
        }
      }

      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.classList.add('custom-cursor');
    const rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor');
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-[width,height,background-color,mix-blend-mode] duration-200"
      style={{
        width: 'var(--cursor-size-default, 12px)',
        height: 'var(--cursor-size-default, 12px)',
        backgroundColor: 'var(--color-noir)',
        transform: 'translate(-50%, -50%)',
        marginLeft: '-6px',
        marginTop: '-6px',
      }}
    >
      <span
        ref={textRef}
        className="text-[10px] uppercase tracking-widest font-body text-noir opacity-0 transition-opacity duration-200"
      ></span>
    </div>
  );
}
