# movemental-html-template — sibling static reference

> **Scope:** This document describes the **sibling repo** at `~/dev/01-Movemental-Core/movemental-html-template` (static HTML/CSS/JS, no build step). It is the operational bridge between that repo’s source files and **this** repo’s production design system.
>
> **Last synced from html-template source:** 2026-06-05 (`_reference/PAGE-MANIFEST.md`, `css/tokens.css`, `js/main.js`, `README.md`).

**Production design law for `movemental-ai`:** **[Concept Modern](./DESIGN.md)** — warm cream paper, near-black ink, Inter + **Newsreader** italic emphasis, ink pill CTAs, Midnight bands. Tokens live in `src/app/globals.css`. Agents restyle with [`.claude/skills/concept-modern-ui/SKILL.md`](../../.claude/skills/concept-modern-ui/SKILL.md).

**Do not import** the Oatmeal / Paper Edition palette, `oat-*` utilities, Playfair Display, Homemade Apple, or IBM Plex Mono as the house system here. Those belong to the html-template family only.

---

## 1. What each repo is for

| Repo | Stack | Design system | Role |
| ---- | ----- | ------------- | ---- |
| **`movemental-ai`** (this repo) | Next.js 16, Tailwind v4, React | **Concept Modern** | Production org site, dashboard shells, agent schema, Stitch migration target |
| **`movemental-html-template`** | Static HTML/CSS/JS | **Oatmeal** (+ **Paper Edition** fork) | Full-fidelity marketing HTML mirror, page inventory, copy/IA reference, design-chain exemplar for static work |

The html-template README describes itself as warm “oatmeal” editorial (Playfair + Inter + navy hero). That visual language was **explored** for Agent Room UI and briefly namespaced in this repo — it has been **removed**. Future room UI and all marketing surfaces use Concept Modern only.

**Deploy (html-template only):** Vercel static site; `vercel.json` rewrites `/` → `movemental-home.html`. Run `vercel --prod` from the html-template root.

---

## 2. Design chain — same shape, different tokens

Both repos use a **bottom-up chain** (changes flow downward only). The **layer names** align; **token values and typefaces differ**.

| Layer | movemental-html-template | movemental-ai (Concept Modern) |
| ----- | ------------------------ | ------------------------------ |
| **L0 — Reference** | `_reference/style-spec.md`, `_reference/style-spec.json`, Tailwind UI Oatmeal screencaps (not in repo) | [DESIGN.md](./DESIGN.md) §1, Stitch project `2208910962065880866` |
| **L1 — Tokens** | `css/tokens.css` (`--color-bg`, `--font-display`, …) | `src/app/globals.css` `:root` + `@theme inline` (`--background`, `--foreground`, …) |
| **L2 — Base** | `css/base.css` | `@layer base` in `globals.css` |
| **L3 — Components** | `css/components.css` (`ml-*`) | `src/components/ui/*` (shadcn) + patterns in `globals.css` |
| **L4–5 — Pages** | `css/pages.css` (`mh-*`, `pw-*`, `sf-*`, `fg-*`, …) | `src/components/sections/*`, `src/app/(site)/**/page.tsx` |
| **L6 — Motion** | `js/main.js` | `src/components/primitives/reveal.tsx`, GSAP/Motion where used; [MOTION.md](./MOTION.md) §8 |
| **Charter UI** | `design-chain/design-chain.html` (+ `.css`, `.js`) | [DESIGN.md](./DESIGN.md), `/admin/design-tokens` (staff) |

**Chain rule (both repos):** Never retrofit a one-off hex from a page back into tokens. Fix at L1, then regenerate downstream.

### 2.1 Load order (html-template — load-bearing)

Every oatmeal marketing page declares `class="oat-page" data-theme="oatmeal"` and loads styles in this order:

1. `css/tokens.css` — L1; **no hex outside this file**
2. `css/base.css` — reset, containers, type defaults, reduced-motion guard
3. `css/components.css` — shared `ml-*` (nav, buttons, cards, Q&A, footer)
4. `css/pages.css` — page namespaces (`mh-*`, `pw-*`, `sf-*`, …)
5. `js/main.js` — L6 motion and interactive widgets (defer at end of `<body>`)

Footers link to `design-chain/design-chain.html` as the interactive charter. **`movemental-paper.html`** uses Paper Edition chrome and does **not** follow the oatmeal `data-theme="oatmeal"` stack.

