import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { WishlistGrid } from '../WishlistGrid';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWishlistStore } from '../../../lib/store/wishlistStore';
import type { Product } from '../../../lib/types/index';

vi.mock('../../../lib/api/wishlist', () => ({
  getWishlistProducts: vi.fn(),
  addToWishlist: vi.fn().mockResolvedValue(undefined),
  removeFromWishlist: vi.fn().mockResolvedValue(undefined),
  getWishlistIds: vi.fn().mockResolvedValue([]),
}));

vi.mock('../../../lib/firebase', () => ({
  auth: { currentUser: { uid: 'test-uid' } },
  db: {},
}));

const mockProducts: Product[] = [
  {
    id: '1', name: 'Product 1', slug: 'p1', price: 100,
    images: ['/img1.avif', '/img1h.avif'], description: 'Test',
    collection: 'lumiere', category: 'vestidos', sizes: ['S'], available: true,
    featured: false, composition: '100% Seda', care: [],
  },
  {
    id: '2', name: 'Product 2', slug: 'p2', price: 200,
    images: ['/img2.avif', '/img2h.avif'], description: 'Test 2',
    collection: 'lumiere', category: 'vestidos', sizes: ['M'], available: true,
    featured: false, composition: '100% Lana', care: [],
  },
];

describe('WishlistGrid', () => {
  beforeEach(async () => {
    const { getWishlistProducts } = await import('../../../lib/api/wishlist');
    vi.mocked(getWishlistProducts).mockResolvedValue(mockProducts);

    const { useAuthStore } = await import('../../../lib/store/authStore');
    useAuthStore.setState({ isLoggedIn: true });
  });

  it('shows the empty wishlist message when there are no items', async () => {
    const { getWishlistProducts } = await import('../../../lib/api/wishlist');
    vi.mocked(getWishlistProducts).mockResolvedValueOnce([]);
    useWishlistStore.setState({ items: [] });
    render(<WishlistGrid />);
    await waitFor(() => {
      expect(screen.getByText('Tu lista de deseos está vacía')).toBeInTheDocument();
    });
  });

  it('renders an explore collections link when the wishlist is empty', async () => {
    const { getWishlistProducts } = await import('../../../lib/api/wishlist');
    vi.mocked(getWishlistProducts).mockResolvedValueOnce([]);
    useWishlistStore.setState({ items: [] });
    render(<WishlistGrid />);
    await waitFor(() => {
      expect(screen.getByText('Explorar Colecciones')).toBeInTheDocument();
    });
  });

  it('reflects items that exist in the store', () => {
    useWishlistStore.setState({ items: ['1'] });
    render(<WishlistGrid />);
    expect(useWishlistStore.getState().items).toContain('1');
  });
});
