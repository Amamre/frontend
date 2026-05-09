import type { ReactNode } from "react";

export type CurrencyCode = "EUR" | "USD" | "GBP";

export type ProductSort =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "popular"
  | "rating";

export interface ProductImage {
  id: string;
  url: string;
  mobileUrl?: string;
  alt: string;
  width: number;
  height: number;
  role:
    | "hero"
    | "hover"
    | "front"
    | "back"
    | "side"
    | "detail"
    | "detail-sleeve"
    | "detail-embroidery"
    | "detail-trim"
    | "hood-lining"
    | "texture"
    | "lifestyle"
    | "folded"
    | "flatlay"
    | "gallery"
    | "swatch";
  color?: string;
}

export interface ProductColorOption {
  name: string;
  slug: string;
  code: string;
  description: string;
  images: ProductImage[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  sku: string;
  inventory: number;
  image?: string;
  color?: string;
  size?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  category: string;
  collection: string;
  tags: string[];
  material: string;
  care: string;
  fit: string;
  story: string;
  features: string[];
  sizes: string[];
  colors: { name: string; code: string }[];
  colorOptions: ProductColorOption[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  publishedAt: string;
  metadata: {
    seo: SEOMetadata;
    social?: SocialMetadata;
  };
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: CurrencyCode;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferences: CustomerPreferences;
}

export interface CustomerPreferences {
  marketing: boolean;
  newsletter: boolean;
  notifications: boolean;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: ProductImage;
  products: Product[];
  publishedAt: string;
}

export interface ProductFilter {
  categories?: string[];
  collections?: string[];
  colors?: string[];
  sizes?: string[];
  priceRange?: { min: number; max: number };
  inStock?: boolean;
  query?: string;
  sortBy?: ProductSort;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: "summary" | "summary_large_image";
}

export interface SocialMetadata {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
  children?: NavigationItem[];
  megaMenu?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  country?: string;
  consent: boolean;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  sameAsShipping?: boolean;
  marketingConsent?: boolean;
}

export interface ActionState {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
  meta?: {
    timestamp: string;
    version: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: string;
  userId?: string;
}

export interface PageViewEvent extends AnalyticsEvent {
  event: "page_view";
  properties: {
    path: string;
    title: string;
    referrer?: string;
  };
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: unknown;
  publishedAt: string;
  updatedAt: string;
}

export interface CMSArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  author: string;
  publishedAt: string;
}
