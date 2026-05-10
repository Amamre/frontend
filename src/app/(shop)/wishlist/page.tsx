import { WishlistClient } from "@/components/shop/WishlistClient";
import { createLocalizedMetadata } from "@/lib/localized-seo";

export async function generateMetadata() {
  return createLocalizedMetadata({
    descriptionKey: "pages.wishlistDescription",
    noIndex: true,
    path: "/wishlist",
    titleKey: "pages.wishlistTitle",
  });
}

export default function WishlistPage() {
  return <WishlistClient />;
}
