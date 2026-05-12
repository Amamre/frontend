"use client";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Link from "next/link";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { brandColors, transitions } from "@/styles/theme";
import type { Product } from "@/types";

type CollectionProductLinksProps = {
  products: Product[];
};

export function CollectionProductLinks({
  products,
}: CollectionProductLinksProps) {
  const common = useTypedTranslations("common");

  return (
    <Stack
      component="ul"
      spacing={0}
      sx={{
        m: 0,
        p: 0,
        listStyle: "none",
        borderTop: `1px solid ${alpha(brandColors.ivory, 0.14)}`,
      }}
    >
      {products.map((product) => (
        <Box component="li" key={product.id}>
          <Box
            component={Link}
            href={`/product/${product.slug}`}
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr auto",
                sm: "minmax(0, 1fr) auto auto",
              },
              gap: { xs: 1.25, sm: 2.25 },
              alignItems: "center",
              py: { xs: 2, md: 2.25 },
              borderBottom: `1px solid ${alpha(brandColors.ivory, 0.14)}`,
              color: brandColors.ivory,
              transition: `color 240ms ${transitions.ease}, border-color 240ms ${transitions.ease}, opacity 240ms ${transitions.ease}`,
              "&::after": {
                position: "absolute",
                right: 0,
                bottom: -1,
                left: 0,
                height: "1px",
                content: '""',
                background: alpha(brandColors.goldSoft, 0.72),
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: `transform 320ms ${transitions.ease}`,
              },
              "&:hover": {
                color: brandColors.goldSoft,
                borderColor: alpha(brandColors.goldSoft, 0.28),
                "&::after": {
                  transform: "scaleX(1)",
                },
                "& .collection-link-icon": {
                  opacity: 1,
                  transform: "translate(2px, -2px)",
                },
              },
              "&:focus-visible": {
                outline: `2px solid ${alpha(brandColors.goldSoft, 0.72)}`,
                outlineOffset: "4px",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                minWidth: 0,
                fontSize: { xs: "1rem", md: "1.08rem" },
                fontWeight: 650,
                letterSpacing: "0.01em",
                lineHeight: 1.35,
              }}
            >
              {product.title}
            </Typography>
            <Typography
              component="span"
              sx={{
                display: { xs: "none", sm: "block" },
                color: alpha(brandColors.ivory, 0.54),
                fontSize: "0.72rem",
                fontWeight: 850,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {common(productRole(product))}
            </Typography>
            <ArrowOutwardIcon
              className="collection-link-icon"
              fontSize="small"
              sx={{
                color: alpha(brandColors.goldSoft, 0.82),
                opacity: 0.56,
                transition: `opacity 220ms ${transitions.ease}, transform 220ms ${transitions.ease}`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

function productRole(
  product: Product,
): Parameters<ReturnType<typeof useTypedTranslations<"common">>>[0] {
  if (/overshirt|hoodie/i.test(product.title)) {
    return "productRoles.outerwear";
  }

  if (/tracksuit/i.test(product.title)) {
    return "productRoles.set";
  }

  if (/tee/i.test(product.title)) {
    return "productRoles.foundation";
  }

  if (/cap|beanie/i.test(product.title)) {
    return "productRoles.accessories";
  }

  return "productRoles.foundation";
}
