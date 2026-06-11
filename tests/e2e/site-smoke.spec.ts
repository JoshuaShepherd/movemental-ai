import { expect, test } from "@playwright/test";

/**
 * Public route smoke — scroll each page, fail on console errors or horizontal overflow.
 *
 *   PW_CHROMIUM_PATH=… pnpm test:e2e tests/e2e/site-smoke.spec.ts
 */
const PUBLIC_ROUTES = [
  "/",
  "/agent",
  "/field-guide",
  "/assess",
  "/enroll",
  "/login",
  "/forgot-password",
  "/newsletter/confirmed",
  "/newsletter/unsubscribed",
  "/welcome",
] as const;

test.describe("public site smoke", () => {
  for (const path of PUBLIC_ROUTES) {
    test(`${path} loads without console errors or horizontal overflow`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });

      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(res?.ok(), `${path} should return 2xx`).toBeTruthy();

      await page.waitForTimeout(path === "/agent" ? 2200 : 600);

      // Scroll through the full document (or agent shell zones).
      await page.evaluate(async () => {
        const step = Math.max(window.innerHeight * 0.85, 320);
        const max = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
        );
        for (let y = 0; y <= max; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo(0, 0);
      });

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 2;
      });
      expect(overflow, `${path} should not overflow horizontally`).toBe(false);

      const ignorable = /favicon|Failed to load resource|404.*\.(png|webp|ico)/i;
      const errors = consoleErrors.filter((e) => !ignorable.test(e));
      expect(errors, `${path} console errors`).toEqual([]);
    });
  }
});
