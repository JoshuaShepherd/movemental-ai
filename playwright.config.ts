import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 4,
  reporter: "html",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Opt-in: point at a cached chromium when Playwright can't install its
        // own build (e.g. unsupported distro). Unset → default managed browser.
        ...(process.env.PW_CHROMIUM_PATH
          ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
          : {}),
      },
    },
  ],
  webServer: process.env.CI
    ? undefined
    : {
        command: "pnpm dev",
        url: "http://localhost:3000",
        reuseExistingServer:
          !process.env.CI &&
          !process.env.NEXT_PUBLIC_AGENT_ROOM_DISCUSS &&
          !process.env.NEXT_PUBLIC_AGENT_ROOM_MODE,
        timeout: 120000,
        env: Object.fromEntries(
          Object.entries(process.env).filter(
            (entry): entry is [string, string] => typeof entry[1] === "string",
          ),
        ),
      },
});
