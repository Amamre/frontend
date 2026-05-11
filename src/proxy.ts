import { LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME, LOCALE_COOKIE_PATH } from "@/constants/cookie";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/locales";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function detectLocale(header: string | null): Locale {
  if (!header) {
    return DEFAULT_LOCALE;
  }

  const languages = header
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const language of languages) {
    if (language === "de" || language.startsWith("de-")) {
      return "de";
    }

    if (language === "en" || language.startsWith("en-")) {
      return "en";
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * Edge proxy for route protection.
 *
 * Replaces legacy middleware.ts in newer setups.
 *
 * Responsibilities:
 * - Fast auth check (cookie presence)
 * - Early redirect (before rendering)
 *
 * IMPORTANT:
 * - This is NOT a security layer
 * - Backend + SSR remain the source of truth
 */
export function proxy(req: NextRequest): NextResponse {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  const cookieLocale = req.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (!cookieLocale) {
    const header = req.headers.get("accept-language");
    const locale = detectLocale(header);
    // const pathLocale = pathname.split("/")[1];

    // console.log("-----------");
    // console.log("Path:", pathname);
    // console.log("URL locale:", pathLocale);
    // console.log("Cookie locale:", cookieLocale);
    // console.log("Accept-Language:", header);
    // console.log("-----------");

    // console.log("Detected locale:", locale);

    res.cookies.set(LOCALE_COOKIE_NAME, locale, {
      path: LOCALE_COOKIE_PATH,
      maxAge: LOCALE_COOKIE_MAX_AGE,
    });
  }

  /**
   * Define protected routes
   */
  const isProtectedRoute =
    pathname.startsWith("/event") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/scan") ||
    pathname.startsWith("/me");

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return res;
  }

  if (!isProtectedRoute) {
    return res;
  }

  /**
   * Read auth cookie (set by your GraphQL gateway / Keycloak flow)
   */
  const accessToken = req.cookies.get("access_token")?.value;

  /**
   * If no cookie → redirect to login
   */
  if (!accessToken) {
    const loginUrl = new URL("/login", req.url);

    /**
     * Preserve redirect target
     */
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  /**
   * Continue request
   */
  return res;
}

/**
 * Route matcher configuration.
 *
 */
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
