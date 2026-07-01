import React from 'react';
import { render, screen } from '@testing-library/react';
import { WishlistGrid } from '../WishlistGrid';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWishlistStore } from '../../../lib/store/wishlistStore';

vi.mock('../../../lib/mock/data', () => ({
  mockProducts: [
    { id: '1', name: 'Product 1', slug: 'p1', price: 100, images: ['img1.jpg', 'img1-hover.jpg'], available: true },
    { id: '2', name: 'Product 2', slug: 'p2', price: 200, images: ['img2.jpg', 'img2-hover.jpg'], available: true },
  ]
}));

describe('WishlistGrid', () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: ['1'] });
  });

  it('renders products if wishlist has items', () => {
    render(<WishlistGrid />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('renders empty state if wishlist is empty', () => {
    useWishlistStore.setState({ items: [] });
    render(<WishlistGrid />);
    expect(screen.getByText('Tu lista de deseos está vacía.')).toBeInTheDocument();
  });
});
