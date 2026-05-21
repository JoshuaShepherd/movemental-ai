#!/usr/bin/env node
/**
 * Print pandoc-generated HTML to PDF via Playwright (no LaTeX required).
 */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const htmlPath = process.argv[2] ?? "/tmp/alan-hirsch-collated.html";
const pdfPath =
  process.argv[3] ??
  "/home/josh/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve(htmlPath)).href, {
  waitUntil: "networkidle",
  timeout: 120_000,
});
await page.pdf({
  path: pdfPath,
  format: "Letter",
  margin: { top: "0.6in", bottom: "0.6in", left: "0.65in", right: "0.65in" },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate:
    '<div style="font-size:8px;width:100%;text-align:center;color:#666;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});
await browser.close();
console.log(JSON.stringify({ pdfPath, htmlPath }, null, 2));
