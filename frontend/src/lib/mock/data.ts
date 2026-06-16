import type { Collection, Product, Look } from '../types';

export const mockCollections: Collection[] = [
  {
    id: 'col_1',
    name: 'Lumière',
    slug: 'lumiere',
    season: 'SS25',
    description: 'A study of light and structure. Whites, beiges, and soft golds defining the early morning sun touching the stone.',
    hero_image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    palette: ['#F5F0EA', '#C9A96E', '#E8DDD0'],
    active: true,
    order: 1
  },
  {
    id: 'col_2',
    name: 'Ombra',
    slug: 'ombra',
    season: 'AW25',
    description: 'The elegance of the shadow. Deep charcoals, stark blacks, and dark burgundy for the quiet winter nights.',
    hero_image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop',
    palette: ['#0A0A0A', '#8C7B6B', '#1A1A1A'],
    active: true,
    order: 2
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Silk Georgette Gown',
    slug: 'silk-georgette-gown',
    description: 'Fluid, asymmetric gown that catches the light with every movement. Features a draped neckline and open back.',
    price: 1850,
    material: '100% Natural Silk',
    origin: 'Handcrafted in Barcelona',
    images: [
      'https://images.unsplash.com/photo-1566206091558-f6229900ecfa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1200&auto=format&fit=crop'
    ],
    collection: 'col_1',
    sizes: ['XS', 'S', 'M', 'L'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[0] }
  },
  {
    id: 'prod_2',
    name: 'Linen Tailored Trousers',
    slug: 'linen-tailored-trousers',
    description: 'High-waisted wide leg trousers with double pleats. An everyday essential elevated through perfect tailoring.',
    price: 680,
    material: '100% Organic Linen',
    origin: 'Woven in Italy, Made in Spain',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
    ],
    collection: 'col_1',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[0] }
  },
  {
    id: 'prod_3',
    name: 'Wool Cashmere Coat',
    slug: 'wool-cashmere-coat',
    description: 'Oversized structured coat with dropped shoulders and hidden button closure.',
    price: 2400,
    material: '80% Wool, 20% Cashmere',
    origin: 'Made in Barcelona',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop'
    ],
    collection: 'col_2',
    sizes: ['S', 'M', 'L'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[1] }
  }
];

export const mockLooks: Look[] = [
  {
    id: 'look_1',
    title: 'The Morning Light',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=2000&auto=format&fit=crop',
    collection: 'col_1',
    products: ['prod_1', 'prod_2'],
    order: 1,
    expand: { products: [mockProducts[0], mockProducts[1]] }
  },
  {
    id: 'look_2',
    title: 'Midday Structure',
    image: 'https://images.unsplash.com/photo-1485230895905-ef31ba2078af?q=80&w=2000&auto=format&fit=crop',
    collection: 'col_1',
    products: ['prod_2'],
    order: 2,
    expand: { products: [mockProducts[1]] }
  }
];
