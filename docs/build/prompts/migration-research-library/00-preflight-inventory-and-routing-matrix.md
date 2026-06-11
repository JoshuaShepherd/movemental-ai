# RL-00 — Preflight inventory and routing matrix

**Prompt ID:** RL-00  
**Target agent:** Cursor / Claude Code  
**Primary paths:** `docs/articles/graded-high/85-99/`, `src/lib/research/`, `docs/build/research/articles/`  
**Blocks:** none (run first)  
**Last updated:** 2026-06-11

---

## 1. Role and stance

You are a **content migration auditor**. This session is **read-only** except for updating [`master_runner.md`](./master_runner.md) and this file's **§10 Attempt log**.

Produce a **per-file routing matrix** before any React porting. Do not implement components in this prompt.

Read first:

- [README.md](./README.md)
- [eeat-research-content-qualification-rubric.md](../../notes/eeat-research-content-qualification-rubric.md)
- [graded-high README](../../../articles/graded-high/README.md)
- `src/lib/research/data.ts` — current placeholder index
- `src/components/research/article-bodies.tsx` — body registry (1 entry today)

---

## 2. Goal

Produce a dated baseline in **§10** that answers:

1. For each of the **19** Band A files: route (A/B/C/D), target slug, `ResearchKind`, duplicate-of links, and estimated read time + source count.
2. Which prototype `RESEARCH_ITEMS` rows should be **replaced**, **renamed**, or **archived**.
3. **Flagship recommendation** with rationale (see §4).
4. Duplicate scan vs `docs/build/research/articles/` — which file wins as SSOT.
5. Recommended batch tweaks for RL-03 onward.

---

## 3. Routing classes

| Class | Surface | When to use |
| --- | --- | --- |
| **A — Full reader** | `/research/[slug]` + index row + React body | 1,500–5,000 word public synthesis; EEAT deployable; citation rail |
| **B — Reference layer** | `/research/sources`, `/research/findings`, optional download stub | Bibliographies, stat registries, corpus tables — not narrative readers |
| **C — Agent KB** | `docs/build/agents/agent-room/files/public/` | Same as B but also chunked for agent retrieval; keep in sync |
| **D — Excluded** | Internal docs / footnotes ops only | Playbooks, linking strategy, pre-decision ops — not public research library |

---

## 4. Default routing matrix (validate in §10)

Agent must confirm line counts, frontmatter, and duplicates; adjust with notes if evidence differs.

### Route A — Full `/research/[slug]` reader (13)

| Source file | Suggested slug | Kind | Notes |
| --- | --- | --- | --- |
| `01-ai-credibility-crisis.md` | `ai-credibility-crisis` | Analysis | Strong flagship candidate; replaces prototype stats with verified ones |
| `02-scenius-network-credibility.md` | `scenius-network-credibility` | Thesis | Internal label "scenius" OK in body; public H1 per canon |
| `03-publishing-economics.md` | `publishing-economics` | Analysis | Business-model evidence; qualified 90/10 language in abstract |
| `05-seo-geo-discoverability.md` | `seo-geo-discoverability` | Analysis | Pairs with linking playbook (Route D) |
| `09-trust-verification.md` | `trust-verification` | Paper | Network verification thesis |
| `11-voice-preservation.md` | `voice-preservation` | Paper | Product-honest language; high footnote value |
| `16-convergence-thesis.md` | `convergence-thesis` | Thesis | Four-forces stress test |
| `finding-ai-guidance-worth-trusting.md` | `finding-ai-guidance-worth-trusting` | Paper | Canon `shape`; featured — index prominence |
| `sandbox-discovery.md` | `sandbox-discovery` | Paper | Stewardship Sequence stage doc |
| `the-skill-of-ai.md` | `the-skill-of-ai` | Paper | Stewardship Sequence stage doc |
| `the-cost-of-fragmentation.md` | `the-cost-of-fragmentation` | Paper | Audience-specific cost vectors |
| `credibility-thesis.md` | `credibility-thesis` | Thesis | Long (494 lines); consider TOC + section split in body |
| `the-credibility-crisis.md` | `the-credibility-crisis` | Paper | Narrative opening chapter; shorter reader |

### Route B — Sources + findings only (4)

| Source file | Target | Notes |
| --- | --- | --- |
| `ai-research-archive.md` | `FINDINGS_*` + study callouts in `MASTER_SOURCES` | **Do not** render 415-line archive as one reader page |
| `authoritative-sources-ai-nonprofits-faith-formation.md` | Expand `MASTER_SOURCES` + source-quality router copy in `/research/sources` intro | Living bibliography |
| `movemental-research-corpus-v1.md` | Findings panels + optional "Corpus v1" download stub | 748 lines; table-heavy — reference not reader |
| `section-1-research-and-references.md` | Footnote backlog + sources appendix | Book Section 1 support doc |

### Route C — Agent KB sync (overlap)

- `ai-research-archive.md` → already at `docs/build/agents/agent-room/files/public/ai-research-archive.md`
- `movemental-research-corpus-v1.md` → consider agent-room excerpt (executive summary + confidence tags only)

### Route D — Excluded from `/research` (2)

| Source file | Alternate home | Reason |
| --- | --- | --- |
| `linking-strategy-eeat-geo-playbook.md` | Internal `docs/build/` + `/footnotes` registry ops | 320-line ops playbook, not a research paper |
| `who-says-what-an-org-needs.md` | Promote to `docs/articles/` when `/articles` route ships, or field-guide derivative | Methodology map for Safety stage — product doc tone |

---

## 5. Flagship decision framework

Pick **one** flagship for `RESEARCH_ITEMS[0].flagship = true`:

