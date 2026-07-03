import React, { useEffect, useState } from 'react';
import { useWishlistStore } from '../../lib/store/wishlistStore';
import { useAuthStore } from '../../lib/store/authStore';

export interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className = '' }: WishlistButtonProps) {
  const { hasItem, toggleItem, loadFromPB } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn) {
      loadFromPB();
    }
  }, [isLoggedIn, loadFromPB]);

  if (!mounted) return null;

  const isWishlisted = hasItem(productId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    if (isPending) return;

    setIsAnimating(true);
    setIsPending(true);
    setTimeout(() => setIsAnimating(false), 300);

    await toggleItem(productId);
    setIsPending(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`group flex items-center justify-center p-2 transition-colors duration-200 ${
        isWishlisted ? 'text-noir' : 'text-stone hover:text-noir'
      } ${className}`}
      data-cursor="expand"
      aria-label={isWishlisted ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      disabled={isPending}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isWishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isAnimating ? 'scale-125' : 'scale-100'
        } ${!isWishlisted ? 'group-hover:scale-110' : ''}`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
