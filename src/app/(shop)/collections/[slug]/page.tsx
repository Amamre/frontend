import { Box } from "@mui/material";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import ProductCard from "@/components/product/ProductCard";
import {
  AppContainer,
  Eyebrow,
  Headline,
  PageSection,
  ProductGrid,
  SectionHeading,
  Subhead,
} from "@/components/ui/Primitives";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import type { Locale } from "@/i18n/locales";
import { getAllCollections, getCollectionBySlug } from "@/lib/catalog";
import { localizeCollection, localizeProduct } from "@/lib/catalog-i18n";
import { createMetadata } from "@/lib/seo";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCollections().map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const catalog = await getTypedTranslations("catalog");
  const collectionsT = await getTypedTranslations("collections");
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return createMetadata({
      title: collectionsT("labels.notFound"),
      locale,
      path: `/collections/${slug}`,
      noIndex: true,
    });
  }

  const localizedCollection = localizeCollection(collection, catalog);

  return createMetadata({
    title: localizedCollection.title,
    description: localizedCollection.description,
    image: localizedCollection.image.url,
    locale,
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const common = await getTypedTranslations("common");
  const catalog = await getTypedTranslations("catalog");
  const collectionsT = await getTypedTranslations("collections");
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const localizedCollection = {
    ...localizeCollection(collection, catalog),
    products: collection.products.map((product) =>
      localizeProduct(product, catalog, common),
    ),
  };

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>{collectionsT("labels.collection")}</Eyebrow>
            <Headline>{localizedCollection.title}</Headline>
          </Box>
          <Subhead>{localizedCollection.description}</Subhead>
        </SectionHeading>
        <ProductGrid>
          {localizedCollection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </AppContainer>
    </PageSection>
  );
}
