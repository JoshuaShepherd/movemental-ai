/**
 * Build print-styled HTML + PDF for Chambers dyad research on the Desktop.
 *
 *   pnpm research:chambers-dyad:pdf
 *
 * Override output directory:
 *   CHAMBERS_DYAD_DESKTOP=/home/josh/Desktop pnpm research:chambers-dyad:pdf
 */
import { spawnSync } from "node:child_process";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { marked } from "marked";

const REPO_ROOT = process.cwd();
const MD_PATH = path.join(
  REPO_ROOT,
  "docs/movement_leader_research/jeremy-monica-chambers/CHAMBERS_DYAD_RESEARCH_COLLATED.md",
);

const DEFAULT_DESKTOP =
  process.env.ALAN_HIRSCH_DESKTOP ??
  (process.env.USERPROFILE
    ? `/mnt/c/Users/${process.env.USERNAME ?? "Josh"}/Desktop`
    : "/home/josh/Desktop");

const DESKTOP = process.env.CHAMBERS_DYAD_DESKTOP ?? DEFAULT_DESKTOP;

const HTML_NAME = "Chambers-Dyad-Movement-Leader-Research.html";
const PDF_NAME = "Chambers-Dyad-Movement-Leader-Research.pdf";

const CHROME_EXE =
  process.env.CHROME_EXE ??
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe";

