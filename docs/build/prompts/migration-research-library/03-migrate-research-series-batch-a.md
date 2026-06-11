# RL-03 — Migrate research series batch A

**Prompt ID:** RL-03  
**Blocks:** RL-02  
**Batch size:** 7 articles  
**Last updated:** 2026-06-11

---

## 1. Goal

Port **research prompt outputs** (Tier 2–3 of `docs/build/research/prompts/`) from markdown to full React readers on `/research/[slug]`.

| # | Source | Slug | Kind |
| ---: | --- | --- | --- |
| 01 | `01-ai-credibility-crisis.md` | `ai-credibility-crisis` | Analysis |
| 02 | `02-scenius-network-credibility.md` | `scenius-network-credibility` | Thesis |
| 03 | `03-publishing-economics.md` | `publishing-economics` | Analysis |
| 05 | `05-seo-geo-discoverability.md` | `seo-geo-discoverability` | Analysis |
| 09 | `09-trust-verification.md` | `trust-verification` | Paper |
| 11 | `11-voice-preservation.md` | `voice-preservation` | Paper |
| 16 | `16-convergence-thesis.md` | `convergence-thesis` | Thesis |

---

## 2. Read first

- [01-content-model-and-body-pipeline.md](./01-content-model-and-body-pipeline.md)
- [02-sources-findings-and-citations.md](./02-sources-findings-and-citations.md)
- Each source file in `docs/articles/graded-high/85-99/`
- Matching files in `docs/build/research/articles/` (if present — prefer graded-high)
- `.claude/skills/plain-prose/SKILL.md` — light pass only; do not rewrite arguments

---

## 3. Per-article workflow

For **each** of the seven:

1. **Metadata** — Add/update `ResearchItem` in `data.ts`:
   - Public `title` (strip "internal synthesis" from display title where needed)
   - `abstract` with one `{hl}…{/hl}` phrase
   - `subtitle`, `readMin`, `sourceCount`, `sections[]`, `sources[]`, `hasFullBody: true`
2. **Body** — Add `const xxxBody: ReactNode` in `article-bodies.tsx`; register in `BODY_REGISTRY`
3. **Citations** — Convert footnotes to `<Cite n={} />` per RL-02 index
4. **Anchors** — TOC ids match section headings
5. **Sync** — Copy final markdown back to `docs/build/research/articles/NN-*.md` if graded-high was SSOT

---

## 4. Article-specific notes

### `01-ai-credibility-crisis`

- Gold-standard tone — **minimal prose edits**
- Executive summary may become subtitle + first section
- Counter-arguments section must survive port
- Flagship candidate — coordinate with RL-06

### `02-scenius-network-credibility`

- `thesisNote`: optional marginal "*Network verification, not growth hacking.*"
- Keep Brian Eno / scenius history; public nav still says "Trusted voices" elsewhere — no conflict in research library

### `03-publishing-economics`

- 90/10 positioning — keep qualified language ("revolutionary" must not appear in index abstract)
- Creator-economy comparables — preserve tables/lists from markdown

### `05-seo-geo-discoverability`

- Technical SEO content — preserve numbered recommendations
- Cross-link stub to Route D linking playbook (internal note only, no public link until that doc has a home)

### `09-trust-verification`

- Digital identity claims — verify every stat against RL-02 registry before `<Cite>`

### `11-voice-preservation`

- Product-honest limits — do not soften NLP caveats
- Pew disclosure stats must use exact n and dates from source

### `16-convergence-thesis`

- Four-forces structure — TOC with four H2s minimum
- "Convergence on trial" framing — keep skeptical tone

---

## 5. Index placement

Default: all six in `RESEARCH_ARCHIVE` until RL-06 index refresh, **except** flagship candidate (01) which may go live in `RESEARCH_ITEMS` early if RL-06 approves.

---

## 6. Definition of Done

- [x] Seven slugs return full bodies (no fallback stub)
- [x] Seven `ResearchItem` rows with accurate metadata
- [ ] TOC scroll-spy works on each (where sections defined)
- [ ] `pnpm typecheck` green
- [ ] Browser spot-check: 01, 11, 16
- [x] `master_runner.md` RL-03 updated

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | Cursor | **Done** | 7/7 batch A complete (+ `voice-preservation`, `convergence-thesis`); spot-check pending |
| 2026-06-11 | Cursor | **In progress** | 5/7 batch A done (+ `trust-verification`); 2 remain |
