import {
  BRAND,
  DEFAULT_CURRENCY,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/constants/config";
import { absoluteUrl } from "@/lib/seo";
import type { Product } from "@/types";

export type JsonLdData = Record<string, unknown>;

export function createOrganizationSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    description: BRAND.description,
    foundingDate: String(BRAND.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stuttgart",
      addressCountry: "DE",
    },
    email: BRAND.email,
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function createProductSchema(product: Product): JsonLdData {
  const imageUrls = product.images.map((image) => absoluteUrl(image.url));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.metadata.seo.description,
    image: imageUrls,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
    },
    sku: product.variants[0]?.sku,
    offers: {
      "@type": "Offer",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      price: product.price.toFixed(2),
      priceCurrency: DEFAULT_CURRENCY,
      url: absoluteUrl(`/product/${product.slug}`),
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  };
}
