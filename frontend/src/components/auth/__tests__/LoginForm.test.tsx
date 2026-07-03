import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../../../lib/store/authStore';

describe('LoginForm', () => {
  beforeEach(() => {
    useAuthStore.setState({ isLoggedIn: false, user: null });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'http://localhost/login' },
    });
  });

  it('renders correctly', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  it('logs in and redirects on submit', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitBtn = screen.getByRole('button', { name: 'Iniciar sesión' });

    fireEvent.change(emailInput, { target: { value: 'test@forma.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitBtn);

    const state = useAuthStore.getState();
    expect(state.isLoggedIn).toBe(false); 
    expect(state.user?.email).toBe('test@forma.com');
    expect(window.location.href).toBe('/');
  });
});
