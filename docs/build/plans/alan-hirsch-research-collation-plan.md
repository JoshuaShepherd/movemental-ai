# Plan: Alan Hirsch movement leader research — collation without deletion

**Status:** Plan (not yet executed)  
**Scope:** `docs/movement_leader_research/alan-hirsch/` (50 markdown files) + `docs/movement_leader_research/alan-hirsch-baseline-report.md`  
**Executable prompt:** [docs/build/prompts/alan-hirsch-research-collation-and-pdf.md](../prompts/alan-hirsch-research-collation-and-pdf.md)  
**Date:** 2026-05-20  

---

## Goal

Produce one **reader-grade master document** that contains the full substance of Alan Hirsch’s movement leader research — reorganized, deduplicated at the prose level, and indexed — while **leaving every source file untouched**. After the master markdown is verified, export a PDF to the user’s Desktop.

This is a **documentation consolidation** project, not a corpus migration or tenant build.

---

## Non-negotiable constraints

| Rule | Meaning |
|------|---------|
| **No deletion** | Do not remove, truncate, or empty any file under `alan-hirsch/` or `alan-hirsch-baseline-report.md`. |
| **No silent loss** | If two passages say the same thing, keep **one canonical statement** in the collated doc and record the duplicate in a **Provenance & deduplication ledger** (appendix), with paths to both sources — do not drop facts. |
| **No “index only” deliverable** | The primary output is the **full edited collation**, not a file list or outline. The TOC serves navigation inside that document. |
| **Dedup ≠ delete** | Redundancy is resolved by **merging prose** and **relocating variant wording** to the ledger when it adds nuance; never by omitting unique data points. |
| **Source fidelity** | Numbers, dates, titles, URLs, and quotes must match the source file unless an explicit conflict note is added. |

---

## Known structure (inventory)

### Root-level files (19)

- Navigation / meta: `README.md`, `ALAN_HIRSCH_PROFILES_INDEX.md`, `_tracker.md`, `AUTHOR_PROFILE_PRESENTATION_STANDARDS.md`
- ALL_CAPS profiles: `ALAN_HIRSCH_AUTHOR_PROFILE.md`, `ALAN_HIRSCH_AUDIENCE_PROFILE.md`, `ALAN_HIRSCH_CALLING_PROFILE.md`, `ALAN_HIRSCH_COMPLETE_PROFILE.md`, `ALAN_HIRSCH_CONTENT_AUDIT.md`, `ALAN_HIRSCH_ORGS.md`, `ALAN_HIRSCH_TIMELINE.md`
- Pipeline outputs: `summary.md`, `biography.md`, `sources.md`, `identity-verification.md`, `digital-presence-discovery.md`, `content-analysis.md`, `gap-analysis.md`, `movemental-analysis.md`, `content-marketing-playbook.md`, `fragmentation-story.md`, `committed-voice.md`, `hirsch-affinity-rubric.md`, `hirsch-affinity-ranked-list.md`

### Subfolders (31 files)

| Folder | Files | Role |
|--------|-------|------|
| `profile/` | `identity.md`, `biography.md`, `theology.md`, `voice-analysis.md` | Identity + voice constitution |
| `digital-presence/` | `websites.md`, `social-media.md`, `newsletters.md`, `platforms.md` | Channel inventory |
| `content/` | `books.md`, `articles.md`, `academic.md`, `audio.md`, `videos.md`, `courses.md` | Catalog surfaces |
| `network/` | `organizations.md`, `collaborators.md`, `endorsements.md`, `events.md` | Relational graph |
| `media/` | `press-coverage.md`, `citations.md`, `reviews.md` | Third-party proof |
| `analysis/` | `audience-analysis.md`, `content-analysis.md`, `gap-analysis.md`, `competitive-landscape.md`, `movemental-fit.md` | Strategic synthesis |

### Sibling (outside folder)

- `docs/movement_leader_research/alan-hirsch-baseline-report.md` — system-level TAM, constraints, opportunity sizing (cite in Part VIII)

### High-confidence overlap pairs (dedup targets)

These pairs (or triples) likely repeat the same facts; the collator must pick a **canonical section** and ledger the rest:

1. `README.md` executive summary ↔ `summary.md` ↔ `ALAN_HIRSCH_COMPLETE_PROFILE.md`
2. `biography.md` ↔ `profile/biography.md` ↔ `ALAN_HIRSCH_AUTHOR_PROFILE.md` (bio portions)
3. `gap-analysis.md` ↔ `analysis/gap-analysis.md`
4. `content-analysis.md` ↔ `analysis/content-analysis.md`
5. `movemental-analysis.md` ↔ `analysis/movemental-fit.md` ↔ README “Movemental Recommendation”
6. Metrics tables in `README.md` ↔ `ALAN_HIRSCH_CONTENT_AUDIT.md` ↔ `content/*.md` headers

---

## Target outputs (in order)

| Step | Artifact | Path |
|------|----------|------|
| 1 | **Master collation (markdown)** | `docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md` |
| 2 | **Collation manifest** (machine-readable index of sources → sections) | `docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_COLLATION_MANIFEST.json` |
| 3 | **PDF export** | `~/Desktop/Alan-Hirsch-Movement-Leader-Research.pdf` (WSL: `/home/josh/Desktop/` — create Desktop if missing) |

Optional (recommended, still non-destructive):

- Add a one-line pointer in `README.md` under “Research outputs” linking to the collated file — **append only**, do not replace existing README body.

---

## Proposed master document architecture

