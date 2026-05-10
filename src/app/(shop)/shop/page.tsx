import { ShopClient } from "@/components/shop/ShopClient";
import { getAllProducts, normalizeParam, parseSort } from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";
import type { ProductFilter } from "@/types";

export const metadata = createMetadata({
  title: "Shop",
  description:
    "Shop AMAMBRA launch pieces: satin-lined hoodies, premium tracksuits, atelier overshirts, tees, caps, and beanies.",
  path: "/shop",
});

type ShopPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
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
    <ShopClient initialFilter={initialFilter} products={getAllProducts()} />
  );
}
