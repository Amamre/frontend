import { LegalPage } from "@/components/marketing/LegalPage";
import { BRAND } from "@/constants/config";
import { getTypedTranslations } from "@/i18n/getTypedTranslations";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.impressumDescription",
    path: "/impressum",
    titleKey: "pages.impressumTitle",
  });
}

export default async function ImpressumPage() {
  const common = await getTypedTranslations("common");
  const t = await getTypedTranslations("marketing");

  return (
    <LegalPage
      eyebrow={common("brand.name")}
      title={t("legal.impressumTitle")}
      intro={t("legal.impressumIntro")}
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
      ]}
    />
  );
}
