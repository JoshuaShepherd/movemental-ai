/**
 * Inventory movemental-ai + movemental-dashboard pages/components → PDF on Desktop.
 * Run from repo root: node scripts/generate-app-inventory-pdf.mjs
 */
import { execSync } from "node:child_process";
import { mkdirSync, createWriteStream, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

const ROOTS = {
  ai: REPO_ROOT,
  dash: join(REPO_ROOT, "..", "movemental-dashboard"),
};

const DESKTOP = join(process.env.HOME || "/home/josh", "Desktop");
const OUT = join(DESKTOP, "movemental-pages-components-inventory.pdf");

function findPages(root) {
  const cmd = `find "${root}/src/app" -name 'page.tsx' -o -name 'page.ts' 2>/dev/null | sort`;
  return execSync(cmd, { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
}

function routeFromPagePath(root, absPath) {
  const rel = absPath.replace(`${root}/src/app/`, "");
  const noPage = rel.replace(/\/page\.tsx?$/, "");
  if (/^\([^)]+\)$/.test(noPage)) return "/";
  const ungrouped = noPage.replace(/^\([^)]+\)\//, "");
  if (!ungrouped || ungrouped === "page.tsx" || ungrouped === "page.ts") return "/";
  return `/${ungrouped}`;
}

function findComponents(root) {
  const cmd = `find "${root}/src/components" -type f \\( -name '*.tsx' -o -name '*.ts' \\) ! -path '*/node_modules/*' 2>/dev/null | sort`;
  return execSync(cmd, { encoding: "utf8" })
    .trim()
    .split("\n")
    .filter(Boolean);
}

function topLevelBuckets(files, root) {
  const base = `${root}/src/components/`;
  const map = new Map();
  for (const f of files) {
    if (!f.startsWith(base)) continue;
    const rest = f.slice(base.length);
    const seg = rest.split("/")[0] || "_root";
    map.set(seg, (map.get(seg) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function writePdf(outPath, { pagesAi, pagesDash, compsAi, compsDash, bucketsAi, bucketsDash }) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 48,
    info: {
      Title: "Movemental pages & components inventory",
      Author: "movemental-ai/scripts/generate-app-inventory-pdf.mjs",
    },
  });
  const stream = createWriteStream(outPath);
  doc.pipe(stream);

  const W = 520;
  const gen = new Date().toISOString().slice(0, 10);

  const heading = (s, size = 13) => {
    doc.moveDown(0.6);
    doc.font("Helvetica-Bold").fontSize(size).text(s, { width: W });
    doc.font("Helvetica");
  };

  const body = (s, size = 8.5) => {
    doc.fontSize(size).text(s, { width: W, align: "left" });
  };

  doc.fontSize(16).font("Helvetica-Bold").text("Pages & components inventory", { width: W });
  doc.font("Helvetica").fontSize(9).fillColor("#444444");
  doc.text(
    `Generated ${gen} · movemental-ai + movemental-dashboard · App Router page files and src/components/**/*.tsx|ts`,
    { width: W },
  );
  doc.fillColor("#000000");

  heading("Summary", 12);
  body(
    `movemental-ai: ${pagesAi.length} pages, ${compsAi.length} component files, ${bucketsAi.length} top-level component folders.\n` +
      `movemental-dashboard: ${pagesDash.length} pages, ${compsDash.length} component files, ${bucketsDash.length} top-level component folders.`,
    9,
  );

  heading("movemental-ai — component folders (file counts)", 11);
  body(bucketsAi.map(([n, c]) => `${n}/\t${c}`).join("\n"), 8);

  heading("movemental-ai — routes / pages", 11);
  body(
    pagesAi.map((p) => `${routeFromPagePath(ROOTS.ai, p)}\n  ${p.replace(`${ROOTS.ai}/`, "")}`).join("\n\n"),
    7.5,
  );

  heading("movemental-ai — component files (alphabetical)", 11);
  body(compsAi.map((p) => p.replace(`${ROOTS.ai}/`, "")).join("\n"), 7);

  heading("movemental-dashboard — component folders (file counts)", 11);
  body(bucketsDash.map(([n, c]) => `${n}/\t${c}`).join("\n"), 8);

  heading("movemental-dashboard — routes / pages", 11);
  body(
    pagesDash
      .map((p) => `${routeFromPagePath(ROOTS.dash, p)}\n  ${p.replace(`${ROOTS.dash}/`, "")}`)
      .join("\n\n"),
    7.5,
  );

  heading("movemental-dashboard — component files (alphabetical)", 11);
  body(compsDash.map((p) => p.replace(`${ROOTS.dash}/`, "")).join("\n"), 7);

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

mkdirSync(DESKTOP, { recursive: true });

if (!existsSync(ROOTS.dash)) {
  console.error("Missing sibling repo:", ROOTS.dash);
  process.exit(1);
}

const pagesAi = findPages(ROOTS.ai);
const pagesDash = findPages(ROOTS.dash);
const compsAi = findComponents(ROOTS.ai);
const compsDash = findComponents(ROOTS.dash);
const bucketsAi = topLevelBuckets(compsAi, ROOTS.ai);
const bucketsDash = topLevelBuckets(compsDash, ROOTS.dash);

await writePdf(OUT, {
  pagesAi,
  pagesDash,
  compsAi,
  compsDash,
  bucketsAi,
  bucketsDash,
});

console.log("Wrote", OUT);
