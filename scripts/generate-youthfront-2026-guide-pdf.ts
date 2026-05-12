/**
 * Full Youthfront 2026 SSOT PDF — merges the yf-np-dashboard public docs library
 * (governance, stakeholders, guides, articles) plus Movemental engagement markdown.
 *
 * Requires the dashboard repo on disk (or set YF_NP_DASHBOARD_PUBLIC_DOCS to
 * `_docs/_public` absolute path). Resolves common clone locations automatically.
 *
 *   pnpm docs:youthfront-2026-guide:pdf
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import PDFDocument from "pdfkit";

type PdfDoc = InstanceType<typeof PDFDocument>;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outPath = path.join(
  repoRoot,
  "docs/engagements/youthfront/2026-guide/Youthfront-2026-Guide.pdf",
);

const PRIMARY = "#0053db";
const INK = "#1a1f24";
const MUTED = "#4a5560";
const TEXT_W = () => doc.page.width - 96;

let doc: PdfDoc;

function footerOnAllPages(total: number) {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);
    const m = 48;
    doc
      .fontSize(8)
      .fillColor(MUTED)
      .font("Helvetica")
      .text(`Youthfront SSOT 2026 · ${i + 1} / ${total}`, m, doc.page.height - 36, {
        align: "center",
        width: doc.page.width - 2 * m,
      });
  }
}

function stripFrontmatter(s: string): string {
  return s.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

/** Flatten markdown to plain text suitable for PDFKit continuous flow. */
function mdToPlain(s: string): string {
  let t = stripFrontmatter(s);
  t = t.replace(/\r\n/g, "\n");
  t = t.replace(/^#{6}\s+(.+)$/gm, "$1\n");
  t = t.replace(/^#{5}\s+(.+)$/gm, "$1\n");
  t = t.replace(/^#{4}\s+(.+)$/gm, "$1\n");
  t = t.replace(/^###\s+(.+)$/gm, "\n$1\n");
  t = t.replace(/^##\s+(.+)$/gm, "\n\n$1\n");
  t = t.replace(/^#\s+(.+)$/gm, "\n\n$1\n");
  t = t.replace(/\*\*([^*]+)\*\*/g, "$1");
  t = t.replace(/__([^_]+)__/g, "$1");
  t = t.replace(/`([^`]+)`/g, "$1");
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
  t = t.replace(/^>\s?/gm, "");
  t = t.replace(/^[-*]{3,}\s*$/gm, "\n");
  t = t.replace(/^\|(.+)\|\s*$/gm, (_line, row: string) => row.replace(/\|/g, " · ") + "\n");
  t = t.replace(/\n{5,}/g, "\n\n\n\n");
  return t.trim();
}

function resolveYfPublicDocs(): string | null {
  const env = process.env.YF_NP_DASHBOARD_PUBLIC_DOCS?.trim();
  if (env && fs.existsSync(env)) return env;
  const candidates = [
    path.join(repoRoot, "../yf-np-dashboard/_docs/_public"),
    path.join(repoRoot, "../dev/01-Movemental-Core/yf-np-dashboard/_docs/_public"),
    path.join(repoRoot, "../../dev/01-Movemental-Core/yf-np-dashboard/_docs/_public"),
    "/home/josh/dev/01-Movemental-Core/yf-np-dashboard/_docs/_public",
    "/home/josh/repos/01-Movemental-Core/yf-np-dashboard/_docs/_public",
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, "content/governance/board-roster.md"))) return c;
  }
  return null;
}

function walkMdFiles(dir: string, baseRel: string, acc: string[]) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".")) continue;
    const abs = path.join(dir, ent.name);
    const rel = baseRel ? `${baseRel}/${ent.name}` : ent.name;
    if (ent.isDirectory()) walkMdFiles(abs, rel, acc);
    else if (ent.name.endsWith(".md")) acc.push(rel.replaceAll("\\", "/"));
  }
}

/** Preferred narrative order; remaining .md files under _public are appended sorted. */
const PRIORITY_ORDER: string[] = [
  "content/governance/board-roster.md",
  "content/governance/org-chart-draft.md",
  "content/governance/990-summary.md",
  "content/governance/mission.md",
  "content/governance/mission-vision.md",
  "content/governance/vision.md",
  "content/governance/values.md",
  "content/governance/vim.md",
  "content/governance/our-story.md",
  "content/governance/our-history.md",
  "content/governance/positioning.md",
  "content/governance/case-for-support.md",
  "content/governance/strategic-plan-draft.md",
  "content/governance/theory-of-change-draft.md",
  "content/governance/program-inventory.md",
  "content/governance/program-outcomes-draft.md",
  "content/governance/donor-personas.md",
  "content/governance/donor-segmentation-framework.md",
  "content/governance/donor-scoring-rubric.md",
  "content/governance/ideal-donor-profile.md",
  "content/governance/donor-expected-value.md",
  "content/governance/donor-cultivation-guide.md",
  "content/governance/messaging-guide.md",
  "content/governance/visual-identity.md",
  "content/governance/annual-report-draft.md",
  "content/governance/stakeholder-comms-draft.md",
  "content/governance/market-comps-and-alternatives.md",
  "content/governance/ai-strategic-brief.md",
  "stakeholders/README.md",
  "stakeholders/stakeholder-registry.md",
  "stakeholders/kc-power-network.md",
  "stakeholders/connection-scoring.md",
  "stakeholders/research-gaps.md",
  "stakeholders/connection-mapping-results.md",
  "content/guides/README.md",
  "content/guides/ai-core-leadership-youthfront/README.md",
  "content/guides/ai-core-leadership-youthfront/index.md",
  "content/guides/ai-core-leadership-youthfront/brief-ceo.md",
  "content/guides/ai-core-leadership-youthfront/brief-coo.md",
  "content/guides/ai-core-leadership-youthfront/brief-evp-strategic.md",
  "content/guides/ai-core-leadership-youthfront/brief-vp-dev-marketing.md",
  "content/guides/ai-core-leadership-youthfront/brief-vp-ministries.md",
  "content/guides/ai-governance-youthfront/index.md",
  "content/guides/ai-youth-formation-youthfront/index.md",
  "content/guides/ai-fundraising-youthfront/index.md",
  "content/guides/ai-digital-content-comms-youthfront/index.md",
  "content/guides/ai-ethics-donor-intelligence-youthfront/index.md",
  "content/guides/ai-leadership-christian-nonprofits-youthfront/index.md",
  "content/guides/connection-mapping-playbook/index.md",
  "content/guides/donor-conversion-modifier-stack/index.md",
  "articles/agentic-connection-mapping.md",
  "articles/agentic-enrichment-design.md",
  "articles/agentic-enrichment-value-proposals.md",
  "articles/what-the-prospect-database-actually-is.md",
  "articles/searchable-content-rubric.md",
  "articles/linkedin-mcp-server.md",
  "content/presentations/youthfront-30-60-90/index.md",
];

function orderedCorpusPaths(yfRoot: string): string[] {
  const all: string[] = [];
  walkMdFiles(yfRoot, "", all);
  const set = new Set(all);
  const out: string[] = [];
  for (const p of PRIORITY_ORDER) {
    if (set.has(p)) {
      out.push(p);
      set.delete(p);
    }
  }
  const rest = [...set].sort((a, b) => a.localeCompare(b));
  out.push(...rest);
  return out;
}

function movementalEngagementPaths(): string[] {
  const dir = path.join(repoRoot, "docs/engagements/youthfront");
  return ["05-exemplar.md", "06-capability-brief.md", "07-tailored-proposal.md", "08-one-pager.md"]
    .map((f) => path.join(dir, f))
    .filter((p) => fs.existsSync(p));
}

function coverPage() {
  doc.rect(0, 0, doc.page.width, 7).fill(PRIMARY);
  doc.moveDown(4);
  doc.fontSize(9).fillColor(PRIMARY).font("Helvetica-Bold").text("YOUTHFRONT · SINGLE SOURCE OF TRUTH · 2026", {
    align: "center",
  });
  doc.moveDown(1);
  doc.fontSize(22).fillColor(INK).font("Helvetica-Bold").text("Youthfront", { align: "center" });
  doc.fontSize(13).font("Helvetica").fillColor(MUTED).text("Full research corpus edition", { align: "center" });
  doc.moveDown(1.2);
  doc
    .fontSize(9.5)
    .fillColor(INK)
    .text(
      "This PDF merges governance copy, stakeholder research, AI guides, pipeline architecture articles, and Movemental engagement artifacts. Compiled April–May 2026 via agentic research. Not an official Youthfront publication — verify filings and internal policy before external use.",
      { align: "left", width: TEXT_W(), lineGap: 3 },
    );
  doc.moveDown(1);
  doc
    .fontSize(9)
    .fillColor(MUTED)
    .font("Helvetica-Oblique")
    .text(
      "Canonical org titles: Natasha Nikkel — COO; Topher Philgreen — EVP Strategic Initiatives (per org-chart-draft). Some LinkedIn-derived stakeholder rows may show legacy titles; prefer board-roster and org-chart when they conflict.",
      { width: TEXT_W(), lineGap: 2 },
    );
}

function tocPage(paths: string[], yfRoot: string | null) {
  doc.addPage();
  doc.fontSize(15).fillColor(INK).font("Helvetica-Bold").text("Table of contents", { align: "center" });
  doc.moveDown(0.8);
  doc.font("Helvetica").fontSize(7.8).fillColor(INK);
  let n = 1;
  for (const rel of paths) {
    const label =
      yfRoot && !rel.startsWith("docs/") ? `yf-np-dashboard/_docs/_public/${rel}` : rel;
    doc.text(`${n}. ${label}`, { width: TEXT_W(), lineGap: 1.2 });
    n++;
  }
  doc.moveDown(0.6);
  doc.fontSize(8).fillColor(MUTED).text(`Total sections: ${n - 1}`, { align: "left" });
}

function renderSectionTitle(title: string) {
  doc.addPage();
  doc.fontSize(11).fillColor(PRIMARY).font("Helvetica-Bold").text(title, { width: TEXT_W() });
  doc.moveTo(48, doc.y + 2).lineTo(doc.page.width - 48, doc.y + 2).strokeColor("#e0e4e8").lineWidth(0.6).stroke();
  doc.moveDown(0.6);
}

async function main() {
  const yfRoot = resolveYfPublicDocs();
  const corpusPaths = yfRoot ? orderedCorpusPaths(yfRoot) : [];
  const engagementAbs = movementalEngagementPaths();

  if (!yfRoot) {
    console.warn(
      "[youthfront-pdf] yf-np-dashboard _docs/_public not found — writing Movemental engagement files only. Set YF_NP_DASHBOARD_PUBLIC_DOCS or clone yf-np-dashboard beside this repo.",
    );
  }

  doc = new PDFDocument({
    size: "A4",
    margin: 48,
    bufferPages: true,
    info: {
      Title: "Youthfront — 2026 Single Source of Truth (full corpus)",
      Author: "Movemental / agentic research compilation",
      Subject: "Youthfront nonprofit documentation",
      Keywords: "Youthfront, SSOT, governance, stakeholders, donor intelligence",
      CreationDate: new Date(),
    },
  });

  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  coverPage();
  tocPage(
    [...corpusPaths, ...engagementAbs.map((p) => path.relative(repoRoot, p))],
    yfRoot,
  );

  if (yfRoot) {
    for (const rel of corpusPaths) {
      const abs = path.join(yfRoot, rel);
      const raw = fs.readFileSync(abs, "utf8");
      const plain = mdToPlain(raw);
      renderSectionTitle(rel);
      doc.font("Helvetica").fontSize(8.8).fillColor(INK).text(plain, {
        width: TEXT_W(),
        align: "left",
        lineGap: 1.5,
      });
    }
  }

  for (const abs of engagementAbs) {
    const raw = fs.readFileSync(abs, "utf8");
    const plain = mdToPlain(raw);
    renderSectionTitle(`movemental engagement · ${path.basename(abs)}`);
    doc.font("Helvetica").fontSize(8.8).fillColor(INK).text(plain, {
      width: TEXT_W(),
      align: "left",
      lineGap: 1.5,
    });
  }

  const range = doc.bufferedPageRange();
  footerOnAllPages(range.count);

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  console.log(`Wrote ${outPath} (${range.count} pages, yfRoot=${yfRoot ?? "none"})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
