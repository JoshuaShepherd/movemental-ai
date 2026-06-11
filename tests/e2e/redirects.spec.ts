import { expect, test } from "@playwright/test";

/**
 * Legacy URL redirect smoke — ensures external/bookmarked paths land on live routes.
 *
 *   pnpm test:e2e tests/e2e/redirects.spec.ts
 */
const LEGACY_REDIRECTS: ReadonlyArray<{
  from: string;
  finalPath: RegExp;
}> = [
  { from: "/field-guides/safety", finalPath: /\/field-guide\/?(\?.*)?$/ },
  { from: "/field-guides/sandbox", finalPath: /\/field-guide(\?guide=sandbox)?$/ },
  { from: "/book", finalPath: /\/field-guide/ },
  { from: "/fragmentation", finalPath: /\/agent/ },
  { from: "/pathway/safety", finalPath: /\/field-guide/ },
  { from: "/pathway/sandbox", finalPath: /\/field-guide(\?guide=sandbox)?$/ },
  { from: "/organizations", finalPath: /\/enroll/ },
  { from: "/contact", finalPath: /\/agent/ },
  { from: "/team", finalPath: /\/agent/ },
];

test.describe("legacy redirects", () => {
  for (const { from, finalPath } of LEGACY_REDIRECTS) {
    test(`${from} resolves to a live route`, async ({ page }) => {
      const res = await page.goto(from, { waitUntil: "domcontentloaded" });
      expect(res?.ok(), `${from} should end on 2xx`).toBeTruthy();
      expect(page.url()).toMatch(finalPath);
    });
  }
});
