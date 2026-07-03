import type { Collection } from '../types';
import { mockCollections } from '../mock/data';

// Collections are editorial (not from PocketBase yet) — static data
// When a collections PB table is added, swap mock for pb.collection('collections')

export async function getCollections(): Promise<Collection[]> {
  return mockCollections as Collection[];
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return (mockCollections as Collection[]).find(c => c.slug === slug) ?? null;
}
