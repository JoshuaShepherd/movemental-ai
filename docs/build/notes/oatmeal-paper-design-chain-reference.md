# Oatmeal / Paper-Edition design chain — full reference (for import + refine)

**Created:** 2026-06-05
**Source repo:** `~/dev/01-Movemental-Core/movemental-html-template` (static, framework-free HTML/CSS/JS)
**Purpose:** Document the complete design chain + style of the Movemental "Oatmeal" / "Paper Edition" template so it can be imported and refined into `movemental-ai` (Next 16 + Tailwind v4). This is the aesthetic the Agent Room paper surface is meant to inherit.

> **Single source of truth, verbatim:** `movemental-html-template/css/tokens.css` (the only file with raw hex). When in doubt, that file wins over this note.

---

## 0. Where it lives + the skills that already govern it

The design system is already documented and tool-supported. Read in this order:

| Artifact | Role |
|----------|------|
| `css/tokens.css` | **L1 token SSOT** — the only file with raw hex. |
| `css/base.css` · `components.css` · `pages.css` · `dashboard.css` | L2–L5 reset / primitives / page namespaces. |
| `js/main.js` | L6 motion + interaction. |
| `design-chain/design-chain.html` (+ `.css`/`.js`) | **The living charter** — north star, founding principles, live swatches, demos, drift-detection + manual audit checklist. |
| `_reference/style-spec.md` + `style-spec.json` | Machine-readable token/style twin (extracted by `ml-template-from-reference`). |
| `_reference/PAGE-MANIFEST.md` | Which pages are canonical (R0/R1) vs exemplar/draft. |
| `README.md` | The design-chain load order + key-page map. |

