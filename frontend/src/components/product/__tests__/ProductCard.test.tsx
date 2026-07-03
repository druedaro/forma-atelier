import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { describe, it, expect } from 'vitest';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  slug: 'test-product',
  price: 99.99,
  images: ['img1.jpg', 'img2.jpg'],
  description: '',
  material: 'Cotton',
  origin: '',
  sizes: [],
  available: true,
  featured: true,
};

describe('ProductCard', () => {
  it('renders correctly', () => {
    render(<ProductCard product={mockProduct as any} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('99.99 €')).toBeInTheDocument();
    expect(screen.getByText('Cotton')).toBeInTheDocument();
    expect(screen.getByText('Destacado')).toBeInTheDocument();
    const img = screen.getByAltText('Test Product');
    expect(img).toHaveAttribute('src', 'img1.jpg');
  });

  it('shows hover image on mouse enter', () => {
    const { container } = render(<ProductCard product={mockProduct as any} />);
    const link = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(link);
    const img = screen.getByAltText('Test Product');
    expect(img).toHaveAttribute('src', 'img2.jpg');

    fireEvent.mouseLeave(link);
    expect(img).toHaveAttribute('src', 'img1.jpg');
  });

  it('shows out of stock badge if unavailable', () => {
    const unavailableProduct = { ...mockProduct, available: false, featured: false };
    render(<ProductCard product={unavailableProduct as any} />);
    expect(screen.getByText('Agotado')).toBeInTheDocument();
  });
});
