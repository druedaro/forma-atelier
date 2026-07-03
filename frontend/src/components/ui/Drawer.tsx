import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { useFocusTrap } from '../../lib/hooks/useFocusTrap';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [mounted, setMounted] = useState(false);

  const panelRef = useFocusTrap(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(panelRef.current, { x: '100%' });
      gsap.set(overlayRef.current, { opacity: 0, display: 'none' });
      return;
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(panelRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = '';
      gsap.to(panelRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div className="relative" style={{ zIndex: 99999 }}>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm hidden opacity-0"
        onClick={onClose}
        aria-hidden="true"
        style={{ zIndex: 99999 }}
      />
      <div 
        ref={panelRef}
        className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white translate-x-full shadow-2xl flex flex-col"
        style={{ zIndex: 100000 }}
      >
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-linen shrink-0 bg-white">
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
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-white">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
