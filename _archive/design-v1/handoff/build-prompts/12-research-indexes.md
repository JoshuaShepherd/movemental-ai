# 12. `/research/findings` + `/research/sources` — the two indexes

**Status** Not built · **Depends on** 10 · **One file, two views**

## Purpose

Two sibling indexes of the same evidence base at different grains: findings are
what Movemental concluded, sources are what it read. Build them as one file with
a switcher — they share a structure, and two near-identical files would drift
apart.

## Read first

- `src/app/research/findings/page.tsx` (387 bytes) and
  `src/app/research/sources/page.tsx` (379 bytes) — both thin, so both delegate
  to components. Find and read those components; that is where the real
  structure lives.
- `src/app/research/layout.tsx` — the shared shell and nav
- The data source established in prompt 10. Check whether findings and sources
  are separate tables or one table with a type discriminator — that determines
  whether a switcher or two lists is correct.

## Structure

1. **Header** with `Crumb`, and the research sub-nav (library / findings /
   sources) with the active view marked — pinned at exactly `3.6rem`.
2. **View switcher** — Findings / Sources, mono pills in the sub-nav, matching
   the audience switcher pattern in `Movemental Audience Editions.dc.html`.
3. **Findings view** — each finding as a row: the claim in Inter medium, the
   evidence grade or confidence if the data carries one, the sources it rests on,
   and a link to the full piece. This is a claims table; design it as a table,
   with hairline rules and no card chrome.
4. **Sources view** — each source as a row: publisher, title, date, sample size
   where known, and which findings cite it. The inverse index of findings.
5. **The standard, restated** — one line on the distinction between a measured
   claim and a structural pattern, consistent with `/footnotes` and the
   institutions edition.

## Design system

`SectionLabel` for group headings, `Eyebrow`, `Crumb`, `FaqItem` where a finding
needs an expandable rationale. Mono for all dates, grades, and sample sizes.
Reference-table density, not marketing spacing.

## Interactions

- Switch views without losing scroll position.
- Cross-link both directions: a finding lists its sources, a source lists the
  findings that cite it. That reciprocity is the point of having two views.

## Tweaks

`view` (enum: findings / sources), `groupBy` (enum: none / publisher / date).

## Honesty constraints

- An evidence grade shown must come from the data. Do not assign confidence
  levels — that is a research judgment, not a design one.
- Do not invent sample sizes, publishers, or dates.
- If a finding has no source, that is a real and important state: show it
  flagged rather than hidden, and report it in the delivery summary.

## Done when

- Both views render from real data with reciprocal cross-links.
- Unsourced findings are visibly flagged.
- The research sub-nav is consistent across all four research routes.
