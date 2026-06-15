/**
 * Rebuild docs/arguments/custom-gpt/rowland-smith-knowledge-base.md from
 * docs/movement_leader_research/rowland-smith/*. Run when the dossier changes.
 *
 *   node scripts/regenerate-rowland-smith-knowledge-base.mjs
 *
 * Root stubs (gap-analysis.md, content-analysis.md, movemental-analysis.md) are
 * omitted; canonical bodies live under analysis/.
 */

import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const LEADER = path.join(REPO_ROOT, "docs/movement_leader_research/rowland-smith");
const OUT = path.join(REPO_ROOT, "docs/arguments/custom-gpt/rowland-smith-knowledge-base.md");

/** Relative path under rowland-smith/ → TOC anchor id */
const FILES = [
  ["README.md", "readme"],
  ["summary.md", "summary"],
  ["sources.md", "sources"],
  ["profile/identity.md", "profile-identity"],
  ["profile/biography.md", "profile-biography"],
  ["identity-verification.md", "identity-verification"],
  ["digital-presence-discovery.md", "digital-presence-discovery"],
  ["network/organizations.md", "network-organizations"],
  ["network/collaborators.md", "network-collaborators"],
  ["network/events.md", "network-events"],
  ["network/endorsements.md", "network-endorsements"],
  ["analysis/content-analysis.md", "analysis-content-analysis"],
  ["analysis/gap-analysis.md", "analysis-gap-analysis"],
  ["analysis/movemental-fit.md", "analysis-movemental-fit"],
  ["fragmentation-story.md", "fragmentation-story"],
];

const today = new Date().toISOString().slice(0, 10);

const tocLines = FILES.map(([rel, anchor]) => `- [${rel}](#${anchor})`);

const preamble = `# Rowland Smith — Movement Leader Research (Custom GPT knowledge)

This document is an **assembled export** of the Movemental research dossier for **Leo Rowland Smith** ("L. Rowland Smith"). It is intended to be uploaded to a Custom GPT **alongside** the Movemental messaging / argument library under \`docs/arguments/custom-gpt/\`.

**Assembly rules**

- Body text below each separator is copied **verbatim** from \`docs/movement_leader_research/rowland-smith/\` without editorial rewriting.
- Only additions are: this preamble, a table of contents, and \`---\` + source-path markers between files.

**Canonical location of live research**

- \`docs/movement_leader_research/rowland-smith/\` (update there first; run \`node scripts/regenerate-rowland-smith-knowledge-base.mjs\` to refresh this bundle.)
- Movemental **product narrative**, book/home/fragmentation thesis, publishable article slugs, and **live route** facts: \`docs/arguments/custom-gpt/messaging-00-live-site-and-narrative-ssot.md\`, then \`docs/arguments/SITE-SSOT.md\` — use those for movemental.ai IA, not this dossier.

**Regenerated**: ${today}

---

## Table of contents

${tocLines.join("\n")}

---
`;

const chunks = [preamble];

for (const [rel, anchor] of FILES) {
  const abs = path.join(LEADER, rel);
  if (!fs.existsSync(abs)) {
    console.error(`Missing source file: ${abs}`);
    process.exit(1);
  }
  const body = fs.readFileSync(abs, "utf8");
  const sourceComment = `<!-- SOURCE: docs/movement_leader_research/rowland-smith/${rel} -->`;
  chunks.push(`<a id="${anchor}"></a>\n\n${sourceComment}\n\n${body.trimEnd()}\n\n---\n`);
}

fs.writeFileSync(OUT, chunks.join("\n"), "utf8");
console.log(`Wrote ${OUT} (${fs.readFileSync(OUT, "utf8").length} chars)`);
