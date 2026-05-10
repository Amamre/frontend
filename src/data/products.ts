import type {
  Collection,
  Product,
  ProductColorOption,
  ProductImage,
  ProductVariant,
} from "@/types";

const CAMPAIGN_IMAGE = "/editorial/amambra-hero-campaign.png";

const COLOR_CODES: Record<string, string> = {
  "Obsidian Black": "#090908",
  "Deep Olive": "#4f5f3f",
  "Soft Ivory": "#faf8f1",
  "Dark Cocoa": "#574235",
  "Muted Gold": "#b8956a",
  "Muted Warm Gold": "#b8956a",
};

const COLOR_DESCRIPTIONS: Record<string, string> = {
  "Obsidian Black": "Matte black fleece with warm ivory and tonal trim.",
  "Deep Olive": "Muted olive with a quiet studio utility character.",
  "Soft Ivory": "Warm ivory with a clean gallery-light finish.",
  "Dark Cocoa": "Deep cocoa with restrained European tailoring energy.",
  "Muted Gold": "Soft gold knit with a subdued satin interior.",
  "Muted Warm Gold": "Soft warm gold with a quiet satin interior.",
};

const IMAGE_ROLES: Array<{
  role: ProductImage["role"];
  label: string;
}> = [
  { role: "hero", label: "cinematic hero study" },
  { role: "hover", label: "alternate campaign frame" },
  { role: "front", label: "front view" },
  { role: "back", label: "back view" },
  { role: "side", label: "side profile" },
  { role: "detail-sleeve", label: "sleeve detail" },
  { role: "detail-embroidery", label: "tonal embroidery detail" },
  { role: "detail-trim", label: "heritage trim detail" },
  { role: "hood-lining", label: "satin lining close-up" },
  { role: "texture", label: "textile texture macro" },
  { role: "lifestyle", label: "editorial lifestyle image" },
  { role: "folded", label: "folded garment study" },
  { role: "flatlay", label: "premium flatlay" },
];

const optionSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const colorCode = (color: string) => COLOR_CODES[color] ?? "#77716a";

const imageSet = (
  slug: string,
  title: string,
  colorName = "Obsidian Black",
): ProductImage[] => {
  const colorSlug = optionSlug(colorName);

  return IMAGE_ROLES.map((item) => ({
    id: `${slug}-${colorSlug}-${item.role}`,
    url: CAMPAIGN_IMAGE,
    mobileUrl: CAMPAIGN_IMAGE,
    alt: `${title} in ${colorName}, ${item.label}`,
    width: 1792,
    height: 1024,
    role: item.role,
    color: colorName,
  }));
};

const createColorOptions = (
  slug: string,
  title: string,
  colors: string[],
): ProductColorOption[] =>
  colors.map((color) => ({
    name: color,
    slug: optionSlug(color),
    code: colorCode(color),
    description:
      COLOR_DESCRIPTIONS[color] ??
      "Editorial colorway with understated AMAMBRA detailing.",
    images: imageSet(slug, title, color),
  }));

const colorsFromOptions = (options: ProductColorOption[]) =>
  options.map((option) => ({ name: option.name, code: option.code }));

function createVariants(params: {
  productCode: string;
  baseTitle: string;
  amount: number;
  sizes: string[];
  colors: string[];
  lowStockSizes?: string[];
  soldOutSizes?: string[];
}): ProductVariant[] {
  return params.colors.flatMap((color) =>
    params.sizes.map((size) => {
      const sizeCode = size.replace(/\W/g, "").toUpperCase();
      const colorCodePart = color.replace(/\W/g, "").slice(0, 4).toUpperCase();
      const sku = `AM-${params.productCode}-${sizeCode}-${colorCodePart}`;
      const soldOut = params.soldOutSizes?.includes(size) ?? false;
      const lowStock = params.lowStockSizes?.includes(size) ?? false;

      return {
        id: `gid://shopify/ProductVariant/${sku}`,
        title: `${params.baseTitle} / ${color} / ${size}`,
        price: params.amount,
        sku,
        inventory: soldOut ? 0 : lowStock ? 3 : 18,
        size,
        color,
      };
    }),
  );
}