---

## 3. Token translation — Oatmeal → Concept Modern

Use this when porting **layout or copy** from html-template into React — **remap colors and fonts**, do not copy oatmeal hex into `globals.css`.

### 3.1 Core surfaces & type

| Oatmeal (`tokens.css`) | Concept Modern (`globals.css`) | Notes |
| ---------------------- | ------------------------------ | ----- |
| `--color-bg` `#FBFAF6` | `--background` `#faf6ee` | Warmer cream in production |
| `--color-surface` `#F8F6F1` | `--section` / `--muted` `#f2ece0` | Alt band |
| `--color-surface-elevated` `#FFFFFF` | `--card` `#ffffff` | Card sheet |
| `--color-paper-edge` `#ECE8DE` | `--border-soft` `#efe7d6` | Deckle / inner card edge (Paper only in html-template) |
| `--color-ink` `#1A1A1A` | `--foreground` / `--primary` `#19150f` | Primary ink + pill fill |
| `--color-ink-muted` `#5C5651` | `--muted-foreground` `#6b6660` | Secondary text |
| `--color-border` `#E5DFD2` | `--border` `#e6ddcb` | Hairlines |
| `--color-hero-dark` `#0A0E1A` | `--inverse-surface` `#141110` | Midnight band (production is slightly warmer) |
| `--color-hero-dark-soft` `#141A2E` | `--inverse-surface` + `color-mix` | Softer midnight wash — avoid as second palette |
| `--color-on-hero-*` (cream on navy) | `--inverse-foreground` + opacity utilities | On-midnight text |
| `--color-blue` `#1B4B9B` (Paper marginalia) | **Do not port** as marketing accent | Paper Edition only |
| `--color-highlight` `#FFEB3B` | **Do not port** | Paper Edition highlighter |
| `--font-display` Playfair | `--font-serif` **Newsreader** | Italic emphasis in `<em>`, not full headings |
| `--font-body` Inter | `--font-sans` Inter | Same |
| `--font-hand` Homemade Apple | **Do not port** | Paper marginalia only |
| `--font-mono` IBM Plex Mono | `font-mono` stack / ui-monospace | Code, meta, AI dock |
| `--radius-pill` `999px` | `--radius-pill` / `rounded-full` | Ink pill CTAs |
| `--radius-card` `20px` | `--radius-card-value` `0.875rem` (14px) | Production cards are tighter |
| `--container-wide` `72rem` | `--container-max` `1200px` | Production rail is slightly narrower |
| `--container-narrow` `42rem` | `--prose-max` `680px` | Reading measure |

**Typography behavior:** Oatmeal uses Playfair for **all** display headings (often with a terminal period via `.ml-hero-title::after`). Concept Modern uses **Inter/Newsreader** — Newsreader appears only as **italic `<em>`** inside display lines, not as the default heading face. Do not copy Playfair heading styles verbatim.

### 3.2 Product-only tokens (html-template — do not port to marketing)

These exist in `tokens.css` for pathway mega-menu, Five-Layer Read, and Paper Edition. Map to Concept Modern **semantic state** or **Stitch-surface** tokens only when building the matching product route — never as general marketing accents.

| Oatmeal | Role | Concept Modern / product note |
| ------- | ---- | ------------------------------ |
| `--color-audience-churches` `#1B4B9B` | Audience card accent | Use tonal cards + copy; no per-audience hex in `(site)` marketing |
| `--color-audience-nonprofits` `#9C4A2D` | Audience card accent | Same |
| `--color-audience-institutions` `#3F4A55` | Audience card accent | Same |
| `--color-rating-yes` `#5A8F3A` | Five-Layer Read | Align with `--status-go` / program signals (DESIGN.md §18) |
| `--color-rating-partial` `#BC8C2F` | Five-Layer Read | Align with `--status-caution` |
| `--color-rating-no` `#9C4A2D` | Five-Layer Read | Align with `--status-stop` / `--destructive` context |
| `--color-ai-*` | Paper Edition AI dock | Paper / product mock only |

### 3.3 Motion tokens (Oatmeal → Concept Modern)

