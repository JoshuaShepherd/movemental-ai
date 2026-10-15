# /about-new and /story-new — handoff and receipt

Slice `S09-about-new`.

## What was built

- `/about-new` — no board of its own. Composed from the site's existing approved copy (`src/lib/founders/content.ts`: `FOUNDING_STORY`, `FOUNDERS_AND_ROLES`, `FOUNDER_PROFILES`, the same text today's `/about` uses) and the home page's "Movemental is a company" and closing sections. Founder cards link to the existing `/about/[slug]` profiles, which stay as they are.
- `/story-new` — the canvas board `LongForm` (`source/LongForm.dc.html`), verbatim except as below.
- `src/components/mv/about/about-views.tsx`. `MV_ROUTES.about` → `/about-new`, `.story` → `/story-new`, `.howWeUseAi` → `/how-we-use-ai` (unchanged page). The leaders page's "How Movemental began with these leaders' work" now opens the story.

## Board placeholders handled

| Board | Live page |
|---|---|
| "Josh Shepherd · [Date] · About 6 minutes" | "Josh Shepherd · About 6 minutes" |
| Note 1, "[How the rebuilding was done…]", and its marker | Omitted; the Virtuous note is now note 1 |
| "starting with [Youthfront, if they agree to be named]" | "We are doing this in our own organizations first." |
| "…formed people, and decisions about technology that belong in the work." (four-step wording) | "…formed people, only the tools that belong in the work, and a habit of reviewing what changes." (locked drift: five stages) |
| "Publishing: how leaders keep their work" (related link) | Omitted until `/publishing` exists |

## Open questions

1. The founders line (the flow document's open item): content.ts names Alan Hirsch, Brad Brisco (CEO) and Josh Shepherd. Confirm it still stands.
2. Whether Youthfront can be named in the story.
3. A date for the story.

## Gates

typecheck, lint, link:check pass; no color literals; both pages 200 with no horizontal scroll at 1,440px and 390px. `/about` itself still redirects to `/agent/about` in `next.config.ts`; that changes at cutover (see `docs/build/ROUTE-INVENTORY.md`).
