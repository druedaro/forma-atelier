import React from 'react';
import { useWishlistStore } from '../../store/wishlistStore';
import { mockProducts } from '../../lib/mock/data';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';

export function WishlistGrid() {
  const { items } = useWishlistStore();
  const wishlistProducts = mockProducts.filter(p => items.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
        <p className="font-body text-lg text-stone tracking-widest uppercase">Tu lista de deseos está vacía.</p>
        <a href="/">
          <Button>Explorar Colección</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {wishlistProducts.map(product => (
        <ProductCard key={product.id} product={product as any} />
      ))}
    </div>
  );
}
