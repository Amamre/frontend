import { MOCK_COLLECTIONS, MOCK_PRODUCTS } from "@/data/products";
import type { Collection, Product, ProductFilter, ProductSort } from "@/types";

export const getAllProducts = (): Product[] => MOCK_PRODUCTS;

export const getFeaturedProducts = (limit = 4): Product[] =>
  MOCK_PRODUCTS.filter((product) => product.featured).slice(0, limit);

export const getProductBySlug = (slug: string): Product | undefined =>
  MOCK_PRODUCTS.find((product) => product.slug === slug);

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  const sameCollection = MOCK_PRODUCTS.filter(
    (candidate) =>
      candidate.id !== product.id &&
      (candidate.collection === product.collection ||
        candidate.category === product.category),
  );

  return sameCollection.slice(0, limit);
};

export const getAllCollections = (): Collection[] => MOCK_COLLECTIONS;

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  MOCK_COLLECTIONS.find((collection) => collection.slug === slug);

export const normalizeParam = (
  value: string | string[] | undefined,
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export const parseSort = (value: string | undefined): ProductSort => {
  const allowed: ProductSort[] = [
    "featured",
    "newest",
    "price-low",
    "price-high",
    "popular",
    "rating",
  ];

  return allowed.includes(value as ProductSort)
    ? (value as ProductSort)
    : "featured";
};

export const filterProducts = (
  products: Product[],
  filters: ProductFilter,
): Product[] => {
  const query = filters.query?.trim().toLowerCase();
  let result = [...products];

  if (query) {
    result = result.filter((product) => {
      const searchable = [
        product.title,
        product.description,
        product.longDescription,
        product.category,
        product.collection,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }

  if (filters.categories?.length) {
    result = result.filter((product) =>
      filters.categories?.includes(product.category),
    );
  }

  if (filters.collections?.length) {
    result = result.filter((product) =>
      filters.collections?.includes(product.collection),
    );
  }

  if (filters.colors?.length) {
    result = result.filter((product) =>
      product.colors.some((color) => filters.colors?.includes(color.name)),
    );
  }

  if (filters.sizes?.length) {
    result = result.filter((product) =>
      product.sizes.some((size) => filters.sizes?.includes(size)),
    );
  }

  if (filters.priceRange) {
    const { max, min } = filters.priceRange;
    result = result.filter(
      (product) => product.price >= min && product.price <= max,
    );
  }

  if (filters.inStock) {
    result = result.filter((product) => product.inStock);
  }

  return sortProducts(result, filters.sortBy ?? "featured");
};

export const sortProducts = (
  products: Product[],
  sortBy: ProductSort,
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "popular":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "featured":
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    default:
      return sorted;
  }
};
