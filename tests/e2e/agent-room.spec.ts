import { expect, test, type Page } from "@playwright/test";

/**
 * INT-07 — Agent Room E2E: live happy-path + graceful fallback + stub offline.
 *
 * Gated (Playwright has no browser build on some hosts):
 *   RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
 *
 * Mode-aware. The room's mode is build-inlined (`NEXT_PUBLIC_AGENT_ROOM_MODE`),
 * so each block runs only against a server in the matching mode. Tell the spec
 * which mode the (reused) dev server is in via AGENT_ROOM_TEST_MODE (default
 * "stub"):
 *   - stub  : AGENT_ROOM_TEST_MODE=stub   (server started without the flag)
 *   - stream: AGENT_ROOM_TEST_MODE=stream NEXT_PUBLIC_AGENT_ROOM_MODE=stream pnpm dev
 *
 * The live block additionally probes the engine and skips if unreachable, so CI
 * without the engine still runs the stub + fallback blocks.
 */
const RUN = process.env.RUN_AGENT_ROOM_E2E === "1";
const MODE = process.env.AGENT_ROOM_TEST_MODE === "stream" ? "stream" : "stub";
const STREAM_PATH = "**/api/agent-room/stream";
const ENGINE_PROBE = (process.env.AI_AGENTS_BASE_URL ?? "http://localhost:3001") + "/api/agents/models";

async function send(page: Page, text: string) {
  const input = page.getByRole("textbox", { name: "Talk to Movemental" });
  await input.fill(text);
  await input.press("Enter");
}

test.describe("Agent Room", () => {
  test.skip(!RUN, "Set RUN_AGENT_ROOM_E2E=1 to enable");

  // ── Stub mode: the permanent offline fallback — zero network on load ──────
  test.describe("stub (offline)", () => {
    test.skip(MODE !== "stub", "Server must be in stub mode (AGENT_ROOM_TEST_MODE=stub)");

    test("loads the Ink Band surface and never calls the stream", async ({ page }) => {
      const streamCalls: string[] = [];
      page.on("request", (r) => {
        if (r.url().includes("/api/agent-room/stream")) streamCalls.push(r.url());
      });
      await page.goto("/agent");
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
      // The opening scene plays locally; give it a beat, then assert no network.
      await page.waitForTimeout(2500);
      expect(streamCalls, "stub mode must make zero stream calls").toEqual([]);
    });
  });

  // ── Stream mode: graceful fallback (route-mocked, no real engine needed) ──
  test.describe("stream fallback", () => {
    test.skip(MODE !== "stream", "Server must be in stream mode (AGENT_ROOM_TEST_MODE=stream)");

    test("engine not configured (503) → honest error voice, never blank", async ({ page }) => {
      await page.route(STREAM_PATH, (route) =>
        route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({ error: "Agent Room engine is not configured" }),
        }),
      );
      await page.goto("/agent");
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
      await send(page, "What is Movemental?");
      await expect(page.getByText("Agent Room engine is not configured")).toBeVisible();
      // The room is still alive (not a blank crash).
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
    });

    test("engine down (502) → error voice; room survives", async ({ page }) => {
      await page.route(STREAM_PATH, (route) =>
        route.fulfill({
          status: 502,
          contentType: "application/json",
          body: JSON.stringify({ error: "Agent Room engine unreachable" }),
        }),
      );
      await page.goto("/agent");
      await send(page, "hello");
      await expect(page.getByText("Agent Room engine unreachable")).toBeVisible();
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
    });

    test("malformed SSE chunks are dropped; no crash", async ({ page }) => {
      await page.route(STREAM_PATH, (route) =>
        route.fulfill({
          status: 200,
          contentType: "text/event-stream",
          body: "data: not-json\n\ndata: {\"type\":\"bogus\"}\n\ndata: [DONE]\n\n",
        }),
      );
      await page.goto("/agent");
      await send(page, "hello");
      // Bad frames are swallowed; the surface is still standing after the turn.
      await page.waitForTimeout(1500);
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
    });
  });

  // ── Stream mode + live engine: the real happy-path ────────────────────────
  test.describe("live (engine up)", () => {
    test.skip(MODE !== "stream", "Server must be in stream mode (AGENT_ROOM_TEST_MODE=stream)");

    test.beforeAll(async () => {
      let ok = false;
      try {
        const res = await fetch(ENGINE_PROBE, { signal: AbortSignal.timeout(4000) });
        ok = res.ok;
      } catch {
        ok = false;
      }
      test.skip(!ok, `Engine not reachable at ${ENGINE_PROBE}`);
    });

    test("a reality-check turn renders the Ink Band beat screen", async ({ page }) => {
      test.setTimeout(90_000); // a real LLM turn (Haiku + tool call) can take 10-30s
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      await page.goto("/agent");
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
      await send(page, "Yes, walk me through the reality check now.");
      // Proxy → engine → render_beat → ui_render(beat) → Ink Band beat (#opts).
      await expect(page.locator("#opts")).toBeVisible({ timeout: 45_000 });
      expect(errors, "no console errors during a live turn").toEqual([]);
    });
  });
});
