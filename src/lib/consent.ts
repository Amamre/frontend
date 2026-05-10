import { GDPR_SETTINGS } from "@/constants/config";

export const COOKIE_CONSENT_KEY = "amambra-consent";
export const COOKIE_CONSENT_VERSION = 2;
export const COOKIE_CONSENT_CATEGORIES = [
  "essential",
  "analytics",
  "marketing",
  "preferences",
] as const;

export type CookieConsentCategory = (typeof COOKIE_CONSENT_CATEGORIES)[number];

export type CookieConsentCategories = Record<CookieConsentCategory, boolean> & {
  essential: true;
};

export type StoredCookieConsent = {
  categories: CookieConsentCategories;
  expiresAt: string;
  updatedAt: string;
  version: number;
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const defaultCategories: CookieConsentCategories = {
  analytics: false,
  essential: true,
  marketing: false,
  preferences: false,
};

export function createCookieConsent(
  categories: Partial<CookieConsentCategories> = {},
): StoredCookieConsent {
  const updatedAt = new Date();
  const expiresAt = new Date(
    updatedAt.getTime() + GDPR_SETTINGS.consentExpiryDays * DAY_IN_MS,
  );

  return {
    categories: {
      ...defaultCategories,
      ...categories,
      essential: true,
    },
    expiresAt: expiresAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    version: COOKIE_CONSENT_VERSION,
  };
}

export function readCookieConsent(): StoredCookieConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = readLocalStorageValue() ?? readCookieValue();
  const consent = normalizeCookieConsent(raw);

  if (!consent) {
    clearCookieConsent();
  }

  return consent;
}

export function writeCookieConsent(consent: StoredCookieConsent): void {
  if (typeof window === "undefined") {
    return;
  }

  const serialized = JSON.stringify(consent);

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, serialized);
  } catch {
    // Cookie fallback keeps the preference available if localStorage is blocked.
  }

  try {
    const maxAge = Math.max(
      0,
      Math.floor((new Date(consent.expiresAt).getTime() - Date.now()) / 1000),
    );
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    // biome-ignore lint/suspicious/noDocumentCookie: consent is intentionally mirrored to a first-party cookie for future server-adjacent integrations.
    document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(
      serialized,
    )}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
  } catch {
    // Storage failure should not block the UI from closing for the session.
  }

  window.dispatchEvent(new CustomEvent("amambra:consent", { detail: consent }));
}

export function clearCookieConsent(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    // Ignore storage cleanup failures.
  }

  try {
    // biome-ignore lint/suspicious/noDocumentCookie: cleanup must expire the first-party consent cookie when preferences become invalid.
    document.cookie = `${COOKIE_CONSENT_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
  } catch {
    // Ignore cookie cleanup failures.
  }
}

export function hasCookieConsent(category: CookieConsentCategory): boolean {
  return readCookieConsent()?.categories[category] ?? category === "essential";
}

export function normalizeCookieConsent(
  raw: string | StoredCookieConsent | null | undefined,
): StoredCookieConsent | null {
  if (!raw) {
    return null;
  }

  const parsed = typeof raw === "string" ? parseJson(raw) : raw;

  if (!isRecord(parsed)) {
    return null;
  }

  const expiresAt =
    typeof parsed.expiresAt === "string" ? parsed.expiresAt : undefined;
  const expiresTime = expiresAt ? new Date(expiresAt).getTime() : Number.NaN;

  if (
    !expiresAt ||
    !Number.isFinite(expiresTime) ||
    expiresTime <= Date.now()
  ) {
    return null;
  }

  const rawCategories = isRecord(parsed.categories)
    ? parsed.categories
    : parsed;

  const categories: CookieConsentCategories = {
    analytics: readBoolean(rawCategories.analytics),
    essential: true,
    marketing: readBoolean(rawCategories.marketing),
    preferences: readBoolean(rawCategories.preferences),
  };

  return {
    categories,
    expiresAt,
    updatedAt:
      typeof parsed.updatedAt === "string"
        ? parsed.updatedAt
        : new Date().toISOString(),
    version:
      typeof parsed.version === "number"
        ? parsed.version
        : COOKIE_CONSENT_VERSION,
  };
}

function readLocalStorageValue(): string | null {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

function readCookieValue(): string | null {
  const consentCookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_CONSENT_KEY}=`));

  if (!consentCookie) {
    return null;
  }

  return decodeURIComponent(consentCookie.split("=").slice(1).join("="));
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readBoolean(value: unknown): boolean {
  return typeof value === "boolean" ? value : false;
}
