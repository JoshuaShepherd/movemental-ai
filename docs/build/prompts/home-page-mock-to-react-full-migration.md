# Prompt: Home page full migration — `mock-home.html` → `/`

> **How to run this:** Paste this prompt into Claude Code at the repo root, or invoke with `@docs/build/prompts/home-page-mock-to-react-full-migration.md`. This is an **in-place update** of the production home page — there is **no archival step**. The current `src/components/sections-mock/home/home-content.tsx` will be replaced by the full design and copy of [`docs/html/mock-home.html`](../../html/mock-home.html). Resume from the last completed phase if a session ends mid-flight.

---

## 1. Mission

Replace the current React home page with the full design and copy of [`docs/html/mock-home.html`](../../html/mock-home.html). After this prompt is complete:

- `/` (route file: [`src/app/(site)/page.tsx`](../../../src/app/(site)/page.tsx)) renders the **eleven** content sections of the new mock in document order, at full visual parity with the static HTML.
- The current home composition at [`src/components/sections-mock/home/home-content.tsx`](../../../src/components/sections-mock/home/home-content.tsx) (HeroFold → PeopleFold → DiagnosisFold → PathFold → FinalCta) is **superseded**. We do not create an `_archive/` copy. Git history is the only audit trail we need.
- The "Internal · Scorecard" band (HTML lines 847–1209) is **omitted** — it is a self-audit instrument, not production content.
- All recipe class names emitted by JSX match those in [`docs/html/mock-pages.css`](../../html/mock-pages.css) verbatim (class-name parity is the contract that keeps static and React surfaces identical — see the rule in §3 of [`stitch-to-react-migration.md`](./stitch-to-react-migration.md)).
- Any recipe rules referenced by JSX that are not yet in [`src/app/recipes.css`](../../../src/app/recipes.css) are ported from `mock-pages.css` first, before any TSX changes land.

The migration is complete when `/` matches the static mock at four breakpoints (1440 / 1024 / 768 / 390), Lighthouse a11y is ≥ 95, and the validation checklist in §10 passes.

## 2. Anchors — read these once before editing

