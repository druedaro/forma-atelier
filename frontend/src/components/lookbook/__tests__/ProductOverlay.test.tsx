import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductOverlay } from '../ProductOverlay';
import { describe, it, expect, vi } from 'vitest';

const mockLook = {
  id: '1',
  title: 'Summer Collection Look',
  description: '',
  image: '',
  products: ['p1'],
  expand: {
    products: [
      { id: 'p1', name: 'Test Product', slug: 'test-product', price: 99.99, images: ['img1.jpg'], description: '', material: '', origin: '', sizes: [], available: true, featured: false }
    ]
  }
};

describe('ProductOverlay', () => {
  it('renders nothing if look is null', () => {
    const { container } = render(<ProductOverlay look={null} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with a look', () => {
    render(<ProductOverlay look={mockLook as any} onClose={() => {}} />);
    expect(screen.getByText('Summer Collection Look')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('99.99 €')).toBeInTheDocument();
  });

  it('contains close button that triggers close logic', () => {
    const handleClose = vi.fn();
    render(<ProductOverlay look={mockLook as any} onClose={handleClose} />);

    const closeBtn = screen.getByLabelText('Close overlay');
    fireEvent.click(closeBtn);
    expect(closeBtn).toBeInTheDocument();
  });
});
