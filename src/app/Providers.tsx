"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AbstractIntlMessages, Timezone } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { CookieConsentProvider } from "@/components/common/luxury-cookie-consent";
import type { Locale } from "@/i18n/locales";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { theme } from "@/styles/theme";

type ProvidersProps = {
  children: React.ReactNode;
  locale: Locale;
  messages: AbstractIntlMessages;
  timeZone: Timezone;
  now: Date;
};

export default function Providers({
  children,
  locale,
  messages,
  timeZone,
  now,
}: ProvidersProps) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NextIntlClientProvider
        timeZone={timeZone}
        locale={locale}
        messages={messages}
        now={now}
      >
        <CookieConsentProvider>
          <CssBaseline />
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2600,
              style: {
                border: "1px solid rgba(250, 248, 241, 0.12)",
                borderRadius: "8px",
                color: "#faf8f1",
                background: "rgba(17, 16, 14, 0.96)",
              },
            }}
          />
        </CookieConsentProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
