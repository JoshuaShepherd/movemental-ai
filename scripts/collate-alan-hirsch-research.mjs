#!/usr/bin/env node
/**
 * Collate Alan Hirsch movement leader research into a single markdown + manifest.
 * Does NOT modify source files.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve("docs/movement_leader_research");
const LEADER = path.join(ROOT, "alan-hirsch");
const BASELINE = path.join(ROOT, "alan-hirsch-baseline-report.md");
const OUT_MD = path.join(LEADER, "ALAN_HIRSCH_RESEARCH_COLLATED.md");
const OUT_MANIFEST = path.join(LEADER, "ALAN_HIRSCH_COLLATION_MANIFEST.json");

/** @type {{ part: string, title: string, files: string[], ledgerOnly?: string[] }} */
const STRUCTURE = [
  {
    part: "I",
    title: "Identity, biography, timeline",
    files: [
      "profile/identity.md",
      "identity-verification.md",
      "profile/biography.md",
      "ALAN_HIRSCH_TIMELINE.md",
      "ALAN_HIRSCH_AUTHOR_PROFILE.md",
    ],
    ledgerOnly: ["biography.md"],
  },
  {
    part: "II",
    title: "Voice, theology, frameworks",
    files: [
      "profile/voice-analysis.md",
      "profile/theology.md",
      "hirsch-affinity-rubric.md",
      "hirsch-affinity-ranked-list.md",
    ],
  },
  {
    part: "III",
    title: "Content corpus",
    files: [
      "content/books.md",
      "content/articles.md",
      "content/academic.md",
      "content/audio.md",
      "content/videos.md",
      "content/courses.md",
      "ALAN_HIRSCH_CONTENT_AUDIT.md",
    ],
  },
  {
    part: "IV",
    title: "Digital presence and fragmentation",
    files: [
      "digital-presence/websites.md",
      "digital-presence/social-media.md",
      "digital-presence/newsletters.md",
      "digital-presence/platforms.md",
      "digital-presence-discovery.md",
      "fragmentation-story.md",
    ],
  },
  {
    part: "V",
    title: "Network, organizations, affinity",
    files: [
      "network/organizations.md",
      "network/collaborators.md",
      "network/endorsements.md",
      "network/events.md",
      "ALAN_HIRSCH_ORGS.md",
    ],
  },
  {
    part: "VI",
    title: "Media, citations, reviews",
    files: ["media/press-coverage.md", "media/citations.md", "media/reviews.md"],
  },
  {
    part: "VII",
    title: "Audience and market",
    files: [
      "ALAN_HIRSCH_AUDIENCE_PROFILE.md",
      "analysis/audience-analysis.md",
    ],
  },
  {
    part: "VIII",
    title: "Strategic analysis and Movemental fit",
    files: [
      "analysis/content-analysis.md",
      "analysis/movemental-fit.md",
      "analysis/competitive-landscape.md",
      "committed-voice.md",
      "ALAN_HIRSCH_CALLING_PROFILE.md",
    ],
    ledgerOnly: ["content-analysis.md", "movemental-analysis.md"],
  },
  {
    part: "IX",
    title: "Gaps, opportunities, playbook",
    files: [
      "analysis/gap-analysis.md",
      "content-marketing-playbook.md",
      "README.md",
    ],
    ledgerOnly: ["gap-analysis.md", "summary.md"],
  },
  {
    part: "X",
    title: "Sources and research operations",
    files: [
      "sources.md",
      "_tracker.md",
      "AUTHOR_PROFILE_PRESENTATION_STANDARDS.md",
      "ALAN_HIRSCH_PROFILES_INDEX.md",
    ],
  },
];

const BASELINE_SECTION = {
  part: "VIII",
  title: "Baseline system analysis (cross-repo)",
  file: "alan-hirsch-baseline-report.md",
};

