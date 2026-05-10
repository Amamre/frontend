import { LegalPage } from "@/components/marketing/LegalPage";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.cookiesDescription",
    path: "/cookies",
    titleKey: "pages.cookiesTitle",
  });
}

export default async function CookiesPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("cookies");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("page.title")}
      intro={t("page.intro")}
      tocLabel={common("labels.onThisPage")}
      sections={[
        {
          title: t("page.essentialTitle"),
          body: t("page.essentialBody"),
        },
        {
          title: t("page.analyticsTitle"),
          body: t("page.analyticsBody"),
        },
        {
          title: t("page.marketingTitle"),
          body: t("page.marketingBody"),
        },
        {
          title: t("page.preferencesTitle"),
          body: t("page.preferencesBody"),
        },
      ]}
    />
  );
}
