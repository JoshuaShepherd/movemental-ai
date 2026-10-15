# D1. The dashboard shell and `/dashboard`

**Status** Built — the `overview`, `reality-empty`, `not-configured` and `load-failed` screens of `Movemental Dashboard.dc.html`

## Purpose

Establish the authenticated frame: where a returning user is, which organization
they are in, how they move between the two real surfaces, and how they get out.
Every other dashboard prompt renders inside it.

## Read first

- `src/app/dashboard/page.tsx`, `dashboard/layout.tsx`
- `src/components/safety-dashboard/charter-dashboard-shell.tsx` — the current
  shell, which is what we are replacing
- `src/app/dashboard/ai-reality/page.tsx` — for the three real states
- `Movemental Utility Shell.dc.html` in this project — the auth-adjacent chrome
  already built, and the closest existing relative

## The design problem

The current shell reaches for the generic dashboard pattern: fixed icon sidebar,
avatar tile, muted greys. Nothing about it says Movemental. The brief is to build
navigation that is unmistakably the same publication as the public pages.

The strongest available move is the one the brand already owns: **the numbered
path spine**. The five charter layers are already numbered 01–05 on
`Movemental Safety Stage.dc.html`. Ghost numerals, mono labels, an ink-blue rule
on the active item, and the notebook margin down the reading column give you a
navigation pattern that is both distinctive and quieter than what exists.

## Structure

1. **Header** — the standard sticky 3.6rem, wordmark left. On the right, the
   organization name in mono, and a plain "Sign out" — not an avatar menu.
2. **Organization identity** — name and slug, set once, near the top. Drop the
   coloured initials tile; it is the most generic element on the current screen.
3. **Two destinations, not a nav tree.** The product has exactly two authenticated
   surfaces: the AI Reality Dashboard and the Safety Charter. Present two, plainly
   labelled. Do not build a sidebar sized for a product that does not exist yet.
4. **Status line** — the real string: `"Draft, {n} of {m} layers complete"` or
   `"Published"`. Nowhere else. One status, one place.
5. **The three AI-Reality states**, all designed, because all three ship:
   - **No results yet** — verbatim: "Take the assessment, then invite your team,
     your dashboard builds itself as responses arrive." Two CTAs: take the
     assessment, invite your team.
   - **Not configured** — "Dashboard not configured" with the `TENANT_ORG_ID`
     note. An operator-facing state; design it plainly and do not dress it up.
   - **Loaded** — defers to `Movemental Shared Reality.dc.html`; do not rebuild.
6. **The charter-load failure state** — verbatim: "Could not load charter data.
   Try again or contact support."
7. **Footer** — the utility footer already built: agent room · field guide ·
   questions? Consistency with the public pages is the point.

## Design system

`Eyebrow`, `SectionLabel`, `Crumb`, `PathLayer` for the layer nav, `Button`.
No icon set. The design system's guidance is explicit: no Lucide, no Heroicons.
Unicode arrows and hand-weight strokes only.

## Tweaks

`state` (enum: charter-draft / charter-published / reality-empty /
reality-loaded / not-configured / load-failed) so every real state previews.

## Honesty constraints

- Do not design a navigation item for a route that does not exist.
- The org name in previews is an obviously labelled example.
- Do not show a progress percentage the payload does not compute.

## Done when

- All six states render from the switcher.
- Nothing on screen would look at home in a generic admin template.
- A leader who read the public Safety page recognises the five layers at a glance.
