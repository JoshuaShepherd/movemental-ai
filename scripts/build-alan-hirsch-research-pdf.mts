/**
 * Copies Alan Hirsch movement_leader_research to the Desktop (WSL → Windows path)
 * and builds a single print-styled HTML → PDF via Windows Google Chrome headless.
 *
 *   pnpm research:alan-hirsch:pdf
 *
 * Override desktop directory (must be writable):
 *   ALAN_HIRSCH_DESKTOP=/mnt/c/Users/You/Desktop pnpm research:alan-hirsch:pdf
 */
import { spawnSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { marked } from "marked";

const REPO_ROOT = process.cwd();
const RESEARCH_PARENT = path.join(REPO_ROOT, "docs", "movement_leader_research");
const ALAN_DIR = path.join(RESEARCH_PARENT, "alan-hirsch");

const DEFAULT_DESKTOP = "/mnt/c/Users/Josh/Desktop";
const DESKTOP = process.env.ALAN_HIRSCH_DESKTOP ?? DEFAULT_DESKTOP;

const COPY_DIR_NAME = "Alan_Hirsch_movement_leader_research";
const HTML_NAME = "Alan_Hirsch_Movement_Leader_Research.html";
const PDF_NAME = "Alan_Hirsch_Movement_Leader_Research.pdf";

const WIN_DESKTOP = windowsPathFromWsl(DESKTOP);
const CHROME_EXE =
  "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe";

/** Order: narrative flow (overview → profiles → evidence → analysis → appendices). */
const RELATIVE_CHAPTERS: string[] = [
  "README.md",
  "ALAN_HIRSCH_PROFILES_INDEX.md",
  "AUTHOR_PROFILE_PRESENTATION_STANDARDS.md",
  "ALAN_HIRSCH_COMPLETE_PROFILE.md",
  "ALAN_HIRSCH_AUTHOR_PROFILE.md",
  "ALAN_HIRSCH_AUDIENCE_PROFILE.md",
  "ALAN_HIRSCH_CONTENT_AUDIT.md",
  "ALAN_HIRSCH_CALLING_PROFILE.md",
  "ALAN_HIRSCH_TIMELINE.md",
  "ALAN_HIRSCH_ORGS.md",
  "identity-verification.md",
  "profile/identity.md",
  "profile/biography.md",
  "profile/theology.md",
  "profile/voice-analysis.md",
  "biography.md",
  "digital-presence-discovery.md",
  "digital-presence/websites.md",
  "digital-presence/platforms.md",
  "digital-presence/social-media.md",
  "digital-presence/newsletters.md",
  "content/books.md",
  "content/articles.md",
  "content/videos.md",
  "content/audio.md",
  "content/courses.md",
  "content/academic.md",
  "network/organizations.md",
  "network/collaborators.md",
  "network/endorsements.md",
  "network/events.md",
  "media/press-coverage.md",
  "media/reviews.md",
  "media/citations.md",
  "analysis/audience-analysis.md",
  "analysis/content-analysis.md",
  "analysis/competitive-landscape.md",
  "analysis/movemental-fit.md",
  "analysis/gap-analysis.md",
  "gap-analysis.md",
  "content-analysis.md",
  "fragmentation-story.md",
  "movemental-analysis.md",
  "content-marketing-playbook.md",
  "hirsch-affinity-rubric.md",
  "hirsch-affinity-ranked-list.md",
  "summary.md",
  "sources.md",
  "_tracker.md",
  // Related files outside alan-hirsch/ (paths resolved below)
  "@@EXTRA:baseline-report",
  "@@EXTRA:reflected-understanding",
];

function windowsPathFromWsl(wslPath: string): string {
  const m = wslPath.match(/^\/mnt\/([a-z])\//i);
  if (!m) {
    throw new Error(
      `Desktop path must be a /mnt/<drive>/... path for Chrome PDF export; got: ${wslPath}`,
    );
  }
  const drive = m[1]!.toUpperCase();
  const rest = wslPath
    .replace(/^\/mnt\/[a-z]\//i, "")
    .split("/")
    .join("\\");
  return `${drive}:\\${rest}`;
}

function chapterTitle(rel: string): string {
  if (rel.startsWith("@@EXTRA:")) {
    if (rel === "@@EXTRA:baseline-report") return "Alan Hirsch — Baseline report (repo)";
    if (rel === "@@EXTRA:reflected-understanding")
      return "Reflected understanding — Alan Hirsch";
    return rel;
  }
  return rel.replace(/\.md$/i, "").replace(/\//g, " · ");
}

function resolveChapterPath(token: string): string | null {
  if (token === "@@EXTRA:baseline-report") {
    return path.join(RESEARCH_PARENT, "alan-hirsch-baseline-report.md");
  }
  if (token === "@@EXTRA:reflected-understanding") {
    return path.join(RESEARCH_PARENT, "reflected-understanding", "alan-hirsch.md");
  }
  return path.join(ALAN_DIR, token);
}

const PRINT_CSS = `
  @page { size: letter; margin: 0.72in 0.78in; }
  * { box-sizing: border-box; }
  html {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  body {
    font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 10.25pt;
    line-height: 1.58;
    color: #2a3439;
    max-width: 100%;
  }
  .cover {
    min-height: 10.2in;
    margin: -0.72in -0.78in 1.25in;
    padding: 1.1in 0.9in;
    background: linear-gradient(145deg, #0b1220 0%, #1a2744 48%, #0f172a 100%);
    color: #f1f5f9;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    font-size: 2.35rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0 0 0.35rem;
    line-height: 1.1;
    border: none;
    color: #f8fafc;
  }
  .cover-sub {
    font-size: 13.5pt;
    color: #cbd5e1;
    margin: 0 0 1.5rem;
    max-width: 36rem;
  }
  .cover-meta {
    font-size: 9.5pt;
    color: #64748b;
    margin: 0;
  }
  .cover-accent {
    width: 3.5rem;
    height: 4px;
    background: linear-gradient(90deg, #0053db, #3b82f6);
    border-radius: 2px;
    margin-bottom: 1.25rem;
  }
  article.chapter {
    page-break-before: always;
  }
  article.chapter:first-of-type {
    page-break-before: avoid;
  }
  article.chapter h2.chapter-heading {
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin: 0 0 0.85rem;
    padding-bottom: 0.35rem;
    border-bottom: 2px solid #0053db;
    page-break-after: avoid;
  }
  article.chapter .path-label {
    font-size: 8.5pt;
    color: #64748b;
    font-family: ui-monospace, monospace;
    margin: -0.25rem 0 1rem;
  }
  .md-content h1 { font-size: 1.35rem; margin-top: 1.1em; page-break-after: avoid; color: #0f172a; }
  .md-content h2 { font-size: 1.12rem; margin-top: 1em; page-break-after: avoid; color: #1e293b; }
  .md-content h3 { font-size: 1.02rem; margin-top: 0.9em; page-break-after: avoid; }
  .md-content h4, .md-content h5, .md-content h6 { margin-top: 0.85em; page-break-after: avoid; }
  .md-content p { margin: 0.55em 0; orphans: 3; widows: 3; }
  .md-content ul, .md-content ol { margin: 0.5em 0 0.6em 1.15em; padding-left: 0.35em; }
  .md-content li { margin: 0.25em 0; }
  .md-content blockquote {
    margin: 0.75em 0;
    padding: 0.5em 0.85em;
    border-left: 3px solid #0053db;
    background: #f1f5f9;
    color: #334155;
  }
  .md-content hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 1.25rem 0;
  }
  .md-content table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.75pt;
    margin: 0.75em 0;
    page-break-inside: avoid;
  }
  .md-content th, .md-content td {
    border: 1px solid #e2e8f0;
    padding: 0.35rem 0.45rem;
    text-align: left;
    vertical-align: top;
  }
  .md-content th { background: #f8fafc; font-weight: 600; color: #0f172a; }
  .md-content pre, .md-content code {
    font-family: ui-monospace, "Cascadia Code", monospace;
    font-size: 8.75pt;
  }
  .md-content pre {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0.65rem 0.75rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    page-break-inside: avoid;
  }
  .md-content code { background: #f1f5f9; padding: 0.08em 0.28em; border-radius: 3px; }
  .md-content pre code { background: none; padding: 0; }
  .md-content a { color: #0053db; text-decoration: none; }
  .toc {
    page-break-after: always;
    margin-bottom: 0.5in;
  }
  .toc h2 {
    font-size: 1.2rem;
    letter-spacing: -0.02em;
    border-bottom: 2px solid #0053db;
    padding-bottom: 0.35rem;
    margin-top: 0;
  }
  .toc ol { margin: 0.75rem 0 0 1.1rem; padding: 0; column-count: 1; }
  .toc li { margin: 0.22rem 0; font-size: 9.25pt; }
  .toc a { color: #0053db; }
`;

async function main() {
  marked.setOptions({ gfm: true, breaks: false });

  await mkdir(DESKTOP, { recursive: true });
  const copyDest = path.join(DESKTOP, COPY_DIR_NAME);
  await rm(copyDest, { recursive: true, force: true });
  await cp(ALAN_DIR, copyDest, { recursive: true });

  const relatedDir = path.join(copyDest, "_related_from_movement_leader_research");
  await mkdir(relatedDir, { recursive: true });
  await cp(
    path.join(RESEARCH_PARENT, "alan-hirsch-baseline-report.md"),
    path.join(relatedDir, "alan-hirsch-baseline-report.md"),
  );
  await cp(
    path.join(RESEARCH_PARENT, "reflected-understanding", "alan-hirsch.md"),
    path.join(relatedDir, "alan-hirsch.md"),
  );

  const chapters: { title: string; rel: string; html: string }[] = [];
  const tocEntries: { title: string; id: string }[] = [];

  for (const token of RELATIVE_CHAPTERS) {
    const abs = resolveChapterPath(token);
    if (!abs) continue;
    let raw: string;
    try {
      raw = await readFile(abs, "utf8");
    } catch {
      console.warn(`[research:pdf] skip missing: ${abs}`);
      continue;
    }
    const id = `ch-${tocEntries.length + 1}`;
    const title = chapterTitle(token);
    const bodyHtml = marked.parse(raw) as string;
    chapters.push({
      title,
      rel: path.relative(REPO_ROOT, abs),
      html: `<article class="chapter" id="${id}"><h2 class="chapter-heading">${escapeHtml(title)}</h2><p class="path-label">${escapeHtml(path.relative(REPO_ROOT, abs))}</p><div class="md-content">${bodyHtml}</div></article>`,
    });
    tocEntries.push({ title, id });
  }

  const tocHtml = `<nav class="toc" id="contents"><h2>Contents</h2><ol>${tocEntries
    .map((e, i) => `<li><a href="#${e.id}">${i + 1}. ${escapeHtml(e.title)}</a></li>`)
    .join("")}</ol></nav>`;

  const coverHtml = `
  <header class="cover">
    <div class="cover-accent"></div>
    <p class="cover-kicker">Movemental · Movement leader research</p>
    <h1>Alan Hirsch</h1>
    <p class="cover-sub">Complete movement-leader research dossier — profiles, digital presence, content catalog, network, media, and strategic analysis.</p>
    <p class="cover-meta">Generated ${escapeHtml(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )} · ${chapters.length} sections · Source: movemental-ai repo</p>
  </header>`;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Alan Hirsch — Movement leader research</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&display=swap" rel="stylesheet" />
  <style>${PRINT_CSS}</style>
</head>
<body>
  ${coverHtml}
  ${tocHtml}
  ${chapters.map((c) => c.html).join("\n")}
</body>
</html>`;

  const htmlPath = path.join(DESKTOP, HTML_NAME);
  const pdfPathWin = `${WIN_DESKTOP}\\${PDF_NAME}`;

  await writeFile(htmlPath, fullHtml, "utf8");

  const fileUrl = wslFilePathToFileUrl(htmlPath);

  const chromeArgs = [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPathWin}`,
    fileUrl,
  ];

  const r = spawnSync(CHROME_EXE, chromeArgs, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`Chrome PDF export failed with exit ${r.status}`);
  }
  console.log(r.stdout?.trim());
  console.log(`[research:pdf] folder copy → ${copyDest}`);
  console.log(`[research:pdf] HTML → ${htmlPath}`);
  console.log(`[research:pdf] PDF  → ${path.join(DESKTOP, PDF_NAME)}`);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `/mnt/c/Users/Josh/Desktop/x.html` → `file:///C:/Users/Josh/Desktop/x.html` */
function wslFilePathToFileUrl(wslPath: string): string {
  const m = wslPath.match(/^\/mnt\/([a-z])\//i);
  if (!m) {
    throw new Error(`Expected /mnt/<drive>/... path, got: ${wslPath}`);
  }
  const drive = m[1]!.toUpperCase();
  const subPath = wslPath.replace(/^\/mnt\/[a-z]\//i, "");
  return `file:///${drive}:/${subPath}`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
