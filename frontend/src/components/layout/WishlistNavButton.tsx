import React, { useEffect, useState } from 'react';
import { useWishlistStore } from '../../lib/store/wishlistStore';
import { useAuthStore } from '../../lib/store/authStore';

export function WishlistNavButton() {
  const { openWishlist, items, loadFromPB } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn) {
      loadFromPB();
    }
  }, [isLoggedIn, loadFromPB]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    openWishlist();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Lista de deseos"
      className="p-2 hover:opacity-60 transition-opacity duration-200 relative block"
      data-cursor="expand"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {mounted && items.length > 0 && (
        <span className="absolute top-0 right-0 w-4 h-4 bg-noir text-ivory text-[9px] font-body flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
          {items.length}
        </span>
      )}
    </button>
  );
}