const LEDGER = [
  {
    canonical: "Part I — profile/biography.md",
    mergedFrom: ["biography.md"],
    notes: "Root biography.md duplicates profile/biography.md; canonical is profile/ subfolder.",
  },
  {
    canonical: "Part VIII — analysis/content-analysis.md",
    mergedFrom: ["content-analysis.md"],
    notes: "Root content-analysis.md duplicates analysis/content-analysis.md.",
  },
  {
    canonical: "Part VIII — analysis/movemental-fit.md",
    mergedFrom: ["movemental-analysis.md"],
    notes: "movemental-analysis.md overlaps movemental-fit and README recommendation.",
  },
  {
    canonical: "Part IX — analysis/gap-analysis.md",
    mergedFrom: ["gap-analysis.md"],
    notes: "Root gap-analysis.md duplicates analysis/gap-analysis.md.",
  },
  {
    canonical: "Part IX — README.md (opportunities, gaps, notes)",
    mergedFrom: ["summary.md", "ALAN_HIRSCH_COMPLETE_PROFILE.md"],
    notes:
      "summary.md and COMPLETE_PROFILE executive content merged into README inclusion; full COMPLETE_PROFILE prose largely overlaps AUTHOR + AUDIENCE + CONTENT profiles.",
  },
];

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Demote document H1 to H3 so part H2 stays hierarchy king */
function normalizeContent(raw, sourceRel) {
  const lines = raw.split("\n");
  const out = [];
  let skippedMeta = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (
      skippedMeta < 8 &&
      (/^\*\*Status\*\*:/i.test(line) ||
        /^\*\*Last updated\*\*:/i.test(line) ||
        /^\*\*Skill\*\*:/i.test(line) ||
        /^\*\*Confidence\*\*:/i.test(line) ||
        /^---\s*$/.test(line) && i < 12)
    ) {
      if (/^---\s*$/.test(line)) {
        skippedMeta++;
        continue;
      }
      skippedMeta++;
      continue;
    }
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      out.push("### " + line.slice(2));
      continue;
    }
    out.push(line);
  }
  return out.join("\n").trim();
}

function readSection(relPath) {
  const full = path.join(LEADER, relPath);
  if (!fs.existsSync(full)) {
    return { relPath, content: `> **MISSING SOURCE:** \`${relPath}\`\n`, words: 0 };
  }
  const raw = fs.readFileSync(full, "utf8");
  const content = normalizeContent(raw, relPath);
  return { relPath, content, words: wordCount(content) };
}

function buildSourceIndex() {
  const all = [];
  function walk(dir, prefix = "") {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      if (ent.isDirectory()) walk(path.join(dir, ent.name), rel);
      else if (ent.name.endsWith(".md")) all.push(rel);
    }
  }
  walk(LEADER);
  all.sort();
  return all;
}

const EXECUTIVE_SYNTHESIS = `Alan Hirsch is the gravitational center of the contemporary Western missional-movement field: an Australian missiologist (born Johannesburg, 1959) whose frameworks—**mDNA** (*The Forgotten Ways*), **APEST/5Q**, and the Christology → missiology → ecclesiology stack—have been adopted by denominations, planting networks, and seminaries worldwide. More than **150,000 APEST assessments** and **20 books across seven publishers** document intellectual authority; **seven founded organizations** (Forge, 100Movements, 5Q Collective, and others) document embodied leadership.

The research corpus assembled here (51 source files, ~99,000 words) converges on one structural finding: **influence is embodied and fragmented; digital infrastructure is underdeveloped.** Personal digital presence scores ~3.2/5. There is no owned YouTube channel despite 38+ videos on third-party channels; email conversion from social (~37.9K Twitter) to Substack (~1.5K) is ~4% versus industry 15–25%; flagship audiobooks and post-assessment formation journeys are largely absent. The baseline system analysis estimates realized TAM at **50,000–80,000** meaningfully formed individuals versus **500,000–1,500,000** latent TAM if content were structured, searchable, and journey-mapped—starting with the ~110,000–120,000 assessment completers who received no onward path.

**Movemental fit (8.6/10)** treats Hirsch as anchor author: coined term "movemental," pipeline of co-authors (Frost, Ferguson, Stetzer, Cole, Brisco), and a body of work that is exactly the fragmentation problem the platform solves. This collated edition preserves every unique fact from the source tree while deduplicating six known file pairs via Appendix A; competitive landscape remains a documented stub. Read Parts I–II for identity and voice, III–IV for corpus and scatter, V–VI for network and proof, VII–IX for audience/strategy/gaps, and the baseline report section for cross-repo deployment economics.`;

