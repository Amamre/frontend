import { SearchClient } from "@/components/search/SearchClient";
import { getAllProducts, normalizeParam } from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Search",
  description:
    "Search AMAMRE products, collections, materials, and accessories.",
  path: "/search",
});

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return (
    <SearchClient
      initialQuery={normalizeParam(params.q)}
      products={getAllProducts()}
    />
  );
}