| Oatmeal (`tokens.css`) | Concept Modern ([MOTION.md](./MOTION.md)) |
| ---------------------- | ------------------------------------------- |
| `--t-fast` `150ms` | `--duration-fast` `150ms` |
| `--t-med` `250ms` | `--duration-normal` `300ms` (production slightly slower) |
| `--t-slow` `400ms` | `--duration-slow` `450ms` |
| `--ease` `cubic-bezier(0.2, 0.6, 0.2, 1)` | `--ease-out` / `--ease-expressive` | See MOTION.md §8 for `js/main.js` ↔ `<Reveal>` parity |

---

## 4. Page manifest → Next.js routes

Source of truth in html-template: `_reference/PAGE-MANIFEST.md` (v2, 2026-05-27). **Theme** = html-template skin only. **Tier** = rebuild audit level in html-template (R0 = layout authority, R1/R2 = built marketing, R3 = leader exemplar, app = product mock).

When html-template and React disagree on copy, **React + Supabase/content layers win** for production; html-template catches up on the next sync pass (see §4.3).

### 4.1 R0 — layout authorities (chain-audit **pass** in html-template)

| HTML | Theme | Namespace | Next.js route | Notes |
| ---- | ----- | --------- | ------------- | ----- |
| `movemental-home.html` | oatmeal | `.mh-*` | `/` | Flagship home; mega-menu on `.mh-mega-group` |
| `movemental-paper.html` | paper | `.mast/.leaf/.hl/.ink/.dock` | **No route** | Paper Edition — html-template only |
| `movemental-pricing.html` | oatmeal | `.mp-*` | `/pricing` | HTML is **superset** of React (see §4.3) |
| `pathway-sandbox.html` | oatmeal | `.pw-*` | `/pathway/sandbox` | |
| `pathway-skills.html` | oatmeal | `.pw-*` | `/pathway/skills` | |
| `pathway-solutions.html` | oatmeal | `.pw-*` | `/pathway/solutions` | |
| `field-guide-safety.html` | oatmeal | `.fg-*` | `/field-guides/safety` | Download form stub via `.fg-form` |
| `about-safestart.html` | oatmeal | `.ss-*` | `/about-safestart` | FAQ answers partially placeholder |
| `pathway-safety.html` | oatmeal | `.pw-*`, `.flr-*`, `.sf-*` | `/pathway/safety` | **Five-Layer Read** wizard live in `js/main.js` |

### 4.2 R1/R2 — built marketing & stubs

