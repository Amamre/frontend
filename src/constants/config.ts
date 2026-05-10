import type { NavigationItem, ProductSort } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://amambra.com";

export const BRAND = {
  name: "AMAMBRA",
  tagline: "Afro-European Accessible Premium Streetwear",
  description:
    "Modern European minimalism meets subtle African heritage inspiration in accessible premium streetwear.",
  location: "Stuttgart, Germany",
  founded: 2024,
  email: "hello@amambra.com",
  phone: "+49 711 0000 0000",
  address: "AMAMBRA Studio, Stuttgart, Germany",
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/amambra",
  tiktok: "https://tiktok.com/@amambra",
  youtube: "https://youtube.com/@amambra",
  linkedin: "https://linkedin.com/company/amambra",
};

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    title: "Shop",
    href: "/shop",
    description: "All premium streetwear pieces",
    megaMenu: true,
  },
  {
    title: "Collections",
    href: "/collections",
    description: "Signature, Heritage, Essentials, and Atelier",
  },
  {
    title: "About",
    href: "/about",
    description: "The Afro-European AMAMBRA story",
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Shipping, returns, sizing, and care",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Customer care and wholesale inquiries",
  },
];

export const FOOTER_NAVIGATION = {
  shop: [
    { title: "New Arrivals", href: "/shop?sort=newest" },
    { title: "Bestsellers", href: "/shop?tag=bestseller" },
    { title: "Hoodies", href: "/shop?category=hoodies" },
    { title: "Tops", href: "/shop?category=tops" },
    { title: "Accessories", href: "/shop?category=accessories" },
  ],
  company: [
    { title: "About AMAMBRA", href: "/about" },
    { title: "Collections", href: "/collections" },
    { title: "Account", href: "/account" },
    { title: "Contact", href: "/contact" },
  ],
  support: [
    { title: "FAQ", href: "/faq" },
    { title: "Size Guide", href: "/size-guide" },
    { title: "Shipping & Returns", href: "/shipping-returns" },
    { title: "Search", href: "/search" },
  ],
  legal: [
    { title: "Impressum", href: "/impressum" },
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
    { title: "Cookies", href: "/cookies" },
  ],
};

export const CATEGORIES = [
  { id: "hoodies", name: "Hoodies", slug: "hoodies" },
  { id: "sets", name: "Sets", slug: "sets" },
  { id: "tops", name: "Tops", slug: "tops" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
];

export const COLLECTIONS = [
  {
    id: "signature",
    name: "Signature",
    slug: "signature",
    description: "The defining satin-lined AMAMBRA pieces.",
  },
  {
    id: "heritage",
    name: "Heritage",
    slug: "heritage",
    description:
      "Subtle African textile rhythm in modern European silhouettes.",
  },
  {
    id: "essentials",
    name: "Essentials",
    slug: "essentials",
    description: "Premium daily layers for a complete wardrobe.",
  },
  {
    id: "atelier",
    name: "Atelier",
    slug: "atelier",
    description: "Tailored utility and editorial layering pieces.",
  },
];

export const FILTER_OPTIONS = {
  colors: [
    { name: "Obsidian Black", code: "#0a0a0a" },
    { name: "Soft Ivory", code: "#faf8f6" },
    { name: "Muted Gold", code: "#b8956a" },
    { name: "Deep Olive", code: "#4f5f3f" },
    { name: "Dark Cocoa", code: "#5a4033" },
  ],
  sizes: ["S", "M", "L", "XL", "One Size"],
  prices: [
    { label: "Under EUR 100", min: 0, max: 100 },
    { label: "EUR 100 - 200", min: 100, max: 200 },
    { label: "EUR 200 - 350", min: 200, max: 350 },
  ],
  sortOptions: [
    { label: "Featured", value: "featured" },
    { label: "Newest", value: "newest" },
    { label: "Best Sellers", value: "popular" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Top Rated", value: "rating" },
  ] satisfies Array<{ label: string; value: ProductSort }>,
};

export const SIZE_CHART = {
  clothing: [
    { size: "S", chest: "89-94 cm", waist: "74-79 cm", label: "Small" },
    { size: "M", chest: "95-101 cm", waist: "80-86 cm", label: "Medium" },
    { size: "L", chest: "102-109 cm", waist: "87-94 cm", label: "Large" },
    {
      size: "XL",
      chest: "110-118 cm",
      waist: "95-103 cm",
      label: "Extra Large",
    },
  ],
  accessories: [{ size: "One Size", label: "Adjustable or stretch fit" }],
};

export const DEFAULT_CURRENCY = "EUR";
export const DEFAULT_LOCALE = "de-DE";
export const TAX_RATE = 0.19;
export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING = 5.99;

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Standard",
    description: "Germany 2-4 business days, EU 4-7 business days",
    price: STANDARD_SHIPPING,
  },
  {
    id: "express",
    name: "Express",
    description: "Germany 1-2 business days",
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
