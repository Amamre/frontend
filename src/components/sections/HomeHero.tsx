"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import {
  AppButton,
  AppContainer,
  BodyCopy,
  ContentGrid,
  DisplayHeading,
  EditorialCard,
  Eyebrow,
  Headline,
  PageSection,
  ProductGrid,
  SectionHeading,
  Subhead,
  Surface,
} from "@/components/ui/Primitives";
import { BRAND } from "@/constants/config";
import { getAllCollections, getFeaturedProducts } from "@/lib/catalog";
import { brandColors } from "@/styles/theme";

const featuredProducts = getFeaturedProducts(4);
const collections = getAllCollections();
const motionTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "calc(100svh - 112px)",
        overflow: "hidden",
        isolation: "isolate",
        "&::after": {
          position: "absolute",
          inset: 0,
          zIndex: -1,
          content: '""',
          background: {
            xs: "linear-gradient(90deg, rgba(9, 9, 8, 0.92), rgba(9, 9, 8, 0.52)), linear-gradient(0deg, rgba(9, 9, 8, 0.94), transparent 52%)",
            md: "linear-gradient(90deg, rgba(9, 9, 8, 0.9), rgba(9, 9, 8, 0.56) 42%, rgba(9, 9, 8, 0.08)), linear-gradient(0deg, rgba(9, 9, 8, 0.92), transparent 48%)",
          },
        },
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: -2 }}>
        <Image
          alt="AMAMRE Afro-European premium streetwear campaign"
          fill
          priority
          sizes="100vw"
          src="/editorial/amamre-hero-campaign.png"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>

      <AppContainer
        sx={{
          display: "grid",
          minHeight: { xs: "calc(100svh - 96px)", md: "calc(100svh - 112px)" },
          alignContent: "end",
          gap: 3.5,
          py: { xs: "76px 48px", md: "90px 72px" },
        }}
      >
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          transition={motionTransition}
        >
          <Eyebrow>{BRAND.location}</Eyebrow>
          <DisplayHeading>
            Afro-European streetwear with a quiet luxury pulse.
          </DisplayHeading>
        </motion.div>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          style={{ margin: 0 }}
          transition={{ ...motionTransition, delay: 0.08 }}
        >
          <Subhead component="span">
            AMAMRE builds accessible premium essentials from Stuttgart:
            satin-lined hoods, structured layers, and subtle heritage details
            for a modern European wardrobe.
          </Subhead>
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 18 }}
          transition={{ ...motionTransition, delay: 0.16 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
            <AppButton href="/shop" variant="primary">
              Shop collection <ArrowForwardIcon fontSize="small" />
            </AppButton>
            <AppButton href="/collections">View collections</AppButton>
          </Stack>
        </motion.div>

        <Box
          aria-label="AMAMRE brand highlights"
          component="section"
          sx={{
            display: { xs: "none", sm: "grid" },
            width: "min(100%, 720px)",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "1px",
            background: brandColors.border,
          }}
        >
          <HeroKpi title="Stuttgart">
            Designed from an Afro-European point of view
          </HeroKpi>
          <HeroKpi title="Premium">
            Organic cotton, satin linings, precise finishings
          </HeroKpi>
          <HeroKpi title="Accessible">
            Luxury feeling without traditional luxury markup
          </HeroKpi>
        </Box>
      </AppContainer>
    </Box>
  );
}

function HeroKpi({ children, title }: { children: string; title: string }) {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: 92, p: 2.25, background: "rgba(9, 9, 8, 0.74)" }}>
      <Typography
        component="strong"
        sx={{
          display: "block",
          color: theme.palette.text.primary,
          fontSize: "1.1rem",
        }}
      >
        {title}
      </Typography>
      <Typography
        component="span"
        sx={{
          display: "block",
          mt: 0.75,
          color: theme.palette.text.secondary,
          fontSize: "0.78rem",
          lineHeight: 1.4,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
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
