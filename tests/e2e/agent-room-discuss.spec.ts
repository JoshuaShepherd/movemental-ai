import { expect, test } from "@playwright/test";

/**
 * Discuss phase — flag-gated E2E.
 * Phase affects engine behavior only; layout is collapsed/expanded (SSOT §5).
 *
 * RUN_AGENT_ROOM_E2E=1 NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts
 */
const RUN = process.env.RUN_AGENT_ROOM_E2E === "1";
const DISCUSS = process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS === "1";

test.describe("Agent Room Discuss phase", () => {
  test.skip(!RUN || !DISCUSS, "Set RUN_AGENT_ROOM_E2E=1 and NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1");

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

    // Discuss phase does not force a separate layout — no multi-line voice band.
    await expect(page.locator(".handwritingStrip .vlineWrap")).toHaveCount(0);
    await expect(page.locator(".voiceDiscuss")).toHaveCount(0);
  });

  test("flag off keeps Guide layout without expanded dock", async ({ page }) => {
    test.skip(process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS === "1", "Only when discuss flag is off");
    await page.goto("/agent");
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toHaveCount(0);
  });
});
