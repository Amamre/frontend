"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { LuxuryHero } from "@/components/sections/luxury-hero";
import {
  AppButton,
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
  Surface,
} from "@/components/ui/Primitives";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { getAllCollections, getFeaturedProducts } from "@/lib/catalog";
import { localizeCollections, localizeProducts } from "@/lib/catalog-i18n";

export function HeroSection() {
  return <LuxuryHero />;
}

export function FeaturedProductsSection() {
  const t = useTypedTranslations("home");
  const common = useTypedTranslations("common");
  const catalog = useTypedTranslations("catalog");
  const featuredProducts = localizeProducts(
    getFeaturedProducts(4),
    catalog,
    common,
  );

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>{t("featured.eyebrow")}</Eyebrow>
            <Headline component="h2">{t("featured.headline")}</Headline>
          </Box>
          <AppButton href="/shop">{common("actions.shopAll")}</AppButton>
        </SectionHeading>

        <ProductGrid>
          {featuredProducts.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              key={product.id}
              transition={{ delay: index * 0.04, duration: 0.55 }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <ProductCard priority={index === 0} product={product} />
            </motion.div>
          ))}
        </ProductGrid>
      </AppContainer>
    </PageSection>
  );
}

export function CollectionEditorialSection() {
  const t = useTypedTranslations("home");
  const common = useTypedTranslations("common");
  const catalog = useTypedTranslations("catalog");
  const collections = localizeCollections(getAllCollections(), catalog, common);

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>{t("collections.eyebrow")}</Eyebrow>
            <Headline component="h2">{t("collections.headline")}</Headline>
          </Box>
          <Subhead>{t("collections.body")}</Subhead>
        </SectionHeading>

        <ContentGrid>
          {collections.slice(0, 3).map((collection) => (
            <EditorialCard
              href={`/collections/${collection.slug}`}
              key={collection.id}
            >
              <Eyebrow>
                {common("counts.pieces", { count: collection.products.length })}
              </Eyebrow>
              <Typography component="h3" sx={{ mt: 0 }}>
                {collection.title}
              </Typography>
              <BodyCopy>{collection.description}</BodyCopy>
            </EditorialCard>
          ))}
        </ContentGrid>
      </AppContainer>
    </PageSection>
  );
}

export function ValuePropositionSection() {
  const t = useTypedTranslations("home");
  const values = [
    {
      title: t("values.materialTitle"),
      description: t("values.materialBody"),
    },
    {
      title: t("values.heritageTitle"),
      description: t("values.heritageBody"),
    },
    {
      title: t("values.shopifyTitle"),
      description: t("values.shopifyBody"),
    },
  ];

  return (
    <PageSection>
      <AppContainer>
        <ContentGrid>
          {values.map((value) => (
            <Surface key={value.title}>
              <Eyebrow>{value.title}</Eyebrow>
              <BodyCopy sx={{ m: 0 }}>{value.description}</BodyCopy>
            </Surface>
          ))}
        </ContentGrid>
      </AppContainer>
    </PageSection>
  );
}
