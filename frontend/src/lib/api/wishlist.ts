import { pb } from '../pb';
import type { Product } from '../types';

// ─── Wishlist record shape from PocketBase ────────────────────────────────────
interface WishlistRecord {
  id: string;
  user_id: string;
  product_id: string;
  expand?: { product_id: Product };
}

// ─── Get all wishlist product IDs for the current user ───────────────────────
export async function getWishlistIds(): Promise<string[]> {
  if (!pb.authStore.isValid) return [];
  try {
    const records = await pb.collection('wishlists').getFullList<WishlistRecord>({
      filter: `user_id = "${pb.authStore.model?.id}"`,
    });
    return records.map(r => r.product_id);
  } catch {
    return [];
  }
}

// ─── Get full product data for wishlist items ─────────────────────────────────
export async function getWishlistProducts(): Promise<Product[]> {
  if (!pb.authStore.isValid) return [];
  try {
    const records = await pb.collection('wishlists').getFullList<WishlistRecord>({
      filter: `user_id = "${pb.authStore.model?.id}"`,
      expand: 'product_id',
    });
    return records
      .map(r => r.expand?.product_id)
      .filter((p): p is Product => !!p);
  } catch {
    return [];
  }
}

// ─── Add product to wishlist ─────────────────────────────────────────────────
export async function addToWishlist(productId: string): Promise<void> {
  if (!pb.authStore.isValid) throw new Error('Not authenticated');
  await pb.collection('wishlists').create({
    user_id: pb.authStore.model?.id,
    product_id: productId,
  });
}

// ─── Remove product from wishlist ────────────────────────────────────────────
export async function removeFromWishlist(productId: string): Promise<void> {
  if (!pb.authStore.isValid) return;
  try {
    const record = await pb.collection('wishlists').getFirstListItem<WishlistRecord>(
      `user_id = "${pb.authStore.model?.id}" && product_id = "${productId}"`
    );
    await pb.collection('wishlists').delete(record.id);
  } catch {
    // Already removed
  }
}
