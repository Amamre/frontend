import type { Metadata, Viewport } from "next";
import { getLocale, getMessages, getNow, getTimeZone } from "next-intl/server";
import "./globals.css";
import Providers from "@/app/Providers";
import { AtelierMarquee } from "@/components/layout/atelier-marquee";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StructuredData } from "@/components/seo/StructuredData";
import { MainShell } from "@/components/ui/Primitives";
import { BRAND_META } from "@/constants/config";
import type { Locale } from "@/i18n/locales";
import { createLocalizedMetadata } from "@/lib/localized-seo";
import { createOrganizationSchema } from "@/lib/structured-data";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export async function generateMetadata(): Promise<Metadata> {
  return createLocalizedMetadata({ titleKey: "defaults.title" });
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: BRAND_META.themeColor,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();
  const timeZone = await getTimeZone();
  const now = await getNow();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <SpeedInsights />
        <Analytics />
        <StructuredData data={createOrganizationSchema()} />
        <Providers
          now={now}
          timeZone={timeZone}
          locale={locale}
          messages={messages}
        >
          <AtelierMarquee />
          <Header />
          <MainShell>{children}</MainShell>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
