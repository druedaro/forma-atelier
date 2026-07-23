import React from 'react';
import { render, screen } from '@testing-library/react';
import { HorizontalGallery } from '../HorizontalGallery';
import { describe, it, expect, vi } from 'vitest';
import type { Look } from '../../../lib/types';

const mockLooks: Look[] = [
  {
    id: 'look_1',
    title: 'Dawn Campaign',
    image: '/assets/look1.avif',
    collection: 'col_1',
    products: ['prod_1', 'prod_2'],
    order: 1,
    expand: {
      products: [
        {
          id: 'prod_1', name: 'Product One', slug: 'product-one', price: 500,
          images: ['/assets/p1.avif'], description: '', collection: 'col_1',
          category: '', sizes: ['S'], available: true, featured: false,
          composition: '', care: [],
        },
      ],
    },
  },
  {
    id: 'look_2',
    title: 'Midnight Campaign',
    image: '/assets/look2.avif',
    collection: 'col_2',
    products: ['prod_3'],
    order: 2,
  },
];

vi.mock('../LookCard', () => ({
  LookCard: ({ look }: { look: Look }) => <div data-testid="look-card">{look.title}</div>,
}));

describe('HorizontalGallery', () => {
  it('renders the gallery headline', () => {
    render(<HorizontalGallery looks={mockLooks} collectionSlugs={{}} />);
    expect(screen.getByText("L'Édition")).toBeInTheDocument();
  });

  it('renders a LookCard for each look', () => {
    render(<HorizontalGallery looks={mockLooks} collectionSlugs={{}} />);
    const cards = screen.getAllByTestId('look-card');
    expect(cards).toHaveLength(2);
  });

  it('renders the look titles via LookCard', () => {
    render(<HorizontalGallery looks={mockLooks} collectionSlugs={{}} />);
    expect(screen.getByText('Dawn Campaign')).toBeInTheDocument();
    expect(screen.getByText('Midnight Campaign')).toBeInTheDocument();
  });

  it('renders empty when looks array is empty', () => {
    render(<HorizontalGallery looks={[]} collectionSlugs={{}} />);
    expect(screen.queryAllByTestId('look-card')).toHaveLength(0);
    expect(screen.getByText("L'Édition")).toBeInTheDocument();
  });
});
