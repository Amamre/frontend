import { LegalPage } from "@/components/marketing/LegalPage";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.privacyDescription",
    path: "/privacy",
    titleKey: "pages.privacyTitle",
  });
}

export default async function PrivacyPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("legal.privacyTitle")}
      intro={t("legal.privacyIntro")}
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
          title: t("legal.customerRights"),
          body: t("legal.customerRightsBody"),
        },
      ]}
    />
  );
}
