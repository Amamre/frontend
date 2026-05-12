"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Link from "next/link";
import { CollectionsHeroSection } from "@/components/collections/collections-hero-section";
import {
  type CollectionChapter,
  collectionCtaLinkSx,
  EditorialCollectionSection,
} from "@/components/collections/editorial-collection-section";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors } from "@/styles/theme";
import type { Collection } from "@/types";

type CollectionStoryLayoutProps = {
  collections: Collection[];
};

const CHAPTERS = [
  {
    key: "atelier",
    imagePosition: "58% 50%",
    slug: "atelier",
  },
  {
    key: "heritage",
    imagePosition: "48% 50%",
    reverse: true,
    slug: "heritage",
  },
  {
    key: "essentials",
    imagePosition: "66% 50%",
    slug: "essentials",
  },
] as const;

export function CollectionStoryLayout({
  collections,
}: CollectionStoryLayoutProps) {
  const t = useTypedTranslations("collections");
  const collectionBySlug = new Map(
    collections.map((collection) => [collection.slug, collection]),
  );

  return (
    <>
      <CollectionsHeroSection />
      {CHAPTERS.map((chapterConfig, index) => {
        const collection = collectionBySlug.get(chapterConfig.slug);

        if (!collection) {
          return null;
        }

        const chapter: CollectionChapter = {
          ...chapterConfig,
          chapter: t(`chapters.${chapterConfig.key}.chapter`),
          copy: t(`chapters.${chapterConfig.key}.copy`),
          kicker: t(`chapters.${chapterConfig.key}.kicker`),
          mood: t(`chapters.${chapterConfig.key}.mood`),
          title: t(`chapters.${chapterConfig.key}.title`),
        };

        return (
          <EditorialCollectionSection
            chapter={chapter}
            collection={collection}
            key={chapterConfig.slug}
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
                {t("labels.completeSystem")}
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
                {t("labels.moveStory")}
              </Typography>
            </Box>
            <Box component={Link} href="/shop" sx={collectionCtaLinkSx}>
              {t("labels.shopCollection")}
              <ArrowForwardIcon fontSize="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
