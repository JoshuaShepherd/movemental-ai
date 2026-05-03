# Prompt: HTML mocks → React migration (the new public app)

> **How to run this:** Paste this prompt into Claude Code inside the `movemental` repo (or invoke with `@docs/build/prompts/mock-html-to-react-migration.md`). Run the archival prompt — [`docs/build/prompts/full-public-app-archival.md`](./full-public-app-archival.md) — to a clean stop **before** starting any step here. Each phase below ends in a working commit and a verified `pnpm build`. Resume from the last completed phase if a session ends mid-flight.

---

## 1. Mission

Translate the thirteen full-page mockups in [`docs/html/`](../../html) into the production React app. The mockups are the design and copy source of truth. The legacy React app is already archived at `src/app/_archive/legacy-site-2026-04-28/(site)/` per the archival prompt.

Source set (do not invent additional pages):

```text
docs/html/mock-home.html              → /                              (home)
docs/html/mock-organizations.html     → /who-we-serve                   (audience hub)
docs/html/mock-churches.html          → /churches                       (audience)
docs/html/mock-nonprofits.html        → /nonprofits                     (audience)
docs/html/mock-institutions.html      → /institutions                   (audience)
docs/html/mock-voices.html            → /voices                         (trusted voices)
docs/html/mock-movement-leaders.html  → /movement-leaders               (definitional)
docs/html/mock-about.html             → /about                          (about)
docs/html/mock-team.html              → /team                           (founders)
docs/html/mock-field-guide.html       → /field-guide                    (long-form)
docs/html/mock-assess.html            → /assess                         (diagnostic)
docs/html/mock-faq.html               → /faq                            (long-form FAQ)
docs/html/mock-contact.html           → /contact                        (form)
```

The `mock-index.html` is a development index of the thirteen — it does **not** ship.

## 2. The "skill" framing

This is not a Stitch-MCP migration; the source is local HTML, not a Stitch project. We adapt the [`stitch-react`](../../../.claude/skills/stitch-react/SKILL.md) skill workflow to local HTML by skipping its Step 1 (Stitch fetch) and starting from the `docs/html/mock-*.html` files directly. The four remaining stages — token extraction, component decomposition, TypeScript generation, validation — apply unchanged.

Read [`docs/build/prompts/stitch-to-react-migration.md`](./stitch-to-react-migration.md) once before starting; this prompt assumes its rules and only documents the differences specific to the HTML-mocks source.

## 3. Non-negotiables

