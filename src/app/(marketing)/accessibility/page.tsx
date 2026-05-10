import { LegalPage } from "@/components/marketing/LegalPage";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.accessibilityDescription",
    path: "/accessibility",
    titleKey: "pages.accessibilityTitle",
  });
}

export default async function AccessibilityPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("legal.accessibilityTitle")}
      intro={t("legal.accessibilityIntro")}
      tocLabel={common("labels.onThisPage")}
      sections={[
        {
          title: t("legal.accessibilityStandards"),
          body: t("legal.accessibilityStandardsBody"),
        },
        {
          title: t("legal.keyboardMotion"),
          body: t("legal.keyboardMotionBody"),
        },
        {
          title: t("legal.accessibilitySupport"),
          body: t("legal.accessibilitySupportBody"),
        },
        {
          title: t("legal.knownLimitations"),
          body: t("legal.knownLimitationsBody"),
        },
      ]}
    />
  );
}