const signatureColors = createColorOptions(
  "signature-satin-hood-hoodie",
  "Signature Satin Hood Hoodie",
  ["Obsidian Black", "Deep Olive"],
);
const tracksuitColors = createColorOptions(
  "heritage-tracksuit",
  "Heritage Tracksuit",
  ["Obsidian Black", "Dark Cocoa"],
);
const overshirtColors = createColorOptions(
  "atelier-overshirt",
  "Atelier Overshirt",
  ["Dark Cocoa", "Deep Olive"],
);
const beanieColors = createColorOptions(
  "satin-lined-beanie",
  "Satin-Lined Beanie",
  ["Obsidian Black", "Muted Warm Gold", "Dark Cocoa"],
);
const capColors = createColorOptions("heritage-cap", "Heritage Cap", [
  "Obsidian Black",
  "Deep Olive",
]);
const teeColors = createColorOptions(
  "premium-essential-tee",
  "Premium Essential Tee",
  ["Soft Ivory", "Obsidian Black", "Deep Olive"],
);

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_signature_satin_hood",
    title: "Signature Satin Hood Hoodie",
    slug: "signature-satin-hood-hoodie",
    description: "Heavy fleece with a quiet satin-lined hood.",
    longDescription:
      "A dense 480 GSM cotton fleece hoodie cut with a relaxed European shoulder, deep ribbing, and AMAMBRA's satin-lined hood for a smooth luxury finish. It is the first signature piece: minimal, weighty, and built for daily city wear.",
    price: 148,
    compareAtPrice: 178,
    images: signatureColors[0]?.images ?? [],
    variants: createVariants({
      productCode: "SSH",
      baseTitle: "Signature Satin Hood Hoodie",
      amount: 148,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: signatureColors.map((color) => color.name),
      lowStockSizes: ["M", "XL"],
      soldOutSizes: ["XXL"],
    }),
    category: "hoodies",
    collection: "signature",
    tags: ["signature", "satin lined", "heavyweight", "made for layering"],
    material:
      "480 GSM organic cotton fleece, recycled satin hood lining, ribbed cotton cuffs",
    care: "Wash inside out at 30C. Do not tumble dry. Steam gently from reverse side.",
    fit: "Relaxed streetwear fit with dropped shoulder and structured hood.",
    story:
      "Designed in Stuttgart as the first AMAMBRA signature piece, the satin hood references ceremonial polish without turning heritage into costume.",
    features: [
      "Satin-lined hood designed for comfort and hair protection",
      "Dense 480 GSM organic cotton fleece",
      "Muted warm-gold embroidery inspired by geometric textile borders",
      "Deep ribbing engineered to hold shape after repeated wear",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: colorsFromOptions(signatureColors),
    colorOptions: signatureColors,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    featured: true,
    publishedAt: "2026-01-15T09:00:00.000Z",
    metadata: {
      seo: {
        title: "Signature Satin Hood Hoodie | AMAMBRA",
        description:
          "AMAMBRA's heavyweight satin-lined hoodie in obsidian black and deep olive. Premium Afro-European streetwear from Stuttgart.",
        keywords: ["satin lined hoodie", "luxury streetwear", "AMAMBRA hoodie"],
        ogImage: CAMPAIGN_IMAGE,
      },
    },
  },
  {
    id: "prod_heritage_tracksuit",
    title: "Heritage Tracksuit",
    slug: "heritage-tracksuit",
    description: "A tailored tracksuit with understated heritage piping.",
    longDescription:
      "A coordinated jacket and trouser set in compact double-knit fabric with tonal paneling, muted gold zip pulls, and a clean straight-leg profile. Built for travel, studio days, and considered off-duty dressing.",
    price: 196,
    images: tracksuitColors[0]?.images ?? [],
    variants: createVariants({
      productCode: "HTS",
      baseTitle: "Heritage Tracksuit",
      amount: 196,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: tracksuitColors.map((color) => color.name),
      lowStockSizes: ["S"],
    }),
    category: "sets",
    collection: "heritage",
    tags: ["set", "double knit", "travel uniform", "tonal piping"],
    material: "Organic cotton double knit, recycled polyester stretch yarn",
    care: "Wash at 30C with similar colors. Dry flat. Avoid fabric softener.",
    fit: "Jacket is boxy and cropped at the hip. Trouser is straight with a clean break.",
    story:
      "The tracksuit carries AMAMBRA's Afro-European balance: functional Stuttgart minimalism, movement-first comfort, and restrained trim inspired by ceremonial linework.",
    features: [
      "Two-piece set with jacket and trouser",
      "Tonal heritage piping at pocket and side seam",
      "Muted gold zip pulls",
      "Brushed pocketing for all-day comfort",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: colorsFromOptions(tracksuitColors),
    colorOptions: tracksuitColors,
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    featured: true,
    publishedAt: "2026-02-12T09:00:00.000Z",
    metadata: {
      seo: {
        title: "Heritage Tracksuit | AMAMBRA",
        description:
          "Premium AMAMBRA heritage tracksuit with tonal linework, muted gold hardware, and a tailored streetwear fit.",
        keywords: ["luxury tracksuit", "heritage streetwear", "AMAMBRA set"],
        ogImage: CAMPAIGN_IMAGE,
      },
    },
  },
  {
    id: "prod_atelier_overshirt",
    title: "Atelier Overshirt",
    slug: "atelier-overshirt",
    description: "Structured overshirt for an editorial layering system.",
    longDescription:
      "A brushed cotton-twill overshirt with a sharp camp collar, hidden placket, matte snaps, and oversized patch pockets engineered for clean utility.",
    price: 174,
    images: overshirtColors[0]?.images ?? [],
    variants: createVariants({
      productCode: "AOS",
      baseTitle: "Atelier Overshirt",
      amount: 174,
      sizes: ["S", "M", "L", "XL"],
      colors: overshirtColors.map((color) => color.name),
      lowStockSizes: ["L"],
    }),
    category: "tops",
    collection: "atelier",
    tags: ["layering", "cotton twill", "utility", "atelier"],
    material: "Brushed organic cotton twill, corozo-style recycled buttons",
    care: "Machine wash cold. Hang dry. Iron on low from reverse.",
    fit: "Oversized through the body with a straight hem and relaxed sleeve.",
    story:
      "The Atelier Overshirt is the AMAMBRA answer to European minimal outerwear: grounded color, quiet utility, and a silhouette with calm authority.",
    features: [
      "Hidden placket",
      "Matte recycled snaps",
      "Oversized utility pockets",
      "Subtle chest embroidery",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: colorsFromOptions(overshirtColors),
    colorOptions: overshirtColors,
    rating: 4.7,
    reviewCount: 76,
    inStock: true,
    featured: false,
    publishedAt: "2026-03-08T09:00:00.000Z",
    metadata: {
      seo: {
        title: "Atelier Overshirt | AMAMBRA",
        description:
          "Structured premium overshirt by AMAMBRA with brushed twill, utility pockets, and a relaxed editorial silhouette.",
        keywords: ["atelier overshirt", "premium overshirt", "AMAMBRA tops"],
        ogImage: CAMPAIGN_IMAGE,
      },
    },
  },
  {
    id: "prod_satin_lined_beanie",
    title: "Satin-Lined Beanie",
    slug: "satin-lined-beanie",
    description: "Soft rib knit outside, smooth satin inside.",
    longDescription:
      "A premium rib-knit beanie with a discreet AMAMBRA tab and satin lining designed to reduce friction while keeping a sculpted profile.",
    price: 48,
    images: beanieColors[0]?.images ?? [],
    variants: createVariants({
      productCode: "SLB",
      baseTitle: "Satin-Lined Beanie",
      amount: 48,
      sizes: ["ONE SIZE"],
      colors: beanieColors.map((color) => color.name),
      lowStockSizes: ["ONE SIZE"],
    }),
    category: "accessories",
    collection: "signature",
    tags: ["satin lined", "headwear", "winter", "accessory"],
    material: "Merino blend rib knit, recycled satin lining, woven AMAMBRA tab",
    care: "Hand wash cold. Reshape while damp. Dry flat.",
    fit: "One size with a close luxury rib profile.",
    story:
      "Made as a daily accessory with beauty and practicality in mind, the satin lining nods to hair care rituals and the intimacy of heritage-informed design.",
    features: [
      "Smooth satin interior",
      "Soft folded cuff",
      "Low-profile AMAMBRA tab",
      "Gift-ready packaging",
    ],
    sizes: ["ONE SIZE"],
    colors: colorsFromOptions(beanieColors),
    colorOptions: beanieColors,
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    featured: true,
    publishedAt: "2026-01-20T09:00:00.000Z",
    metadata: {
      seo: {
        title: "Satin-Lined Beanie | AMAMBRA",
        description:
          "AMAMBRA satin-lined rib knit beanie with a premium soft interior and minimal tab branding.",
        keywords: ["satin lined beanie", "luxury beanie", "AMAMBRA accessory"],
        ogImage: CAMPAIGN_IMAGE,
      },
    },
  },
  {
    id: "prod_heritage_cap",
    title: "Heritage Cap",
    slug: "heritage-cap",
    description: "Low-profile cap with tonal embroidery.",
    longDescription:
      "A structured six-panel cap in washed cotton canvas with tonal AMAMBRA embroidery, antique gold adjuster, and a curved brim.",
    price: 54,
    images: capColors[0]?.images ?? [],
    variants: createVariants({
      productCode: "HCP",
      baseTitle: "Heritage Cap",
      amount: 54,
      sizes: ["ONE SIZE"],
      colors: capColors.map((color) => color.name),
    }),
    category: "accessories",
    collection: "heritage",
    tags: ["cap", "embroidery", "cotton canvas", "adjustable"],
    material: "Washed organic cotton canvas, recycled metal adjuster",
    care: "Spot clean only. Do not bleach. Air dry.",
    fit: "Low-profile six-panel fit with adjustable back strap.",
    story:
      "The Heritage Cap compresses the AMAMBRA visual language into an everyday object: subtle linework, calm proportion, and a Stuttgart streetwear attitude.",
    features: [
      "Tonal border embroidery",
      "Matte metal adjuster",
      "Curved brim",
      "Breathable internal sweatband",
    ],
    sizes: ["ONE SIZE"],
    colors: colorsFromOptions(capColors),
    colorOptions: capColors,
    rating: 4.6,
    reviewCount: 54,
    inStock: true,
    featured: false,
    publishedAt: "2026-02-28T09:00:00.000Z",
    metadata: {
      seo: {
        title: "Heritage Cap | AMAMBRA",
        description:
          "Low-profile AMAMBRA heritage cap in washed cotton canvas with tonal embroidery.",
        keywords: ["heritage cap", "luxury cap", "AMAMBRA accessories"],
        ogImage: CAMPAIGN_IMAGE,
      },
    },
  },
  {
    id: "prod_premium_essential_tee",
    title: "Premium Essential Tee",
    slug: "premium-essential-tee",
    description: "A refined heavyweight tee with a dry hand feel.",
    longDescription:
      "A 260 GSM compact cotton tee with a clean collar, slightly boxy body, and understated chest mark for daily uniform dressing.",
    price: 68,
    images: teeColors[0]?.images ?? [],
    variants: createVariants({
      productCode: "PET",
      baseTitle: "Premium Essential Tee",
      amount: 68,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: teeColors.map((color) => color.name),
      lowStockSizes: ["XS", "XXL"],
    }),
    category: "tops",
    collection: "essentials",
    tags: ["tee", "heavyweight", "uniform", "premium basic"],
    material: "260 GSM organic compact cotton, ribbed collar",
    care: "Wash inside out at 30C. Do not tumble dry. Iron low.",
    fit: "Slightly boxy with a clean sleeve length and straight hem.",
    story:
      "The Essential Tee is intentionally restrained. It is designed to sit under the overshirt, work beneath the hoodie, and hold its own with tailored trousers.",
    features: [
      "Dense organic compact cotton",
      "Reinforced neckline",
      "Side seam construction",
      "Subtle tonal chest mark",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: colorsFromOptions(teeColors),
    colorOptions: teeColors,
    rating: 4.8,
    reviewCount: 287,
    inStock: true,
    featured: true,
    publishedAt: "2026-01-05T09:00:00.000Z",
    metadata: {
      seo: {
        title: "Premium Essential Tee | AMAMBRA",
        description:
          "Heavyweight AMAMBRA premium essential tee in compact organic cotton.",
        keywords: [
          "premium tee",
          "organic cotton t-shirt",
          "AMAMBRA essentials",
        ],
        ogImage: CAMPAIGN_IMAGE,
      },
    },
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "collection_signature",
    title: "Signature Collection",
    slug: "signature",
    description:
      "The defining AMAMBRA pieces: satin-lined essentials, tactile warmth, and quiet luxury streetwear.",
    image: imageSet("signature", "Signature Collection")[0],
    products: MOCK_PRODUCTS.filter(
      (product) => product.collection === "signature",
    ),
    publishedAt: "2026-01-01T09:00:00.000Z",
  },
  {
    id: "collection_heritage",
    title: "Heritage Collection",
    slug: "heritage",
    description:
      "Minimal silhouettes with subtle African textile rhythm, built for a modern European wardrobe.",
    image: imageSet("heritage", "Heritage Collection")[0],
    products: MOCK_PRODUCTS.filter(
      (product) => product.collection === "heritage",
    ),
    publishedAt: "2026-02-01T09:00:00.000Z",
  },
  {
    id: "collection_essentials",
    title: "Essentials",
    slug: "essentials",
    description:
      "Everyday premium layers that make the whole wardrobe feel considered.",
    image: imageSet("essentials", "Essentials")[0],
    products: MOCK_PRODUCTS.filter(
      (product) => product.collection === "essentials",
    ),
    publishedAt: "2026-01-05T09:00:00.000Z",
  },
  {
    id: "collection_atelier",
    title: "Atelier",
    slug: "atelier",
    description:
      "Tailored utility pieces designed with an editorial eye and year-round function.",
    image: imageSet("atelier", "Atelier")[0],
    products: MOCK_PRODUCTS.filter(
      (product) => product.collection === "atelier",
    ),
    publishedAt: "2026-03-01T09:00:00.000Z",
  },
];
