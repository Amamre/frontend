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
import { useMemo, useState, useTransition } from "react";
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
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { calculateOrderSummary } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { type CheckoutData, createCheckoutSchema } from "@/lib/validation";
import { useCartStore } from "@/store/cartStore";
import { brandColors } from "@/styles/theme";

export function CheckoutClient() {
  const checkout = useTypedTranslations("checkout");
  const common = useTypedTranslations("common");
  const forms = useTypedTranslations("forms");
  const checkoutSchema = useMemo(
    () =>
      createCheckoutSchema({
        cityRequired: forms("validation.cityRequired"),
        consentRequired: forms("validation.consentRequired"),
        countryRequired: forms("validation.countryRequired"),
        emailInvalid: forms("validation.emailInvalid"),
        firstNameRequired: forms("validation.firstNameRequired"),
        lastNameRequired: forms("validation.lastNameRequired"),
        messageMin: forms("validation.messageMin"),
        nameMin: forms("validation.nameMin"),
        passwordMin: forms("validation.passwordMin"),
        passwordsMatch: forms("validation.passwordsMatch"),
        postalCodeRequired: forms("validation.postalCodeRequired"),
        reviewMin: forms("validation.reviewMin"),
        searchRequired: forms("validation.searchRequired"),
        stateRequired: forms("validation.stateRequired"),
        streetRequired: forms("validation.streetRequired"),
        subjectMin: forms("validation.subjectMin"),
        titleMin: forms("validation.titleMin"),
      }),
    [forms],
  );
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
      country: checkout("defaults.country"),
      state: checkout("defaults.state"),
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
          <Eyebrow>{checkout("empty.eyebrow")}</Eyebrow>
          <Headline>{checkout("empty.headline")}</Headline>
          <AppButton href="/shop" variant="primary">
            {common("actions.shopCollection")}
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
            <Eyebrow>{checkout("page.eyebrow")}</Eyebrow>
            <Headline>{checkout("page.headline")}</Headline>
            <Subhead sx={{ mt: 2.25, mb: 4.25 }}>
              {checkout("page.body")}
            </Subhead>

            <Surface
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "grid", gap: 2 }}
            >
              <FormGrid>
                <Field
                  error={errors.email?.message}
                  label={checkout("fields.email")}
                >
                  <TextField
                    {...register("email")}
                    autoComplete="email"
                    type="email"
                  />
                </Field>
                <Field
                  error={errors.phone?.message}
                  label={checkout("fields.phone")}
                >
                  <TextField {...register("phone")} autoComplete="tel" />
                </Field>
                <Field
                  error={errors.firstName?.message}
                  label={checkout("fields.firstName")}
                >
                  <TextField
                    {...register("firstName")}
                    autoComplete="given-name"
                  />
                </Field>
                <Field
                  error={errors.lastName?.message}
                  label={checkout("fields.lastName")}
                >
                  <TextField
                    {...register("lastName")}
                    autoComplete="family-name"
                  />
                </Field>
                <Field
                  error={errors.street?.message}
                  label={checkout("fields.street")}
                >
                  <TextField
                    {...register("street")}
                    autoComplete="street-address"
                  />
                </Field>
                <Field
                  error={errors.postalCode?.message}
                  label={checkout("fields.postalCode")}
                >
                  <TextField
                    {...register("postalCode")}
                    autoComplete="postal-code"
                  />
                </Field>
                <Field
                  error={errors.city?.message}
                  label={checkout("fields.city")}
                >
                  <TextField
                    {...register("city")}
                    autoComplete="address-level2"
                  />
                </Field>
                <Field
                  error={errors.state?.message}
                  label={checkout("fields.state")}
                >
                  <TextField
                    {...register("state")}
                    autoComplete="address-level1"
                  />
                </Field>
                <Field
                  error={errors.country?.message}
                  label={checkout("fields.country")}
                >
                  <TextField
                    {...register("country")}
                    autoComplete="country-name"
                  />
                </Field>
              </FormGrid>
              <FormControlLabel
                control={<Checkbox {...register("marketingConsent")} />}
                label={checkout("marketingConsent")}
                sx={{
                  m: 0,
                  color: brandColors.muted,
                  "& .MuiFormControlLabel-label": { fontSize: "0.9rem" },
                }}
              />
              <AppButton disabled={isPending} type="submit" variant="primary">
                {isPending
                  ? checkout("actions.validating")
                  : checkout("actions.validate")}
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
            <Eyebrow>{checkout("summary.eyebrow")}</Eyebrow>
            <Stack spacing={1.5}>
              {visibleItems.map((item) => (
                <SummaryRow
                  key={item.variantId}
                  label={checkout("summary.item", {
                    quantity: item.quantity,
                    title: item.product.title,
                  })}
                  value={formatPrice(item.price * item.quantity)}
                />
              ))}
              <DividerLine />
              <SummaryRow
                label={common("summary.subtotal")}
                value={formatPrice(summary.subtotal)}
              />
              <SummaryRow
                label={common("summary.vatEstimate")}
                value={formatPrice(summary.tax)}
              />
              <SummaryRow
                label={common("summary.shipping")}
                value={formatPrice(summary.shipping)}
              />
              <SummaryRow
                label={common("summary.total")}
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
