import { pb } from '../pocketbase';
import type { Product } from '../types';

export async function getProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList({
      sort: '-created',
    });
    return records as unknown as Product[];
  } catch (error) {
    return [];
  }
}

