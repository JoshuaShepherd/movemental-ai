#!/usr/bin/env tsx
/**
 * Stillshot capture for docs/captures/platform-manifest.json.
 *
 *   pnpm captures:platform
 *   CAPTURE_BASE_URL=https://movemental.ai pnpm captures:platform
 *   CAPTURE_EMAIL=… CAPTURE_PASSWORD=… pnpm captures:platform
 *   pnpm captures:platform -- --only public,agent --id agent-opening
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { chromium, type Page } from "playwright";

type CaptureAction =
  | { type: "click"; role: "button" | "link"; name: string }
  | { type: "wait"; ms: number }
  | { type: "waitForText"; text: string };

type Shot = {
  id: string;
  group: string;
  file: string;
  path: string;
  fullPage: boolean;
  requiresAuth?: boolean;
  optional?: boolean;
  waitMs?: number;
  actions?: CaptureAction[];
};

type Manifest = {
  baseUrl: string;
  signInPath: string;
  outputDir: string;
  viewport: { width: number; height: number };
  shots: Shot[];
};

type RunRow = {
  id: string;
  group: string;
  path: string;
  file: string;
  status: "ok" | "skipped" | "failed";
  error?: string;
  capturedAt: string;
};

function parseArgs(argv: string[]) {
  const onlyGroups = new Set<string>();
  const onlyIds = new Set<string>();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--only" && argv[i + 1]) {
      for (const g of argv[++i]!.split(",")) onlyGroups.add(g.trim());
    } else if (arg === "--id" && argv[i + 1]) {
      for (const id of argv[++i]!.split(",")) onlyIds.add(id.trim());
    }
  }
  return { onlyGroups, onlyIds };
}

async function signIn(page: Page, baseUrl: string, signInPath: string, email: string, password: string) {
  const signInUrl = `${baseUrl}${signInPath}`;
  console.log("Signing in…", signInUrl);
  await page.goto(signInUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);
  await Promise.all([
    page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 90_000 }),
    page.locator('button[type="submit"]').click(),
  ]);
  await page.waitForLoadState("networkidle", { timeout: 60_000 }).catch(() => {});
}

async function runActions(page: Page, actions: CaptureAction[]) {
  for (const action of actions) {
    switch (action.type) {
      case "click":
        await page.getByRole(action.role, { name: new RegExp(action.name, "i") }).click();
        break;
      case "wait":
        await page.waitForTimeout(action.ms);
        break;
      case "waitForText":
        await page.getByText(new RegExp(action.text, "i")).waitFor({ state: "visible", timeout: 20_000 });
        break;
      default:
        break;
    }
  }
}

async function captureShot(page: Page, baseUrl: string, outDir: string, shot: Shot): Promise<RunRow> {
  const url = `${baseUrl}${shot.path.startsWith("/") ? shot.path : `/${shot.path}`}`;
  const filePath = join(outDir, shot.file);
  mkdirSync(join(filePath, ".."), { recursive: true });
  const capturedAt = new Date().toISOString();

  try {
    console.log(shot.id, url);
    await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 }).catch(async () => {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
    });

    if (shot.actions?.length) {
      await runActions(page, shot.actions);
    }

    const settleMs = shot.waitMs ?? (shot.path.startsWith("/agent") && !shot.actions?.length ? 2200 : 800);
    await page.waitForTimeout(settleMs);

    await page.screenshot({
      path: filePath,
      fullPage: shot.fullPage,
      animations: "disabled",
    });

    return { id: shot.id, group: shot.group, path: shot.path, file: shot.file, status: "ok", capturedAt };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (shot.optional) {
      console.warn(`Skipped optional ${shot.id}:`, msg);
      return {
        id: shot.id,
        group: shot.group,
        path: shot.path,
        file: shot.file,
        status: "skipped",
        error: msg,
        capturedAt,
      };
    }
    console.error(`Failed ${shot.id}:`, msg);
    return {
      id: shot.id,
      group: shot.group,
      path: shot.path,
      file: shot.file,
      status: "failed",
      error: msg,
      capturedAt,
    };
  }
}

async function main() {
  const { onlyGroups, onlyIds } = parseArgs(process.argv.slice(2));
  const email = process.env.CAPTURE_EMAIL;
  const password = process.env.CAPTURE_PASSWORD;
  const hasAuth = Boolean(email && password);

  const root = process.cwd();
  const manifestPath = join(root, "docs/captures/platform-manifest.json");
  if (!existsSync(manifestPath)) {
    console.error("Missing", manifestPath, "— run pnpm captures:manifest first.");
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;
  const baseUrl = (process.env.CAPTURE_BASE_URL ?? manifest.baseUrl).replace(/\/$/, "");
  const outDir = join(root, manifest.outputDir.replace(/^\.\//, ""));
  mkdirSync(outDir, { recursive: true });

  let shots = manifest.shots;
  if (onlyGroups.size) shots = shots.filter((s) => onlyGroups.has(s.group));
  if (onlyIds.size) shots = shots.filter((s) => onlyIds.has(s.id));

  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {}),
  });
  const context = await browser.newContext({
    viewport: manifest.viewport,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const results: RunRow[] = [];
  const authShots = shots.filter((s) => s.requiresAuth);
  const publicShots = shots.filter((s) => !s.requiresAuth);

  for (const shot of publicShots) {
    results.push(await captureShot(page, baseUrl, outDir, shot));
  }

  if (authShots.length) {
    if (!hasAuth) {
      console.warn("Skipping auth shots — set CAPTURE_EMAIL and CAPTURE_PASSWORD.");
      for (const shot of authShots) {
        results.push({
          id: shot.id,
          group: shot.group,
          path: shot.path,
          file: shot.file,
          status: "skipped",
          error: "missing CAPTURE_EMAIL / CAPTURE_PASSWORD",
          capturedAt: new Date().toISOString(),
        });
      }
    } else {
      await signIn(page, baseUrl, manifest.signInPath, email!, password!);
      for (const shot of authShots) {
        results.push(await captureShot(page, baseUrl, outDir, shot));
      }
    }
  }

  await browser.close();

  const index = {
    baseUrl,
    viewport: manifest.viewport,
    capturedAt: new Date().toISOString(),
    summary: {
      ok: results.filter((r) => r.status === "ok").length,
      failed: results.filter((r) => r.status === "failed").length,
      skipped: results.filter((r) => r.status === "skipped").length,
    },
    shots: results,
  };
  writeFileSync(join(outDir, "index.json"), `${JSON.stringify(index, null, 2)}\n`);

  console.log("Done.", outDir);
  console.log(JSON.stringify(index.summary));

  if (index.summary.failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
