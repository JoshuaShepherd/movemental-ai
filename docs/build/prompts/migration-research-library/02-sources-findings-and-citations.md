# RL-02 — Sources, findings, and citations

**Prompt ID:** RL-02  
**Blocks:** RL-01  
**Last updated:** 2026-06-11

---

## 1. Goal

Wire **Route B** reference documents into the live research data layer:

- Expand `MASTER_SOURCES` from `authoritative-sources-ai-nonprofits-faith-formation.md`
- Rebuild `FINDINGS_STAT_PANELS` and `FINDINGS_TRUST_CHARTS` from `ai-research-archive.md` and `movemental-research-corpus-v1.md`
- Establish `<Cite n={} />` index alignment rules for Route A bodies (RL-03+)

**Do not** create a 415-line archive reader page.

---

## 2. Read first

- `docs/articles/graded-high/85-99/ai-research-archive.md`
- `docs/articles/graded-high/85-99/authoritative-sources-ai-nonprofits-faith-formation.md`
- `docs/articles/graded-high/85-99/movemental-research-corpus-v1.md` — §1 executive summary + adoption tables
- `src/lib/research/data.ts` — current FINDINGS + MASTER_SOURCES (prototype numbers)
- `src/components/research/research-sources.tsx`, `sources-list.tsx`
- `src/components/research/research-findings.tsx`

---

## 3. Findings page — stat panel rules

Replace prototype stats with **verified** pairs from the archive. Each panel needs:

```typescript
{
  primary: "92%",      // headline adoption or problem stat
  secondary: "7%",     // contrasting capability / policy stat
  copy: "…",           // one sentence — no conflated study names
  source: "Nonprofits · Virtuous · 2026",  // short provenance
}
```

**Hard rules** (from archive §Do not conflate):

| Wrong merge | Correct separation |
| --- | --- |
| "MIT 95%" productivity | MIT NANDA GenAI Divide = **pilot ROI failure** |
| "Only 5% succeed" | BCG future-built **5%** ≠ McKinsey high performers **6%** ≠ Virtuous **7%** |
| "68% can't tell AI from human" | **Unverified** — use Pew **53% not confident** |

Minimum **3** panels (nonprofit/faith, church policy, enterprise). Add a fourth if corpus supports higher-ed or formation without duplicating.

Update `FINDINGS_HERO.lede` to match verified narrative — adoption broad, capability rare, governance absent.

---

## 4. Trust charts

Source from Lifeway / Barna rows in corpus or archive. Each chart:

```typescript
{
  label: "43% of churchgoers disagree…",
  value: 43,
  tone: "blue" | "ink",
  source: "Lifeway · 2026",
}
```

Use **real percentages** from graded-high sources only. If a stat is QUALIFIED in corpus, use qualified wording in `label`.

---

## 5. Master sources registry

Ingest `authoritative-sources-ai-nonprofits-faith-formation.md` into `MASTER_SOURCES`:

- One row per **primary** source (not every bullet in the doc)
- `callout` field = pull-quote or key finding (optional)
- `url` when stable
- `dim: true` for background / tangential refs

Target **15–30** registry rows for v1 — enough for `<Cite>` range across Route A papers.

Add intro copy to `/research/sources` page if needed (one paragraph on source-quality tiers: Sourced / Attributed / Synthesis / Opinion — from rubric).

---

## 6. Citation index contract

For Route A migration (RL-03+):

1. Assign global `[n]` indices from `MASTER_SOURCES` — **stable across all papers**
2. Paper-specific rail (`item.sources`) lists the subset cited in that paper
3. `<Cite n={3} title="McKinsey · 2025" />` must match registry row 3
4. Markdown inline links `(Pew, 2025)(url)` become `<Cite>` when the source is in registry; otherwise keep external `<a>`

Document the index table in a comment at top of `data.ts` or a small `src/lib/research/source-index.ts` if cleaner.

---

## 7. Corpus v1 handling

`movemental-research-corpus-v1.md` is **748 lines** — Route B:

- Extract stat pairs for findings (§2–§5 of corpus)
- Do **not** port full TOC to React
- Optional: add index row "Movemental Research Corpus v1" with `hasFullBody: false` and CTA linking to future PDF (RL-90)

Sync confidence tags (VERIFIED / QUALIFIED / NEW / DROP) into internal comment block for maintainers — not rendered publicly unless in a dedicated maintenance page.

---

## 8. Definition of Done

- [ ] `FINDINGS_*` uses archive/corpus stats only — no prototype lorem
- [ ] `MASTER_SOURCES` expanded from authoritative-sources doc
- [ ] Conflation guardrails documented in code comment near FINDINGS
- [ ] `/research/findings` and `/research/sources` visually verified
- [ ] Citation index table documented for RL-03 agents
- [ ] `pnpm typecheck` green
- [ ] `master_runner.md` RL-02 updated

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
| 2026-06-11 | Cursor | **Done** | `MASTER_SOURCES` 5→18; 4th BCG panel; trust chart provenance; conflation header comment; sources intro prose; flagship rail cites re-indexed |
