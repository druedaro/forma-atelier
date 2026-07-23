import React from 'react';
import { render, screen } from '@testing-library/react';
import { OrderConfirmation } from '../OrderConfirmation';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../../lib/api/orders', () => ({
  getOrder: vi.fn().mockResolvedValue(null),
}));

describe('OrderConfirmation', () => {
  beforeEach(() => {
    sessionStorage.clear();
    Object.defineProperty(window, 'location', {
      value: {
        href: '/success',
        search: '?payment_intent=pi_test_abc123&redirect_status=succeeded',
      },
      writable: true,
    });
  });

  it('renders the success heading', async () => {
    render(<OrderConfirmation />);
    expect(screen.getByRole('heading', { name: /gracias por tu pedido/i })).toBeInTheDocument();
  });

  it('derives a payment reference from the payment_intent URL param', async () => {
    render(<OrderConfirmation />);
    await screen.findByText(/Nº Pedido/i);
    expect(screen.getByText(/ABC123/i)).toBeInTheDocument();
  });

  it('renders a link back to the homepage', () => {
    render(<OrderConfirmation />);
    expect(screen.getByRole('link', { name: /volver al atelier/i })).toHaveAttribute('href', '/');
  });

  it('redirects to /checkout when the payment did not succeed', () => {
    Object.defineProperty(window, 'location', {
      value: { href: '/success', search: '?redirect_status=failed' },
      writable: true,
    });
    render(<OrderConfirmation />);
    expect(window.location.href).toBe('/checkout');
  });
});
