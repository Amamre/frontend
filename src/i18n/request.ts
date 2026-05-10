import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["de-DE", "en-US", "it-IT", "ak-GH"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

const DEFAULT_LOCALE: Locale = "de-DE";

function isLocale(value: string | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function detectLocaleFromHeader(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const lang = header.toLowerCase();

  if (lang.startsWith("en")) return "en-US";

  return "de-DE";
}

export default getRequestConfig(async () => {
  // 1️⃣ Locale aus Cookie (primär)
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get("locale")?.value;
  const acceptLanguage = headerStore.get("accept-language");

  let locale: Locale;

  if (isLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    locale = detectLocaleFromHeader(acceptLanguage);
  }

  const language = locale.split("-")[0] ?? "en";
  // console.log({locale, language})

  const messages = {

  };

  return {
    locale: language,
    messages,
  };
});
