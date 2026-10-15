# 13. `/articles` — the writing hub

**Status** Not built

## Purpose

Movemental's published thinking. Distinct from `/research`: research is evidence,
articles are argument. The hub's job is to make the thinking browsable and to
show that this is a company that writes, not a vendor with a blog.

## Read first

- `src/app/articles/page.tsx` (1816 bytes — it does real work; read the fetch)
- `src/app/articles/opengraph-image.tsx` — the social card, which reveals the
  intended visual identity for the section
- `src/app/articles/[slug]/page.tsx`
- Data source: check `content_items`, `write_content`, `articles`-like tables in
  Supabase. `content_items` is the most likely. Query for published rows before
  designing — the count changes the design (three articles is not a grid).

## Structure

1. **Header** with `Crumb`.
2. **Hero** — `Eyebrow` "Writing", a Playfair claim, one short paragraph. Keep
   it brief; the titles are the content.
3. **The index** — each article: title in Playfair, one-line standfirst, author,
   date, reading length. Mono for date and length.
4. **Lead article** *(only if the count justifies it)* — the most recent given
   more space. With fewer than about six articles, a single well-set list beats
   a featured-plus-grid layout. Let the real count decide.
5. **Topics / tags** — only if the data carries them. `content_item_tags` and
   `content_categories` exist; check whether they are populated before designing
   a filter nobody can use.
6. **Newsletter** — the repo has `subscribers` and newsletter routes. If a
   signup belongs here, keep it quiet and honest: one line, no modal, no
   interstitial, and no claim about frequency that is not true.

## Design system

`Eyebrow`, `SectionLabel`, `Crumb`. Hairline-ruled rows for the index. The
notebook margin on the hero sheet. No card grid unless the count genuinely
warrants one.

## Tweaks

`sortOrder` (enum: newest / oldest), `showTopics` (boolean),
`featureLatest` (boolean).

## Honesty constraints

- Render only published articles from the data. Do not pad the index to make a
  grid look full — an honest short list is the correct design for a short list.
- No invented titles, standfirsts, authors, dates, or reading times.
- If the table is empty, design the empty state and label it plainly.

## Done when

- The layout suits the real article count rather than an assumed one.
- Every row links to a slug that resolves.
- No filter exists for a field the data does not populate.
