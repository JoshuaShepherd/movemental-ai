# 08. `/about/[slug]` — a founder in depth

**Status** Not built · **Depends on** 07

## Purpose

One founder at length. Same job as a leader profile (prompt 02) but with more
weight — a visitor reaching this page is deciding whether to trust the people,
not just the framework.

## Read first

- `src/app/about/[slug]/page.tsx` — the real params and data fetch (1898 bytes,
  larger than the hub; it likely does real work)
- `src/lib/agent-room/data/profiles.ts` — Alan's and Brad's verified entries
- Prompt 02, and reuse its decisions rather than inventing new ones

## Data

`public.movement_leaders` for `alan-hirsch`, `brad-brisco`, `josh-shepherd`.
Alan's `bio_short` is long and detailed — award-winning books, Forge, Movement
Leaders Collective, NewThing, Redeemer City to City. Brad's is concise and
concrete — Send Network, covocational church planting, 18+ years teaching.
**Josh's is null.**

Also check `books` and `book_endorsements` for Alan — he has a substantial
published corpus, and a book list is the strongest possible credibility element
on his page. Query before designing that section.

## Structure

1. **Header** with `Crumb` "↑ About".
2. **Identity** — large `LeaderFace`, name in Playfair display-lg, role and
   organization in mono.
3. **`bio_short`** as lede, **`bio_long`** as body if present.
4. **`personal_piece`** if present — set apart in a bordered sheet, first-person
   voice given its own frame.
5. **Books** — only if the tables return rows. A real list with real titles, or
   no section.
6. **Their part in Movemental** — what this founder does here specifically. Only
   if the repo says; otherwise omit.
7. **Prev / next founder** and back to `/about`.

## Design system

Identical vocabulary to prompt 02 so the two profile types feel like one system:
`LeaderFace`, `Eyebrow`, `SectionLabel`, `Crumb`, `InkVoice`.

## Interactions

One file, `slug` prop or an in-page switcher across the three founders.

## Honesty constraints

- **Josh Shepherd's page is the hard case.** He has no bio in the database, and
  he is the person the site's contact CTA names. Design the page so his entry
  works with only a name, role, portrait and a mailto — and flag to the user that
  a bio is needed. Do not generate it. Do not infer it from the fact that he is
  a founder.
- Do not attribute books, roles, or organizations to a founder that the data
  does not carry. Alan's bio is detailed enough that embellishment would be both
  unnecessary and detectable.

## Done when

- All three founders render, including Josh's minimal state.
- Every claim traces to the database or the repo.
- The missing-bio gap appears in the delivery summary.
