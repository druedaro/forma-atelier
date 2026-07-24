import { create } from 'zustand';
import { addToWishlist, removeFromWishlist, getWishlistIds } from '../api/wishlist';
import { auth } from '../firebase';

interface WishlistState {

  items: string[];
  isLoading: boolean;
  isWishlistOpen: boolean;


  loadItems: () => Promise<void>;

  openWishlist: () => void;
  closeWishlist: () => void;
  hasItem: (productId: string) => boolean;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  toggleItem: (productId: string) => Promise<void>;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
  items: [],
  isLoading: false,
  isWishlistOpen: false,

  loadItems: async () => {
    if (!auth.currentUser) {
      set({ items: [] });
      return;
    }
    if (get().isLoading) return;
    set({ isLoading: true });
    const ids = await getWishlistIds();
    set({ items: ids, isLoading: false });
  },

  openWishlist: () => set({ isWishlistOpen: true }),
  closeWishlist: () => set({ isWishlistOpen: false }),

  hasItem: (productId) => get().items.includes(productId),

  addItem: async (productId) => {

    set(state => ({ items: [...new Set([...state.items, productId])] }));
    try {
      await addToWishlist(productId);
    } catch {

      set(state => ({ items: state.items.filter(id => id !== productId) }));
    }
  },

  removeItem: async (productId) => {

    set(state => ({ items: state.items.filter(id => id !== productId) }));
    try {
      await removeFromWishlist(productId);
    } catch {

      set(state => ({ items: [...state.items, productId] }));
    }
  },

  toggleItem: async (productId) => {
    if (get().hasItem(productId)) {
      await get().removeItem(productId);
    } else {
      await get().addItem(productId);
    }
  },

  clear: () => set({ items: [] }),
}));
