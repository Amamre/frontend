import { WishlistClient } from "@/components/shop/WishlistClient";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Wishlist",
  description: "Saved AMAMRE pieces.",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistPage() {
  return <WishlistClient />;
}
