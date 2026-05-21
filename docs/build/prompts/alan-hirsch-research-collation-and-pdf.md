# Prompt: Collate Alan Hirsch movement leader research → master markdown → Desktop PDF

**Target agent:** Claude Code, Cursor, Codex, or any capable coding agent with repo write access  
**Audience for review:** Josh / Movemental operators who need a single readable Alan Hirsch research reference  
**Repo / surface:** `movemental-ai` — `docs/movement_leader_research/alan-hirsch/` + `alan-hirsch-baseline-report.md`  
**Plan (read first):** [docs/build/plans/alan-hirsch-research-collation-plan.md](../plans/alan-hirsch-research-collation-plan.md)  
**Last updated:** 2026-05-20  

---

## 1. Role and stance

You are a **documentation architect and research editor**. Your job is to merge ~51 markdown research files into one authoritative, de-duplicated master document, then export a PDF — **without modifying or deleting any source file**.

Prefer precision over brevity. When in doubt, **keep the fact** and move duplicate wording to the provenance ledger rather than cutting content.

---

## 2. Goal

1. **Ingest** every markdown file listed in Section 3.  
2. **Write** `docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md` — the full edited collation (not a file list, not an outline).  
3. **Index** it with a linked table of contents and a JSON manifest mapping sources → sections.  
4. **Export** `Alan-Hirsch-Movement-Leader-Research.pdf` to the user’s Desktop.  

The collated markdown is the **primary deliverable**. The PDF is a rendering of that file after QA passes.

---

## 3. Context — only what's load-bearing

### Source corpus (51 files — do not delete or truncate these)

**Inside** `docs/movement_leader_research/alan-hirsch/` (50 files):

```text
ALAN_HIRSCH_AUDIENCE_PROFILE.md
ALAN_HIRSCH_AUTHOR_PROFILE.md
ALAN_HIRSCH_CALLING_PROFILE.md
ALAN_HIRSCH_COMPLETE_PROFILE.md
ALAN_HIRSCH_CONTENT_AUDIT.md
ALAN_HIRSCH_ORGS.md
ALAN_HIRSCH_PROFILES_INDEX.md
ALAN_HIRSCH_TIMELINE.md
AUTHOR_PROFILE_PRESENTATION_STANDARDS.md
README.md
_tracker.md
analysis/audience-analysis.md
analysis/competitive-landscape.md
analysis/content-analysis.md
analysis/gap-analysis.md
analysis/movemental-fit.md
biography.md
committed-voice.md
content-analysis.md
content-marketing-playbook.md
content/academic.md
content/articles.md
content/audio.md
content/books.md
content/courses.md
content/videos.md
digital-presence-discovery.md
digital-presence/newsletters.md
digital-presence/platforms.md
digital-presence/social-media.md
digital-presence/websites.md
fragmentation-story.md
gap-analysis.md
hirsch-affinity-ranked-list.md
hirsch-affinity-rubric.md
identity-verification.md
media/citations.md
media/press-coverage.md
media/reviews.md
movemental-analysis.md
network/collaborators.md
network/endorsements.md
network/events.md
network/organizations.md
profile/biography.md
profile/identity.md
profile/theology.md
profile/voice-analysis.md
sources.md
summary.md
```

**Sibling:**

- `docs/movement_leader_research/alan-hirsch-baseline-report.md`

### Overlap pairs (merge in body; ledger the rest)

| Canonical home in collated doc | Also appears in |
|-------------------------------|-----------------|
| Part I § Biography | `biography.md`, `profile/biography.md`, author profile bio sections |
| Part I § Executive facts | `README.md`, `summary.md`, `ALAN_HIRSCH_COMPLETE_PROFILE.md` |
| Part VII § Gaps | `gap-analysis.md`, `analysis/gap-analysis.md` |
| Part VII § Content analysis | `content-analysis.md`, `analysis/content-analysis.md` |
| Part VIII § Movemental fit | `movemental-analysis.md`, `analysis/movemental-fit.md`, README recommendation |
| Part III § Books / metrics | `content/books.md`, `ALAN_HIRSCH_CONTENT_AUDIT.md`, README metrics table |

