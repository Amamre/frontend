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
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { filterProducts } from "@/lib/catalog";
import type { Product, ProductFilter, ProductSort } from "@/types";

export function ShopClient({
  products,
  initialFilter,
}: {
  products: Product[];
  initialFilter: ProductFilter;
}) {
  const common = useTypedTranslations("common");
  const shop = useTypedTranslations("shop");
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
            <Eyebrow>{shop("eyebrow")}</Eyebrow>
            <Headline>{shop("headline")}</Headline>
          </Box>
          <Subhead>
            {common("counts.piecesAcross", { count: filtered.length })}
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
            <TuneIcon fontSize="small" /> {shop("filters.button")}
          </AppButton>
          <Box component="label" sx={{ minWidth: 220 }}>
            <Eyebrow sx={{ display: "block", mb: 1 }}>
              {shop("filters.sort")}
            </Eyebrow>
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
                  {sortLabel(common, option.value)}
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
                    {shop("empty.headline")}
                  </Typography>
                  <BodyCopy>{shop("empty.body")}</BodyCopy>
                  <AppButton
                    onClick={() => setFilters({ sortBy: "featured" })}
                    type="button"
                    variant="primary"
                  >
                    {shop("empty.reset")}
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
  const common = useTypedTranslations("common");
  const shop = useTypedTranslations("shop");
  const catalog = useTypedTranslations("catalog");
  const controlLabelSx = {
    m: 0,
    color: theme.palette.text.secondary,
    "& .MuiFormControlLabel-label": { fontSize: "0.9rem" },
  };

  return (
    <Stack spacing={3.25}>
      <Stack spacing={1.5}>
        <FieldTitle>{shop("filters.sortBy")}</FieldTitle>
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
            label={sortLabel(common, option.value)}
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <Stack spacing={1.5}>
        <FieldTitle>{shop("filters.category")}</FieldTitle>
        {CATEGORIES.map((category) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.categories?.includes(category.id) ?? false}
                onChange={() => onToggle("categories", category.id)}
              />
            }
            key={category.id}
            label={categoryLabel(common, category.id)}
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <Stack spacing={1.5}>
        <FieldTitle>{shop("filters.collection")}</FieldTitle>
        {COLLECTIONS.map((collection) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.collections?.includes(collection.id) ?? false}
                onChange={() => onToggle("collections", collection.id)}
              />
            }
            key={collection.id}
            label={collectionLabel(catalog, collection.id)}
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <Stack spacing={1.5}>
        <FieldTitle>{shop("filters.color")}</FieldTitle>
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
                {colorLabel(common, color.name)}
              </Stack>
            }
            sx={controlLabelSx}
          />
        ))}
      </Stack>

      <AppButton fullWidth onClick={onReset} type="button">
        {common("actions.clearFilters")}
      </AppButton>
    </Stack>
  );
}

function sortLabel(
  t: ReturnType<typeof useTypedTranslations<"common">>,
  value: ProductSort,
) {
  const keys = {
    featured: "sort.featured",
    newest: "sort.newest",
    popular: "sort.popular",
    "price-low": "sort.priceLow",
    "price-high": "sort.priceHigh",
    rating: "sort.rating",
  } as const;

  return t(keys[value]);
}

function colorLabel(
  t: ReturnType<typeof useTypedTranslations<"common">>,
  name: string,
) {
  const keys: Record<string, Parameters<typeof t>[0]> = {
    "Obsidian Black": "colors.obsidianBlack",
    "Deep Olive": "colors.deepOlive",
    "Soft Ivory": "colors.softIvory",
    "Dark Cocoa": "colors.darkCocoa",
    "Muted Gold": "colors.mutedGold",
    "Muted Warm Gold": "colors.mutedWarmGold",
  };

  return keys[name] ? t(keys[name]) : name;
}

function categoryLabel(
  t: ReturnType<typeof useTypedTranslations<"common">>,
  id: string,
) {
  const keys: Record<string, Parameters<typeof t>[0]> = {
    accessories: "categories.accessories",
    hoodies: "categories.hoodies",
    sets: "categories.sets",
    tops: "categories.tops",
  };

  return keys[id] ? t(keys[id]) : id;
}

function collectionLabel(
  t: ReturnType<typeof useTypedTranslations<"catalog">>,
  id: string,
) {
  const keys: Record<string, Parameters<typeof t>[0]> = {
    atelier: "collections.atelier.shortTitle",
    essentials: "collections.essentials.shortTitle",
    heritage: "collections.heritage.shortTitle",
    signature: "collections.signature.shortTitle",
  };

  return keys[id] ? t(keys[id]) : id;
}