**Governing skills** (use via the Skill tool; don't free-hand):
- `oatmeal-editorial-ui` — **the build/restyle expert** for this static template. Repo-local copy at `movemental-html-template/.claude/skills/oatmeal-editorial-ui/SKILL.md`; canonical at `my-skills/claude/design/oatmeal-editorial-ui/`.
- `design-chain` — audit + **enforce** the layered chain; finds hardcoded values, layer violations, broken mode parity, missing primitives. Has a React/Tailwind five-layer variant (tokens → Tailwind → primitives → sections → pages) — relevant for the movemental-ai port.
- `design-chain-audit` — focused drift audit.
- `oatmeal-template-audit` — audits pages in this template specifically.
- `ml-template-from-reference` — generated `style-spec.json` from reference screenshots; the extractor of record.
- `scholarly-authority-ui` — sibling design language (different north star); not the oatmeal chain.

---

## 1. North star + founding principles

> **Warm editorial authority on oatmeal cream.** A premium editorial marketing site — warm cream paper, high-contrast serif display, disciplined Inter UI chrome, hierarchy built from **size and spacing rather than loud color**. Depth comes from **surface tiers, not shadows**; structure comes from **warm hairlines**, not boxes.

First-impression sentence (from `style-spec.md`): *"Warm paper-toned editorial SaaS marketing with high-contrast Playfair Display headlines (often punctuated with a terminal period), generous whitespace, pill-shaped CTAs, manuscript ink on warm white background, and a navy hero band for dramatic sections."*

Load-bearing conventions:
- **Color is rare.** Almost everything is ink-on-cream; navy is the one dramatic move (hero band / hover). Hierarchy = size + whitespace, not hue.
- **Depth = surface tiers, not shadows.** `bg → surface → surface-elevated`. The shadow scale is literally *none*.
- **Structure = warm hairlines** (`1px solid var(--color-border)`), not boxed cards with heavy borders.
- **Pill CTAs**, near-black fill, inverting to cream on the dark hero.
- **Signature tic:** display headlines often end with a **terminal period** — `Pricing.`, `Movement is what we are.`, `Field guide.`

---

## 2. The design chain (load order is load-bearing)

Every marketing page is `<html lang="en" class="oat-page" data-theme="oatmeal">` and loads, in order:

```html
<!-- Google Fonts: Playfair Display + Inter + Homemade Apple + IBM Plex Mono -->
<link rel="stylesheet" href="css/tokens.css" />      <!-- L1 tokens — ONLY file with raw hex -->
<link rel="stylesheet" href="css/base.css" />        <!-- L2 reset, body type, .container, reduced-motion -->
<link rel="stylesheet" href="css/components.css" />  <!-- L3 ml-* primitives -->
<link rel="stylesheet" href="css/pages.css" />       <!-- L4–5 page namespaces mh-*/sf-*/pw-*/mp-*… -->
<script src="js/main.js" defer></script>             <!-- L6 nav, sticky, reveal, mega-menu, wizard -->
```

The charter frames it as **layers 0–6**: `0 Reference → 1 Tokens → 2 Primitives → 3 Components → 4 UI patterns → 5 Layouts & pages → 6 Motion`.

**Chain rule (non-negotiable):** changes flow **downward only**. Never hardcode a color/size — always `var(--…)`. Never retrofit a one-off hex from a page back up into a token. New value needed → add a token first.

---

## 3. Tokens (the full set, from `css/tokens.css`)

### Color — core (warm paper sheet, manuscript ink, navy hero)
| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#FBFAF6` | Warm oatmeal page background (paper sheet) |
| `--color-surface` | `#F8F6F1` | Tinted card/panel surface (tier 2) |
| `--color-surface-elevated` | `#FFFFFF` | White inner card layer (tier 3) |
| `--color-paper-edge` | `#ECE8DE` | Deckle / sheet-edge accent (Paper Edition) |
| `--color-ink` | `#1A1A1A` | Primary text / near-black CTA fill |
| `--color-ink-muted` | `#5C5651` | Secondary text, captions, meta (warm gray) |
| `--color-accent` | `#1A1A1A` | Primary CTA fill (= ink) |
| `--color-accent-hover` | `#12356E` | Button hover (navy) |
| `--color-accent-on-dark` | `#E8ECF5` | Light ink on navy band |
| `--color-hero-dark` | `#0A0E1A` | Navy hero background |
| `--color-hero-dark-soft` | `#141A2E` | Softer navy (gradient pair) |
| `--color-border` | `#E5DFD2` | Warm-tan hairline rules/dividers |
| `--color-border-strong` | `#D6CFBD` | Heavier divider |
| `--color-ink-faint` / `-overlay-18` / `-overlay-25` | rgba ink | Ink alphas for rules/overlays |
| `--color-ink-muted-50/60/70` | rgba(92,86,81,…) | Muted-ink alpha ramp |

**On-hero alpha ramp** (cream `#E8ECF5` on navy, by opacity): `--color-on-hero` .78 · `-bright` .82 · `-strong` .80 · `-dim` .6 · `-muted` .7 · `-mid` .5 · `-subtle` .45 · `-chip` .4 · `-ghost` .35 · `-border` .3 · `-rule` .2 · `-rule-soft` .18 · `-faint` .08. (Use the ramp for any text/divider over the dark hero — never a new rgba.)

### Color — Paper Edition only (`data-theme="paper"`)
`--color-blue` `#1B4B9B` (ballpoint marginalia) · `--color-blue-deep` `#12356E` · `--color-blue-soft` `#3D6BB5` · `--color-blue-bleed` rgba .12 · `--color-highlight` `#FFEB3B` (highlighter swipe) · AI citation dock: `--color-ai-bg` `#0A0E1A`, `--color-ai-bg-2` `#141A2E`, `--color-ai-text` `#E8ECF5`, `--color-ai-text-soft/-muted`, `--color-ai-accent` `#6FA3FF`, `--color-ai-divider`.

### Color — audience accents + status
Audience: `--color-audience-churches` `#1B4B9B` · `-nonprofits` `#9C4A2D` · `-institutions` `#3F4A55`.
Status (Five-Layer Read / lists): `--color-rating-yes` `#5A8F3A` · `-partial` `#BC8C2F` · `-no` `#9C4A2D` · `--color-danger` `#9C4A2D`.

### Typography families
`--font-display` Playfair Display → Source Serif Pro, Georgia, serif · `--font-body` Inter → system-ui · `--font-hand` Homemade Apple → Segoe Script (Paper only) · `--font-mono` IBM Plex Mono (Paper only). Weights: display 400/500; body 400/500/600.

### Type scale (16px base, expressive display range)
`--fs-xs` .75rem (eyebrow) · `-sm` .875 (meta) · `-base` 1 · `-lg` 1.125 (tagline) · `-xl` 1.375 · `-2xl` 1.75 (card head) · `-3xl` 2.25 (section head) · `-4xl` 3 (sub-hero) · `-5xl` 4 (hero) · `-6xl` 5 (stat numerals). Hero headlines in practice: `clamp(2.5rem, 7vw, 5.25rem)`.

### Line height · tracking
LH: `--lh-tight` 1.05 · `-snug` 1.2 · `-normal` 1.5 · `-loose` 1.7. Tracking: `--tr-tight` -0.025em (display) · `-normal` 0 · `-eyebrow` 0.18em (ALL-CAPS eyebrows).

### Spacing (4pt grid) · radius · containers · transitions
Space: `--space-1..32` (0.25rem → 8rem). Radius: `--radius-chip` 8 · `-input` 12 · `-card` 20 · `-image` 20 · `-pill` 999. Containers: `--container-narrow` 42rem · `-default` 64rem · `-wide` 72rem. Transitions: `--t-fast` 150 · `-med` 250 · `-slow` 400ms · `--ease` `cubic-bezier(0.2,0.6,0.2,1)`.

---

## 4. Typography system + tics

- **Defaults (`base.css`):** all `h1–h6` → Playfair, weight 400, `--lh-tight`, `--tr-tight`. Body → Inter 400 / 16px / `--lh-normal`.
- **Display:** Playfair — headlines, wordmarks, section titles, stat numerals, large quotes. Italic for emphasis.
- **Body/UI:** Inter — nav, eyebrows, meta, footer, buttons.
- **Eyebrows:** ALL-CAPS, tracked `--tr-eyebrow` (0.18em), `--color-ink-muted`, `--fs-xs`.
- **Casing:** sentence-case for display + body; ALL-CAPS only for eyebrow chips + sponsor strip.
- **Signature tic:** terminal period on display headlines.

---

## 5. Component vocabulary (L3 `ml-*` primitives, `components.css`)

Nav `ml-nav` (`-inner/-logo/-links/-link-ghost/-actions/-toggle`) · Buttons `ml-button` (`-primary` solid ink pill, `-secondary`, `-ghost`) · Cards `ml-card` (`-media/-icon/-body/-title/-desc/-meta/-byline/-cta`; variants `--article/--featured-article/--library/--persona/--portal`) · Hero `ml-hero` (variants `--bleed-overlay/--editorial-stack/--text-only/--compact`; `-eyebrow/-title/-tagline/-ctas/-media/-inner`) · Section `ml-section` (`--tight/--bleed-into`, `-desc`) · Q&A accordion `ml-qa` (`-item/-question/-answer`) · Quote `ml-quote` (`-text/-cite`) · Filter chips `ml-filter-chips`/`ml-filter-chip` · Endorsements `ml-endorsements`/`-grid` · Footer `ml-footer` (`-inner/-brand/-wordmark/-tagline/-cols/-col/-chain/-bottom`).

**Construction rules:** cards are borderless on tinted surface OR `1px solid var(--color-border)` on cream; radius 16–20px; **no shadows** (depth from surface tier). Dividers = hairline. Buttons = pill (999px), solid ink, invert to cream on dark hero.

---

## 6. Page namespaces (L4–5, `pages.css`) + golden pages

Namespaces (by weight in pages.css): `.mh-*` home (226) · `.pw-*` pathway (167) · `.sf-*` standard bands / Safety (127) · `.mp-*` pricing (118) · `.flr-*` Five-Layer Read (68) · `.fg-*` field guides (43) · `.ss-*` SafeStart (28).

Golden pages to copy from: `movemental-home.html` (`.mh-*` flagship — topographic hero, 4-stage path, SafeStart, credibility, CTA band), `movemental-pricing.html` (`.mp-*`), `pathway-safety.html` (`.sf-*` + interactive Five-Layer Read), `field-guide-safety.html` (`.fg-*`), `about-safestart.html` (`.ss-*`). `dashboard/charter-dashboard.html` is the dashboard prototype.

---

## 7. Hero patterns

- **`bleed-overlay`** (home): full-width navy band, centered serif headline + tagline + CTA pair, framed product UI screenshot bleeding half into the paper section below.
- **`editorial-stack`** (about/pricing): centered headline + dek above a single framed photo.
- **`split`**: headline left, framed photo right.
Hero load = staggered reveal (eyebrow → headline → tagline → CTAs → media).

---

## 8. Motion (L6, `js/main.js`)

Sticky nav, **reveal-on-scroll** (IntersectionObserver; reveals everything immediately under reduced-motion / no-IO), mega-menu (hover-intent desktop + accordion mobile, full focus management + Escape + outside-click), scarcity line, and the **Five-Layer Read wizard** (`initFiveLayerRead`/`buildCumulative`/`summarise`/`renderStep`/`renderResults`). Energy = moderate: cards lift `translateY(-2px)` on hover; Q&A animates `max-height`. **Reduced motion honored.**

---

## 9. Paper Edition vs standard Oatmeal — the Agent Room's surface

This is the distinction that matters for the Agent Room. Standard chrome is **Oatmeal** (`data-theme="oatmeal"`): cream + ink + navy hero, Playfair + Inter only. **Paper Edition** (`data-theme="paper"`, pages `movemental-paper.html`, `-hero`, `-draft-v1`) adds the manuscript layer:

- Manuscript-white sheet + deckle edge (`--color-paper-edge`).
- **Homemade Apple** hand + **IBM Plex Mono** machinery (the two extra fonts).
- **Blue ballpoint marginalia** (`--color-blue*`) + **highlighter swipe** (`--color-highlight`).
- **AI citation dock** (`--color-ai-*`, navy).
- Class vocabulary: `.mast` (masthead), `.leaf` (sheet), `.hl` (highlight), `.ink` (annotation), `.dock` (AI citation dock).

The Agent Room build brief's aesthetic (Playfair + IBM Plex Mono + Homemade Apple + `#FBFAF6` + ballpoint) **is the Paper Edition.** The room's three zones (screen/voice/input) should be authored in this theme.

---

## 10. Import & refine plan into `movemental-ai`

`movemental-ai` is Next 16 + Tailwind v4 (`@theme` in `globals.css`) + shadcn — *not* static CSS. The `design-chain` skill's **five-layer React variant** is the target shape: `L1 tokens (globals.css @theme) → L2 Tailwind utilities → L3 primitives (src/components/ui) → L4 sections → L5 pages`. Port plan:

1. **L1 — tokens.** Translate `css/tokens.css` into `@theme` custom properties in `src/app/globals.css` (keep the exact hex/scale; namespace to avoid colliding with the existing "Digital Curator" tokens). The on-hero alpha ramp and Paper Edition tokens come across verbatim.
2. **L2 — utilities.** Expose tokens as Tailwind v4 utilities (`bg-paper`, `text-ink`, `border-hairline`, `rounded-card/-pill`, `font-display/-hand/-mono`, the `space-*` scale).
3. **L3 — primitives.** Re-author `ml-*` as React components (Button pill, Card with surface tiers, Hero variants, Section, QA accordion, Quote, Eyebrow, FilterChip, Footer). No shadows; hairlines; terminal-period headline convention.
4. **L4–5 — sections/pages + the Agent Room.** The room's paper components (`reality_check_beat`, `readback`, `path`, `handoff_human`) are L4 sections built on the L3 primitives in **Paper Edition**.
5. **Motion.** Reveal-on-scroll + reduced-motion already match movemental-ai's `motion` library; port the calm-pulse / staggered-reveal feel, not the vanilla JS.

### ⚠️ Doctrine conflict to resolve first
`movemental-ai`'s [CLAUDE.md](../../CLAUDE.md) law is **"The Digital Curator"** — Inter only, semantic tokens only, **never raw hex**, `#0053db` primary, light Digital-Curator surfaces. The Oatmeal/Paper system is a **different design language** (Playfair/Plex/Homemade Apple, oatmeal `#FBFAF6`, navy hero, ballpoint). Importing it wholesale would violate the repo's design law. Decide one of:
- **(a) Scoped theme** — bring Oatmeal/Paper in under its own `data-theme`/route scope (e.g. the `/agent` room + marketing surfaces) so it coexists with Digital Curator; OR
- **(b) Re-baseline** — adopt Oatmeal/Paper as the new house system and update CLAUDE.md + DESIGN.md accordingly; OR
- **(c) Reconcile** — merge the two token sets into one semantic layer.

Recommend **(a)** for the Agent Room now (a self-contained paper surface), with (b)/(c) as a separate decision. The Agent Room's `/agent` route is the natural first scoped adoption.

---

## 11. Canonical reading order (when you start the port)

1. `movemental-html-template/css/tokens.css` — token SSOT.
2. `design-chain/design-chain.html` — the charter (principles, swatches, demos, audit checklist).
3. `_reference/style-spec.json` (+ `.md`) — machine-readable twin.
4. `css/components.css` — the `ml-*` vocabulary to re-author.
5. Golden pages: `movemental-home.html`, `movemental-paper.html` (Paper Edition), `pathway-safety.html`.
6. Skill `oatmeal-editorial-ui` (build) + `design-chain` (enforce) — run during/after the port to catch drift.

*This note documents the source design chain as of 2026-06-05. The template repo's `tokens.css` + `design-chain.html` remain canonical; refine against them, not against this summary.*
