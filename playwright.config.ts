import { defineConfig, devices } from "@playwright/test";

const ciEnv = {
  SKIP_ENV_VALIDATION: "true",
  DATABASE_URL: "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  NEON_AUTH_BASE_URL: "https://placeholder.invalid/auth",
  NEON_AUTH_COOKIE_SECRET: "ci-cookie-secret-minimum-32-characters",
};

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: ciEnv,
  },
});
