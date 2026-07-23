import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartPageContent } from '../CartPageContent';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore } from '../../../lib/store/cartStore';

const mockProduct = {
  id: 'prod_1',
  name: 'Vestido Silk Georgette',
  slug: 'vestido-silk-georgette',
  description: 'Vestido fluido',
  price: 1850,
  collection: 'col_1',
  category: '',
  images: ['/assets/vestido.avif'],
  sizes: ['S', 'M'],
  available: true,
  featured: true,
  composition: '',
  care: [],
};

const mockCartItem = {
  id: 'item_1',
  product: mockProduct,
  size: 'M',
  quantity: 2,
};

describe('CartPageContent', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it('shows an empty cart message when there are no items', () => {
    render(<CartPageContent />);
    expect(screen.getByText('Tu cesta está vacía')).toBeInTheDocument();
  });

  it('renders cart items when the cart is not empty', () => {
    useCartStore.setState({ items: [mockCartItem] });
    render(<CartPageContent />);
    expect(screen.getByText('Vestido Silk Georgette')).toBeInTheDocument();
    expect(screen.getByText(/Talla:/)).toBeInTheDocument();
  });

  it('displays the correct total price for items in the cart', () => {
    useCartStore.setState({ items: [mockCartItem] });
    render(<CartPageContent />);
    const totals = screen.getAllByText(/3700\.00 €/);
    expect(totals.length).toBeGreaterThanOrEqual(1);
  });

  it('shows free shipping for orders over 200€', () => {
    useCartStore.setState({ items: [mockCartItem] });
    render(<CartPageContent />);
    expect(screen.getByText('Gratis')).toBeInTheDocument();
  });

  it('calls removeItem when the delete button is clicked', () => {
    const removeItem = vi.fn();
    useCartStore.setState({ items: [mockCartItem], removeItem });
    render(<CartPageContent />);
    const deleteBtn = screen.getByLabelText('Eliminar artículo');
    fireEvent.click(deleteBtn);
    expect(removeItem).toHaveBeenCalledWith('item_1');
  });

  it('navigates to /checkout when the checkout button is clicked', () => {
    useCartStore.setState({ items: [mockCartItem] });
    Object.defineProperty(window, 'location', { value: { href: '/' }, writable: true });
    render(<CartPageContent />);
    const checkoutBtn = screen.getByText('Proceder al pago');
    fireEvent.click(checkoutBtn);
    expect(window.location.href).toBe('/checkout');
  });
});
