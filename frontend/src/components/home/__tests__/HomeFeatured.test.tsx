import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomeFeatured } from '../HomeFeatured';
import { describe, it, expect, vi } from 'vitest';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    from: vi.fn(),
    to: vi.fn(),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({ default: {} }));

describe('HomeFeatured', () => {
  it('renders the section heading', () => {
    render(<HomeFeatured />);
    expect(screen.getByText(/Selección/i)).toBeInTheDocument();
  });

  it('renders all three featured products', () => {
    render(<HomeFeatured />);
    expect(screen.getByText('Vestido Silk Georgette')).toBeInTheDocument();
    expect(screen.getByText('Abrigo Lana Cashmere')).toBeInTheDocument();
    expect(screen.getByText(/Pantalón Lana Plisado/i)).toBeInTheDocument();
  });

  it('renders product prices', () => {
    render(<HomeFeatured />);
    expect(screen.getByText('1.850 €')).toBeInTheDocument();
    expect(screen.getByText('2.400 €')).toBeInTheDocument();
    expect(screen.getByText('720 €')).toBeInTheDocument();
  });

  it('renders a link to the full collections page', () => {
    render(<HomeFeatured />);
    const link = screen.getByRole('link', { name: /Ver Colecciones completas/i });
    expect(link).toHaveAttribute('href', '/collections');
  });

  it('renders product links pointing to the correct product pages', () => {
    render(<HomeFeatured />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map(l => l.getAttribute('href'));
    expect(hrefs).toContain('/products/vestido-silk-georgette');
    expect(hrefs).toContain('/products/abrigo-lana-cashmere');
    expect(hrefs).toContain('/products/pantalon-lana-plisado');
  });
});
