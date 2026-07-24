import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types/index';

const mockProduct: Product = {
  id: 'prod-001',
  name: 'Vestido Silk Georgette',
  slug: 'vestido-silk-georgette',
  description: 'Vestido de seda georgette de corte A-line',
  price: 1850,
  collection: 'lumiere',
  category: 'vestidos',
  images: ['/assets/vestido.avif'],
  sizes: ['XS', 'S', 'M', 'L'],
  available: true,
  featured: true,
  composition: '100% Seda',
  care: ['Lavado en seco'],
  material: 'Seda',
  origin: 'Italia',
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 'prod-002',
  name: 'Abrigo Lana Cashmere',
  slug: 'abrigo-lana-cashmere',
  price: 2400,
};

describe('cartStore — core actions', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  it('[M1] initial state has empty cart and drawer closed', () => {
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.isOpen).toBe(false);
  });

  it('[M2] addItem() adds a new product with size and opens cart', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe('prod-001');
    expect(state.items[0].size).toBe('S');
    expect(state.items[0].quantity).toBe(1);
    expect(state.isOpen).toBe(true);
  });

  it('[M3] addItem() increments quantity when same product+size is added again', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    useCartStore.getState().addItem(mockProduct, 'S');
    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('[M4] addItem() creates separate entries for different sizes', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    useCartStore.getState().addItem(mockProduct, 'M');
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it('[M5] removeItem() removes by composite id (productId-size)', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    const itemId = useCartStore.getState().items[0].id;
    useCartStore.getState().removeItem(itemId);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('[M6] updateQuantity() changes item quantity', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    const itemId = useCartStore.getState().items[0].id;
    useCartStore.getState().updateQuantity(itemId, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('[M7] updateQuantity() removes item when quantity <= 0', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    const itemId = useCartStore.getState().items[0].id;
    useCartStore.getState().updateQuantity(itemId, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('[M8] clearCart() empties all items', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    useCartStore.getState().addItem(mockProduct2, 'M');
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('[M9] toggleCart() toggles isOpen state', () => {
    expect(useCartStore.getState().isOpen).toBe(false);
    useCartStore.getState().toggleCart();
    expect(useCartStore.getState().isOpen).toBe(true);
    useCartStore.getState().toggleCart();
    expect(useCartStore.getState().isOpen).toBe(false);
  });

  it('[M10] toggleCart(true) forces open state', () => {
    useCartStore.getState().toggleCart(true);
    expect(useCartStore.getState().isOpen).toBe(true);
    useCartStore.getState().toggleCart(true);
    expect(useCartStore.getState().isOpen).toBe(true);
  });
});

describe('cartStore — totals calculation', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  it('[S1] calculates total price correctly for multiple items', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    useCartStore.getState().addItem(mockProduct, 'S');
    useCartStore.getState().addItem(mockProduct2, 'M');

    const items = useCartStore.getState().items;
    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    expect(total).toBe(1850 * 2 + 2400);
  });

  it('[S2] shipping is free when total exceeds 200€', () => {
    useCartStore.getState().addItem(mockProduct, 'S');
    const total = useCartStore.getState().items.reduce(
      (acc, item) => acc + item.product.price * item.quantity, 0
    );
    const shipping = total > 200 ? 0 : 15;
    expect(shipping).toBe(0);
  });

  it('[S3] shipping is 15€ when total is under 200€', () => {
    const cheapProduct = { ...mockProduct, price: 50 };
    useCartStore.getState().addItem(cheapProduct, 'S');
    const total = useCartStore.getState().items.reduce(
      (acc, item) => acc + item.product.price * item.quantity, 0
    );
    const shipping = total > 200 ? 0 : 15;
    expect(shipping).toBe(15);
  });
});

describe('cartStore — edge cases', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  it('[C1] removeItem() on non-existent id does not crash', () => {
    expect(() => useCartStore.getState().removeItem('non-existent-id')).not.toThrow();
  });

  it("[C2] adding products with zero price doesn't break totals", () => {
    const freeProduct = { ...mockProduct, price: 0 };
    useCartStore.getState().addItem(freeProduct, 'S');
    const total = useCartStore.getState().items.reduce(
      (acc, item) => acc + item.product.price * item.quantity, 0
    );
    expect(total).toBe(0);
  });
});
