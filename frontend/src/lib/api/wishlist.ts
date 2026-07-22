import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { getProductById } from './products';
import type { Product } from '../types';

function wishlistRef(userId: string) {
  return collection(db, 'wishlists', userId, 'items');
}

export async function getWishlistIds(): Promise<string[]> {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const snap = await getDocs(wishlistRef(user.uid));
    return snap.docs.map(d => d.id); 
  } catch {
    return [];
  }
}

export async function getWishlistProducts(): Promise<Product[]> {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const snap = await getDocs(wishlistRef(user.uid));
    const ids = snap.docs.map(d => d.id);
    if (ids.length === 0) return [];
    const products = await Promise.all(ids.map(id => getProductById(id)));
    return products.filter((p): p is Product => p !== null);
  } catch {
    return [];
  }
}

export async function addToWishlist(productId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  await setDoc(doc(db, 'wishlists', user.uid, 'items', productId), {
    addedAt: new Date().toISOString(),
  });
}

export async function removeFromWishlist(productId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await deleteDoc(doc(db, 'wishlists', user.uid, 'items', productId));
  } catch {

  }
}
