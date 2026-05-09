import { CheckoutClient } from "@/components/checkout/CheckoutClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Checkout",
  description: "AMAMRE checkout profile and Shopify checkout handoff.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
