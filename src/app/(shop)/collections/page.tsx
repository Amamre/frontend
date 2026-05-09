import { Box, Typography } from "@mui/material";
import ProductCard from "@/components/product/ProductCard";
import {
  AppContainer,
  BodyCopy,
  ContentGrid,
  EditorialCard,
  Eyebrow,
  Headline,
  PageSection,
  ProductGrid,
  SectionHeading,
  Subhead,
} from "@/components/ui/Primitives";
import { getAllCollections } from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Collections",
  description:
    "Explore AMAMRE Signature, Heritage, Essentials, and Atelier collections.",
  path: "/collections",
});

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Collections</Eyebrow>
            <Headline>A launch system built to scale.</Headline>
          </Box>
          <Subhead>
            Each collection has a clear role in the wardrobe and a clear
            merchandising path for Shopify and Sanity.
          </Subhead>
        </SectionHeading>

        <ContentGrid>
          {collections.map((collection) => (
            <EditorialCard
              href={`/collections/${collection.slug}`}
              key={collection.id}
            >
              <Eyebrow>{collection.products.length} pieces</Eyebrow>
              <Typography variant="h2" sx={{ mt: 0, fontWeight: 600 }}>
                {collection.title}
              </Typography>
              <BodyCopy sx={{ pt: 2 }}>{collection.description}</BodyCopy>
            </EditorialCard>
          ))}
        </ContentGrid>

        <SectionHeading sx={{ mt: 9 }}>
          <Box>
            <Eyebrow>Featured</Eyebrow>
            <Headline component="h2">Collection highlights</Headline>
          </Box>
        </SectionHeading>
        <ProductGrid>
          {collections
            .flatMap((collection) => collection.products.slice(0, 1))
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </ProductGrid>
      </AppContainer>
    </PageSection>
  );
}
