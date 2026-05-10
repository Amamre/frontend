"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Stack, ToggleButton, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  AppButton,
  BodyCopy,
  DividerLine,
  Eyebrow,
  Headline,
  IconAction,
  Muted,
  Subhead,
  Surface,
} from "@/components/ui/Primitives";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { brandColors } from "@/styles/theme";
import type { Product } from "@/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const theme = useTheme();
  const t = useTypedTranslations("product");
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem, isInWishlist, removeItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.id === variantId) ??
      product.variants[0],
    [product.variants, variantId],
  );

  const add = () => {
    if (!selectedVariant || selectedVariant.inventory < quantity) {
      toast.error(t("toasts.selectedUnavailable"));
      return;
    }

    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      price: selectedVariant.price,
      product,
    });
    toast.success(t("toasts.addedToCart"));
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id);
      toast.success(t("toasts.removedFromWishlist"));
      return;
    }

    addItem(product);
    toast.success(t("toasts.savedToWishlist"));
  };

  return (
    <Surface
      component="aside"
      sx={{
        position: { xs: "static", md: "sticky" },
        top: "calc(var(--header-height) + 20px)",
        display: "grid",
        gap: 2.75,
      }}
    >
      <Box>
        <Eyebrow>{product.collection}</Eyebrow>
        <Headline>{product.title}</Headline>
        <Subhead sx={{ mt: 2.25 }}>{product.description}</Subhead>
      </Box>

      <Stack direction="row" spacing={1.25} sx={{ alignItems: "baseline" }}>
        <Typography
          component="span"
          sx={{ fontSize: "1.4rem", fontWeight: 800 }}
        >
          {formatPrice(product.price)}
        </Typography>
        {product.compareAtPrice ? (
          <Muted sx={{ fontSize: "0.84rem", textDecoration: "line-through" }}>
            {formatPrice(product.compareAtPrice)}
          </Muted>
        ) : null}
      </Stack>

      <DividerLine />

      <Stack spacing={2}>
        <Typography component="strong">{t("labels.sizeAndColor")}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 1.25,
          }}
        >
          {product.variants.map((variant) => (
            <ToggleButton
              aria-pressed={variant.id === selectedVariant?.id}
              disabled={variant.inventory <= 0}
              key={variant.id}
              onClick={() => setVariantId(variant.id)}
              selected={variant.id === selectedVariant?.id}
              sx={{
                minHeight: 48,
                border: `1px solid ${brandColors.border}`,
                borderRadius: "8px !important",
                color: theme.palette.text.primary,
                background: "rgba(250, 248, 241, 0.04)",
                textTransform: "none",
                "&.Mui-selected": {
                  borderColor: brandColors.gold,
                  color: brandColors.obsidian,
                  background: brandColors.goldSoft,
                  "&:hover": { background: brandColors.goldSoft },
                },
              }}
              value={variant.id}
            >
              {variant.title}
            </ToggleButton>
          ))}
        </Box>
      </Stack>

      <Stack spacing={2}>
        <Typography component="strong">{t("labels.quantity")}</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "46px 1fr 46px",
            gap: 1,
            alignItems: "center",
          }}
        >
          <IconAction
            aria-label={t("aria.decreaseQuantity")}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            -
          </IconAction>
          <Box
            sx={{
              display: "grid",
              minHeight: 46,
              placeItems: "center",
              border: `1px solid ${brandColors.border}`,
              borderRadius: 2,
            }}
          >
            {quantity}
          </Box>
          <IconAction
            aria-label={t("aria.increaseQuantity")}
            onClick={() =>
              setQuantity((value) =>
                Math.min(selectedVariant?.inventory ?? 1, value + 1),
              )
            }
          >
            +
          </IconAction>
        </Box>
        <Muted>
          {selectedVariant?.inventory
            ? t("inventory.available", { count: selectedVariant.inventory })
            : t("inventory.outOfStock")}
        </Muted>
      </Stack>

      <AppButton
        disabled={!selectedVariant || selectedVariant.inventory <= 0}
        fullWidth
        onClick={add}
        type="button"
        variant="primary"
      >
        {t("actions.addToCart")}
      </AppButton>

      <AppButton fullWidth onClick={toggleWishlist} type="button">
        {inWishlist ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
        {inWishlist ? t("actions.saved") : t("actions.addToWishlist")}
      </AppButton>

      <DividerLine />

      <Stack spacing={2}>
        <BodyCopy sx={{ m: 0 }}>{t("support.shipping")}</BodyCopy>
        <BodyCopy sx={{ m: 0 }}>{t("support.checkout")}</BodyCopy>
      </Stack>
    </Surface>
  );
}
