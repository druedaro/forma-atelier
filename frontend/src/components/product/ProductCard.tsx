import React, { useState } from 'react';
import type { Product } from '../../lib/types';
import { Badge } from '../ui/Badge';
import { WishlistButton } from '../wishlist/WishlistButton';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.images[0];
  const hoverImage = product.images[1] || mainImage;

  return (
    <a
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      data-cursor="text"
      data-cursor-text="Ver"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-smoke">
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!product.available && (
            <Badge>Agotado</Badge>
          )}
          {product.available && product.featured && (
            <Badge>Destacado</Badge>
          )}
        </div>

        <div className="absolute top-2 right-2">
          <WishlistButton productId={product.id} className="bg-white" />
        </div>

        <div
          className="absolute bottom-0 left-0 w-full px-5 py-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%)' }}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.25em] text-ivory">
            Ver prenda
          </span>
          <span className="text-ivory" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 7h10M7 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-0 pt-4 border-b border-transparent group-hover:border-[#E8DDD0] transition-colors duration-300 pb-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-body text-xs uppercase tracking-widest text-noir font-medium">
            {product.name}
          </h3>
          <span className="font-body text-xs text-stone tracking-wider whitespace-nowrap">
            {product.price} €
          </span>
        </div>
        <p className="font-body text-[10px] uppercase tracking-widest text-stone/60 mt-1">
          {product.material}
        </p>
      </div>
    </a>
  );
}
