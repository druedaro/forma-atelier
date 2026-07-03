import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthGuard } from '../AuthGuard';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../../lib/store/authStore';

describe('AuthGuard', () => {
  beforeEach(() => {
    // Reset window.location mock
    Object.defineProperty(window, 'location', {
      value: { href: '/' },
      writable: true
    });
  });

  it('renders children when authenticated', () => {
    useAuthStore.setState({ isLoggedIn: true });
    
    render(
      <AuthGuard>
        <div data-testid="protected-content">Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    useAuthStore.setState({ isLoggedIn: false });
    
    const { container } = render(
      <AuthGuard>
        <div data-testid="protected-content">Protected Content</div>
      </AuthGuard>
    );
    
    expect(container.firstChild).toBeNull();
    expect(window.location.href).toBe('/login');
  });
});
