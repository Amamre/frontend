"use client";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { startShopifyCheckout } from "@/app/actions";
import {
  AppButton,
  AppContainer,
  BodyCopy,
  DividerLine,
  EmptyState,
  Eyebrow,
  FieldTitle,
  Headline,
  IconAction,
  PageSection,
  SectionHeading,
  SplitLayout,
  Subhead,
  Surface,
} from "@/components/ui/Primitives";
import { calculateOrderSummary } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { brandColors } from "@/styles/theme";

export function CartClient() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [isPending, startTransition] = useTransition();
  const [promoCode, setPromoCode] = useState("");
  const summary = calculateOrderSummary(items);

  const checkout = () => {
    if (items.length === 0) {
      return;
    }

    startTransition(async () => {
      try {
        await startShopifyCheckout(
          items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        );
      } catch {
        toast.error(
          "Shopify checkout is not configured yet. Use the checkout page for the launch scaffold.",
        );
      }
    });
  };

  if (items.length === 0) {
    return (
      <EmptyState>
        <div>
          <Eyebrow>Cart</Eyebrow>
          <Headline>Your cart is empty.</Headline>
          <BodyCopy>
            Start with the Signature Satin Hood Hoodie or explore the full
            AMAMRE launch collection.
          </BodyCopy>
          <AppButton href="/shop" variant="primary">
            Continue shopping
          </AppButton>
        </div>
      </EmptyState>
    );
  }

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Cart</Eyebrow>
            <Headline>Shopping bag</Headline>
          </Box>
          <Subhead>{items.length} line items ready for checkout.</Subhead>
        </SectionHeading>

        <SplitLayout>
          <Stack spacing={1.75}>
            {items.map((item) => (
              <Surface
                component="article"
                key={item.variantId}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "80px 1fr", sm: "96px 1fr auto" },
                  gap: 2,
                  alignItems: "center",
                  p: 1.5,
                  background: "rgba(250, 248, 241, 0.035)",
                  boxShadow: "none",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "6px",
                    aspectRatio: "4 / 5",
                    background: brandColors.charcoal,
                  }}
                >
                  <Image
                    alt={item.product.title}
                    fill
                    sizes="120px"
                    src={
                      item.product.images[0]?.url ??
                      "/editorial/amamre-hero-campaign.png"
                    }
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box>
                  <Typography component="h2" sx={{ m: "0 0 6px" }}>
                    {item.product.title}
                  </Typography>
                  <BodyCopy sx={{ m: 0 }}>
                    {
                      item.product.variants.find(
                        (variant) => variant.id === item.variantId,
                      )?.title
                    }
                  </BodyCopy>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "46px 1fr 46px",
                      gap: 1,
                      alignItems: "center",
                      maxWidth: 190,
                      mt: 1.75,
                    }}
                  >
                    <IconAction
                      aria-label={`Decrease ${item.product.title}`}
                      onClick={() =>
                        updateQuantity(
                          item.variantId,
                          Math.max(1, item.quantity - 1),
                        )
                      }
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
                      {item.quantity}
                    </Box>
                    <IconAction
                      aria-label={`Increase ${item.product.title}`}
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                    >
                      +
                    </IconAction>
                  </Box>
                </Box>
                <Stack
                  spacing={1.5}
                  sx={{
                    alignItems: "flex-end",
                    gridColumn: { xs: "1 / -1", sm: "auto" },
                  }}
                >
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  <IconAction
                    aria-label={`Remove ${item.product.title}`}
                    onClick={() => removeItem(item.variantId)}
                  >
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconAction>
                </Stack>
              </Surface>
            ))}
          </Stack>

          <Surface
            component="aside"
            sx={{
              position: { xs: "static", md: "sticky" },
              top: "calc(var(--header-height) + 20px)",
              display: "grid",
              gap: 2.75,
            }}
          >
            <Eyebrow>Summary</Eyebrow>
            <Stack spacing={2}>
              <Box component="label">
                <FieldTitle>Promo code</FieldTitle>
                <TextField
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="AMAMRE"
                  value={promoCode}
                />
              </Box>
              <AppButton
                onClick={() =>
                  toast("Promo logic is ready for Shopify Functions.")
                }
                type="button"
              >
                Apply
              </AppButton>
            </Stack>
            <DividerLine />
            <Stack spacing={1.5}>
              <SummaryRow
                label="Subtotal"
                value={formatPrice(summary.subtotal)}
              />
              <SummaryRow
                label="VAT estimate"
                value={formatPrice(summary.tax)}
              />
              <SummaryRow
                label="Shipping"
                value={formatPrice(summary.shipping)}
              />
              <SummaryRow
                label="Total"
                value={formatPrice(summary.total)}
                total
              />
            </Stack>
            <AppButton
              disabled={isPending}
              fullWidth
              onClick={checkout}
              type="button"
              variant="primary"
            >
              {isPending ? "Opening checkout" : "Checkout with Shopify"}
            </AppButton>
            <AppButton fullWidth href="/checkout">
              Launch checkout form
            </AppButton>
          </Surface>
        </SplitLayout>
      </AppContainer>
    </PageSection>
  );
}

function SummaryRow({
  label,
  total = false,
  value,
}: {
  label: string;
  total?: boolean;
  value: string;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-between",
        color: total ? brandColors.ivory : undefined,
        fontSize: total ? "1.08rem" : undefined,
        fontWeight: total ? 800 : undefined,
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </Stack>
  );
}
