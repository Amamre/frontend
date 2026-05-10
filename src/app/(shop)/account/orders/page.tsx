import {
  AppButton,
  BodyCopy,
  EmptyState,
  Eyebrow,
  Headline,
} from "@/components/ui/Primitives";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Orders",
  description: "AMAMBRA customer order history.",
  path: "/account/orders",
  noIndex: true,
});

export default function OrdersPage() {
  return (
    <EmptyState>
      <div>
        <Eyebrow>Orders</Eyebrow>
        <Headline>Order history connects here.</Headline>
        <BodyCopy>
          Production should connect Shopify Customer Accounts or a secure
          account provider before exposing customer order data.
        </BodyCopy>
        <AppButton href="/shop" variant="primary">
          Shop AMAMBRA
        </AppButton>
      </div>
    </EmptyState>
  );
}
