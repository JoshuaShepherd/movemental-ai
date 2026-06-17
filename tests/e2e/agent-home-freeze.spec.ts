import { expect, test } from "@playwright/test";

import { waitForAgentOpeningReady } from "./agent-room-helpers";

/**
 * Freeze / responsiveness regression — home (`/` → `/agent`).
 *
 *   pnpm test:e2e tests/e2e/agent-home-freeze.spec.ts
 */
test.describe("Agent home freeze regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const tasks = (window as unknown as { __longTasks?: number[] }).__longTasks ?? [];
          tasks.push(entry.duration);
          (window as unknown as { __longTasks: number[] }).__longTasks = tasks;
        }
      });
      obs.observe({ entryTypes: ["longtask"] });
    });
  });

  test("opening choreography finishes and chips become interactive", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/agent/);

    await waitForAgentOpeningReady(page, 20_000);

    const leadChip = page.getByRole("button", { name: "Get a clear next AI step" });
    await expect(leadChip).toBeEnabled();

    const send = page.locator("#composer-form").getByRole("button", { name: "Send" });
    await expect(send).toBeEnabled();

    const input = page.locator("#composer-input");
    await input.click();
    await input.fill("responsiveness probe");
    await expect(input).toHaveValue("responsiveness probe");
  });

  test("main thread recovers after load and carousel stress", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page, 20_000);

    const next = page.getByRole("button", { name: "Next leader" });
    for (let i = 0; i < 15; i += 1) {
      if (await next.isEnabled()) {
        await next.click();
      }
    }

    const prev = page.getByRole("button", { name: "Previous leader" });
    for (let i = 0; i < 8; i += 1) {
      if (await prev.isEnabled()) {
        await prev.click();
      }
    }

    // After opening settles, the UI must stay interactive (post-load jank is ok).
    await expect(page.getByRole("button", { name: "Get a clear next AI step" })).toBeEnabled();

    const rafLatencyMs = await page.evaluate(async () => {
      const start = performance.now();
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
      return performance.now() - start;
    });
    expect(rafLatencyMs, "double-rAF should complete quickly after stress").toBeLessThan(500);
  });

  test("mast home control does not leave UI stuck disabled", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page, 20_000);

    await page.getByRole("button", { name: "Get a clear next AI step" }).click();
    await expect(page.getByText("Let's find your simplest next step.")).toBeVisible({
      timeout: 8000,
    });

    await page.getByRole("button", { name: "Movemental, back to the start" }).click();
    await waitForAgentOpeningReady(page, 20_000);

    await expect(page.getByRole("button", { name: "Get a clear next AI step" })).toBeEnabled();
  });

  for (const vp of [
    { width: 390, height: 844, name: "mobile" },
    { width: 1280, height: 800, name: "desktop" },
  ]) {
    test(`opening finishes within 20s at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const started = Date.now();
      await page.goto("/");
      await waitForAgentOpeningReady(page, 20_000);
      expect(Date.now() - started).toBeLessThan(20_000);
      await expect(page.getByRole("button", { name: "Get a clear next AI step" })).toBeEnabled();
    });
  }

  test("expand dock during opening still unblocks interaction", async ({ page }) => {
    await page.goto("/agent");
    await page.getByRole("button", { name: "Expand drawer" }).click({ timeout: 5000 });
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible({
      timeout: 8000,
    });

    await expect
      .poll(
        async () => page.locator("#composer-input").isEnabled(),
        { timeout: 20_000, message: "composer should enable after opening even if dock expanded early" },
      )
      .toBe(true);
  });
});
