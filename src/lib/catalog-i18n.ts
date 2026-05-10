import type { TranslationValues } from "next-intl";
import type { NamespaceKeys } from "@/i18n/typed";
import type { Collection, Product, ProductImage } from "@/types";

type CatalogTranslator = <K extends NamespaceKeys<"catalog">>(
  key: K,
  values?: TranslationValues,
) => string;

type CommonTranslator = <K extends NamespaceKeys<"common">>(
  key: K,
  values?: TranslationValues,
) => string;

type ProductTextKey =
  | "signatureSatinHood"
  | "heritageTracksuit"
  | "atelierOvershirt"
  | "satinLinedBeanie"
  | "heritageCap"
  | "premiumEssentialTee";

type CollectionTextKey = "signature" | "heritage" | "essentials" | "atelier";

const PRODUCT_TEXT_KEYS: Record<string, ProductTextKey> = {
  prod_signature_satin_hood: "signatureSatinHood",
  prod_heritage_tracksuit: "heritageTracksuit",
  prod_atelier_overshirt: "atelierOvershirt",
  prod_satin_lined_beanie: "satinLinedBeanie",
  prod_heritage_cap: "heritageCap",
  prod_premium_essential_tee: "premiumEssentialTee",
};

const COLLECTION_TEXT_KEYS: Record<string, CollectionTextKey> = {
  signature: "signature",
  heritage: "heritage",
  essentials: "essentials",
  atelier: "atelier",
};

const COLOR_TEXT_KEYS: Record<string, NamespaceKeys<"common">> = {
  "Obsidian Black": "colors.obsidianBlack",
  "Deep Olive": "colors.deepOlive",
  "Soft Ivory": "colors.softIvory",
  "Dark Cocoa": "colors.darkCocoa",
  "Muted Gold": "colors.mutedGold",
  "Muted Warm Gold": "colors.mutedWarmGold",
};

const COLOR_DESCRIPTION_KEYS: Record<string, NamespaceKeys<"catalog">> = {
  "Obsidian Black": "colorDescriptions.obsidianBlack",
  "Deep Olive": "colorDescriptions.deepOlive",
  "Soft Ivory": "colorDescriptions.softIvory",
  "Dark Cocoa": "colorDescriptions.darkCocoa",
  "Muted Gold": "colorDescriptions.mutedGold",
  "Muted Warm Gold": "colorDescriptions.mutedWarmGold",
};

const IMAGE_ROLE_KEYS: Record<
  ProductImage["role"],
  NamespaceKeys<"catalog">
> = {
  back: "imageRoles.back",
  detail: "imageRoles.detailTrim",
  "detail-embroidery": "imageRoles.detailEmbroidery",
  "detail-sleeve": "imageRoles.detailSleeve",
  "detail-trim": "imageRoles.detailTrim",
  flatlay: "imageRoles.flatlay",
  folded: "imageRoles.folded",
  front: "imageRoles.front",
  gallery: "imageRoles.lifestyle",
  hero: "imageRoles.hero",
  "hood-lining": "imageRoles.hoodLining",
  hover: "imageRoles.hover",
  lifestyle: "imageRoles.lifestyle",
  side: "imageRoles.side",
  swatch: "imageRoles.texture",
  texture: "imageRoles.texture",
};

export function localizeProducts(
  products: Product[],
  catalog: CatalogTranslator,
  common: CommonTranslator,
) {
  return products.map((product) => localizeProduct(product, catalog, common));
}

export function localizeCollections(
  collections: Collection[],
  catalog: CatalogTranslator,
  common: CommonTranslator,
) {
  const localizedProducts = new Map(
    collections
      .flatMap((collection) => collection.products)
      .map(
        (product) =>
          [product.id, localizeProduct(product, catalog, common)] as const,
      ),
  );

  return collections.map((collection) =>
    localizeCollection(collection, catalog, localizedProducts),
  );
}

export function localizeProduct(
  product: Product,
  catalog: CatalogTranslator,
  common: CommonTranslator,
): Product {
  const key = PRODUCT_TEXT_KEYS[product.id];

  if (!key) {
    return product;
  }

  const title = catalog(`products.${key}.title`);
  const colorOptions = product.colorOptions.map((option) => {
    const colorName = colorLabel(option.name, common);

    return {
      ...option,
      name: colorName,
      description: colorDescription(option.name, catalog),
      images: option.images.map((image) =>
        localizeImage(image, title, colorName, catalog),
      ),
    };
  });

  const colors = product.colors.map((color) => ({
    ...color,
    name: colorLabel(color.name, common),
  }));

  return {
    ...product,
    title,
    description: catalog(`products.${key}.description`),
    longDescription: catalog(`products.${key}.longDescription`),
    material: catalog(`products.${key}.material`),
    care: catalog(`products.${key}.care`),
    fit: catalog(`products.${key}.fit`),
    story: catalog(`products.${key}.story`),
    features: [
      catalog(`products.${key}.feature1`),
      catalog(`products.${key}.feature2`),
      catalog(`products.${key}.feature3`),
      catalog(`products.${key}.feature4`),
    ],
    images: product.images.map((image) =>
      localizeImage(
        image,
        title,
        colorLabel(image.color ?? "", common),
        catalog,
      ),
    ),
    variants: product.variants.map((variant) => {
      const color = colorLabel(variant.color ?? "", common);

      return {
        ...variant,
        color,
        title: catalog("variantFormat", {
          color,
          size: variant.size ?? "",
          title,
        }),
      };
    }),
    colors,
    colorOptions,
    metadata: {
      ...product.metadata,
      seo: {
        ...product.metadata.seo,
        title: catalog(`products.${key}.seoTitle`),
        description: catalog(`products.${key}.seoDescription`),
        keywords: catalog(`products.${key}.seoKeywords`).split(","),
      },
    },
  };
}

export function localizeCollection(
  collection: Collection,
  catalog: CatalogTranslator,
  localizedProducts?: Map<string, Product>,
): Collection {
  const key = COLLECTION_TEXT_KEYS[collection.slug];

  if (!key) {
    return collection;
  }

  const title = catalog(`collections.${key}.title`);

  return {
    ...collection,
    title,
    description: catalog(`collections.${key}.description`),
    image: {
      ...collection.image,
      alt: catalog("imageAlt", {
        color: "",
        label: catalog("imageRoles.hero"),
        title,
      }),
    },
    products: collection.products.map(
      (product) => localizedProducts?.get(product.id) ?? product,
    ),
  };
}

function colorLabel(color: string, common: CommonTranslator) {
  const key = COLOR_TEXT_KEYS[color];

  return key ? common(key) : color;
}

function colorDescription(color: string, catalog: CatalogTranslator) {
  const key = COLOR_DESCRIPTION_KEYS[color];

  return key ? catalog(key) : catalog("colorDescriptions.fallback");
}

function localizeImage(
  image: ProductImage,
  title: string,
  color: string,
  catalog: CatalogTranslator,
): ProductImage {
  const roleKey = IMAGE_ROLE_KEYS[image.role];

  return {
    ...image,
    alt: catalog("imageAlt", {
      color,
      label: catalog(roleKey),
      title,
    }),
    color,
  };
}
