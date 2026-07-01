import { expect, test } from "@playwright/test";

import { waitForAgentOpeningReady } from "./agent-room-helpers";

for (const vp of [
  { width: 390, height: 844, name: "mobile" },
  { width: 1280, height: 800, name: "desktop" },
  { width: 1280, height: 640, name: "short-desktop" },
]) {
  test(`home fits viewport without scroll at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/agent");
    await waitForAgentOpeningReady(page, 20_000);

    const metrics = await page.evaluate(() => {
      const screen = document.querySelector("[data-agent-screen]") as HTMLElement | null;
      const imgs = Array.from(
        document.querySelectorAll("img[alt='']"),
      ) as HTMLImageElement[];
      const portraits = imgs.filter((img) =>
        img.closest("[class*='carPortrait']"),
      );
      const screenRect = screen?.getBoundingClientRect();
      const imgRects = portraits.slice(0, 3).map((img) => img.getBoundingClientRect());
      const dock = document.querySelector("[class*='agentDock']") as HTMLElement | null;
      const dockRect = dock?.getBoundingClientRect();
      return {
        screenScrollable: screen ? screen.scrollHeight > screen.clientHeight + 1 : null,
        screenOverflow: screen ? getComputedStyle(screen).overflowY : null,
        screenClientH: screen?.clientHeight ?? 0,
        screenScrollH: screen?.scrollHeight ?? 0,
        imgVisible: imgRects.map((r) => ({
          top: r.top,
          bottom: r.bottom,
          height: r.height,
          clipped:
            r.bottom > (dockRect?.top ?? window.innerHeight) ||
            r.top < (screenRect?.top ?? 0),
        })),
        dockTop: dockRect?.top ?? null,
        viewportH: window.innerHeight,
      };
    });

    expect(metrics.screenOverflow).toBe("hidden");
    expect(metrics.screenScrollable).toBe(false);
    expect(metrics.imgVisible.length).toBeGreaterThan(0);
    for (const img of metrics.imgVisible) {
      expect(img.clipped, `portrait clipped: ${JSON.stringify(img)}`).toBe(false);
      expect(img.height).toBeLessThanOrEqual(100);
    }
  });
}
