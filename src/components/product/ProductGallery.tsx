"use client";

import { ProductMediaGallery } from "@/components/product/product-media-gallery";
import { brandColors } from "@/styles/theme";
import type { Product, ProductColorOption } from "@/types";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <ProductMediaGallery
      color={resolveProductColor(product)}
      images={product.images}
      productTitle={product.title}
    />
  );
}

function resolveProductColor(product: Product): ProductColorOption {
  return (
    product.colorOptions[0] ?? {
      name: product.colors[0]?.name ?? "Obsidian Black",
      slug: "obsidian-black",
      code: product.colors[0]?.code ?? brandColors.obsidian,
      description: "AMAMBRA product colorway.",
      images: product.images,
    }
  );
}
