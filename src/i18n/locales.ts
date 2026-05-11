export const SUPPORTED_LOCALES = ["de", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function normalizeLocale(
  value: string | undefined | null,
): Locale | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  const exactMatch = SUPPORTED_LOCALES.find(
    (locale) => locale.toLowerCase() === normalized,
  );

  if (exactMatch) {
    return exactMatch;
  }

  const language = normalized.split("-")[0];

  if (!language) {
    return undefined;
  }

  return SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === language);
}

export function detectLocaleFromHeader(header: string | null): Locale {
  if (!header) {
    return DEFAULT_LOCALE;
  }

  const locales = header
    .split(",")
    .map((entry) => normalizeLocale(entry.split(";")[0]?.trim()))
    .filter((locale): locale is Locale => Boolean(locale));

  return locales[0] ?? DEFAULT_LOCALE;
}
