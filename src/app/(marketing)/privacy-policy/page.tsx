import { LegalPage } from "@/components/marketing/LegalPage";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.privacyPolicyDescription",
    path: "/privacy-policy",
    titleKey: "pages.privacyPolicyTitle",
  });
}

export default async function PrivacyPolicyPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("legal.privacyPolicyTitle")}
      intro={t("legal.privacyPolicyIntro")}
      tocLabel={common("labels.onThisPage")}
      sections={[
        {
          title: t("legal.dataController"),
          body: t("legal.dataControllerBody"),
        },
        {
          title: t("legal.storefrontData"),
          body: t("legal.storefrontDataBody"),
        },
        {
          title: t("legal.legalBasis"),
          body: t("legal.legalBasisBody"),
        },
        {
          title: t("legal.processorsTransfers"),
          body: t("legal.processorsTransfersBody"),
        },
        {
          title: t("legal.retentionSecurity"),
          body: t("legal.retentionSecurityBody"),
        },
        {
          title: t("legal.customerRights"),
          body: t("legal.customerRightsBody"),
        },
      ]}
    />
  );
}
