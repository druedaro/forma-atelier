import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../lib/store/authStore';

export function AccountButton() {
  const { isLoggedIn, user, logout, restoreSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    restoreSession();
  }, [restoreSession]);

  if (!mounted) {
    return (
      <a href="/login" aria-label="Cuenta" className="p-2 hover:opacity-60 transition-opacity duration-200" data-cursor="expand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </a>
    );
  }

  if (!isLoggedIn) {
    return (
      <a href="/login" aria-label="Cuenta" className="p-2 hover:opacity-60 transition-opacity duration-200" data-cursor="expand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Menú de cuenta"
        className="p-2 hover:opacity-60 transition-opacity duration-200 relative flex items-center gap-2"
        data-cursor="expand"
      >
        {/* Filled icon when logged in */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-linen shadow-lg z-50 py-2">
          <div className="px-4 py-2 border-b border-linen">
            <p className="font-body text-[10px] text-stone uppercase tracking-widest">Hola,</p>
            <p className="font-body text-sm text-noir truncate">{user?.name}</p>
          </div>
          <a
            href="/wishlist"
            className="block px-4 py-3 font-body text-[10px] uppercase tracking-widest text-stone hover:text-noir hover:bg-smoke transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Mi Wishlist
          </a>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
              window.location.href = '/';
            }}
            className="w-full text-left px-4 py-3 font-body text-[10px] uppercase tracking-widest text-stone hover:text-noir hover:bg-smoke transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Close on outside click */}
      {menuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}
