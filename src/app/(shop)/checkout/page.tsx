import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.checkoutDescription",
    noIndex: true,
    path: "/checkout",
    titleKey: "pages.checkoutTitle",
  });
}

export default function CheckoutPage() {
  return <CheckoutClient />;
}