function buildToc(sections) {
  const lines = ["## Table of contents", ""];
  lines.push("- [How to read this document](#how-to-read-this-document)");
  lines.push("- [Executive synthesis](#executive-synthesis)");
  for (const s of sections) {
    const id = slugify(`part-${s.part}-${s.title}`);
    lines.push(`- [Part ${s.part} — ${s.title}](#${id})`);
  }
  lines.push("- [Appendix A — Provenance & deduplication ledger](#appendix-a--provenance--deduplication-ledger)");
  lines.push("- [Appendix B — Open questions & stubs](#appendix-b--open-questions--stubs)");
  lines.push("- [Appendix C — Source file index](#appendix-c--source-file-index)");
  lines.push(
    "- [Appendix D — Full text of ledger-only sources](#appendix-d--full-text-of-ledger-only-sources)"
  );
  lines.push("");
  return lines.join("\n");
}

const LEDGER_ONLY_FILES = [
  "biography.md",
  "gap-analysis.md",
  "content-analysis.md",
  "movemental-analysis.md",
  "summary.md",
  "ALAN_HIRSCH_COMPLETE_PROFILE.md",
];

function buildAppendixD() {
  let out =
    "\n## Appendix D — Full text of ledger-only sources\n\n> Files deduplicated in Parts I–IX appear here in full so no source prose is lost.\n\n";
  for (const rel of LEDGER_ONLY_FILES) {
    const full = path.join(LEADER, rel);
    if (!fs.existsSync(full)) continue;
    const raw = fs.readFileSync(full, "utf8");
    out += `\n### Ledger archive: \`${rel}\`\n\n${raw.trim()}\n\n---\n\n`;
  }
  return out;
}

function main() {
  const collatedAt = new Date().toISOString();
  const sections = [];
  const manifestSources = [];
  let totalWords = 0;

  const parts = [];

  parts.push(`# Alan Hirsch — Movement Leader Research (Collated Edition)

**Version:** 1.0.0  
**Collated:** ${collatedAt.slice(0, 10)}  
**Sources:** 51 markdown files (50 in \`alan-hirsch/\` + baseline report)  
**Editorial model:** Canonical body + provenance ledger; no source files were deleted.

`);

  for (const block of STRUCTURE) {
    const partId = slugify(`part-${block.part}-${block.title}`);
    sections.push({ part: block.part, title: block.title, id: partId });
    parts.push(`\n## Part ${block.part} — ${block.title} {#${partId}}\n`);

    for (const rel of block.files) {
      const { relPath, content, words } = readSection(rel);
      totalWords += words;
      manifestSources.push({
        path: `docs/movement_leader_research/alan-hirsch/${relPath}`,
        wordCount: words,
        sha256: sha256(path.join(LEADER, relPath)),
        sectionsUsed: [`Part ${block.part} — ${block.title}`],
        inBody: true,
      });
      parts.push(
        `\n#### Source: \`${relPath}\` *(source: docs/movement_leader_research/alan-hirsch/${relPath})*\n\n${content}\n`
      );
    }

    if (block.ledgerOnly) {
      for (const rel of block.ledgerOnly) {
        const full = path.join(LEADER, rel);
        if (fs.existsSync(full)) {
          manifestSources.push({
            path: `docs/movement_leader_research/alan-hirsch/${rel}`,
            wordCount: wordCount(fs.readFileSync(full, "utf8")),
            sha256: sha256(full),
            sectionsUsed: ["Appendix A — ledger only"],
            inBody: false,
          });
        }
      }
    }
  }

  // Baseline report
  const baselineRaw = fs.readFileSync(BASELINE, "utf8");
  const baselineContent = normalizeContent(baselineRaw, "alan-hirsch-baseline-report.md");
  const baselineWords = wordCount(baselineContent);
  totalWords += baselineWords;
  const baselineId = slugify(`part-viii-baseline-system-analysis`);
  parts.push(
    `\n## Part VIII (continued) — Baseline system analysis (cross-repo) {#${baselineId}}\n\n#### Source: \`alan-hirsch-baseline-report.md\` *(source: docs/movement_leader_research/alan-hirsch-baseline-report.md)*\n\n${baselineContent}\n`
  );
  manifestSources.push({
    path: "docs/movement_leader_research/alan-hirsch-baseline-report.md",
    wordCount: baselineWords,
    sha256: sha256(BASELINE),
    sectionsUsed: ["Part VIII — Baseline system analysis"],
    inBody: true,
  });

  const toc = buildToc(sections);

  const howToRead = `## How to read this document

- **Canonical body (Parts I–X):** Merged research prose. Duplicate source files are omitted from the body and listed in [Appendix A](#appendix-a--provenance--deduplication-ledger).
- **Source markers:** Each subsection is labeled \`Source: path\` so claims trace to the original file.
- **Heading normalization:** Source document titles were demoted one level so this file's \`## Part\` headings remain the top structure.
- **Conflicts:** If sources disagree on a number, both values are preserved with a \`> **CONFLICT**\` callout in the source file; this collation does not resolve them silently.
- **Stubs:** Empty research phases are listed in [Appendix B](#appendix-b--open-questions--stubs)—content is not invented.

## Executive synthesis

${EXECUTIVE_SYNTHESIS}
`;

  // Appendices
  let appendixA = "\n## Appendix A — Provenance & deduplication ledger\n\n| Canonical section | Merged from | Notes |\n|-------------------|-------------|-------|\n";
  for (const row of LEDGER) {
    appendixA += `| ${row.canonical} | ${row.mergedFrom.map((f) => `\`${f}\``).join(", ")} | ${row.notes} |\n`;
  }

  const appendixB = `## Appendix B — Open questions & stubs

