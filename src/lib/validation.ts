import { z } from "zod";
import { messages } from "@/i18n/messages";

export type ValidationMessages = typeof messages.forms.validation;

const defaultValidationMessages = messages.forms.validation;

// Contact Form
export const createContactFormSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z.object({
    name: z.string().min(2, validation.nameMin).max(100),
    email: z.string().email(validation.emailInvalid),
    subject: z.string().min(5, validation.subjectMin).max(200),
    message: z.string().min(10, validation.messageMin).max(5000),
  });

export const contactFormSchema = createContactFormSchema();

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Newsletter Subscription
export const createNewsletterSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z.object({
    email: z.string().email(validation.emailInvalid),
    firstName: z.string().optional(),
    country: z.string().optional(),
    consent: z.boolean().refine((value) => value, {
      message: validation.consentRequired,
    }),
  });

export const newsletterSchema = createNewsletterSchema();

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Checkout Form
export const createCheckoutSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z.object({
    email: z.string().email(validation.emailInvalid),
    firstName: z.string().min(1, validation.firstNameRequired).max(100),
    lastName: z.string().min(1, validation.lastNameRequired).max(100),
    street: z.string().min(5, validation.streetRequired).max(200),
    city: z.string().min(2, validation.cityRequired).max(100),
    state: z.string().min(1, validation.stateRequired).max(100),
    postalCode: z.string().min(5, validation.postalCodeRequired).max(10),
    country: z.string().min(1, validation.countryRequired),
    phone: z.string().optional(),
    sameAsShipping: z.boolean().optional(),
    marketingConsent: z.boolean().optional(),
  });

export const checkoutSchema = createCheckoutSchema();

export type CheckoutData = z.infer<typeof checkoutSchema>;

// Product Review
export const createReviewSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z.object({
    productId: z.string(),
    rating: z.number().min(1).max(5),
    title: z.string().min(5, validation.titleMin).max(200),
    content: z.string().min(10, validation.reviewMin).max(2000),
    name: z.string().min(2, validation.nameMin).max(100),
    email: z.string().email(validation.emailInvalid),
  });

export const reviewSchema = createReviewSchema();

export type ReviewData = z.infer<typeof reviewSchema>;

// Search Query
export const createSearchSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z.object({
    query: z.string().min(1, validation.searchRequired).max(100),
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

export const searchSchema = createSearchSchema();

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
export const createLoginSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z.object({
    email: z.string().email(validation.emailInvalid),
    password: z.string().min(8, validation.passwordMin),
    rememberMe: z.boolean().optional(),
  });

export const loginSchema = createLoginSchema();

export type LoginData = z.infer<typeof loginSchema>;

// Password Reset
export const createPasswordResetSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z.object({
    email: z.string().email(validation.emailInvalid),
  });

export const passwordResetSchema = createPasswordResetSchema();

export type PasswordResetData = z.infer<typeof passwordResetSchema>;

// New Password
export const createNewPasswordSchema = (
  validation: ValidationMessages = defaultValidationMessages,
) =>
  z
    .object({
      password: z.string().min(8, validation.passwordMin),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: validation.passwordsMatch,
      path: ["confirmPassword"],
    });

export const newPasswordSchema = createNewPasswordSchema();

export type NewPasswordData = z.infer<typeof newPasswordSchema>;
