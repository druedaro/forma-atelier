import React, { useEffect, useState } from 'react';
import { useWishlistStore } from '../../lib/store/wishlistStore';
import { useAuthStore } from '../../lib/store/authStore';
import { getWishlistProducts } from '../../lib/api/wishlist';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';
import type { Product } from '../../lib/types';

export function WishlistGrid() {
  const { isLoggedIn } = useAuthStore();
  const { items } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isLoggedIn) {
      setIsLoading(false);
      setProducts([]);
      return;
    }

    setIsLoading(true);
    getWishlistProducts()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [isLoggedIn, mounted]);

  useEffect(() => {
    if (!mounted || !isLoggedIn || products.length === 0) return;
    setProducts(prev => prev.filter(p => items.includes(p.id)));
  }, [items]);

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center py-20">
        <svg className="animate-spin h-6 w-6 text-stone" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
        <svg className="w-12 h-12 text-stone opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <p className="font-body text-sm text-stone tracking-widest uppercase">
          Inicia sesión para ver tu lista de deseos
        </p>
        <a href="/login">
          <Button>Iniciar Sesión</Button>
        </a>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
        <svg className="w-12 h-12 text-stone opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <p className="font-body text-sm text-stone tracking-widest uppercase">
          Tu lista de deseos está vacía
        </p>
        <a href="/collections">
          <Button>Explorar Colecciones</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
