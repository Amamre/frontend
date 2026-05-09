"use client";

import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import {
  AppContainer,
  Eyebrow,
  FieldTitle,
  Headline,
  IconAction,
  PageSection,
  ProductGrid,
  SectionHeading,
} from "@/components/ui/Primitives";
import { filterProducts } from "@/lib/catalog";
import type { Product } from "@/types";

export function SearchClient({
  products,
  initialQuery = "",
}: {
  products: Product[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(
    () =>
      filterProducts(products, {
        query,
        sortBy: "popular",
      }),
    [products, query],
  );

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Search</Eyebrow>
            <Headline>Find your AMAMRE piece</Headline>
          </Box>
        </SectionHeading>

        <Box component="label" sx={{ display: "block", mb: 3.5 }}>
          <FieldTitle>Search products</FieldTitle>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 1.25 }}
          >
            <TextField
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Hoodie, beanie, satin, heritage"
              type="search"
              value={query}
            />
            <IconAction type="button" aria-label="Search">
              <SearchIcon fontSize="small" />
            </IconAction>
          </Box>
        </Box>

        <ProductGrid>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </AppContainer>
    </PageSection>
  );
}
