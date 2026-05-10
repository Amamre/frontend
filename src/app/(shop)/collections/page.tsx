import { CollectionStoryLayout } from "@/components/collections/collection-story-layout";
import { getAllCollections } from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Collections",
  description:
    "Explore AMAMBRA Atelier, Heritage, and Essentials as a cinematic editorial collection system.",
  path: "/collections",
});

export default function CollectionsPage() {
  const collections = getAllCollections();

  return <CollectionStoryLayout collections={collections} />;
}
