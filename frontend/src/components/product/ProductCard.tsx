import React, { useState } from 'react';
import type { Product } from '../../lib/types';
import { Badge } from '../ui/Badge';

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
      className="group flex flex-col gap-4 block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="text"
      data-cursor-text="Ver"
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-smoke">
        <img 
          src={isHovered ? hoverImage : mainImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!product.available && (
            <Badge>Agotado</Badge>
          )}
          {product.available && product.featured && (
            <Badge>Destacado</Badge>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-body text-xs uppercase tracking-widest text-noir font-medium">
            {product.name}
          </h3>
          <span className="font-body text-xs text-stone tracking-wider whitespace-nowrap">
            {product.price} €
          </span>
        </div>
        <p className="font-body text-[10px] uppercase tracking-widest text-stone">
          {product.material}
        </p>
      </div>
    </a>
  );
}
