"use server";

import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import {
  createNewsletterSchema,
  type ValidationMessages,
} from "@/lib/validation";

export type NewsletterActionState =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
    };

export async function subscribeNewsletter(
  input: unknown,
): Promise<NewsletterActionState> {
  const t = await getTypedTranslations("newsletter");
  const parsed = createNewsletterSchema(
    await getValidationMessages(),
  ).safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? t("messages.emailFallback"),
    };
  }

  // Connect Klaviyo, Shopify Email, or a custom CRM here. The action is kept server-side
  // so API keys never ship to the browser.
  return {
    ok: true,
    message: t("messages.simpleSuccess"),
  };
}

async function getValidationMessages(): Promise<ValidationMessages> {
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
}
