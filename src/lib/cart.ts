import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
  TAX_RATE,
} from "@/constants/config";
import type { CartItem } from "@/types";

export const calculateOrderSummary = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping =
    items.length > 0 && subtotal < FREE_SHIPPING_THRESHOLD
      ? STANDARD_SHIPPING
      : 0;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;

  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
  };
};
