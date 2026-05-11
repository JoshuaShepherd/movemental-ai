import { expect, test } from "@playwright/test";

const run = process.env.RUN_PROGRAM_E2E === "1";

/**
 * These checks need a running app + Playwright browsers (`pnpm exec playwright install`).
 * Default: skipped so `pnpm test:e2e` does not fail on hosts where Playwright has no build
 * (e.g. some Linux distros). To run locally:
 *
 *   RUN_PROGRAM_E2E=1 pnpm test:e2e tests/e2e/program-templates.spec.ts
 */
test.describe.skip(!run, "/program templates (unauthenticated)", () => {
  test("redirects pilot safety route to login", async ({ page }) => {
    await page.goto("/program/safety/safestart_dashboard_home_pre_kickoff");
    await expect(page).toHaveURL(/\/login/);
  });

  test("redirects sandbox route to login", async ({ page }) => {
    await page.goto("/program/sandbox/sandboxlive_dashboard_pre_kickoff_state");
    await expect(page).toHaveURL(/\/login/);
  });

  test("redirects program hub to login", async ({ page }) => {
    await page.goto("/program");
    await expect(page).toHaveURL(/\/login/);
  });
});
