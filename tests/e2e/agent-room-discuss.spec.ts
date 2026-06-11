import { expect, test, type Page } from "@playwright/test";

/**
 * Discuss overlay (Model C) — flag-gated E2E.
 *
 * RUN_AGENT_ROOM_E2E=1 NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts
 */
const RUN = process.env.RUN_AGENT_ROOM_E2E === "1";
const DISCUSS = process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS === "1";

test.describe("Agent Room Discuss overlay", () => {
  test.skip(!RUN || !DISCUSS, "Set RUN_AGENT_ROOM_E2E=1 and NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1");

  test("dev seam opens overlay and closes to fold", async ({ page }) => {
    await page.goto("/agent");
    await page.waitForTimeout(1500);

    await page.evaluate(() => {
      (
        window as unknown as {
          __agentRoomDiscuss?: { enter: () => void; append: (t: unknown) => void };
        }
      ).__agentRoomDiscuss?.enter();
      (
        window as unknown as {
          __agentRoomDiscuss?: { append: (t: unknown) => void };
        }
      ).__agentRoomDiscuss?.append({
        role: "user",
        content: "Test margin note",
        surface: "margin",
      });
    });

    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 3500 });
    await expect(page.getByRole("textbox", { name: "Talk to Movemental" })).toBeVisible();

    await page.getByRole("button", { name: "Close conversation" }).click();
    await expect(page.getByText("What we discussed")).toBeVisible({ timeout: 3500 });
  });

  test("flag off keeps Guide layout without overlay", async ({ page }) => {
    test.skip(process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS === "1", "Only when discuss flag is off");
    await page.goto("/agent");
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);
  });
});
