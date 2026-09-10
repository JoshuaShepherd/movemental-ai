# 09. `/footnotes` — the citation register

**Status** Not built
**Inbound links** `FootnotesCallout`, which appears at the foot of all three audience editions

## Purpose

Every statistic on the audience editions carries a source. This page is where
those sources are listed in full. On a product whose thesis is credibility, the
citation register is not an afterthought — it is the proof that the numbers
elsewhere are real.

## Read first

- `src/app/footnotes/page.tsx`
- `src/components/linking/footnotes-callout.tsx` — how pages link in
- `src/components/agent-room/audience/institutions-config.ts` — its
  `painSection.sources` array, with `sourceIds` like `stanford-hai-2026`,
  `forvis-mazars-2026`, `fbi-ic3-2025`
- The nonprofits config's inline `// SourceId:` comments — `virtuous-2026`,
  `techsoup-2025`, `mckinsey-soa-2025`
- **Find the source registry.** Those ids must resolve somewhere — search for
  `sourceIds`, `SOURCES`, or the id strings themselves across `src/lib`. That
  file is this page's data model. Do not build until it is found.

## Known source ids to account for

`stanford-hai-2026` · `forvis-mazars-2026` · `fbi-ic3-2025` · `virtuous-2026` ·
`techsoup-2025` · `mckinsey-soa-2025`, plus the churches edition's Barna,
Lifeway/Christianity Today, State of AI in the Church, and WIRED/FOX13
citations, which appear as source strings rather than ids — check whether they
have registry entries too.

## Structure

1. **Header** with `Crumb`.
2. **Hero** — `Eyebrow` "Footnotes", a Playfair title, and one paragraph stating
   the standard: only measured claims carry a source, and structural patterns are
   labelled as patterns rather than dressed up as survey numbers. That
   distinction is drawn explicitly in `institutions-config.ts` and is the most
   important sentence on the page.
3. **The register** — every source as a row: number, the claim it supports, the
   publisher, the date, sample size where known, and a link out. Mono for
   numbers and dates, Inter for the claim.
4. **Grouped by page** *(if the registry supports it)* — which citation backs
   which edition, so a board member can verify one specific figure.
5. **The patterns note** — restate that three of the six institutions points are
   structural patterns, not statistics, and that they are marked as such.

## Design system

`SectionLabel` for group headings, `Eyebrow`, `Crumb`, `FaqItem` if a source
needs an expandable methodology note. Hairline-ruled rows, no card chrome — this
is a reference table, and the design should read as one.

## Tweaks

`groupBy` (enum: page / publisher / date), `showMethodology` (boolean).

## Honesty constraints

- **Never invent a citation, a URL, a date, or a sample size.** If the registry
  has an id with no full entry, render the id and mark the entry incomplete.
- Do not silently drop a source that has no entry — a missing citation for a
  published statistic is exactly what this page exists to expose.
- Keep the measured-claim / structural-pattern distinction visible.

## Done when

- Every source id used anywhere in the editions appears here.
- Any incomplete entry is visibly incomplete and listed in the delivery summary.
- The page reads as a reference document, legible at a glance to someone
  checking one number.
