// Currency Formatting
export const formatPrice = (
  price: number,
  currency: string = "EUR",
  locale: string = "de-DE",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};

// Percentage Calculation
export const calculateDiscount = (
  originalPrice: number,
  salePrice: number,
): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Text Truncation
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Slug Generation
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Date Formatting
export const formatDate = (
  date: string | Date,
  locale: string = "de-DE",
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(dateObj);
};

// Email Validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// URL Validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Phone Validation (Basic)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]{7,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Postal Code Validation (Germany)
export const isValidPostalCode = (postalCode: string): boolean => {
  const postalRegex = /^\d{5}$/;
  return postalRegex.test(postalCode.replace(/\s/g, ""));
};

// IBAN Validation (Basic)
export const isValidIBAN = (iban: string): boolean => {
  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  return ibanRegex.test(iban.replace(/\s/g, ""));
};

// Class Name Utility
export const cn = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes
    .filter((cls) => typeof cls === "string" && cls.length > 0)
    .join(" ");
};

// Deep Object Clone
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Debounce Function
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle Function
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// Wait Promise
export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Array Chunk
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Get Initials from Name
export const getInitials = (firstName: string, lastName?: string): string => {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName ? lastName.charAt(0).toUpperCase() : "";
  return (first + last).trim();
};

// Format Full Name
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

// Bytes to MB
export const bytesToMB = (bytes: number): number => {
  return Math.round((bytes / (1024 * 1024)) * 100) / 100;
};

// Random ID Generator
export const generateId = (length: number = 16): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// Get Query Parameters
export const getQueryParams = (url: string): Record<string, string> => {
  const searchParams = new URLSearchParams(new URL(url).search);
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

// Highlight Text
export const highlightText = (
  text: string,
  query: string,
  limit: number = 100,
): string => {
  if (!query) return truncateText(text, limit);
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  const preview = parts.slice(0, 5).join("");
  return truncateText(preview, limit);
};

// Pluralize
export const pluralize = (
  count: number,
  singular: string,
  plural?: string,
): string => {
  return count === 1 ? singular : plural || `${singular}s`;
};

// Case Conversion
export const toPascalCase = (str: string): string => {
  return str
    .split(/[\s\-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

export const toCamelCase = (str: string): string => {
  return str
    .split(/[\s\-_]+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
};

export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
};
