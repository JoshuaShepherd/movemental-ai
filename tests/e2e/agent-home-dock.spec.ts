import { expect, test, type Page } from "@playwright/test";

import { AGENT_HOME_H1, waitForAgentOpeningReady, clickFloatChip } from "./agent-room-helpers";

const STREAM_PATH = "**/api/agent-room/turn";
const PRICING_HEADING = "Pricing.";

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
    await expect(
      page.getByRole("heading", { level: 1, name: "Let's find your simplest next step." }),
    ).toBeVisible({
      timeout: 8000,
    });
    expect(streamCalls).toEqual([]);
  });

  test("cost chip opens pricing screen without expanding conversation", async ({ page }) => {
    const streamCalls: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
    });
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await expect(page.getByRole("heading", { level: 1, name: AGENT_HOME_H1 })).toBeVisible();
    await page.getByRole("button", { name: "What does it cost?" }).click();
    await expect(page.getByRole("heading", { level: 1, name: PRICING_HEADING })).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).not.toBeVisible();
    expect(streamCalls).toEqual([]);
  });

  test("about chip opens about screen without expanding conversation", async ({ page }) => {
    const streamCalls: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
    });
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "About Movemental" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "About Movemental" }),
    ).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).not.toBeVisible();
    expect(streamCalls).toEqual([]);
  });

  test("get in touch chip opens contact screen without expanding conversation", async ({
    page,
  }) => {
    const streamCalls: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
    });
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "Get in touch" }).click();
    await expect(
      page.getByText("Tell us a bit about your organization"),
    ).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).not.toBeVisible();
    expect(streamCalls).toEqual([]);
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
    await clickFloatChip(page, "Show me Safety");
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

  test("collapsed dock shows visitor affordance legend", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await expect(page.getByText("Tap a suggestion to open a page.")).toBeVisible();
  });

  test("replay resets to home opening", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "Get a clear next AI step" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Let's find your simplest next step." }),
    ).toBeVisible({
      timeout: 8000,
    });
    await page.getByRole("button", { name: "Home" }).click();
    await waitForAgentOpeningReady(page);
    await expect(page.getByRole("heading", { level: 1, name: AGENT_HOME_H1 })).toBeVisible();
  });

  test("trusted voices carousel advances on next", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await expect(page.getByText("Trusted voices")).toBeVisible();
    await expect(page.getByText("1 / 17")).toBeVisible();
    await page.getByRole("button", { name: /Next leader/ }).click();
    await expect(page.getByText("2 / 17")).toBeVisible();
  });

  test("cost chip shows Safety tier pricing from SSOT", async ({ page }) => {
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    await page.getByRole("button", { name: "What does it cost?" }).click();
    await expect(page.getByRole("heading", { level: 1, name: PRICING_HEADING })).toBeVisible({
      timeout: 8000,
    });
    await expect(page.getByRole("group", { name: "Pricing by stage" }).getByText("$1,000 · two weeks, start to finish")).toBeVisible();
    await expect(page.getByRole("group", { name: "Pricing by stage" }).getByText("Ratify your AI Charter before anything else.")).toBeVisible();
  });

  test("document ask handoff forces AGENT on first turn", async ({ page }) => {
    const streamCalls: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes("/api/agent-room/turn")) streamCalls.push(r.url());
    });
    await page.route(STREAM_PATH, (route) => {
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: `data: {"type":"text_delta","delta":"Handoff pricing overview."}\n\ndata: [DONE]\n\n`,
      });
    });

    await page.goto("/agent?ask=What%20does%20it%20cost%3F&from=nonprofits");
    await expect(page.getByText("Handoff pricing overview.")).toBeVisible({ timeout: 15000 });
    expect(streamCalls.length).toBeGreaterThanOrEqual(1);
    await expect(page.getByRole("heading", { level: 1, name: "Pricing." })).not.toBeVisible();
  });

  test("engine ui_render safety flow charter step is visible (AU-21)", async ({ page }) => {
    await page.route(STREAM_PATH, (route) => {
      route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body:
          'data: {"type":"ui_render","surface":"screen","component":"safetyFlow","props":{"step":"charter"}}\n\n' +
          "data: [DONE]\n\n",
      });
    });
    await page.goto("/agent");
    await waitForAgentOpeningReady(page);
    const input = await waitForComposerEnabled(page);
    await input.fill("xyzzy plugh unexpected donor workflow question");
    await page.locator("#composer-form").getByRole("button", { name: "Send" }).click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Write and ratify your AI Safety Charter." }),
    ).toBeVisible({ timeout: 8000 });
  });
});
