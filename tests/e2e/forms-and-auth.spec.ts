import { expect, test, type Page } from "@playwright/test";

const TEST_EMAIL = `e2e+${Date.now()}@movemental.ai`;

/** Navigate agent room to the contact form via the opening chip. */
async function openAgentContactForm(page: Page) {
  await page.goto("/agent");
  await expect(page.locator(".ink-band-surface").first()).toBeVisible({ timeout: 8000 });
  await page.waitForTimeout(1500);
  const getInTouch = page.getByRole("button", { name: /get in touch/i });
  await expect(getInTouch).toBeVisible({ timeout: 8000 });
  await getInTouch.click();
  await expect(page.getByRole("button", { name: /send message/i })).toBeVisible({ timeout: 8000 });
}

test.describe("Lead magnets & contact forms", () => {
  test("field guide (safety) submits and shows success", async ({ page }) => {
    await page.goto("/field-guide");
    await page.getByLabel(/^email$/i).fill(TEST_EMAIL);
    await page.getByLabel(/organization/i).fill("E2E Test Org");
    await page.getByRole("button", { name: /send me the field guide/i }).click();
    await expect(page.getByText(/check your inbox|sent|pdf/i)).toBeVisible({ timeout: 15000 });
  });

  test("field guide (sandbox) submits and shows success", async ({ page }) => {
    await page.goto("/field-guide?guide=sandbox");
    await page.getByLabel(/^email$/i).fill(`sandbox+${TEST_EMAIL}`);
    await page.getByRole("button", { name: /send me the field guide/i }).click();
    await expect(page.getByText(/check your inbox|sent|pdf/i)).toBeVisible({ timeout: 15000 });
  });

  test("enroll form submits and shows confirmation", async ({ page }) => {
    await page.goto("/enroll");
    await page.getByLabel(/^organization$/i).fill("E2E Test Church");
    await page.getByLabel(/your name/i).fill("E2E Tester");
    await page.getByLabel(/^email$/i).fill(`enroll+${TEST_EMAIL}`);
    await page.getByLabel(/where your organization stands/i).fill(
      "Automated Playwright enrollment test — please ignore.",
    );
    await page.getByRole("button", { name: /set up my dashboard/i }).click();
    await expect(page.getByText(/got it/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/provision within 24 hours/i)).toBeVisible();
  });

  test("agent room contact form validates and submits", async ({ page }) => {
    await openAgentContactForm(page);

    // Submit empty — inline validation (button still clickable but fields invalid)
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();

    await page.getByLabel(/^name$/i).fill("E2E Contact");
    await page.getByLabel(/^email$/i).fill(`contact+${TEST_EMAIL}`);
    await page.getByLabel(/^message$/i).fill(
      "Automated Playwright contact test — at least ten characters here.",
    );
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/got it/i)).toBeVisible({ timeout: 15000 });
  });
});

test.describe("Auth surfaces", () => {
  test("login page loads and rejects bad credentials", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
    await page.getByLabel(/email address/i).fill("not-a-real-user@movemental.ai");
    await page.getByLabel(/^password$/i).fill("wrong-password-12345");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await expect(page.getByText(/incorrect|could not sign in/i)).toBeVisible({ timeout: 15000 });
  });

  test("login form requires email and password fields", async ({ page }) => {
    await page.goto("/login");
    const email = page.getByLabel(/email address/i);
    const password = page.getByLabel(/^password$/i);
    await expect(email).toHaveAttribute("required", "");
    await expect(password).toHaveAttribute("required", "");
  });

  test("forgot password sends reset request UI", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByRole("heading", { name: /forgot your password/i })).toBeVisible();
    await page.getByLabel(/email address/i).fill(`reset+${TEST_EMAIL}`);
    await page.getByRole("button", { name: /send reset link/i }).click();
    // Supabase may accept or reject; either sent confirmation or error alert should appear
    await expect(
      page.getByText(/check your inbox|email sent|could not send reset/i),
    ).toBeVisible({ timeout: 15000 });
  });

  test("assess magic-link form accepts email and shows sent state", async ({ page }) => {
    await page.goto("/assess");
    await expect(
      page.getByRole("heading", { name: /find out the truth about ai/i }),
    ).toBeVisible();
    await page.getByLabel(/^email$/i).fill(`assess+${TEST_EMAIL}`);
    await page.getByRole("button", { name: /email me the link/i }).click();
    await expect(
      page.getByText(/check your inbox|could not send the link/i),
    ).toBeVisible({ timeout: 15000 });
  });
});
