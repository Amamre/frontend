# AMAMBRA

Luxury Afro-European accessible premium streetwear storefront built with Next.js 16, TypeScript, Framer Motion, Zustand, Zod, React Hook Form, Shopify Storefront API boundaries, and Sanity CMS schema scaffolding.

## Commands

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

`npm run build` uses `next build --webpack` because the default Turbopack build path hangs silently in this sandbox while webpack completes successfully.

## Environment

```bash
cp .env.example .env.local
```

Set Shopify and Sanity values in `.env.local` when moving from mock catalog data to live commerce and CMS content.

## Key Paths

- `src/app` - App Router routes, metadata, server actions, SEO files.
- `src/components` - storefront UI, product, cart, checkout, search, layout, and form components.
- `src/data/products.ts` - AMAMBRA launch mock catalog.
- `src/services/shopify.ts` - typed Storefront API Cart integration.
- `src/services/sanity.ts` - typed Sanity fetch helpers.
- `src/cms/sanity-schemas.ts` - CMS schema definitions.
- `ARCHITECTURE.md` - full implementation notes and production recommendations.
