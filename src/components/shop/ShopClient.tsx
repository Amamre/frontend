"use client";

import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import {
  alpha,
  Box,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { motion as framerMotion, useReducedMotion } from "framer-motion";
import { type ReactNode, useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import {
  AppButton,
  AppContainer,
  BodyCopy,
  Eyebrow,
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
import { brandColors, motion, radius, transitions } from "@/styles/theme";
import type { Product, ProductFilter, ProductSort } from "@/types";

type ArrayFilterKey = "categories" | "collections" | "colors" | "sizes";

export function ShopClient({
  products,
  initialFilter,
}: {
  products: Product[];
  initialFilter: ProductFilter;
}) {
  const common = useTypedTranslations("common");
  const shop = useTypedTranslations("shop");
  const prefersReducedMotion = useReducedMotion();
  const [filters, setFilters] = useState<ProductFilter>(initialFilter);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filtered = useMemo(
    () => filterProducts(products, filters),
    [filters, products],
  );
  const activeFilters = hasActiveFilters(filters);

  const toggleArrayFilter = (key: ArrayFilterKey, value: string) => {
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

  const resetFilters = () => setFilters({ sortBy: "featured" });

  return (
    <PageSection sx={shopSectionSx}>
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

        <Box sx={shopToolbarSx}>
          <Box
            aria-expanded={mobileFiltersOpen}
            aria-label={shop("filters.button")}
            component="button"
            onClick={() => setMobileFiltersOpen(true)}
            sx={mobileFilterTriggerSx}
            type="button"
          >
            <TuneIcon sx={{ fontSize: "1rem" }} />
            <Typography component="span" sx={toolbarTextSx}>
              {shop("filters.button")}
            </Typography>
          </Box>

          <Box component="label" sx={sortShellSx}>
            <Typography component="span" sx={sortLabelSx}>
              {shop("filters.sort")}
            </Typography>
            <Select
              fullWidth
              inputProps={{ "aria-label": shop("filters.sort") }}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: sortMenuPaperSx,
                  },
                  list: {
                    sx: sortMenuListSx,
                  },
                },
              }}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  sortBy: event.target.value as ProductSort,
                }))
              }
              sx={sortSelectSx}
              value={filters.sortBy ?? "featured"}
              variant="standard"
            >
              {FILTER_OPTIONS.sortOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  sx={sortMenuItemSx}
                  value={option.value}
                >
                  {sortLabel(common, option.value)}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Drawer
          anchor="bottom"
          onClose={() => setMobileFiltersOpen(false)}
          open={mobileFiltersOpen}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.66)",
              },
            },
            paper: {
              sx: mobileFilterDrawerSx,
            },
          }}
        >
          <Box sx={mobileDrawerInnerSx}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2.6,
              }}
            >
              <Box>
                <Typography component="p" sx={filterEyebrowSx}>
                  {shop("eyebrow")}
                </Typography>
                <Typography component="h2" sx={drawerTitleSx}>
                  {shop("filters.title")}
                </Typography>
              </Box>
              <IconButton
                aria-label={shop("filters.close")}
                onClick={() => setMobileFiltersOpen(false)}
                sx={drawerCloseSx}
                type="button"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>

            <FilterPanel
              activeFilters={activeFilters}
              filters={filters}
              onReset={resetFilters}
              onSort={(sortBy) =>
                setFilters((current) => ({ ...current, sortBy }))
              }
              onToggle={toggleArrayFilter}
              variant="mobile"
            />
          </Box>
        </Drawer>

        <Box sx={shopLayoutSx}>
          <Box
            component={framerMotion.aside}
            data-testid="shop-filter-panel"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motion.framer.reveal}
            sx={desktopFilterAsideSx}
          >
            <FilterPanel
              activeFilters={activeFilters}
              filters={filters}
              onReset={resetFilters}
              onSort={(sortBy) =>
                setFilters((current) => ({ ...current, sortBy }))
              }
              onToggle={toggleArrayFilter}
              variant="desktop"
            />
          </Box>

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
              <Surface sx={emptyStateSurfaceSx}>
                <Box>
                  <Typography component="h2" sx={emptyHeadingSx}>
                    {shop("empty.headline")}
                  </Typography>
                  <BodyCopy>{shop("empty.body")}</BodyCopy>
                  <AppButton
                    onClick={resetFilters}
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
  activeFilters,
  filters,
  onReset,
  onSort,
  onToggle,
  variant,
}: {
  activeFilters: boolean;
  filters: ProductFilter;
  onReset: () => void;
  onSort: (sortBy: ProductSort) => void;
  onToggle: (key: ArrayFilterKey, value: string) => void;
  variant: "desktop" | "mobile";
}) {
  const common = useTypedTranslations("common");
  const shop = useTypedTranslations("shop");
  const catalog = useTypedTranslations("catalog");

  return (
    <Stack spacing={variant === "mobile" ? 3.2 : 4.2}>
      <Box sx={filterPanelHeaderSx}>
        <Typography component="p" sx={filterEyebrowSx}>
          {shop("filters.title")}
        </Typography>
        <Box
          component="button"
          disabled={!activeFilters}
          onClick={onReset}
          sx={clearFiltersSx}
          type="button"
        >
          {common("actions.clearFilters")}
        </Box>
      </Box>

      <FilterGroup title={shop("filters.sortBy")}>
        {FILTER_OPTIONS.sortOptions.map((option) => (
          <EditorialFilterOption
            checked={(filters.sortBy ?? "featured") === option.value}
            key={option.value}
            label={sortLabel(common, option.value)}
            name="sort"
            onChange={() => onSort(option.value)}
            type="radio"
          />
        ))}
      </FilterGroup>

      <FilterGroup title={shop("filters.category")}>
        {CATEGORIES.map((category) => (
          <EditorialFilterOption
            checked={filters.categories?.includes(category.id) ?? false}
            key={category.id}
            label={categoryLabel(common, category.id)}
            name="categories"
            onChange={() => onToggle("categories", category.id)}
            type="checkbox"
          />
        ))}
      </FilterGroup>

      <FilterGroup title={shop("filters.collection")}>
        {COLLECTIONS.map((collection) => (
          <EditorialFilterOption
            checked={filters.collections?.includes(collection.id) ?? false}
            key={collection.id}
            label={collectionLabel(catalog, collection.id)}
            name="collections"
            onChange={() => onToggle("collections", collection.id)}
            type="checkbox"
          />
        ))}
      </FilterGroup>

      <FilterGroup title={shop("filters.color")}>
        {FILTER_OPTIONS.colors.map((color) => (
          <EditorialFilterOption
            checked={filters.colors?.includes(color.name) ?? false}
            key={color.name}
            label={colorLabel(common, color.name)}
            name="colors"
            onChange={() => onToggle("colors", color.name)}
            type="checkbox"
          >
            <Swatch aria-hidden="true" color={color.code} sx={filterSwatchSx} />
          </EditorialFilterOption>
        ))}
      </FilterGroup>

      <FilterGroup title={shop("filters.size")}>
        {FILTER_OPTIONS.sizes.map((size) => (
          <EditorialFilterOption
            checked={filters.sizes?.includes(size) ?? false}
            key={size}
            label={sizeLabel(common, size)}
            name="sizes"
            onChange={() => onToggle("sizes", size)}
            type="checkbox"
          />
        ))}
      </FilterGroup>
    </Stack>
  );
}

function FilterGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <Box component="section" sx={filterGroupSx}>
      <Stack direction="row" sx={filterGroupHeaderSx}>
        <Typography component="h3" sx={filterGroupTitleSx}>
          {title}
        </Typography>
        <Box aria-hidden="true" sx={filterGroupRuleSx} />
      </Stack>
      <Stack spacing={0.1}>{children}</Stack>
    </Box>
  );
}

function EditorialFilterOption({
  checked,
  children,
  label,
  name,
  onChange,
  type,
}: {
  checked: boolean;
  children?: ReactNode;
  label: string;
  name: string;
  onChange: () => void;
  type: "checkbox" | "radio";
}) {
  return (
    <Box component="label" sx={filterOptionSx}>
      <Box
        aria-label={label}
        checked={checked}
        component="input"
        name={name}
        onChange={onChange}
        sx={filterInputSx}
        type={type}
      />
      <Box
        aria-hidden="true"
        className="AmambraFilterOption-control"
        component="span"
        sx={filterControlSx(checked)}
      />
      <Box component="span" sx={filterOptionContentSx}>
        {children}
        <Typography component="span" sx={filterOptionTextSx(checked)}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

function hasActiveFilters(filters: ProductFilter): boolean {
  return Boolean(
    (filters.sortBy && filters.sortBy !== "featured") ||
      filters.query ||
      filters.categories?.length ||
      filters.collections?.length ||
      filters.colors?.length ||
      filters.sizes?.length,
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

function sizeLabel(
  t: ReturnType<typeof useTypedTranslations<"common">>,
  size: string,
) {
  return size === "One Size" ? t("sizes.oneSize") : size;
}

const shopSectionSx: SxProps<Theme> = {
  position: "relative",
  overflow: "hidden",
  "&::before": {
    position: "absolute",
    inset: 0,
    content: '""',
    background: "rgba(9, 9, 8, 0.3)",
    pointerEvents: "none",
  },
  "& > *": {
    position: "relative",
  },
};

const shopToolbarSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 2,
  mb: { xs: 3.2, md: 4.8 },
};

const mobileFilterTriggerSx: SxProps<Theme> = {
  display: { xs: "inline-flex", md: "none" },
  alignItems: "center",
  gap: 1,
  minHeight: 42,
  border: 0,
  borderBottom: `1px solid ${alpha(brandColors.goldSoft, 0.42)}`,
  p: 0,
  color: alpha(brandColors.ivory, 0.86),
  background: "transparent",
  transition: transitions.colors,
  "&:hover": {
    color: brandColors.goldSoft,
  },
  "&:focus-visible": {
    outline: `1px solid ${alpha(brandColors.goldSoft, 0.64)}`,
    outlineOffset: "5px",
  },
};

const toolbarTextSx: SxProps<Theme> = {
  fontSize: "0.72rem",
  fontWeight: 850,
  letterSpacing: "0.16em",
  lineHeight: 1,
  textTransform: "uppercase",
};

const sortShellSx: SxProps<Theme> = {
  display: "grid",
  width: { xs: "min(58vw, 230px)", sm: 230 },
  justifySelf: "end",
};

const sortLabelSx: SxProps<Theme> = {
  mb: 1,
  color: alpha(brandColors.goldSoft, 0.74),
  fontSize: "0.64rem",
  fontWeight: 850,
  letterSpacing: "0.18em",
  lineHeight: 1,
  textTransform: "uppercase",
};

const sortSelectSx: SxProps<Theme> = {
  color: brandColors.ivory,
  background: "transparent",
  fontSize: "0.84rem",
  fontWeight: 520,
  letterSpacing: "0.02em",
  "&::before": {
    borderBottomColor: `${alpha(brandColors.ivory, 0.16)} !important`,
  },
  "&::after": {
    borderBottomColor: brandColors.goldSoft,
  },
  "&:hover:not(.Mui-disabled)::before": {
    borderBottomColor: `${alpha(brandColors.goldSoft, 0.55)} !important`,
  },
  "& .MuiSelect-select": {
    px: 0,
    py: 1,
  },
  "& .MuiSelect-icon": {
    color: alpha(brandColors.goldSoft, 0.72),
  },
};

const sortMenuPaperSx: SxProps<Theme> = {
  mt: 1.1,
  border: `1px solid ${alpha(brandColors.ivory, 0.08)}`,
  borderRadius: radius.card,
  color: brandColors.ivory,
  background:
    "linear-gradient(180deg, rgba(17, 16, 14, 0.98), rgba(9, 9, 8, 0.98))",
  boxShadow: "0 24px 74px rgba(0, 0, 0, 0.48)",
};

const sortMenuListSx: SxProps<Theme> = {
  py: 0.7,
};

const sortMenuItemSx: SxProps<Theme> = {
  minHeight: 42,
  color: alpha(brandColors.ivory, 0.72),
  fontSize: "0.86rem",
  transition: transitions.colors,
  "&.Mui-selected": {
    color: brandColors.ivory,
    backgroundColor: alpha(brandColors.goldSoft, 0.08),
  },
  "&.Mui-selected:hover, &:hover": {
    color: brandColors.goldSoft,
    backgroundColor: alpha(brandColors.ivory, 0.045),
  },
};

const shopLayoutSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "236px 1fr", lg: "252px 1fr" },
  gap: { xs: 3.5, md: 5.6, lg: 6.8 },
  alignItems: "start",
};

const desktopFilterAsideSx: SxProps<Theme> = {
  position: "sticky",
  top: "calc(var(--header-height) + 28px)",
  display: { xs: "none", md: "block" },
  pr: { md: 1.6, lg: 2.2 },
};

const filterPanelHeaderSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
};

