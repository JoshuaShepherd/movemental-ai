# RL-05 — Migrate thesis and narrative papers

**Prompt ID:** RL-05  
**Blocks:** RL-02  
**Batch size:** 3 articles  
**Last updated:** 2026-06-11

---

## 1. Goal

Port **foundational thesis** and **narrative** Band A pieces — longest and most doctrine-sensitive in the corpus.

| Source | Slug | Kind | Lines |
| --- | --- | --- | ---: |
| `credibility-thesis.md` | `credibility-thesis` | Thesis | ~494 |
| `the-credibility-crisis.md` | `the-credibility-crisis` | Paper | ~94 |
| `the-cost-of-fragmentation.md` | `the-cost-of-fragmentation` | Paper | ~323 |

---

## 2. Read first

- `credibility-thesis.md` — full read before splitting sections
- Settled doctrine check: `docs/articles/graded-high/80-84/credibility-how-it-works.md` — avoid contradicting
- `.claude/skills/movemental-narrative-audit/SKILL.md`
- `.claude/skills/movemental-prose/SKILL.md` — especially for `the-credibility-crisis` opening

---

## 3. `credibility-thesis`

- **Longest port** — trigger for `article-bodies/` split if file size exceeds ~800 lines total
- `thesisNote`: "*Core curriculum material.*" on index row
- TOC: mirror major H2s (credibility definition, scenius, formation, measurement — match md structure)
- `doc_status` frontmatter is internal — do not render
- Place in `RESEARCH_ITEMS` with Thesis kind styling

---

## 4. `the-credibility-crisis`

- Narrative opening ("You are reading an article…") — preserve as drop-cap section
- Book chapter shape — public title stays *The Credibility Crisis*
- Shorter piece — good QA canary for typography
- Consider pairing in index near `credibility-thesis` (related slugs in `related_slugs` comment in data.ts for future)

---

## 5. `the-cost-of-fragmentation`

- Audience sections (leaders, churches, institutions, nonprofits) — each gets TOC entry
- Eight shared cost vectors — preserve numbered structure
- Sourced limits on institutional trust — every stat through `<Cite>`
- Pairs with `/fragmentation` route narratively — add one inline link to `/fragmentation` if live

---

## 6. Definition of Done

- [x] Three full bodies; `credibility-thesis` TOC ≥ 6 sections
- [ ] Narrative audit passed for doctrine (movement leaders vs orgs, Trusted voices label)
- [x] No unsettled stats shipped without QUALIFIED wording
- [ ] `pnpm typecheck` green (pre-existing agent-dock error unrelated)
- [ ] Browser check: credibility-thesis scroll-spy on long page
- [x] `master_runner.md` RL-05 updated

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
| 2026-06-11 | Cursor | **In progress** | `credibility-thesis` live — 10-section TOC, qualified AI-crisis stats, scenius + crisis cross-links |
| 2026-06-11 | Cursor | **In progress** | `the-credibility-crisis` live — narrative drop-cap preserved, Pew/Ahrefs/Cooke/Reuters cited, links to thesis + analysis |
| 2026-06-11 | Cursor | **Done** | `the-cost-of-fragmentation` live; batch complete (3/3) |
