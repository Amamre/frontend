import type { Metadata } from "next";
import { BRAND, SEO_DEFAULTS, SITE_URL } from "@/constants/config";
import { type Locale } from "@/i18n/locales";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  locale?: Locale;
  noIndex?: boolean;
  ogImageAlt?: string;
};

export const absoluteUrl = (path: string): string => {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const createMetadata = ({
  title,
  description = SEO_DEFAULTS.description,
  path = "/",
  image = SEO_DEFAULTS.ogImage,
  keywords = SEO_DEFAULTS.keywords,
  locale = "en-US",
  noIndex = false,
  ogImageAlt,
}: MetadataInput = {}): Metadata => {
  const resolvedTitle = title ? `${title} | ${BRAND.name}` : SEO_DEFAULTS.title;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName: BRAND.name,
      images: [
        {
          url: imageUrl,
          width: 1792,
          height: 1024,
          alt: ogImageAlt ?? `${BRAND.name} editorial campaign`,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
};
