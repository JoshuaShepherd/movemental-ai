import { expect, test, type Page } from "@playwright/test";

import { AGENT_HOME_H1, waitForAgentOpeningReady } from "./agent-room-helpers";

const STREAM_PATH = "**/api/agent-room/turn";
const PRICING_REFUSAL_HEADING = "What this pricing refuses";

async function waitForComposerEnabled(page: Page) {
  await waitForAgentOpeningReady(page);
  const input = page.locator("#composer-input");
  await expect(input).toBeEnabled({ timeout: 15000 });
  return input;
}

async function mockAgentReply(page: Page, delta: string) {
  await page.route(STREAM_PATH, (route) => {
    route.fulfill({
      status: 200,
      contentType: "text/event-stream",
      body: `data: {"type":"text_delta","delta":${JSON.stringify(delta)}}\n\ndata: [DONE]\n\n`,
    });
  });
}

test.describe("Agent home dock (hybrid default)", () => {
  test("composer accepts typing after opening choreography", async ({ page }) => {
    await page.goto("/agent");
    const input = await waitForComposerEnabled(page);
    await input.click();
    await input.fill("Hello from Playwright");
    await expect(input).toHaveValue("Hello from Playwright");
  });

  test("submitting typed text expands the conversation dock", async ({ page }) => {
    await mockAgentReply(page, "Thanks for reaching out.");
    await page.goto("/agent");
    const input = await waitForComposerEnabled(page);
    await input.fill("xyzzy plugh unexpected donor workflow question");
    await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible({
      timeout: 8000,
    });
    await expect(page.getByText("Thanks for reaching out.")).toBeVisible({ timeout: 8000 });
  });

  test("lead chip runs local safety flow without calling the agent", async ({ page }) => {
    const streamCalls: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
    });
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "Get a clear next AI step" }).click();
    await expect(page.getByText("Let's find your simplest next step.")).toBeVisible({
      timeout: 8000,
    });
    expect(streamCalls).toEqual([]);
  });

  test("agent reply renders in thread only, not collapsed voice band", async ({ page }) => {
    await mockAgentReply(page, "Thanks for reaching out.");
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "About Movemental" }).click();
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible({
      timeout: 8000,
    });
    await expect(page.getByText("Thanks for reaching out.")).toBeVisible({ timeout: 8000 });
    const voiceBand = page.locator(".handwritingStrip");
    await expect(voiceBand).toHaveCount(0);
  });

  test("cost chip chats instead of swapping to the full pricing screen", async ({ page }) => {
    await mockAgentReply(
      page,
      "Pricing scales with organization size and the pathway you choose.",
    );
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await expect(page.getByRole("heading", { level: 1, name: AGENT_HOME_H1 })).toBeVisible();
    await page.getByRole("button", { name: "What does it cost?" }).click();
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible({
      timeout: 8000,
    });
    await expect(page.getByText("Pricing scales with organization size")).toBeVisible({
      timeout: 8000,
    });
    await expect(page.getByText(PRICING_REFUSAL_HEADING)).not.toBeVisible();
  });

  test("about chip chats instead of swapping to the about screen", async ({ page }) => {
    await mockAgentReply(page, "Movemental helps mission-driven organizations meet AI safely.");
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "About Movemental" }).click();
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible({
      timeout: 8000,
    });
    await expect(page.getByText("Movemental helps mission-driven organizations")).toBeVisible({
      timeout: 8000,
    });
    await expect(page.getByText("Here's the short version")).not.toBeVisible();
  });

  test("first typed message can still open a local screen (whole path)", async ({ page }) => {
    await page.goto("/agent");
    const input = await waitForComposerEnabled(page);
    await input.fill("show me the whole path");
    await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("One ordered path. It starts with Safety.")).toBeVisible({
      timeout: 8000,
    });
  });

  test("scene follow-up chip opens safety from path screen", async ({ page }) => {
    await page.goto("/agent");
    const input = await waitForComposerEnabled(page);
    await input.fill("show me the whole path");
    await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("One ordered path. It starts with Safety.")).toBeVisible({
      timeout: 8000,
    });
    await page.getByRole("button", { name: "Show me Safety" }).click();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Your team is already using AI/i,
      }),
    ).toBeVisible({ timeout: 8000 });
  });

  test("expand handle opens conversation panel", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "Expand drawer" }).click();
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible();
    await expect(page.getByText("Where would you like to start?")).toBeVisible();
  });

  test("replay resets to home opening", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "Get a clear next AI step" }).click();
    await expect(page.getByText("Let's find your simplest next step.")).toBeVisible({
      timeout: 8000,
    });
    await page.getByRole("button", { name: "Home" }).click();
    await waitForAgentOpeningReady(page);
    await expect(page.getByRole("heading", { level: 1, name: AGENT_HOME_H1 })).toBeVisible();
  });
});
