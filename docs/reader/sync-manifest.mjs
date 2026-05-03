#!/usr/bin/env node
// Movemental Reader — manifest sync.
//
// Rescans docs/book-development/manuscript-ordered/ and docs/articles/, then
// rewrites assets/manifest.js. Preserves the category assigned to each article
// by matching on file path (so manually-curated categories survive across runs).
// Reports new, removed, and renamed files so you can triage category assignments.
//
// Usage:  node docs/reader/sync-manifest.mjs
//         node docs/reader/sync-manifest.mjs --check   (exit 1 if out-of-sync)

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const manifestPath = path.join(__dirname, "assets/manifest.js");

const BOOK_DIR = path.join(repoRoot, "docs/book-development/manuscript-ordered");
const ARTICLES_DIR = path.join(repoRoot, "docs/articles");

const CHECK_ONLY = process.argv.includes("--check");

// ---------------- File scanning ----------------
function listMarkdown(dir, filter = () => true) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".md") && filter(d.name))
    .map((d) => d.name)
    .sort();
}

function firstHeading(md) {
  const lines = md.split(/\r?\n/);
  // Strip YAML frontmatter
  let start = 0;
  if (lines[0] === "---") {
    const end = lines.indexOf("---", 1);
    if (end > 0) start = end + 1;
  }
  for (let i = start; i < Math.min(lines.length, 80); i++) {
    const m = lines[i].match(/^#\s+(.+?)\s*$/);
    if (m) return m[1].trim();
  }
  // frontmatter title fallback
  const fm = md.match(/^---[\s\S]*?\ntitle:\s*(.+?)\n[\s\S]*?---/);
  if (fm) return fm[1].replace(/^["']|["']$/g, "").trim();
  return null;
}

function wordCount(md) {
  return (md.match(/\S+/g) || []).length;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

// ---------------- Existing manifest (for category preservation) ----------------
function loadExistingManifest() {
  if (!fs.existsSync(manifestPath)) return null;
  const src = fs.readFileSync(manifestPath, "utf8");
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(src, sandbox, { timeout: 1000 });
    return sandbox.window.READER_MANIFEST || null;
  } catch (err) {
    console.error("Could not parse existing manifest.js:", err.message);
    return null;
  }
}

// ---------------- Book chapters ----------------
const BOOK_NUMBERED = /^(\d+[a-z]?)-(.+)\.md$/;

function scanBook(existing) {
  const files = listMarkdown(BOOK_DIR, (n) => BOOK_NUMBERED.test(n));
  const chapters = files
    .map((file) => {
      const abs = path.join(BOOK_DIR, file);
      const md = fs.readFileSync(abs, "utf8");
      const [, num] = file.match(BOOK_NUMBERED);
      const heading = firstHeading(md) || file;
      const { label, title } = splitChapterHeading(num, heading, file);
      const id = num === "00" ? "preface" : `ch-${num}`;
      return { id, file, label, title, words: wordCount(md) };
    })
    .sort((a, b) => naturalOrder(a.file, b.file));
  return chapters;
}

function splitChapterHeading(num, heading, file) {
  // Headings in this repo follow "Chapter N: Title" or "Preface: Title".
  const m = heading.match(/^(Preface|Chapter\s+\w+):\s*(.+)$/);
  if (m) {
    const left = m[1].startsWith("Chapter")
      ? `Chapter ${num.toUpperCase().replace(/^CH-/, "").replace(/^0+/, "")}`
      : "Preface";
    const cleanLabel = m[1].startsWith("Chapter") ? `Chapter ${Number.isNaN(parseInt(num, 10)) ? num : parseInt(num, 10)}${/[a-z]$/.test(num) ? num.slice(-1).toUpperCase() : ""}` : "Preface";
    return { label: cleanLabel, title: stripMarkdown(m[2]) };
  }
  return { label: num === "00" ? "Preface" : `Chapter ${num}`, title: stripMarkdown(heading) };
}

function stripMarkdown(s) {
  return s.replace(/\*+/g, "").replace(/_/g, "").replace(/\s+/g, " ").trim();
}

function naturalOrder(a, b) {
  const ra = a.match(/^(\d+)([a-z]?)/);
  const rb = b.match(/^(\d+)([a-z]?)/);
  if (ra && rb) {
    const na = parseInt(ra[1], 10);
    const nb = parseInt(rb[1], 10);
    if (na !== nb) return na - nb;
    return (ra[2] || "").localeCompare(rb[2] || "");
  }
  return a.localeCompare(b);
}

// ---------------- Articles ----------------
function scanArticles(existing) {
  const files = listMarkdown(ARTICLES_DIR);
  const byFile = new Map();
  if (existing && Array.isArray(existing.articles)) {
    for (const a of existing.articles) byFile.set(a.file, a);
  }

  return files
    .map((file) => {
      const abs = path.join(ARTICLES_DIR, file);
      const md = fs.readFileSync(abs, "utf8");
      const heading = firstHeading(md);
      const existingEntry = byFile.get(file);
      const id =
        (existingEntry && existingEntry.id) ||
        "art-" + slugify(file.replace(/\.md$/, ""));
      const title =
        (existingEntry && existingEntry.title) ||
        stripMarkdown(heading || file.replace(/\.md$/, ""));
      const category =
        (existingEntry && existingEntry.category) || "uncategorized";
      return {
        id,
        root: "../articles/",
        file,
        title,
        category,
        words: wordCount(md),
      };
    })
    .sort((a, b) => a.file.localeCompare(b.file));
}

// ---------------- Emit ----------------
function emitManifest({ chapters, articles, categoryList }) {
  const fmtChapter = (c) =>
    `      { id: ${q(c.id)}, file: ${q(c.file)}, label: ${q(c.label)}, title: ${q(c.title)}, words: ${c.words} }`;
  const fmtArticle = (a) =>
    `    { id: ${q(a.id)}, root: ${q(a.root)}, file: ${q(a.file)}, title: ${q(a.title)}, category: ${q(a.category)}, words: ${a.words} }`;
  const fmtCat = (c) => `    { id: ${q(c.id)}, label: ${q(c.label)} }`;

  return `// Movemental Reader — content manifest.
// AUTO-GENERATED by docs/reader/sync-manifest.mjs. Re-run after adding or
// renaming files in docs/book-development/manuscript-ordered/ or docs/articles/.
// Safe to hand-edit the 'category' field on articles — sync preserves it.

window.READER_MANIFEST = {
  book: {
    title: "Content That Moves",
    subtitle: "Credibility, voice, and AI — a manuscript for movement leaders",
    author: "Joshua Shepherd",
    root: "../book-development/manuscript-ordered/",
    chapters: [
${chapters.map(fmtChapter).join(",\n")}
    ]
  },

  articleCategories: [
${categoryList.map(fmtCat).join(",\n")}
  ],

  articles: [
${articles.map(fmtArticle).join(",\n")}
  ]
};
`;
}

function q(s) {
  return JSON.stringify(String(s));
}

// ---------------- Categories ----------------
const DEFAULT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "system", label: "System & fragmentation" },
  { id: "credibility", label: "AI & credibility" },
  { id: "content", label: "Content architecture" },
  { id: "courses", label: "Courses & formation" },
  { id: "nonprofit", label: "Nonprofit builds" },
  { id: "platform", label: "Platform & strategy" },
  { id: "narrative", label: "Narrative & research" },
];

function mergeCategories(existing, articles) {
  const base = existing?.articleCategories?.length
    ? existing.articleCategories
    : DEFAULT_CATEGORIES;
  const ids = new Set(base.map((c) => c.id));
  const usedCats = new Set(articles.map((a) => a.category));
  const result = [...base];
  if (usedCats.has("uncategorized") && !ids.has("uncategorized")) {
    result.push({ id: "uncategorized", label: "Uncategorized (needs triage)" });
  }
  return result;
}

// ---------------- Diffing & reporting ----------------
function diffArticles(existing, next) {
  const prev = new Map((existing?.articles || []).map((a) => [a.file, a]));
  const cur = new Map(next.map((a) => [a.file, a]));
  const added = [...cur.keys()].filter((k) => !prev.has(k));
  const removed = [...prev.keys()].filter((k) => !cur.has(k));
  const renamedTitles = [];
  const wordChanges = [];
  for (const [file, a] of cur) {
    const p = prev.get(file);
    if (!p) continue;
    if (p.title !== a.title) renamedTitles.push({ file, from: p.title, to: a.title });
    if (p.words !== a.words) wordChanges.push({ file, from: p.words, to: a.words });
  }
  return { added, removed, renamedTitles, wordChanges };
}

function diffChapters(existing, next) {
  const prev = new Map((existing?.book?.chapters || []).map((c) => [c.file, c]));
  const cur = new Map(next.map((c) => [c.file, c]));
  const added = [...cur.keys()].filter((k) => !prev.has(k));
  const removed = [...prev.keys()].filter((k) => !cur.has(k));
  return { added, removed };
}

// ---------------- Main ----------------
function main() {
  const existing = loadExistingManifest();

  const chapters = scanBook(existing);
  const articles = scanArticles(existing);
  const categoryList = mergeCategories(existing, articles);

  const next = emitManifest({ chapters, articles, categoryList });
  const current = fs.existsSync(manifestPath)
    ? fs.readFileSync(manifestPath, "utf8")
    : "";

  const aDiff = diffArticles(existing, articles);
  const cDiff = diffChapters(existing, chapters);
  const uncategorized = articles.filter((a) => a.category === "uncategorized");

  const lines = [];
  lines.push(`Book chapters : ${chapters.length}  (+${cDiff.added.length} / -${cDiff.removed.length})`);
  lines.push(`Articles      : ${articles.length}  (+${aDiff.added.length} / -${aDiff.removed.length})`);
  if (cDiff.added.length)   lines.push("  + book:     " + cDiff.added.join(", "));
  if (cDiff.removed.length) lines.push("  - book:     " + cDiff.removed.join(", "));
  if (aDiff.added.length)   lines.push("  + articles: " + aDiff.added.join(", "));
  if (aDiff.removed.length) lines.push("  - articles: " + aDiff.removed.join(", "));
  if (aDiff.renamedTitles.length) {
    lines.push("  ~ title changes:");
    for (const r of aDiff.renamedTitles) lines.push(`      ${r.file}\n        "${r.from}" → "${r.to}"`);
  }
  if (uncategorized.length) {
    lines.push("");
    lines.push(`⚠ ${uncategorized.length} article(s) need a category. Edit assets/manifest.js and change "uncategorized" to one of:`);
    lines.push("    " + categoryList.filter(c => c.id !== "all" && c.id !== "uncategorized").map(c => c.id).join(", "));
    for (const a of uncategorized) lines.push(`    • ${a.file}`);
  }
  console.log(lines.join("\n"));

  if (CHECK_ONLY) {
    if (next !== current) {
      console.error("\n✗ manifest.js is out of date. Run: node docs/reader/sync-manifest.mjs");
      process.exit(1);
    }
    console.log("\n✓ manifest.js is in sync.");
    return;
  }

  if (next === current) {
    console.log("\n✓ No changes — manifest.js already in sync.");
    return;
  }
  fs.writeFileSync(manifestPath, next);
  console.log(`\n✓ Wrote ${path.relative(repoRoot, manifestPath)}`);
}

main();
