"use client";

import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  IconAction,
  Muted,
  productCardSx,
  Swatch,
} from "@/components/ui/Primitives";
import { IMAGE_CONFIG } from "@/constants/config";
import { useIsMounted } from "@/hooks/useUtils";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { brandColors, transitions } from "@/styles/theme";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onViewDetails?: (productId: string) => void;
}

export default function ProductCard({
  product,
  priority = false,
  onViewDetails,
}: ProductCardProps) {
  const theme = useTheme();
  const productT = useTypedTranslations("product");
  const catalog = useTypedTranslations("catalog");
  const mounted = useIsMounted();
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem, isInWishlist, removeItem } = useWishlistStore();
  const inWishlist = mounted && isInWishlist(product.id);
  const firstVariant = product.variants[0];
  const href = `/product/${product.slug}`;

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id);
      toast.success(productT("toasts.removedFromWishlist"));
      return;
    }

    addItem(product);
    toast.success(productT("toasts.savedToWishlist"));
  };

  const quickAdd = () => {
    if (!firstVariant || firstVariant.inventory <= 0) {
      toast.error(productT("toasts.unavailable"));
      return;
    }

    addToCart({
      productId: product.id,
      variantId: firstVariant.id,
      quantity: 1,
      price: firstVariant.price,
      product,
    });
    toast.success(productT("toasts.addedToCart"));
  };

  const content = (
    <>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "4 / 5",
          background: brandColors.charcoal,

          "& img": {
            objectFit: "cover",
            transition: `
  transform 700ms ${transitions.ease},
  opacity 700ms ${transitions.ease}
`,
          },

          "& .product-image--secondary": {
            opacity: 0,
          },

          "&:hover .product-image--primary": {
            transform: "scale(1.03)",
          },

          "&:hover .product-image--secondary": {
            opacity: 1,
            transform: "scale(1.03)",
          },

          "&::after": {
            position: "absolute",
            inset: 0,
            content: '""',
            background:
              "linear-gradient(180deg, transparent 44%, rgba(9, 9, 8, 0.82)), radial-gradient(circle at 18% 18%, rgba(184, 149, 106, 0.18), transparent 28%)",
            pointerEvents: "none",
            zIndex: 1,
          },
        }}
      >
        <Image
          alt={product.images[0]?.alt ?? product.title}
          className="product-image--primary"
          fill
          priority={priority}
          sizes={IMAGE_CONFIG.sizes}
          src={"/AMAMBRA-Transparent.png"}
          // src={product.images[0]?.url ?? "/editorial/amambra-hero-campaign.png"}
        />

        <Image
          alt={product.images[1]?.alt ?? product.title}
          className="product-image--secondary"
          fill
          sizes={IMAGE_CONFIG.sizes}
          src={product.images[0]?.url ?? "/editorial/amambra-hero-campaign.png"}
          // src={product.images[1].url ?? "/AMAMBRA-Transparent.png"}
          style={{
            position: "absolute",
            inset: 0,
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
        >
          <IconAction
            aria-label={
              inWishlist
                ? productT("actions.removeFromWishlist")
                : productT("actions.addToWishlist")
            }
            onClick={(event) => {
              event.preventDefault();
              toggleWishlist();
            }}
          >
            {inWishlist ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconAction>
          <IconAction
            aria-label={productT("actions.quickAdd", { title: product.title })}
            onClick={(event) => {
              event.preventDefault();
              quickAdd();
            }}
          >
            <AddIcon fontSize="small" />
          </IconAction>
        </Stack>
      </Box>

      <Box sx={{ display: "grid", gap: 1.5, p: 2.25 }}>
        <Chip
          label={collectionLabel(product.collection, catalog)}
          sx={{ width: "fit-content" }}
        />
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <Typography
            component="h3"
            sx={{ m: 0, fontSize: "1rem", lineHeight: 1.32, fontWeight: 700 }}
          >
            {product.title}
          </Typography>
          <Typography component="span" sx={{ fontWeight: 800 }}>
            {formatPrice(product.price)}
          </Typography>
        </Stack>
        <Muted
          sx={{ m: 0, display: "block", color: theme.palette.text.secondary }}
        >
          {product.description}
        </Muted>
        <Stack
          aria-label={productT("aria.colors", { title: product.title })}
          component="ul"
          direction="row"
          spacing="7px"
          sx={{ flexWrap: "wrap", p: 0, m: 0, listStyle: "none" }}
        >
          {product.colors.map((color) => (
            <Box component="li" key={color.name}>
              <Swatch
                aria-label={color.name}
                color={color.code}
                role="img"
                title={color.name}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );

  if (onViewDetails) {
    return (
      <Box
        component="button"
        onClick={() => onViewDetails(product.id)}
        sx={[productCardSx(), { p: 0, width: "100%" }]}
        type="button"
      >
        {content}
      </Box>
    );
  }

  return (
    <Box component={Link} href={href} sx={productCardSx()}>
      {content}
    </Box>
  );
}

function collectionLabel(
  collection: string,
  t: ReturnType<typeof useTypedTranslations<"catalog">>,
) {
  const keys: Record<
    string,
    Parameters<ReturnType<typeof useTypedTranslations<"catalog">>>[0]
  > = {
    atelier: "collections.atelier.shortTitle",
    essentials: "collections.essentials.shortTitle",
    heritage: "collections.heritage.shortTitle",
    signature: "collections.signature.shortTitle",
  };

  return keys[collection] ? t(keys[collection]) : collection;
}
