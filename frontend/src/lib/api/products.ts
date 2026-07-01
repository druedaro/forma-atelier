import { pb } from '../pb';
import type { Product } from '../types';
import { mockProducts } from '../mock/data';

// Helper: map images to full URLs or fallback to mock Unsplash images
function withFallbackImages(record: Product): Product {
  const mockProduct = mockProducts.find((p) => p.slug === record.slug);

  if (record.images && record.images.length > 0) {
    record.images = record.images.map((filename) => pb.files.getUrl(record, filename));
  } else if (mockProduct) {
    record.images = mockProduct.images;
  }

  return record;
}

// ─── Fetch all products (with PocketBase fallback to mocks) ──────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList<Product>({
      sort: 'name',
    });
    return records.map(withFallbackImages);
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
    return records.map(withFallbackImages);
  } catch (err) {
    console.warn('[API] PocketBase unavailable, using mock data:', err);
    return (mockProducts as Product[]).filter((p) => p.collection === collectionSlug);
  }
}

// ─── Fetch single product by slug ────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const record = await pb.collection('products').getFirstListItem<Product>(`slug = "${slug}"`);
    return withFallbackImages(record);
  } catch (err) {
    console.warn('[API] PocketBase unavailable, using mock data:', err);
    return (mockProducts as Product[]).find((p) => p.slug === slug) ?? null;
  }
}

// ─── Fetch featured products ─────────────────────────────────────────────────

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const records = await pb.collection('products').getFullList<Product>({
      filter: 'featured = true',
      sort: 'name',
    });
    return records.map(withFallbackImages);
  } catch (err) {
    console.warn('[API] PocketBase unavailable, using mock data:', err);
    return (mockProducts as Product[]).filter(p => p.featured);
  }
}
