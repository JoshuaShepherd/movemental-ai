# Citation system rollout — summary

**Status as of 2026-05-08.** Build prompt: [`docs/build/prompts/inline-citation-system-with-references-rail.md`](../prompts/inline-citation-system-with-references-rail.md). Visual canon: [`docs/html/home-citations-ledger.html`](../../html/home-citations-ledger.html). Citation canon: [`docs/research/state-of-ai-2026/movemental-research-corpus-v1.md`](../../research/state-of-ai-2026/movemental-research-corpus-v1.md).

---

## What shipped

### Tokens
- `--cite-hl`, `--cite-hl-strong`, `--cite-hl-ink`, `--cite-hl-soft` declared in `:root` and `html.dark`, exposed via `@theme inline` as `--color-cite-hl*`. ([src/app/globals.css](../../../src/app/globals.css))
- Stylesheet for chip + popover + marker + references rail at [src/app/citations.css](../../../src/app/citations.css), imported once from `globals.css`.

### Data layer
- [src/lib/citations/sources.ts](../../../src/lib/citations/sources.ts) — 17 source rows from corpus v1 §12. Every row carries `corpusSection` for traceability.
- [src/lib/citations/claims.ts](../../../src/lib/citations/claims.ts) — 13 page-facing claims, numbers wrapped in `<strong>`, meta rows pre-baked.
- [tests/unit/citations/catalog.test.ts](../../../tests/unit/citations/catalog.test.ts) — 7 specs guarding URL hygiene, orphan refs, and corpus §10 DROP-claim drift.

### Primitives ([src/components/citations/](../../../src/components/citations/))
- `<CitationsProvider />` — declarative page-scoped numbering.
- `<Cite />` — inline amber chip with click/Esc popover, single-instance behavior.
- `<CitedNumber />` — convenience wrapper for stat-strip cells.
- `<Marker />` — 38%-tall amber underline for editorial spotlight.
- `<ReferencesRail />` — bottom-of-page numbered list, anchors line up with chip numbers.

### Home page ([src/app/(site)/page.tsx](../../../src/app/(site)/page.tsx) → [src/components/sections-mock/home/home-ledger.tsx](../../../src/components/sections-mock/home/home-ledger.tsx))
- Replaced `TopographicHero / AudienceFold / PathFold / CredibilityFold / FinalCta` with the Ledger composition: `HeroLedger / StatStripLedger / GapArgumentLedger / PathLedger / ClosingLedger / ReferencesRail`.
- 9 chips wired through the catalog, in document order.
- The previous home sections remain in `src/components/sections-mock/home/` for incremental reuse; nothing was deleted.

### Verification
- `pnpm typecheck` — green.
- `pnpm test:run` — 18 / 18 pass (4 test files), including 7 new citation catalog specs.
- `pnpm lint` (scoped to new files) — clean.
- Dev server (`pnpm dev`) returns HTTP 200 on `/` and SSR-renders chips + `id="ref-…"` anchors on first paint.

---

## What's queued — per-page audit

The grep below is the seed for the page-by-page audit described in the build prompt §7. Each row should produce a `docs/build/citation-ledgers/<route>.md` ledger and the editorial team should walk it before chipping in code.

| Route | File | Empirical claim found | Disposition |
| --- | --- | --- | --- |
| `/training` | [src/components/studio/pages/TrainingPage.tsx#L149](../../../src/components/studio/pages/TrainingPage.tsx) | "92% of mission-driven leaders believe AI is a lever. Only 7% believe they have the judgment to pull it safely." attributed to "Virtuous-2026". | **REVISE.** This is an editorial paraphrase; the actual Virtuous finding is *92% adoption / 7% major capability improvement*. Either rewrite to the verified wording (cite `nonprofit-92-adoption`) or label clearly as "editorial framing of Virtuous 2026 data" (no chip). |
| `/pathway/skills` | [src/components/studio/pages/pathway/SkillsPathwayPage.tsx#L263](../../../src/components/studio/pages/pathway/SkillsPathwayPage.tsx) | Names *"Virtuous 2026 Strategic Foresight Report"*. Title appears to be invented — Virtuous's actual report is *2026 Nonprofit AI Adoption Report*. | **DROP / REVISE.** Replace with the correct title and add a chip if a specific stat is being asserted. |
| `/who-we-serve`, `/nonprofits`, `/churches`, `/institutions`, `/evidence`, `/methodology`, `/walkthrough` | various | Not yet audited — audience pages and methodology pages are most likely to carry uncited stats. | **AUDIT.** Walk each page, list every empirical claim, and decide chip vs DROP per the build prompt §7. |
| `/pricing`, `/services`, `/about`, `/faq` | various | Likely no chips needed; if value-prop copy quotes a stat, cite it. | **SKIM.** Single-pass review. |
| `/privacy`, `/terms`, `/cookies` | various | No chips. | **SKIP.** |

### Corpus §10 DROP-claim sweep

A grep across `src/` for the three high-risk DROPped claims confirms they are **not present** in any live page:

- `91% of church leaders` → 0 matches outside the catalog comment in `claims.ts`.
- `9% have a formal AI policy` → 0 matches.
- `25% of churches encountered AI scams` → 0 matches.

The catalog test in [tests/unit/citations/catalog.test.ts](../../../tests/unit/citations/catalog.test.ts) keeps these from being re-introduced via the citation catalog. A separate prose-grep in CI is a recommended follow-up if PRs start adding paraphrased versions.

---

## How to extend

Adding a new chip on a page:

1. Pick (or add) the source in [src/lib/citations/sources.ts](../../../src/lib/citations/sources.ts).
2. Pick (or add) the claim in [src/lib/citations/claims.ts](../../../src/lib/citations/claims.ts), mirroring the existing wording style and meta-row format.
3. Wrap the page with `<CitationsProvider claims={[…]}>` if it isn't already. Append the new claim id to the array in document order.
4. Place `<Cite claimId="…" />` immediately after the clause it cites (next to the actual number, not at sentence-end).
5. If the page should close with a references list, render `<ReferencesRail />` inside the same provider.

**Editorial discipline (from the build prompt):**

- Max 3 chips per line of prose.
- One canonical source per claim; collapse convergent findings into a single claim entry rather than chaining chips.
- Never chip a corpus §10 DROP claim — remove it from the prose entirely.
- Use `<Marker>` on at most one phrase per paragraph.