| Option | Pros | Cons |
| --- | --- | --- |
| **A. `01-ai-credibility-crisis`** | Matches "research behind the work"; evidence-first; already gold-standard tone | Title is internal-sounding; needs public subtitle |
| **B. `finding-ai-guidance-worth-trusting`** | Most deployable for executives; featured in frontmatter | Less "research library" and more discernment guide |
| **C. Keep corpus exec summary** | Single entry point to all stats | 748-line corpus is unwieldy as reader |

**Recommendation (default):** Option A with public title *The AI Credibility Crisis* and subtitle drawn from the executive summary. Demote prototype `ai-reality-paper` slug to archived or remove.

Document final choice in §10.

---

## 6. Duplicate scan checklist

For each Route A file, grep `docs/build/research/articles/` for matching slug or title. Record:

- **Identical** → graded-high wins; note to sync research series after migration
- **Partial overlap** → merge plan (which sections to keep)
- **No duplicate** → net-new index row

Known overlaps (verify):

- `01-ai-credibility-crisis` ↔ `docs/build/research/articles/01-ai-credibility-crisis.md`
- `02-scenius-network-credibility` ↔ `…/02-scenius-network-credibility.md`
- (same pattern for 03, 05, 09, 11, 16)

---

## 7. Definition of Done

- [ ] §10 contains complete 19-row routing matrix with slugs and kinds
- [ ] Flagship decision recorded with rationale
- [ ] Duplicate scan table complete
- [ ] Prototype placeholder mapping (4 live + 2 archive rows → keep/replace/remove)
- [ ] `master_runner.md` RL-00 row updated
- [ ] No code changes except runner + attempt log

---

## 8. Verification

Read-only. No `pnpm typecheck` required.

---

## §10 Attempt log

<!-- Agent appends dated entries here -->

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | Default matrix in §4 pending agent validation |
| 2026-06-11 | Cursor | **Done** | Full matrix validated. SSOT: `docs/articles/graded-high/85-99/` (newer, longer than `docs/build/research/articles/` for series 01–16). Flagship: **Option A** — slug `ai-credibility-crisis`, public title *The AI Credibility Crisis*, subtitle from executive summary; demote prototype `ai-reality-paper` in RL-06. |

### Validated routing matrix (19 files)

| File | Route | Slug | Kind | readMin | sources | Duplicate of research/articles |
| --- | --- | --- | --- | ---: | ---: | --- |
| `01-ai-credibility-crisis.md` | A | `ai-credibility-crisis` | Analysis | 7 | ~18 | Partial (153 vs 147 lines) — **graded-high wins** |
| `02-scenius-network-credibility.md` | A | `scenius-network-credibility` | Thesis | 7 | ~12 | Partial — graded-high wins |
| `03-publishing-economics.md` | A | `publishing-economics` | Analysis | 5 | ~10 | Partial — graded-high wins |
| `05-seo-geo-discoverability.md` | A | `seo-geo-discoverability` | Analysis | 6 | ~14 | Partial — graded-high wins |
| `09-trust-verification.md` | A | `trust-verification` | Paper | 7 | ~15 | Partial — graded-high wins |
| `11-voice-preservation.md` | A | `voice-preservation` | Paper | 6 | ~16 | Partial — graded-high wins |
| `16-convergence-thesis.md` | A | `convergence-thesis` | Thesis | 7 | ~14 | Partial — graded-high wins |
| `finding-ai-guidance-worth-trusting.md` | A | `finding-ai-guidance-worth-trusting` | Paper | 12 | ~14 | Net-new |
| `sandbox-discovery.md` | A | `sandbox-discovery` | Paper | 9 | ~10 | Net-new |
| `the-skill-of-ai.md` | A | `the-skill-of-ai` | Paper | 10 | ~12 | Net-new |
| `the-cost-of-fragmentation.md` | A | `the-cost-of-fragmentation` | Paper | 15 | ~18 | Net-new |
| `credibility-thesis.md` | A | `credibility-thesis` | Thesis | 22 | ~25 | Net-new |
| `the-credibility-crisis.md` | A | `the-credibility-crisis` | Paper | 4 | ~6 | Net-new |
| `ai-research-archive.md` | B/C | — | — | — | — | Feeds findings + agent KB; not a reader |
| `authoritative-sources-*.md` | B | — | — | — | ~30 registry | Wired in RL-02 |
| `movemental-research-corpus-v1.md` | B | `movemental-research-corpus-v1` | Analysis | 45 | ~80 | Archive stub only; PDF deferred |
| `section-1-research-and-references.md` | B | — | — | — | — | Footnote backlog; not a reader |
| `linking-strategy-eeat-geo-playbook.md` | D | — | — | — | — | Internal ops; excluded from `/research` |
| `who-says-what-an-org-needs.md` | D | — | — | — | — | Future `/articles` or field guide |

### Prototype placeholder mapping

| Prototype slug | Action in RL-06 |
| --- | --- |
| `ai-reality-paper` | **Remove** — replace flagship with `ai-credibility-crisis` |
| `the-drive-you-already-trust` | **Remove** unless Band A equivalent identified |
| `the-fragmentation-thesis` | **Remove** — covered by `the-cost-of-fragmentation` |
| `the-moment-of-authorship` | **Remove** — defer to 75–79 band |
| `the-governance-gap` | **Remove** — stats now in findings |
| `augmentation-over-replacement` | **Remove** — defer or merge into stewardship papers |

### Flagship decision (final)

**Option A approved:** `01-ai-credibility-crisis.md` → slug `ai-credibility-crisis`, public title *The AI Credibility Crisis*, Analysis kind, flagship bar on index. Prototype lorem body replaced in RL-06 after RL-03 ports the real markdown.

