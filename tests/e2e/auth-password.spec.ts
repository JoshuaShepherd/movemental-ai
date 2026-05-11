import { expect, test } from "@playwright/test";

const email = process.env.E2E_AUTH_EMAIL;
const password = process.env.E2E_AUTH_PASSWORD;

/**
 * Optional smoke: password sign-in against a real test user.
 *
 *   E2E_AUTH_EMAIL=... E2E_AUTH_PASSWORD=... pnpm test:e2e tests/e2e/auth-password.spec.ts
 */
test.describe("/login password sign-in", () => {
  test.skip(!email || !password, "Set E2E_AUTH_EMAIL and E2E_AUTH_PASSWORD to run");

  test("signs in and reaches dashboard or no_org login", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(/email address/i).fill(email!);
    await page.getByLabel(/^password$/i).fill(password!);
    await page.getByRole("button", { name: /^sign in$/i }).click();

    await expect(page).not.toHaveURL(/\/login$/);
    const url = page.url();
    const ok =
      url.includes("/dashboard") ||
      url.includes("/program") ||
      (url.includes("/login") && url.includes("reason=no_org"));
    expect(ok).toBe(true);
  });
});
