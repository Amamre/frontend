import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/i18n/locales";

export const LOCALE_COOKIE_NAME = "locale";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "never",
  localeCookie: {
    name: LOCALE_COOKIE_NAME,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  },
  localeDetection: true,
  alternateLinks: true,
});
