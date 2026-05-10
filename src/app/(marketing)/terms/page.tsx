import { LegalPage } from "@/components/marketing/LegalPage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms",
  description: "AMAMBRA terms and conditions.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      intro="Production terms should be reviewed by German ecommerce counsel before launch."
      sections={[
        {
          title: "Scope",
          body: "These terms apply to purchases made through the AMAMBRA online store once checkout is live.",
        },
        {
          title: "Prices and payment",
          body: "All prices are displayed in EUR and should include German VAT where applicable. Shopify Checkout handles payment authorization and fraud controls.",
        },
        {
          title: "Withdrawal and returns",
          body: "EU consumers have statutory withdrawal rights. The launch recommendation is to provide a clear 14-day withdrawal notice plus a customer-friendly 30-day return window.",
        },
      ]}
    />
  );
}
