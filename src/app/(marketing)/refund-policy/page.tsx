import { LegalPage } from "@/components/marketing/LegalPage";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.refundPolicyDescription",
    path: "/refund-policy",
    titleKey: "pages.refundPolicyTitle",
  });
}

export default async function RefundPolicyPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("legal.refundPolicyTitle")}
      intro={t("legal.refundPolicyIntro")}
      tocLabel={common("labels.onThisPage")}
      sections={[
        {
          title: t("legal.returnEligibility"),
          body: t("legal.returnEligibilityBody"),
        },
        {
          title: t("legal.refundTiming"),
          body: t("legal.refundTimingBody"),
        },
        {
          title: t("legal.exchangesStoreCredit"),
          body: t("legal.exchangesStoreCreditBody"),
        },
        {
          title: t("legal.damagedIncorrect"),
          body: t("legal.damagedIncorrectBody"),
        },
        {
          title: t("legal.withdrawalReturns"),
          body: t("legal.withdrawalReturnsBody"),
        },
      ]}
    />
  );
}
