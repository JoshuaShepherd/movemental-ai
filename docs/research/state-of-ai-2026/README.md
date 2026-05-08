# State of AI — 2026 research mirror

**Canonical document:** [`movemental-research-corpus-v1.md`](./movemental-research-corpus-v1.md) — *Movemental Research Corpus v1.0 (May 8, 2026)*. Citation-quality reference with VERIFIED / QUALIFIED / NEW / DROP tags, adoption tables, FBI IC3 figures, capability-gap synthesis, competitive landscape, and **Section 10 — claims to drop or revise**. Prefer this over any older snapshot in this folder.

**Synced mirrors:** 2026-05-08 (partial copies from this repo + `/home/josh/repos/01-Movemental-Core/docs`).

**Related (not duplicated here):** [`../authoritative-sources-ai-nonprofits-faith-formation.md`](../authoritative-sources-ai-nonprofits-faith-formation.md).

---

## Quick map

| Question | Start here |
| --- | --- |
| Verified nonprofit/church/enterprise stats, governance %, FBI losses, what to **stop** citing | **`movemental-research-corpus-v1.md`** |
| Credibility headline QA (Ahrefs, Pew 53%/76%, “68%”) — complements Corpus §10 | [`movemental-ai-repo/01-ai-credibility-crisis.md`](./movemental-ai-repo/01-ai-credibility-crisis.md) |
| Living-with-AI editorial guide | [`core-docs-repo/guide-ai-credibility-2026.md`](./core-docs-repo/guide-ai-credibility-2026.md) |
| Product / vision framing | [`core-docs-repo/01_ai-vision-overview.md`](./core-docs-repo/01_ai-vision-overview.md) |
| Nonprofit dashboard governance | [`core-docs-repo/ai-strategic-brief.md`](./core-docs-repo/ai-strategic-brief.md), [`youthfront-ai-guides/`](./core-docs-repo/youthfront-ai-guides/) |

---

## Removed duplicates (May 2026)

These **mirror copies were deleted** because their content is **superseded or corrected** by **Corpus v1** (especially §§2, 5, 10 and executive summary). Canonical sources remain in their original repo paths if you need history.

| Removed from `movemental-ai-repo/` | Reason |
| --- | --- |
| `part-01-reality-ai-organizations-2026.md` | Conflicts with Corpus on Lifeway/Barna figures (e.g. 91% claim → **DROP** per §10). Use Corpus §2. |
| `ai-research-synthesis-mission-audience-april-2026.md` | Capability-gap narrative folded into Corpus §§2.3, 5; URLs cited there. |
| `SECTION_1_RESEARCH_AND_REFERENCES.md` | Superseded by Corpus §12 appendix + §2 reference blocks. |
| `00-existing-corpus-audit.md` | Superseded by Corpus §10 + verified sourcing throughout. |

**Original paths still in repo** (not deleted — only mirror copies removed):

- `docs/markdown/SSOT/movemental-full-path/part-01-reality-ai-organizations-2026.md` — reconcile with Corpus §10 before citing publicly.
- `docs/build/notes/ai-research-synthesis-mission-audience-april-2026.md`
- `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md`
- `docs/build/research/raw/00-existing-corpus-audit.md`

---

## Folder: `movemental-ai-repo/` (this repository)

| File | Original path | Status |
| --- | --- | --- |
| `01-ai-credibility-crisis.md` | `docs/build/research/articles/01-ai-credibility-crisis.md` | **Keep** — granular claim QA not duplicated in Corpus. |

---

## Folder: `core-docs-repo/` (sibling `docs` repository)

**Root:** `/home/josh/repos/01-Movemental-Core/docs`

Some mirrored strategy/site files repeat **pre-Corpus** marketing stats (e.g. “40–60%”, “68%”). **Do not cite those numbers without checking Corpus §10 and §11.** Mirrors are retained for narrative structure and Youthfront guides.

### Strategy & messaging

| File | Original path |
| --- | --- |
| `guide-ai-credibility-2026.md` | `10-business/strategy/top-level/guide-ai-credibility-2026.md` |
| `01_ai-vision-overview.md` | `10-business/strategy/ai-vision/01_ai-vision-overview.md` |
| `mvp-proposal.md` | `10-business/strategy/mvp-proposals/mvp-proposal.md` |
| `why-movemental-and-how-it-works-full-copy.md` | `10-business/strategy/site-docs/why-movemental-and-how-it-works-full-copy.md` |
| `ai-strategic-brief.md` | `12-satellite-projects/non-profit-dashboard/content/governance/ai-strategic-brief.md` |

### Book manuscript — AI archive (themes + evidence)

| File | Original path |
| --- | --- |
| `ai-and-faith-social-impact.md`, `agents-and-assistants.md`, `prompt-engineering-and-custom-gpts.md`, `ai-art-and-creative-collaboration.md` | `10-business/book-manuscript/research/01-themes/` |
| `evidence-table.md` | `10-business/book-manuscript/research/03-evidence/` |
| `unknowns-and-gaps.md` | `10-business/book-manuscript/research/04-open-questions/` |

### Book manuscript — index meta

| File | Original path |
| --- | --- |
| `book-manuscript-research-meta/README.md` | `10-business/book-manuscript/research/README.md` |
| `book-manuscript-research-meta/timeline-ai-thinking.md` | `10-business/book-manuscript/research/00-index/` |
| `book-manuscript-research-meta/master-map.md` | same |

### Youthfront AI guides

`12-satellite-projects/non-profit-dashboard/content/guides/ai-*-youthfront/` → [`core-docs-repo/youthfront-ai-guides/`](./core-docs-repo/youthfront-ai-guides/).

---

## Refreshing copies

```bash
CORE_DOCS=/home/josh/repos/01-Movemental-Core/docs
DEST=docs/research/state-of-ai-2026/core-docs-repo
# Example — repeat for files you change upstream
cp "$CORE_DOCS/10-business/strategy/top-level/guide-ai-credibility-2026.md" "$DEST/"
```

After upstream edits, reconcile statistics against **`movemental-research-corpus-v1.md`** or schedule Corpus v1.1.
