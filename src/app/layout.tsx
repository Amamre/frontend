import type { Metadata, Viewport } from "next";
import Providers from "@/components/common/Providers";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MainShell } from "@/components/ui/Primitives";
import { BRAND_META } from "@/constants/config";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: BRAND_META.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <MainShell>{children}</MainShell>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
