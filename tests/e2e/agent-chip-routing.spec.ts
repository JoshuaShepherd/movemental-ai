import { expect, test, type Page } from "@playwright/test";

import { waitForAgentOpeningReady } from "./agent-room-helpers";

const STREAM_PATH = "**/api/agent-room/turn";

async function assertZeroTurnCalls(page: Page, action: () => Promise<void>) {
  const streamCalls: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
  });
  await action();
  expect(streamCalls).toEqual([]);
}

test.describe("Agent chip routing matrix (AU-07)", () => {
  test("nonprofits doc chip handoffs to safety flow without /turn", async ({ page }) => {
    await page.goto("/agent/nonprofits");
    await expect(page.getByRole("button", { name: "What's the first step?" })).toBeVisible({
      timeout: 20000,
    });
    await assertZeroTurnCalls(page, async () => {
      await page.getByRole("button", { name: "What's the first step?" }).click();
      await expect(page).toHaveURL(/\/agent$/);
      await expect(
        page.getByRole("heading", { level: 1, name: "Let's find your simplest next step." }),
      ).toBeVisible({ timeout: 12000 });
    });
  });

  test("path follow-up Show me Safety stays local with zero /turn", async ({ page }) => {
    await page.goto("/agent");
    const input = page.locator("#composer-input");
    await waitForAgentOpeningReady(page);
    await input.fill("show me the whole path");
    await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("One ordered path. It starts with Safety.")).toBeVisible({
      timeout: 8000,
    });
    await assertZeroTurnCalls(page, async () => {
      await page.getByRole("button", { name: "Show me Safety" }).click();
      await expect(
        page.getByRole("heading", { level: 1, name: /Your team is already using AI/i }),
      ).toBeVisible({ timeout: 8000 });
    });
  });

  test("collapsed scene chip Map where we stand stays local", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "About Movemental" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "About Movemental" })).toBeVisible({
      timeout: 8000,
    });
    await assertZeroTurnCalls(page, async () => {
      await page.getByRole("button", { name: "Map where we actually stand" }).click();
      await expect(page.getByText("First — what kind of organization are you?")).toBeVisible({
        timeout: 12000,
      });
    });
  });

  test("expanded ways-in conversation door calls /turn", async ({ page }) => {
    let turnCalls = 0;
    await page.route(STREAM_PATH, (route) => {
      turnCalls += 1;
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: `data: {"type":"text_delta","delta":"Mock agent reply."}\n\ndata: [DONE]\n\n`,
      });
    });

    await page.goto("/agent");
    await page.getByRole("button", { name: "Expand drawer" }).click();
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible();

    await page.getByRole("tab", { name: "Non-profits" }).click();
    await page
      .getByRole("button", { name: "We're already using AI and honestly it's a mess." })
      .click();
    await expect(page.getByText("Mock agent reply.")).toBeVisible({ timeout: 8000 });
    expect(turnCalls).toBeGreaterThan(0);
  });
});
