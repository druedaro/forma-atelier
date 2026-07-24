# <p align="center">FORMA</p>

<p align="center">
  <strong>FORMA ATELIER</strong><br/>
  <em>Atelier de Barcelona · Est. 2026</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro_5-FF5D01?style=flat-square&logo=astro&logoColor=white" alt="Astro 5" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vitest-150%2B_Tests_Passing-6E9F18?style=flat-square&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" alt="Stripe" />
</p>

---

Forma was born in the heart of Barcelona's Eixample district, inside an atelier defined by high ceilings and late afternoon light. Since its inception, the *maison* has understood fashion as body architecture: every garment, a construction; every collection, a poem.

Inspired by the heritage of the great European ateliers — the patience of Hermès, the poetry of McQueen, the lightness of Valentino — Forma works with single-origin fabrics, hand-drawn patterns, and a silent obsession with the details that are never seen but always felt.

This repository serves as the official **digital lookbook and e-commerce experience for Forma**: an immersive editorial platform where each collection comes alive through motion, light, and form.

<p align="center">
  <img src="./frontend/public/assets/1.gif" alt="Forma Atelier Hero" width="100%" />
</p>

---

### ✦ The Project

An interactive, headless digital lookbook and luxury e-commerce platform featuring complete user authentication, a real-time wishlist system, shopping cart state management, and a Stripe checkout flow. Developed as an exploration of high-end editorial experiences in luxury digital retail.

---

### ✦ Features

- **Cinematic Lookbook**: Animated horizontal scrolling, parallax reveals, and view transitions built with GSAP and Lenis.
- **E-Commerce Architecture**: Product catalog filtering across collections (*Lumière*, *Ombra*, *Terra*), interactive size guides, detail view modals, and shipping threshold logic.
- **Authentication System**: User session persistence powered by Firebase Auth, supporting Email/Password, Google OAuth, and Guest access.
- **Persistent Wishlist & Shopping Cart**: Real-time state management via Zustand 5 synchronized with Firestore.
- **Stripe Checkout**: Integrated PaymentIntent API flow with custom-styled Stripe Elements.
- **Performance & Privacy**: 100% self-hosted typography using `@fontsource` with zero third-party font tracking calls, LCP preloading, and inlined critical CSS.
- **Automated Testing**: Comprehensive unit and component test suite (+150 tests) using Vitest and React Testing Library.

<p align="center">
  <img src="./frontend/public/assets/2.gif" alt="Forma Atelier Lookbook Scroll" width="100%" />
</p>

---

### ✦ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Astro 5](https://astro.build/) (Server-Side Rendering via Vercel Adapter) |
| **UI Components** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling & Fonts** | [Tailwind CSS](https://tailwindcss.com/) + Self-Hosted Fonts via [@fontsource](https://fontsource.org/) (`Cormorant Garamond`, `Jost`, `JetBrains Mono`) |
| **Animations** | [GSAP 3](https://gsap.com/) (ScrollTrigger) + [Lenis](https://lenis.darkroom.engineering/) Smooth Scroll |
| **State Management** | [Zustand 5](https://zustand-demo.pmnd.rs/) |
| **Backend & Auth** | [Firebase](https://firebase.google.com/) (Firestore DB + Firebase Authentication) |
| **Payments** | [Stripe](https://stripe.com/) (PaymentIntent API & Stripe Elements) |
| **Testing** | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + jsdom |
| **Deployment** | [Vercel](https://vercel.com/) |

---

### ✦ Getting Started

#### Prerequisites

- **Node.js**: `^20.0.0` or higher
- **npm**: `^10.0.0` or higher

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/druedaro/forma-atelier.git
   cd forma-atelier/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `frontend/.env`:
   ```env
   PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   PUBLIC_FIREBASE_APP_ID=your_app_id
   PUBLIC_STRIPE_KEY=pk_test_your_stripe_public_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser.

---

### ✦ Testing

The repository includes an extensive automated test suite covering UI components, custom hooks, and Zustand store actions.

```bash
# Run all tests once
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

---

### ✦ Project Structure

```
forma-atelier/
└── frontend/
    ├── src/
    │   ├── components/       # Component architecture by domain
    │   │   ├── auth/         # LoginForm, AuthGuard & tests
    │   │   ├── campaign/     # CampaignManifesto & tests
    │   │   ├── cart/         # CartPageContent & tests
    │   │   ├── checkout/     # CheckoutForm, OrderConfirmation & tests
    │   │   ├── home/         # CreativeHero, HomeFeatured, HomeManifesto & tests
    │   │   ├── layout/       # Nav, Footer, AccountButton, CartButton & tests
    │   │   ├── lookbook/     # CollectionHero, HorizontalGallery, LookCard & tests
    │   │   ├── product/      # ProductCard, ProductDetail, SizeGuide & tests
    │   │   ├── seo/          # SEO meta tags & test
    │   │   ├── ui/           # Button, Badge, Drawer, ErrorBoundary & tests
    │   │   └── wishlist/     # WishlistButton, WishlistDrawer, WishlistGrid & tests
    │   ├── layouts/          # BaseLayout with view transitions & critical CSS
    │   ├── lib/              # API clients, Firebase init, types & Zustand stores
    │   ├── pages/            # Astro page routes (home, collections, products, checkout, auth)
    │   └── styles/           # Global design system tokens & utility classes
    ├── public/               # Optimized webp/avif image assets
    ├── vitest.config.ts      # Test runner configuration
    └── package.json
```

---

### ✦ Case Study & Live Demo

- **Live Application**: [forma-atelier-bcn.vercel.app](https://forma-atelier-bcn.vercel.app/)
- **Author Portfolio**: [davidrueda.vercel.app](https://davidrueda.vercel.app/)

---

<p align="center">
  <em>Crafted with intention. Built with precision.</em><br/>
  FORMA ATELIER © 2026
</p>