| Doc | Why it matters here |
| --- | -------------------- |
| [`docs/design/DESIGN.md`](../../design/DESIGN.md) | Concept Modern charter — warm cream paper, near-black ink, **`<em>` = Instrument Serif italic** emphasis, ink-pill CTAs. **Token discipline: no raw hex in TSX, no `bg-white`/`bg-black`, no decorative borders for sectioning.** §3 (color), §5 (typography), §6 (motion + a11y), §13 (do/don't checklist). |
| [`docs/design/PATTERNS.md`](../../design/PATTERNS.md), [`docs/design/MOTION.md`](../../design/MOTION.md), [`docs/design/STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md) | Companion specs to DESIGN.md — pattern catalog, motion durations, static ↔ React primitive map. |
| [`docs/architecture/README.md`](../../architecture/README.md) | Six-layer type-safety chain. **Layer 6 (UI) is hand-built**; this prompt only touches Layer 6 + global CSS. **Do not edit** `src/lib/db/schema.ts`, schemas, services, routes, or hooks. If anything in this prompt asks you to change a lower layer, stop and re-read the prompt. |
| [`docs/architecture/layers/05-react-hooks.md`](../../architecture/layers/05-react-hooks.md) | Confirms hooks are the only generated artifact UI consumes. The new home page **consumes no hooks** — every section is pure presentation. |
| [`docs/build/prompts/stitch-to-react-migration.md`](./stitch-to-react-migration.md) | Authoritative migration protocol. Read §3 (non-negotiables) and §6 (recipe layer port rule). This prompt assumes its rules and only documents the home-page-specific differences. |
| [`docs/build/prompts/mock-html-to-react-migration.md`](./mock-html-to-react-migration.md) | The thirteen-page playbook the home page first shipped under. This prompt **supersedes** its §9 (Phase P0) for the new design. |

## 3. Skills to consult

Invoke these via the Skill tool (not by reading the SKILL.md). Use them at the prescribed moment, not all at once:

| Phase | Skill | Why |
| ----- | ----- | --- |
| Before any edit | **`design-audit`** | Spot-check the static mock's tokens, hairline use, and tonal stacking against `DESIGN.md` so you migrate a clean source, not a drift. |
| F1 (recipes) | **`color-audit`** | Verify the new recipe blocks use only semantic tokens (`var(--background)`, `var(--foreground)`, `var(--inverse-surface)`, …) — no `#hex` slipped in from a copy/paste. |
| F2 (sections) | **`design-section`** | Use it as the structural template when authoring each new section component (audience cards, path-steps, matters, build, difference, proof). |
| F2 (sections) | **`responsive-design`** | Container queries / fluid type rules so the four breakpoints all match the static mock without bespoke media queries. |
| F2 (sections) | **`icon-audit`** | The new mock ships **inline SVG icons** in audience cards and the build grid. Confirm they conform to the icon rules (single library where practical, no hardcoded colors via `currentColor`, accessible `aria-hidden`). Inline-decorative SVG is acceptable here; do not convert to `lucide-react` unless an exact equivalent exists. |
| F2 (sections) | **`tailwind-cleanup`** | Catch any non-semantic Tailwind utility (`bg-white`, `text-gray-500`, raw hex) that sneaks in during composition. |
| Verification | **`web-design-guidelines`** | Final accessibility + UX pass before commit (focus rings, heading order, contrast on Midnight bands). |
| Verification | **`typography-polish`** | Confirm `<em>` emphasis renders as Instrument Serif, eyebrow tracking is correct, prose width respects `--prose-max`. |
| Verification | **`page-audit`** | Holistic post-migration audit on the live `/` route. Persist its report at `docs/build/notes/home-page-audit-<date>.md`. |
| Final | **`responsive-audit`** | Per-breakpoint regression sweep across 1440 / 1024 / 768 / 390. |

Do not re-derive what these skills already encode — call the skill, then act on its findings.

## 4. Section map (the migration target, in document order)

Lines refer to [`docs/html/mock-home.html`](../../html/mock-home.html).

| # | HTML lines | Section component (target file) | Band variant | Class anchors |
| --: | ---- | ---- | ---- | ---- |
| 1 | 63–96 | `hero-fold.tsx` | `band-midnight hero hero--fold hero--path` | `hero-headline__line`, `hero-subhead`, `hero-actions` |
| 2 | 98–299 | `audience-fold.tsx` | `band-default audience-section` | `audience-grid`, `audience-card`, `audience-card__icon`, `audience-card__cta` |
| 3 | 301–391 | `path-fold.tsx` | `band-section path-section` | `path-steps`, `path-step`, `path-step__number`, `path-section__cta` |
| 4 | 393–441 | `matters-fold.tsx` | `band-default matters-section` | `matters-section__grid`, `matters-block`, `matters-section__closing` |
| 5 | 443–518 | `build-fold.tsx` | `band-section build-section` | `build-section__grid`, `build-item`, `build-item__icon` |
| 6 | 520–567 | `difference-fold.tsx` | `band-default difference-section` | `difference-section__grid`, `difference-block` |
| 7 | 569–612 | `proof-fold.tsx` | `band-section proof-section` | `proof-section__grid`, `proof-pillar`, `proof-section__note` |
| 8 | 614–640 | `final-cta.tsx` | `band-midnight final-cta` | `final-cta__inner`, `final-cta__actions` |
| 9 | 642–817 | `people-fold.tsx` (**update existing**) | `band-default people-fold` | `people-fold__columns`, `people-tile`, `people-tile__photo` |
| 10 | 819–845 | `diagnosis-fold.tsx` (**update existing**) | `band-section` (`#problem`) | `prose`, `section-head` |
| 11 | 847–1209 | **OMIT** (scorecard self-audit) | — | — |

The page resolves to **ten** rendered sections plus the omitted scorecard band. Skip nothing else.

> **Movement-leader doctrine check.** The audience grid in section 2 lists *Nonprofit Leaders → Church Leaders → Institutional / Seminary Leaders* — three sibling cards. This matches the canonical doctrine in [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md): movement leaders are not a fourth audience card. **Do not** add a fourth tile, do not relabel. Leave the people-fold (section 9) as the only place "trusted voices" appears on the home page.

## 5. Phase plan (strict order, one commit per phase)

| Phase | Scope | Definition of done |
| ----- | ----- | ------------------ |
| **F1** | Port missing recipes from `mock-pages.css` → `src/app/recipes.css` | `pnpm build` clean. No JSX changes yet. New selectors visible via grep. |
| **F2** | Decompose `home-content.tsx` into ten section components under `src/components/sections-mock/home/` | `pnpm typecheck` + `pnpm build` clean. `/` renders all ten sections at parity with the static mock. |
| **F3** | Asset & a11y polish — replace Unsplash people photos with placeholder treatment, verify focus rings on Midnight bands, run `page-audit` and `responsive-audit` | Skills' reports clean (or known follow-ups logged). Lighthouse a11y ≥ 95. |
| **C1** | Closeout — update [`docs/build/stitch-screens.md`](../stitch-screens.md), commit, link the audit notes from §3. | One commit per phase, message format: `feat(site): home page migration — phase Fn (description)`. |

Each phase ends in a working commit. **Never** combine phases into a single commit; if you finish F1 and start F2, commit F1 first.

## 6. Phase F1 — Recipe layer port

The new mock introduces **six recipe families** that don't yet exist in [`src/app/recipes.css`](../../../src/app/recipes.css):

- `.audience-section` + descendants (audience grid in section 2)
- `.path-section`, `.path-step` + descendants (sequence in section 3)
- `.matters-section`, `.matters-block` + closing (section 4)
- `.build-section`, `.build-item` (section 5)
- `.difference-section`, `.difference-block` (section 6)
- `.proof-section`, `.proof-pillar`, `.proof-section__note` (section 7)
- `.final-cta`, `.final-cta__inner`, `.final-cta__actions` (section 8)
- `.hero--path`, `.hero-headline__line`, `.hero-subhead` (section 1 — confirm, may already exist)

The static SSOT for these selectors is [`docs/html/mock-pages.css`](../../html/mock-pages.css). Steps:

1. **Audit the gap.** For each anchor class in §4 above, run:

   ```bash
   for sel in audience-section audience-card path-section path-step matters-section matters-block build-section build-item difference-section difference-block proof-section proof-pillar final-cta hero--path hero-headline__line; do
     printf '%-26s mock-pages.css=%s recipes.css=%s\n' "$sel" \
       "$(grep -c "\.$sel" docs/html/mock-pages.css)" \
       "$(grep -c "\.$sel" src/app/recipes.css)"
   done
   ```

   Any row where `recipes.css=0` and `mock-pages.css>0` is a gap to port. Any row where both are non-zero needs a diff: if the rules diverge, **the static side wins** (it is the design SSOT) and the React side gets updated to match.

2. **Port verbatim.** Copy the missing rule blocks from `mock-pages.css` into `src/app/recipes.css`, preserving **token references** (`var(--foreground)`, `var(--card)`, `var(--inverse-surface)`, …). Do not transform tokens, do not introduce hex. Match the order in `mock-pages.css` so a future bulk diff stays small.

3. **Reject any non-semantic value.** Run the **`color-audit`** skill on the patched `recipes.css`. Stop and ask before keeping anything that is not a semantic CSS variable. If a recipe in `mock-pages.css` uses a token that does not exist in `globals.css`, the migration prompt's §3.4 says **fix the static side** to match React — but in this repo today, `globals.css` is the SSOT and tokens already exist for everything the new recipes reference. If you find a missing token, **stop** and surface the divergence.

4. **Confirm `band-midnight` cascade.** Sections 1 and 8 are Midnight bands. The hero pill rules under `.band-midnight .btn-pill--primary` (existing) must still apply over the new `.hero--path` modifier and the new `.final-cta` block. Sanity-check by previewing the static mock locally:

   ```bash
   open docs/html/mock-home.html   # inspect the cream pill on midnight in DevTools
   ```

5. **Build and commit.**

   ```bash
   pnpm build
   git add src/app/recipes.css
   git commit -m "feat(site): port mock-home recipes (audience/path/matters/build/difference/proof/final-cta) into recipes.css"
   ```

**No JSX changes in F1.** The dev server should still render the *current* home (HeroFold → PeopleFold → DiagnosisFold → PathFold → FinalCta) — it just has the new selectors available for F2.

## 7. Phase F2 — Section decomposition + page composition

### 7.1 File layout

Decompose [`src/components/sections-mock/home/home-content.tsx`](../../../src/components/sections-mock/home/home-content.tsx) into one file per section under `src/components/sections-mock/home/`:

```text
src/components/sections-mock/home/
  home-content.tsx        # composition only — imports + ordered render
  hero-fold.tsx           # section 1
  audience-fold.tsx       # section 2 (new)
  path-fold.tsx           # section 3 (replaces current PathFold; expanded)
  matters-fold.tsx        # section 4 (new)
  build-fold.tsx          # section 5 (new)
  difference-fold.tsx     # section 6 (new)
  proof-fold.tsx          # section 7 (new)
  final-cta.tsx           # section 8 (existing — rewrite to match new copy)
  people-fold.tsx         # section 9 (existing — extracted from home-content)
  diagnosis-fold.tsx      # section 10 (existing — extracted from home-content)
```

Why a per-file split (vs. one big file): the new sections each carry six to twelve list items and an inline SVG, and the section grows a lot. Per-file modules make focus/edit cycles smaller and let you call **`design-section`** as a structural template per file.

### 7.2 Composition file (the new `home-content.tsx`)

```tsx
// src/components/sections-mock/home/home-content.tsx
//
// Composes the home page in the order defined by docs/html/mock-home.html
// (after the omitted scorecard band — see docs/build/prompts/home-page-mock-to-react-full-migration.md).

import { HeroFold } from "./hero-fold";
import { AudienceFold } from "./audience-fold";
import { PathFold } from "./path-fold";
import { MattersFold } from "./matters-fold";
import { BuildFold } from "./build-fold";
import { DifferenceFold } from "./difference-fold";
import { ProofFold } from "./proof-fold";
import { FinalCta } from "./final-cta";
import { PeopleFold } from "./people-fold";
import { DiagnosisFold } from "./diagnosis-fold";

export function HomeContent() {
  return (
    <>
      <HeroFold />
      <AudienceFold />
      <PathFold />
      <MattersFold />
      <BuildFold />
      <DifferenceFold />
      <ProofFold />
      <FinalCta />
      <PeopleFold />
      <DiagnosisFold />
    </>
  );
}
```

Page route stays unchanged at [`src/app/(site)/page.tsx`](../../../src/app/(site)/page.tsx) — it already imports `HomeContent`. Confirm the `metadata` export there matches the static mock's `<title>` and `<meta name="description">`:

```tsx
export const metadata: Metadata = {
  title: "A wiser way to navigate AI",
  description:
    "Movemental walks church and nonprofit leaders through the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions, in order.",
};
```

### 7.3 Component decomposition rules (apply to every section file)

These rules consolidate `DESIGN.md` §3, §5, §13 and the migration prompt's §3 / §9.2.

1. **Server Components by default.** None of the ten sections need `"use client"`. The home page is fully static — no interactivity, no state, no effects. If you reach for `useState`, stop and reconsider.
2. **Class-name parity.** Every named recipe class on a JSX element must match the static mock byte-for-byte. Examples:
   - HTML `<section class="band-midnight hero hero--fold hero--path">` → JSX `<section className="band-midnight hero hero--fold hero--path">`.
   - HTML `<a class="audience-card">` → JSX `<Link className="audience-card">` (use `next/link`, not `<a>`, for in-app navigation).
3. **Use the existing primitives where they exist.** Reuse `BtnPill` and `SectionHead` from [`src/components/sections-mock/primitives.tsx`](../../../src/components/sections-mock/primitives.tsx). Do not author a parallel button or eyebrow primitive. The mock's `<a class="btn-pill btn-pill--primary">` becomes `<BtnPill href="…" variant="primary">…</BtnPill>`.
4. **`<em>` = Instrument Serif italic.** The mock uses `<em>` inside the hero headline ("leading it—or reacting to it.") and in the diagnosis display ("AI amplifies what is already <em>true</em> for you."). Keep `<em>` verbatim in JSX — `globals.css` `@layer base` (DESIGN.md §5) does the work.
5. **Inline SVG icons stay inline.** The audience cards (lines 124–158, 184–211, 237–274) and build items (lines 463, 472, 481, 490, 499, 508) ship inline SVG. Keep them inline. Make them accessible:
   - Wrap each icon span with `aria-hidden="true"` (matches the static mock).
   - Use `currentColor` on `stroke` / `fill` so the icon inherits ink colour. The static mock already does this — if you find a hardcoded hex on an SVG attribute, fix it.
   - Do **not** swap to `lucide-react` unless an icon has a 1:1 equivalent. Concept Modern's icon style is bespoke linework; lucide will not match.
6. **Replace `images.unsplash.com` with placeholders.** The people-fold (section 9) uses Unsplash URLs for headshots (lines 671, 695, 719, 751, 775, 798). Do **not** ship Unsplash. Replace each with the same `bg-elevated` placeholder square the current `people-fold.tsx` already renders (`<span class="people-tile__photo" style={{ background: "var(--elevated)", … }} />`). Add one line per missing asset to the work log:

   ```bash
   # docs/build/stitch-screens.md, under "Asset TODOs"
   - [ ] Liz Rios headshot · home people-fold · 88×88
   - [ ] JR Woodward headshot · home people-fold · 88×88
   # …six total
   ```

7. **Hairline / token discipline.** No `border-1`, `divide-y`, or raw hex anywhere in the new files. The recipe layer ported in F1 already provides every line you need. If you reach for a Tailwind border utility, you are likely working around a missing recipe — go fix the recipe instead.
8. **Anchors for in-page nav.** Preserve `id="problem"` (diagnosis), `id="how"` (path), `id="cta"` (final-cta) on the section roots. The footer and elsewhere rely on these for hash links.

### 7.4 Per-section authoring notes

Most sections are mechanical translations. Notes below cover only the spots that benefit from clarification.

- **`hero-fold.tsx`.** Hero headline is a two-line construct (`<span class="hero-headline__line">`) — keep the spans. The existing `HeroFold` uses a single-line `<h1>`; replace it. Hero CTAs link to `/field-guide` (primary "See the Path") and `/field-guide#stage-safety` (ghost "Start with Safety"). Keep the existing eyebrow `For organizational leaders`.
- **`audience-fold.tsx`.** Three `<a class="audience-card" href="#…">` elements. The static mock uses fragment hrefs (`#nonprofits`, `#churches`, `#institutions`) — but the production audience pages already exist at `/nonprofits`, `/churches`, `/institutions`. **Use the real routes** (`<Link href="/nonprofits">…`) and drop the in-page `id` attributes on the cards. This is the one spot the mock is loose; the routes are the source of truth.
- **`path-fold.tsx`.** Replaces the current four-step list. The new design has four cards in a horizontal sequence with `<div class="path-step__number">` numerals (1, 2, 3, 4 — not "01", "02"). Match the static mock exactly. Two CTAs at the bottom: "Start with Safety" (primary, `/field-guide#stage-safety`) and "See the Full Path" (ghost, `/field-guide`).
- **`matters-fold.tsx`.** Three `matters-block` cards. The closing line ("Avoiding AI is not neutral. Rushing it is not wisdom.") is a separate `<p class="matters-section__closing">`, not a card.
- **`build-fold.tsx`.** Six items in a grid (AI Safety Policy → Adoption Roadmap). Each has an inline SVG icon. Keep all six. No CTA at the bottom of this section.
- **`difference-fold.tsx`.** Four blocks; no icons, no CTAs.
- **`proof-fold.tsx`.** Three pillars + a `<p class="proof-section__note">` closing line. No CTAs.
- **`final-cta.tsx`.** Replaces the current FinalCta. New copy: "You don't need to master AI. You need a clear path for leading through it." Two CTAs: primary "Start with Safety" (`/field-guide#stage-safety`) and ghost "Talk With Us" (`/contact`).
- **`people-fold.tsx`.** Extracted as-is from current `home-content.tsx`. The only change is Unsplash → placeholder per §7.3 rule 6 (already done in the existing file — preserve that).
- **`diagnosis-fold.tsx`.** Extracted as-is from current `home-content.tsx`. The mock copy at lines 819–845 matches what's already shipped; verify, then move to its own file.

### 7.5 Verification before commit

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm dev
# Open http://localhost:3000/ alongside file://docs/html/mock-home.html.
# Tile both windows. Walk top to bottom; every band, headline, list, and CTA should match.
# Resize: 1440 → 1024 → 768 → 390. Each breakpoint should match the static mock.
```

Commit: `feat(site): migrate mock-home full design to / (F2 — section decomposition)`. Tick the home line in [`docs/build/stitch-screens.md`](../stitch-screens.md) (it may already be ticked from the original P0; if so, leave a note in the work log: "re-migrated 2026-04-29 to expanded design".)

## 8. Phase F3 — A11y, motion, asset polish

Run skills in this order; act on each report before moving to the next:

1. **`design-audit`** on the live `/` route. Expected: zero token violations, zero raw hex, hairlines only where the recipe provides them.
2. **`responsive-audit`** at 1440 / 1024 / 768 / 390. Fix any breakpoint regressions before continuing — the static mock works at all four, so the React port should too.
3. **`web-design-guidelines`** — accessibility pass. Verify:
   - Every `<a class="audience-card">` has an accessible label (the static mock relies on the heading + body copy; ensure the React `<Link>` has the same content order so screen readers read "Nonprofit Leaders / Adopt AI across your team … / See the nonprofit path →").
   - Every inline SVG has `aria-hidden="true"`.
   - Focus rings are visible on Midnight bands (hero, final-cta) — DESIGN.md §3.6 says use `focus-visible:ring-primary` with an offset on the inverse surface.
   - Heading order is monotonic: one `h1` (hero), then `h2` per band, `h3` inside cards.
4. **`typography-polish`** — confirm `<em>` renders Instrument Serif italic, eyebrows use the right tracking, and prose width respects `--prose-max`.
5. **`page-audit`** on `/`. Persist the resulting markdown report at `docs/build/notes/home-page-audit-<YYYY-MM-DD>.md`. Triage findings into (a) fixes for this PR, (b) follow-ups (real headshots, copy edits the user has flagged).

Lighthouse target: a11y ≥ 95, performance ≥ 90 on a clean reload at 1440.

Commit any fixes from this phase as: `fix(site): home page a11y + responsive polish (F3)`. If no fixes were needed, skip the commit and note "F3 clean — no changes" in the work log.

## 9. Phase C1 — Closeout

1. **Update the work log.** [`docs/build/stitch-screens.md`](../stitch-screens.md): tick `mock-home.html → /` if not already ticked, and append:
   ```markdown
   ## 2026-04-29 — Home page expanded migration
   - Re-migrated `mock-home.html` to `/` with the full ten-section design (audience, path-steps, matters, build, difference, proof folds added).
   - Skipped scorecard band (HTML lines 847–1209) — internal self-audit, not production.
   - Audit notes: docs/build/notes/home-page-audit-2026-04-29.md
   - Asset TODOs: six headshots in people-fold (Liz Rios, JR Woodward, L. Rowland Smith, Alan Hirsch, Brad Brisco, Joshua Shepherd).
   ```
2. **Confirm no archival sprawl.** Run `git status` and `git diff --stat`. The diff should touch only:
   - `src/app/recipes.css`
   - `src/components/sections-mock/home/*.tsx`
   - `docs/build/stitch-screens.md`
   - `docs/build/notes/home-page-audit-*.md`
   - **No new files under `src/app/_archive/`.** This is in-place — there is no archival folder.
3. **Final commit.** `docs(build): close out home page expanded migration (C1)`.

## 10. Validation checklist (run before every commit)

- [ ] `pnpm typecheck` — zero errors
- [ ] `pnpm lint` — zero errors
- [ ] `pnpm build` — clean (Turbopack)
- [ ] No raw hex anywhere in `src/components/sections-mock/home/**/*.tsx`
- [ ] No `bg-white`, `bg-black`, `text-gray-*`, or any non-semantic Tailwind utility in the new files
- [ ] No `"use client"` in any home section file (confirm with `grep -r "use client" src/components/sections-mock/home/`)
- [ ] No `https://images.unsplash.com/` reference in shipped TSX (placeholders only)
- [ ] Every named recipe class from the relevant block of `mock-pages.css` appears verbatim in the matching JSX
- [ ] Side-by-side visual match at 1440 / 1024 / 768 / 390
- [ ] Lighthouse a11y ≥ 95 on `/`
- [ ] No edits to Layers 1–5 (`src/lib/db/schema.ts`, `src/lib/schemas/`, `src/lib/services/`, `src/app/api/`, `src/lib/hooks/` — none of these should appear in `git diff --stat`)
- [ ] Movement-leader doctrine respected: audience grid has exactly three cards (nonprofits / churches / institutions), no fourth tile

## 11. Where to stop and ask

- **Mock copy contradicts production.** The static mock is the SSOT for visuals; copy decisions belong to the user. If the new mock copy diverges from a previously-shipped phrase the user cared about, raise it before changing.
- **Recipe drift between `mock-pages.css` and `recipes.css`.** If a selector exists in both with different rules, surface the diff before patching either side.
- **Token doesn't exist.** If a recipe references a CSS variable not declared in `src/app/globals.css`, **stop**. Do not invent the token. Open the question with the user, citing the recipe and the missing variable.
- **A new section needs interactivity.** If the design grows a hover-revealed panel or a tabbed audience switcher beyond what the static mock shows, that is **scope creep** — confirm before adding `"use client"` to anything.
- **Asset is missing.** Every Unsplash URL is a placeholder commitment. Log it; do not invent a substitute.

## 12. Definition of done

The migration is complete when:

1. `/` renders the ten sections of `mock-home.html` (the scorecard band excluded) at parity with the static mock at 1440 / 1024 / 768 / 390.
2. The validation checklist (§10) passes with zero exemptions.
3. The audit notes file exists at `docs/build/notes/home-page-audit-<date>.md` and any non-blocking findings are tracked under "Asset TODOs" or "Follow-ups" in [`docs/build/stitch-screens.md`](../stitch-screens.md).
4. `git log --oneline` shows the four phase commits (F1, F2, optional F3 if changes were needed, C1).
5. No file appears under `src/app/_archive/` from this migration. The current home was replaced in place; git history is the only audit trail.

Until all five hold, the home page migration is **in progress** and the only acceptable work is more migration.
