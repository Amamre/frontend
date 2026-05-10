"use client";

import { ProductMediaGallery } from "@/components/product/product-media-gallery";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors } from "@/styles/theme";
import type { Product, ProductColorOption } from "@/types";

export function ProductGallery({ product }: { product: Product }) {
  const t = useTypedTranslations("product");

  return (
    <ProductMediaGallery
      color={resolveProductColor(product, t)}
      images={product.images}
      productTitle={product.title}
    />
  );
}

function resolveProductColor(
  product: Product,
  t: ReturnType<typeof useTypedTranslations<"product">>,
): ProductColorOption {
  return (
    product.colorOptions[0] ?? {
      name: product.colors[0]?.name ?? t("fallbackColor.name"),
      slug: "obsidian-black",
      code: product.colors[0]?.code ?? brandColors.obsidian,
      description: t("fallbackColor.productDescription"),
      images: product.images,
    }
  );
}
