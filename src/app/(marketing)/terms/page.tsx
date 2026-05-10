import { LegalPage } from "@/components/marketing/LegalPage";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.termsDescription",
    path: "/terms",
    titleKey: "pages.termsTitle",
  });
}

export default async function TermsPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("legal.termsTitle")}
      intro={t("legal.termsIntro")}
      tocLabel={common("labels.onThisPage")}
      sections={[
        {
          title: t("legal.scope"),
          body: t("legal.scopeBody"),
        },
        {
          title: t("legal.pricesPayment"),
          body: t("legal.pricesPaymentBody"),
        },
        {
          title: t("legal.withdrawalReturns"),
          body: t("legal.withdrawalReturnsBody"),
        },
      ]}
    />
  );
}
