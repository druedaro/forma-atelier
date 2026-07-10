import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WishlistDrawer } from '../WishlistDrawer';
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
    id: '1', name: 'Vestido Silk', slug: 'vestido-silk', price: 1850,
    images: ['/img1.avif'], description: 'Test', collection: 'lumiere',
    category: 'vestidos', sizes: ['S', 'M'], available: true, featured: false,
    composition: '100% Seda', care: [],
  },
];

describe('[MUST] WishlistDrawer', () => {
  beforeEach(async () => {
    const { getWishlistProducts } = await import('../../../lib/api/wishlist');
    vi.mocked(getWishlistProducts).mockResolvedValue(mockProducts);
    useWishlistStore.setState({ isWishlistOpen: true, items: ['1'], isLoading: false });
  });

  it('[M1] renders drawer header when open', () => {
    render(<WishlistDrawer />);
    expect(screen.getByText(/Wishlist/i)).toBeInTheDocument();
  });

  it('[M2] renders empty state when no items', async () => {
    const { getWishlistProducts } = await import('../../../lib/api/wishlist');
    vi.mocked(getWishlistProducts).mockResolvedValue([]);
    useWishlistStore.setState({ items: [], isWishlistOpen: true });
    render(<WishlistDrawer />);
    await waitFor(() => {
      expect(screen.getByText(/Tu lista de deseos está vacía/i)).toBeInTheDocument();
    });
  });

  it('[M3] does not render when closed', () => {
    useWishlistStore.setState({ isWishlistOpen: false });
    const { container } = render(<WishlistDrawer />);
    expect(container.firstChild).toBeNull();
  });

  it('[S1] shows product price when loaded', async () => {
    render(<WishlistDrawer />);
    await waitFor(() => {
      expect(screen.getByText(/1850/)).toBeInTheDocument();
    });
  });
});
