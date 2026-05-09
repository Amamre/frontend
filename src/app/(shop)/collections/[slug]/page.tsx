import { Box } from "@mui/material";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { getAllCollections, getCollectionBySlug } from "@/lib/catalog";
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
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return createMetadata({
      title: "Collection not found",
      path: `/collections/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: collection.title,
    description: collection.description,
    image: collection.image.url,
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Collection</Eyebrow>
            <Headline>{collection.title}</Headline>
          </Box>
          <Subhead>{collection.description}</Subhead>
        </SectionHeading>
        <ProductGrid>
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </AppContainer>
    </PageSection>
  );
}
