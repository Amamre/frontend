import { defineConfig, devices } from "@playwright/test";

const playwrightPort = process.env.PLAYWRIGHT_PORT ?? "3100";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${playwrightPort}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: "html",
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 10,
      threshold: 0,
    },
  },
  use: {
    baseURL,
    colorScheme: "dark",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `pnpm run build && pnpm run start -- --port ${playwrightPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { height: 1100, width: 1440 },
      },
    },
    {
      name: "tablet-chromium",
      use: {
        ...devices["iPad Pro 11"],
        viewport: { height: 1112, width: 834 },
      },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "wide-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { height: 1080, width: 1920 },
      },
    },
  ],
});
