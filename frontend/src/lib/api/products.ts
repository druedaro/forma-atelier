import { collection, getDocs, query, where, doc, getDoc, type DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import type { Product } from '../types';
import { mockProducts } from '../mock/data';

function docToProduct(id: string, data: DocumentData): Product {
  return {
    id,
    collectionId: '',
    collectionName: 'products',
    created: '',
    updated: '',
    name: data.name,
    slug: data.slug,
    description: data.description || '',
    price: data.price,
    collection: data.collection || '',
    category: data.category || '',
    images: Array.isArray(data.images) ? data.images : [],
    sizes: Array.isArray(data.sizes) ? data.sizes : [],
    available: data.available ?? true,
    featured: data.featured ?? false,
    composition: data.composition || '',
    care: Array.isArray(data.care) ? data.care : [],
    material: data.material,
    origin: data.origin,
  };
}

function withMockImages(product: Product): Product {
  if (!product.images || product.images.length === 0) {
    const mock = (mockProducts as unknown as Product[]).find(p => p.slug === product.slug);
    if (mock) product.images = mock.images;
  }
  return product;
}

// ─── Fetch all products ───────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, 'products'));
    if (snap.empty) return mockProducts as unknown as Product[];
    return snap.docs
      .map(d => withMockImages(docToProduct(d.id, d.data())))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn('[API] Firestore unavailable, using mock data:', err);
    return mockProducts as unknown as Product[];
  }
}

// ─── Fetch products by collection slug ───────────────────────────────────────

export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'), where('collection', '==', collectionSlug));
    const snap = await getDocs(q);
    if (snap.empty) return (mockProducts as unknown as Product[]).filter(p => p.collection === collectionSlug);
    return snap.docs
      .map(d => withMockImages(docToProduct(d.id, d.data())))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn('[API] Firestore unavailable, using mock data:', err);
    return (mockProducts as unknown as Product[]).filter(p => p.collection === collectionSlug);
  }
}

// ─── Fetch single product by slug ────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const q = query(collection(db, 'products'), where('slug', '==', slug));
    const snap = await getDocs(q);
    if (snap.empty) return (mockProducts as unknown as Product[]).find(p => p.slug === slug) ?? null;
    const d = snap.docs[0];
    return withMockImages(docToProduct(d.id, d.data()));
  } catch (err) {
    console.warn('[API] Firestore unavailable, using mock data:', err);
    return (mockProducts as unknown as Product[]).find(p => p.slug === slug) ?? null;
  }
}

// ─── Fetch featured products ─────────────────────────────────────────────────

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'), where('featured', '==', true));
    const snap = await getDocs(q);
    if (snap.empty) return (mockProducts as unknown as Product[]).filter(p => p.featured);
    return snap.docs
      .map(d => withMockImages(docToProduct(d.id, d.data())))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.warn('[API] Firestore unavailable, using mock data:', err);
    return (mockProducts as unknown as Product[]).filter(p => p.featured);
  }
}

// ─── Fetch single product by Firestore document ID ───────────────────────────

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    if (!snap.exists()) return null;
    return withMockImages(docToProduct(snap.id, snap.data()));
  } catch {
    return null;
  }
}
