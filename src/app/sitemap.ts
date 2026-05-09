import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/config";
import { getAllCollections, getAllProducts } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/faq",
    "/contact",
    "/shipping-returns",
    "/size-guide",
    "/impressum",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const productRoutes = getAllProducts().map(
    (product) => `/product/${product.slug}`,
  );
  const collectionRoutes = getAllCollections().map(
    (collection) => `/collections/${collection.slug}`,
  );

  return [...staticRoutes, ...productRoutes, ...collectionRoutes].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date("2026-05-08T00:00:00.000Z"),
      changeFrequency: route.includes("/product") ? "weekly" : "monthly",
      priority: route === "" ? 1 : route.includes("/product") ? 0.8 : 0.7,
    }),
  );
}
