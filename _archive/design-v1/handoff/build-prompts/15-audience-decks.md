# 15. `/agent/{churches,nonprofits,institutions}/deck` — the three pitch decks

**Status** Not built · **One deck file, three editions**

## Purpose

The audience argument as a presentation — what gets shown in a room to a board
or a leadership team, rather than read alone on a laptop. The repo already has
the deck content structured as data.

## Read first

- `src/app/agent/churches/deck/page.tsx`, `nonprofits/deck/page.tsx`,
  `institutions/deck/page.tsx`
- `src/components/agent-room/deck/institution-deck.ts` — referenced from
  `institutions-config.ts` as `institutionDeck`. **This is the content model.**
  Find the church and nonprofit equivalents in the same directory.
- The three audience configs, already used for
  `Movemental Audience Editions.dc.html` — the deck is the same argument
  compressed, so reuse the copy rather than rewriting it.

## Build on the deck starter

Use `copy_starter_component({kind: "deck_stage.js"})` and mount it as an
`x-import` at the top of the template:

    <x-import component-from-global-scope="deck-stage" from="./deck-stage.js"
              width="1920" height="1080" hint-size="100%,100%">
      <section data-label="…" data-speaker-notes="…">…</section>
    </x-import>

Slides are inline-styled `<section data-label>` children. Never set position or
inset — the stage positions them. Speaker notes go in `data-speaker-notes` as
plain text so they travel with the slide on reorder.

## Slide sequence — from the configs, not invented

1. **Title** — audience volume label, the lead claim, the wordmark.
2. **What's already true** — the six evidence cards, split across two or three
   slides. Two per slide at 1920×1080; six on one slide is unreadable.
3. **The evidence** — the statistics with their sources visible. A deck shown to
   a board must carry its citations on the slide, not in a footnote.
4. **Not one of these was decided on purpose** — the pivot slide. One line.
5. **The path** — the four stages, then one slide per stage.
6. **Stage one is where you start** — the Charter's five layers.
7. **Two ways to do it** — the Handbook and the Dashboard.
8. **The limit** — tools without formation. One line, full bleed.
9. **Start** — the flat public price and how to begin.

## Typographic rules for 1920×1080

- **Nothing below 24px**, and most text far larger. Slide titles at 72–96px,
  body at 32–40px, mono labels at 24–28px.
- Two background treatments maximum: `var(--bg)` paper and
  `var(--surface-inverse)` for the pivot and limit slides.
- One idea per slide. If a slide needs a paragraph, it is two slides.
- Repeat the style literals on every slide — no shared classes.

## Interactions

The stage handles nav, scaling, the thumbnail rail, notes, and print. Do not
hand-roll any of it. Add the audience switcher outside the stage, or ship one
deck per audience behind a prop.

## Tweaks

`audience` (enum: churches / nonprofits / institutions).

## Honesty constraints

- Every statistic keeps its source on the slide.
- The institutions deck must preserve the measured-claim / structural-pattern
  distinction — three of its six points are patterns, and a deck is exactly
  where that nuance gets lost.
- No invented slides. If the deck data has fewer beats than the sequence above,
  ship fewer slides.

## Done when

- All three editions present end to end with the rail and notes working.
- No text under 24px anywhere.
- Every statistic slide shows its citation.
- Print-to-PDF produces one page per slide with no clipping.
