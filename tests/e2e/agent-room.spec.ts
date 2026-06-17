import { expect, test, type Page } from "@playwright/test";

import { waitForAgentOpeningReady } from "./agent-room-helpers";

/**
 * INT-07 — Agent Room E2E: live happy-path + graceful fallback + stub offline.
 *
 * Gated (Playwright has no browser build on some hosts):
 *   RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
 *
 * Mode-aware. The room's mode is build-inlined (`NEXT_PUBLIC_AGENT_ROOM_MODE`),
 * so each block runs only against a server in the matching mode. Tell the spec
 * which mode the (reused) dev server is in via AGENT_ROOM_TEST_MODE (default
 * "hybrid"):
 *   - hybrid: AGENT_ROOM_TEST_MODE=hybrid or unset (server default)
 *   - stub  : AGENT_ROOM_TEST_MODE=stub NEXT_PUBLIC_AGENT_ROOM_MODE=stub
 *   - stream: AGENT_ROOM_TEST_MODE=stream NEXT_PUBLIC_AGENT_ROOM_MODE=stream
 *
 * The live block additionally probes the engine and skips if unreachable, so CI
 * without the engine still runs the stub + fallback blocks.
 */
const RUN = process.env.RUN_AGENT_ROOM_E2E === "1";
const MODE =
  process.env.AGENT_ROOM_TEST_MODE === "stream"
    ? "stream"
    : process.env.AGENT_ROOM_TEST_MODE === "stub"
      ? "stub"
      : "hybrid";
const STREAM_PATH = "**/api/agent-room/turn";
const ENGINE_PROBE = (process.env.AI_AGENTS_BASE_URL ?? "http://localhost:3001") + "/api/agents/models";

async function send(page: Page, text: string) {
  const input = page.getByRole("textbox", { name: "Talk to Movemental" });
  await input.fill(text);
  await page.getByRole("button", { name: "Send" }).click();
}

test.describe("Agent Room", () => {
  test.skip(!RUN, "Set RUN_AGENT_ROOM_E2E=1 to enable");

  // ── Hybrid mode (default): local script + agent on open text ─────────────
  test.describe("hybrid (default)", () => {
    test.skip(MODE !== "hybrid", "Server must be in hybrid mode (default dev server)");

    test("loads with opening voice and zero stream calls", async ({ page }) => {
      const streamCalls: string[] = [];
      page.on("request", (r) => {
        if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
      });
      await page.goto("/agent");
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
      await waitForAgentOpeningReady(page, 3500);
      expect(streamCalls, "hybrid load must not call stream").toEqual([]);
    });

    test("lead chip opens safety flow with one-question voice", async ({ page }) => {
      const streamCalls: string[] = [];
      page.on("request", (r) => {
        if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
      });
      await page.goto("/agent");
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Get a clear next AI step" }).click();
      await expect(page.getByText("Let's find your simplest next step.")).toBeVisible({
        timeout: 3500,
      });
      await expect(
        page.getByText("One question. Then we'll show you exactly where you stand"),
      ).toBeVisible({ timeout: 3500 });
      expect(streamCalls, "cold on-ramp is local in hybrid").toEqual([]);
    });

    test("unmatched typed input POSTs to stream (mocked)", async ({ page }) => {
      let posted = false;
      await page.route(STREAM_PATH, (route) => {
        posted = true;
        route.fulfill({
          status: 200,
          contentType: "text/event-stream",
          body: 'data: {"type":"text_delta","delta":"Thanks for asking."}\n\ndata: [DONE]\n\n',
        });
      });
      await page.goto("/agent");
      await waitForAgentOpeningReady(page);
      // Avoid meta/objection phrasing ("our board…") which routes to discussOffer locally.
      await send(page, "xyzzy plugh unexpected donor workflow question");
      await expect.poll(() => posted).toBe(true);
    });

    test("long streamed reply wraps inside the voice band after commit", async ({ page }) => {
      const long =
        "Movemental helps leaders steward AI with clarity, safety, and formation — not as a shortcut past discernment but as infrastructure that keeps your voice, your corpus, and your community aligned over time.";
      await page.route(STREAM_PATH, (route) => {
        route.fulfill({
          status: 200,
          contentType: "text/event-stream",
          body: `data: {"type":"text_delta","delta":${JSON.stringify(long)}}\n\ndata: [DONE]\n\n`,
        });
      });
      await page.goto("/agent");
      await waitForAgentOpeningReady(page);
      await send(page, "xyzzy plugh unexpected donor workflow question");
      await expect(page.getByText(long.slice(0, 40))).toBeVisible({ timeout: 8000 });

      const fits = await page.evaluate(() => {
        const voice = document.querySelector(".ink-band-surface [aria-live='polite']");
        if (!voice) return false;
        const line = voice.querySelector("[class*='vline']");
        if (!line) return false;
        const style = window.getComputedStyle(line);
        if (style.whiteSpace !== "normal") return false;
        const voiceRect = voice.getBoundingClientRect();
        const lineRect = line.getBoundingClientRect();
        return lineRect.right <= voiceRect.right + 2 && lineRect.left >= voiceRect.left - 2;
      });
      expect(fits, "committed voice line should stay inside the voice band").toBe(true);
    });
  });

  // ── Stub mode: the permanent offline fallback — zero network on load ──────
  test.describe("stub (offline)", () => {
    test.skip(MODE !== "stub", "Server must be in stub mode (AGENT_ROOM_TEST_MODE=stub)");

    test("loads the Ink Band surface and never calls the stream", async ({ page }) => {
      const streamCalls: string[] = [];
      page.on("request", (r) => {
        if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
      });
      await page.goto("/agent");
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
      // The opening scene plays locally; give it a beat, then assert no network.
      await page.waitForTimeout(2500);
      expect(streamCalls, "stub mode must make zero stream calls").toEqual([]);
    });
  });

  // ── Stream mode: local opening choreography (no engine) ───────────────────
  test.describe("stream local opening", () => {
    test.skip(MODE !== "stream", "Server must be in stream mode (AGENT_ROOM_TEST_MODE=stream)");

    test("load plays opening voice with zero stream calls", async ({ page }) => {
      const streamCalls: string[] = [];
      page.on("request", (r) => {
        if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
      });
      await page.goto("/agent");
      await expect(page.locator(".ink-band-surface").first()).toBeVisible();
      await waitForAgentOpeningReady(page, 3500);
      expect(streamCalls, "opening choreography must not call stream").toEqual([]);
    });

    test("lead chip opens safety flow with one-question voice", async ({ page }) => {
      const streamCalls: string[] = [];
      page.on("request", (r) => {
        if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
      });
      await page.goto("/agent");
      await page.waitForTimeout(2000);
      await page.getByRole("button", { name: "Get a clear next AI step" }).click();
      await expect(page.getByText("Let's find your simplest next step.")).toBeVisible({
        timeout: 3500,
      });
      await expect(
        page.getByText("One question. Then we'll show you exactly where you stand"),
      ).toBeVisible({ timeout: 3500 });
      expect(streamCalls, "cold on-ramp is local — no stream yet").toEqual([]);
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
