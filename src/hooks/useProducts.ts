"use client";

import { useCallback, useEffect, useState } from "react";
import { MOCK_PRODUCTS } from "@/data/products";
import type { Product, ProductFilter } from "@/types";

export const useProducts = (initialFilter?: ProductFilter) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [filtered, setFiltered] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<ProductFilter>(initialFilter || {});

  const applyFilter = useCallback(
    (filterParams: ProductFilter) => {
      setFilter(filterParams);
      setLoading(true);

      // Simulate API delay
      const timeout = setTimeout(() => {
        let result = [...products];

        // Category filter
        if (filterParams.categories && filterParams.categories.length > 0) {
          result = result.filter((p) =>
            filterParams.categories?.includes(p.category),
          );
        }

        // Color filter
        if (filterParams.colors && filterParams.colors.length > 0) {
          result = result.filter((p) =>
            p.colors.some((c) => filterParams.colors?.includes(c.name)),
          );
        }

        // Size filter
        if (filterParams.sizes && filterParams.sizes.length > 0) {
          result = result.filter((p) =>
            filterParams.sizes?.some((s) => p.sizes.includes(s)),
          );
        }

        // Price range filter
        if (filterParams.priceRange) {
          const { max, min } = filterParams.priceRange;
          result = result.filter((p) => p.price >= min && p.price <= max);
        }

        // In stock filter
        if (filterParams.inStock) {
          result = result.filter((p) => p.inStock);
        }

        // Sort
        if (filterParams.sortBy) {
          switch (filterParams.sortBy) {
            case "newest":
              result.sort(
                (a, b) =>
                  new Date(b.publishedAt).getTime() -
                  new Date(a.publishedAt).getTime(),
              );
              break;
            case "price-low":
              result.sort((a, b) => a.price - b.price);
              break;
            case "price-high":
              result.sort((a, b) => b.price - a.price);
              break;
            case "popular":
              result.sort((a, b) => b.reviewCount - a.reviewCount);
              break;
            case "rating":
              result.sort((a, b) => b.rating - a.rating);
              break;
          }
        }

        setFiltered(result);
        setLoading(false);
      }, 300);

      return () => clearTimeout(timeout);
    },
    [products],
  );

  return {
    products: filtered,
    allProducts: products,
    filter,
    applyFilter,
    loading,
  };
};

export const useProduct = (slug: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const timeout = setTimeout(() => {
      const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
      if (found) {
        setProduct(found);
        setError(null);
      } else {
        setError("Product not found");
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [slug]);

  return { product, loading, error };
};

export const useRelatedProducts = (
  category: string,
  excludeId: string,
  limit: number = 4,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const related = MOCK_PRODUCTS.filter(
        (p) => p.category === category && p.id !== excludeId,
      ).slice(0, limit);
      setProducts(related);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [category, excludeId, limit]);

  return { products, loading };
};

export const useFeaturedProducts = (limit: number = 3) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const featured = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, limit);
      setProducts(featured);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [limit]);

  return { products, loading };
};
