import { create } from 'zustand';

interface WishlistState {
  items: string[]; // Array of product IDs
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addItem: (productId) => set((state) => {
    if (state.items.includes(productId)) return state;
    return { items: [...state.items, productId] };
  }),
  removeItem: (productId) => set((state) => ({ 
    items: state.items.filter((id) => id !== productId) 
  })),
  hasItem: (productId) => get().items.includes(productId),
  isWishlistOpen: false,
  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),
}));
