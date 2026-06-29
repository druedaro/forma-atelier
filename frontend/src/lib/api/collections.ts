import type { Collection } from '../types';
import { mockCollections } from '../mock/data';

export async function getCollections(): Promise<Collection[]> {
  return mockCollections;
}
