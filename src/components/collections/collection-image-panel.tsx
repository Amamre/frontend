"use client";

import { Box, Paper, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Image from "next/image";
import { brandColors, shadows } from "@/styles/theme";
import type { ProductImage } from "@/types";

type CollectionImagePanelProps = {
  chapter: string;
  image: ProductImage;
  objectPosition: string;
  priority?: boolean;
  title: string;
};

const ImageSurface = styled(Paper)(() => ({
  position: "relative",
  overflow: "hidden",
  border: `1px solid ${alpha(brandColors.goldSoft, 0.2)}`,
  borderRadius: 8,
  background: brandColors.ink,
  boxShadow: shadows.soft,
}));

export function CollectionImagePanel({
  chapter,
  image,
  objectPosition,
  priority = false,
  title,
}: CollectionImagePanelProps) {
  return (
    <ImageSurface>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 430, sm: 560, md: 700 },
          aspectRatio: { xs: "4 / 5", md: "5 / 6" },
          background: brandColors.obsidian,
        }}
      >
        <Image
          alt={image.alt}
          fill
          priority={priority}
          quality={90}
          sizes="(min-width: 900px) 46vw, 100vw"
          src={image.url}
          style={{
            objectFit: "cover",
            objectPosition,
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: { xs: 14, md: 18 },
          bottom: { xs: 14, md: 18 },
          left: { xs: 14, md: 18 },
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          pointerEvents: "none",
        }}
      >
        <Typography
          component="span"
          sx={{
            px: 1.2,
            py: 0.7,
            border: `1px solid ${alpha(brandColors.ivory, 0.14)}`,
            borderRadius: "999px",
            color: alpha(brandColors.ivory, 0.78),
            background: alpha(brandColors.obsidian, 0.64),
            backdropFilter: "blur(12px)",
            fontSize: "0.64rem",
            fontWeight: 850,
            letterSpacing: "0.16em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {chapter}
        </Typography>
        <Typography
          component="span"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            px: 1.2,
            py: 0.7,
            border: `1px solid ${alpha(brandColors.ivory, 0.14)}`,
            borderRadius: "999px",
            color: alpha(brandColors.ivory, 0.72),
            background: alpha(brandColors.obsidian, 0.58),
            backdropFilter: "blur(12px)",
            fontSize: "0.64rem",
            fontWeight: 850,
            letterSpacing: "0.16em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Box>
    </ImageSurface>
  );
}
