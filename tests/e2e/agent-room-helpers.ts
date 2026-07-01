import { expect, type Page } from "@playwright/test";

/** Home screen H1 on `/agent` (HomeScreen + no-JS fallback). */
export const AGENT_HOME_H1 = /Navigate AI without eroding the trust/i;

/** Dismiss the site-wide preview notice so agent-room viewport math is stable. */
export async function dismissSiteNotice(page: Page) {
  const dismiss = page.getByRole("button", { name: "Dismiss notice" });
  if (await dismiss.isVisible().catch(() => false)) {
    await dismiss.click();
  }
}

/** Click a collapsed-dock float chip without Playwright scrolling the stage over it. */
export async function clickFloatChip(page: Page, name: string | RegExp) {
  await page.locator("[data-agent-screen]").evaluate((el) => {
    el.scrollTop = 0;
  });
  const chip = page.locator("#float-chips").getByRole("button", { name });
  await expect(chip).toBeEnabled({ timeout: 15000 });
  await chip.evaluate((el) => {
    (el as HTMLButtonElement).click();
  });
}

/** Waits until opening choreography finishes and suggestion chips are tappable. */
export async function waitForAgentOpeningReady(page: Page, timeout = 15000) {
  await dismissSiteNotice(page);
  await expect(page.locator(".ink-band-surface").first()).toBeVisible({ timeout });
  await expect(page.getByRole("button", { name: "Get a clear next AI step" })).toBeVisible({
    timeout,
  });
}
