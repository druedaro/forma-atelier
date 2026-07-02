#!/usr/bin/env node
/**
 * Seed Firestore with Forma Atelier products.
 *
 * Prerequisites:
 *   1. Go to Firebase Console → Project Settings → Service accounts
 *      → Generate new private key → save as serviceAccountKey.json
 *      in this same directory (frontend/scripts/)
 *   2. npm install -g firebase-admin  OR  npm install --save-dev firebase-admin
 *   3. node scripts/seed-firestore.mjs
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load service account key
const keyPath = resolve(__dirname, 'serviceAccountKey.json')
let serviceAccount
try {
  serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8'))
} catch {
  console.error('❌  serviceAccountKey.json not found in frontend/scripts/')
  console.error('   Download it from: Firebase Console → Project Settings → Service accounts')
  process.exit(1)
}

const { default: admin } = await import('firebase-admin')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

// ─── Product catalogue ────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: 'Vestido Silk Georgette', slug: 'vestido-silk-georgette',
    description: 'Vestido midi en georgette de seda natural. Caída fluida, cuello en V pronunciado y mangas ligeramente acampanadas.',
    price: 485, collection: 'lumiere', category: 'vestidos',
    sizes: ['XS','S','M','L'], images: [], available: true, featured: true,
    composition: '100% Silk Georgette',
    care: ['Dry clean only','Store hanging','Avoid direct sunlight'] },

  { name: 'Pantalón Lino Sartorial', slug: 'pantalon-lino-sartorial',
    description: 'Pantalón de lino de alto gramaje con pinzas estructuradas. Corte recto, cinturilla alta.',
    price: 295, collection: 'terra', category: 'pantalones',
    sizes: ['XS','S','M','L','XL'], images: [], available: true, featured: false,
    composition: '100% Linen',
    care: ['Machine wash cold','Tumble dry low','Iron medium heat'] },

  { name: 'Blazer Algodón Estructurado', slug: 'blazer-algodon-estructurado',
    description: 'Blazer en algodón de doble hilo con estructura interna ligera. Solapas entalladas, dos botones forrados.',
    price: 385, collection: 'ombra', category: 'blazers',
    sizes: ['XS','S','M','L'], images: [], available: true, featured: true,
    composition: '97% Cotton, 3% Elastane',
    care: ['Dry clean recommended','Hang to dry','Iron inside out'] },

  { name: 'Falda Satín Slip', slug: 'falda-satin-slip',
    description: 'Falda midi en satén de acetato. Silueta en A, cierre lateral con cremallera oculta.',
    price: 225, collection: 'lumiere', category: 'faldas',
    sizes: ['XS','S','M','L'], images: [], available: true, featured: false,
    composition: '80% Acetate, 20% Silk lining',
    care: ['Dry clean only','Store flat','Avoid moisture'] },

  { name: 'Top Punto Acanalado', slug: 'top-punto-acanalado',
    description: 'Top de punto acanalado en mezcla de cachemir. Cuello redondo, corte ajustado.',
    price: 185, collection: 'terra', category: 'tops',
    sizes: ['XS','S','M','L','XL'], images: [], available: true, featured: false,
    composition: '70% Cashmere, 30% Merino wool',
    care: ['Hand wash cold','Dry flat','Do not wring'] },

  { name: 'Abrigo Lana Cashmere', slug: 'abrigo-lana-cashmere',
    description: 'Abrigo de corte largo en lana bouclé con mezcla de cashmere. Cuello solapa, doble botonadura.',
    price: 895, collection: 'ombra', category: 'abrigos',
    sizes: ['XS','S','M','L'], images: [], available: true, featured: true,
    composition: '80% Wool, 20% Cashmere',
    care: ['Dry clean only','Store in garment bag','Avoid prolonged sunlight'] },

  { name: 'Camisa Seda Medianoche', slug: 'camisa-seda-medianoche',
    description: 'Camisa oversize en seda lavada. Cuello clásico con forma, puños con doble botón.',
    price: 345, collection: 'ombra', category: 'camisas',
    sizes: ['XS','S','M','L','XL'], images: [], available: true, featured: false,
    composition: '100% Washed Silk',
    care: ['Hand wash cold','Dry flat in shade','Iron on silk setting'] },

  { name: 'Pantalón Lana Plisado', slug: 'pantalon-lana-plisado',
    description: 'Pantalón de lana virgen con pliegues frontales y pernera ancha. Cinturilla alta con trabillas.',
    price: 365, collection: 'ombra', category: 'pantalones',
    sizes: ['XS','S','M','L'], images: [], available: true, featured: false,
    composition: '100% Virgin Wool',
    care: ['Dry clean only','Press with steam','Store hanging'] },

  { name: 'Corsé Cinturón Piel', slug: 'corse-cinturon-piel',
    description: 'Cinturón corsé en piel de becerro plena flor. Construcción rígida con ballenas internas.',
    price: 265, collection: 'terra', category: 'accesorios',
    sizes: ['XS','S','M','L'], images: [], available: true, featured: true,
    composition: 'Full-grain calfskin leather',
    care: ['Wipe with dry cloth','Condition with leather balm','Store in dust bag'] },

  { name: 'Vestido Lino Arena', slug: 'vestido-lino-arena',
    description: 'Vestido maxi en lino stonewashed. Silueta recta con pinzas en el busto, abertura lateral.',
    price: 315, collection: 'terra', category: 'vestidos',
    sizes: ['XS','S','M','L','XL'], images: [], available: true, featured: false,
    composition: '100% Stonewashed Linen',
    care: ['Machine wash cold','Tumble dry low','Iron damp'] },

  { name: 'Bolso Tote Rafia', slug: 'bolso-tote-rafia',
    description: 'Bolso tote tejido en rafia natural. Asas de cuero natural, interior en lino sin teñir.',
    price: 195, collection: 'terra', category: 'accesorios',
    sizes: ['One size'], images: [], available: false, featured: false,
    composition: 'Natural raffia, vegetable-tanned leather handles',
    care: ['Spot clean only','Avoid rain and moisture','Store stuffed in dust bag'] },

  { name: 'Jersey Punto Tierra', slug: 'jersey-punto-tierra',
    description: 'Jersey de punto grueso en lana merino sin tratamiento. Cuello redondo amplio, mangas raglan.',
    price: 245, collection: 'terra', category: 'jerseys',
    sizes: ['XS','S','M','L','XL'], images: [], available: true, featured: false,
    composition: '100% Untreated Merino Wool',
    care: ['Hand wash cold','Dry flat','Reshape while damp'] },

  { name: 'Pantalón Palazzo Fluido', slug: 'pantalon-palazzo-fluido',
    description: 'Pantalón palazzo en crepé de viscosa. Pernera muy ancha y fluida, cinturilla elástica cubierta.',
    price: 275, collection: 'lumiere', category: 'pantalones',
    sizes: ['XS','S','M','L','XL'], images: [], available: true, featured: false,
    composition: '100% Viscose Crepe',
    care: ['Machine wash gentle cold','Hang dry','Do not iron'] },
]

// ─── Seed ─────────────────────────────────────────────────────────────────────
console.log(`\nSeeding ${PRODUCTS.length} products into Firestore...\n`)

const batch = db.batch()
let created = 0

for (const product of PRODUCTS) {
  const slug = product.slug
  // Use slug as document ID for consistent references
  const ref = db.collection('products').doc(slug)
  const existing = await ref.get()
  if (existing.exists) {
    console.log(`  ↳ "${product.name}" already exists, skipping`)
    continue
  }
  batch.set(ref, {
    ...product,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
  })
  console.log(`  ✓ ${product.name}`)
  created++
}

await batch.commit()
console.log(`\n✅ Done — ${created} products created.\n`)
