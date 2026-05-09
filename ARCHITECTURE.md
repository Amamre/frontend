# AMAMRE Ecommerce Architecture

AMAMRE is implemented as a Next.js 16 App Router storefront with a production-oriented split between server-rendered routes, client-only commerce interactions, typed catalog data, and replaceable Shopify/Sanity boundaries.

## Route Structure

```txt
src/app
├── page.tsx                         # Home editorial campaign
├── (shop)
│   ├── shop/page.tsx                 # Filterable product listing
│   ├── product/[slug]/page.tsx       # Static PDP routes with metadata
│   ├── collections/page.tsx          # Collection index
│   ├── collections/[slug]/page.tsx   # Static collection routes
│   ├── search/page.tsx               # Search experience
│   ├── cart/page.tsx                 # Persistent cart
│   ├── checkout/page.tsx             # Checkout profile scaffold
│   ├── wishlist/page.tsx             # Persistent wishlist
│   └── account/*                     # Account placeholders for Customer API
├── (marketing)
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   ├── contact/page.tsx
│   ├── shipping-returns/page.tsx
│   ├── size-guide/page.tsx
│   └── legal pages
├── actions.ts                        # Server Actions for forms and checkout
├── sitemap.ts
├── robots.ts
├── loading.tsx
└── error.tsx
```

## Core Layers

- `src/data/products.ts`: realistic AMAMRE launch catalog, variants, inventory, collection mapping, copy, materials, care, and SEO metadata.
- `src/lib/catalog.ts`: server-safe catalog selectors, filtering, sorting, search, and static route helpers.
- `src/lib/cart.ts`: shared order summary calculation for client cart and checkout views.
- `src/services/shopify.ts`: typed Shopify Storefront API client using the Cart API and checkout URL handoff.
- `src/services/sanity.ts`: typed Sanity client wrapper with safe empty fallbacks when CMS credentials are absent.
- `src/cms/sanity-schemas.ts`: launch-ready schema definitions for product editorial, collections, pages, and settings.
- `src/store/*`: persisted Zustand cart and wishlist stores.
- `src/components/*`: custom luxury UI system, editorial sections, product cards, gallery, purchase panel, forms, search, cart, checkout, header, and footer.

## Design System

The UI uses project-local CSS tokens in `src/app/globals.css`:

- Obsidian black, soft ivory, muted warm gold, deep olive, and cocoa.
- 8px-or-less cards and panels, full-bleed editorial hero imagery, restrained borders, and soft shadows.
- Mobile-first layouts with stable aspect ratios for product cards, galleries, controls, and cart rows.
- Reduced-motion handling and visible focus states.

The generated bitmap campaign image is stored at:

```txt
public/editorial/amamre-hero-campaign.png
```

## Commerce Flow

Current launch scaffold:

1. Products render from typed mock data.
2. Cart and wishlist persist locally with Zustand.
3. Quick add and PDP add-to-cart use real variants and inventory.
4. Cart can call `startShopifyCheckout`, which creates a Shopify cart and redirects to `checkoutUrl` when Storefront credentials are configured.
5. Checkout page validates customer details with React Hook Form and Zod as a launch-safe fallback.

## SEO And Performance

- Static metadata via `createMetadata`.
- Dynamic PDP and collection metadata with `generateMetadata`.
- `sitemap.ts` and `robots.ts` included.
- Next Image used for editorial/product imagery.
- Most pages statically prerender. `/shop` and `/search` are dynamic because they read `searchParams`.
- `npm run build` uses `next build --webpack`; Turbopack hung silently in this local sandbox, while webpack builds cleanly.

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_STOREFRONT_API_VERSION`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- analytics IDs only after consent tooling is connected

## Production Recommendations

- Replace mock product IDs with Shopify Storefront product and variant IDs.
- Connect newsletter/contact actions to Klaviyo, Customer.io, Resend, or a CRM.
- Add a consent management platform before enabling analytics and marketing pixels.
- Replace legal placeholders with counsel-approved German ecommerce documents.
- Connect Customer Accounts before exposing account/order data.
- Add Playwright smoke tests for home, shop filters, PDP add-to-cart, cart summary, and checkout validation.
