#!/usr/bin/env node
/**
 * Extract deduped arguments from deduped-megapage.html (+ tabbed routing),
 * then emit flat `docs/arguments/custom-gpt/messaging-01..08.md` bundles
 * (no long-lived subfolders — intermediate category dirs are removed after concat).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const HTML_PATH = join(ROOT, "docs/html/deduped-megapage.html");
const OUT_DIR = join(ROOT, "docs/arguments/custom-gpt");
/** Repo-relative path for SOURCE markers in flat bundles */
const REL_BASE = "docs/arguments/custom-gpt";

const html = readFileSync(HTML_PATH, "utf-8");

// ── Parse each <article class="card ..."> ──────────────────────────────
const cardRegex = /<article\s+class="card[^"]*"\s+data-category="([^"]+)"\s+data-strength="([^"]+)"\s+data-corpus="([^"]*?)"\s+data-size="(\d+)"\s+data-id="([^"]+)">([\s\S]*?)<\/article>/g;

const cards = [];
let match;
while ((match = cardRegex.exec(html)) !== null) {
  const [, category, strength, corpus, size, id, inner] = match;

  // Title
  const titleMatch = inner.match(/<h3 class="card__title">([\s\S]*?)<\/h3>/);
  const title = titleMatch ? decode(titleMatch[1].trim()) : "Untitled";

  // Body
  const bodyMatch = inner.match(/<p class="card__body">([\s\S]*?)<\/p>/);
  const body = bodyMatch ? decode(bodyMatch[1].trim()) : "";

  // Tags
  const tags = [];
  const tagRegex = /<ul class="card__tags">([\s\S]*?)<\/ul>/;
  const tagsBlock = inner.match(tagRegex);
  if (tagsBlock) {
    const liRegex = /<li>(.*?)<\/li>/g;
    let tm;
    while ((tm = liRegex.exec(tagsBlock[1])) !== null) tags.push(tm[1].trim());
  }

  // Gut-check question
  const qMatch = inner.match(/<blockquote class="card__question">[\s\S]*?<\/span>([\s\S]*?)<\/blockquote>/);
  const question = qMatch ? decode(qMatch[1].trim()) : "";

  // Alternate phrasings
  const alts = [];
  const altBlock = inner.match(/<details class="card__alt">([\s\S]*?)<\/details>/);
  if (altBlock) {
    const altItemRegex = /<li><strong class="alt__title">([\s\S]*?)<\/strong><span class="alt__corpus">([\s\S]*?)<\/span><p class="alt__body">([\s\S]*?)<\/p><\/li>/g;
    let am;
    while ((am = altItemRegex.exec(altBlock[1])) !== null) {
      alts.push({
        title: decode(am[1].trim()),
        corpus: am[2].trim(),
        body: decode(am[3].trim()),
      });
    }
  }

  // Sources
  const sources = [];
  const srcRegex = /<li class="card__src-pill"[^>]*>[\s\S]*?<span class="card__src-corpus">([\s\S]*?)<\/span><span class="card__src-path"[^>]*title="([^"]*)"[^>]*>[\s\S]*?<\/span><\/li>/g;
  let sm;
  while ((sm = srcRegex.exec(inner)) !== null) {
    sources.push({ corpus: sm[1].trim(), path: sm[2].trim() });
  }

  // Page routing (from tabbed-argument-page — we'll add this separately)
  cards.push({ id, category, strength, corpus: corpus.split(" "), size: Number(size), title, body, tags, question, alts, sources });
}

console.log(`Parsed ${cards.length} arguments from HTML`);

// ── Also parse the tabbed page for routing info ──────────────────────
const TABBED_PATH = join(ROOT, "docs/html/tabbed-argument-page.html");
const tabbedHtml = readFileSync(TABBED_PATH, "utf-8");

