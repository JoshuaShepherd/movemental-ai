import { expect, test, type Page } from "@playwright/test";

import { waitForAgentOpeningReady } from "./agent-room-helpers";

const DISCUSS = process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS === "1";
const LIVE_ENGINE = process.env.RUN_AGENT_ROOM_EE === "1";
const STREAM_PATH = "**/api/agent-room/turn";

async function mockAgentTurn(page: Page, delta: string) {
  await page.route(STREAM_PATH, (route) => {
    route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      body: `data: {"type":"text_delta","delta":${JSON.stringify(delta)}}\n\ndata: [DONE]\n\n`,
    });
  });
}

test.describe("Agent Room Discuss phase (AU-09)", () => {
  test.skip(!DISCUSS, "Set NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1");

  test("dev seam enters discuss without band stacking", async ({ page }) => {
    await page.goto("/agent");
    await page.waitForTimeout(1500);

    await page.evaluate(() => {
      (
        window as unknown as {
          __agentRoomDiscuss?: { enter: () => void };
        }
      ).__agentRoomDiscuss?.enter();
    });

    await expect(page.locator(".handwritingStrip .vlineWrap")).toHaveCount(0);
    await expect(page.locator(".voiceDiscuss")).toHaveCount(0);
  });

  test("typed discuss turn sends phase=discuss to /turn (mocked)", async ({ page }) => {
    test.skip(LIVE_ENGINE, "Mock-only test — unset RUN_AGENT_ROOM_EE");

    const phases: string[] = [];
    await page.route(STREAM_PATH, async (route) => {
      const body = route.request().postDataJSON() as { phase?: string };
      if (body.phase) phases.push(body.phase);
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: `data: {"type":"text_delta","delta":"Discuss reply one."}\n\ndata: [DONE]\n\n`,
      });
    });

    await page.goto("/agent");
    await waitForAgentOpeningReady(page);

    await page.evaluate(() => {
      (
        window as unknown as {
          __agentRoomDiscuss?: { enter: () => void };
        }
      ).__agentRoomDiscuss?.enter();
    });

    const input = page.locator("#composer-input");
    await input.fill("Our board keeps asking what our AI policy should cover.");
    await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("Discuss reply one.")).toBeVisible({ timeout: 12000 });
    expect(phases).toContain("discuss");
  });

  test("turn cap surfaces discuss capture (mocked hybrid)", async ({ page }) => {
    test.skip(LIVE_ENGINE, "Mock-only test — unset RUN_AGENT_ROOM_EE");
    test.skip(
      Number(process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP ?? "7") > 2,
      "Set NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP=2 for cap test",
    );

    let reply = 0;
    await page.route(STREAM_PATH, (route) => {
      reply += 1;
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: `data: {"type":"text_delta","delta":"Discuss reply ${reply}."}\n\ndata: [DONE]\n\n`,
      });
    });

    await page.goto("/agent");
    await waitForAgentOpeningReady(page);

    await page.evaluate(() => {
      (
        window as unknown as {
          __agentRoomDiscuss?: { enter: () => void };
        }
      ).__agentRoomDiscuss?.enter();
    });

    const input = page.locator("#composer-input");
    for (let i = 1; i <= 2; i += 1) {
      await input.fill(`Follow-up question ${i}`);
      await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
      await expect(page.getByText(`Discuss reply ${i}.`)).toBeVisible({ timeout: 12000 });
    }

    await expect(
      page.getByText("Want me to have the team pick this up with you?"),
    ).toBeVisible({ timeout: 8000 });
  });

  test("discuss capture POST hits /api/agent-room/capture (mocked)", async ({ page }) => {
    test.skip(LIVE_ENGINE, "Mock-only test — unset RUN_AGENT_ROOM_EE");
    test.skip(
      Number(process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP ?? "7") > 1,
      "Set NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP=1 for capture POST test",
    );

    await page.route(STREAM_PATH, (route) => {
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: `data: {"type":"text_delta","delta":"One discuss reply."}\n\ndata: [DONE]\n\n`,
      });
    });

    let captureBody: Record<string, unknown> | null = null;
    await page.route("**/api/agent-room/capture", async (route) => {
      captureBody = route.request().postDataJSON() as Record<string, unknown>;
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });

    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.evaluate(() => {
      (
        window as unknown as {
          __agentRoomDiscuss?: { enter: () => void };
        }
      ).__agentRoomDiscuss?.enter();
    });

    const input = page.locator("#composer-input");
    await input.fill("We need a human to walk through this with us.");
    await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("One discuss reply.")).toBeVisible({ timeout: 12000 });

    await expect(
      page.getByText("Want me to have the team pick this up with you?"),
    ).toBeVisible({ timeout: 8000 });

    await page.locator("#cap-email").fill("leader@example.org");
    await page.getByRole("button", { name: "Send this to the team" }).click();
    await expect.poll(() => captureBody?.kind).toBe("discuss");
  });

  test("stub mode shows honest capture on discuss entry (no fake LLM)", async ({ page }) => {
    test.skip(process.env.NEXT_PUBLIC_AGENT_ROOM_MODE !== "stub", "Set NEXT_PUBLIC_AGENT_ROOM_MODE=stub");

    let turnCalls = 0;
    page.on("request", (r) => {
      if (r.url().includes("/api/agent-room/turn")) turnCalls += 1;
    });

    await page.goto("/agent");
    await page.waitForTimeout(1500);
    await page.evaluate(() => {
      (
        window as unknown as {
          __agentRoomDiscuss?: { enter: () => void };
        }
      ).__agentRoomDiscuss?.enter();
    });

    await expect(page.getByText(/deserve\*\*s\*\* a real conversation/i)).toBeVisible({
      timeout: 8000,
    });
    await expect(
      page.getByText("Want me to have the team pick this up with you?"),
    ).toBeVisible();
    expect(turnCalls).toBe(0);
  });

  test("flag off keeps Guide layout without expanded dock", async ({ page }) => {
    test.skip(DISCUSS, "Only when discuss flag is off");
    await page.goto("/agent");
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toHaveCount(0);
  });
});
