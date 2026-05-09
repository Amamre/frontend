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

  const raw = window.localStorage.getItem("amamre-consent");

  if (!raw) {
    return defaultConsent;
  }

  try {
    return { ...defaultConsent, ...JSON.parse(raw) };
  } catch {
    return defaultConsent;
  }
};

export const trackEvent = (event: AnalyticsEvent): void => {
  const consent = getConsentState();

  if (!consent.analytics) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("amamre:analytics", {
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