// Build a map: id → { tabs: [{tab, rank}] }
const routingMap = new Map();
const panelRegex = /<section class="panel"[^>]*data-panel="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
let pm;
while ((pm = panelRegex.exec(tabbedHtml)) !== null) {
  const tab = pm[1];
  const panelInner = pm[2];
  const liRegex = /<li class="card[^"]*" data-id="([^"]+)"[^>]*>\s*<div class="card__rank">(\d+)<\/div>/g;
  let lm;
  while ((lm = liRegex.exec(panelInner)) !== null) {
    const argId = lm[1];
    const rank = Number(lm[2]);
    if (!routingMap.has(argId)) routingMap.set(argId, []);
    routingMap.get(argId).push({ tab, rank });
  }
}

// ── Category labels ─────────────────────────────────────────────────
const CAT_LABELS = {
  argument: "Arguments",
  "pain-point": "Pain Points",
  "selling-point": "Selling Points",
  positioning: "Positioning",
  feature: "Features & Capabilities",
  theology: "Theology & Formation",
  strategy: "Strategy",
  proof: "Proof & Credibility",
  "business-model": "Business Model",
  audience: "Audience",
  ai: "AI Posture",
};

// ── Group by category ───────────────────────────────────────────────
const byCategory = {};
for (const c of cards) {
  (byCategory[c.category] ??= []).push(c);
}

// ── Sort within each category: high → medium → low, then by size desc ─
const STRENGTH_ORDER = { high: 0, medium: 1, low: 2 };
for (const arr of Object.values(byCategory)) {
  arr.sort((a, b) => (STRENGTH_ORDER[a.strength] - STRENGTH_ORDER[b.strength]) || (b.size - a.size));
}

// ── Write individual argument files per category ────────────────────
for (const [cat, items] of Object.entries(byCategory)) {
  const catDir = join(OUT_DIR, cat);
  mkdirSync(catDir, { recursive: true });

  for (const item of items) {
    const routing = routingMap.get(item.id) || [];
    const routingStr = routing.length
      ? routing.map((r) => `- **${formatTab(r.tab)}** — rank #${r.rank}`).join("\n")
      : "_Not yet routed to a specific page._";

    const altStr = item.alts.length
      ? item.alts.map((a) => `### ${a.title}\n**Source:** ${a.corpus}\n\n${a.body}`).join("\n\n")
      : "";

    const srcStr = item.sources.map((s) => `- \`${s.path}\` (${s.corpus})`).join("\n");

    const md = `---
id: "${item.id}"
category: "${cat}"
strength: "${item.strength}"
sources: ${item.size}
tags: [${item.tags.map((t) => `"${t}"`).join(", ")}]
---

# ${item.title}

**Category:** ${CAT_LABELS[cat] || cat} | **Strength:** ${item.strength} | **Sources:** ${item.size}

## Core Claim

${item.body}

${item.question ? `## Gut-Check Question\n\n> ${item.question}\n` : ""}
## Page Routing

${routingStr}

${altStr ? `## Alternate Phrasings\n\n${altStr}\n` : ""}
## Source Files

${srcStr}
`;

    writeFileSync(join(catDir, `${item.id}.md`), md.trim() + "\n");
  }
}

// ── Write by-page files (top arguments per page) ────────────────────
const byPageDir = join(OUT_DIR, "by-page");
mkdirSync(byPageDir, { recursive: true });

// Build page → sorted arguments
const PAGES = [
  "home", "movement-leaders", "churches-nonprofits", "how-it-works",
  "proof-about", "pricing-faq", "about", "evidence", "faq",
  "methodology", "pricing", "services", "system", "terms",
  "walkthrough", "who-we-serve",
];

const cardById = new Map(cards.map((c) => [c.id, c]));

for (const page of PAGES) {
  // Collect all arguments routed to this page with their rank
  const pageArgs = [];
  for (const [id, routes] of routingMap.entries()) {
    const route = routes.find((r) => r.tab === page);
    if (route) {
      const card = cardById.get(id);
      if (card) pageArgs.push({ ...card, rank: route.rank });
    }
  }
  pageArgs.sort((a, b) => a.rank - b.rank);

  // Only create files for pages that have hand-ranked args (not the 173-for-all pages)
  // But include them all — just mark the top 25 as "hand-ranked"
  const top = pageArgs.slice(0, 30); // take top 30 for each page

  if (top.length === 0) continue;

  const lines = [`# ${formatTab(page)} — Top Arguments

Page intent: ${getPageIntent(page)}

---
`];

  for (const arg of top) {
    lines.push(`## ${arg.rank}. ${arg.title}

**ID:** ${arg.id} | **Category:** ${CAT_LABELS[arg.category] || arg.category} | **Strength:** ${arg.strength}

${arg.body}

${arg.question ? `> **Gut-check:** ${arg.question}\n` : ""}
---
`);
  }

  writeFileSync(join(byPageDir, `${page}.md`), lines.join("\n").trim() + "\n");
}

// ── Flatten to messaging-*.md (Custom GPT: single directory, no subfolders) ─
bundleCustomGptMarkdown(OUT_DIR);
removeCategoryDirectories(OUT_DIR);
writeCustomGptReadme(OUT_DIR, cards.length);

console.log(`✓ Wrote ${cards.length} argument stubs, bundled to messaging-01..08, removed category folders`);
console.log(`✓ Wrote by-page sources then messaging-08-by-page.md`);
console.log(`✓ Wrote README.md (flat layout)`);

// ── Flat bundle for Custom GPT (concat category + by-page markdown) ─
function readCategoryChunks(outDir, categories) {
  let s = "";
  for (const cat of categories) {
    const dir = join(outDir, cat);
    const files = readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .sort();
    for (const f of files) {
      s += `<!-- SOURCE: ${REL_BASE}/${cat}/${f} -->\n\n`;
      s += readFileSync(join(dir, f), "utf-8").trim() + "\n\n---\n\n";
    }
  }
  return s;
}

function bundleCustomGptMarkdown(outDir) {
  const specs = [
    [
      "messaging-01-arguments.md",
      "# Movemental messaging corpus — Arguments\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former path: `argument/`.\n\n> **Note:** YAML **Page routing** in each card may name **retired** pages (e.g. Methodology, Who we serve). For **current** narrative, book, home, `/fragmentation`, and publishable `/articles` slugs, read **`messaging-00-live-site-and-narrative-ssot.md`** first, then `docs/arguments/SITE-SSOT.md` §8.\n\n---\n\n",
      ["argument"],
    ],
    [
      "messaging-02-pain-positioning-selling.md",
      "# Movemental messaging corpus — Pain points, positioning, selling points\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former paths: `pain-point/`, `positioning/`, `selling-point/`.\n\n> **Live narrative / routes:** `messaging-00-live-site-and-narrative-ssot.md`, then `../SITE-SSOT.md`.\n\n---\n\n",
      ["pain-point", "positioning", "selling-point"],
    ],
    [
      "messaging-03-features.md",
      "# Movemental messaging corpus — Features and capabilities\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former path: `feature/`.\n\n> **Live narrative / routes:** `messaging-00-live-site-and-narrative-ssot.md`, then `../SITE-SSOT.md`.\n\n---\n\n",
      ["feature"],
    ],
    [
      "messaging-04-strategy.md",
      "# Movemental messaging corpus — Strategy\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former path: `strategy/`.\n\n> **Live narrative / routes:** `messaging-00-live-site-and-narrative-ssot.md`, then `../SITE-SSOT.md`.\n\n---\n\n",
      ["strategy"],
    ],
    [
      "messaging-05-theology.md",
      "# Movemental messaging corpus — Theology and formation\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former path: `theology/`.\n\n> **Live narrative / routes:** `messaging-00-live-site-and-narrative-ssot.md`, then `../SITE-SSOT.md`.\n\n---\n\n",
      ["theology"],
    ],
    [
      "messaging-06-proof.md",
      "# Movemental messaging corpus — Proof and credibility\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former path: `proof/`.\n\n> **Live narrative / routes:** `messaging-00-live-site-and-narrative-ssot.md`, then `../SITE-SSOT.md`. **Quant claims:** verify or soften per messaging-00 §8.\n\n---\n\n",
      ["proof"],
    ],
    [
      "messaging-07-business-audience-ai.md",
      "# Movemental messaging corpus — Business model, audience, AI posture\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former paths: `business-model/`, `audience/`, `ai/`.\n\n> **Live narrative / routes:** `messaging-00-live-site-and-narrative-ssot.md`, then `../SITE-SSOT.md`.\n\n---\n\n",
      ["business-model", "audience", "ai"],
    ],
  ];
  for (const [fname, header, cats] of specs) {
    writeFileSync(join(outDir, fname), header + readCategoryChunks(outDir, cats));
  }

  const byPageDir = join(outDir, "by-page");
  const header08 =
    "# Movemental messaging corpus — By page (site routing)\n\nAssembled for Custom GPT upload. Each section is **verbatim** from the original corpus file; only this header and `SOURCE` dividers were added. Former path: `by-page/`.\n\n> **Live site SSOT:** Section titles below reflect the **historical** HTML corpus, not necessarily current URLs or nav labels. For **current** narrative and routes read **`messaging-00-live-site-and-narrative-ssot.md`**, then [`../SITE-SSOT.md`](../SITE-SSOT.md) (especially §8).\n\n---\n\n";
  let body08 = header08;
  for (const f of readdirSync(byPageDir)
    .filter((x) => x.endsWith(".md"))
    .sort()) {
    body08 += `<!-- SOURCE: ${REL_BASE}/by-page/${f} -->\n\n`;
    body08 += readFileSync(join(byPageDir, f), "utf-8").trim() + "\n\n---\n\n";
  }
  writeFileSync(join(outDir, "messaging-08-by-page.md"), body08);
}

function removeCategoryDirectories(outDir) {
  for (const d of [
    "argument",
    "pain-point",
    "positioning",
    "selling-point",
    "feature",
    "strategy",
    "theology",
    "proof",
    "business-model",
    "audience",
    "ai",
    "by-page",
  ]) {
    rmSync(join(outDir, d), { recursive: true, force: true });
  }
}

function writeCustomGptReadme(outDir, cardCount) {
  const readme = `# Movemental Custom GPT knowledge base

Flat bundle for upload to a **Custom GPT**: markdown files in this directory (no subfolders for upload).

- **\`messaging-00-live-site-and-narrative-ssot.md\`** — hand-maintained **live** narrative, IA, book, home, fragmentation page, and publishable article slugs (**read first** for anything that must match the shipped site).
- **\`messaging-01\` … \`messaging-08\`** — YAML/HTML **claim library** (regenerated by \`extract-arguments.mjs\`). Page routing inside cards may name **retired** pages.
- **\`jr-woodward-knowledge-base.md\`**, **\`rowland-smith-knowledge-base.md\`** — optional leader research (regenerated by dedicated scripts, not by \`extract-arguments.mjs\`).

## Site SSOT (routes, nav, stack)

**Live routes, navigation, component folders, stack, and legacy→current page crosswalk** are maintained in the parent folder:

- [\`../README.md\`](../README.md) — index of what is authoritative where
- [\`../SITE-SSOT.md\`](../SITE-SSOT.md) — **current** design pointers, architecture, route table, component inventory

For shipping copy or factual questions about the site: **\`messaging-00\` → SITE-SSOT → claim cards**.

## Extraction

\`messaging-01\` … \`messaging-08\` and this README are regenerated by:

\`\`\`bash
node scripts/extract-arguments.mjs
\`\`\`

The script parses \`docs/html/deduped-megapage.html\` and \`docs/html/tabbed-argument-page.html\`, briefly writes per-category markdown, concatenates into the flat bundles, then deletes the intermediate folders. The SSOT callouts at the top of \`messaging-01\` / \`messaging-08\` are **emitted by this script**. **\`messaging-00-live-site-and-narrative-ssot.md\` is not modified** by this script—edit it by hand when the home page, fragmentation story, book spine, or article list changes.

## Leader research (manual)

- **jr-woodward-knowledge-base.md** — regenerate from \`docs/movement_leader_research/jr-woodward/\` when that dossier changes:

  \`\`\`bash
  node scripts/regenerate-jr-woodward-knowledge-base.mjs
  \`\`\`

- **rowland-smith-knowledge-base.md** — regenerate from \`docs/movement_leader_research/rowland-smith/\` when that dossier changes:

  \`\`\`bash
  node scripts/regenerate-rowland-smith-knowledge-base.mjs
  \`\`\`

## Files

| File | Contents |
|------|----------|
| messaging-00-live-site-and-narrative-ssot.md | **Live** narrative + IA + book + home + fragmentation + \`/articles\` slug list (hand-maintained) |
| messaging-01-arguments.md | Arguments (was \`argument/\`) |
| messaging-02-pain-positioning-selling.md | Pain points, positioning, selling points |
| messaging-03-features.md | Features and capabilities |
| messaging-04-strategy.md | Strategy |
| messaging-05-theology.md | Theology and formation |
| messaging-06-proof.md | Proof and credibility |
| messaging-07-business-audience-ai.md | Business model, audience, AI posture |
| messaging-08-by-page.md | Claims grouped by **historical** marketing page slugs (see SITE-SSOT §8) |
| jr-woodward-knowledge-base.md | JR Woodward movement-leader research (optional context) |
| rowland-smith-knowledge-base.md | Rowland Smith movement-leader research (optional context) |

Each \`messaging-01\` … \`messaging-08\` file concatenates former per-claim markdown in alphabetical order within each former category. Original YAML front matter and body are unchanged when extracted from HTML; only bundle headers and \`<!-- SOURCE: ... -->\` markers were added between files.

**Corpus size (last extract):** ${cardCount} unique cards from HTML.

## Suggested Custom GPT instructions

\`\`\`
You are the Movemental messaging assistant.

Knowledge order:
1. Read messaging-00-live-site-and-narrative-ssot.md first for live URLs, the six-stage fragmentation story, book metadata, home page thesis, navigation hubs, and publishable article slugs.
2. Use docs/arguments/SITE-SSOT.md for the full route table, component locations, and legacy→current page crosswalk (§8).
3. Use messaging-01 through messaging-08 for argument depth, gut-check questions, and alternate phrasings. YAML "Page routing" may list retired page names—map to live routes using messaging-00 + SITE-SSOT.
4. Treat jr-woodward-knowledge-base.md and rowland-smith-knowledge-base.md as optional leader research, not Movemental corporate voice.

When writing copy or handling objections:
- Prefer HIGH-strength claims; check YAML front matter in each messaging-01…08 section.
- Cite the SOURCE path comment when making claims from the corpus.
- Do not treat unverified engineering statistics in proof cards as census facts unless grounded in the repo or cited evidence surfaces.

Key concepts: dual intelligences (corpus + relationships); six stages (integration is load-bearing in the book); scenius; credibility; Movemental as infrastructure; audiences — movement leaders, churches, nonprofits, institutions; missional, incarnational tone without being churchy.
\`\`\`
`;
  writeFileSync(join(outDir, "README.md"), readme.trim() + "\n");
}

// ── Helpers ─────────────────────────────────────────────────────────
function decode(s) {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, "");
}

function formatTab(tab) {
  return tab
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function getCatDesc(cat) {
  const descs = {
    argument: "The intellectual and theological case — what has to hold independent of features",
    "pain-point": "Problems movement leaders face that Movemental solves",
    "selling-point": "Key differentiators and unique value propositions",
    positioning: "How Movemental is positioned in the market",
    feature: "Specific features, capabilities, and deliverables",
    theology: "Theological grounding and formation framework",
    strategy: "Strategic claims about approach and methodology",
    proof: "Evidence, track record, and credibility signals",
    "business-model": "Revenue model and unit economics",
    audience: "Target audience insights and ICP definition",
    ai: "AI posture — how Movemental uses and frames AI",
  };
  return descs[cat] || "";
}

function getPageIntent(page) {
  const intents = {
    home: '"What is this / why now / why different" in 30 seconds.',
    "movement-leaders": "Name this leader's pain, show the relief, open the door.",
    "churches-nonprofits": "Specific product + safety + theology, board-readable.",
    "how-it-works": "Does a skeptic learn the actual mechanism here?",
    "proof-about": "Stacked credibility — track record → technical rigor → founder voice.",
    "pricing-faq": "Answer the buying objection with specific numbers.",
    about: "Identity and founder narrative.",
    evidence: "Quantified and third-party proof.",
    faq: "Objections and comparisons.",
    methodology: "How credibility is produced.",
    pricing: "Model and unit economics.",
    services: "Deliverables and packaging.",
    system: "Architecture and discovery.",
    terms: "Legal and data risk.",
    walkthrough: "Journey and milestones.",
    "who-we-serve": "ICPs and segment pains.",
  };
  return intents[page] || "";
}
