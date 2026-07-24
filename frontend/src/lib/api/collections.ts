import type { Collection } from '../types';
import { mockCollections } from '../mock/data';


export async function getCollections(): Promise<Collection[]> {
  return mockCollections as Collection[];
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return (mockCollections as Collection[]).find(c => c.slug === slug) ?? null;
}
