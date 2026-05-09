import { CartClient } from "@/components/cart/CartClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Cart",
  description: "Review your AMAMRE shopping bag and continue to checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartClient />;
}
