import { expect, test } from "@playwright/test";

const routes = [
  ["home", "/", "Afro-European streetwear"],
  ["shop", "/shop", "Launch collection"],
  ["collections", "/collections", "A launch system built to scale"],
  ["signature collection", "/collections/signature", "Signature"],
  [
    "product detail",
    "/product/signature-satin-hood-hoodie",
    "Signature Satin Hood Hoodie",
  ],
  ["about", "/about", "A modern wardrobe between cultures"],
  ["faq", "/faq", "Frequently asked questions"],
  ["contact", "/contact", "Customer care"],
  ["size guide", "/size-guide", "Size guide"],
  ["shipping returns", "/shipping-returns", "Shipping and returns"],
  ["search", "/search", "Find your AMAMBRA piece"],
  ["account", "/account", "Client account center"],
  ["orders", "/account/orders", "Order history connects here"],
  ["profile", "/account/profile", "Profile and consent preferences"],
  ["cart", "/cart", "Your cart is empty"],
  ["checkout", "/checkout", "Your bag is empty"],
  ["wishlist", "/wishlist", "No saved pieces yet"],
  ["privacy", "/privacy", "Privacy policy"],
  ["terms", "/terms", "Terms and conditions"],
  ["cookies", "/cookies", "Cookie policy"],
  ["impressum", "/impressum", "Impressum"],
] as const;

test.describe("route coverage", () => {
  for (const [name, path, expectedText] of routes) {
    test(`${name} renders`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));

      await page.goto(path);
      await expect(
        page.getByText(expectedText, { exact: false }).first(),
      ).toBeVisible();
      await expect(page.locator("body")).toContainText("AMAMBRA");
      expect(pageErrors).toEqual([]);
    });
  }
});
