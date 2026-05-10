import { LegalPage } from "@/components/marketing/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cookies",
  description: "AMAMBRA cookie and consent policy.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      intro="Consent structure for analytics, marketing, and essential ecommerce cookies."
      sections={[
        {
          title: "Essential cookies",
          body: "Required for cart persistence, checkout security, account sessions, and fraud prevention.",
        },
        {
          title: "Analytics cookies",
          body: "Analytics should load only after consent. The codebase includes a structure for consent-aware analytics integration.",
        },
        {
          title: "Marketing cookies",
          body: "Marketing pixels and retargeting tags should remain disabled until explicit consent is granted.",
        },
      ]}
    />
  );
}
