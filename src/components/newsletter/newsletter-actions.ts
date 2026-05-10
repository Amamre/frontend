"use server";

import { newsletterSchema } from "@/lib/validation";

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
  const parsed = newsletterSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message:
        parsed.error.issues[0]?.message ?? "Please check your email address.",
    };
  }

  // Connect Klaviyo, Shopify Email, or a custom CRM here. The action is kept server-side
  // so API keys never ship to the browser.
  return {
    ok: true,
    message: "You are on the AMAMRE list.",
  };
}
