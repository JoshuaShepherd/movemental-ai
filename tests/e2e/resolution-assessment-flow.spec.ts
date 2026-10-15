import { expect, test } from "@playwright/test";

test.describe("Resolution and Reality Assessment E2E User Flows", () => {
  test("/resolve loads and can render review document", async ({ page }) => {
    await page.goto("/resolve", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Resolution|AI/i);

    // Navigate to resolution people
    await page.goto("/me/people", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Your people/i);
    // Verify agreement and tally section are rendered
    await expect(page.locator(".mv-tally")).toBeVisible();
  });

  test("/assessment flow: start, predict, and results smoke", async ({ page }) => {
    // 1. Visit /assessment intro
    await page.goto("/assessment", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();

    // 2. Start form is present
    const orgInput = page.locator("#on");
    await expect(orgInput).toBeVisible();

    // 3. Visit predict view
    await page.goto("/assessment/predict?org=TestCorp", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/happening|use AI/i);

    // 4. Visit answer view
    await page.goto("/assessment/answer?org=TestCorp", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/use AI/i);

    // 5. Visit results view
    await page.goto("/assessment/results", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/What you thought/i);
    await expect(page.locator(".mv-gaprow").first()).toBeVisible();
  });
});
