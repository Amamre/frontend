"use server";

import { redirect } from "next/navigation";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import {
  createCheckoutSchema,
  createContactFormSchema,
  createNewsletterSchema,
  type ValidationMessages,
} from "@/lib/validation";
import { createCart } from "@/services/shopify";
import type { ActionState } from "@/types";

const validationError = (
  message: string,
  error: { flatten: () => { fieldErrors: Record<string, string[]> } },
): ActionState => ({
  ok: false,
  message,
  fieldErrors: error.flatten().fieldErrors,
});

const getValidationMessages = async (): Promise<ValidationMessages> => {
  const forms = await getTypedTranslations("forms");

  return {
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
  };
};

export const subscribeNewsletter = async (
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const newsletter = await getTypedTranslations("newsletter");
  const parsed = createNewsletterSchema(
    await getValidationMessages(),
  ).safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName") || undefined,
    country: formData.get("country") || "DE",
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return validationError(newsletter("messages.invalid"), parsed.error);
  }

  return {
    ok: true,
    message: newsletter("messages.success"),
  };
};

export const submitContact = async (
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const forms = await getTypedTranslations("forms");
  const parsed = createContactFormSchema(
    await getValidationMessages(),
  ).safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return validationError(forms("contact.invalid"), parsed.error);
  }

  return {
    ok: true,
    message: forms("contact.success"),
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
  const checkout = await getTypedTranslations("checkout");
  const parsed = createCheckoutSchema(await getValidationMessages()).safeParse({
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
    return validationError(checkout("messages.invalid"), parsed.error);
  }

  return {
    ok: true,
    message: checkout("messages.success"),
  };
};
