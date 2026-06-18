import { pb } from '../pocketbase';
import type { Wishlist } from '../types';

export async function getUserWishlist(userId: string): Promise<Wishlist | null> {
  try {
    const record = await pb.collection('wishlists').getFirstListItem(`user="${userId}"`, {
      expand: 'products'
    });
    return record as unknown as Wishlist;
  } catch (error) {
    return null;
  }
}

export async function updateWishlist(wishlistId: string, products: string[]): Promise<Wishlist | null> {
  try {
    const record = await pb.collection('wishlists').update(wishlistId, {
      products
    }, { expand: 'products' });
    return record as unknown as Wishlist;
  } catch (error) {
    return null;
  }
}

export async function createWishlist(userId: string, products: string[]): Promise<Wishlist | null> {
  try {
    const record = await pb.collection('wishlists').create({
      user: userId,
      products
    }, { expand: 'products' });
    return record as unknown as Wishlist;
  } catch (error) {
    return null;
  }
}
