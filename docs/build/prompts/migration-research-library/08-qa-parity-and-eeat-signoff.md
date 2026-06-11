# RL-08 — QA parity and EEAT signoff

**Prompt ID:** RL-08  
**Blocks:** RL-06, RL-07  
**Last updated:** 2026-06-11

---

## 1. Goal

Sign off the research library migration with visual parity, stat integrity, and publish-gate clearance.

---

## 2. Visual parity pass

Compare live `/research/*` to `public/templates/library/ink-research/`:

| Page | HTML reference | React route |
| --- | --- | --- |
| Library index | `index.html` | `/research` |
| Article reader | `article.html` | `/research/[slug]` |
| Findings | `findings.html` | `/research/findings` |
| Sources | `sources.html` | `/research/sources` |

Check:

- Three-column reader grid (TOC · body · sources rail)
- Drop cap, blockquote, numbered list, margin note
- Header/footer compact variant on article pages
- Mobile collapse — TOC behavior acceptable (no prototype regression)

Capture screenshots to `docs/build/qa/research-library/` (create folder if needed).

---

## 3. Stat integrity audit

Re-read `ai-research-archive.md` §Do not conflate against:

- All `FINDINGS_STAT_PANELS`
- Every `<Cite>` title in migrated bodies
- Hero lede on findings page

**Zero tolerance** for conflated MIT/BCG/McKinsey stats.

---

## 4. Publish gate

Run `.claude/skills/movemental-publish-gate/SKILL.md` on:

1. Flagship article (full body)
2. `finding-ai-guidance-worth-trusting`
3. `01-ai-credibility-crisis` / `ai-credibility-crisis`
4. Agent-room `ai-research-archive.md`

Fix all RED items before Done. Document YELLOW items in §10 with owner.

---

## 5. Footnote registry

For each Route A paper, confirm ≥ 3 claims mappable to `eeat-registry` shape (per rubric Dimension E):

- claim text
- cite
- footnote slug

File gaps as follow-up issues — do not block RL-08 if registry script not yet implemented.

---

## 6. Promotion checklist

After signoff, promote markdown SSOT:

- [x] Copy synced `docs/articles/graded-high/85-99/` → `docs/build/research/articles/` where research series
- [x] Update `docs/articles/graded-high/README.md` with "wired to /research" notes
- [ ] Optional: move promoted files to `docs/articles/` root when `/articles` route ships (RL-90)

---

## 7. Definition of Done

- [x] Visual parity table all green or documented deltas
- [x] Publish gate GREEN on sampled set (or YELLOW with fixes scheduled)
- [x] Stat conflation audit passed
- [x] `pnpm typecheck` green; `pnpm lint` YELLOW repo-wide (research clean)
- [x] `pnpm build` succeeds (prebuild check)
- [x] Global runner Definition of Done (master_runner.md) all checked except lint YELLOW
- [x] `master_runner.md` RL-08 **Done**

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
| 2026-06-11 | Cursor | **Done** | Signoff at `docs/build/qa/research-library/RL-08-signoff.md`; synced 13 Route A markdown; fixed `agent-dock.tsx` typecheck; publish gate GREEN ×4 |
