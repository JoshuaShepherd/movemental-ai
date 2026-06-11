# RL-06 — Flagship and index refresh

**Prompt ID:** RL-06  
**Blocks:** RL-03, RL-04, RL-05 (at least flagship source migrated)  
**Last updated:** 2026-06-11

---

## 1. Goal

Replace **prototype placeholder** research index with the real Band A library:

1. Execute flagship decision from RL-00 §10
2. Rebuild `RESEARCH_ITEMS` and `RESEARCH_ARCHIVE` ordering
3. Remove or archive prototype slugs (`ai-reality-paper`, `the-drive-you-already-trust`, etc.)
4. Wire `03-publishing-economics` in RL-03 batch (archive placement in §3 below)

---

## 2. Recommended live index (`RESEARCH_ITEMS`)

Top of library — order matters for narrative:

| Order | Slug | Kind | Flagship / featured |
| ---: | --- | --- | --- |
| 1 | `ai-credibility-crisis` (or RL-00 choice) | Analysis | **Flagship** |
| 2 | `finding-ai-guidance-worth-trusting` | Paper | Featured |
| 3 | `credibility-thesis` | Thesis | thesisNote |
| 4 | `the-cost-of-fragmentation` | Paper | — |
| 5 | `sandbox-discovery` | Paper | — |
| 6 | `the-skill-of-ai` | Paper | — |

Adjust if RL-00 chose a different flagship.

---

## 3. Recommended archive (`RESEARCH_ARCHIVE`)

Loaded via "Load archive" — research depth + series:

- `scenius-network-credibility`
- `trust-verification`
- `voice-preservation`
- `seo-geo-discoverability`
- `convergence-thesis`
- `publishing-economics`
- `the-credibility-crisis`
- Prototype carryovers only if bodies not ready: **remove**, do not keep lorem stubs

---

## 4. Prototype cleanup

Delete or redirect:

| Prototype slug | Action |
| --- | --- |
| `ai-reality-paper` | Remove after flagship body replaces it; migrate any unique prototype copy into flagship if needed |
| `the-drive-you-already-trust` | Archive only if Band A equivalent exists; else drop |
| `the-fragmentation-thesis` | Merge into `the-cost-of-fragmentation` or `credibility-thesis` — do not duplicate |
| `the-moment-of-authorship` | Defer to RL-90 or 75–79 band promotion |
| `the-governance-gap`, `augmentation-over-replacement` | Replace with real Band A titles or remove |

Update `generateStaticParams` — no orphan slugs.

---

## 5. Index UI checks

- Flagship row: accent bar + "Flagship" tag (`research-row.tsx`)
- `{hl}` highlighter swipe on abstracts
- Read time + source count match `data.ts`
- `03-publishing-economics` abstract should not claim "revolutionary" without qualified wording

---

## 6. Definition of Done

- [x] No prototype lorem in `RESEARCH_ITEMS`
- [x] Exactly one `flagship: true`
- [x] All live index links resolve to full bodies or intentional archive
- [x] `/research` matches ink-research `index.html` structure (table header, hero, load archive)
- [x] `pnpm typecheck` green (pre-existing unrelated error in `agent-dock.tsx` only)
- [x] `master_runner.md` RL-06 updated

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
| 2026-06-11 | Cursor | **Done** | 6 live + 7 archive; removed 3 prototype stubs; reordered per §2–§3 |
