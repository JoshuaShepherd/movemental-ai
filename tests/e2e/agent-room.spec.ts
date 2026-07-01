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
 *
 * Stream mode is deprecated (AU-20) — legacy stream blocks removed; hybrid covers
 * the same graceful-fallback and live-engine probes.
 */
const RUN = process.env.RUN_AGENT_ROOM_E2E === "1";
const MODE =
  process.env.AGENT_ROOM_TEST_MODE === "stub" ? "stub" : "hybrid";
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
      await expect(
        page.getByRole("heading", { level: 1, name: "Let's find your simplest next step." }),
      ).toBeVisible({
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

    test("tool-only turn keeps assistant message in expanded thread", async ({ page }) => {
      await page.route(STREAM_PATH, (route) => {
        route.fulfill({
          status: 200,
          contentType: "text/event-stream",
          body: [
            'data: {"type":"text_delta","delta":"Let me show you that."}\n\n',
            'data: {"type":"tool_call","id":"t1","name":"render_beat","input":{}}\n\n',
            'data: {"type":"ui_render","surface":"screen","component":"beat","props":{"org_kind":"church","step":1,"total":6}}\n\n',
            "data: [DONE]\n\n",
          ].join(""),
        });
      });
      await page.goto("/agent");
      await waitForAgentOpeningReady(page);
      await send(page, "xyzzy plugh unexpected donor workflow question");
      await expect(page.getByText("Let me show you that.")).toBeVisible({ timeout: 8000 });
    });

    test("streamed reply shows thinking status before first delta", async ({ page }) => {
      await page.route(STREAM_PATH, async (route) => {
        await new Promise((r) => setTimeout(r, 400));
        route.fulfill({
          status: 200,
          contentType: "text/event-stream",
          body: [
            'data: {"type":"progress","phase":"thinking"}\n\n',
            'data: {"type":"text_delta","delta":"Here is the answer."}\n\n',
            "data: [DONE]\n\n",
          ].join(""),
        });
      });
      await page.goto("/agent");
      await waitForAgentOpeningReady(page);
      await send(page, "xyzzy plugh unexpected donor workflow question");
      await expect(page.getByRole("status")).toContainText(/Thinking|Reading your question/i, {
        timeout: 5000,
      });
      await expect(page.getByText("Here is the answer.")).toBeVisible({ timeout: 8000 });
    });

    test("long streamed reply wraps inside the conversation thread after commit", async ({
      page,
    }) => {
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
      await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible({
        timeout: 8000,
      });
      await expect(page.getByText(long.slice(0, 40))).toBeVisible({ timeout: 8000 });

      const fits = await page.evaluate((snippet) => {
        const thread = document.querySelector("#card-thread");
        if (!thread) return false;
        const inner = thread.querySelector("[class*='cardThreadInner']") ?? thread;
        const prose = Array.from(thread.querySelectorAll("p")).find((p) =>
          p.textContent?.includes(snippet),
        );
        if (!prose) return false;
        const style = window.getComputedStyle(prose);
        if (style.whiteSpace === "nowrap") return false;
        const containerRect = inner.getBoundingClientRect();
        const proseRect = prose.getBoundingClientRect();
        return (
          proseRect.right <= containerRect.right + 2 &&
          proseRect.left >= containerRect.left - 2 &&
          prose.scrollHeight > parseFloat(style.lineHeight) * 1.5
        );
      }, long.slice(0, 40));
      expect(fits, "committed reply should wrap inside the conversation thread").toBe(true);
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

  // ── Hybrid graceful fallback (route-mocked, no real engine needed) ──────
  test.describe("hybrid fallback", () => {
    test.skip(MODE !== "hybrid", "Server must be in hybrid mode (default dev server)");

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
      await waitForAgentOpeningReady(page);
      await send(page, "xyzzy plugh unexpected donor workflow question");
      await expect(page.getByText("Agent Room engine is not configured")).toBeVisible({
        timeout: 8000,
      });
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
      await waitForAgentOpeningReady(page);
      await send(page, "xyzzy plugh unexpected donor workflow question");
      await expect(page.getByText("Agent Room engine unreachable")).toBeVisible({
        timeout: 8000,
      });
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

  // ── Hybrid + live engine: the real happy-path ─────────────────────────────
  test.describe("live (engine up)", () => {
    test.skip(MODE !== "hybrid", "Server must be in hybrid mode (default dev server)");

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
