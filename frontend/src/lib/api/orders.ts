import { pb } from '../pb';
import type { Order, CartItem } from '../types';

export interface CreateOrderInput {
  email: string;
  items: CartItem[];
  total: number;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_zip: string;
  notes?: string;
}

// ─── Create order (guest checkout) ──────────────────────────────────────────

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const record = await pb.collection('orders').create<Order>({
    ...input,
    status: 'pending',
    // Serialize items as JSON-safe snapshot (strip PB-specific fields)
    items: input.items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productSlug: item.product.slug,
      price: item.product.price,
      size: item.size,
      quantity: item.quantity,
    })),
  });

  return record;
}

// ─── Get order by ID ─────────────────────────────────────────────────────────

export async function getOrder(id: string): Promise<Order | null> {
  try {
    return await pb.collection('orders').getOne<Order>(id);
  } catch {
    return null;
  }
}