| HTML | Theme | Namespace | Next.js route | Chain-audit (html) |
| ---- | ----- | --------- | ------------- | ------------------- |
| `pathway-overview.html` | oatmeal | `.sf-*`, `ml-card` | `/pathway` | pass |
| `the-path.html` | oatmeal | `.sf-*`, `.sf-stagelink-row`, `.ml-quote` | `/the-path` | pass |
| `start-with-safety.html` | oatmeal | `.sf-midnight`, `.sf-2col` | `/start-with-safety` | pass |
| `field-guides.html` | oatmeal | `.sf-midnight`, `ml-card` | `/field-guides` | pass |
| `field-guide-sandbox.html` | oatmeal | `.fg-*` | `/field-guides/sandbox` | pass |
| `about.html` | oatmeal | `.sf-*` | `/about` | partial |
| `faq.html` | oatmeal | `.ml-qa`, `.sf-*` | `/faq` | partial |
| `movemental-library.html` | oatmeal | `.sf-*`, `.fg-*` | `/library` | partial |
| `audience-churches.html` | oatmeal | `.sf-*`, `.sf-page-ctas` | `/churches` | partial |
| `audience-nonprofits.html` | oatmeal | `.sf-*` | `/nonprofits` | partial |
| `audience-institutions.html` | oatmeal | `.sf-*` | `/institutions` | partial |
| — (IA hub) | — | — | `/who-we-serve` | **React-only** — no html-template file |
| `voices.html` | oatmeal | `.sf-*` | `/voices` | partial |
| `movement-leaders.html` | oatmeal | `.sf-*` | `/movement-leaders` | partial |
| `assess.html` | oatmeal | `.sf-*` | `/assess` | partial |
| `contact.html` | oatmeal | `.sf-*`, `.fg-form` | `/contact` | partial |
| `evidence.html` | oatmeal | `.sf-*` | `/evidence` | partial |
| `technology.html` | oatmeal | `.sf-*` | `/technology` | partial |
| `how-we-use-ai.html` | oatmeal | `.sf-*` | `/how-we-use-ai` | partial |
| `case-studies.html` | oatmeal | `.sf-*` | `/case-studies` | partial |
| `are-we-compatriots.html` | oatmeal | `.sf-*` | `/are-we-compatriots` | partial |
| `recipes.html` | oatmeal | `.sf-*` | `/recipes` | partial — catalog may differ until DB seeded |
| `movement-voice-commitments.html` | oatmeal | `.sf-*` | `/movement-voice-commitments` | partial |
| `leader-apply.html` | oatmeal | `.sf-*` | `/leader/apply` | partial |
| `safety-sign.html` | oatmeal | `.sf-*` | `/safety/sign` | partial |
| `about-founder-alan-hirsch.html` | oatmeal | `.sf-*`, `.mh-founder` | `/about/founders/alan-hirsch` | partial |
| `about-founder-brad-brisco.html` | oatmeal | `.sf-*`, `.mh-founder` | `/about/founders/brad-brisco` | partial |
| `about-founder-joshua-shepherd.html` | oatmeal | `.sf-*`, `.mh-founder` | `/about/founders/joshua-shepherd` | partial |
| `movement-leader-liz-rios.html` | oatmeal | `.sf-*`, `.mh-founder` | `/movement-leaders/liz-rios` | partial |
| `movement-leader-jr-woodward.html` | oatmeal | `.sf-*`, `.mh-founder` | `/movement-leaders/jr-woodward` | partial |
| `movement-leader-rowland-smith.html` | oatmeal | `.sf-*`, `.mh-founder` | `/movement-leaders/rowland-smith` | partial |
| `footnotes.html` | oatmeal | `.sf-*` | `/footnotes` | partial — EEAT table pending |
| `terms.html` | oatmeal | `.sf-prose--legal` | `/terms` | partial |
| `privacy.html` | oatmeal | `.sf-prose--legal` | `/privacy` | partial |
| `cookies.html` | oatmeal | `.sf-prose--legal` | `/cookies` | partial |
| `login.html` | oatmeal | `.sf-*`, `.fg-form` | `/login` | partial |
| `forgot-password.html` | oatmeal | `.sf-*`, `.fg-form` | `/forgot-password` | partial |
| `site-index.html` | oatmeal | `.sf-*` | **No route** | Local browse index |
| `site-map.html` | oatmeal | `.sf-*` | **No route** | Internal content/tier map |

### 4.3 R3 — leader exemplars (Tier D — not Movemental marketing)

| HTML | Theme | Namespace | Notes |
| ---- | ----- | --------- | ----- |
| `index.html` | leader | `.home-*`, `.ml-hero--bleed-overlay` | Alan Hirsch tenant template demo |
| `library.html` | leader | `.ml-*` | Leader library — not `movemental-library.html` |
| `articles.html` | leader | `.ml-*` | Leader articles index |

Do **not** sync Tier D copy or nav IA into Movemental marketing routes.

### 4.4 App / drafts / Paper (no marketing route)

| HTML | Theme | Namespace | Notes |
| ---- | ----- | --------- | ----- |
| `dashboard/charter-dashboard.html` | app | `.cd-*` | Safety workspace mock — see `/safestart`, dashboard shells; `dashboard/OPEN-DECISIONS.md` in html-template |
| `design-chain/design-chain.html` | paper/oatmeal | charter | Interactive style charter |
| `movemental-paper-hero.html` | paper | paper | Draft hero variant |
| `movemental-paper-draft-v1.html` | paper | paper | Local draft |

### 4.5 Sync decisions (html-template `_reference/NOTES.md`)

| Topic | Canonical value | Notes |
| ----- | ----------------- | ----- |
| SafeGuide page count | **33 pages** | Was 40 on older home / about-safestart copies |
| Scarcity line | **3 of 100** | `js/main.js` + `[data-committed-seats]` — matches `src/lib/committed-seats.ts` |
| Path Bundle price | **Open** | HTML pricing may omit $50k bundle; React shows $50,000 |
| Pricing HTML vs React | HTML **superset** | Scholarship Fund, Voice Compensation, eight refusals, per-stage deep sections, 12-item FAQ on `movemental-pricing.html` are spec for future React — do not strip from HTML |
| Leader exemplars | Tier D only | `index.html`, `library.html`, `articles.html` — Alan Hirsch template |
| Movemental library | `movemental-library.html` | Movemental `/library`; `library.html` stays leader exemplar |

### 4.6 Home section → React source map

