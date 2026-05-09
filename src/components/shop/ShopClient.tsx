"use client";

import TuneIcon from "@mui/icons-material/Tune";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import {
  AppButton,
  AppContainer,
  BodyCopy,
  Eyebrow,
  FieldTitle,
  Headline,
  PageSection,
  ProductGrid,
  SectionHeading,
  Subhead,
  Surface,
  Swatch,
} from "@/components/ui/Primitives";
import { CATEGORIES, COLLECTIONS, FILTER_OPTIONS } from "@/constants/config";
import { filterProducts } from "@/lib/catalog";
import type { Product, ProductFilter, ProductSort } from "@/types";

export function ShopClient({
  products,
  initialFilter,
}: {
  products: Product[];
  initialFilter: ProductFilter;
}) {
  const [filters, setFilters] = useState<ProductFilter>(initialFilter);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filtered = useMemo(
    () => filterProducts(products, filters),
    [filters, products],
  );

  const toggleArrayFilter = (
    key: "categories" | "collections" | "colors" | "sizes",
    value: string,
  ) => {
    setFilters((current) => {
      const selected = current[key] ?? [];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return {
        ...current,
        [key]: next.length > 0 ? next : undefined,
      };
    });
  };

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onReset={() => setFilters({ sortBy: "featured" })}
      onSort={(sortBy) => setFilters((current) => ({ ...current, sortBy }))}
      onToggle={toggleArrayFilter}
    />
  );

  return (
    <PageSection>
      <AppContainer>
        <SectionHeading>
          <Box>
            <Eyebrow>Shop</Eyebrow>
            <Headline>Launch collection</Headline>
          </Box>
          <Subhead>
            {filtered.length} pieces across satin-lined essentials, heritage
            sets, atelier layers, and accessories.
          </Subhead>
        </SectionHeading>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.75,
          }}
        >
          <AppButton
            onClick={() => setMobileFiltersOpen((value) => !value)}
            type="button"
          >
            <TuneIcon fontSize="small" /> Filters
          </AppButton>
          <Box component="label" sx={{ minWidth: 220 }}>
            <Eyebrow sx={{ display: "block", mb: 1 }}>Sort</Eyebrow>
            <Select
              fullWidth
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  sortBy: event.target.value as ProductSort,
                }))
              }
              value={filters.sortBy ?? "featured"}
            >
              {FILTER_OPTIONS.sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>

        {mobileFiltersOpen ? (
          <Surface sx={{ mb: 2.5 }}>{filterPanel}</Surface>
        ) : null}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
            gap: 4,
            alignItems: "start",
          }}
        >
          <Surface
            sx={{
              position: { xs: "static", md: "sticky" },
              top: "calc(var(--header-height) + 20px)",
              display: "grid",
              gap: 3.25,
              boxShadow: "none",
            }}
          >
            {filterPanel}
          </Surface>
          <Box>
            {filtered.length > 0 ? (
              <ProductGrid>
                {filtered.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    priority={index < 2}
                    product={product}
                  />
                ))}
              </ProductGrid>
            ) : (
              <Surface
                sx={{
                  display: "grid",
                  minHeight: 420,
                  placeItems: "center",
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography component="h2">
                    No pieces match those filters.
                  </Typography>
                  <BodyCopy>
                    Reset filters or search across the full launch collection.
                  </BodyCopy>
                  <AppButton
                    onClick={() => setFilters({ sortBy: "featured" })}
                    type="button"
                    variant="primary"
                  >
                    Reset filters
                  </AppButton>
                </Box>
              </Surface>
            )}
          </Box>
        </Box>
      </AppContainer>
    </PageSection>
  );
}

function FilterPanel({
  filters,
  onReset,
  onSort,
  onToggle,
}: {
  filters: ProductFilter;
  onReset: () => void;
  onSort: (sortBy: ProductSort) => void;
  onToggle: (
    key: "categories" | "collections" | "colors" | "sizes",
    value: string,
  ) => void;
}) {
  const theme = useTheme();
  const controlLabelSx = {
    m: 0,
    color: theme.palette.text.secondary,
    "& .MuiFormControlLabel-label": { fontSize: "0.9rem" },
  };

  return (
    <Stack spacing={3.25}>
      <Stack spacing={1.5}>
        <FieldTitle>Sort by</FieldTitle>
        {FILTER_OPTIONS.sortOptions.map((option) => (
          <FormControlLabel
            control={
              <Radio
                checked={(filters.sortBy ?? "featured") === option.value}
                name="sort"
                onChange={() => onSort(option.value)}
              />
            }
            key={option.value}
            label={option.label}
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <Stack spacing={1.5}>
        <FieldTitle>Category</FieldTitle>
        {CATEGORIES.map((category) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.categories?.includes(category.id) ?? false}
                onChange={() => onToggle("categories", category.id)}
              />
            }
            key={category.id}
            label={category.name}
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <Stack spacing={1.5}>
        <FieldTitle>Collection</FieldTitle>
        {COLLECTIONS.map((collection) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.collections?.includes(collection.id) ?? false}
                onChange={() => onToggle("collections", collection.id)}
              />
            }
            key={collection.id}
            label={collection.name}
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <Stack spacing={1.5}>
        <FieldTitle>Color</FieldTitle>
        {FILTER_OPTIONS.colors.map((color) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.colors?.includes(color.name) ?? false}
                onChange={() => onToggle("colors", color.name)}
              />
            }
            key={color.name}
            label={
              <Stack
                direction="row"
                spacing={1.25}
                sx={{ alignItems: "center" }}
              >
                <Swatch aria-hidden="true" color={color.code} />
                {color.name}
              </Stack>
            }
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <AppButton fullWidth onClick={onReset} type="button">
        Clear filters
      </AppButton>
    </Stack>
  );
}
