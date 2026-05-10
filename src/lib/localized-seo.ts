import { getLocale } from "next-intl/server";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import type { Locale } from "@/i18n/locales";
import { createMetadata } from "@/lib/seo";

type LocalizedMetadataInput = {
  descriptionKey?: Parameters<
    Awaited<ReturnType<typeof getTypedTranslations<"metadata">>>
  >[0];
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  path?: string;
  titleKey?: Parameters<
    Awaited<ReturnType<typeof getTypedTranslations<"metadata">>>
  >[0];
};

export async function createLocalizedMetadata({
  descriptionKey = "defaults.description",
  image,
  keywords,
  noIndex,
  path,
  titleKey,
}: LocalizedMetadataInput = {}) {
  const locale = (await getLocale()) as Locale;
  const metadata = await getTypedTranslations("metadata");
  const title =
    titleKey === "defaults.title" || !titleKey ? undefined : metadata(titleKey);

  return createMetadata({
    description: metadata(descriptionKey),
    image,
    keywords:
      keywords ??
      metadata("defaults.keywords")
        .split(",")
        .map((item) => item.trim()),
    locale,
    noIndex,
    ogImageAlt: metadata("defaults.ogAlt"),
    path,
    title,
  });
}
