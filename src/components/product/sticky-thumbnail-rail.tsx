"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { brandColors, transitions } from "@/styles/theme";
import type { ProductImage } from "@/types";

type StickyThumbnailRailProps = {
  activeIndex: number;
  images: ProductImage[];
  onSelect: (index: number) => void;
  orientation?: "vertical" | "horizontal";
  productTitle: string;
};

export function StickyThumbnailRail({
  activeIndex,
  images,
  onSelect,
  orientation = "vertical",
  productTitle,
}: StickyThumbnailRailProps) {
  const vertical = orientation === "vertical";

  return (
    <Box
      aria-label={`${productTitle} media thumbnails`}
      component="nav"
      sx={
        vertical
          ? {
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: "calc(var(--header-height) + 20px)",
              alignSelf: "start",
            }
          : {
              position: "absolute",
              right: 12,
              bottom: 12,
              left: 12,
              zIndex: 6,
              display: { xs: "block", md: "none" },
              overflow: "hidden",
              border: "1px solid rgba(216, 198, 165, 0.18)",
              borderRadius: "8px",
              background: "rgba(9, 9, 8, 0.58)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              "&::before, &::after": {
                position: "absolute",
                top: 0,
                bottom: 0,
                zIndex: 2,
                width: 28,
                content: '""',
                pointerEvents: "none",
              },
              "&::before": {
                left: 0,
                background:
                  "linear-gradient(90deg, rgba(9, 9, 8, 0.88), rgba(9, 9, 8, 0))",
              },
              "&::after": {
                right: 0,
                background:
                  "linear-gradient(270deg, rgba(9, 9, 8, 0.88), rgba(9, 9, 8, 0))",
              },
            }
      }
    >
      <Box
        component="ol"
        sx={{
          display: vertical ? "grid" : "flex",
          maxHeight: vertical ? "min(72vh, 680px)" : "none",
          gap: vertical ? 1 : 0.85,
          overflowX: vertical ? "hidden" : "auto",
          overflowY: vertical ? "auto" : "hidden",
          p: vertical ? 0 : "8px",
          m: 0,
          listStyle: "none",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {images.map((image, index) => {
          const active = activeIndex === index;

          return (
            <Box
              component="li"
              key={`${image.id}-${orientation}`}
              sx={{ flex: vertical ? undefined : "0 0 auto" }}
            >
              <Box
                aria-label={`View ${image.alt}`}
                aria-pressed={active}
                component="button"
                onClick={() => onSelect(index)}
                sx={{
                  position: "relative",
                  display: "block",
                  width: vertical ? 66 : 54,
                  height: vertical ? 82 : 68,
                  overflow: "hidden",
                  border: `1px solid ${
                    active ? "rgba(216, 198, 165, 0.88)" : brandColors.border
                  }`,
                  borderRadius: "6px",
                  background: brandColors.obsidian,
                  boxShadow: active
                    ? "0 0 0 1px rgba(216, 198, 165, 0.2), 0 0 24px rgba(216, 198, 165, 0.12), 0 16px 38px rgba(0, 0, 0, 0.34)"
                    : "none",
                  cursor: "pointer",
                  p: 0,
                  transform: active ? "scale(1.018)" : "scale(1)",
                  transition: `border-color 220ms ${transitions.ease}, box-shadow 220ms ${transitions.ease}, transform 220ms ${transitions.ease}`,
                  "&:hover": {
                    borderColor: "rgba(216, 198, 165, 0.72)",
                    boxShadow:
                      "0 0 0 1px rgba(216, 198, 165, 0.14), 0 14px 34px rgba(0, 0, 0, 0.32)",
                    transform: active
                      ? "scale(1.018)"
                      : "translateY(-1px) scale(1)",
                  },
                  "&:focus-visible": {
                    borderColor: "rgba(216, 198, 165, 0.94)",
                    boxShadow:
                      "0 0 0 3px rgba(216, 198, 165, 0.18), 0 0 24px rgba(216, 198, 165, 0.12)",
                    outline: "none",
                  },
                }}
                type="button"
              >
                <ThumbnailMedia image={image} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function ThumbnailMedia({ image }: { image: ProductImage }) {
  const video = isVideoUrl(image.url);

  return (
    <>
      {video ? (
        <Box
          component="video"
          muted
          playsInline
          preload="metadata"
          src={image.url}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "42% 50%",
          }}
        />
      ) : (
        <Image
          alt=""
          aria-hidden="true"
          fill
          quality={82}
          sizes="76px"
          src={image.mobileUrl ?? image.url}
          style={{
            objectFit: "cover",
            objectPosition: "64% 50%",
          }}
        />
      )}
    </>
  );
}

function isVideoUrl(url: string) {
  return /\.(mp4|m4v|mov|webm)(\?.*)?$/i.test(url);
}
