<div align="center">

# FORMA ATELIER

**Moda contemporánea de Barcelona**

*La moda como arquitectura del cuerpo. Cada prenda, una construcción.*

[![Deploy](https://img.shields.io/badge/Production-forma--atelier--bcn.vercel.app-black?style=flat-square&logo=vercel)](https://forma-atelier-bcn.vercel.app)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)

</div>

---

## Stack

| Capa | Tecnología |
|---|---|
| **Framework** | [Astro 5](https://astro.build) — Static + SSR endpoints |
| **UI** | [React 19](https://react.dev) + Astro Islands |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com) con design system propio |
| **Animaciones** | [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) (smooth scroll) |
| **Auth** | [Firebase Auth](https://firebase.google.com) — Email, Google, Apple, Anónimo |
| **Base de datos** | [Cloud Firestore](https://firebase.google.com/products/firestore) |
| **Pagos** | [Stripe](https://stripe.com) — Elements + Payment Intents |
| **Estado** | [Zustand](https://zustand-demo.pmnd.rs) |
| **Deploy** | [Vercel](https://vercel.com) |

---

## Arquitectura

```
forma-atelier/
└── frontend/                  # Monorepo único (Astro)
    ├── public/
    │   ├── assets/            # Imágenes .avif optimizadas
    │   ├── robots.txt
    │   ├── llms.txt           # Contexto para modelos de lenguaje
    │   └── sitemap-index.xml  # Auto-generado en build
    └── src/
        ├── animations/        # Variantes y configs GSAP
        ├── components/
        │   ├── auth/          # LoginForm (social + email)
        │   ├── cart/          # CartPageContent
        │   ├── checkout/      # CheckoutForm + Stripe Elements
        │   ├── home/          # Hero, HomeFeatured, Manifesto…
        │   ├── layout/        # Nav, Footer, SmoothScroll
        │   ├── product/       # ProductCard, ProductDetail, SizeGuide
        │   ├── seo/           # SEO.astro (metadatos + JSON-LD global)
        │   ├── ui/            # Button, Badge, Drawer, GlobalCart…
        │   └── wishlist/      # WishlistDrawer
        ├── layouts/
        │   └── BaseLayout.astro
        ├── lib/
        │   ├── api/           # orders, products (Firestore)
        │   ├── firebase.ts    # Inicialización Firebase client
        │   ├── store/         # authStore, cartStore, wishlistStore
        │   └── types.ts
        ├── pages/
        │   ├── api/           # Endpoints SSR (create-payment-intent)
        │   ├── collections/   # [slug].astro
        │   ├── products/      # [id].astro
        │   └── *.astro        # checkout, login, wishlist…
        └── styles/
            ├── tokens.css     # Design tokens (colores, tipografía…)
            ├── global.css
            ├── animations.css
            └── utilities.css
```

---

## Configuración local

### 1. Clonar e instalar

```bash
git clone https://github.com/druedaro/forma-atelier.git
cd forma-atelier/frontend
npm install
```

### 2. Variables de entorno

Copia el ejemplo y rellena los valores:

```bash
cp .env.production.example .env
```

| Variable | Descripción |
|---|---|
| `PUBLIC_FIREBASE_API_KEY` | API key del proyecto Firebase |
| `PUBLIC_FIREBASE_AUTH_DOMAIN` | Auth domain Firebase |
| `PUBLIC_FIREBASE_PROJECT_ID` | ID del proyecto Firebase |
| `PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `PUBLIC_FIREBASE_APP_ID` | App ID Firebase |
| `PUBLIC_STRIPE_KEY` | Clave pública Stripe (`pk_test_...`) |
| `STRIPE_SECRET_KEY` | Clave secreta Stripe (`sk_test_...`) — solo servidor |

> [!WARNING]
> `STRIPE_SECRET_KEY` nunca debe commitearse. En Vercel, configúrala como variable **sensible** desde el panel de Settings → Environment Variables.

### 3. Arrancar en desarrollo

```bash
npm run dev
# → http://localhost:4321
```

---

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `./dist/` |
| `npm run preview` | Preview del build antes de desplegar |
| `npm test` | Tests unitarios con Vitest |

---

## Autenticación

La página `/login` soporta cuatro métodos de acceso:

- **Google** — OAuth popup via Firebase
- **Apple** — OAuth popup via Firebase (requiere dominio verificado en Apple)
- **Email / Contraseña** — Registro e inicio de sesión clásico
- **Invitado** — Sesión anónima via `signInAnonymously`

---

## Pagos (Stripe)

El checkout utiliza [Stripe Payment Elements](https://docs.stripe.com/payments/payment-element) con el flujo:

1. El cliente añade productos al carrito y accede a `/checkout`
2. El frontend llama al endpoint `/api/create-payment-intent` (SSR)
3. El endpoint crea un `PaymentIntent` en Stripe y devuelve el `clientSecret`
4. Stripe Elements renderiza el formulario de pago seguro
5. Tras el pago, se redirige a `/success`

**Tarjeta de test:** `4242 4242 4242 4242` · cualquier fecha futura · cualquier CVV

---

## SEO

- **Metadatos dinámicos** via `SEO.astro` (OpenGraph, Twitter Cards)
- **JSON-LD** global `Organization` en todas las páginas + `Product` en páginas de producto
- **Sitemap** auto-generado por `@astrojs/sitemap` (excluyendo rutas privadas)
- **robots.txt** configurado para bloquear rutas internas
- **llms.txt** para contexto de modelos de lenguaje

---

## Despliegue

El proyecto se despliega automáticamente en **Vercel** al hacer push a `main`.

```bash
# Deploy manual
npx vercel --prod
```

La URL de producción es: **[forma-atelier-bcn.vercel.app](https://forma-atelier-bcn.vercel.app)**

---

<div align="center">

*Diseñado en Barcelona · © 2025 Forma Atelier*

</div>
