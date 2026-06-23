import { pb } from '../pocketbase';
import type { Collection } from '../types';

export async function getCollections(): Promise<Collection[]> {
  try {
    const records = await pb.collection('collections').getFullList({
      sort: '-created',
    });
    return records as unknown as Collection[];
  } catch (error) {
    return [];
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  try {
    const record = await pb.collection('collections').getFirstListItem(`slug="${slug}"`, {
      expand: 'looks.products',
    });
    return record as unknown as Collection;
  } catch (error) {
    return null;
  }
}