### Related repo docs

- [movement-leader-information-kinds-inventory.md](../notes/movement-leader-information-kinds-inventory.md) — taxonomy of research artifact types  
- [.claude/skills/fragmentation-story/SKILL.md](../../../.claude/skills/fragmentation-story/SKILL.md) — how fragmentation narrative should read  

### Desktop path (PDF destination)

- **Linux / WSL:** `/home/josh/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf`  
- If `~/Desktop` does not exist, create it before export.  
- Do not write PDFs into `docs/` — Desktop only for the PDF artifact.

---

## 4. Definition of Done

Concrete, observable, verifiable:

- [ ] **Zero source edits:** `git diff` shows no changes under `docs/movement_leader_research/alan-hirsch/` except *optional* a single appended “Collated output” link block in `README.md` (if you add it, append only — do not rewrite existing README prose).
- [ ] **Master markdown exists:** `docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md` contains:
  - [ ] Linked TOC (3 levels)
  - [ ] Parts I–X per [the plan](../plans/alan-hirsch-research-collation-plan.md)
  - [ ] Appendix A: Provenance & deduplication ledger
  - [ ] Appendix B: Open questions & stubs
  - [ ] Appendix C: Source file index (descriptions, not body substitute)
- [ ] **Not a list:** Body word count is ≥ 15,000 words OR ≥ 80% of the sum of unique substantive content across sources (whichever is easier to verify — report both numbers).
- [ ] **No verbatim repetition:** No paragraph in Parts I–X appears twice verbatim (ledger may repeat for attribution).
- [ ] **Coverage:** `ALAN_HIRSCH_COLLATION_MANIFEST.json` lists all 51 source paths with `sectionsUsed` arrays; every source path appears at least once in manifest or Appendix C.
- [ ] **Conflicts documented:** Any numeric/date conflict between sources has a `> **CONFLICT**` callout — never silent resolution.
- [ ] **PDF on Desktop:** `Alan-Hirsch-Movement-Leader-Research.pdf` exists, opens, and reflects the collated file (note export date in PDF metadata or cover block).
- [ ] **Final report:** Agent posts a short summary: word counts, dedup stats, stub files, PDF path, commands used.

---

## 5. Output format

### 5.1 `ALAN_HIRSCH_RESEARCH_COLLATED.md`

Use this skeleton (fill with merged content):

```markdown
# Alan Hirsch — Movement Leader Research (Collated Edition)

**Version:** 1.0.0  
**Collated:** YYYY-MM-DD  
**Sources:** 51 markdown files (50 in `alan-hirsch/` + baseline report)  
**Editorial model:** Canonical body + provenance ledger; no source files were deleted.

## Table of contents

<!-- auto-generated linked TOC -->

## How to read this document

<!-- 3–5 bullets: canonical vs ledger; footnotes; conflicts -->

## Executive synthesis

<!-- ≤ 800 words NEW prose only — cross-cutting narrative -->

## Part I — Identity, biography, timeline

## Part II — Voice, theology, frameworks

## Part III — Content corpus

## Part IV — Digital presence & fragmentation

## Part V — Network, organizations, affinity

## Part VI — Media, citations, reviews

## Part VII — Audience & market

## Part VIII — Strategic analysis & Movemental fit

## Part IX — Gaps, opportunities, playbook

## Part X — Sources & research operations

## Appendix A — Provenance & deduplication ledger

| Canonical section | Merged from | Notes |
|-------------------|-------------|-------|

## Appendix B — Open questions & stubs

## Appendix C — Source file index
```

**Formatting rules:**

