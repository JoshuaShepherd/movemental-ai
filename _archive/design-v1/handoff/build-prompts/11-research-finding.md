# 11. `/research/[slug]` — a single research piece

**Status** Not built · **Depends on** 10

## Purpose

One research piece, readable. This is where a board member lands when they click
a footnote and want to know whether the argument holds. It is a reading
document, and it should be designed as one — not as a marketing page with
research-shaped decoration.

## Read first

- `src/app/research/[slug]/page.tsx` — the fetch and the render
- The content source found in prompt 10
- `src/components/linking/related-research-links.tsx` and
  `footnotes-callout.tsx` — both likely appear at the foot of this page too

## Structure

1. **Header** with `Crumb` "↑ Research".
2. **Article head** — `Eyebrow` with the research category, title in Playfair
   display, then a mono meta strip: date, reading length, and which audience
   pages cite this piece. The last item matters — it tells the reader why they
   were sent here.
3. **The abstract or thesis** — the piece's own summary in `var(--body-lg)`.
4. **The body** — long-form reading. Measure capped at 66ch. Playfair for
   section headings, Inter for prose, the notebook margin down the left. Pull
   quotes as bordered blocks, not oversized display type.
5. **Citations** — inline markers resolving to a source list at the foot, with
   real publishers and dates from the data. Cross-link `/footnotes`.
6. **Related research** — the other slugs, from `AUDIENCE_RESEARCH_SLUGS`.
7. **The bridge** — one honest CTA back to the path, not a hard sell. A reader
   here is evaluating, not buying.

## Design system

`Eyebrow`, `SectionLabel`, `Crumb`, `FaqItem` for methodology notes,
`InkVoice` sparingly — at most one line, since this is a document rather than a
conversation. Long-form body is plain Inter; resist decorating it.

## Typography note

This is the most reading-heavy page in the system. Do not let the display
typography compete with the prose. Headings step down clearly, line length stays
disciplined, and nothing animates while someone is reading.

## Tweaks

`slug` (text or enum), `showCitations` (boolean).

## Honesty constraints

- **The body text is the author's, not the model's.** Render what the data
  carries. If a piece exists as a title with no body, show the stub state and
  label it — the repo's own convention is "A fuller profile is coming"; use the
  equivalent here.
- Never fabricate a citation, a figure, or a methodology note.
- If reading length is not in the data, compute it from the text or omit it.

## Done when

- Every cited slug renders without an empty body or a broken citation.
- Stub pieces show a labelled stub state.
- The reading measure holds at every viewport width.
