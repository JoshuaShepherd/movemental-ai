# 10. `/research` — the research library hub

**Status** Not built
**Inbound links** `RelatedResearchLinks` at the foot of all three audience editions

## Purpose

The evidence base behind the whole argument. The editions already link to
specific research slugs — `ai-credibility-crisis`, `trust-verification`,
`seo-geo-discoverability`, `credibility-thesis` — so those pieces exist and are
being cited by the marketing pages. This hub is where a sceptical reader goes to
check the thinking.

## Read first

- `src/app/research/page.tsx`, `research/layout.tsx`
- `src/app/research/[slug]/page.tsx`, `research/findings/page.tsx`,
  `research/sources/page.tsx` — four routes, one system; read all four before
  designing any
- `src/components/linking/related-research-links.tsx` — how the editions map
  audiences to slugs (`AUDIENCE_RESEARCH_SLUGS`)
- Find the research content source: likely `content_items`, `works`, or
  `archive_items` in Supabase, or MDX in the repo. Query before assuming.

## Known slugs

`ai-credibility-crisis` (cited by all three editions), `trust-verification`
(churches, nonprofits), `seo-geo-discoverability` (churches),
`credibility-thesis` (institutions). There are likely more — enumerate from the
data source rather than this list.

## Structure

1. **Header** with `Crumb`, plus a sub-nav across the four research routes
   (library / findings / sources) pinned at exactly `3.6rem`.
2. **Hero** — `Eyebrow` "Research", a Playfair claim on why a governance product
   publishes its evidence, and the standard: measured claims carry sources.
3. **The index** — every research piece as a row or card: title, one-line
   summary, date, and which audiences cite it. Hairline rules, not heavy cards.
   Sort by date descending unless the data suggests a deliberate order.
4. **Findings vs. sources** — explain the difference plainly and link to both.
   A reader should understand in one sentence what each of the three research
   routes holds.
5. **Cross-link `/footnotes`** — the citation register is the same argument at a
   different grain.

## Design system

`SectionLabel`, `Eyebrow`, `Crumb`, `FaqItem` for expandable abstracts. Reading
typography — Inter body at `var(--leading-relaxed)`, measure capped at 66ch. No
decoration on an evidence page.

## Tweaks

`sortOrder` (enum: newest / alphabetical), `showAbstracts` (boolean).

## Honesty constraints

- List only research that exists in the data. An empty library is a real state —
  design it, labelled, rather than filling it with plausible titles.
- Do not write abstracts. Use the summary field the data carries or show none.
- Do not add author names, dates, or citation counts that are not in the data.

## Done when

- Every slug the editions cite appears in the index and resolves.
- The three research routes are navigable from one another.
- No invented titles, abstracts, or dates.