The collated file should read top-to-bottom like a single reference book, not a folder dump.

### Front matter

1. Title, version, collation date, source file count
2. **Table of contents** (linked headings, 3 levels deep)
3. **How to read this document** — canonical vs ledger; how sources map
4. **Executive synthesis** (new prose ≤ 800 words) — only cross-cutting narrative not duplicated elsewhere

### Body (Parts I–X)

| Part | Title | Canonical sources (priority order) |
|------|-------|-----------------------------------|
| I | Identity, biography, disambiguation | `profile/identity.md`, `identity-verification.md`, `profile/biography.md`, `ALAN_HIRSCH_TIMELINE.md` |
| II | Voice, theology, frameworks | `profile/voice-analysis.md`, `profile/theology.md`, `ALAN_HIRSCH_AUTHOR_PROFILE.md` |
| III | Content corpus | `content/*`, `ALAN_HIRSCH_CONTENT_AUDIT.md` |
| IV | Digital presence & fragmentation | `digital-presence/*`, `digital-presence-discovery.md`, `fragmentation-story.md` |
| V | Network, orgs, affiliations | `network/*`, `ALAN_HIRSCH_ORGS.md`, `hirsch-affinity-*` |
| VI | Media, citations, social proof | `media/*` |
| VII | Audience & market | `ALAN_HIRSCH_AUDIENCE_PROFILE.md`, `analysis/audience-analysis.md` |
| VIII | Strategic analysis & Movemental fit | `analysis/*`, `movemental-analysis.md`, `alan-hirsch-baseline-report.md`, `committed-voice.md` |
| IX | Gaps, opportunities, playbook | `analysis/gap-analysis.md`, `content-marketing-playbook.md`, README “Top 5 Opportunities” |
| X | Sources & research ops | `sources.md`, `_tracker.md`, `AUTHOR_PROFILE_PRESENTATION_STANDARDS.md` |

### Back matter

- **Appendix A — Provenance & deduplication ledger** (table: canonical section ↔ merged-from paths ↔ notes)
- **Appendix B — Open questions & stubs** (e.g. empty `analysis/competitive-landscape.md`)
- **Appendix C — Source file index** (alphabetical list with one-line description — navigation aid, not a substitute for body content)

---

## Execution phases

### Phase 0 — Preflight (30 min)

- Run file inventory (`find … -name '*.md' | sort`)
- Record word counts per file
- Flag overlap pairs and empty/stub files
- Read `ALAN_HIRSCH_PROFILES_INDEX.md` and `README.md` for intended IA

### Phase 1 — Ingest & segment (2–4 hr)

- Read every source file once; tag each H2 block with `{source-path, line-range, topic-tags}`
- Build a **topic graph** (identity, books, youtube, apest, etc.)
- Mark blocks as: `canonical` | `duplicate` | `variant` | `unique`

### Phase 2 — Draft collation (4–8 hr)

- Write `ALAN_HIRSCH_RESEARCH_COLLATED.md` following the Part I–X outline
- For duplicates: merge into canonical section; paste variant sentences into Appendix A only when they add nuance
- Preserve tables, lists, and metrics; normalize heading levels (collated doc uses `#` for title, `##` for parts, `###` for sections)
- Insert `[^source-id]` footnotes or inline `*(source: path)*` after non-obvious claims

### Phase 3 — TOC & manifest (1 hr)

- Generate TOC from final headings (pandoc or markdown-toc tool)
- Write `ALAN_HIRSCH_COLLATION_MANIFEST.json`: `{ "sources": [{ "path", "sha256", "wordCount", "sectionsUsed": ["Part II § Voice"] }] }`

### Phase 4 — QA (1–2 hr)

- **Coverage check:** every source file appears at least once in manifest + ledger or body
- **Dedup check:** no paragraph repeated verbatim in body (ledger excepted)
- **Fact check:** spot-check 20 numeric claims against sources
- **Stub honesty:** competitive landscape empty → noted in Appendix B, not invented

### Phase 5 — PDF export (30 min)

- Convert collated markdown → PDF (see prompt for toolchain)
- Verify PDF page count ≈ expected from word count
- Copy to Desktop path; confirm file opens

---

## Success criteria

- [ ] All 51 markdown sources still exist unchanged on disk
- [ ] `ALAN_HIRSCH_RESEARCH_COLLATED.md` exists and is ≥ 80% of combined unique word count (dedup reduces total; 80% guards against over-pruning)
- [ ] TOC links resolve within the collated file
- [ ] Appendix A lists every merge decision for overlap pairs 1–6
- [ ] PDF on Desktop matches collated markdown as of export timestamp
- [ ] Human can read Parts I–X without opening the source tree

---

## Out of scope (this pass)

- Collation for other leaders under `docs/movement_leader_research/` (835+ files) — future prompt clones per slug
- Changing `manifest.json` or `generate-manifest.mjs` unless a follow-up task requests reader integration
- Publishing collated doc to the public site

---

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Over-aggressive dedup drops nuance | Ledger + “variant” class; require human spot-check of Appendix A |
| Conflicting numbers across files | Keep both with `CONFLICT` note; do not pick silently |
| Collated file too large for editors | Acceptable; optional future split by Part into `_collated/` is a separate task |
| PDF styling poor | Use pandoc + template or `md-to-pdf` with print CSS; test on 10 pages first |

---

## Next action

Run the executable prompt: [alan-hirsch-research-collation-and-pdf.md](../prompts/alan-hirsch-research-collation-and-pdf.md).
