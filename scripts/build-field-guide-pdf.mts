/**
 * Build the Field Guide PDF by rendering /field-guide/safety in headless
 * Chromium with print-media emulation. Runs against an already-running dev or
 * production server; this script does not start one for you.
 *
 *   pnpm dev                       # in another terminal
 *   pnpm field-guide:pdf           # this script
 *
 * Override the source URL with FIELD_GUIDE_URL=http://... if you've started
 * `next start` on a non-default port.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { chromium } from "@playwright/test";

const URL = process.env.FIELD_GUIDE_URL ?? "http://localhost:3000/field-guide/safety";
const OUT_DIR = path.join(process.cwd(), "public/downloads");
const OUT_FILE = path.join(OUT_DIR, "it-starts-with-safety-v1.pdf");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log(`[field-guide:pdf] navigating to ${URL}`);

  try {
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });
  } catch (error) {
    await browser.close();
    if (error instanceof Error && error.message.includes("ERR_CONNECTION_REFUSED")) {
      console.error(
        `[field-guide:pdf] could not reach ${URL}. Start the dev server with \`pnpm dev\` (or run \`next start\` after \`pnpm build\`) and rerun.`,
      );
    } else {
      console.error("[field-guide:pdf] navigation failed:", error);
    }
    process.exit(1);
  }

  await page.emulateMedia({ media: "print" });
  // Give Reveal animations and intersection observers a moment to settle so
  // their initial opacity-0 state doesn't make it into the PDF.
  await page.waitForTimeout(800);

  await page.pdf({
    path: OUT_FILE,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.6in", right: "0.7in", bottom: "0.6in", left: "0.7in" },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #6c7a80; width: 100%; padding: 0 0.7in; display: flex; justify-content: space-between;">
      <span>It Starts With Safety · Movemental Field Guide · v1.0</span>
      <span>movemental.ai/field-guide/safety</span>
    </div>`,
    footerTemplate: `<div style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #6c7a80; width: 100%; padding: 0 0.7in; text-align: center;">
      <span class="pageNumber"></span> / <span class="totalPages"></span>
    </div>`,
  });

  await browser.close();

  console.log(`[field-guide:pdf] wrote ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
