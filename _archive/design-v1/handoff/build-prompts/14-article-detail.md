# 14. `/articles/[slug]` — the article reading view

**Status** Not built · **Depends on** 13

## Purpose

One article, read properly. Alongside `/research/[slug]`, this is the most
typographically demanding page in the system: nothing to sell, one job, which is
to be read to the end.

## Read first

- `src/app/articles/[slug]/page.tsx`
- The content source from prompt 13, including its body format (MDX, HTML, or
  structured blocks — this determines how the body is rendered)
- `src/lib/agent-room/data/faq.ts` for the voice, and the design system guide's
  content-fundamentals section for punctuation conventions: em-dashes used
  liberally, en-dashes in ranges, curly quotes throughout

## Structure

1. **Header** with `Crumb` "↑ Writing".
2. **Article head** — `Eyebrow` with category, title in Playfair display-hero,
   standfirst in `var(--body-lg)`, then a mono byline strip: author, date,
   reading length.
3. **Reading progress** *(optional)* — a hairline progress rule under the
   header, as the repo's document shell does with `useDocumentScrollProgress`.
   1px, `var(--ink-blue)`, no percentage label.
4. **The body** — measure capped at 66ch, the notebook margin down the left,
   Playfair for section headings, Inter at `var(--leading-relaxed)` for prose.
   Blockquotes as bordered blocks in `var(--rule-accent)`. Inline links in
   `var(--link)` with a 3px underline offset.
5. **Marginalia** — where the content supports it, the Caveat handwriting note in
   the margin is the most characterful device available. Use it for genuine
   asides only, never as decoration on every section.
6. **Footnotes** — inline markers resolving at the foot, cross-linked to
   `/footnotes` where the citation is registered.
7. **The author** — `LeaderFace` with a one-line bio from the database. Alan,
   Brad, and Josh have entries in `public.movement_leaders`.
8. **Related** — two or three other articles by real relationship (shared tag or
   author), not "you might also like".
9. **One quiet CTA** — the Reality Map or the Handbook. One, at the end, not
   floating alongside the prose.

## Design system

`Eyebrow`, `SectionLabel`, `Crumb`, `LeaderFace` for the byline portrait,
`InkVoice` for marginalia. Everything else is typography.

## Typography rules

- One column. No sidebars competing with the text.
- No animation triggered while the reader is mid-article. `mvm-reveal` on
  scroll is acceptable for section entries; nothing that moves under the eye.
- Body text never below 16px, and `text-wrap: pretty` on headings.

## Tweaks

`slug` (text), `showProgress` (boolean), `showMarginalia` (boolean).

## Honesty constraints

- **The article body is the author's.** Render it; never write, extend,
  summarize, or "improve" it. If a slug has no body, show a labelled stub.
- Bylines come from the database. Do not attribute an article to a founder
  because it seems likely.
- No invented reading times — compute from word count or omit.

## Done when

- A long article reads cleanly end to end at 380px and at 1280px.
- The measure holds; no line exceeds about 75 characters.
- Zero model-authored prose in the body.
