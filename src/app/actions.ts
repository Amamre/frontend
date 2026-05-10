"use server";

import {
  checkoutSchema,
  contactFormSchema,
  newsletterSchema,
} from "@/lib/validation";
import { createCart } from "@/services/shopify";
import type { ActionState } from "@/types";
import { redirect } from "next/navigation";

const validationError = (
  message: string,
  error: { flatten: () => { fieldErrors: Record<string, string[]> } },
): ActionState => ({
  ok: false,
  message,
  fieldErrors: error.flatten().fieldErrors,
});

export const subscribeNewsletter = async (
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName") || undefined,
    country: formData.get("country") || "DE",
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return validationError(
      "Please check your email and consent.",
      parsed.error,
    );
  }

  return {
    ok: true,
    message:
      "You are on the AMAMBRA list. Collection notes and launch access will arrive by email.",
  };
};

export const submitContact = async (
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return validationError(
      "Please complete the required fields.",
      parsed.error,
    );
  }

  return {
    ok: true,
    message:
      "Message received. AMAMBRA customer care will respond within one business day.",
  };
};

export const startShopifyCheckout = async (
  lineItems: Array<{ variantId: string; quantity: number }>,
) => {
  const cart = await createCart(
    lineItems.map((item) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    })),
  );

  redirect(cart.checkoutUrl);
};

export const submitCheckoutLead = async (
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const parsed = checkoutSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    street: formData.get("street"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    phone: formData.get("phone") || undefined,
    sameAsShipping: formData.get("sameAsShipping") === "on",
    marketingConsent: formData.get("marketingConsent") === "on",
  });

  if (!parsed.success) {
    return validationError(
      "Please review your checkout details.",
      parsed.error,
    );
  }

  return {
    ok: true,
    message:
      "Checkout profile validated. Connect Shopify credentials to redirect directly into Shopify Checkout.",
  };
};
