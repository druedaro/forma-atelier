import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartButton } from '../CartButton';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore } from '../../../lib/store/cartStore';

const mockProduct = {
  id: 'prod_1',
  name: 'Test Product',
  slug: 'test-product',
  description: '',
  price: 100,
  collection: 'col_1',
  category: '',
  images: [],
  sizes: ['M'],
  available: true,
  featured: false,
  composition: '',
  care: [],
};

describe('CartButton', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('renders a link pointing to /cart', () => {
    render(<CartButton />);
    expect(screen.getByRole('link', { name: /cesta/i })).toHaveAttribute('href', '/cart');
  });

  it('shows no badge when the cart is empty', () => {
    render(<CartButton />);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('shows a badge with the total item count when the cart has items', () => {
    useCartStore.setState({
      items: [{ id: 'item_1', product: mockProduct, size: 'M', quantity: 3 }],
    });
    render(<CartButton />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('dispatches an open-cart custom event on click', () => {
    const listener = vi.fn();
    window.addEventListener('open-cart', listener);
    render(<CartButton />);
    fireEvent.click(screen.getByRole('link', { name: /cesta/i }));
    expect(listener).toHaveBeenCalled();
    window.removeEventListener('open-cart', listener);
  });
});
