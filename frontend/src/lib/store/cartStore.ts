import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types';

export interface CartItem {
  id: string; // product.id + size
  product: Product;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: (isOpen?: boolean) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (product, size) => set((state) => {
        const id = `${product.id}-${size}`;
        const existingItem = state.items.find(item => item.id === id);
        
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isOpen: true
          };
        }
        
        return {
          items: [...state.items, { id, product, size, quantity: 1 }],
          isOpen: true
        };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity <= 0 
          ? state.items.filter(item => item.id !== id)
          : state.items.map(item => item.id === id ? { ...item, quantity } : item)
      })),
      toggleCart: (isOpen) => set((state) => ({
        isOpen: isOpen !== undefined ? isOpen : !state.isOpen
      })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'forma-atelier-cart',
    }
  )
);
