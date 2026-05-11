import { LOCALE_COOKIE_NAME } from "@/constants/cookie";
import {
  DEFAULT_LOCALE,
  detectLocaleFromHeader,
  isLocale,
  Locale,
} from "@/i18n/locales";
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  // 1️⃣ Locale aus Cookie (primär)
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  const acceptLanguage = headerStore.get("accept-language");

  let locale: Locale;

  if (isLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    locale = detectLocaleFromHeader(acceptLanguage);
  }

  const language = locale.split("-")[0] ?? DEFAULT_LOCALE;

  const messages = {
    account: (await import(`../../messages/${language}/account.json`)).default,
    cart: (await import(`../../messages/${language}/cart.json`)).default,
    catalog: (await import(`../../messages/${language}/catalog.json`)).default,
    checkout: (await import(`../../messages/${language}/checkout.json`))
      .default,
    collections: (await import(`../../messages/${language}/collections.json`))
      .default,
    common: (await import(`../../messages/${language}/common.json`)).default,
    cookies: (await import(`../../messages/${language}/cookies.json`)).default,
    errors: (await import(`../../messages/${language}/errors.json`)).default,
    footer: (await import(`../../messages/${language}/footer.json`)).default,
    forms: (await import(`../../messages/${language}/forms.json`)).default,
    hero: (await import(`../../messages/${language}/hero.json`)).default,
    home: (await import(`../../messages/${language}/home.json`)).default,
    marketing: (await import(`../../messages/${language}/marketing.json`))
      .default,
    metadata: (await import(`../../messages/${language}/metadata.json`))
      .default,
    navbar: (await import(`../../messages/${language}/navbar.json`)).default,
    newsletter: (await import(`../../messages/${language}/newsletter.json`))
      .default,
    product: (await import(`../../messages/${language}/product.json`)).default,
    search: (await import(`../../messages/${language}/search.json`)).default,
    shop: (await import(`../../messages/${language}/shop.json`)).default,
  };

  return {
    locale,
    messages,
    timeZone: "Europe/Berlin",
    now: new Date(),
  };
});
