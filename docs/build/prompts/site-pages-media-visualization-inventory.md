# Prompt: site-wide media & visualization inventory (page by page)

Use this document as the **system prompt** (or operator brief) for an audit whose **output** is a single artifact: a **correct, complete-but-not-bloated** list of every **image**, **visualization**, **illustration**, and **icon** the Movemental marketing site needs—**per route**, with **placement** (section + approximate UI role) and **asset kind**.

The outcome must stay **consonant** with [docs/design/DESIGN.md](../../design/DESIGN.md) (“The Digital Curator”): editorial restraint, tonal stacking over decoration, **semantic tokens only** in implementation, **Inter** only, **primary** as a light switch, **midnight** bands for authority—not generic SaaS illustration dumps or rainbow data charts.

---

## Preconditions (read before auditing)

1. Read **§1–5, §8–9, §11** of [docs/design/DESIGN.md](../../design/DESIGN.md) (north star, surfaces, typography, motion, UI shell, domain sections).
2. Treat **`src/app/(site)/**/page.tsx`** and **`src/components/sections/*.tsx`** as the **source of truth** for what ships today. If a URL appears in [nav-links.ts](../../../src/components/nav/nav-links.ts) but **no** `page.tsx` exists yet, still list it once under **“Planned / nav-only routes”** with *TBD* slots—do not invent sections.
3. Optional: Stitch project **`2208910962065880866`** (see [docs/build/stitch-project.md](../stitch-project.md)) for **intent** when code and design notes disagree; **code wins** for “what exists,” Stitch for “what was originally pictured.”

---

## Definitions (be strict)

When listing an item, **tag it with exactly one** primary category below. If something could be two, pick the category that determines **production workflow** (briefly say why in one clause).

| Category | Count as | Examples | Do **not** count |
| -------- | -------- | -------- | ---------------- |
| **Image** | Yes | Photography, authentic screenshot, texture/background photo behind scrim, leader portrait, venue/environment shot, `next/image` raster **or** intentional SVG **photo** substitute | Pure CSS gradients, flat token fills with no pictorial subject |
| **Visualization** | Yes | Charts, timelines with quantitative or sequential logic, diagrams that **encode relationships or data** (journey maps with explicit stages, architecture schematics), annotated screenshots | Decorative shapes, icon-only “fake charts” |
| **Illustration** | Yes | Custom vector or raster **scene** whose job is narrative/metaphor (editorial spot, empty-state scene) **without** a strict data encoding requirement | Lucide stroke icons, brand logo |
| **Icon** | Yes | Small symbolic glyphs: **Lucide** (or future unified icon set), UI affordances (chevron, close, menu), inline list markers where the icon **is** the vocabulary | Full-bleed marketing art mistaken for “icon” |

**Global UI icons** (nav chevrons, mobile menu, dialog close, accordion carets, `ArrowLink` arrow, form affordances): list once under **§ Global chrome & UI shell**, not again on every page **unless** a page introduces **page-specific** icons beyond shared primitives.

**Stock / third-party URLs** (e.g. temporary `lh3.googleusercontent.com/aida-public/...` in code): treat every occurrence as **“Replace with first-party asset”** and list the **intended** subject and aspect ratio, not the placeholder URL.

---

## Design consonance (every line of the output must respect this)

- **No-line sectioning:** major bands separate by **surface** (`background` / `section` / `elevated` / `inverse-surface`), not decorative borders between sections.
- **Ghost lift before shadow:** prefer `card` on `section`; **`shadow-ambient` only** where floating UI is justified (DESIGN.md).
- **Midnight:** hero or proof moments on `inverse-surface` use **`inverse-foreground`**; do not wash with low-contrast gray.
- **Imagery tone:** credible, documentary, calm—avoid startup meme visuals, neon gradients beyond **`--gradient-primary`** on CTAs, and busy collages.
- **Icons:** single family, consistent stroke/size; **muted** by default, **primary** only for emphasis or active state—aligned with “primary is a light switch.”
- **Alt text & motion:** every image needs a sensible **alt** (or **decorative** rationale); any motion must respect **`prefers-reduced-motion`**.

---

## Method (how to produce the inventory)

