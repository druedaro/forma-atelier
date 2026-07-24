import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('Test render error');
  return <div>OK</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('renders the default fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Algo ha ido mal/i)).toBeInTheDocument();
  });

  it('renders a retry button in the fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('button', { name: /Reintentar/i })).toBeInTheDocument();
  });

  it('renders a custom fallback when one is provided', () => {
    render(
      <ErrorBoundary fallback={<p>Custom fallback</p>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('calls the onError callback when a child throws', () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  it('resets the error boundary and re-renders on retry', () => {
    let shouldThrow = true;

    const ToggleError = () => {
      if (shouldThrow) throw new Error('Test error');
      return <div>Recovered</div>;
    };

    const { rerender } = render(
      <ErrorBoundary>
        <ToggleError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Algo ha ido mal/i)).toBeInTheDocument();
    shouldThrow = false;

    fireEvent.click(screen.getByRole('button', { name: /Reintentar/i }));

    rerender(
      <ErrorBoundary>
        <ToggleError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });
});
