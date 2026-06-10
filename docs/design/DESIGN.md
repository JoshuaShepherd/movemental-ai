# Concept Modern — Design Charter & Layer-by-Layer Design Chain

> **Archived in movemental-ai (2026-06).** This repo is agent-only; live UI uses
> [INK_BAND_DESIGN_CHAIN.md](./INK_BAND_DESIGN_CHAIN.md). Kept as reference for the forthcoming
> marketing merge — do not implement Concept Modern tokens in `src/` until `(site)` routes return.

> The canonical design specification for the Movemental **marketing site** (`(site)` routes).
> The companion to the agent-room [Ink Band chain](./INK_BAND_DESIGN_CHAIN.md); both share a
> warm-paper/ink family but use different type, accent, and border vocabularies — keep them apart.

**Token SSOT:** [src/app/globals.css](../../src/app/globals.css) (`@theme inline` + `:root`/`.dark` hex)
and [tailwind.config.ts](../../tailwind.config.ts) (fonts, fluid type scale, radii, motion).
*When `tailwind.config.ts` and this doc disagree, **this doc wins**.*
**Primitives:** [src/components/primitives/](../../src/components/primitives/) · **Agent UI skill:** `concept-modern-ui`.
**Scope:** marketing surfaces only. Authenticated product shells (`/safestart`, `/sandboxlive`,
`/program`) and the agent room (`/agent`, `.oat-surface`) use **scoped** token sets — never put those
on a marketing page.

---

## 1. Design charter

### North star

**Concept Modern — warm editorial.** *"Typography is the interface."* The page is a near-**duotone**:
warm **cream paper** + near-**black ink**. Hierarchy comes from the type scale, tracking, italic-serif
emphasis, hairlines, and **tonal "ghost-lift" stacking** — never from drop shadows or decorative
borders. **Midnight** bands (`#141110`) mark authority moments.

### Pillars

1. **Typography is the interface.** Meaning is carried by a disciplined fluid type scale and
   Newsreader italic emphasis, not by color, weight, or ornament. Headings are weight **500**, never
   700/800 heft.
2. **Warm duotone.** Cream paper, ink text, one ink "primary." No saturated brand color — **primary
   is ink, not blue.** (The legacy `#0053db` "Digital Curator" blue is drift; do not use it.)
3. **Depth by tonal stacking, not shadows.** A `bg-card` block on a `bg-section` band on a
   `bg-background` page is the "ghost-lift." Elevation is minimal by doctrine — only `shadow-ambient`
   for the rare dialog.
4. **Hairlines, not borders.** Separate regions with bands + 0.5px rules, never `<hr>` or 1px
   decorative borders. Borders exist only for form-field accessibility.
5. **Ink-pill CTAs.** Every button is a `rounded-pill`; the default is the ink-filled pill (cream on
   ink), inverted to cream-on-midnight inside Midnight bands.
6. **Calm Confidence motion.** Entrances are quiet and capped; reduced-motion is a full bail-out. No
   parallax, particles, carousels, 3D, or page transitions.
7. **Breathing layout.** If something feels crowded, add padding — never shrink type to fit.

### Quality bar (a surface is "Concept Modern" when…)

- It composes the **primitives** (`Section → Container → Display/Eyebrow/Prose/SurfaceCard/Button`),
  not raw divs.
- It uses **semantic tokens only** — no raw hex, `bg-white`, `bg-black`, `bg-blue-*`, `text-gray-*`.
- Headings are weight 500 with `<em>` italic-serif emphasis; body is Inter; serif is never used for
  multi-paragraph body.
- Regions are separated by bands/hairlines + ghost-lift — no new drop shadows, no decorative borders.
- CTAs are ink pills; Midnight bands are reserved for authority moments.
- Entrances use `<Reveal>` within the amplitude caps and honor `prefers-reduced-motion`.

### What it is **not**

- Not the agent room ([Ink Band](./INK_BAND_DESIGN_CHAIN.md)) — no Playfair/Caveat/IBM Plex Mono, no
  ink-blue pen accent, no visible hairline-card borders as a vocabulary.
- Not "Digital Curator" (the stale blue `#0053db` HSL theme in the **decoy** root `/app`,
  `/components`, root `globals.css` — ignore those; only `src/` is live).
- Not shadow-driven Material or card-grid SaaS. Not Instrument Serif (production serif is Newsreader).

---

## 2. The design chain

