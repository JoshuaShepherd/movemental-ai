#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const htmlPath = path.resolve(
  process.argv[2] ?? "/tmp/alan-hirsch-collated.html"
);
const pdfPath = path.resolve(
  process.argv[3] ??
    "/home/josh/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf"
);

const puppeteer = await import("puppeteer");
const browser = await puppeteer.default.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.goto(pathToFileURL(htmlPath).href, {
  waitUntil: "networkidle0",
  timeout: 300_000,
});
await page.pdf({
  path: pdfPath,
  format: "Letter",
  margin: { top: "0.5in", bottom: "0.6in", left: "0.6in", right: "0.6in" },
  printBackground: true,
  displayHeaderFooter: true,
  footerTemplate:
    '<div style="font-size:8px;width:100%;text-align:center;color:#666;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});
await browser.close();
console.log(JSON.stringify({ pdfPath, bytes: fs.statSync(pdfPath).size }));