When auditing `movemental-home.html` ↔ `/`, compare structure against these React modules (copy from html-template NOTES):

| Section | React source | Oatmeal class |
| ------- | ------------ | ------------- |
| Hero | `TopographicHero.tsx` | `.mh-hero`, `.mh-hero-topo` |
| Audience fold | `audience-fold.tsx` | `.mh-audience` |
| SafeStart | `SafeStartBlock.tsx` | `.mh-safestart` |
| Credibility | `credibility-fold.tsx` | `.mh-credibility` |
| Bottom CTA band | `HomeCTABandNew.tsx` | `.mh-cta-band` |

Primary page composer: `src/components/safety/_new/HomeContentNew.tsx` (via `src/app/(site)/page.tsx`).

---

## 5. CSS namespaces & shared components

### 5.1 Page namespaces (`css/pages.css`)

| Prefix | Primary pages | Role |
| ------ | ------------- | ---- |
| `.mh-*` | `movemental-home.html` | Marketing home — hero, stages, audience, SafeStart, credibility, CTA band, mega-menu |
| `.mp-*` | `movemental-pricing.html` | Pricing tables, tier cards, FAQ |
| `.pw-*` | `pathway-*.html` | Pathway product heroes and body |
| `.sf-*` | Most marketing pages | Standard bands, prose, midnight heroes, page CTAs (`.sf-page-ctas`), legal (`.sf-prose--legal`) |
| `.sf-midnight` | `start-with-safety.html`, hubs | Full-bleed midnight hero bands |
| `.fg-*` | `field-guide-*.html` | Field guide hero, cover, download |
| `.fg-form` | Contact, field guides, auth | Form layout + submit stub in `js/main.js` |
| `.flr-*` | `pathway-safety.html` | Five-Layer Read diagnostic wizard |
| `.ss-*` | `about-safestart.html` | SafeStart engagement layout |
| `.mh-founder` | Founder / movement-leader profiles | Portrait + bio stack |
| `.ml-qa` | `faq.html` | Q&A accordion rows |
| `.cd-*` | `dashboard/charter-dashboard.html` | Charter Dashboard product mock |

Paper Edition uses **`.mast` / `.leaf` / `.hl` / `.ink` / `.dock`** — not `sf-*`.

### 5.2 Shared components (`css/components.css` — `ml-*`)

| Family | Examples | Concept Modern equivalent |
| ------ | -------- | ------------------------- |
| Nav | `.ml-nav`, `.ml-nav-toggle`, drawer | `SiteNav`, mobile `Sheet` |
| Buttons | `.ml-button-primary`, `-secondary`, `-ghost` | `Button` variants — ink pill primary |
| Hero (leader) | `.ml-hero--bleed-overlay`, `-editorial-stack`, `-compact` | Tier D only |
| Cards | `.ml-card`, filter chips | `Card`, tonal stacking ([PATTERNS.md](./PATTERNS.md) §1) |
| Q&A | `.ml-qa` accordion | shadcn `Accordion` on `/faq` |
| Footer | `.ml-footer` | `SiteFooter` |

---

## 6. Motion & interaction (`js/main.js`)

Layer 6 in html-template. Full React charter: [MOTION.md](./MOTION.md) §8.

| Feature | Selector / trigger | Pages | React parity |
| ------- | ------------------- | ----- | ------------ |
| Mobile nav | `.ml-nav-toggle`, `#ml-nav-drawer` | All oatmeal pages | `SiteNav` + drawer |
| Sticky nav state | `.ml-nav[data-sticky="true"]` → `.is-scrolled` | All | `NavScrollShadow` |
| Scroll reveal | `.reveal` + `IntersectionObserver` | Most bands | `<Reveal>` |
| Filter chips | `.ml-filter-chips` | Tier D library/articles | N/A marketing |
| Scarcity line | `[data-committed-seats]` | Home CTA | `committed-seats.ts` |
| Mega-menu | `.mh-mega-group` | Home only | Path/audience nav in React |
| Field guide form stub | `.fg-form` submit | Field guides, contact | API routes + forms |
| Five-Layer Read | `.flr-root` → `initFiveLayerRead` | `pathway-safety.html` | Product route wizard |
| Footer year | `[data-year]` | All | Server or client year stamp |

**Reduced motion:** `js/main.js` skips reveal IO when `prefers-reduced-motion: reduce` — mirrors `<Reveal>` and `globals.css` guard ([MOTION.md](./MOTION.md) §4).

