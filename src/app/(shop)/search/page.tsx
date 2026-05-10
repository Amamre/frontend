import { SearchClient } from "@/components/search/SearchClient";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { getAllProducts, normalizeParam } from "@/lib/catalog";
import { localizeProducts } from "@/lib/catalog-i18n";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.searchDescription",
    path: "/search",
    titleKey: "pages.searchTitle",
  });
}

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const common = await getTypedTranslations("common");
  const catalog = await getTypedTranslations("catalog");
  const params = await searchParams;

  return (
    <SearchClient
      initialQuery={normalizeParam(params.q)}
      products={localizeProducts(getAllProducts(), catalog, common)}
    />
  );
}
