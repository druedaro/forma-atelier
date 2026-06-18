import React, { useState } from 'react';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';

export interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { hasItem, addItem, removeItem } = useWishlistStore();
  const { isAuthenticated, openAuthModal } = useAuthStore();
  
  const isWishlisted = hasItem(productId);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isWishlisted) {
      removeItem(productId);
    } else {
      addItem(productId);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={cn(
        'group flex items-center justify-center p-2 transition-colors duration-200',
        isWishlisted ? 'text-noir' : 'text-stone hover:text-noir',
        className
      )}
      data-cursor="expand"
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill={isWishlisted ? "currentColor" : "none"}
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={cn(
          'transition-transform duration-300',
          isAnimating ? 'scale-125' : 'scale-100',
          !isWishlisted && 'group-hover:scale-110'
        )}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