Design decisions flow **downstream**, like the [type-safety chain](../architecture/TYPE_SAFETY_CHAIN.md):
each layer composes the one below and never reaches around it. Need a new look? Change a token or
compose existing primitives — never hard-code a hex or font on a page.

```text
Layer 1  Tokens        src/app/globals.css @theme inline + :root/.dark — color, type, scale, radius, motion, layout
   │  exposed as Tailwind utilities (bg-*, text-*, border-*); never bypassed with a raw hex
   ▼
Layer 2  Primitives    Section · Container · Display · Eyebrow · Prose · SurfaceCard · ArrowLink · Reveal · Button
   │  the editorial atoms — single-purpose, token-only
   ▼
Layer 3  Components     FeatureSplit · StatStrip · PullQuote · TestimonialRail · Timeline · LogoStrip · EditorialComparisonTable · HeroWithPhotoBackdrop · InPageToc · MediaVideo
   │  multi-atom editorial figures
   ▼
Layer 4  Built layers   Section bands (background / section / elevated / Midnight) · nav + footer chrome · Button system
   │  the regions and chrome a page is assembled from
   ▼
Layer 5  Pages/layouts  (site) marketing routes — composed Section→Container→figures, Midnight for authority
```

---

## 3. Layer 1 — Tokens

Every value resolves to a token in `globals.css`. **No raw hex or font literal** belongs in TSX —
that is the rule a contributor must keep. Light is the default; `.dark` (set by `next-themes`) inverts
the ramp; regional **Midnight** bands pin to deep ink even in light via `data-variant="midnight"`.

### Surface & ink ramp

| Role | Utility | Light | Dark |
|------|---------|-------|------|
| Paper base | `bg-background` | `#faf6ee` | `#141110` |
| Alt band / muted | `bg-section` · `bg-muted` · `bg-elevated` | `#f2ece0` | `#1b1714` |
| Card | `bg-card` | `#ffffff` | `#211c18` |
| Deepest paper / accent | `bg-surface-highest` · `bg-accent` | `#efe7d6` | `#2a241f` |
| Primary ink | `text-foreground` · `bg-primary` | `#19150f` | `#f4efe5` |
| Primary dim (hover) | `bg-primary-dim` | `#000000` | `#ffffff` |
| On primary | `text-primary-foreground` | `#faf6ee` | `#141110` |
| Secondary ink | `text-muted-foreground` | `#6b6660` | — |
| Meta ink (tertiary) | `text-ink-soft` | `#7e786f` | `rgba(244,239,229,.54)` |
| Hairline | `border-border` | `#e6ddcb` | `rgba(244,239,229,.14)` |
| Soft card border | `border-border-soft` | `#efe7d6` | `rgba(244,239,229,.08)` |
| 0.5px rule | `border-rule` | `rgba(25,21,15,.14)` | `rgba(244,239,229,.14)` |
| Field border (AA) | `border-input` | `#8b8479` | `rgba(244,239,229,.42)` |
| Focus ring | `ring` | `rgba(25,21,15,.5)` | `rgba(244,239,229,.5)` |
| **Midnight surface** | `bg-inverse-surface` | `#141110` | `#141110` |
| **On Midnight** | `text-inverse-foreground` | `#f4efe5` | `#f4efe5` |
| Midnight muted / border | `text-inverse-muted` · `border-inverse-border` | `rgba(244,239,229,.68)` · `.14` | same |

### Reserved / scoped tokens (do **not** use on general marketing UI)

- **Status signals:** `status-go` `#6b7e3f` · `status-caution` `#a07a25` · `status-stop` `#9c2d20`
  (WCAG-tuned to live on cream). For Sandbox go/caution/stop lights.
- **Pathway accent:** `pathway-accent` `#b8893a` — italic numerals / active stage rules only.
- **Citation "Ledger" amber:** `cite-hl*` — inline citation chips/popovers/references rail **only**,
  never a general accent.
- **Product shells:** `safestart-*`, `sandbox-*`, `movemental-midnight` `#141110` — authenticated
  `/safestart`, `/sandboxlive`, `/program` shells **only**.

### Typography tokens

- **Body/UI:** Inter → `font-sans` (400/500). Base body **17px** (`1.0625rem`), `line-height 1.55`,
  `font-feature-settings: "kern","liga","cv11"`.
- **Display + emphasis:** Newsreader italic → `font-serif` / `font-serif-display` / `font-headline`.
- **Tracking:** `tracking-display` `-0.028em` · `tracking-tight` `-0.022em` · `tracking-eyebrow`
  `0.09em` (uppercase label idiom).