const filterEyebrowSx: SxProps<Theme> = {
  m: 0,
  color: alpha(brandColors.goldSoft, 0.76),
  fontSize: "0.64rem",
  fontWeight: 850,
  letterSpacing: "0.18em",
  lineHeight: 1,
  textTransform: "uppercase",
};

const clearFiltersSx: SxProps<Theme> = {
  border: 0,
  p: 0,
  color: alpha(brandColors.ivory, 0.48),
  background: "transparent",
  fontSize: "0.68rem",
  fontWeight: 750,
  letterSpacing: "0.1em",
  lineHeight: 1,
  textTransform: "uppercase",
  transition: transitions.colors,
  "&:hover": {
    color: brandColors.goldSoft,
  },
  "&:focus-visible": {
    outline: `1px solid ${alpha(brandColors.goldSoft, 0.58)}`,
    outlineOffset: "5px",
  },
  "&:disabled": {
    color: alpha(brandColors.ivory, 0.24),
    cursor: "default",
  },
};

const filterGroupSx: SxProps<Theme> = {
  display: "grid",
  gap: 1.5,
};

const filterGroupHeaderSx: SxProps<Theme> = {
  alignItems: "center",
  gap: 1.4,
};

const filterGroupTitleSx: SxProps<Theme> = {
  m: 0,
  color: alpha(brandColors.goldSoft, 0.8),
  fontSize: "0.64rem",
  fontWeight: 850,
  letterSpacing: "0.18em",
  lineHeight: 1,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

const filterGroupRuleSx: SxProps<Theme> = {
  flex: "1 1 auto",
  height: "1px",
  background: `linear-gradient(90deg, ${alpha(
    brandColors.ivory,
    0.14,
  )}, transparent)`,
};

const filterOptionSx: SxProps<Theme> = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "18px minmax(0, 1fr)",
  alignItems: "center",
  gap: 1.35,
  minHeight: 34,
  color: alpha(brandColors.ivory, 0.62),
  cursor: "pointer",
  transition: transitions.colors,
  "&:hover": {
    color: brandColors.ivory,
    "& .AmambraFilterOption-control": {
      borderColor: alpha(brandColors.goldSoft, 0.72),
    },
  },
};