---

## 7. Key source files (html-template)

| Path | Purpose |
| ---- | ------- |
| `css/tokens.css` | Oatmeal L1 — **reference only**; do not paste into `movemental-ai` |
| `css/base.css`, `css/components.css`, `css/pages.css` | L2–L5 static layers |
| `js/main.js` | L6 — nav, reveal, mega-menu, scarcity, Five-Layer Read |
| `design-chain/design-chain.html` | Interactive charter (Oatmeal/Paper) |
| `design-chain/design-chain.css`, `design-chain.js` | Charter styles + demos |
| `_reference/style-spec.md` | Human-readable Oatmeal style spec (from Tailwind UI reference) |
| `_reference/style-spec.json` | Machine-readable companion |
| `_reference/PAGE-MANIFEST.md` | Page inventory, audit tiers, chain status |
| `_reference/NOTES.md` | Sync decisions vs React, provenance, asset slots |
| `dashboard/OPEN-DECISIONS.md` | Charter Dashboard mock — non-canonical product flags |
| `README.md` | Run locally, deploy, load order |
| `site-index.html` | Browse every HTML file locally |

**Imagery (html-template):** Marketing pages use root-level `images/voice-*.svg` for portraits. Legacy `images/voices/*.webp` and `images/hero/` are reference-only after oatmeal sync. Paper marginalia: `images/marginalia/`. Placeholder dimensions documented in `_reference/NOTES.md`.

**Local preview:**

```bash
cd ~/dev/01-Movemental-Core/movemental-html-template
python3 -m http.server 8000
# http://localhost:8000/movemental-home.html
# http://localhost:8000/site-index.html  — full page index
```

---

## 8. Agent workflow

### When building or restyling **this** repo

1. Read **[DESIGN.md](./DESIGN.md)** and **`src/app/globals.css`**
2. Use skill **`concept-modern-ui`**
3. Use **[stitch-to-react-migration.md](../build/prompts/stitch-to-react-migration.md)** for Stitch screens
4. **Ignore** html-template colors/fonts unless you are explicitly doing a **content/IA diff**

### When auditing parity **html-template ↔ React**

1. Open the matching row in §4
2. Compare **structure and copy**, not oatmeal hex
3. Record drift in html-template `_reference/PAGE-MANIFEST.md` or a build note — do not reintroduce Oatmeal tokens here
4. For per-page agent prompts, see [html-template-exemplars-index.md](../build/prompts/html-template-exemplars-index.md)

### When lifting **static HTML** inside Core `1-html` tree

See **[STATIC_HTML_AND_TEMPLATES.md](./STATIC_HTML_AND_TEMPLATES.md)** — that tree uses **Concept Modern token parity** with `globals.css`, not `movemental-html-template/css/tokens.css`.

---

## 9. Related docs in this repo

| Document | Role |
| -------- | ---- |
| [DESIGN.md](./DESIGN.md) | Canonical Concept Modern charter |
| [STATIC_HTML_AND_TEMPLATES.md](./STATIC_HTML_AND_TEMPLATES.md) | Core `1-html` static SSOT |
| [MOTION.md](./MOTION.md) §8 | `js/main.js` ↔ React motion parity |
| [PATTERNS.md](./PATTERNS.md) | Composed page patterns (React-first) |
| [FUTURE-concept-modern-html-charter.md](./FUTURE-concept-modern-html-charter.md) | Prototype class catalog + historical delta log |
| [html-template-exemplars-index.md](../build/prompts/html-template-exemplars-index.md) | Per-page audit/build prompts |
| [stitch-to-react-migration.md](../build/prompts/stitch-to-react-migration.md) | Stitch → React |
| [docs/build/notes/agent-room-phase1-status.md](../build/notes/agent-room-phase1-status.md) | Agent Room (Concept Modern UI when built) |

---

## 10. Change control

- **html-template changes** do not automatically change `movemental-ai`. Sync is intentional (copy, IA, new pages).
- After html-template manifest or token changes, update **this document’s §3–§4** and the “Last synced” line in the header.
- **Token or primitive changes** in production require `globals.css` + **DESIGN.md** + this doc’s §3 table if the mapping shifts.
- **Never** add Oatmeal/Paper tokens back to `movemental-ai` without an explicit charter amendment in DESIGN.md §16.