- **Italic emphasis convention:** wrap stressed words in `<em>` **inside** a heading — the base layer
  auto-swaps to italic serif (weight 400, optical-size bump). Never hand-apply `font-serif italic` to
  a whole heading; never use serif for multi-paragraph body.

### Fluid type scale (`tailwind.config.ts`, all `clamp`)

| Token | Size |
|-------|------|
| `text-display` | `clamp(2.6rem, 6.4vw, 5.5rem)` |
| `text-h1` | `clamp(2.3rem, 5.2vw, 4.2rem)` |
| `text-h2` | `clamp(2rem, 4.4vw, 3.4rem)` |
| `text-h3` | `clamp(1.5rem, 2.4vw, 1.875rem)` |
| `text-h4` · `text-body` · `text-body-lg` | h4 step · body `1.0625rem/1.55` · body-lg `1.1rem/1.7` |
| `text-small` · `text-label` · `text-button` · `text-micro` | small · uppercase eyebrow (`tracking-eyebrow`) · button · micro |

### Radius · elevation · layout

- **Radius:** base `--radius` `0.625rem`; `rounded-card` **14px** (`0.875rem`) for cards/dialogs/hero
  images; **`rounded-pill` (9999px) for ALL buttons/CTAs.**
- **Elevation:** only `shadow-ambient` `0 24px 80px rgba(25,21,15,.12)` (dialogs / rare lift). No
  arbitrary `shadow-md/lg`. Replace shadows with hairlines + ghost-lift.
- **Layout:** `--container-max` `1200px` · `--container-narrow` `740px` · `--prose-max` `640px`.
- **Section rhythm:** `--section-y-sm` `clamp(3rem,6vw,4.5rem)` (default) · `--section-y-lg`
  `clamp(5rem,10vw,8rem)` (heroes / landmarks).

---

## 4. Layer 2 — Primitives

The editorial atoms ([src/components/primitives/](../../src/components/primitives/)). Compose these —
never raw `<div>`s.

| Primitive | Role |
|-----------|------|
| `Section` | The band. Variants `default` / `section` / `elevated` / `midnight`; owns vertical rhythm (`--section-y-*`); Midnight sets `data-variant="midnight"`. |
| `Container` | Width constraint — `max-w-(--container-max\|--container-narrow\|--prose-max)`. |
| `Display` | The big editorial headline — `font-sans font-medium tracking-display text-balance`, `<em>`→italic serif. |
| `Eyebrow` | Uppercase mono-tracked kicker — `text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground`, optional ink dot. |
| `Prose` | Long-form body column at `--prose-max`, Inter, `@tailwindcss/typography`-tuned. |
| `SurfaceCard` | The ghost-lift card — tones `on-background` / `on-section` (`shadow-ambient`) / `midnight`; base `flex flex-col gap-3 rounded-xl p-6 sm:p-8`. |
| `ArrowLink` | Inline "read more" with the hover arrow nudge (`hover:[&_svg.arrow]:translate-x-[3px]`). |
| `Reveal` | Entrance wrapper — IntersectionObserver, fires once, reduced-motion bail-out, optional 80ms stagger. |
| `Button` (`ui/button.tsx`) | The pill system — see §6. |

---

## 5. Layer 3 — Components

Multi-atom editorial figures (also under `primitives/`, plus shadcn `ui/`). The reusable "set pieces"
a marketing page is built from:

- **`FeatureSplit`** — two-column text/media split (the workhorse explainer row).
- **`StatStrip` / `StatItem`** — a row of editorial stats (big numeral + label).
- **`PullQuote`** — oversized editorial quote with a `pathway-accent` rail.
- **`TestimonialRail` / `TestimonialSlide`** — endorsement rail.
- **`Timeline` / `TimelineItem`** — ordered process / history.
- **`LogoStrip`** — trust / proof logo row.
- **`EditorialComparisonTable`** — typed comparison matrix (columns/rows).
- **`HeroWithPhotoBackdrop`** — `LightHeroPhotoBackdrop` / `MidnightHeroPhotoBackdrop` photo heroes
  (duotone-treated imagery).
- **`InPageToc`** — sticky in-page table of contents for long docs.
- **`MediaVideo`** — framed, `rounded-card` video embed.
- **shadcn `ui/`** (`radix-nova` over Radix) — added on-demand; do not hand-edit generated files.

---

## 6. Layer 4 — Built layers (bands + chrome)

