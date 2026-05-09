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
import { getAllCollections, getFeaturedProducts } from "@/lib/catalog";

const featuredProducts = getFeaturedProducts(4);
const collections = getAllCollections();

export function HeroSection() {
  return <LuxuryHero />;
}

export function FeaturedProductsSection() {
  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Launch pieces</Eyebrow>
            <Headline component="h2">Signature wardrobe</Headline>
          </Box>
          <AppButton href="/shop">Shop all</AppButton>
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
  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Collection architecture</Eyebrow>
            <Headline component="h2">
              Built as a system, not isolated drops.
            </Headline>
          </Box>
          <Subhead>
            Every piece is designed to layer across Signature, Heritage,
            Essentials, and Atelier, giving AMAMRE a scalable merchandising
            foundation from launch.
          </Subhead>
        </SectionHeading>

        <ContentGrid>
          {collections.slice(0, 3).map((collection) => (
            <EditorialCard
              href={`/collections/${collection.slug}`}
              key={collection.id}
            >
              <Eyebrow>{collection.products.length} pieces</Eyebrow>
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
  const values = [
    {
      title: "Material honesty",
      description:
        "Heavy organic cotton, merino, satin linings, and trims chosen for daily function.",
    },
    {
      title: "Subtle heritage",
      description:
        "African textile references are expressed as restrained borders, embroidery, and rhythm.",
    },
    {
      title: "Shopify-ready",
      description:
        "Cart, checkout handoff, product variants, inventory states, and merchandising hooks are structured for Storefront API.",
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
