import { readCookieConsent } from "@/lib/consent";
import type { AnalyticsEvent, PageViewEvent } from "@/types";

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
};

const defaultConsent: ConsentState = {
  analytics: false,
  marketing: false,
};

export const getConsentState = (): ConsentState => {
  if (typeof window === "undefined") {
    return defaultConsent;
  }

  const consent = readCookieConsent();

  if (!consent) {
    return defaultConsent;
  }

  return {
    analytics: consent.categories.analytics,
    marketing: consent.categories.marketing,
  };
};

export const trackEvent = (event: AnalyticsEvent): void => {
  const consent = getConsentState();

  if (!consent.analytics) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("amambra:analytics", {
      detail: event,
    }),
  );
};

export const trackPageView = (
  properties: PageViewEvent["properties"],
): void => {
  trackEvent({
    event: "page_view",
    properties,
    timestamp: new Date().toISOString(),
  });
};
