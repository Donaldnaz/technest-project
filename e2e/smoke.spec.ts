import { expect, test } from "@playwright/test";

test.describe("public routes", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/iCare/i);
    await expect(
      page.getByRole("heading", {
        name: /convert medical documents\.?\s*read them in plain english/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /open icare assistant/i }),
    ).toBeVisible();
  });
});

test.describe("auth protection", () => {
  test("dashboard redirects unauthenticated users to sign-in", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });

  test("POST /api/upload without session returns JSON 401", async ({ request }) => {
    const response = await request.post("/api/upload", {
      data: { type: "blob.generate-client-token" },
      headers: { "Content-Type": "application/json" },
    });

    expect(response.status()).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: "Unauthorized" });
  });
});