For **each canonical route** below:

1. Open the route’s **`page.tsx`** (if present).
2. Enumerate **imported** section components and **inline** JSX blocks.
3. Run a targeted search in those files for: **`next/image`**, **`<Image`**, **`lucide-react`**, **`LucideIcon`**, **`<svg`**, **`img`**, **chart**/**recharts** (if ever added), **“TODO(assets)”**.
4. For each hit, record a row (or bullet) with:
   - **Route** (path)
   - **Section** (component name or heading slug / DOM landmark)
   - **Placement** (e.g. “card top / hero right / inline list leading”)
   - **Kind** (Image | Visualization | Illustration | Icon)
   - **Role** (one sentence: what job it does for the reader)
   - **Spec notes** (only what engineering/art needs: aspect ratio, treatment—e.g. grayscale-to-color on hover, midnight scrim—**not** creative brief prose)

**Stop rule:** Do not list the same global icon in 15 pages. **Do** list page-specific sets (e.g. pricing grid icons) once on that page.

---

## Output format (copy this skeleton per route)

```markdown
## <Route>

**Source file(s):** `…`

| # | Section / component | Placement | Kind | Role | Spec notes |
|---|----------------------|-----------|------|------|------------|
| 1 | … | … | Image \| Visualization \| Illustration \| Icon | … | … |
```

After all routes, add:

```markdown
## Global chrome & UI shell

**Source file(s):** `src/components/nav/*`, `src/components/primitives/arrow-link.tsx`, relevant `src/components/ui/*`

| … |
```

---

## Canonical routes & where to look (audit checklist)

Work **in this order** so the inventory mirrors the funnel. For each line, start from the **primary `page.tsx`**; drill into **`src/components/sections/*`** when the home page composes sections without local media.

| # | Route | Primary implementation | Audit focus |
|---|-------|------------------------|-------------|
| 1 | `/` | `src/app/(site)/page.tsx` → sections in `src/components/sections/home-*.tsx` | **HomeHero:** currently typographic-only—note explicitly if a **hero image/illustration** is *absent* vs *desired*. **HomeAudiences:** four audience card images (`aspect-[16/10]`, hover grayscale→color). **HomeMechanism:** three Lucide steps. **HomeBento:** six Lucide “enable” cards (+ any secondary icons in file). **HomeEvidence:** product screenshot + `CheckCircle2` list icons. Scan remaining `home-*` files for any hidden `Image` / SVG. |
| 2 | `/about` | `src/app/(site)/about/page.tsx` | Portrait/team or culture imagery if present; Lucide usage in page sections. |
| 3 | `/case-studies` | `src/app/(site)/case-studies/page.tsx` | Case card imagery, logos, or hero visuals per block. |
| 4 | `/contact` | `src/app/(site)/contact/page.tsx` | Hero/aside imagery; **segment** icons (`Building2`, `Church`, `Network`, etc.)—tag as **Icon** with audience semantics. |
| 5 | `/evidence` | `src/app/(site)/evidence/page.tsx` | Hero / inline figures; distinguish **screenshot** (Image) vs **chart** (Visualization) if any. |
| 6 | `/faq` | `src/app/(site)/faq/page.tsx` | Imagery blocks + `ArrowRight` (global pattern vs page—avoid duplicate if only ArrowLink pattern). |
| 7 | `/methodology` | `src/app/(site)/methodology/page.tsx` | Multiple `Image` regions—list each placement separately. |
| 8 | `/pricing` | `src/app/(site)/pricing/page.tsx` | **No `next/image` today:** enumerate **all Lucide icons** used as section vocabulary (tag **Icon**); note any **future** visualization needs only if copy/structure implies a chart/diagram *not yet built*. |
| 9 | `/system` | `src/app/(site)/system/page.tsx` | Layer / architecture visuals: classify **Image** vs **Visualization** vs **Illustration** by whether the graphic encodes structure/data. |
| 10 | `/walkthrough` | `src/app/(site)/walkthrough/page.tsx` | Step imagery and Lucide icons; timeline-like blocks → **Visualization** if sequential logic is explicit. |
| 11 | `/who-we-serve` | `src/app/(site)/who-we-serve/page.tsx` | Audience hero/card imagery + icons. |
| 12 | `/services` | `src/app/(site)/services/page.tsx` | Service grid / hero images; icons per card. |
| 13 | `/services/system-builds` | `src/app/(site)/services/system-builds/page.tsx` | Hero + supporting imagery; Lucide sets. |
| 14 | `/services/system-builds/foundation` | `src/app/(site)/services/system-builds/foundation/page.tsx` | **Icons only** in current code—list each semantic block’s icons; flag **optional** future illustration/visualization only if IA clearly calls for a figure not implemented. |
| 15 | `/services/system-builds/content-fundraising` | `src/app/(site)/services/system-builds/content-fundraising/page.tsx` | Imagery + Lucide; fundraising narrative may warrant **Visualization** (e.g. funnel) if present or stubbed. |
| 16 | `/services/organizational-systems` | `src/app/(site)/services/organizational-systems/page.tsx` | Multiple `Image` placements + icons—one row per slot. |
| 17 | `/privacy` | `src/app/(site)/privacy/page.tsx` | Typically **none**; confirm no embedded figures. |
| 18 | `/terms` | `src/app/(site)/terms/page.tsx` | Typically **none**. |
| 19 | `/cookies` | `src/app/(site)/cookies/page.tsx` | Typically **none**; cookie diagram is **Visualization** *only if* added later. |

### Planned / nav-only routes

| Route | Note |
| ----- | ---- |
| `/manifesto` | Linked from [nav-links.ts](../../../src/components/nav/nav-links.ts) as **Company → Manifesto**. If `src/app/(site)/manifesto/page.tsx` **does not exist** at audit time, output a single **TBD** row: “Route not implemented—media requirements deferred until page exists.” **Do not** fabricate sections. |

### Global chrome & UI shell (single pass)

| Area | Source | What to list |
| ---- | ------ | -------------- |
| Primary nav | `src/components/nav/site-nav.tsx`, `site-nav-menus.tsx` | `ChevronDownIcon` and any menu-specific icons. |
| Mobile nav | `mobile-nav.tsx` | `Menu` icon; sheet close if not only shadcn default. |
| Footer | `site-footer.tsx` | Ordinarily **no** pictorial media; list only if logos/social icons appear. |
| Shared primitives | `arrow-link.tsx`, etc. | `ArrowRight` as **Icon** (once). |
| Generated UI | `src/components/ui/*` | **Do not** explode every shadcn icon into the per-page tables; attach **once** here unless a page passes **custom** icon props. |

### Metadata & social (site-wide, not a “page” but required)

| Kind | Source | Action |
| ---- | ------ | ------ |
| **Image** (OG / Twitter) | `src/app/layout.tsx` (and any route `metadata`) | Today there is **no** explicit `openGraph.images` in root layout—list as **gap** or **decision**: default OG image dimensions + subject (editorial lockup vs wordmark). |

---

## Quality bar (reviewer checklist)

- [ ] Every **canonical route** in the table has a section **or** an explicit “**No media**” one-liner.
- [ ] No duplicate global **Icon** rows across pages.
- [ ] Every **`next/image`** (and equivalent) has **Kind** + **Spec notes** (ratio, crop, treatment).
- [ ] **Visualization** entries either cite an existing component or are marked **“proposed—not in code”** (sparingly).
- [ ] Wording stays **implementation-neutral** (SVG vs PNG) unless format matters for the role (e.g. photo vs vector).
- [ ] **DESIGN.md** constraints are visibly reflected (no rainbow charts, no extra gradients, restrained primary).

---

## Deliverable

One Markdown file (e.g. `docs/build/_outputs/site-media-inventory.md` or product-owned path) containing:

**Latest run:** [site-media-inventory.md](../_outputs/site-media-inventory.md) (2026-04-13).

1. This **method** summarized in ≤5 bullets at the top (for readers who skip prompts).
2. The **per-route tables** using the skeleton above.
3. **Global chrome** + **metadata** sections.
4. Optional **Appendix**: sorted list of **all unique Lucide icon names** actually imported site-wide (helps design ops consolidate sizes/strokes).

**End of prompt.**