- Normalize headings: one `#` title; `##` for parts; `###` / `####` below.  
- Keep tables from sources; do not flatten tables into prose unless redundant.  
- After non-obvious metrics, add `*(source: relative/path.md)*`.  
- Preserve URLs, book titles, organization names, and assessment counts exactly as in sources unless conflict-noted.  
- For empty/stub files (e.g. `analysis/competitive-landscape.md`), state “stub — not populated in source” in Appendix B; do not invent competitive analysis.

### 5.2 `ALAN_HIRSCH_COLLATION_MANIFEST.json`

```json
{
  "version": 1,
  "collatedAt": "ISO-8601",
  "collatedPath": "docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md",
  "sourceCount": 51,
  "sources": [
    {
      "path": "docs/movement_leader_research/alan-hirsch/README.md",
      "wordCount": 0,
      "sha256": "...",
      "sectionsUsed": ["Executive synthesis", "Part IX"]
    }
  ]
}
```

Compute `sha256` and `wordCount` via shell (`wc -w`, `sha256sum`).

### 5.3 PDF

- Filename: `Alan-Hirsch-Movement-Leader-Research.pdf`  
- Path: `/home/josh/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf`  

---

## 6. Approach (recommended path)

### Step 1 — Preflight inventory

```bash
find docs/movement_leader_research/alan-hirsch -name '*.md' | sort
wc -w docs/movement_leader_research/alan-hirsch/**/*.md docs/movement_leader_research/alan-hirsch/*.md 2>/dev/null | tail -1
```

Read in order:

1. `ALAN_HIRSCH_PROFILES_INDEX.md`  
2. `README.md`  
3. `alan-hirsch-baseline-report.md`  
4. Remaining files by folder: `profile/` → `content/` → `digital-presence/` → `network/` → `media/` → `analysis/` → root stragglers  

While reading, maintain a working outline mapping **H2 blocks → {tags, source, duplicate-of?}**.

### Step 2 — Classify every block

For each major section in each source file, assign:

- `canonical` — best version to carry in body  
- `duplicate` — same facts, merge away in body  
- `variant` — overlapping but meaningfully different wording → ledger  
- `unique` — appears nowhere else  

**Canonical preference** when quality ties:

1. Deepest file for the topic (e.g. `content/books.md` over README table)  
2. `analysis/*` over root duplicates (`analysis/gap-analysis.md` over `gap-analysis.md`)  
3. `profile/*` over root `biography.md` for identity  
4. ALL_CAPS profiles for executive summaries when more structured  

### Step 3 — Write the collated document

- Draft Parts I–X; merge duplicates inline.  
- Write Executive synthesis last (after you know what’s cross-cutting).  
- Build Appendix A as you merge — do not defer or skip.  
- Generate TOC from final headings.

**TOC generation options (pick one that works in environment):**

```bash
# Option A — pandoc
pandoc ALAN_HIRSCH_RESEARCH_COLLATED.md --toc -o /dev/null

# Option B — npx markdown-toc (if available)
npx markdown-toc -i ALAN_HIRSCH_RESEARCH_COLLATED.md
```

If automated TOC fails, hand-build linked TOC from all `##` / `###` headings — DoD still requires working links.

### Step 4 — Manifest & QA

- Write `ALAN_HIRSCH_COLLATION_MANIFEST.json`.  
- Run coverage script mentally: every path in Section 3 → manifest or Appendix C.  
- Grep collated body for duplicate paragraphs (same 80+ char string twice).  
- Spot-check 20 numeric claims against source files.

### Step 5 — PDF export

**Repo scripts:** `scripts/collate-alan-hirsch-research.mjs` (markdown + manifest + Appendix D ledger archives), `scripts/export-collated-pdf-puppeteer.mjs` (HTML → PDF).

Preferred toolchain (try in order):