1. **Design source of truth is [`docs/design/DESIGN.md`](../../design/DESIGN.md)** plus its companions [`docs/design/PATTERNS.md`](../../design/PATTERNS.md), [`docs/design/MOTION.md`](../../design/MOTION.md), and [`docs/design/STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md). Tokens already live in [`src/app/globals.css`](../../../src/app/globals.css) and match [`docs/html/site-templates/site-theme.css`](../../html/site-templates/site-theme.css) numerically. **Do not re-token.** If a value diverges, fix it on the React side to match the static side, not the other way around.
2. **Copy source of truth is [`docs/html/mock-*.html`](../../html).** Every visible word must trace back to the matching mock file. No marketing improv, no Lorem ipsum. If copy seems wrong, raise it with the user before changing it.
3. **The recipe layer is shared.** Both worlds load `site-theme.css` (tokens) **and** `mock-pages.css` (recipes). The React port mirrors that structure — see §6 ("Recipe layer port"). Do **not** rewrite the 296 recipe selectors as Tailwind utilities in JSX; the recipe layer is the contract that keeps the static and React surfaces visually identical.
4. **Class-name parity.** A component that maps to `<section class="band-default people-fold">` in the mock must emit `<section className="band-default people-fold">` in React. Token-aware Tailwind utilities are still allowed for JSX-only structural plumbing (flex layout glue, sr-only, etc.) but every named recipe class moves over verbatim.
5. **Server Components by default.** Push `"use client"` to interactive leaves only — mobile nav drawer, contact form, FAQ accordion, scroll progress bar, theme toggle.
6. **Archive is read-only.** Treat `src/app/_archive/legacy-site-2026-04-28/` as a museum. If you need a snippet, copy (don't move).
7. **No external image hosts.** The mockups use `images.unsplash.com`. Replace each with an asset path under [`public/`](../../../public) and a TODO comment in [`docs/build/stitch-screens.md`](../stitch-screens.md). Do not ship Unsplash.
8. **pnpm only.** No `npm`, no `yarn`. Strict TypeScript. `pnpm typecheck` and `pnpm build` must pass at every commit.
9. **Phase commits.** One commit per page (or per coherent set of foundation files). Message format: `feat(site): migrate mock-<slug> to /<route>`.

## 4. Preflight

```bash
# We're on a clean working tree on a slice branch (post-archival)
git status --short                                # clean
git rev-parse --abbrev-ref HEAD                   # slice/Sxx-mock-html-react-migration
test ! -d "src/app/(site)" && echo "ok"           # archival has run
ls "src/app/_archive/legacy-site-2026-04-28/(site)" >/dev/null && echo "ok"
ls "docs/html/mock-home.html" >/dev/null && echo "ok"
ls "docs/html/mock-pages.css" >/dev/null && echo "ok"
pnpm --version                                    # >= 10
node --version                                    # >= 20
```

Create [`docs/build/stitch-screens.md`](../stitch-screens.md) (or update if it exists) with the thirteen entries:

```markdown
# HTML mock migration — work log

> Source: `docs/html/mock-*.html`. Target: `src/app/(site)/...`. Playbook: this prompt.

- [ ] mock-home.html              → / (home)
- [ ] mock-organizations.html     → /who-we-serve
- [ ] mock-churches.html          → /churches
- [ ] mock-nonprofits.html        → /nonprofits
- [ ] mock-institutions.html      → /institutions
- [ ] mock-voices.html            → /voices
- [ ] mock-movement-leaders.html  → /movement-leaders
- [ ] mock-about.html             → /about
- [ ] mock-team.html              → /team
- [ ] mock-field-guide.html       → /field-guide
- [ ] mock-assess.html            → /assess
- [ ] mock-faq.html               → /faq
- [ ] mock-contact.html           → /contact

## Asset TODOs
(populate as Unsplash placeholders are encountered — one line per real asset still needed)
```

## 5. Phase order (strict)

The thirteen pages share recipes, nav chrome, and section primitives. Build the foundation first, then pages in order of share count (highest first). Each phase ends in a clean commit and a working dev server.

| Phase | Scope                                                                                          | Definition of done                                                              |
| ----- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **F1** | Recipe layer port                                                                              | `src/app/recipes.css` exists and is imported by `globals.css`. App still builds. |
| **F2** | Site chrome — `SiteNav`, `SiteFooter`, mobile drawer, skip link, mockup banner toggle           | Nav and footer render on a temporary `/` placeholder page; mobile drawer toggles. |
| **F3** | Section primitives — `Band`, `Container`, `Eyebrow`, `Display`, `Lede`, `BtnPill`, `SectionHead` | All primitives compile. Storybook-style scratch page renders one of each.       |
| **P0** | `/` from `mock-home.html`                                                                      | Home renders end-to-end at parity with the static mock. Lighthouse a11y ≥ 95.   |
| **P1** | `/who-we-serve`, `/churches`, `/nonprofits`, `/institutions`                                    | Four audience pages render. Cross-links match the audience hub.                 |
| **P2** | `/voices`, `/movement-leaders`                                                                 | Trusted-voices and definitional pages render with shared `voice-card` recipe.    |
| **P3** | `/about`, `/team`                                                                              | Profile cards reused from `voice-card`/`profile-card` patterns.                  |
| **P4** | `/field-guide`, `/assess`, `/faq`, `/contact`                                                  | Long-form, diagnostic, FAQ accordion, and contact form (with API wiring).        |
| **C1** | Closeout                                                                                       | Lighthouse pass on every page; archive untouched; `stitch-screens.md` 100% ✓.   |

## 6. Phase F1 — Recipe layer port

The static mockups load **two** stylesheets in this order:

```html
<link rel="stylesheet" href="./site-templates/site-theme.css" />
<link rel="stylesheet" href="./mock-pages.css" />
```

`site-theme.css` is the L0–L2 token + base layer. Its tokens already live verbatim in [`src/app/globals.css`](../../../src/app/globals.css) (cream paper, ink, Midnight inverse, Inter + Instrument Serif). **Skip it.** What we need to port is the recipe layer: `mock-pages.css` (296 selectors).

Steps:

1. Copy [`docs/html/mock-pages.css`](../../html/mock-pages.css) verbatim into a new file at [`src/app/recipes.css`](../../../src/app/recipes.css). One file, no transformation. Tailwind v4 happily layers raw CSS files via `@import`.
2. Add the import at the very top of [`src/app/globals.css`](../../../src/app/globals.css) **after** `@import "tailwindcss";` and the shadcn imports — so recipe rules can reference Tailwind base if needed but still cascade above app-level utilities:
   ```diff
   @import "tailwindcss";
   @import "@xyflow/react/dist/style.css";
   @import "tw-animate-css";
   @import "shadcn/tailwind.css";
   @plugin "@tailwindcss/typography";
   @config "../../tailwind.config.ts";
  +@import "./recipes.css";
   ```
3. Strip the **mockup-only** rule out of `recipes.css`:
   ```diff
   - /* ---------- Mockup banner (top-of-page indicator) ---------- */
   - .mockup-banner { ... }
   - .mockup-banner strong { ... }
   - .mockup-banner a { ... }
   ```
   The mockup banner is a dev affordance, not part of the production design.
4. Wherever `recipes.css` references a token that uses a different name than `globals.css` declares, prefer the `globals.css` name. Scan for: `--inverse-muted`, `--inverse-border`, `--ink-soft`, `--shadow-ambient` — they all already exist in `globals.css`. No edits needed unless a typo surfaces. If you find one, fix it on the React side **and** open a follow-up to fix the static `mock-pages.css` (note in the work log).
5. Run `pnpm build` and `pnpm dev`. The temporary `src/app/page.tsx` placeholder (a single `<h1>` is fine while F1 is the only thing landed) should still render.

Commit: `feat(site): port mock-pages recipe layer into globals`.

## 7. Phase F2 — Site chrome

The mock pages share a header (`.site-top`) and footer (`.site-footer`) with class names defined in `site-theme.css`. Build the React equivalents that emit those exact classes.

### 7.1 `SiteNav`

Source: [`docs/html/mock-home.html`](../../html/mock-home.html) lines 30–60.

```tsx
// src/components/nav/site-nav.tsx — Server Component (no state at top level)
import Link from "next/link";
import { MobileNavToggle } from "./mobile-nav-toggle";

export function SiteNav() {
  return (
    <header className="site-top">
      <div className="site-top__inner">
        <Link href="/" className="site-brand">
          Movemental
          <small>For organizational leaders</small>
        </Link>
        <MobileNavToggle />
        <nav className="site-nav" id="primary-nav" aria-label="Primary">
          <ul>
            <li><Link href="/field-guide">The Sequence</Link></li>
            <li><Link href="/who-we-serve">Who we serve</Link></li>
            <li><Link href="/voices">Trusted voices</Link></li>
            <li><Link href="/assess">Assess</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact" className="site-nav__cta">Start a conversation</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

`MobileNavToggle` is the only client leaf — it owns the `is-open` state on `.site-nav` and the `aria-expanded` attribute on the button. Re-use [`src/components/nav/mobile-nav.tsx`](../../../src/components/nav/mobile-nav.tsx) if it already implements the right shape; otherwise build a fresh small client component.

### 7.2 `SiteFooter`

Source: [`docs/html/mock-home.html`](../../html/mock-home.html) lines 1242–1289.

The footer is a four-column grid: Movemental (positioning blurb), The Sequence, Who we serve, Trusted voices, with a `.site-footer__meta` line at the bottom. Mirror the link structure exactly — the public IA is **not** the legacy IA and is canonically the footer of `mock-home.html`.

```tsx
// src/components/nav/site-footer.tsx — Server Component
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__heading">Movemental</p>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.55, maxWidth: "30ch", margin: 0 }}>
            A wiser way for churches, nonprofits, and institutions to navigate AI —
            mission, formation, and integrity intact.
          </p>
        </div>
        {/* …Sequence, Who we serve, Trusted voices columns mirroring the mockup… */}
      </div>
      <p className="site-footer__meta">© 2026 Movemental. All rights reserved.</p>
    </footer>
  );
}
```

### 7.3 Re-mount in the root layout

Restore [`src/app/layout.tsx`](../../../src/app/layout.tsx) to mount the new `SiteNav` / `<main>` / `SiteFooter` chrome (the archival prompt removed it). Keep the skip link.

```tsx
<Providers>
  <a href="#main" className="skip-link">Skip to content</a>
  <SiteNav />
  <main id="main">{children}</main>
  <SiteFooter />
</Providers>
```

The `pt-[var(--site-chrome-total)]` padding the legacy used is **not needed** here because the static mockups use `position: sticky` on `.site-top` (see `site-theme.css` line 156). Leave the main content un-padded; the recipe handles spacing.

### 7.4 Temporary placeholder home

Create [`src/app/(site)/page.tsx`](../../../src/app/(site)/page.tsx) with a one-line placeholder so the root URL resolves while you migrate. We use the `(site)` route group for parity with the legacy folder shape, even though the layout is now at the root level — the parentheses keep the URL at `/`.

```tsx
// Temporary — replaced in P0
export default function HomePlaceholder() {
  return (
    <section className="band-default">
      <div className="container">
        <p className="eyebrow">Migration in progress</p>
        <h1 className="display">New site under construction.</h1>
      </div>
    </section>
  );
}
```

Commit: `feat(site): rebuild SiteNav and SiteFooter chrome from mocks`.

## 8. Phase F3 — Section primitives

Build only what the thirteen pages actually share. Audit a few `mock-*.html` first for top-level section shapes — every page repeats the trio `<section class="band-{midnight|section|default}">` → `<div class="container">` → `<header class="section-head">` (eyebrow + display + lede).

Files to author under [`src/components/primitives/`](../../../src/components/primitives/):

- `band.tsx` — `<section className={cn("band-" + variant)}>` wrapper. Variants: `midnight`, `section`, `default`. Always wraps children in a `.container` div.
- `section-head.tsx` — `<header className="section-head">` with `eyebrow`, `display`, `lede` props (all React nodes so `<em>` from copy carries through).
- `eyebrow.tsx`, `display.tsx`, `lede.tsx` — thin `<p>`/`<h1|h2>` wrappers that emit the right class. Default `display` is an `<h2>`; pages pass `as="h1"` for hero usage.
- `btn-pill.tsx` — `<a>` or `<button>` with `btn-pill btn-pill--primary | btn-pill--ghost`. Polymorphic: when `href` is set, renders `<Link>`; else renders `<button>`.

The repo already has `Container`, `Eyebrow`, `Display`, etc. under [`src/components/primitives/`](../../../src/components/primitives/) but those were tuned for the *legacy* surface. Either:

- **(preferred)** Replace their internals so they emit `band-*` / `section-head` class names and continue exporting the same names — every existing import in `src/components/sections/` keeps compiling, and we can prune unused pieces in C1.
- **(fallback)** Author new primitives under `src/components/primitives/site/` and update only the new pages to import from there. Use this fallback only if the legacy primitives are deeply coupled to legacy classes you cannot retire cleanly.

Commit: `feat(primitives): align section primitives to mock recipe class names`.

## 9. Phase P0 — Home page (the worked example)

`mock-home.html` is the most complex of the thirteen (1289 lines). It is also the template every other page mimics, so doing it carefully pays back across the migration.

### 9.1 Section map

The home page contains **fourteen** named sections. Translate each as one component file under [`src/components/sections/home/`](../../../src/components/sections/home/):

```text
mock-home.html lines        component file                         purpose
30–60                       (use src/components/nav/site-nav.tsx)  site top
63–89                       hero-fold.tsx                          hero (band-midnight, hero hero--fold)
91–266                      people-fold.tsx                        trusted voices + founders, single scan
268–315                     problem-fold.tsx                       two responses / one mistake
317–371                     value-fold.tsx                         "adopt without losing yourselves"
373–451                     sequence-fold.tsx                      stage-rule four-stops + stage-grid
453–522                     outcomes-fold.tsx                      "what you walk away with" outcomes-grid
524–581                     audiences-fold.tsx                     three audience cards (with movement-leader note)
582–650                     differentiation-fold.tsx               versus / not versus columns
652–706                     evidence-fold.tsx                      evidence-note pointers
708–761                     engagement-fold.tsx                    three engagement paths
763–847                     home-faq.tsx                           5-question FAQ accordion
849–875                     final-cta.tsx                          band-midnight CTA
877–1240                    (skip — the "internal scorecard" debug card is not for production)
1242–1289                   (use src/components/nav/site-footer.tsx) site footer
```

### 9.2 Component decomposition rules

For each section file:

- **Server component by default.** Only the FAQ accordion needs `"use client"` (use shadcn `accordion` or a minimal `<details>` per the mock — the static mock uses a simple list, so the accordion is presentational only; lean toward Server Component + native `<details>` for a11y parity with the static mock).
- **Copy lives inline** in the component for now (mockups are the source of truth). Don't pre-extract a content map; that's a follow-up if the same copy starts repeating across audience pages.
- **Image handling.** Replace every `https://images.unsplash.com/...` `<img>` with `next/image`. Until real headshots land, drop the `<Image>` element behind a feature flag or simple conditional that renders a `bg-elevated` placeholder square — and add a one-line entry under "Asset TODOs" in [`docs/build/stitch-screens.md`](../stitch-screens.md): `Liz Rios headshot · trust voices fold · TBD`.
- **`<em>` italic.** The mocks use `<em>` for Instrument Serif emphasis. Keep `<em>` in JSX — `recipes.css` and `globals.css` `@layer base` already render it correctly.
- **Button polymorphism.** All `btn-pill` instances become `<BtnPill href="…" variant="primary|ghost">…</BtnPill>` from F3.

### 9.3 Page composition

```tsx
// src/app/(site)/page.tsx
import { HeroFold } from "@/components/sections/home/hero-fold";
import { PeopleFold } from "@/components/sections/home/people-fold";
import { ProblemFold } from "@/components/sections/home/problem-fold";
// …14 sections total, 13 imports + the 2 chrome files which live in layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A wiser way to navigate AI",
  description:
    "Movemental walks church and nonprofit leaders through the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions, in order.",
};

export default function HomePage() {
  return (
    <>
      <HeroFold />
      <PeopleFold />
      <ProblemFold />
      <ValueFold />
      <SequenceFold />
      <OutcomesFold />
      <AudiencesFold />
      <DifferentiationFold />
      <EvidenceFold />
      <EngagementFold />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
```

### 9.4 Visual verification

```bash
pnpm dev
# 1. Open http://localhost:3000/ alongside file://docs/html/mock-home.html in the same browser.
# 2. Window-tile them. Tonal layering, hero contrast, type rhythm should match.
# 3. Resize: 1440 → 1024 → 768 → 390 px. Each breakpoint should match the static mock.
# 4. Run Lighthouse → expect a11y ≥ 95, performance ≥ 90 on a clean reload.
```

Commit: `feat(site): migrate mock-home to / (P0)`. Tick `mock-home.html` in the work log.

## 10. Phases P1–P4 — Per-page playbook (repeat for each page)

For every remaining mock file, run this nine-step loop. The work compresses sharply once F1–F3 + P0 are landed: each page is largely composition.

1. **Map sections.** Run `grep -n "<!-- ====" docs/html/mock-<slug>.html` to enumerate the section markers. Note the line range of each.
2. **Identify reuse.** For each section, decide: (a) reuse an existing `src/components/sections/...` file, (b) extend an existing one with new props, or (c) author a new file. Lean heavily on (a)/(b). The `mock-churches`, `mock-nonprofits`, `mock-institutions` triplet share a `problem-grid` / `stage-grid` / `outcomes-grid` recipe with audience-tuned copy — one component family with `audience` prop.
3. **Author the page file.** Place at `src/app/(site)/<route>/page.tsx`. Compose the section components in document order.
4. **Author / extend the section components.** Match the JSX tree depth-for-depth with the mock. Class name parity is mandatory (§3.4). For audience pages: build the section once, pass an `audience` prop, switch copy via a typed map `{ churches: {...}, nonprofits: {...}, institutions: {...} }` co-located in the section file.
5. **Wire the metadata.** Each page exports `metadata`. Pull `title` and `description` from the `<title>` and `<meta name="description">` of the corresponding mock file.
6. **Replace external images.** Same rule as P0 (§9.2). Log the asset gap in the work log.
7. **Verify visually.** Side-by-side with the static mock at four breakpoints.
8. **Verify a11y.** Tab the page top-to-bottom — every CTA reachable, focus states visible (`recipes.css` defines them via the existing token set), headings in order, all images have alt text, all forms have labels.
9. **Commit.** `feat(site): migrate mock-<slug> to /<route>`. Tick the work log.

### Phase P4 specifics

Three of the four pages in P4 need real interactivity:

- **`/contact` (`mock-contact.html`).** Wire the form to `POST /api/contact` (already exists, see [`src/app/api/contact/`](../../../src/app/api/contact/)). Use React Hook Form + Zod resolver, keep the form a small client island, render the editorial side panel as a Server Component sibling. Honor the existing API contract — do not change it from the form side.
- **`/assess` (`mock-assess.html`).** The mock shows a styled question preview only (no live diagnostic). Render it as a Server Component for now. The live diagnostic is a follow-up beyond this prompt.
- **`/faq` (`mock-faq.html`).** Use the same `<details>` accordion pattern as `home-faq` from P0. No client JS needed.
- **`/field-guide` (`mock-field-guide.html`).** Long-form. The TOC pills the mock shows scroll to anchor IDs — use plain `<a href="#stage-2">` links + `scroll-behavior: smooth` (already in `globals.css`). No client component.

## 11. Validation checklist (run before every commit)

- [ ] `pnpm typecheck` — zero errors
- [ ] `pnpm lint` — zero errors
- [ ] `pnpm build` — clean
- [ ] No raw hex in any new `src/**/*.{ts,tsx,css}` outside `src/app/globals.css` and `src/app/recipes.css`
- [ ] Every `https://images.unsplash.com/` reference replaced or queued in the work log
- [ ] No `"use client"` in `src/app/layout.tsx`, the route's `page.tsx`, or any layout
- [ ] Every named recipe class from `mock-pages.css` that appears in the mock appears verbatim in the matching JSX
- [ ] Side-by-side visual match at 1440 / 1024 / 768 / 390 — screenshots attached to the PR
- [ ] Lighthouse a11y ≥ 95 on the migrated page

## 12. Asking for help

The mocks are the source of truth, but they have known gaps. Where to stop and ask:

- **Asset is missing** (every Unsplash placeholder). Log it; do not invent a substitute.
- **Mock contradicts `docs/design/DESIGN.md`** on a token (e.g., a hex appears in inline style that isn't on the ramp). Stop. Post the hex; do not guess.
- **A section uses a recipe that's defined in `recipes.css` but never used elsewhere.** Migrate it as-is; flag it in the PR for a follow-up to decide whether to elevate it into a primitive or scope it to one component file.
- **Two mocks contradict each other** on the same shared recipe (e.g., `voice-card` looks different in `mock-voices` vs `mock-team`). The latest `mtime` wins; log the decision in the commit message.
- **Production copy diverges** from the mock. The mock's copy is the source of truth in this prompt — but copy decisions belong to the user. Ask before changing.

## 13. Definition of done

The migration is complete when:

1. Every page in §1 is checked off in [`docs/build/stitch-screens.md`](../stitch-screens.md).
2. `pnpm build` is clean and `pnpm start` serves every route end-to-end with the right metadata.
3. Each page passes a side-by-side visual check at 1440 / 1024 / 768 / 390 against the matching `docs/html/mock-*.html`.
4. Lighthouse a11y ≥ 95 on every page; performance ≥ 90 on the home and at least one audience page.
5. The validation checklist (§11) passes with zero exemptions.
6. The "Asset TODOs" section of the work log lists every real-asset replacement still pending. None of them blocks ship; they are tracked for a follow-on asset pass.
7. A final commit `docs(build): close out mock-html → react migration` updates the work log with completion date and known follow-ups (e.g., live `/assess` diagnostic, real headshots, copy edits the user has flagged).

Until all seven hold, the repo is in "migration in progress" and the only acceptable work is more migration.
