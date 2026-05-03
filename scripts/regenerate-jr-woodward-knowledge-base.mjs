/**
 * Rebuild docs/arguments/custom-gpt/jr-woodward-knowledge-base.md from
 * docs/movement_leader_research/jr-woodward/*. Run when the dossier changes.
 *
 *   node scripts/regenerate-jr-woodward-knowledge-base.mjs
 */

import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const JR = path.join(REPO_ROOT, "docs/movement_leader_research/jr-woodward");
const OUT = path.join(REPO_ROOT, "docs/arguments/custom-gpt/jr-woodward-knowledge-base.md");

/** Relative path under jr-woodward/ → TOC anchor id (must match markdown heading links) */
const FILES = [
  ["README.md", "readme"],
  ["primary-documents.md", "primary-documents"],
  ["summary.md", "summary"],
  ["sources.md", "sources"],
  ["profile/biography.md", "profile-biography"],
  ["profile/identity.md", "profile-identity"],
  ["profile/theology.md", "profile-theology"],
  ["profile/voice-analysis.md", "profile-voice-analysis"],
  ["identity-verification.md", "identity-verification"],
  ["digital-presence-discovery.md", "digital-presence-discovery"],
  ["digital-presence/platforms.md", "digital-presence-platforms"],
  ["digital-presence/websites.md", "digital-presence-websites"],
  ["digital-presence/social-media.md", "digital-presence-social-media"],
  ["digital-presence/newsletters.md", "digital-presence-newsletters"],
  ["content/books.md", "content-books"],
  ["content/articles.md", "content-articles"],
  ["content/courses.md", "content-courses"],
  ["content/academic.md", "content-academic"],
  ["content/videos.md", "content-videos"],
  ["content/audio.md", "content-audio"],
  ["network/organizations.md", "network-organizations"],
  ["network/collaborators.md", "network-collaborators"],
  ["network/events.md", "network-events"],
  ["network/endorsements.md", "network-endorsements"],
  ["media/press-coverage.md", "media-press-coverage"],
  ["media/reviews.md", "media-reviews"],
  ["media/citations.md", "media-citations"],
  ["analysis/audience-analysis.md", "analysis-audience-analysis"],
  ["analysis/content-analysis.md", "analysis-content-analysis"],
  ["content-analysis.md", "content-analysis"],
  ["analysis/gap-analysis.md", "analysis-gap-analysis"],
  ["gap-analysis.md", "gap-analysis"],
  ["analysis/movemental-fit.md", "analysis-movemental-fit"],
  ["movemental-analysis.md", "movemental-analysis"],
  ["analysis/competitive-landscape.md", "analysis-competitive-landscape"],
  ["_tracker.md", "_tracker"],
];

const today = new Date().toISOString().slice(0, 10);

const tocLines = FILES.map(
  ([rel, anchor]) => `- [${rel}](#${anchor})`,
);

const preamble = `# JR Woodward — Movement Leader Research (Custom GPT knowledge)

This document is an **assembled export** of the Movemental research dossier for **JR Woodward**. It is intended to be uploaded to a Custom GPT **alongside** the Movemental messaging / argument library under \`docs/arguments/custom-gpt/\`.

**Assembly rules**

- Body text below each separator is copied **verbatim** from \`docs/movement_leader_research/jr-woodward/\` without editorial rewriting.
- Only additions are: this preamble, a table of contents, and \`---\` + source-path markers between files.

**Canonical location of live research**

- \`docs/movement_leader_research/jr-woodward/\` (update there first; run \`node scripts/regenerate-jr-woodward-knowledge-base.mjs\` to refresh this bundle.)
- Movemental **product narrative**, book/home/fragmentation thesis, publishable article slugs, and **live route** facts: \`docs/arguments/custom-gpt/messaging-00-live-site-and-narrative-ssot.md\`, then \`docs/arguments/SITE-SSOT.md\` — use those for Movemental.com IA, not this dossier.

**Regenerated**: ${today}

---

## Table of contents

${tocLines.join("\n")}

---
`;

const chunks = [preamble];

for (const [rel, anchor] of FILES) {
  const abs = path.join(JR, rel);
  if (!fs.existsSync(abs)) {
    console.error(`Missing source file: ${abs}`);
    process.exit(1);
  }
  const body = fs.readFileSync(abs, "utf8");
  const sourceComment = `<!-- SOURCE: docs/movement_leader_research/jr-woodward/${rel} -->`;
  chunks.push(`<a id="${anchor}"></a>\n\n${sourceComment}\n\n${body.trimEnd()}\n\n---\n`);
}

fs.writeFileSync(OUT, chunks.join("\n"), "utf8");
console.log(`Wrote ${OUT} (${chunks.join("").length} chars)`);