The regions and chrome a page is assembled from.

### Section bands (the tonal vocabulary)

`Section` resolves to a band surface; stacking them is how the page gets depth:

| Variant | Surface | Use |
|---------|---------|-----|
| `default` | `bg-background` | The paper baseline |
| `section` | `bg-section` | Alt band to separate a region (ghost-lift against default) |
| `elevated` | `bg-elevated` | A lifted region |
| **`midnight`** | `bg-inverse-surface` + `text-inverse-foreground` | **Authority moments only** — hero/landmark bands, deep-ink |

### The Button system (`ui/button.tsx`, CVA)

- `default` / `primary` → `rounded-pill bg-primary text-primary-foreground hover:-translate-y-px hover:bg-primary-dim` (the ink pill).
- `ghost` → `rounded-pill bg-transparent text-foreground border-border hover:border-foreground`.
- `primary-inverse` / `ghost-inverse` → flipped for inside `[data-variant="midnight"]`.
- `outline` / `secondary` / `link` / `destructive` retained for app surfaces. Arrow icons nudge on
  hover; focus ring always present.

### Page chrome

Glass nav + editorial footer wrap marketing routes. *(The marketing chrome and `(site)` pages are
mid-migration — see §7.)*

---

## 7. Layer 5 — Pages / layouts

Pages are **composition**, not bespoke markup: `Section` (pick a band) → `Container` (pick a width) →
`Display`/`Eyebrow`/`Prose` + the Layer-3 figures, each entrance wrapped in `<Reveal>`. Reach for a
**Midnight** band only at an authority moment (hero, a single landmark section, a closing CTA).

**Page rhythm:** lead with an eyebrow + `Display`, alternate `default`/`section` bands for cadence,
let `--section-y-*` carry the breathing room, close on an ink-pill CTA (often in a Midnight band).

> **Migration note (2026-06):** the marketing `(site)` route group and its `nav/` + `sections/`
> components are mid-migration and currently archived under
> `_archive/pre-marketing-migration-2026-06/`. The live route groups are `(paper)`, `(studio)`, and
> `agent`. The **design system in this doc is canonical regardless** — it is defined by the tokens in
> `globals.css` and the primitives, which remain live. New marketing pages compose the same chain.

---

## 8. Motion language — "Calm Confidence"

Mostly CSS, not JS. The rules:

- **The primitive:** wrap entrances in `<Reveal>` (IntersectionObserver, fires once, optional 80ms
  stagger).
- **Amplitude caps:** reveal `translateY ≤ 20px`; card lift `≤ -2px`; hover scale `≤ 1.02`. Buttons
  lift `-translate-y-px`.
- **Non-goals:** no parallax, particles, carousels, page-transition, or 3D.
- **Reduced motion:** `<Reveal>` and the token layer fully bail out under
  `prefers-reduced-motion: reduce`. **A contributor must keep this.**
- `motion` v12 (`motion/react`) is allowed for bespoke cases; `gsap` only for `fragmentation-story`.

---

## 9. Working in the system (checklist)

1. Confirm you're in **`src/`** (the root `/app`, `/components`, root `globals.css` are stale decoys).
2. Open `globals.css` + this doc for tokens/rules.
3. Compose `Section → Container → Display/Eyebrow/Prose/SurfaceCard/Button`.
4. Duotone via semantic tokens; ink-pill CTAs; weight-500 headings; `<em>` italic emphasis.
5. Separate regions with bands/hairlines + ghost-lift — **not** shadows or decorative borders.
6. Wrap entrances in `<Reveal>`; respect the amplitude caps + reduced motion.
7. Midnight bands for authority moments only.
8. **Verify:** no raw hex, no `bg-blue`/`bg-black`/`text-gray`, no shadow drift, no decoy-tree imports,
   no scoped product tokens (`safestart-*`/`sandbox-*`/`pathway-accent`/`cite-*`) on marketing pages.

---

## 10. Provenance & change control

- **Token SSOT** is `src/app/globals.css`; `tailwind.config.ts` mirrors it (and defers to this doc on
  conflict). Change a token there, then update this doc, then components — downstream, never upward.
- This doc is **Concept Modern** for the marketing site. The agent room is documented separately in
  [INK_BAND_DESIGN_CHAIN.md](./INK_BAND_DESIGN_CHAIN.md); the two systems must not bleed into each
  other. Index: [README.md](./README.md).
- The data-side companion is the [type-safety chain](../architecture/TYPE_SAFETY_CHAIN.md).
