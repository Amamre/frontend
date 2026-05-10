"use client";

import { CollectionsHeroSection } from "@/components/collections/collections-hero-section";
import {
  type CollectionChapter,
  collectionCtaLinkSx,
  EditorialCollectionSection,
} from "@/components/collections/editorial-collection-section";
import { brandColors } from "@/styles/theme";
import type { Collection } from "@/types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import NextLink from "next/link";

type CollectionStoryLayoutProps = {
  collections: Collection[];
};

const CHAPTERS: CollectionChapter[] = [
  {
    chapter: "01",
    copy: "Limited utility pieces shaped for editorial layering: structured, quiet, and made to carry the atmosphere of the studio into the street.",
    imagePosition: "58% 50%",
    kicker: "Atelier",
    mood: "Limited releases, brushed surfaces, handcrafted restraint, and elevated outer layers with a calm silhouette.",
    slug: "atelier",
    title: "Atelier",
  },
  {
    chapter: "02",
    copy: "Afro-European craft translated through restrained linework, warm utility, and silhouettes that feel composed without becoming ceremonial.",
    imagePosition: "48% 50%",
    kicker: "Heritage",
    mood: "Subtle textile rhythm, tonal hardware, warm function, and structured pieces built for movement.",
    reverse: true,
    slug: "heritage",
    title: "Heritage",
  },
  {
    chapter: "03",
    copy: "The foundation layer of the AMAMBRA wardrobe: clean, tactile, and deliberately minimal so the rest of the system can breathe.",
    imagePosition: "66% 50%",
    kicker: "Essentials",
    mood: "Everyday premium cotton, quiet proportions, calm luxury, and pieces that hold their shape in daily rotation.",
    slug: "essentials",
    title: "Essentials",
  },
];

export function CollectionStoryLayout({
  collections,
}: CollectionStoryLayoutProps) {
  const collectionBySlug = new Map(
    collections.map((collection) => [collection.slug, collection]),
  );

  return (
    <>
      <CollectionsHeroSection />
      {CHAPTERS.map((chapter, index) => {
        const collection = collectionBySlug.get(chapter.slug);

        if (!collection) {
          return null;
        }

        return (
          <EditorialCollectionSection
            chapter={chapter}
            collection={collection}
            key={chapter.slug}
            priority={index === 0}
          />
        );
      })}
      <Box
        component="section"
        sx={{
          py: { xs: 7, md: 10 },
          background:
            `linear-gradient(120deg, ${alpha(brandColors.olive, 0.16)}, transparent 42%), ` +
            alpha(brandColors.obsidian, 0.96),
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: "min(100% - 32px, var(--container))",
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 5 }}
            sx={{
              alignItems: { xs: "flex-start", md: "end" },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                component="p"
                sx={{
                  m: "0 0 14px",
                  color: alpha(brandColors.goldSoft, 0.84),
                  fontSize: "0.68rem",
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Complete the system
              </Typography>
              <Typography
                component="h2"
                sx={{
                  maxWidth: 760,
                  m: 0,
                  color: brandColors.ivory,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: { xs: "2.8rem", md: "4.8rem" },
                  fontWeight: 500,
                  letterSpacing: 0,
                  lineHeight: 0.94,
                }}
              >
                Move from story to wardrobe.
              </Typography>
            </Box>
            <Box component={NextLink} href="/shop" sx={collectionCtaLinkSx}>
              Shop the collection
              <ArrowForwardIcon fontSize="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
