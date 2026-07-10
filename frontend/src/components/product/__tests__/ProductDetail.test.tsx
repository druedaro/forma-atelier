import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDetail } from '../ProductDetail';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../animations/textReveal', () => ({
  initTextReveal: vi.fn(),
}));

vi.mock('../../../lib/firebase', () => ({
  auth: { currentUser: null },
  db: {},
}));

vi.mock('../../../lib/api/wishlist', () => ({
  addToWishlist: vi.fn().mockResolvedValue(undefined),
  removeFromWishlist: vi.fn().mockResolvedValue(undefined),
  getWishlistIds: vi.fn().mockResolvedValue([]),
}));

const mockProduct = {
  id: '1',
  name: 'Detailed Product',
  slug: 'detailed-product',
  price: 150,
  images: ['/img1.avif', '/img2.avif'],
  description: 'A detailed test product',
  material: 'Silk',
  origin: 'Spain',
  sizes: ['S', 'M', 'L'],
  available: true,
  featured: false,
  collection: 'lumiere',
  category: 'vestidos',
  composition: '100% Seda',
  care: ['Lavado en seco'],
};

describe('[MUST] ProductDetail', () => {
  it('[M1] renders product name and price', () => {
    render(<ProductDetail product={mockProduct as any} />);
    expect(screen.getByText('Detailed Product')).toBeInTheDocument();
    expect(screen.getByText(/150 €/)).toBeInTheDocument();
  });

  it('[M2] renders product description', () => {
    render(<ProductDetail product={mockProduct as any} />);
    expect(screen.getByText('A detailed test product')).toBeInTheDocument();
  });

  it('[M3] renders Material field when provided', () => {
    render(<ProductDetail product={mockProduct as any} />);
    expect(screen.getByText(/Material: Silk/)).toBeInTheDocument();
  });

  it('[M4] submit button is disabled when no size selected', () => {
    render(<ProductDetail product={mockProduct as any} />);
    const btn = screen.getByRole('button', { name: /Selecciona una talla/i });
    expect(btn).toBeDisabled();
  });

  it('[M5] selecting a size enables the add to cart button', () => {
    render(<ProductDetail product={mockProduct as any} />);
    fireEvent.click(screen.getByText('M'));
    expect(screen.getByRole('button', { name: /Añadir a la cesta/i })).toBeEnabled();
  });

  it('[S1] renders size buttons for all available sizes', () => {
    render(<ProductDetail product={mockProduct as any} />);
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('[S2] renders product images', () => {
    render(<ProductDetail product={mockProduct as any} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('[C1] shows Agotado button when product is unavailable', () => {
    const unavailable = { ...mockProduct, available: false };
    render(<ProductDetail product={unavailable as any} />);
    expect(screen.getByRole('button', { name: /Agotado/i })).toBeDisabled();
  });
});
