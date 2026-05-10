"use client";

import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { CollectionImagePanel } from "@/components/collections/collection-image-panel";
import { CollectionProductLinks } from "@/components/collections/collection-product-links";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors, transitions } from "@/styles/theme";
import type { Collection } from "@/types";

export type CollectionChapter = {
  chapter: string;
  copy: string;
  imagePosition: string;
  kicker: string;
  mood: string;
  reverse?: boolean;
  slug: string;
  title: string;
};

type EditorialCollectionSectionProps = {
  chapter: CollectionChapter;
  collection: Collection;
  priority?: boolean;
};

const MoodPanel = styled(Paper)(() => ({
  border: `1px solid ${alpha(brandColors.ivory, 0.12)}`,
  borderRadius: 8,
  background:
    `linear-gradient(135deg, ${alpha(brandColors.goldSoft, 0.08)}, transparent 42%), ` +
    alpha(brandColors.ink, 0.7),
}));

export function EditorialCollectionSection({
  chapter,
  collection,
  priority = false,
}: EditorialCollectionSectionProps) {
  const t = useTypedTranslations("collections");
  const image = (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-120px" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <CollectionImagePanel
          chapter={chapter.chapter}
          image={collection.image}
          objectPosition={chapter.imagePosition}
          priority={priority}
          title={collection.title}
        />
      </Box>
    </Grid>
  );

  const content = (
    <Grid size={{ xs: 12, md: 6 }}>
      <Stack
        component={motion.div}
        initial={{ opacity: 0, y: 28 }}
        spacing={{ xs: 3, md: 4 }}
        transition={{ duration: 0.74, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-120px" }}
        whileInView={{ opacity: 1, y: 0 }}
        sx={{
          minHeight: { md: 700 },
          justifyContent: "center",
          px: { xs: 0, md: chapter.reverse ? "0 6vw 0 0" : "0 0 0 6vw" },
          py: { xs: 0, md: 3 },
        }}
      >
        <Stack spacing={2.4}>
          <Typography
            component="p"
            sx={{
              m: 0,
              color: alpha(brandColors.goldSoft, 0.86),
              fontSize: "0.68rem",
              fontWeight: 900,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            {chapter.kicker}
          </Typography>
          <Typography
            component="h2"
            id={`${collection.slug}-collection`}
            sx={{
              maxWidth: 620,
              m: 0,
              color: brandColors.ivory,
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: {
                xs: "clamp(3.15rem, 14vw, 5rem)",
                md: "clamp(4.6rem, 7.4vw, 7.5rem)",
              },
              fontWeight: 500,
              letterSpacing: 0,
              lineHeight: 0.9,
            }}
          >
            {chapter.title}
          </Typography>
          <Typography
            sx={{
              maxWidth: 590,
              color: alpha(brandColors.ivory, 0.72),
              fontSize: { xs: "1rem", md: "1.08rem" },
              lineHeight: 1.82,
            }}
          >
            {chapter.copy}
          </Typography>
        </Stack>

        <MoodPanel sx={{ p: { xs: 2.25, md: 2.75 } }}>
          <Typography
            component="p"
            sx={{
              m: "0 0 10px",
              color: alpha(brandColors.goldSoft, 0.82),
              fontSize: "0.64rem",
              fontWeight: 900,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {t("labels.mood")}
          </Typography>
          <Typography
            sx={{
              m: 0,
              color: alpha(brandColors.ivory, 0.74),
              fontSize: "0.92rem",
              lineHeight: 1.7,
            }}
          >
            {chapter.mood}
          </Typography>
        </MoodPanel>

        <Box>
          <Typography
            component="p"
            sx={{
              m: "0 0 12px",
              color: alpha(brandColors.ivory, 0.5),
              fontSize: "0.66rem",
              fontWeight: 900,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {t("labels.curatedPieces")}
          </Typography>
          <CollectionProductLinks products={collection.products} />
        </Box>
      </Stack>
    </Grid>
  );

  return (
    <Box
      aria-labelledby={`${collection.slug}-collection`}
      component="section"
      sx={{
        py: { xs: 6.5, md: 10 },
        borderBottom: `1px solid ${alpha(brandColors.ivory, 0.08)}`,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "min(100% - 32px, var(--container))",
          mx: "auto",
        }}
      >
        <Grid
          container
          direction={{ xs: "row", md: chapter.reverse ? "row-reverse" : "row" }}
          spacing={{ xs: 4.5, md: 7 }}
          sx={{ alignItems: "center" }}
        >
          {image}
          {content}
        </Grid>
      </Container>
    </Box>
  );
}

export const collectionCtaLinkSx = {
  display: "inline-flex",
  minHeight: 48,
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${alpha(brandColors.goldSoft, 0.7)}`,
  borderRadius: "999px",
  color: brandColors.obsidian,
  background: brandColors.goldSoft,
  px: 2.8,
  fontSize: "0.78rem",
  fontWeight: 900,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  transition: `background 220ms ${transitions.ease}, border-color 220ms ${transitions.ease}, transform 220ms ${transitions.ease}`,
  "&:hover": {
    borderColor: brandColors.gold,
    background: brandColors.gold,
    transform: "translateY(-1px)",
  },
} as const;
