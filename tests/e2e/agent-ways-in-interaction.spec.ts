import { expect, test } from "@playwright/test";

test.describe("Agent ways-in panel interactions", () => {
  test("expanded ways-in doors and composer work after opening", async ({ page }) => {
    await page.goto("/agent");
    await expect(page.getByRole("button", { name: "Expand drawer" })).toBeVisible({
      timeout: 15000,
    });
    await page.getByRole("button", { name: "Expand drawer" }).click();
    await expect(page.getByRole("dialog", { name: "Agent conversation" })).toBeVisible();

    const input = page.locator("#composer-input");
    await input.click();
    await input.fill("hello from ways-in test");
    await expect(input).toHaveValue("hello from ways-in test");

    const leadDoor = page.getByRole("button", { name: "Map where we actually stand" });
    await expect(leadDoor).toBeEnabled();
    await leadDoor.click();
    await expect(page.getByText("Let's find your simplest next step.")).toBeVisible({
      timeout: 8000,
    });
  });

  test("ways-in conversation door sends message", async ({ page }) => {
    await page.route("**/api/agent-room/turn", (route) => {
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
    const door = page.getByRole("button", {
      name: "We're already using AI and honestly it's a mess.",
    });
    await expect(door).toBeEnabled();
    await door.click();
    await expect(page.getByText("Mock agent reply.")).toBeVisible({ timeout: 8000 });
  });
});
