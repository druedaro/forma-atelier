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