function windowsPathFromWsl(wslPath: string): string {
  const m = wslPath.match(/^\/mnt\/([a-z])\//i);
  if (!m) {
    throw new Error(
      `Desktop path must be /mnt/<drive>/... for Chrome PDF export; got: ${wslPath}`,
    );
  }
  const drive = m[1]!.toUpperCase();
  const rest = wslPath.replace(/^\/mnt\/[a-z]\//i, "").split("/").join("\\");
  return `${drive}:\\${rest}`;
}

function wslFilePathToFileUrl(wslPath: string): string {
  const m = wslPath.match(/^\/mnt\/([a-z])\//i);
  if (m) {
    const drive = m[1]!.toUpperCase();
    const subPath = wslPath.replace(/^\/mnt\/[a-z]\//i, "");
    return `file:///${drive}:/${subPath}`;
  }
  return `file://${wslPath}`;
}

const PRINT_CSS = `
  @page { size: letter; margin: 0.72in 0.78in; }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 10.25pt;
    line-height: 1.58;
    color: #2a3439;
  }
  .cover {
    min-height: 10.2in;
    margin: -0.72in -0.78in 1.25in;
    padding: 1.1in 0.9in;
    background: linear-gradient(145deg, #0b1220 0%, #1a2744 48%, #0f172a 100%);
    color: #f1f5f9;
    page-break-after: always;
  }
  .cover-kicker {
    font-size: 9pt;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #94a3b8;
    margin: 0 0 0.6rem;
  }
  .cover h1 {
    font-size: 2.1rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0 0 0.35rem;
    line-height: 1.12;
    color: #f8fafc;
  }
  .cover-sub {
    font-size: 12.5pt;
    color: #cbd5e1;
    margin: 0 0 1.25rem;
    max-width: 38rem;
  }
  .cover-meta { font-size: 9.5pt; color: #64748b; margin: 0; }
  .cover-accent {
    width: 3.5rem;
    height: 4px;
    background: linear-gradient(90deg, #0053db, #3b82f6);
    border-radius: 2px;
    margin-bottom: 1.25rem;
  }
  .toc { page-break-after: always; margin-bottom: 0.5in; }
  .toc h2 {
    font-size: 1.2rem;
    border-bottom: 2px solid #0053db;
    padding-bottom: 0.35rem;
    margin-top: 0;
  }
  .toc ol { margin: 0.75rem 0 0 1.1rem; padding: 0; }
  .toc li { margin: 0.22rem 0; font-size: 9.25pt; }
  .toc a { color: #0053db; text-decoration: none; }
  .md-content h1 { font-size: 1.35rem; margin-top: 1.1em; color: #0f172a; page-break-after: avoid; }
  .md-content h2 {
    font-size: 1.12rem;
    margin-top: 1.15em;
    color: #0f172a;
    page-break-before: always;
    page-break-after: avoid;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #e2e8f0;
  }
  .md-content h2:first-of-type { page-break-before: avoid; }
  .md-content h3 { font-size: 1.02rem; margin-top: 0.9em; page-break-after: avoid; color: #1e293b; }
  .md-content h4 { margin-top: 0.85em; page-break-after: avoid; }
  .md-content p { margin: 0.55em 0; orphans: 3; widows: 3; }
  .md-content ul, .md-content ol { margin: 0.5em 0 0.6em 1.15em; }
  .md-content li { margin: 0.25em 0; }
  .md-content blockquote {
    margin: 0.75em 0;
    padding: 0.5em 0.85em;
    border-left: 3px solid #0053db;
    background: #f1f5f9;
    color: #334155;
  }
  .md-content hr { border: none; border-top: 1px solid #e2e8f0; margin: 1.25rem 0; }
  .md-content table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.5pt;
    margin: 0.75em 0;
    page-break-inside: avoid;
  }
  .md-content th, .md-content td {
    border: 1px solid #e2e8f0;
    padding: 0.35rem 0.45rem;
    vertical-align: top;
  }
  .md-content th { background: #f8fafc; font-weight: 600; }
  .md-content pre, .md-content code {
    font-family: ui-monospace, monospace;
    font-size: 8.5pt;
  }
  .md-content pre {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0.65rem 0.75rem;
    white-space: pre-wrap;
    word-break: break-word;
    page-break-inside: avoid;
  }
  .md-content code { background: #f1f5f9; padding: 0.08em 0.28em; border-radius: 3px; }
  .md-content pre code { background: none; padding: 0; }
  .md-content a { color: #0053db; text-decoration: none; }
`;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function main() {
  marked.setOptions({ gfm: true, breaks: false });

  const raw = await readFile(MD_PATH, "utf8");
  const h2Matches = [...raw.matchAll(/^## (.+)$/gm)];
  const tocEntries = h2Matches.map((m, i) => {
    const title = m[1]!.replace(/\s*\{#.+\}\s*$/, "").trim();
    const id = `sec-${slugify(title)}-${i}`;
    return { title, id };
  });

  let bodyMd = raw;
  for (const { title, id } of tocEntries) {
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    bodyMd = bodyMd.replace(
      new RegExp(`^(## ${escaped})\\s*$`, "m"),
      `$1 {#${id}}`,
    );
  }

  const bodyHtml = marked.parse(bodyMd) as string;

  const tocHtml =
    tocEntries.length > 0
      ? `<nav class="toc"><h2>Contents</h2><ol>${tocEntries
          .map(
            (e, i) =>
              `<li><a href="#${e.id}">${i + 1}. ${escapeHtml(e.title)}</a></li>`,
          )
          .join("")}</ol></nav>`
      : "";

  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const coverHtml = `
  <header class="cover">
    <div class="cover-accent"></div>
    <p class="cover-kicker">Movemental · Movement leader research</p>
    <h1>Jeremy &amp; Monica Paredes Chambers</h1>
    <p class="cover-sub">Joint movement-leader substrate — identity verification, frameworks, dyad voice fingerprint, bibliography, network, and distribution. Missional spirituality at the seam of Renovaré and Hirsch–Forge.</p>
    <p class="cover-meta">Generated ${escapeHtml(dateStr)} · Subject verified: Monica Paredes Chambers (Costa Rica; co-author with Jeremy) · Source: movemental-ai</p>
  </header>`;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Chambers Dyad — Movement leader research</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>${PRINT_CSS}</style>
</head>
<body>
  ${coverHtml}
  ${tocHtml}
  <div class="md-content">${bodyHtml}</div>
</body>
</html>`;

  await mkdir(DESKTOP, { recursive: true });
  const htmlPath = path.join(DESKTOP, HTML_NAME);
  const pdfPath = path.join(DESKTOP, PDF_NAME);

  await writeFile(htmlPath, fullHtml, "utf8");

  const pdfPathWin = windowsPathFromWsl(pdfPath);
  const fileUrl = wslFilePathToFileUrl(htmlPath);

  const chromeArgs = [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPathWin}`,
    fileUrl,
  ];

  const r = spawnSync(CHROME_EXE, chromeArgs, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`Chrome PDF export failed with exit ${r.status}`);
  }

  console.log(`[chambers-dyad:pdf] Markdown → ${MD_PATH}`);
  console.log(`[chambers-dyad:pdf] HTML   → ${htmlPath}`);
  console.log(`[chambers-dyad:pdf] PDF    → ${pdfPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
