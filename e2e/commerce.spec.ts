import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.removeItem("amamre-cart");
    localStorage.removeItem("amamre-wishlist");
  });
});

test("product, wishlist, cart, and checkout flow", async ({ page }) => {
  await page.goto("/product/signature-satin-hood-hoodie");

  await page
    .locator("aside")
    .getByRole("button", { name: "Add to wishlist" })
    .click();
  await expect(page.getByText("Saved to wishlist")).toBeVisible();
  await page.getByRole("link", { name: /wishlist with 1 items/i }).click();
  await expect(
    page.getByRole("heading", { name: "Saved pieces" }),
  ).toBeVisible();
  await expect(
    page.getByText("Signature Satin Hood Hoodie").first(),
  ).toBeVisible();

  await page.goto("/product/signature-satin-hood-hoodie");
  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page.getByText("Added to cart")).toBeVisible();
  await page.getByRole("link", { name: /cart with 1 items/i }).click();

  await expect(
    page.getByRole("heading", { name: "Shopping bag" }),
  ).toBeVisible();
  await expect(
    page.getByText("Signature Satin Hood Hoodie").first(),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /increase signature satin hood hoodie/i })
    .click();
  await expect(
    page.getByRole("link", { name: /cart with 2 items/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Launch checkout form" }).click();
  await expect(
    page.getByRole("heading", { name: "Launch checkout profile" }),
  ).toBeVisible();

  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("customer@example.com");
  await page.getByLabel("Phone").fill("+49 711 1234567");
  await page.getByLabel("First name").fill("Amina");
  await page.getByLabel("Last name").fill("Mensah");
  await page.getByLabel("Street").fill("Koenigstrasse 1");
  await page.getByLabel("Postal code").fill("70173");
  await page.getByLabel("City").fill("Stuttgart");
  await page.getByLabel("State").fill("Baden-Wurttemberg");
  await page.getByLabel("Country").fill("Germany");
  await page.getByRole("button", { name: "Validate checkout profile" }).click();

  await expect(
    page.getByText("Checkout profile validated", { exact: false }),
  ).toBeVisible();
});

test("search and shop filters narrow product discovery", async ({ page }) => {
  await page.goto("/search");
  await page.getByPlaceholder("Hoodie, beanie, satin, heritage").fill("beanie");
  await expect(page.getByText("Satin-Lined Beanie")).toBeVisible();

  await page.goto("/shop");
  await page.getByLabel("Accessories").check();
  await expect(page.getByText("Satin-Lined Beanie")).toBeVisible();
});

test("contact form and newsletter actions validate successfully", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Amina Mensah");
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("amina@example.com");
  await page.getByLabel("Subject").fill("Sizing help");
  await page
    .getByLabel("Message")
    .fill("Can you help me choose the right hoodie size?");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(
    page.getByText("Message received", { exact: false }),
  ).toBeVisible();

  await page.getByPlaceholder("Email address").fill("drop@example.com");
  await page.getByLabel(/I agree to receive AMAMRE editorial emails/i).check();
  await page.getByRole("button", { name: "Join the list" }).click();
  await expect(
    page.getByText("You are on the AMAMRE list", { exact: false }),
  ).toBeVisible();
});
