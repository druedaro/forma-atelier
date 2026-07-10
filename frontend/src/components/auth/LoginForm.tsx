import React, { useState } from 'react';
import { useAuthStore } from '../../lib/store/authStore';

type Tab = 'login' | 'register';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function GuestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

export function LoginForm() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'guest' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { login, register, loginWithGoogle, loginAsGuest } = useAuthStore();

  const handleError = (err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('popup-closed') || msg.includes('cancelled')) return;
    if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found')) {
      setError('Email o contraseña incorrectos.');
    } else if (msg.includes('auth/email-already-in-use') || msg.includes('already exists')) {
      setError('Ya existe una cuenta con ese email.');
    } else if (msg.includes('auth/weak-password')) {
      setError('La contraseña debe tener al menos 6 caracteres.');
    } else if (msg.includes('auth/invalid-email')) {
      setError('El formato del email no es válido.');
    } else {
      setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) { setError('El nombre es obligatorio.'); setIsLoading(false); return; }
        await register(email, password, name);
      }
      window.location.href = '/wishlist';
    } catch (err) {
      handleError(err);
      setIsLoading(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'guest') => {
    setSocialLoading(provider);
    setError(null);
    try {
      if (provider === 'google') await loginWithGoogle();
      else await loginAsGuest();
      window.location.href = '/wishlist';
    } catch (err) {
      handleError(err);
    } finally {
      setSocialLoading(null);
    }
  };

  const isBusy = isLoading || socialLoading !== null;

  return (
    <div className="flex flex-col gap-6">

      <div className="flex border-b border-linen">
        <button
          type="button"
          onClick={() => { setTab('login'); setError(null); }}
          className={`flex-1 py-3 font-body text-[10px] uppercase tracking-widest transition-colors ${
            tab === 'login' ? 'text-noir border-b-[1.5px] border-noir -mb-px' : 'text-stone hover:text-noir'
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={() => { setTab('register'); setError(null); }}
          className={`flex-1 py-3 font-body text-[10px] uppercase tracking-widest transition-colors ${
            tab === 'register' ? 'text-noir border-b-[1.5px] border-noir -mb-px' : 'text-stone hover:text-noir'
          }`}
        >
          Crear Cuenta
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => handleSocial('google')}
          disabled={isBusy}
          className="w-full flex items-center justify-center gap-3 py-3 border border-linen font-body text-[10px] uppercase tracking-widest text-noir hover:bg-smoke transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {socialLoading === 'google' ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : <GoogleIcon />}
          Continuar con Google
        </button>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex-1 border-t border-linen" />
        <span className="font-body text-[10px] uppercase tracking-widest text-stone">o</span>
        <span className="flex-1 border-t border-linen" />
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {tab === 'register' && (
          <div className="flex flex-col gap-2">
            <label htmlFor="auth-name" className="font-body text-[10px] uppercase tracking-widest text-stone">
              Nombre
            </label>
            <input
              type="text"
              id="auth-name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(null); }}
              className="bg-transparent border-b border-linen py-2.5 font-body text-sm text-noir focus:outline-none focus:border-noir transition-colors placeholder:text-linen"
              placeholder="Tu nombre"
              required={tab === 'register'}
              autoComplete="name"
              disabled={isBusy}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="auth-email" className="font-body text-[10px] uppercase tracking-widest text-stone">
            Email
          </label>
          <input
            type="email"
            id="auth-email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
            className="bg-transparent border-b border-linen py-2.5 font-body text-sm text-noir focus:outline-none focus:border-noir transition-colors placeholder:text-linen"
            placeholder="tu@email.com"
            required
            autoComplete="email"
            disabled={isBusy}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="auth-password" className="font-body text-[10px] uppercase tracking-widest text-stone">
            Contraseña
          </label>
          <input
            type="password"
            id="auth-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(null); }}
            className="bg-transparent border-b border-linen py-2.5 font-body text-sm text-noir focus:outline-none focus:border-noir transition-colors placeholder:text-linen"
            placeholder="••••••••"
            required
            minLength={8}
            autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            disabled={isBusy}
          />
          {tab === 'register' && (
            <span className="font-body text-[10px] text-stone tracking-wider mt-1">Mínimo 8 caracteres</span>
          )}
        </div>

        {error && (
          <p className="font-body text-xs text-red-600 tracking-wider bg-red-50 border border-red-200 px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="w-full py-4 mt-1 border border-noir text-noir font-body text-[10px] uppercase tracking-widest hover:bg-noir hover:text-ivory transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {tab === 'login' ? 'Accediendo...' : 'Creando cuenta...'}
            </>
          ) : (
            tab === 'login' ? 'Iniciar Sesión con Email' : 'Crear Cuenta con Email'
          )}
        </button>
      </form>

      <button
        type="button"
        onClick={() => handleSocial('guest')}
        disabled={isBusy}
        className="flex items-center justify-center gap-2 w-full py-2.5 font-body text-[10px] uppercase tracking-widest text-stone hover:text-noir transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {socialLoading === 'guest' ? (
          <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : <GuestIcon />}
        Continuar como Invitado
      </button>

    </div>
  );
}
