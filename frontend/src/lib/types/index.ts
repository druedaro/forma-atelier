export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  collection: string;
  category: string;
  images: string[];
  sizes: string[];
  available: boolean;
  featured: boolean;
  composition: string;
  care: string[];
  material?: string;
  origin?: string;
}

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

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  email: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shipping: number;
  items: CartItem[];
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_zip: string;
  paymentIntentId?: string;
  notes?: string;
  created?: string;
  updated?: string;
}
