import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../../../lib/store/authStore';

vi.mock('../../../lib/store/authStore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../lib/store/authStore')>();
  return {
    ...actual,
    useAuthStore: vi.fn(() => ({
      login: vi.fn().mockResolvedValue(undefined),
      register: vi.fn().mockResolvedValue(undefined),
      loginWithGoogle: vi.fn().mockResolvedValue(undefined),
      loginAsGuest: vi.fn().mockResolvedValue(undefined),
      user: null,
      isLoggedIn: false,
    })),
  };
});

describe('LoginForm', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'http://localhost/login' },
    });
  });

  it('renders email and password fields on the login tab', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('renders Sign In and Create Account tabs', () => {
    render(<LoginForm />);
    const buttons = screen.getAllByRole('button', { name: /Iniciar Sesión/i });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /Crear Cuenta/i })).toBeInTheDocument();
  });

  it('renders the Google sign-in button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /Continuar con Google/i })).toBeInTheDocument();
  });

  it('renders the guest access button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /Continuar como Invitado/i })).toBeInTheDocument();
  });

  it('submits login form with email and password', async () => {
    const mockLogin = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useAuthStore).mockReturnValue({
      login: mockLogin,
      register: vi.fn(),
      loginWithGoogle: vi.fn(),
      loginAsGuest: vi.fn(),
      user: null,
      isLoggedIn: false,
    } as any);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@forma.es' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión con Email/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@forma.es', 'password123');
    });
  });

  it('shows the name field when switching to the Create Account tab', () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /Crear Cuenta/i }));
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
  });

  it('shows an error message on failed login', async () => {
    const mockLogin = vi.fn().mockRejectedValue(new Error('auth/invalid-credential'));
    vi.mocked(useAuthStore).mockReturnValue({
      login: mockLogin,
      register: vi.fn(),
      loginWithGoogle: vi.fn(),
      loginAsGuest: vi.fn(),
      user: null,
      isLoggedIn: false,
    } as any);

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'bad@email.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión con Email/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email o contraseña incorrectos/i)).toBeInTheDocument();
    });
  });
});