| Item | Status | Source |
|------|--------|--------|
| Competitive landscape (peer comparison) | **Stub — not populated** | \`analysis/competitive-landscape.md\` |
| Exact YouTube aggregate view counts | Unknown — third-party channels only | \`README.md\` research gaps |
| Google Scholar h-index / citations | Profile exists; metrics not public | \`README.md\` |
| Instagram @alandhirsch ownership | Unverified | \`README.md\` |
| Current local church membership | Not documented post-SMRC | \`README.md\` |
| Speaking fees | Not public | \`README.md\` |
| 5QCast current status | Last episode date unclear | \`README.md\` |
| WorldCat/OCLC holdings | Not measured | \`README.md\` |
| Specific book awards | "Award-winning" without named awards | \`README.md\` |
| Related guides referenced in PROFILES_INDEX | Paths may be external (not in this folder) | \`ALAN_HIRSCH_PROFILES_INDEX.md\` |
`;

  const allSources = buildSourceIndex();
  let appendixC = "## Appendix C — Source file index\n\n| File | In body | Description |\n|------|---------|-------------|\n";
  const inBodySet = new Set(
    manifestSources.filter((s) => s.inBody).map((s) => s.path.replace(/^docs\/movement_leader_research\/alan-hirsch\//, ""))
  );
  for (const rel of allSources) {
    const inBody = inBodySet.has(rel) ? "Yes" : "Ledger / overlap";
    appendixC += `| \`${rel}\` | ${inBody} | Research artifact |\n`;
  }
  appendixC += `| \`../alan-hirsch-baseline-report.md\` | Yes | Cross-repo TAM and system analysis |\n`;

  const appendixD = buildAppendixD();

  const finalDoc = [
    parts[0],
    toc,
    howToRead,
    ...parts.slice(1),
    appendixA,
    appendixB,
    appendixC,
    appendixD,
  ].join("\n");

  fs.writeFileSync(OUT_MD, finalDoc, "utf8");
  const outWords = wordCount(finalDoc);

  const manifest = {
    version: 1,
    collatedAt,
    collatedPath: "docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md",
    sourceCount: 51,
    collatedWordCount: outWords,
    sourceWordsInBody: totalWords,
    deduplicatedFilesLedgerOnly: LEDGER.flatMap((r) => r.mergedFrom),
    sources: manifestSources,
  };
  fs.writeFileSync(OUT_MANIFEST, JSON.stringify(manifest, null, 2), "utf8");

  console.log(JSON.stringify({ outWords, totalWords, outMd: OUT_MD, manifest: OUT_MANIFEST }, null, 2));
}

main();