const filterInputSx: SxProps<Theme> = {
  position: "absolute",
  width: 1,
  height: 1,
  m: 0,
  opacity: 0,
  pointerEvents: "none",
  "&:focus-visible + .AmambraFilterOption-control": {
    outline: `1px solid ${alpha(brandColors.goldSoft, 0.72)}`,
    outlineOffset: "4px",
  },
};

const filterControlSx = (checked: boolean): SxProps<Theme> => ({
  position: "relative",
  display: "inline-flex",
  width: 14,
  height: 14,
  border: `1px solid ${
    checked ? alpha(brandColors.goldSoft, 0.92) : alpha(brandColors.ivory, 0.3)
  }`,
  borderRadius: radius.pill,
  transition: transitions.colors,
  "&::after": {
    position: "absolute",
    inset: 3,
    borderRadius: radius.pill,
    content: '""',
    backgroundColor: checked ? brandColors.goldSoft : "transparent",
    opacity: checked ? 1 : 0,
    transform: checked ? "scale(1)" : "scale(0.66)",
    transition: `opacity ${motion.duration.fast} ${motion.easing.luxury}, transform ${motion.duration.fast} ${motion.easing.luxury}`,
  },
});

const filterOptionContentSx: SxProps<Theme> = {
  display: "inline-flex",
  minWidth: 0,
  alignItems: "center",
  gap: 1,
};

const filterOptionTextSx = (checked: boolean): SxProps<Theme> => ({
  color: checked ? alpha(brandColors.ivory, 0.94) : "inherit",
  fontSize: "0.9rem",
  fontWeight: checked ? 560 : 430,
  lineHeight: 1.55,
  transition: transitions.colors,
});

const filterSwatchSx: SxProps<Theme> = {
  width: 13,
  height: 13,
  borderColor: alpha(brandColors.ivory, 0.28),
};

const mobileFilterDrawerSx: SxProps<Theme> = {
  maxHeight: "min(84svh, 760px)",
  overflow: "hidden",
  borderTop: `1px solid ${alpha(brandColors.goldSoft, 0.18)}`,
  borderRadius: `${radius.drawer} ${radius.drawer} 0 0`,
  color: brandColors.ivory,
  background:
    "linear-gradient(180deg, rgba(17, 16, 14, 0.98), rgba(9, 9, 8, 0.99))",
  boxShadow: "0 -24px 80px rgba(0, 0, 0, 0.52)",
};

const mobileDrawerInnerSx: SxProps<Theme> = {
  maxHeight: "inherit",
  overflowY: "auto",
  px: { xs: 2.2, sm: 3.2 },
  pt: { xs: 2.5, sm: 3 },
  pb: { xs: 4, sm: 4.8 },
};

const drawerTitleSx: SxProps<Theme> = {
  m: "8px 0 0",
  color: brandColors.ivory,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: { xs: "1.55rem", sm: "1.9rem" },
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: 1.08,
};

const drawerCloseSx: SxProps<Theme> = {
  borderColor: alpha(brandColors.ivory, 0.12),
  background: "transparent",
};

const emptyStateSurfaceSx: SxProps<Theme> = {
  display: "grid",
  minHeight: 420,
  placeItems: "center",
  textAlign: "center",
};

const emptyHeadingSx: SxProps<Theme> = {
  m: "0 0 10px",
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: { xs: "1.6rem", md: "1.9rem" },
  fontWeight: 500,
  letterSpacing: 0,
};
