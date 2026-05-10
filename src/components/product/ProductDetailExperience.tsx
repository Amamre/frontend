"use client";

import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Dialog, Stack, Typography, useTheme } from "@mui/material";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  AppButton,
  BodyCopy,
  DividerLine,
  Eyebrow,
  Headline,
  IconAction,
  Muted,
  SplitLayout,
  Subhead,
  Swatch,
} from "@/components/ui/Primitives";
import { IMAGE_CONFIG } from "@/constants/config";
import { useIsMounted } from "@/hooks/useUtils";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { brandColors, shadows, transitions } from "@/styles/theme";
import type {
  Product,
  ProductColorOption,
  ProductImage,
  ProductVariant,
} from "@/types";

type ProductDetailExperienceProps = {
  initialColor?: string;
  initialSize?: string;
  product: Product;
};

const galleryTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function ProductDetailExperience({
  initialColor,
  initialSize,
  product,
}: ProductDetailExperienceProps) {
  const router = useRouter();
  const theme = useTheme();
  const mounted = useIsMounted();
  const colorOptions = product.colorOptions;
  const initialColorOption = resolveColor(colorOptions, initialColor);
  const [selectedColorSlug, setSelectedColorSlug] = useState(
    initialColorOption.slug,
  );
  const selectedColor = resolveColor(colorOptions, selectedColorSlug);
  const [selectedSize, setSelectedSize] = useState(() =>
    resolveSize(product, initialColorOption, initialSize),
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState<ProductImage | null>(
    null,
  );
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem, isInWishlist, removeItem } = useWishlistStore();
  const inWishlist = mounted && isInWishlist(product.id);
  const selectedVariant = useMemo(
    () => findVariant(product.variants, selectedColor.name, selectedSize),
    [product.variants, selectedColor.name, selectedSize],
  );
  const selectedImages = selectedColor.images.length
    ? selectedColor.images
    : product.images;
  const activeImage = selectedImages[activeImageIndex] ?? selectedImages[0];

  useEffect(() => {
    setQuantity((value) =>
      Math.min(value, Math.max(1, selectedVariant?.inventory ?? 1)),
    );
  }, [selectedVariant?.inventory]);

  const updateUrl = (colorSlug: string, size: string) => {
    const params = new URLSearchParams();
    params.set("color", colorSlug);
    if (size) {
      params.set("size", size);
    }
    router.replace(`/product/${product.slug}?${params.toString()}`, {
      scroll: false,
    });
  };

  const selectColor = (color: ProductColorOption) => {
    const nextSize = resolveSize(product, color, selectedSize);
    setSelectedColorSlug(color.slug);
    setSelectedSize(nextSize);
    setActiveImageIndex(0);
    updateUrl(color.slug, nextSize);
  };

  const selectSize = (size: string) => {
    setSelectedSize(size);
    updateUrl(selectedColor.slug, size);
  };

  const add = () => {
    if (!selectedVariant || selectedVariant.inventory < quantity) {
      toast.error("Selected variant is unavailable");
      return;
    }

    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
      price: selectedVariant.price,
      product,
    });
    toast.success("Added to cart");
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id);
      toast.success("Removed from wishlist");
      return;
    }

    addItem(product);
    toast.success("Saved to wishlist");
  };

  return (
    <MotionConfig reducedMotion="user">
      <SplitLayout sx={{ gap: { xs: 3, md: 5.5 } }}>
        <Box sx={{ display: "grid", gap: 1.5 }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              border: `1px solid ${brandColors.border}`,
              borderRadius: "8px",
              aspectRatio: { xs: "4 / 5", md: "5 / 6" },
              background:
                "linear-gradient(135deg, rgba(216, 198, 165, 0.06), transparent 42%), #11100e",
              boxShadow: shadows.soft,
            }}
          >
            <AnimatePresence initial={false} mode="wait">
              {activeImage ? (
                <motion.button
                  animate={{ opacity: 1, scale: 1 }}
                  aria-label={`Open ${activeImage.alt}`}
                  exit={{ opacity: 0, scale: 1.01 }}
                  initial={{ opacity: 0, scale: 1.015 }}
                  key={activeImage.id}
                  onClick={() => setFullscreenImage(activeImage)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "block",
                    width: "100%",
                    height: "100%",
                    border: 0,
                    padding: 0,
                    background: "transparent",
                  }}
                  transition={galleryTransition}
                  type="button"
                >
                  <ColorizedImage
                    color={selectedColor}
                    image={activeImage}
                    priority
                    sizes={IMAGE_CONFIG.sizes}
                  />
                </motion.button>
              ) : null}
            </AnimatePresence>
            <Box
              sx={{
                position: "absolute",
                right: 14,
                bottom: 14,
                zIndex: 3,
                px: 1.4,
                py: 0.75,
                border: `1px solid ${brandColors.border}`,
                borderRadius: "999px",
                color: "rgba(250, 248, 241, 0.78)",
                background: "rgba(9, 9, 8, 0.72)",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {selectedColor.name}
            </Box>
          </Box>

          <Box
            aria-label={`${product.title} ${selectedColor.name} gallery`}
            component="ul"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(4, minmax(0, 1fr))",
                sm: "repeat(6, minmax(0, 1fr))",
              },
              gap: 1,
              p: 0,
              m: 0,
              listStyle: "none",
            }}
          >
            {selectedImages.slice(0, 12).map((image, index) => (
              <Box component="li" key={image.id}>
                <Box
                  aria-label={`View ${image.alt}`}
                  aria-pressed={activeImageIndex === index}
                  component="button"
                  onClick={() => setActiveImageIndex(index)}
                  sx={{
                    position: "relative",
                    display: "block",
                    width: "100%",
                    overflow: "hidden",
                    border: `1px solid ${
                      activeImageIndex === index
                        ? "rgba(216, 198, 165, 0.82)"
                        : brandColors.border
                    }`,
                    borderRadius: "6px",
                    aspectRatio: "1",
                    background: brandColors.charcoal,
                    p: 0,
                    transition: `border-color 180ms ${transitions.ease}, transform 180ms ${transitions.ease}`,
                    "&:hover": {
                      borderColor: "rgba(216, 198, 165, 0.72)",
                      transform: "translateY(-1px)",
                    },
                  }}
                  type="button"
                >
                  <ColorizedImage
                    color={selectedColor}
                    image={image}
                    sizes="120px"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          component="aside"
          sx={{
            position: { xs: "static", md: "sticky" },
            top: "calc(var(--header-height) + 20px)",
            display: "grid",
            gap: 2.75,
            alignSelf: "start",
            p: { xs: 0, md: "2px 0" },
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
              sx={{ fontSize: "1.38rem", fontWeight: 800 }}
            >
              {formatPrice(product.price)}
            </Typography>
            {product.compareAtPrice ? (
              <Muted
                sx={{ fontSize: "0.84rem", textDecoration: "line-through" }}
              >
                {formatPrice(product.compareAtPrice)}
              </Muted>
            ) : null}
          </Stack>

          <DividerLine />

          <Stack spacing={1.45}>
            <OptionHeading label="Color" value={selectedColor.name} />
            <Box
              aria-label="Choose color"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 0.85,
              }}
            >
              {colorOptions.map((color) => {
                const selected = color.slug === selectedColor.slug;

                return (
                  <Box
                    aria-pressed={selected}
                    component="button"
                    key={color.slug}
                    onClick={() => selectColor(color)}
                    sx={{
                      display: "inline-flex",
                      minHeight: 52,
                      gap: 1.45,
                      alignItems: "center",
                      justifyContent: "flex-start",
                      appearance: "none",
                      border: `1px solid ${
                        selected
                          ? "rgba(216, 198, 165, 0.88)"
                          : brandColors.border
                      }`,
                      borderRadius: "6px",
                      color: theme.palette.text.primary,
                      background: selected
                        ? "#E5D2B0"
                        : "rgba(250, 248, 241, 0.018)",

                      boxShadow: "none",
                      cursor: "pointer",
                      font: "inherit",
                      opacity: selected ? 1 : 0.88,
                      p: "13px 17px",
                      textAlign: "left",
                      transition: `border-color 220ms ${transitions.ease}, background 220ms ${transitions.ease}, box-shadow 220ms ${transitions.ease}, opacity 220ms ${transitions.ease}, transform 220ms ${transitions.ease}`,
                      "&:hover": {
                        borderColor: "rgba(216, 198, 165, 0.72)",
                        boxShadow: selected
                          ? "0 0 0 1px rgba(216, 198, 165, 0.2), 0 20px 58px rgba(216, 198, 165, 0.09)"
                          : "0 14px 42px rgba(216, 198, 165, 0.052)",
                        opacity: 1,
                        transform: "translateY(-1px)",
                      },
                      "&:focus-visible": {
                        borderColor: "rgba(216, 198, 165, 0.94)",
                        boxShadow:
                          "0 0 0 3px rgba(216, 198, 165, 0.18), 0 18px 54px rgba(216, 198, 165, 0.08)",
                        outline: "none",
                      },
                    }}
                    type="button"
                  >
                    <Swatch
                      aria-hidden="true"
                      color={color.code}
                      sx={{
                        width: 24,
                        height: 24,
                        border: `1px solid ${
                          selected
                            ? "rgba(11, 11, 10, 0.18)"
                            : "rgba(250, 248, 241, 0.32)"
                        }`,
                        background: `radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.42), transparent 30%), linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(0, 0, 0, 0.28)), ${color.code}`,
                        boxShadow:
                          "inset 0 1px 5px rgba(255, 255, 255, 0.2), inset 0 -6px 10px rgba(0, 0, 0, 0.28)",
                        transition: `border-color 220ms ${transitions.ease}, box-shadow 220ms ${transitions.ease}, opacity 220ms ${transitions.ease}`,
                      }}
                    />
                    <Typography
                      component="span"
                      sx={{
                        color: selected
                          ? "#0B0B0A"
                          : "rgba(250, 248, 241, 0.82)",
                        fontSize: "0.92rem",
                        fontWeight: 750,
                        letterSpacing: "0.015em",
                        lineHeight: 1.2,
                      }}
                    >
                      {color.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Stack>

          <Stack spacing={1.45}>
            <OptionHeading label="Size" value={selectedSize} />
            <Box
              aria-label="Choose size"
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(3, minmax(0, 1fr))",
                  sm: "repeat(6, minmax(0, 1fr))",
                },
                gap: { xs: 0.95, sm: 1.1 },
              }}
            >
              {product.sizes.map((size) => {
                const variant = findVariant(
                  product.variants,
                  selectedColor.name,
                  size,
                );
                const soldOut = !variant || variant.inventory <= 0;
                const selected = size === selectedSize;

                return (
                  <Box
                    aria-pressed={selected}
                    component="button"
                    disabled={soldOut}
                    key={size}
                    onClick={() => selectSize(size)}
                    sx={{
                      display: "grid",
                      minHeight: 52,
                      placeItems: "center",
                      border: `1px solid ${
                        selected
                          ? "rgba(216, 198, 165, 0.86)"
                          : brandColors.border
                      }`,
                      borderRadius: "6px",
                      color: soldOut
                        ? "rgba(250, 248, 241, 0.28)"
                        : selected
                          ? "#0B0B0A"
                          : theme.palette.text.primary,
                      background: selected
                        ? "#E5D2B0"
                        : "rgba(250, 248, 241, 0.024)",

                      boxShadow: "none",
                      cursor: soldOut ? "not-allowed" : "pointer",
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      opacity: soldOut ? 0.5 : 1,
                      px: { xs: 2, sm: 2.25 },
                      transition: `border-color 220ms ${transitions.ease}, background 220ms ${transitions.ease}, box-shadow 220ms ${transitions.ease}, opacity 220ms ${transitions.ease}, transform 220ms ${transitions.ease}`,
                      "&:hover": soldOut
                        ? undefined
                        : {
                            borderColor: "rgba(216, 198, 165, 0.68)",
                            boxShadow: "none",
                            opacity: 0.94,
                            transform: "translateY(-1px)",
                          },
                      "&:focus-visible": {
                        borderColor: "rgba(216, 198, 165, 0.94)",
                        boxShadow: "none",
                        outline: "none",
                      },
                    }}
                    type="button"
                  >
                    {size}
                  </Box>
                );
              })}
            </Box>
          </Stack>

          <Stack spacing={1.25}>
            <OptionHeading
              label="Quantity"
              value={inventoryLabel(selectedVariant)}
            />
            <Box
              sx={{
                display: "grid",
                maxWidth: 190,
                gridTemplateColumns: "46px 1fr 46px",
                gap: 1,
                alignItems: "center",
              }}
            >
              <IconAction
                aria-label="Decrease quantity"
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
                  borderRadius: "6px",
                  fontWeight: 800,
                }}
              >
                {quantity}
              </Box>
              <IconAction
                aria-label="Increase quantity"
                disabled={
                  !selectedVariant || selectedVariant.inventory <= quantity
                }
                onClick={() =>
                  setQuantity((value) =>
                    Math.min(selectedVariant?.inventory ?? 1, value + 1),
                  )
                }
              >
                +
              </IconAction>
            </Box>
          </Stack>

          <Stack spacing={1.15}>
            <AppButton
              aria-label="Add to cart"
              disabled={!selectedVariant || selectedVariant.inventory <= 0}
              fullWidth
              onClick={add}
              type="button"
              variant="primary"
            >
              Add to bag
            </AppButton>
            <AppButton
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
              fullWidth
              onClick={toggleWishlist}
              type="button"
            >
              {inWishlist ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
              {inWishlist ? "Saved" : "Save piece"}
            </AppButton>
          </Stack>

          <DividerLine />

          <Stack spacing={1.5}>
            <BodyCopy sx={{ m: 0 }}>
              Free Germany shipping over EUR 100. Duties and taxes are shown at
              checkout for EU customers.
            </BodyCopy>
            <BodyCopy sx={{ m: 0 }}>
              Secure Shopify checkout activates once live Storefront credentials
              are connected.
            </BodyCopy>
          </Stack>
        </Box>
      </SplitLayout>

      <Dialog
        fullScreen
        onClose={() => setFullscreenImage(null)}
        open={Boolean(fullscreenImage)}
        slotProps={{
          paper: {
            sx: {
              background: "rgba(5, 5, 5, 0.96)",
              backgroundImage: "none",
            },
          },
        }}
      >
        <Box sx={{ position: "relative", minHeight: "100svh" }}>
          <IconAction
            aria-label="Close image"
            onClick={() => setFullscreenImage(null)}
            sx={{ position: "fixed", top: 20, right: 20, zIndex: 2 }}
          >
            <CloseIcon fontSize="small" />
          </IconAction>
          {fullscreenImage ? (
            <Box
              sx={{
                position: "absolute",
                inset: { xs: 16, md: 36 },
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <ColorizedImage
                color={selectedColor}
                image={fullscreenImage}
                sizes="100vw"
              />
            </Box>
          ) : null}
        </Box>
      </Dialog>
    </MotionConfig>
  );
}

function OptionHeading({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "baseline", justifyContent: "space-between" }}
    >
      <Typography
        component="h2"
        sx={{
          m: 0,
          color: "rgba(216, 198, 165, 0.82)",
          fontSize: "0.68rem",
          fontWeight: 900,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
      <Muted
        sx={{
          color: "rgba(250, 248, 241, 0.82)",
          fontSize: "0.86rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        {value}
      </Muted>
    </Stack>
  );
}

function ColorizedImage({
  color,
  image,
  priority = false,
  sizes,
}: {
  color: ProductColorOption;
  image: ProductImage;
  priority?: boolean;
  sizes: string;
}) {
  const opacity = color.name === "Soft Ivory" ? 0.16 : 0.28;

  return (
    <>
      <Image
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        src={image.url}
        style={{ objectFit: "cover" }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${color.code}, transparent 42%), radial-gradient(circle at 72% 22%, rgba(216, 198, 165, 0.2), transparent 30%)`,
          mixBlendMode: color.name === "Soft Ivory" ? "soft-light" : "color",
          opacity,
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(9, 9, 8, 0.02), rgba(9, 9, 8, 0.42))",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function resolveColor(
  colorOptions: ProductColorOption[],
  colorSlug?: string,
): ProductColorOption {
  return (
    colorOptions.find(
      (color) => color.slug === colorSlug || color.name === colorSlug,
    ) ??
    colorOptions[0] ?? {
      name: "Obsidian Black",
      slug: "obsidian-black",
      code: brandColors.obsidian,
      description: "Matte black AMAMRE colorway.",
      images: [],
    }
  );
}

function resolveSize(
  product: Product,
  color: ProductColorOption,
  preferredSize?: string,
) {
  const preferredVariant = findVariant(
    product.variants,
    color.name,
    preferredSize,
  );

  if (preferredSize && preferredVariant && preferredVariant.inventory > 0) {
    return preferredSize;
  }

  return (
    product.sizes.find((size) => {
      const variant = findVariant(product.variants, color.name, size);
      return variant && variant.inventory > 0;
    }) ??
    product.sizes.find((size) =>
      findVariant(product.variants, color.name, size),
    ) ??
    product.sizes[0] ??
    ""
  );
}

function findVariant(
  variants: ProductVariant[],
  color?: string,
  size?: string,
): ProductVariant | undefined {
  return variants.find(
    (variant) => variant.color === color && variant.size === size,
  );
}

function inventoryLabel(variant?: ProductVariant) {
  if (!variant || variant.inventory <= 0) {
    return "Out of stock";
  }

  if (variant.inventory <= 3) {
    return `${variant.inventory} left`;
  }

  return "In stock";
}
