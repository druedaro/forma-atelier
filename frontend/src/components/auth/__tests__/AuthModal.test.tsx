import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthModal } from '../AuthModal';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../../lib/store/authStore';

describe('AuthModal', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthModalOpen: true, isAuthenticated: false, user: null });
  });

  it('renders correctly when open', () => {
    render(<AuthModal />);
    expect(screen.getByText('Acceder')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    useAuthStore.setState({ isAuthModalOpen: false });
    const { container } = render(<AuthModal />);
    expect(container.firstChild).toBeNull();
  });

  it('calls login on submit', () => {
    render(<AuthModal />);
    
    const inputs = screen.getAllByRole('textbox'); 
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Iniciar sesión' });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('test@test.com');
  });
});
