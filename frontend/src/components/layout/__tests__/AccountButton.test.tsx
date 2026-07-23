import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccountButton } from '../AccountButton';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../../../lib/store/authStore';

vi.mock('../../../lib/store/authStore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../lib/store/authStore')>();
  return {
    ...actual,
    useAuthStore: vi.fn(() => ({
      isLoggedIn: false,
      user: null,
      logout: vi.fn(),
      restoreSession: vi.fn(),
    })),
  };
});

describe('AccountButton', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', { value: { href: '/' }, writable: true });
  });

  it('renders a link to /login when not authenticated', () => {
    render(<AccountButton />);
    const link = screen.getByRole('link', { name: /cuenta/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('renders account menu button when authenticated', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isLoggedIn: true,
      user: { id: '1', email: 'test@forma.es', name: 'Test User' },
      logout: vi.fn(),
      restoreSession: vi.fn(),
    } as any);

    render(<AccountButton />);
    expect(screen.getByRole('button', { name: /menú de cuenta/i })).toBeInTheDocument();
  });

  it('opens dropdown menu when account button is clicked', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isLoggedIn: true,
      user: { id: '1', email: 'test@forma.es', name: 'Test User' },
      logout: vi.fn(),
      restoreSession: vi.fn(),
    } as any);

    render(<AccountButton />);
    fireEvent.click(screen.getByRole('button', { name: /menú de cuenta/i }));
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Mi Wishlist')).toBeInTheDocument();
  });

  it('calls logout and redirects to home on sign-out click', () => {
    const mockLogout = vi.fn();
    vi.mocked(useAuthStore).mockReturnValue({
      isLoggedIn: true,
      user: { id: '1', email: 'test@forma.es', name: 'Test User' },
      logout: mockLogout,
      restoreSession: vi.fn(),
    } as any);

    render(<AccountButton />);
    fireEvent.click(screen.getByRole('button', { name: /menú de cuenta/i }));
    fireEvent.click(screen.getByText('Cerrar Sesión'));
    expect(mockLogout).toHaveBeenCalled();
    expect(window.location.href).toBe('/');
  });
});
