import { test, expect } from "@playwright/test";

test.describe("onbuilding admin composition editor", () => {
  test("unauthenticated /admin/onbuilding redirects to login", async ({ page }) => {
    await page.goto("/admin/onbuilding");
    await expect(page).toHaveURL(/\/login\?next=/);
  });
});
