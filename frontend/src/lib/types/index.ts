export interface Collection {
  id: string
  name: string
  slug: string
  season: string
  description: string
  manifesto?: string
  manifesto_image?: string
  hero_image: string
  palette: string[]
  active: boolean
  order: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  material: string
  origin: string
  images: string[]
  collection: string
  sizes: string[]
  available: boolean
  featured: boolean
  expand?: {
    collection: Collection
  }
}

export interface Look {
  id: string
  title: string
  image: string
  collection: string
  manifesto?: string
  manifesto_image?: string
  products: string[]
  order: number
  expand?: {
    products: Product[]
  }
}

