import React from 'react';
import { render, screen } from '@testing-library/react';
import { CollectionHero } from '../CollectionHero';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../animations/textReveal', () => ({
  initTextReveal: vi.fn(),
}));

const mockCollection = {
  id: '1',
  name: 'Spring 2026',
  description: 'Test',
  season: 'Spring',
  hero_image: 'hero.jpg',
  looks: ['l1']
};

describe('CollectionHero', () => {
  it('renders correctly', () => {
    render(<CollectionHero collection={mockCollection as any} />);
    expect(screen.getByText('Spring 2026')).toBeInTheDocument();
    expect(screen.getByText('Spring Collection')).toBeInTheDocument();
    
    const img = screen.getByAltText('Spring 2026');
    expect(img).toHaveAttribute('src', 'hero.jpg');
  });

  it('scrolls down when CTA is clicked', () => {
    window.scrollBy = vi.fn();
    render(<CollectionHero collection={mockCollection as any} />);
    
    const btn = screen.getByText('Scroll to explore').closest('button');
    btn?.click();
    
    expect(window.scrollBy).toHaveBeenCalledWith({ top: window.innerHeight, behavior: 'smooth' });
  });
});
