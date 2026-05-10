import type { ProductSort } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://amambra.com";

export const BRAND = {
  name: "AMAMBRA",
  description:
    "Modern European minimalism meets subtle African heritage inspiration in accessible premium streetwear.",
  founded: 2024,
  email: "hello@amambra.com",
  phone: "+49 711 0000 0000",
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/amambra",
  tiktok: "https://tiktok.com/@amambra",
  youtube: "https://youtube.com/@amambra",
  linkedin: "https://linkedin.com/company/amambra",
};

export const CATEGORIES = [
  { id: "hoodies", slug: "hoodies" },
  { id: "sets", slug: "sets" },
  { id: "tops", slug: "tops" },
  { id: "accessories", slug: "accessories" },
] as const;

export const COLLECTIONS = [
  {
    id: "signature",
    slug: "signature",
  },
  {
    id: "heritage",
    slug: "heritage",
  },
  {
    id: "essentials",
    slug: "essentials",
  },
  {
    id: "atelier",
    slug: "atelier",
  },
];

export const FILTER_OPTIONS = {
  colors: [
    { id: "obsidianBlack", name: "Obsidian Black", code: "#090908" },
    { id: "softIvory", name: "Soft Ivory", code: "#faf8f1" },
    { id: "mutedGold", name: "Muted Gold", code: "#b8956a" },
    { id: "deepOlive", name: "Deep Olive", code: "#4f5f3f" },
    { id: "darkCocoa", name: "Dark Cocoa", code: "#574235" },
  ],
  sizes: ["S", "M", "L", "XL", "One Size"],
  prices: [
    { id: "under100", min: 0, max: 100 },
    { id: "from100To200", min: 100, max: 200 },
    { id: "from200To350", min: 200, max: 350 },
  ],
  sortOptions: [
    { value: "featured" },
    { value: "newest" },
    { value: "popular" },
    { value: "price-low" },
    { value: "price-high" },
    { value: "rating" },
  ] satisfies Array<{ value: ProductSort }>,
};

export const SIZE_CHART = {
  clothing: [
    { size: "S", chest: "89-94 cm", waist: "74-79 cm", label: "small" },
    { size: "M", chest: "95-101 cm", waist: "80-86 cm", label: "medium" },
    { size: "L", chest: "102-109 cm", waist: "87-94 cm", label: "large" },
    {
      size: "XL",
      chest: "110-118 cm",
      waist: "95-103 cm",
      label: "extraLarge",
    },
  ],
  accessories: [{ size: "One Size", label: "accessoriesFit" }],
};

export const DEFAULT_CURRENCY = "EUR";
export const TAX_RATE = 0.19;
export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING = 5.99;

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    nameKey: "standard",
    descriptionKey: "standardDescription",
    price: STANDARD_SHIPPING,
  },
  {
    id: "express",
    nameKey: "express",
    descriptionKey: "expressDescription",
    price: 14.99,
  },
];

export const SEO_DEFAULTS = {
  title: "AMAMBRA | Afro-European Accessible Premium Streetwear",
  description:
    "Shop AMAMBRA, a Stuttgart-based Afro-European premium streetwear brand combining modern minimalism, subtle African heritage, and luxury everyday pieces.",
  keywords: [
    "AMAMBRA",
    "Afro-European fashion",
    "luxury streetwear",
    "premium hoodie",
    "satin lined hoodie",
    "Stuttgart fashion",
  ],
  ogImage: "/editorial/amambra-hero-campaign.png",
};

export const BRAND_META = {
  charset: "utf-8",
  themeColor: "#0a0a0a",
};

export const GDPR_SETTINGS = {
  cookieConsent: true,
  analyticsConsent: false,
  marketingConsent: false,
  consentExpiryDays: 365,
};

export const IMAGE_CONFIG = {
  quality: 90,
  sizes:
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",
};
