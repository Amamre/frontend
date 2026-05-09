import { expect, test } from "@playwright/test";

test("mobile navigation opens collection and primary links", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile navigation is only visible on mobile project");

  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByTestId("mobile-menu")).toBeVisible();
  await page
    .getByTestId("mobile-menu")
    .getByRole("link", { name: "Heritage" })
    .click();
  await expect(page).toHaveURL(/\/collections\/heritage$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Heritage Collection" }),
  ).toBeVisible();
});
