import { LegalPage } from "@/components/marketing/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy",
  description: "AMAMBRA privacy policy and GDPR information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="GDPR-oriented privacy structure for an AMAMBRA production launch."
      sections={[
        {
          title: "Data controller",
          body: "AMAMBRA must add the final legal entity, address, and data protection contact before launch.",
        },
        {
          title: "Storefront data",
          body: "The storefront processes contact form data, newsletter consent, cart state, checkout profile data, analytics consent state, and order data once Shopify is connected.",
        },
        {
          title: "Legal basis",
          body: "Processing should be mapped to contract performance, consent, legitimate interest, and legal obligations under GDPR Articles 6 and 7.",
        },
        {
          title: "Customer rights",
          body: "Customers can request access, correction, deletion, restriction, portability, and objection. Production should connect these requests to a support workflow.",
        },
      ]}
    />
  );
}
