import { pb } from '../pocketbase';
import type { Product } from '../types';

export async function getProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList({
      sort: '-created',
    });
    return records as unknown as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const record = await pb.collection('products').getFirstListItem(`slug="${slug}"`);
    return record as unknown as Product;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}
