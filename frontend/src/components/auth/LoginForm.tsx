import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: '1', email, name: 'Guest' });
    window.location.href = '/';
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="login-email" className="font-body text-[10px] uppercase tracking-widest text-stone">Email</label>
        <input 
          type="email" 
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border-b-[0.5px] border-stone py-2 font-body text-sm text-noir focus:outline-none focus:border-noir transition-colors"
          placeholder="tu@email.com"
          required
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="login-password" className="font-body text-[10px] uppercase tracking-widest text-stone">Contraseña</label>
        <input 
          type="password" 
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border-b-[0.5px] border-stone py-2 font-body text-sm text-noir focus:outline-none focus:border-noir transition-colors"
          placeholder="••••••••"
          required
        />
      </div>

      <button 
        type="submit"
        className="w-full py-4 mt-4 bg-noir text-ivory font-body text-[10px] uppercase tracking-widest hover:bg-stone transition-colors"
        data-cursor="expand"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