```bash
# 0) Regenerate collation (includes Appendix D ledger-only full text)
node scripts/collate-alan-hirsch-research.mjs

# 1) pandoc → HTML (portable binary works without apt)
PANDOC=/tmp/pandoc-local/pandoc-3.6.4/bin/pandoc  # or system pandoc
"$PANDOC" docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md \
  -o /tmp/alan-hirsch-collated.html --standalone --toc --toc-depth=2

# 2) Puppeteer (temp npm project if repo lacks chrome libs)
cd /tmp/mlr-pdf-export && npm init -y && npm install puppeteer@24
node /path/to/scripts/export-collated-pdf-puppeteer.mjs \
  /tmp/alan-hirsch-collated.html \
  /home/josh/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf

# 3) Fallback — copy to Desktop; Print → Save as PDF in browser
cp /tmp/alan-hirsch-collated.html ~/Desktop/Alan-Hirsch-Movement-Leader-Research.html
```

If Chrome shared libraries are missing on WSL (`libnspr4.so`), copy `.html` to Desktop and use browser Print → PDF, or run export on macOS/CI with a full Chrome install.

### Step 6 — Optional README pointer (append only)

If adding to `README.md`, append:

```markdown
## Collated research edition

- **Full collation:** [ALAN_HIRSCH_RESEARCH_COLLATED.md](./ALAN_HIRSCH_RESEARCH_COLLATED.md) (YYYY-MM-DD)
- **Desktop PDF:** `Alan-Hirsch-Movement-Leader-Research.pdf`
```

---

## 7. Guardrails — do not

- **Do not** delete, truncate, or overwrite any file in the source corpus except creating the two **new** outputs (`ALAN_HIRSCH_RESEARCH_COLLATED.md`, `ALAN_HIRSCH_COLLATION_MANIFEST.json`).  
- **Do not** replace the 50-file tree with a single file — the tree remains the research workspace.  
- **Do not** deliver only a TOC, manifest, or outline.  
- **Do not** invent facts for stubs (competitive landscape, missing metrics).  
- **Do not** silently resolve conflicting numbers between sources.  
- **Do not** commit secrets or change `src/`, `drizzle`, or app code — docs only.  
- **Do not** run `git commit` unless the user explicitly asks.

---

## 8. Iteration protocol (closed loop)

1. Produce collated markdown + manifest + PDF in one pass.  
2. Self-check Section 4; report unchecked boxes with reasons.  
3. If over-deduped (< 80% unique substance), restore cut material from sources into appropriate parts.  
4. If under-deduped (duplicate paragraphs in body), merge and update Appendix A.  
5. Post final summary: paths, word counts, dedup count, PDF size, engine used.  
6. User feedback → targeted edits to **collated file only**; regenerate PDF; sources still untouched.

---

## 9. Verification commands

```bash
# Source tree unchanged (except optional README append + new outputs)
git status -- docs/movement_leader_research/alan-hirsch/

# New outputs exist
test -f docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md
test -f docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_COLLATION_MANIFEST.json
test -f /home/josh/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf

# Word count report
wc -w docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md

# Manifest parses
node -e "JSON.parse(require('fs').readFileSync('docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_COLLATION_MANIFEST.json','utf8'))"

# Duplicate paragraph scan (rough)
# Review any output — investigate repeats manually
```

---

## 10. Final handoff template

When done, post:

```markdown
## Alan Hirsch research collation — complete

- **Collated markdown:** `docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md` (~X words)
- **Manifest:** `docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_COLLATION_MANIFEST.json`
- **PDF:** `/home/josh/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf` (X MB)
- **Sources touched:** 0 deleted; N appended lines in README (if any)
- **Dedup:** X blocks merged; Y variants in Appendix A
- **Stubs:** list
- **Conflicts noted:** list
- **PDF toolchain:** name + version
```

---

*Prompt authored 2026-05-20. Executes plan: [alan-hirsch-research-collation-plan.md](../plans/alan-hirsch-research-collation-plan.md).*
