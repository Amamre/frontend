import { LegalPage } from "@/components/marketing/LegalPage";
import { BRAND } from "@/constants/config";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.imprintDescription",
    path: "/imprint",
    titleKey: "pages.imprintTitle",
  });
}

export default async function ImprintPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("legal.imprintTitle")}
      intro={t("legal.imprintIntro")}
      tocLabel={common("labels.onThisPage")}
      sections={[
        {
          title: t("legal.provider"),
          body: t("legal.providerBody", {
            address: common("brand.address"),
            brand: common("brand.name"),
          }),
        },
        {
          title: t("legal.commercialRegistration"),
          body: t("legal.commercialRegistrationBody"),
        },
        {
          title: common("labels.contact"),
          body: t("legal.contactBody", {
            email: BRAND.email,
            phone: BRAND.phone,
          }),
        },
        {
          title: t("legal.editorialResponsibility"),
          body: t("legal.editorialResponsibilityBody"),
        },
        {
          title: t("legal.consumerDispute"),
          body: t("legal.consumerDisputeBody"),
        },
      ]}
    />
  );
}
