import React, { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../lib/store/authStore';
import { Button } from '../ui/Button';
import { gsap } from 'gsap';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthModalOpen && overlayRef.current && contentRef.current) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 })
        .fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.1');
    } else {
      document.body.style.overflow = '';
    }
  }, [isAuthModalOpen]);

  const handleClose = () => {
    if (overlayRef.current && contentRef.current) {
      const tl = gsap.timeline({ onComplete: closeAuthModal });
      tl.to(contentRef.current, { y: 20, opacity: 0, duration: 0.3 })
        .to(overlayRef.current, { autoAlpha: 0, duration: 0.3 }, '-=0.1');
    } else {
      closeAuthModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: '1', email, name: 'Guest' });
    handleClose();
  };

  if (!isAuthModalOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] invisible flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-noir/40 backdrop-blur-sm"
        onClick={handleClose}
        data-cursor="expand"
      />
      <div 
        ref={contentRef}
        className="relative bg-ivory p-12 shadow-2xl w-full max-w-md mx-4"
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-noir hover:text-stone transition-colors"
          data-cursor="expand"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <h2 className="font-display text-3xl uppercase tracking-widest text-noir font-light mb-8 text-center">
          Acceder
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-body text-[10px] uppercase tracking-widest text-stone">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-[0.5px] border-linen bg-transparent pb-2 font-body text-sm text-noir focus:outline-none focus:border-gold transition-colors rounded-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-body text-[10px] uppercase tracking-widest text-stone">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-[0.5px] border-linen bg-transparent pb-2 font-body text-sm text-noir focus:outline-none focus:border-gold transition-colors rounded-none"
            />
          </div>
          
          <Button type="submit" variant="primary" className="w-full mt-4">
            Iniciar sesión
          </Button>
          
          <div className="text-center mt-2">
            <button type="button" className="font-body text-[10px] uppercase tracking-widest text-stone underline hover:text-noir transition-colors" data-cursor="expand">
              Crear una cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
