# 07. `/about` — the founders

**Status** Not built · **Inbound links** the home page founders row, the editions

## Purpose

Three people, and why this particular three. Alan Hirsch, Brad Brisco, Josh
Shepherd. The credibility of a governance product rests on who is behind it, and
the repo has a real origin claim to anchor it.

## Read first

- `src/app/about/page.tsx` and `src/app/about/[slug]/page.tsx`
- `src/app/agent/about/page.tsx` — the in-room variant
- **`src/lib/agent-room/naming.ts`** — `MOVEMENTAL_FOUNDING`, which carries the
  real origin line: founded 2026, out of a two-year conversation among Alan,
  Brad, and Josh. Use it verbatim; it is the page's spine.
- `src/lib/agent-room/data/profiles.ts` — Alan's and Brad's verified content
- `src/components/agent-room/screen/stub/founders-screen.tsx`

## Data

Founder portraits are in the public `media-library` bucket:

    alan-hirsch/headshots/alan-hirsch.webp
    brad-brisco/headshots/brad-brisco.webp
    josh-shepherd/headshots/josh-shepherd.webp

Alan also has `alan-headshot-4x5.webp` and `alan-hero-4x5.webp` if a larger
crop is wanted. Bios for Alan and Brad are in `public.movement_leaders`
(`bio_short` is substantial for both). **Josh Shepherd's `bio_short` is null** —
his is the gap to flag, and he is the founder a visitor most needs to
understand, since the contact CTA across the site is "No form. Just Josh."

## Structure

1. **Header** — standard sticky.
2. **Hero** — `Eyebrow` "About", a Playfair claim, and the founding line from
   `MOVEMENTAL_FOUNDING` as the lede. Do not embellish the origin story.
3. **Why these three** — the honest argument: a missiologist, a church-planting
   strategist, and a builder. One short paragraph. Only claims the repo or the
   database supports.
4. **The three** — `LeaderFace` at generous size with name, role, and
   `bio_short`. Equal visual weight; no founder ranked above another. Link each
   to `/about/[slug]`.
5. **What Movemental is** — one section restating the thesis in the brand's own
   words: AI is already inside these organizations, used in ways no one has
   decided are acceptable, so the work is to respond wisely, in order, before
   reaching for tools.
6. **What we refuse** — carry the honesty block: no urgency, flat public prices,
   the agent that admits its limits. Cross-link `/how-we-use-ai`.
7. **Contact** — "No form. Just Josh." as `InkVoice` with a mailto.

## Design system

`LeaderFace` for all three portraits, `Eyebrow`, `SectionLabel`, `InkVoice`,
`Button`. Notebook margin on the reading sections.

## Tweaks

`showRefusals` (boolean), `founderLayout` (enum: row / stacked-editorial).

## Honesty constraints

- Josh's bio is missing from the database. Show the gap or omit the bio line —
  do not write it. Flag it in the delivery summary.
- No invented company history, headcount, client count, or founding anecdote
  beyond `MOVEMENTAL_FOUNDING`.
- Josh's title appears as "Founder & CTO" in earlier project files — verify
  against the repo before repeating it.

## Done when

- All three portraits load from Supabase with the duotone treatment.
- The founding line is verbatim.
- Josh's missing bio is handled visibly and reported, not papered over.
