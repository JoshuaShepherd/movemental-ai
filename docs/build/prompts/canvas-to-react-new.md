# Canvas to React: the `-new` migration

The governing prompt for migrating each page of the new movemental.ai site from the Claude Design canvas into this repo. Run it once per page. For pages in the `(new)` route group it supersedes `stitch-to-react-migration.md` and the Stitch pin; those still govern nothing else.

Design rules live in [`docs/design/MV_DESIGN_CHARTER.md`](../../design/MV_DESIGN_CHARTER.md). The product flow lives in the project's flow document (`movemental-site-and-flow.md`, version three). Read both before starting.

## The `-new` formula

- Every migrated page is a route in `src/app/(new)/` named `<page>-new`, for example `/home-page-new`, `/resolve-new`, `/map-new`.
- Old routes stay untouched and live until cutover. Do not edit, redirect or delete any existing route.
- `-new` pages are `noindex` (set once in `src/app/(new)/layout.tsx`).
- Links between pages go through `src/components/mv/routes.ts` (`MV_ROUTES`). When a page lands, repoint its entry there, and only there.
- Cutover is a separate slice: rename routes, add redirects, flip indexing. Not part of any page migration.

## Recon (done for slice S01; re-run if the repo has moved)

| File read | What it establishes |
|---|---|
| `CLAUDE.md` | Next 16, React 19, pnpm only, `slice/Sxx-` branches, link and type gates. Its Ink Band and Stitch sections predate this prompt. |
| `src/app/layout.tsx` | Root layout loads Inter, Playfair, Plex Mono, Caveat and puts `.ink-band-surface` on `<body>`. |
| `src/app/globals.css` | `.ink-band-surface :is(h1…h6)` forces Playfair 600; Paper must reset it. |
| `src/app/page.tsx` | `/` renders `HomeV4Content` (Ink Band). Stays live until cutover. |
| `src/components/brand/movemental-logo.tsx` | `MovementalLogo` wordmark; import it, do not redraw it. |
| `src/v2/lib/leaders-v4.ts` | Older roster with some stale headshot paths; Paper uses `src/components/mv/data/network.ts` instead. |
| `scripts/validate-internal-links.ts` | `pnpm link:check` fails on any internal href without a live route. |
| `next.config.ts` | No remote image patterns; leader photos use `<img>` with the repo's eslint-disable comment. |

## Drift (authoritative over anything earlier)

| Earlier doc says | Reality now | Do this |
|---|---|---|
| Stitch project `2208910962065880866` is the only visual source | The new site is designed on the Claude Design canvas | For `(new)` pages, the committed board under `docs/handoff/<page>-new/source/` is the source of truth |
| Ink Band is the only design system | Paper governs `(new)` | Follow `MV_DESIGN_CHARTER.md`; never mix the two |
| Public label for the network is "Trusted voices" | The flow document and home spec use "Movement leaders" and nav "Leaders" | Use "Movement leaders" on Paper pages. Leave Ink Band pages alone. |
| Four Map steps, Discern as step four | Home v3 and the platform proposal use five stages ending in Build and Review | Use the five stages. Build carries the pursue / keep simple / defer / refuse decision, with refusals written into the charter. |

## Locked decisions

1. Fonts: Instrument Serif, Source Serif 4, Geist, loaded in the group layout only.
2. Styles: `src/app/(new)/mv.css` with `--mv-*` tokens and `mv-*` classes. No Tailwind utility classes on Paper pages, no shadcn, no Ink Band classes.
3. Leader names and headshots come from the `movement_leaders` table (`photo_storage_path`). Never Natasha Nikkel or Jamie Roach, until told otherwise.
4. No prices anywhere.
5. No invented endorsements, Resolutions, participation, outcomes or case-study status.

## Check, then branch

For each capability you have not personally verified:

- **A target route a link should point to.** Check that it exists in `src/app`. If present, link it through `MV_ROUTES`. If absent, point `MV_ROUTES` at the nearest live route or an on-page anchor, add `TODO(Sxx-<page>-new)`, and record it in the state file.
- **Live data the board shows** (counts, Resolutions, assessment results). Check for an existing service or hook under `src/lib/services` and `src/hooks`. If present, use it. If absent, render the board's sample content labeled as an example, and record the fixture.
- **An image the board shows.** Check `public/` and the media library paths in the database. If present, use it. If absent, use the board's labeled placeholder.

## Components (real paths)

| Path | Use |
|---|---|
| `src/components/mv/mv-header.tsx`, `mv-footer.tsx` | Import on every Paper page |
| `src/components/mv/routes.ts` | Import; the only place hrefs to other pages live |
| `src/components/mv/home/leader-network.tsx` | Import wherever the leader network appears |
| `src/components/mv/home/resolve-preview.tsx` | Model for interactive statement lists |
| `src/components/mv/home/sections.tsx` | Model for section composition and class usage |
| `src/components/mv/data/network.ts` | Import for network leaders, ties and geometry |
| `src/components/brand/movemental-logo.tsx` | Import |

Anti-invention constraints:
- zero hex or rgb literals in `.tsx`; colors come from `--mv-*` tokens via `mv.css`
- no new primitives or wrappers when an `mv-*` class or existing component covers it; no second copy of a component
- never restyle `src/components/ui` or Ink Band components
- no schema changes; anything needing a table goes in `SCHEMA-REQUEST.md`
- pnpm only

## Copy

Paste every user-visible string from the board verbatim. If a line reads oddly, keep it and add a question to the page's `docs/handoff/<page>-new/README.md`.

## Gates (all must pass)

1. `pnpm typecheck` passes.
2. `pnpm exec eslint "src/components/mv/**" "src/app/(new)/**"` reports nothing.
3. `pnpm link:check` reports every internal href resolving.
4. `grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src/components/mv src/app/(new)/*/` finds no color literals in `.tsx` files.
5. The route returns 200 under `pnpm dev`, and `document.documentElement.scrollWidth` equals the viewport width at 1,440px and 390px.
6. No existing route file outside `src/app/(new)/` and `src/components/mv/` changed (`git diff --name-only main` shows only those paths, `docs/`, `CLAUDE.md` and the state file).

## Return channel

- **State file:** `MIGRATION-NEW-STATE.md` at the repo root. One row per page: slice, route, board source, status, gate results, check-and-branch outcomes, open questions.
- **Schema requests:** `SCHEMA-REQUEST.md`.
- **Deferrals:** `TODO(Sxx-<page>-new)` at each one.
- **Receipt:** the page's `docs/handoff/<page>-new/README.md`, ending with what was done, what was stubbed and what is open. Never record a commit sha you did not see.

## Page queue

Release 1, in order: S01 home-page-new (done), S02 resolve-new (done, front end only), S03 map-new, S04 guidebook-new, S05 leaders-new and leader profiles, S06 work-with-us-new with the inquiry form, S07 assessment-new, S08 audience pages (churches-new, nonprofits-new, institutions-new), S09 about-new on the long-form template. Signed-in Map workspaces come after the back-end merge.
