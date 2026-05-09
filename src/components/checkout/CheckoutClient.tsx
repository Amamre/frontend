"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { submitCheckoutLead } from "@/app/actions";
import {
  AppButton,
  AppContainer,
  BodyCopy,
  DividerLine,
  EmptyState,
  Eyebrow,
  FieldError,
  FieldTitle,
  FormGrid,
  Headline,
  PageSection,
  SplitLayout,
  Subhead,
  Surface,
} from "@/components/ui/Primitives";
import { useIsMounted } from "@/hooks/useUtils";
import { calculateOrderSummary } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { type CheckoutData, checkoutSchema } from "@/lib/validation";
import { useCartStore } from "@/store/cartStore";
import { brandColors } from "@/styles/theme";

export function CheckoutClient() {
  const items = useCartStore((state) => state.items);
  const mounted = useIsMounted();
  const visibleItems = mounted ? items : [];
  const summary = calculateOrderSummary(visibleItems);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "Germany",
      state: "Baden-Wurttemberg",
      sameAsShipping: true,
    },
  });

  const onSubmit = (values: CheckoutData) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        if (value) {
          formData.set(key, "on");
        }
        return;
      }

      if (value) {
        formData.set(key, value);
      }
    });

    startTransition(async () => {
      const result = await submitCheckoutLead(
        { ok: false, message: "" },
        formData,
      );
      setMessage(result.message);
    });
  };

  if (visibleItems.length === 0) {
    return (
      <EmptyState>
        <div>
          <Eyebrow>Checkout</Eyebrow>
          <Headline>Your bag is empty.</Headline>
          <AppButton href="/shop" variant="primary">
            Shop collection
          </AppButton>
        </div>
      </EmptyState>
    );
  }

  return (
    <PageSection>
      <AppContainer>
        <SplitLayout>
          <Box>
            <Eyebrow>Checkout</Eyebrow>
            <Headline>Launch checkout profile</Headline>
            <Subhead sx={{ mt: 2.25, mb: 4.25 }}>
              This form validates checkout data for launch. Production checkout
              is handed to Shopify Checkout from the cart when Storefront
              credentials are connected.
            </Subhead>

            <Surface
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "grid", gap: 2 }}
            >
              <FormGrid>
                <Field error={errors.email?.message} label="Email">
                  <TextField
                    {...register("email")}
                    autoComplete="email"
                    type="email"
                  />
                </Field>
                <Field error={errors.phone?.message} label="Phone">
                  <TextField {...register("phone")} autoComplete="tel" />
                </Field>
                <Field error={errors.firstName?.message} label="First name">
                  <TextField
                    {...register("firstName")}
                    autoComplete="given-name"
                  />
                </Field>
                <Field error={errors.lastName?.message} label="Last name">
                  <TextField
                    {...register("lastName")}
                    autoComplete="family-name"
                  />
                </Field>
                <Field error={errors.street?.message} label="Street">
                  <TextField
                    {...register("street")}
                    autoComplete="street-address"
                  />
                </Field>
                <Field error={errors.postalCode?.message} label="Postal code">
                  <TextField
                    {...register("postalCode")}
                    autoComplete="postal-code"
                  />
                </Field>
                <Field error={errors.city?.message} label="City">
                  <TextField
                    {...register("city")}
                    autoComplete="address-level2"
                  />
                </Field>
                <Field error={errors.state?.message} label="State">
                  <TextField
                    {...register("state")}
                    autoComplete="address-level1"
                  />
                </Field>
                <Field error={errors.country?.message} label="Country">
                  <TextField
                    {...register("country")}
                    autoComplete="country-name"
                  />
                </Field>
              </FormGrid>
              <FormControlLabel
                control={<Checkbox {...register("marketingConsent")} />}
                label="Receive collection launches and editorial notes."
                sx={{
                  m: 0,
                  color: brandColors.muted,
                  "& .MuiFormControlLabel-label": { fontSize: "0.9rem" },
                }}
              />
              <AppButton disabled={isPending} type="submit" variant="primary">
                {isPending ? "Validating" : "Validate checkout profile"}
              </AppButton>
              {message ? <BodyCopy>{message}</BodyCopy> : null}
            </Surface>
          </Box>

          <Surface
            component="aside"
            sx={{
              position: { xs: "static", md: "sticky" },
              top: "calc(var(--header-height) + 20px)",
              display: "grid",
              gap: 2.75,
            }}
          >
            <Eyebrow>Order summary</Eyebrow>
            <Stack spacing={1.5}>
              {visibleItems.map((item) => (
                <SummaryRow
                  key={item.variantId}
                  label={`${item.quantity} x ${item.product.title}`}
                  value={formatPrice(item.price * item.quantity)}
                />
              ))}
              <DividerLine />
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
          </Surface>
        </SplitLayout>
      </AppContainer>
    </PageSection>
  );
}

function Field({
  children,
  error,
  label,
}: {
  children: ReactNode;
  error?: string;
  label: string;
}) {
  return (
    <Box component="label">
      <FieldTitle>{label}</FieldTitle>
      {children}
      {error ? <FieldError>{error}</FieldError> : null}
    </Box>
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
