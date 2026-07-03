import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { Order, CartItem } from '../types';

export interface CreateOrderInput {
  email: string;
  items: CartItem[];
  total: number;
  shipping: number;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_zip: string;
  paymentIntentId?: string;
  notes?: string;
}

// ─── Create order (guest checkout — only called after Stripe confirms payment) ─

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const now = new Date().toISOString();
  const orderData = {
    email: input.email,
    status: 'paid' as const,
    total: input.total,
    shipping: input.shipping,
    paymentIntentId: input.paymentIntentId ?? '',
    items: input.items.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      productSlug: item.product.slug,
      price: item.product.price,
      size: item.size,
      quantity: item.quantity,
      image: item.product.images?.[0] ?? '',
    })),
    shipping_name: input.shipping_name,
    shipping_address: input.shipping_address,
    shipping_city: input.shipping_city,
    shipping_zip: input.shipping_zip,
    notes: input.notes ?? '',
    created: now,
    updated: now,
  };

  const docRef = await addDoc(collection(db, 'orders'), orderData);

  return {
    id: docRef.id,
    collectionId: '',
    collectionName: 'orders',
    ...orderData,
    items: input.items,
  } as Order;
}


// ─── Get order by ID ─────────────────────────────────────────────────────────

export async function getOrder(id: string): Promise<Order | null> {
  try {
    const snap = await getDoc(doc(db, 'orders', id));
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      id: snap.id,
      collectionId: '',
      collectionName: 'orders',
      ...data,
    } as Order;
  } catch {
    return null;
  }
}
