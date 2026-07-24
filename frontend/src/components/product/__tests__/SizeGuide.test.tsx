import React from 'react';
import { render, screen } from '@testing-library/react';
import { SizeGuide } from '../SizeGuide';
import { describe, it, expect } from 'vitest';

describe('SizeGuide', () => {
  it('renders the size table', () => {
    render(<SizeGuide />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders all size rows (XS, S, M, L, XL)', () => {
    render(<SizeGuide />);
    expect(screen.getByText('XS (34)')).toBeInTheDocument();
    expect(screen.getByText('S (36)')).toBeInTheDocument();
    expect(screen.getByText('M (38)')).toBeInTheDocument();
    expect(screen.getByText('L (40)')).toBeInTheDocument();
    expect(screen.getByText('XL (42)')).toBeInTheDocument();
  });

  it('renders table column headers', () => {
    render(<SizeGuide />);
    expect(screen.getByText('Talla')).toBeInTheDocument();
    expect(screen.getAllByText('Pecho').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Cintura').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Cadera').length).toBeGreaterThanOrEqual(1);
  });

  it('renders measurement instructions section', () => {
    render(<SizeGuide />);
    expect(screen.getByText(/Cómo medirte/i)).toBeInTheDocument();
  });

  it('renders chest measurement instructions', () => {
    render(<SizeGuide />);
    const chestHeadings = screen.getAllByText('Pecho');
    expect(chestHeadings.length).toBeGreaterThanOrEqual(1);
  });
});
