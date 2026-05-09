import { z } from "zod";

// Contact Form
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter Subscription
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().optional(),
  country: z.string().optional(),
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required",
  }),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Checkout Form
export const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  street: z.string().min(5, "Street is required").max(200),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(1, "State is required").max(100),
  postalCode: z.string().min(5, "Postal code is required").max(10),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  sameAsShipping: z.boolean().optional(),
  marketingConsent: z.boolean().optional(),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;

// Product Review
export const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  content: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(2000),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
});

export type ReviewData = z.infer<typeof reviewSchema>;

// Search Query
export const searchSchema = z.object({
  query: z.string().min(1, "Search query required").max(100),
  category: z.string().optional(),
  sortBy: z
    .enum([
      "featured",
      "newest",
      "price-low",
      "price-high",
      "popular",
      "rating",
    ])
    .optional(),
});

export type SearchData = z.infer<typeof searchSchema>;

// Product Filter
export const filterSchema = z.object({
  categories: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  priceRange: z
    .object({
      min: z.number().min(0),
      max: z.number().min(0),
    })
    .optional(),
  inStock: z.boolean().optional(),
  sortBy: z
    .enum([
      "featured",
      "newest",
      "popular",
      "price-low",
      "price-high",
      "rating",
    ])
    .optional(),
});

export type FilterData = z.infer<typeof filterSchema>;

// Login Form
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;

// Password Reset
export const passwordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type PasswordResetData = z.infer<typeof passwordResetSchema>;

// New Password
export const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type NewPasswordData = z.infer<typeof newPasswordSchema>;
