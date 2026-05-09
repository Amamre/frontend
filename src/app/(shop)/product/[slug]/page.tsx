import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { ProductDetailExperience } from "@/components/product/ProductDetailExperience";
import {
  AppContainer,
  BodyCopy,
  Eyebrow,
  Headline,
  PageSection,
  ProductGrid,
  SectionHeading,
  SplitLayout,
  Surface,
} from "@/components/ui/Primitives";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  normalizeParam,
} from "@/lib/catalog";
import { createMetadata } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createMetadata({
      title: "Product not found",
      path: `/product/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: product.metadata.seo.title.replace(" | AMAMRE", ""),
    description: product.metadata.seo.description,
    keywords: product.metadata.seo.keywords,
    image: product.metadata.seo.ogImage ?? product.images[0]?.url,
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <PageSection>
        <AppContainer>
          <ProductDetailExperience
            initialColor={normalizeParam(query.color)}
            initialSize={normalizeParam(query.size)}
            product={product}
          />
        </AppContainer>
      </PageSection>

      <PageSection tight>
        <AppContainer>
          <SplitLayout>
            <Surface>
              <Eyebrow>Story</Eyebrow>
              <Typography component="h2">{product.story}</Typography>
              <BodyCopy>{product.longDescription}</BodyCopy>
            </Surface>
            <Surface>
              <Eyebrow>Material and care</Eyebrow>
              <BodyCopy>
                <strong>Material:</strong> {product.material}
              </BodyCopy>
              <BodyCopy>
                <strong>Fit:</strong> {product.fit}
              </BodyCopy>
              <BodyCopy>
                <strong>Care:</strong> {product.care}
              </BodyCopy>
            </Surface>
          </SplitLayout>
        </AppContainer>
      </PageSection>

      <PageSection>
        <AppContainer>
          <SectionHeading>
            <Box>
              <Eyebrow>Recommended</Eyebrow>
              <Headline component="h2">Complete the silhouette</Headline>
            </Box>
          </SectionHeading>
          <ProductGrid>
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </ProductGrid>
        </AppContainer>
      </PageSection>
    </>
  );
}
