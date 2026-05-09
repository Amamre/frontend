import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart, CartItem } from "@/types";

interface CartStore {
  cart: Cart | null;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      items: [],

      addItem: (item: CartItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.variantId === item.variantId,
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (itemId: string) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== itemId),
        })),

      updateQuantity: (itemId: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === itemId ? { ...i, quantity } : i,
          ),
        })),

      clearCart: () => set({ items: [], cart: null }),

      getTotal: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "amamre-cart",
      version: 1,
      skipHydration: true,
    },
  ),
);
