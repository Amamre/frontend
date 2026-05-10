import { trackEvent } from "@/lib/analytics";

type RouterNavigationType = "push" | "replace" | "traverse";

const observabilityConfig = {
  enabled: process.env.NEXT_PUBLIC_OBSERVABILITY_ENABLED === "true",
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  postHogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  postHogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  sessionReplayEnabled:
    process.env.NEXT_PUBLIC_SESSION_REPLAY_ENABLED === "true",
};

if (shouldInitializeObservability()) {
  performance.mark("amambra:app-init");

  window.addEventListener("error", (event) => {
    reportClientError(event.error, {
      message: event.message,
      source: event.filename,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportClientError(event.reason, {
      message: "Unhandled promise rejection",
    });
  });
}

export function onRouterTransitionStart(
  url: string,
  navigationType: RouterNavigationType,
) {
  if (!shouldInitializeObservability()) {
    return;
  }

  performance.mark(`amambra:navigation-start:${Date.now()}`);
  trackEvent({
    event: "navigation_start",
    properties: {
      navigationType,
      url,
    },
    timestamp: new Date().toISOString(),
  });
}

function shouldInitializeObservability(): boolean {
  return typeof window !== "undefined" && observabilityConfig.enabled;
}

function reportClientError(
  error: unknown,
  context: Record<string, unknown>,
): void {
  trackEvent({
    event: "client_error",
    properties: {
      context,
      error: serializeError(error),
      providers: {
        postHogConfigured: Boolean(observabilityConfig.postHogKey),
        postHogHostConfigured: Boolean(observabilityConfig.postHogHost),
        sentryConfigured: Boolean(observabilityConfig.sentryDsn),
        sessionReplayEnabled: observabilityConfig.sessionReplayEnabled,
      },
    },
    timestamp: new Date().toISOString(),
  });
}

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
  }

  return {
    message: typeof error === "string" ? error : "Unknown client error",
  };
}
