import type { Collection, Product, Look } from '../types';

export const mockCollections: Collection[] = [
  {
    id: 'col_1',
    name: 'Lumière',
    slug: 'lumiere',
    season: 'SS25',
    description: 'Un estudio de luz y estructura. Blancos, beiges y dorados suaves que definen el sol de la mañana rozando la piedra.',
    hero_image: '/assets/photo-1490481651871-ab68de25d43d.avif',
    palette: ['#F5F0EA', '#C9A96E', '#E8DDD0'],
    active: true,
    order: 1
  },
  {
    id: 'col_2',
    name: 'Ombra',
    slug: 'ombra',
    season: 'AW25',
    description: 'La elegancia de la sombra. Carbones profundos, negros austeros y burdeos oscuros para las silenciosas noches de invierno.',
    hero_image: '/assets/photo-1539533018447-63fcce2678e3.avif',
    palette: ['#0A0A0A', '#8C7B6B', '#1A1A1A'],
    active: true,
    order: 2
  },
  {
    id: 'col_3',
    name: 'Terra',
    slug: 'terra',
    season: 'RE25',
    description: 'Un retorno al origen. Tonos tierra, siluetas fluidas y texturas orgánicas inspiradas en la costa del Mediterráneo.',
    hero_image: '/assets/photo-1469334031218-e382a71b716b.avif',
    palette: ['#8C7B6B', '#E8DDD0', '#C9A96E'],
    active: true,
    order: 3
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Vestido Silk Georgette',
    slug: 'vestido-silk-georgette',
    description: 'Vestido fluido y asimétrico que atrapa la luz con cada movimiento. Cuenta con un escote drapeado y espalda descubierta.',
    price: 1850,
    material: '100% Seda Natural',
    origin: 'Hecho a mano en Barcelona',
    images: [
      '/assets/vestido-silk-georgette.avif',
      '/assets/photo-1539008835657-9e8e9680c956.avif'
    ],
    collection: 'col_1',
    sizes: ['XS', 'S', 'M', 'L'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[0] }
  },
  {
    id: 'prod_2',
    name: 'Pantalón Lino Sartorial',
    slug: 'pantalon-lino-sartorial',
    description: 'Pantalones anchos de talle alto con doble pinza. Un esencial de uso diario elevado mediante sastrería perfecta.',
    price: 680,
    material: '100% Lino Orgánico',
    origin: 'Tejido en Italia, Hecho en España',
    images: [
      '/assets/photo-1509631179647-0177331693ae.avif'
    ],
    collection: 'col_1',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[0] }
  },
  {
    id: 'prod_1_3',
    name: 'Blazer Algodón Estructurado',
    slug: 'blazer-algodon-estructurado',
    description: 'Blazer estructurado oversized en algodón blanco puro con hombreras afiladas.',
    price: 950,
    material: '100% Algodón Orgánico',
    origin: 'Hecho en Barcelona',
    images: ['/assets/blazer-algodon-estructurado.avif'],
    collection: 'col_1',
    sizes: ['S', 'M', 'L'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[0] }
  },
  {
    id: 'prod_1_4',
    name: 'Falda Satin Slip',
    slug: 'falda-satin-slip',
    description: 'Falda midi cortada al bies en satén marfil. Se mueve como el agua.',
    price: 450,
    material: '100% Satén de Seda',
    origin: 'Hecho en España',
    images: ['/assets/falda-satin-slip.avif'],
    collection: 'col_1',
    sizes: ['XS', 'S', 'M', 'L'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[0] }
  },
  {
    id: 'prod_1_5',
    name: 'Top Punto Acanalado',
    slug: 'top-punto-acanalado',
    description: 'Top minimalista sin mangas de punto con un escote asimétrico.',
    price: 320,
    material: '100% Algodón Egipcio',
    origin: 'Hecho en Italia',
    images: ['/assets/photo-1469334031218-e382a71b716b.avif'],
    collection: 'col_1',
    sizes: ['S', 'M', 'L'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[0] }
  },

  {
    id: 'prod_3',
    name: 'Abrigo Lana Cashmere',
    slug: 'abrigo-lana-cashmere',
    description: 'Abrigo estructurado oversized con hombros caídos y cierre de botones oculto.',
    price: 2400,
    material: '80% Lana, 20% Cashmere',
    origin: 'Hecho en Barcelona',
    images: [
      '/assets/photo-1539533018447-63fcce2678e3.avif'
    ],
    collection: 'col_2',
    sizes: ['S', 'M', 'L'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[1] }
  },
  {
    id: 'prod_2_2',
    name: 'Camisa Seda Medianoche',
    slug: 'camisa-seda-medianoche',
    description: 'Camisa de seda oscura translúcida con puños extendidos y cuello afilado.',
    price: 590,
    material: '100% Seda',
    origin: 'Hecho en Italia',
    images: ['/assets/camisa-seda-medianoche.avif'],
    collection: 'col_2',
    sizes: ['XS', 'S', 'M', 'L'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[1] }
  },
  {
    id: 'prod_2_3',
    name: 'Pantalón Lana Plisado',
    slug: 'pantalon-lana-plisado',
    description: 'Pantalones de lana pesada en color carbón con un pliegue arquitectónico fuerte.',
    price: 720,
    material: '100% Lana Virgen',
    origin: 'Hecho en España',
    images: ['/assets/photo-1509631179647-0177331693ae.avif'],
    collection: 'col_2',
    sizes: ['S', 'M', 'L', 'XL'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[1] }
  },
  {
    id: 'prod_2_4',
    name: 'Corsé Cinturón Piel',
    slug: 'corse-cinturon-piel',
    description: 'Un accesorio estructural que redefine por completo la silueta.',
    price: 450,
    material: '100% Piel de Becerro',
    origin: 'Hecho en España',
    images: ['/assets/corse-cinturon-piel.avif'],
    collection: 'col_2',
    sizes: ['S', 'M'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[1] }
  },

  {
    id: 'prod_3_1',
    name: 'Vestido Lino Arena',
    slug: 'vestido-lino-arena',
    description: 'Vestido maxi fluido con bordes crudos, perfecto para un escape mediterráneo.',
    price: 850,
    material: '100% Lino',
    origin: 'Hecho en España',
    images: ['/assets/vestido-lino-arena.avif'],
    collection: 'col_3',
    sizes: ['XS', 'S', 'M', 'L'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[2] }
  },
  {
    id: 'prod_3_2',
    name: 'Bolso Tote Rafia',
    slug: 'bolso-tote-rafia',
    description: 'Bolso tote estructurado oversized tejido completamente a mano.',
    price: 600,
    material: '100% Rafia Natural',
    origin: 'Hecho a mano en España',
    images: ['/assets/photo-1590874103328-eac38a683ce7.avif'],
    collection: 'col_3',
    sizes: ['TALLA ÚNICA'],
    available: true,
    featured: true,
    expand: { collection: mockCollections[2] }
  },
  {
    id: 'prod_3_3',
    name: 'Jersey Punto Tierra',
    slug: 'jersey-punto-tierra',
    description: 'Jersey de punto abierto grueso en color terracota intenso.',
    price: 520,
    material: '50% Algodón, 50% Lino',
    origin: 'Hecho en Italia',
    images: ['/assets/photo-1620799140408-edc6dcb6d633.avif'],
    collection: 'col_3',
    sizes: ['S', 'M', 'L'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[2] }
  },
  {
    id: 'prod_3_4',
    name: 'Pantalón Palazzo Fluido',
    slug: 'pantalon-palazzo-fluido',
    description: 'Pantalones extremadamente anchos que fluyen y se mueven como una falda larga.',
    price: 650,
    material: '100% Cupro',
    origin: 'Hecho en España',
    images: ['/assets/photo-1582552938357-32b906df40cb.avif'],
    collection: 'col_3',
    sizes: ['XS', 'S', 'M', 'L'],
    available: true,
    featured: false,
    expand: { collection: mockCollections[2] }
  }
];

