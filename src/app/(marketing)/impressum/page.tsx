import { LegalPage } from "@/components/marketing/LegalPage";
import { BRAND } from "@/constants/config";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Impressum",
  description: "Legal disclosure for AMAMRE in Germany.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      intro="German legal disclosure placeholder for production completion."
      sections={[
        {
          title: "Provider",
          body: `${BRAND.name}, ${BRAND.address}. Replace this placeholder with the registered legal entity, managing director, registration court, VAT ID, and responsible contact before launch.`,
        },
        {
          title: "Contact",
          body: `Email: ${BRAND.email}. Phone: ${BRAND.phone}.`,
        },
        {
          title: "Editorial responsibility",
          body: "Name and address of the person responsible under German press law must be added before public launch.",
        },
      ]}
    />
  );
}
