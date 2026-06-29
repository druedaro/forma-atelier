import type { Product } from '../types';
import { mockProducts } from '../mock/data';

export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}