export const mockLooks: Look[] = [
  {
    id: 'look_1',
    title: 'Campaña: La luz del alba',
    image: '/assets/photo-1485968579580-b6d095142e6e.avif',
    collection: 'col_1',
    products: ['prod_1', 'prod_2'],
    order: 1,
    expand: { products: [mockProducts[0], mockProducts[1]] }
  },
  {
    id: 'look_2',
    title: 'Campaña: Simetría matutina',
    image: '/assets/photo-1512436991641-6745cdb1723f.avif',
    collection: 'col_1',
    products: ['prod_1_3', 'prod_1_4'],
    order: 2,
    expand: { products: [mockProducts[2], mockProducts[3]] }
  },
  {
    id: 'look_3',
    title: 'Campaña: El eco de la noche',
    image: '/assets/photo-1509631179647-0177331693ae.avif',
    collection: 'col_2',
    products: ['prod_3', 'prod_2_3'],
    order: 3,
    expand: { products: [mockProducts[5], mockProducts[7]] }
  },
  {
    id: 'look_4',
    title: 'Campaña: Contrastes oscuros',
    image: '/assets/photo-1539533018447-63fcce2678e3.avif',
    collection: 'col_2',
    products: ['prod_2_2', 'prod_2_4'],
    order: 4,
    expand: { products: [mockProducts[6], mockProducts[8]] }
  },
  {
    id: 'look_5',
    title: 'Campaña: Retorno al origen',
    image: '/assets/photo-1496747611176-843222e1e57c.avif',
    collection: 'col_3',
    products: ['prod_3_1', 'prod_3_2'],
    order: 5,
    expand: { products: [mockProducts[9], mockProducts[10]] }
  },
  {
    id: 'look_6',
    title: 'Campaña: Texturas orgánicas',
    image: '/assets/photo-1490481651871-ab68de25d43d.avif',
    collection: 'col_3',
    products: ['prod_3_3', 'prod_3_4'],
    order: 6,
    expand: { products: [mockProducts[11], mockProducts[12]] }
  }
];
