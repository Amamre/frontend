export const SUPPORTED_LOCALES = ["de-DE", "en-US"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "de-DE";


export function isLocale(value: string | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function normalizeLocale(
  value: string | undefined | null,
): Locale | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();

  if (isLocale(normalized)) {
    return normalized;
  }

  const language = normalized.split("-")[0];

  return isLocale(language) ? language : undefined;
}

export function detectLocaleFromHeader(header: string | null): Locale {
  if (!header) {
    return DEFAULT_LOCALE;
  }

  const languages = header
    .split(",")
    .map((language) => normalizeLocale(language.split(";")[0]?.trim()))
    .filter((locale): locale is Locale => Boolean(locale));

  return languages[0] ?? DEFAULT_LOCALE;
}
