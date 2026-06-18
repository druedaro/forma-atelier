import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDetail } from '../ProductDetail';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../animations/textReveal', () => ({
  initTextReveal: vi.fn(),
}));

const mockProduct = {
  id: '1',
  name: 'Detailed Product',
  slug: 'detailed-product',
  price: 150,
  images: ['img1.jpg', 'img2.jpg'],
  description: 'A detailed test product',
  material: 'Silk',
  origin: 'Spain',
  sizes: ['S', 'M', 'L'],
  available: true,
  featured: false,
};

describe('ProductDetail', () => {
  it('renders correctly', () => {
    render(<ProductDetail product={mockProduct as any} />);
    expect(screen.getByText('Detailed Product')).toBeInTheDocument();
    expect(screen.getByText('150 €')).toBeInTheDocument();
    expect(screen.getByText('A detailed test product')).toBeInTheDocument();
    expect(screen.getByText('Material: Silk')).toBeInTheDocument();
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('handles size selection', () => {
    render(<ProductDetail product={mockProduct as any} />);
    
    const sizeM = screen.getByText('M');
    fireEvent.click(sizeM);
    
    expect(sizeM).toHaveClass('bg-noir', 'text-ivory');
    
    const addToCart = screen.getByText('Añadir a la cesta');
    expect(addToCart).toBeEnabled();
  });

  it('disables add to cart when no size is selected', () => {
    render(<ProductDetail product={mockProduct as any} />);
    const addToCart = screen.getByText('Selecciona una talla');
    expect(addToCart).toBeDisabled();
  });
});
