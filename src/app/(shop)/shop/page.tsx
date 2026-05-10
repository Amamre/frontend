import { ShopClient } from "@/components/shop/ShopClient";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { getAllProducts, normalizeParam, parseSort } from "@/lib/catalog";
import { localizeProducts } from "@/lib/catalog-i18n";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import type { ProductFilter } from "@/types";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.shopDescription",
    path: "/shop",
    titleKey: "pages.shopTitle",
  });
}

type ShopPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const common = await getTypedTranslations("common");
  const catalog = await getTypedTranslations("catalog");
  const params = await searchParams;
  const category = normalizeParam(params.category);
  const collection = normalizeParam(params.collection);
  const query = normalizeParam(params.q);
  const sortBy = parseSort(normalizeParam(params.sort));
  const initialFilter: ProductFilter = {
    sortBy,
    query,
    categories: category ? [category] : undefined,
    collections: collection ? [collection] : undefined,
  };

  return (
    <ShopClient
      initialFilter={initialFilter}
      products={localizeProducts(getAllProducts(), catalog, common)}
    />
  );
}
