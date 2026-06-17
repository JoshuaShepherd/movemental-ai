import { expect, type Page } from "@playwright/test";

/** Home screen H1 on `/agent` (HomeScreen + no-JS fallback). */
export const AGENT_HOME_H1 = /Navigate AI without eroding the trust/i;

/** Waits until opening choreography finishes and suggestion chips are tappable. */
export async function waitForAgentOpeningReady(page: Page, timeout = 15000) {
  await expect(page.locator(".ink-band-surface").first()).toBeVisible({ timeout });
  await expect(page.getByRole("button", { name: "Get a clear next AI step" })).toBeVisible({
    timeout,
  });
}
