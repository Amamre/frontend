import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/cart", "/checkout", "/wishlist"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
