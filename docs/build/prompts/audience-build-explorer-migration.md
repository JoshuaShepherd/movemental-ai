# Migrate audience build explorer — feature switcher → three audience pages

**Prompt ID:** audience-build-explorer  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Source prototype:** `docs/html/nonprofits-feature-switcher-complete.html`  
**Last updated:** 2026-06-17

Paste the block below into a fresh agent turn. It is self-contained and repo-aware.

---

## The prompt

> You are migrating **"The build"** interactive explorer from the HTML prototype at
> `docs/html/nonprofits-feature-switcher-complete.html` into the live Ink Band audience
> pages. The prototype is a single page with an **audience switcher** (Non-profits /
> Churches / Institutions). Your job is to **split it three ways** — one frozen,
> audience-specific version per page — and **drop the switcher entirely**.
>
> ### 0. Orient first (don't assume file paths)
>
> 1. Read the prototype HTML end-to-end — especially the `<script>` block (`ORDER`,
>    `FOUNDATION_FEATS`, `SHARED`, `DATA`, `renderTabs`, `wireframe`, `render`).
> 2. Read `CLAUDE.md` (Ink Band rules) and `docs/design/INK_BAND_DESIGN_CHAIN.md`.
> 3. Read the live audience stack:
>    - `src/components/agent-room/audience/audience-page-experience.tsx` — section order
>      and `#the-build` mount point (~line 362)
>    - `src/components/agent-room/audience/types.ts` — `AudiencePageConfig.theBuild`
>    - `src/components/agent-room/audience/{nonprofits,churches,institutions}-config.ts`
>    - `src/components/agent-room/audience/audience-page.module.css`
>    - `src/app/agent/{nonprofits,churches,institutions}/page.tsx`
> 4. Run `pnpm typecheck` before and after. Do not touch the six-layer data chain unless
>    the task explicitly requires it — this is UI + static content only.
>
> ### 1. Scope — what to migrate, what to omit
>
> **Migrate (per audience page):**
>
> | Prototype element | React placement |
> | --- | --- |
> | Eyebrow "The build" | Keep — already on `#the-build` |
> | H2 "Then we build **the tools** on top of it." + ink underline on "the tools" | Replace config title; add underline gesture |
> | Sub "The working platform, on the desk and in your pocket. Pick a layer, open any piece." | New intro line on `theBuild` (replaces or precedes current paragraph) |
> | Capability tab rail (Foundation · Publishing · Formation · Relationships) | New client component |
> | Feature accordion inside the active tab | Same component |
> | Device stage (desktop wireframe + phone agent chat) | Same component |
> | "Explore it live →" link per active capability | Same component — audience-specific demo URL + path |
> | Footer "A seeded preview…" | Audience-specific foot line |
>
> **Omit entirely:**
>
> - The `.aud` audience switcher block and all JS that toggles `state.aud`.
> - Any UI that lets the reader switch between nonprofits / churches / institutions on one page.
>
> **Placement:** The new explorer replaces the current `#the-build` body **after** the
> `#what-we-build` foundation section. Section order on the page must stay:
>
> ```text
> … → the-case → what-we-build (foundation) → the-build (NEW explorer) → deck? → formation → the-path → start
> ```
>
> **Replace in `#the-build`:**
>
> - The numbered `toolList` (`config.theBuild.toolExamples`)
> - `<HandbookDashboard />` (the charter dashboard mock — the Foundation tab's wireframe
>   already shows the AI Safety Charter document; do not render both)
>
> **Keep in `#the-build`:**
>
> - `config.theBuild.bridgeQuestion` — render it **after** the explorer, unchanged in copy
>   (each audience config already has its bridge line).
> - The optional `deck` section immediately following — do not move or alter it.
>
> ### 2. Data model — port the prototype's JS faithfully
>
> Create a typed data module (suggested path:
> `src/components/agent-room/audience/the-build-data.ts`) that ports the prototype
> constants verbatim in structure and copy. Use these exports:
>
> ```ts
> export const BUILD_CAPABILITY_ORDER = ['foundation','publishing','formation','relationships'] as const;
> export type BuildCapabilityId = (typeof BUILD_CAPABILITY_ORDER)[number];
> export type BuildAudienceSlug = 'nonprofits' | 'churches' | 'institutions';
> ```
>
> **Shared spine (identical for every audience):**
>
> - `FOUNDATION_FEATURES` — the six foundation feature rows from `FOUNDATION_FEATS`
> - `SHARED_CAPABILITIES` — title, tag, wf type, and phone Q/A defaults from `SHARED`
>   (Foundation phone Q/A is shared; other capabilities inherit phone copy from `SHARED`
>   unless overridden)
>
> **Per-audience overlay** — port each entry in the prototype's `DATA` object:
>
> | Audience | Demo base URL | Notes |
> | --- | --- | --- |
> | `nonprofits` | `https://nonprofits.movemental.ai` | publishing `/impact`, formation `/learn`, relationships `/app/donors` |
> | `churches` | `https://church.movemental.ai` | publishing `/sermons`, formation `/courses`, relationships `/giving` |
> | `institutions` | `https://seminary.movemental.ai` | foundation path `/library` (not `/app/handbook`), publishing `/scholarship`, etc. |
>
> For each capability per audience, preserve:
>
> - `path` — appended to demo base for "Explore it live"
> - `agent` — phone mock header label
> - `feats[]` — feature name, description, optional `sub`, optional `agent: true`
> - `wfData` — wireframe payload (charter tabs, publishing hero/cards, formation courses,
>   relationships table column + rows)
>
> **Foundation features** always come from `FOUNDATION_FEATURES` — do not duplicate them
> inside each audience object.
>
> Add a resolver:
>
> ```ts
> export function getBuildCapability(audience: BuildAudienceSlug, cap: BuildCapabilityId): ResolvedCapability
> ```
>
> that merges `SHARED_CAPABILITIES[cap]` with the audience overlay exactly as the
> prototype's `cap()` function does.
>
> Wire each page through `AudiencePageConfig.slug` — the component receives `slug` and
> looks up data; do **not** pass audience from URL params or a switcher.
>
> ### 3. Component architecture
>
> Build a **client** component (suggested:
> `src/components/agent-room/audience/the-build-explorer.tsx`, `"use client"`) because the
> prototype uses tab selection and feature accordion toggles.
>
> **Layout (match prototype grid):**
>
> ```text
> ┌─────────────────────────────────────────────────────┐
> │ eyebrow + h2 + sub                                   │
> ├──────────────────┬──────────────────────────────────┤
> │ capability tabs  │ device stage                      │
> │ (left rail)      │ desktop wireframe + phone mock    │
> └──────────────────┴──────────────────────────────────┘
> │ foot note                                            │
> └─────────────────────────────────────────────────────┘
> ```
>
> - Desktop grid: `330px 1fr` at `min-width: 821px`; single column stack below (tabs
>   above stage).
> - Phone mock: hide below `460px` (prototype behavior).
>
> **Interactions:**
>
> 1. **Capability tabs** — clicking a tab sets active capability; only the active row
>    expands to show its feature list + live link. Accordion expand/collapse on the tab
>    row itself matches prototype (`.row.on` + `.detail` max-height transition).
> 2. **Feature rows** — independent toggle per feature; chevron rotates when open.
>    Agent features (`.feat.agent` / `agent: true`) get ink-blue label + dot.
> 3. **Stage** — re-render wireframe + phone chat when capability changes; fade-in on
>    swap (`@keyframes fade` from prototype — respect `prefers-reduced-motion`).
> 4. **Explore it live** — external link, `target="_blank"`, `rel="noopener"`.
>
> **Wireframe sub-component** — port `wireframe(c)` logic into a small presentational
> helper or inline switch on `wf` type:
>
> - `foundation` — charter doc title + tab pills + skeleton lines
> - `publishing` — hero band + three card tiles
> - `formation` — course rows with progress bars
> - `relationships` — three-column table with stage column in ink-blue
>
> **Ink underline on "the tools"** — reuse the existing rough-ink SVG filter pattern from
> the audience pages if one exists; otherwise add a scoped underline SVG matching the
> prototype's `.uline` / `#rough` filter. Do not import Concept Modern gesture code.
>
> ### 4. Ink Band design rules (non-negotiable)
>
> - Surface: already inside `.ink-band-surface` via `/agent` layout — do not add oat-*
>   or Concept Modern tokens.
> - **No raw hex** in TSX or CSS. Map prototype vars to `--color-ink-band-*`:
>   - `--paper` → `--color-ink-band-paper`
>   - `--surface` → `--color-ink-band-surface`
>   - `--sheet` → `--color-ink-band-paper` or a `color-mix` surface step
>   - `--ink` → `--color-ink-band-ink`
>   - `--ink-muted` → `--color-ink-band-ink-muted`
>   - `--border` → `--color-ink-band-border`
>   - `--ink-blue` → `--color-ink-band-blue`
> - **Typography:**
>   - Eyebrow / labels / URL bar / subs → `--font-ink-mono`
>   - Capability titles → `--font-ink-display` (Playfair)
>   - Body, feature names, chat bubbles → `--font-ink-body` (Inter)
>   - Do **not** use Caveat on this section — the phone mock agent header is mono, not hand voice.
> - **Radii:** stage `16px`, desktop chrome `10px`, phone `30px` outer / `23px` inner,
>   pills `999px` — consistent with Ink Band card vocabulary.
> - Run **`tailwind-cleanup`** and **`color-audit`** skills on touched files when done.
>
> Styles belong in `audience-page.module.css` (preferred — keeps audience page CSS together)
> or a co-located `the-build-explorer.module.css`. Use CSS modules, not inline styles.
>
> ### 5. Config + types updates
>
> Extend `AudiencePageConfig.theBuild` in `types.ts`:
>
> ```ts
> theBuild: {
>   /** H2 without the underline target — e.g. "Then we build the tools on top of it." */
>   title: string;
>   /** Phrase inside title that receives the ink underline — e.g. "the tools" */
>   titleHighlight?: string;
>   /** Subhead under the H2 */
>   intro: string;
>   /** Italic foot line under the explorer */
>   footnote: string;
>   bridgeQuestion?: string;
> };
> ```
>
> Remove `paragraphs` and `toolExamples` from the type once migrated (update all three
> configs in the same PR).
>
> **Per-audience footnote copy** (from prototype `render()` footer, singularized):
>
> - nonprofits: "A seeded preview. Explore it live opens the real nonprofit demo so you can click around."
> - churches: "… real church demo …"
> - institutions: "… real institution demo …" (prototype uses `state.aud.replace(/s$/,'')` — use natural copy, not a regex)
>
> **Shared title + intro** (same on all three pages):
>
> - title: "Then we build the tools on top of it."
> - titleHighlight: "the tools"
> - intro: "The working platform, on the desk and in your pocket. Pick a layer, open any piece."
>
> Update `audience-page-experience.tsx`:
>
> ```tsx
> <TheBuildExplorer audience={config.slug} />
> {config.theBuild.bridgeQuestion ? ( … ) : null}
> ```
>
> Delete the `toolList` map and `<HandbookDashboard />` import from the build section.
> Keep `HandbookDashboard` exported if used elsewhere; if not, remove the dead component
> in a follow-up only when confirmed unused.
>
> ### 6. Accessibility
>
> - Capability tab buttons: `aria-selected`, `role="tab"`, wrapping `role="tablist"`.
> - Feature accordions: `<button aria-expanded>` on each feature head.
> - Device stage: `aria-live="polite"` on the stage wrapper so capability changes announce.
> - Wireframe area: `role="img"` with a concise `aria-label` describing the active
>   capability preview (e.g. "Publishing preview: impact stories and report cards").
> - Phone mock chat: decorative — `aria-hidden="true"` on the phone chrome; the tab panel
>   label covers the intent.
> - Focus rings: visible ink-blue focus consistent with other audience page controls.
> - `prefers-reduced-motion`: disable fade/slide transitions and max-height animations
>   (show content immediately).
>
> ### 7. Verification checklist
>
> Before marking done, confirm on **each** of `/agent/nonprofits`, `/agent/churches`,
> `/agent/institutions`:
>
> - [ ] Foundation section (`#what-we-build`) is unchanged above the build explorer.
> - [ ] No audience switcher anywhere on the page.
> - [ ] All four capabilities render with correct audience-specific copy and wireframes.
> - [ ] Foundation tab shows the six shared foundation features (not audience-duplicated).
> - [ ] Institutions foundation "Explore it live" points to `…/library`; others to `…/app/handbook`.
> - [ ] Agent features render in ink-blue; accordion and tab interactions work.
> - [ ] "Explore it live" opens the correct external demo URL in a new tab.
> - [ ] `bridgeQuestion` still renders below the explorer; deck (if present) still follows.
> - [ ] Responsive: single column ≤820px; phone mock hidden ≤460px.
> - [ ] `pnpm typecheck` and `pnpm lint` pass on touched files.
> - [ ] No raw hex, no oat-* tokens, no Caveat outside agent-voice surfaces.
> - [ ] Console clean on all three routes (spot-check in browser).
>
> ### 8. Definition of done
>
> 1. One shared `TheBuildExplorer` component + typed data module ported from the HTML prototype.
> 2. Three audience pages each show their own frozen segment — zero switcher UI.
> 3. Section sits after foundation, replaces tool list + handbook dashboard, preserves bridge + deck.
> 4. Ink Band token compliance and a11y requirements met.
> 5. Typecheck green; verification checklist above checked on all three routes.
>
> ### 9. Out of scope (do not expand)
>
> - Wiring "Explore it live" to in-app routes — external demo URLs only, as in the prototype.
> - Real agent chat in the phone mock — static bubbles only.
> - Changes to foundation section, deck, formation, path, or start sections.
> - Database, API, hooks, or six-layer chain changes.
> - Concept Modern / marketing route groups under `_archive/`.

---

## Reference — prototype data snapshot

Use the live HTML as SSOT for copy. Quick routing matrix:

| Capability | Nonprofits | Churches | Institutions |
| --- | --- | --- | --- |
| Foundation path | `/app/handbook` | `/app/handbook` | `/library` |
| Publishing path | `/impact` | `/sermons` | `/scholarship` |
| Formation path | `/learn` | `/courses` | `/courses` |
| Relationships path | `/app/donors` | `/giving` | `/advancement` |
| Publishing hero | Clean water reached 12 villages | This week: The Architecture of Grace | The Architecture of Grace, an essay |
| Relationships column | Donor | Member | Student / Alumni |

Foundation features (all audiences): Your website · Accounts & dashboard · AI Assistant · Library · Visibility & Trust · Governance.

---

## Follow-up prompt (optional)

After migration lands, run a parity pass modeled on
`docs/build/prompts/safety-flow-migration-audit.md`: token audit, responsive check,
and side-by-side screenshot compare against the HTML prototype (one audience at a time).
