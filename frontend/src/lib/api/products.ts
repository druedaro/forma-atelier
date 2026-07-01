import { pb } from '../pb';
import type { Product } from '../types';
import { mockProducts } from '../mock/data';

// Helper: build public image URL from PocketBase record + filename
export function getImageUrl(product: Product, filename: string): string {
  return pb.files.getUrl(product, filename);
}

// ─── Fetch all products (with PocketBase fallback to mocks) ──────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList<Product>({
      sort: 'name',
    });
    return records;
  } catch (err) {
    console.warn('[API] PocketBase unavailable, using mock data:', err);
    return mockProducts as Product[];
  }
}

// ─── Fetch products by collection slug ───────────────────────────────────────

export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList<Product>({
      filter: `collection = "${collectionSlug}"`,
      sort: 'name',
    });
    return records;
  } catch (err) {
    console.warn('[API] PocketBase unavailable, using mock data:', err);
    return (mockProducts as Product[]).filter(p => p.collection === collectionSlug);
  }
}

// ─── Fetch single product by slug ────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const record = await pb.collection('products').getFirstListItem<Product>(
      `slug = "${slug}"`
    );
    return record;
  } catch (err) {
    console.warn('[API] PocketBase unavailable, using mock data:', err);
    return (mockProducts as Product[]).find(p => p.slug === slug) ?? null;
  }
}

// ─── Fetch featured products ─────────────────────────────────────────────────

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList<Product>({
      filter: 'featured = true',
      sort: 'name',
    });
    return records;
  } catch (err) {
    console.warn('[API] PocketBase unavailable, using mock data:', err);
    return (mockProducts as Product[]).filter(p => p.featured);
  }
}
