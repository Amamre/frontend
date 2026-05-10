import { CartClient } from "@/components/cart/CartClient";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.cartDescription",
    noIndex: true,
    path: "/cart",
    titleKey: "pages.cartTitle",
  });
}

export default function CartPage() {
  return <CartClient />;
}
