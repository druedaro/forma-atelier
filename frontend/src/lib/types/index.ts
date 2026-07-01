// ─── PocketBase base record fields ──────────────────────────────────────────
export interface PBRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Product extends PBRecord {
  name: string;
  slug: string;
  description: string;
  price: number;
  collection: string;     // "lumiere" | "ombra" | "terra"
  category: string;
  images: string[];       // PocketBase file names
  sizes: string[];
  available: boolean;
  featured: boolean;
  composition: string;
  care: string[];
}

// ─── Collection (editorial) ───────────────────────────────────────────────────
export interface Collection {
  id: string;
  name: string;
  slug: string;
  season: string;
  description: string;
  manifesto?: string;
  manifesto_image?: string;
  hero_image: string;
  palette: string[];
  active: boolean;
  order: number;
}

// ─── Look (lookbook entry) ────────────────────────────────────────────────────
export interface Look {
  id: string;
  title: string;
  image: string;
  collection: string;
  manifesto?: string;
  manifesto_image?: string;
  products: string[];
  order: number;
  expand?: {
    products: Product[];
  };
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

// ─── Order ───────────────────────────────────────────────────────────────────
export interface Order extends PBRecord {
  email: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_zip: string;
  notes?: string;
}
