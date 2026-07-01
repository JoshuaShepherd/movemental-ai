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

  test("/voices is the canonical trusted-voices hub", async ({ request }) => {
    const res = await request.get("/voices");
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain("Trusted voices");
  });

  test("/agent/movement-voices redirects to /voices", async ({ request }) => {
    const res = await request.get("/agent/movement-voices", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers().location).toMatch(/\/voices$/);
  });
});
