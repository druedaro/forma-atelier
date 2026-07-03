import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LookCard } from '../LookCard';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../animations/imageParallax', () => ({
  initImageParallax: vi.fn(),
}));

const mockLook = {
  id: '1',
  title: 'Autumn Look',
  description: 'Test description',
  image: 'test.jpg',
  products: ['p1', 'p2'],
  expand: {
    products: [
      { id: 'p1', name: 'Product 1', slug: 'p-1', price: 100, images: ['p1.jpg'], description: '', material: '', origin: '', sizes: [], available: true, featured: false },
      { id: 'p2', name: 'Product 2', slug: 'p-2', price: 200, images: ['p2.jpg'], description: '', material: '', origin: '', sizes: [], available: true, featured: false }
    ]
  }
};

describe('LookCard', () => {
  it('renders look information correctly', () => {
    render(<LookCard look={mockLook as any} />);

    expect(screen.getByText('Autumn Look')).toBeInTheDocument();
    expect(screen.getByText('2 prendas')).toBeInTheDocument();

    const img = screen.getByAltText('Autumn Look');
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(<LookCard look={mockLook as any} onClick={handleClick} />);

    if (container.firstChild) {
      fireEvent.click(container.firstChild);
    }
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
