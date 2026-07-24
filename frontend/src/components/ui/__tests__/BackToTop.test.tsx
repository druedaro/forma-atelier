import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackToTop } from '../BackToTop';
import { describe, it, expect, vi } from 'vitest';

describe('BackToTop', () => {
  it('renders a back-to-top button', () => {
    render(<BackToTop />);
    expect(screen.getByRole('button', { name: /Volver arriba/i })).toBeInTheDocument();
  });

  it('is initially hidden (opacity-0 class)', () => {
    render(<BackToTop />);
    const btn = screen.getByRole('button', { name: /Volver arriba/i });
    expect(btn).toHaveClass('opacity-0');
  });

  it('becomes visible after scrolling past 500px', () => {
    render(<BackToTop />);
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    fireEvent.scroll(window);
    const btn = screen.getByRole('button', { name: /Volver arriba/i });
    expect(btn).toHaveClass('opacity-100');
  });

  it('calls window.scrollTo when clicked', () => {
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    window.scrollTo = vi.fn();
    render(<BackToTop />);
    fireEvent.scroll(window);
    fireEvent.click(screen.getByRole('button', { name: /Volver arriba/i }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
