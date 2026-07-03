import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { WishlistDrawer } from '../WishlistDrawer';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWishlistStore } from '../../../lib/store/wishlistStore';

vi.mock('../../../lib/mock/data', () => ({
  mockProducts: [
    { id: '1', name: 'Product 1', slug: 'p1', price: 100, images: ['img1.jpg'] },
    { id: '2', name: 'Product 2', slug: 'p2', price: 200, images: ['img2.jpg'] },
  ]
}));

describe('WishlistDrawer', () => {
  beforeEach(() => {
    useWishlistStore.setState({ isWishlistOpen: true, items: ['1'] });
  });

  it('renders correctly when open with items', () => {
    render(<WishlistDrawer />);

    expect(screen.getByText('Wishlist (1)')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('100 €')).toBeInTheDocument();
  });

  it('renders empty state when no items', () => {
    useWishlistStore.setState({ items: [] });
    render(<WishlistDrawer />);

    expect(screen.getByText('Wishlist (0)')).toBeInTheDocument();
    expect(screen.getByText('Tu lista de deseos está vacía.')).toBeInTheDocument();
    expect(screen.getByText('Explorar colección')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    useWishlistStore.setState({ isWishlistOpen: false });
    const { container } = render(<WishlistDrawer />);

    expect(container.firstChild).toBeNull();
  });

  it('allows removing an item', () => {
    render(<WishlistDrawer />);

    const removeBtn = screen.getByText('Eliminar');
    fireEvent.click(removeBtn);

    expect(useWishlistStore.getState().items).not.toContain('1');
  });
});
