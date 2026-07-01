import React from 'react';
import { render } from '@testing-library/react';
import { AuthGuard } from '../AuthGuard';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../../lib/store/authStore';

describe('AuthGuard', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'http://localhost/' },
    });
  });

  it('renders children if authenticated', () => {
    useAuthStore.setState({ isAuthenticated: true });
    
    const { getByText } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );
    
    expect(getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /login and does not render children if not authenticated', () => {
    useAuthStore.setState({ isAuthenticated: false });
    
    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );
    
    expect(container.firstChild).toBeNull();
    expect(window.location.href).toBe('/login');
  });
});
