import { test, expect } from "@playwright/test";

test.describe("preview hygiene (AU-03)", () => {
  test("/terms returns 200", async ({ request }) => {
    const res = await request.get("/terms");
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain("Terms of Service");
  });

  test("/privacy returns 200", async ({ request }) => {
    const res = await request.get("/privacy");
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain("Privacy Policy");
  });

  test("/voices redirects to movement-voices", async ({ request }) => {
    const res = await request.get("/voices", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toMatch(/\/agent\/movement-voices$/);
  });
});
