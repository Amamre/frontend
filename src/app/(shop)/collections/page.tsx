import { CollectionStoryLayout } from "@/components/collections/collection-story-layout";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { getAllCollections } from "@/lib/catalog";
import { localizeCollections } from "@/lib/catalog-i18n";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.collectionsDescription",
    path: "/collections",
    titleKey: "pages.collectionsTitle",
  });
}

export default async function CollectionsPage() {
  const common = await getTypedTranslations("common");
  const catalog = await getTypedTranslations("catalog");
  const collections = localizeCollections(getAllCollections(), catalog, common);

  return <CollectionStoryLayout collections={collections} />;
}
