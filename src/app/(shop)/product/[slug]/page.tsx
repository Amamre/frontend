import { Box, Typography } from "@mui/material";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import ProductCard from "@/components/product/ProductCard";
import { ProductDetailExperience } from "@/components/product/ProductDetailExperience";
import { StructuredData } from "@/components/seo/StructuredData";
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
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import type { Locale } from "@/i18n/locales";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  normalizeParam,
} from "@/lib/catalog";
import { localizeProduct, localizeProducts } from "@/lib/catalog-i18n";
import { createMetadata } from "@/lib/seo";
import { createProductSchema } from "@/lib/structured-data";

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
  const locale = (await getLocale()) as Locale;
  const common = await getTypedTranslations("common");
  const catalog = await getTypedTranslations("catalog");
  const productT = await getTypedTranslations("product");
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return createMetadata({
      title: productT("metadata.notFound"),
      locale,
      path: `/product/${slug}`,
      noIndex: true,
    });
  }

  const localizedProduct = localizeProduct(product, catalog, common);

  return createMetadata({
    title: localizedProduct.metadata.seo.title.replace(" | AMAMBRA", ""),
    description: localizedProduct.metadata.seo.description,
    keywords: localizedProduct.metadata.seo.keywords,
    image:
      localizedProduct.metadata.seo.ogImage ?? localizedProduct.images[0]?.url,
    locale,
    path: `/product/${product.slug}`,
  });
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const common = await getTypedTranslations("common");
  const catalog = await getTypedTranslations("catalog");
  const productT = await getTypedTranslations("product");
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const localizedProduct = localizeProduct(product, catalog, common);
  const related = localizeProducts(
    getRelatedProducts(product, 4),
    catalog,
    common,
  );

  return (
    <>
      <StructuredData data={createProductSchema(localizedProduct)} />
      <PageSection>
        <AppContainer>
          <ProductDetailExperience
            initialColor={normalizeParam(query.color)}
            initialSize={normalizeParam(query.size)}
            product={localizedProduct}
          />
        </AppContainer>
      </PageSection>

      <PageSection tight>
        <AppContainer>
          <SplitLayout>
            <Surface>
              <Eyebrow>{productT("labels.story")}</Eyebrow>
              <Typography component="h2">{localizedProduct.story}</Typography>
              <BodyCopy>{localizedProduct.longDescription}</BodyCopy>
            </Surface>
            <Surface>
              <Eyebrow>{productT("labels.materialAndCare")}</Eyebrow>
              <BodyCopy>
                <strong>{productT("labels.material")}:</strong>{" "}
                {localizedProduct.material}
              </BodyCopy>
              <BodyCopy>
                <strong>{productT("labels.fit")}:</strong>{" "}
                {localizedProduct.fit}
              </BodyCopy>
              <BodyCopy>
                <strong>{productT("labels.care")}:</strong>{" "}
                {localizedProduct.care}
              </BodyCopy>
            </Surface>
          </SplitLayout>
        </AppContainer>
      </PageSection>

      <PageSection>
        <AppContainer>
          <SectionHeading>
            <Box>
              <Eyebrow>{productT("labels.recommended")}</Eyebrow>
              <Headline component="h2">
                {productT("sections.completeSilhouette")}
              </Headline>
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
