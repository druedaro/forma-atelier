import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistButton } from '../WishlistButton';
import { describe, it, expect, beforeEach } from 'vitest';
import { useWishlistStore } from '../../../store/wishlistStore';
import { useAuthStore } from '../../../store/authStore';

describe('WishlistButton', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] });
    useAuthStore.setState({ isAuthenticated: true, isAuthModalOpen: false });
  });

  it('renders correctly', () => {
    render(<WishlistButton productId="123" />);
    const btn = screen.getByRole('button', { name: 'Add to wishlist' });
    expect(btn).toBeInTheDocument();
  });

  it('opens auth modal if not authenticated', () => {
    useAuthStore.setState({ isAuthenticated: false });
    render(<WishlistButton productId="123" />);
    
    const btn = screen.getByRole('button', { name: 'Add to wishlist' });
    fireEvent.click(btn);
    
    expect(useAuthStore.getState().isAuthModalOpen).toBe(true);
    expect(useWishlistStore.getState().items).not.toContain('123');
  });

  it('adds item to wishlist if authenticated', () => {
    render(<WishlistButton productId="123" />);
    
    const btn = screen.getByRole('button', { name: 'Add to wishlist' });
    fireEvent.click(btn);
    
    expect(useWishlistStore.getState().items).toContain('123');
  });

  it('removes item from wishlist if already added', () => {
    useWishlistStore.setState({ items: ['123'] });
    render(<WishlistButton productId="123" />);
    
    const btn = screen.getByRole('button', { name: 'Remove from wishlist' });
    fireEvent.click(btn);
    
    expect(useWishlistStore.getState().items).not.toContain('123');
  });
});
