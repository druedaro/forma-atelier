import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(panelRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(panelRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none', delay: 0.1 });
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] hidden opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        ref={panelRef}
        className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-ivory z-[110] translate-x-full shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-linen shrink-0">
          <h2 className="font-display text-xl uppercase tracking-widest text-noir">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-smoke rounded-full transition-colors group"
            aria-label="Cerrar panel"
          >
            <svg className="w-5 h-5 text-stone group-hover:text-noir transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </>
  );
}
