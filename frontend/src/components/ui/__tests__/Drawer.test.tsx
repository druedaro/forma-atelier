import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from '../Drawer';
import { describe, it, expect, vi } from 'vitest';

vi.mock('gsap', () => ({
  gsap: {
    set: vi.fn(),
    to: vi.fn(),
  },
}));

vi.mock('../../lib/hooks/useFocusTrap', () => ({
  useFocusTrap: vi.fn(() => ({ current: document.createElement('div') })),
}));

describe('Drawer', () => {
  it('renders nothing before mounting (initial state)', () => {
    const { container } = render(
      <Drawer isOpen={false} onClose={vi.fn()} title="Test Drawer">
        <p>Content</p>
      </Drawer>
    );
    expect(container.querySelector('[aria-label="Cerrar panel"]')).not.toBeInTheDocument();
  });

  it('renders the drawer title', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Cart">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('renders children inside the drawer', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Cart">
        <p>Drawer child content</p>
      </Drawer>
    );
    expect(screen.getByText('Drawer child content')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} title="Cart">
        <p>Content</p>
      </Drawer>
    );
    const closeBtn = screen.getByLabelText('Cerrar panel');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
