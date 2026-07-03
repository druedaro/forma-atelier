import React, { useState } from 'react';
import { useAuthStore } from '../../lib/store/authStore';

type Tab = 'login' | 'register';

export function LoginForm() {
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login, register } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError('El nombre es obligatorio.');
          setIsLoading(false);
          return;
        }
        await register(email, password, name);
      }
      // Redirect to account/wishlist after login
      window.location.href = '/wishlist';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found') || msg.includes('invalid credentials')) {
        setError('Email o contraseña incorrectos.');
      } else if (msg.includes('auth/email-already-in-use') || msg.includes('already exists') || msg.includes('unique')) {
        setError('Ya existe una cuenta con ese email.');
      } else if (msg.includes('auth/weak-password')) {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else if (msg.includes('auth/invalid-email')) {
        setError('El formato del email no es válido.');
      } else {
        setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs */}
      <div className="flex border-b border-linen">
        <button
          type="button"
          onClick={() => { setTab('login'); setError(null); }}
          className={`flex-1 py-3 font-body text-[10px] uppercase tracking-widest transition-colors ${
            tab === 'login'
              ? 'text-noir border-b-[1.5px] border-noir -mb-px'
              : 'text-stone hover:text-noir'
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={() => { setTab('register'); setError(null); }}
          className={`flex-1 py-3 font-body text-[10px] uppercase tracking-widest transition-colors ${
            tab === 'register'
              ? 'text-noir border-b-[1.5px] border-noir -mb-px'
              : 'text-stone hover:text-noir'
          }`}
        >
          Crear Cuenta
        </button>
      </div>

      {/* Form */}
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
          />
          {tab === 'register' && (
            <span className="font-body text-[10px] text-stone tracking-wider mt-1">Mínimo 8 caracteres</span>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="font-body text-xs text-red-600 tracking-wider bg-red-50 border border-red-200 px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-2 bg-noir text-ivory font-body text-[10px] uppercase tracking-widest hover:bg-stone transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          data-cursor="expand"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-ivory" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {tab === 'login' ? 'Accediendo...' : 'Creando cuenta...'}
            </>
          ) : (
            tab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
          )}
        </button>
      </form>
    </div>
  );
}
