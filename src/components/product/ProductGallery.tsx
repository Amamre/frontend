"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { ImageFrame } from "@/components/ui/Primitives";
import { IMAGE_CONFIG } from "@/constants/config";
import { brandColors } from "@/styles/theme";
import type { Product } from "@/types";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const activeImage = product.images[active] ?? product.images[0];

  return (
    <Box sx={{ display: "grid", gap: 1.75 }}>
      <ImageFrame>
        <Image
          alt={activeImage?.alt ?? product.title}
          fill
          priority
          sizes={IMAGE_CONFIG.sizes}
          src={activeImage?.url ?? "/editorial/amamre-hero-campaign.png"}
        />
      </ImageFrame>
      <Box
        aria-label={`${product.title} gallery`}
        component="ul"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1.25,
          p: 0,
          m: 0,
          listStyle: "none",
        }}
      >
        {product.images.map((image, index) => (
          <Box component="li" key={image.id}>
            <Box
              aria-label={`View ${image.alt}`}
              aria-pressed={active === index}
              component="button"
              onClick={() => setActive(index)}
              sx={{
                position: "relative",
                display: "block",
                width: "100%",
                overflow: "hidden",
                border: `1px solid ${brandColors.border}`,
                borderRadius: 2,
                aspectRatio: "1",
                background: brandColors.charcoal,
                p: 0,
                "& img": { objectFit: "cover" },
              }}
              type="button"
            >
              <Image alt="" fill sizes="120px" src={image.url} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
