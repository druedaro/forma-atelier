import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistButton } from '../WishlistButton';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useWishlistStore } from '../../../lib/store/wishlistStore';
import { useAuthStore } from '../../../lib/store/authStore';

vi.mock('../../../lib/firebase', () => ({
  auth: { currentUser: { uid: 'test-user' } },
}));

describe('WishlistButton', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] });
    useAuthStore.setState({ isLoggedIn: true });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'http://localhost/' },
    });
  });

  it('renders the add-to-wishlist button', () => {
    render(<WishlistButton productId="123" />);
    const btn = screen.getByRole('button', { name: 'Añadir a favoritos' });
    expect(btn).toBeInTheDocument();
  });

  it('redirects to /login when the user is not authenticated', async () => {
    useAuthStore.setState({ isLoggedIn: false });
    render(<WishlistButton productId="123" />);

    const btn = screen.getByRole('button', { name: 'Añadir a favoritos' });
    fireEvent.click(btn);

    expect(window.location.href).toBe('/login');
    expect(useWishlistStore.getState().items).not.toContain('123');
  });

  it('adds the item to the wishlist when authenticated', () => {
    render(<WishlistButton productId="123" />);
    fireEvent.click(screen.getByRole('button', { name: 'Añadir a favoritos' }));
    expect(useWishlistStore.getState().items).toContain('123');
  });

  it('removes the item from the wishlist when it is already added', () => {
    useWishlistStore.setState({ items: ['123'] });
    render(<WishlistButton productId="123" />);
    fireEvent.click(screen.getByRole('button', { name: 'Quitar de favoritos' }));
    expect(useWishlistStore.getState().items).not.toContain('123');
  });
});
