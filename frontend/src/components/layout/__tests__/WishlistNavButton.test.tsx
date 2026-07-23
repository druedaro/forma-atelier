import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistNavButton } from '../WishlistNavButton';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useWishlistStore } from '../../../lib/store/wishlistStore';
import { useAuthStore } from '../../../lib/store/authStore';

vi.mock('../../../lib/firebase', () => ({
  auth: { currentUser: null },
  db: {},
  storage: {},
}));

vi.mock('../../../lib/api/wishlist', () => ({
  getWishlistIds: vi.fn().mockResolvedValue([]),
  addToWishlist: vi.fn(),
  removeFromWishlist: vi.fn(),
}));

describe('WishlistNavButton', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [], isWishlistOpen: false, loadItems: vi.fn() });
    useAuthStore.setState({ isLoggedIn: false });
    Object.defineProperty(window, 'location', { value: { href: '/' }, writable: true });
  });

  it('renders a wishlist button', () => {
    render(<WishlistNavButton />);
    expect(screen.getByRole('button', { name: /lista de deseos/i })).toBeInTheDocument();
  });

  it('shows a badge with the wishlist item count when logged in', () => {
    useAuthStore.setState({ isLoggedIn: true });
    useWishlistStore.setState({ items: ['prod_1', 'prod_2'], loadItems: vi.fn() });
    render(<WishlistNavButton />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('redirects to /login when the user is not authenticated', () => {
    render(<WishlistNavButton />);
    fireEvent.click(screen.getByRole('button', { name: /lista de deseos/i }));
    expect(window.location.href).toBe('/login');
  });

  it('opens the wishlist drawer when the user is authenticated', () => {
    const openWishlist = vi.fn();
    useAuthStore.setState({ isLoggedIn: true });
    useWishlistStore.setState({ items: [], openWishlist, loadItems: vi.fn() });
    render(<WishlistNavButton />);
    fireEvent.click(screen.getByRole('button', { name: /lista de deseos/i }));
    expect(openWishlist).toHaveBeenCalled();
  });
});
