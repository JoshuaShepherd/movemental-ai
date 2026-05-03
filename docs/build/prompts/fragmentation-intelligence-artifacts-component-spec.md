# Fragmentation story — intelligence artifact views (HTML/CSS/JS component spec)

> **Status:** specification only — **do not** wire this into `fragmentation-unified-full-story-mockup.html` until implementation is explicitly requested.  
> **Purpose:** replace every `../../public/images/fragmentation-story/*.webp` usage with **parameterized HTML/CSS (and minimal JS)** that reads as “designed UI,” not raster art — while preserving scroll choreography, aspect ratios, and narrative roles.

---

## 0. References in this repo

| Artifact | Role |
|----------|------|
| [docs/build/fragmentation-unified-full-story-mockup.html](../fragmentation-unified-full-story-mockup.html) | Canonical layout: `.artifact` / `.scatter__tile` / `.node` / `.pathway__stop-card` / `.multi__tile`, IDE, workspace |
| [docs/build/fragmentation-sticky-mockup-css.html](../fragmentation-sticky-mockup-css.html) | **Working pattern:** `ART` slug → template string; `.ca` root + `ca-*` primitives; post-load `img` replacement IIFE |
| [docs/build/fragmentation-unified-narrative.js](../fragmentation-unified-narrative.js) | Audience / field rail behavior (keep API-compatible when swapping media) |
| [docs/html/site-templates/site-theme.css](../html/site-templates/site-theme.css) | Semantic tokens (`--foreground`, `--card`, `--primary`, `--inverse-surface`, etc.) |

---

## 1. Design rules (non-negotiable)

1. **No raster** inside artifact slots for production narrative (mockups may keep `<img>` until cutover). SVG inline is allowed; no external bitmaps for these components.
2. **Semantic tokens only** — same bar as the HTML mockups: `var(--*)`, `color-mix(in srgb, …)`, no decorative 1px section borders; elevation = `box-shadow` only where already established (ambient on `.artifact__card`).
3. **Aspect ratio contract** — parent sets `--ar: w / h` (or inline `aspect-ratio`); inner `.intel-view` (rename from `.ca` in production if desired) is `width: 100%; height: 100%; container-type: inline-size;` so `cqw` scales typography and spacing.
4. **Informational vs relational** — every **core** artifact (§3) exposes `data-field="info|rel"` (or a class toggle) and **visibly shifts one or two cues** (e.g. info: schema chips / index strip; rel: avatars / thread tension / “who’s in the room”). Same DOM shell; CSS custom properties switch emphasis.
5. **Accessibility** — wrapper gets `role="img"` **or** redundant text: `aria-label` from content model; decorative skeleton bars `aria-hidden="true"`; interactive demos (§5) get real `button` / `tablist` semantics.
6. **Reduced motion** — `prefers-reduced-motion: reduce` disables shimmer, typing cursor blink, and parallax micro-tilts; static final frame remains.

---

## 2. Shared primitive vocabulary (extend `ca-*` from sticky CSS mockup)

These are the **low-level building blocks** every view composes. Implementation should live in one mockup stylesheet (e.g. `fragmentation-intel-primitives.css`) and one optional JS module (`fragmentation-intel-registry.js`).

| Token / class | Responsibility |
|---------------|------------------|
| `.intel-view` | Root for any artifact view; `display: flex; flex-direction: column; height: 100%; padding: clamp(...)`; `border-radius: var(--radius-md)`; `background: var(--card)` or variant |
| `.iv-eyebrow` | Upper meta: slate/muted, `letter-spacing` per DESIGN.md labels |
| `.iv-titleline` | 1–2 skeleton or real text lines (`max-width` in `cqw`) |
| `.iv-rule` | Horizontal tonal rule (not “border” — use `background: color-mix(...)`, height 1px) |
| `.iv-chip` | Pill: tier, status, locale code, “indexed” |
| `.iv-chip--accent` | Primary emphasis |
| `.iv-bar` | Skeleton line; modifiers: `.w30` … `.w100`, `.faint`, `.strong` |
| `.iv-row` / `.iv-col` | Flex helpers; `.iv-row--between` |
| `.iv-avatar` | Circle + optional initials |
| `.iv-meter` | Progress / usage bar; `--fill: 0–100%` |
| `.iv-svg` | Inline SVG block; `stroke: color-mix(in srgb, var(--foreground) …)` |
| `.iv-node` | Constellation vertex (absolute % positioning inherited from parent) |
| `[data-tone="midnight|elevated|warm|…]"` | Already used on `.multi__cluster-inner`; reuse |

**JS hook:** `window.IntelArtifactRegistry.register(slug, { render: (ctx) => HTMLElement | string, fields: ['info','rel'] })` so the same replacement pass as sticky-mockup-css can iterate `img[src*="fragmentation-story/"]` **or** React can import by slug.

---

## 3. Core narrative slugs (1:1 with current `.webp` filenames)

Each row is one **component** the implementation must ship. **Slots:** sticky stage, chapter inline, scatter tile, constellation `node`, IDE thumb, pathway card, multi tile (hub only — tenants stay abstract).

| Slug | Narrative role | Info field emphasis | Relational field emphasis | Key DOM regions |
|------|----------------|---------------------|---------------------------|-----------------|
| `order-of-service-structured-units` | Single readable sequence (Act I) | Numbered blocks as **liturgy / agenda**; clock, room | Same layout + **role tags** (who leads each block); small avatar stack on block 3 |
| `session-essential-structures-card` | Complete unit of meaning | Session objectives, duration, resources list | **Cohort** row: facilitator + participants; “shared artifact” badge |
| `formal-design-systems-split-flow` | Duplication without center (Act II) | One **canonical** node (filled primary) vs divergent children **outlined** | Ghost **second owner** avatar on a branch; tooltip “v2 in Slack” |
| `book-fragments-of-form` | Divergence surface — book | Spine, chapter skeleton, **metadata strip** (ISBN, year) | **Book club** thread preview strip; “discussed last Tuesday” |
| `module-formal-systems-intro` | Course / LMS card | Progress, module index, **prerequisite** chip | **Cohort progress** relative to others (anonymous band) |
| `cover-principles-design-fragmentation` | Secondary cover / promise drift | Tagline lines + **three promise bullets** | **Endorsement** avatars + quote skeleton |
| `cover-structural-fragments-investigation` | Research PDF vibe | Abstract + chart micro-bars + citation count | **Co-author** stack + “revise requested” flag |
| `podcast-card-abstract-structures` | Audio channel | Episode meta, show art, **timestamp** chapters | **Listener Q** bubble; reaction stack |
| `mobile-chat-skeleton-bubbles` | Real-time parallel truth | Read receipts off; **system** messages | Typing indicators from **two** parties; conflicting answers side by side |
| `email-thread-multi-participant` | Async institutional drift | Subject + **policy** footer; attachment chips | **To/CC** avatars, unread dot, “loop” depth meter |
| `message-thread-staggered-fragments` | Misaligned thread | Quoted text blocks with **inconsistent** indent levels | **Mis-attribution** cue: wrong name on reply skeleton |
| `core-hub-to-fragment-nodes` | Integration hub | Central **“source”** glyph; edges labeled `md`, `thread`, `podcast` | Edge **latency** ticks (pure CSS animation) or “last sync” |
| `sketch-converge-diverge-flow` | Formation abstract | Labels: dissonance → integration | Hand-drawn **community** nodes emphasized |
| `stage-presentation-three-shapes` | Embodied / public | Slide **title** + deck outline | **Speaker notes** peek (smaller panel) |

**Implementation note:** Sticky mockup already defines HTML templates for all of the above slugs inside `ART` — treat that file as **v0**. This spec adds: (a) `data-field`, (b) normalized class names (`iv-*`), (c) explicit content contracts per slug, (d) six new operational views in §5.

---

## 4. Composite layouts (no new raster; reuse §3 views as children)

These match **regions** in the unified HTML; they are **compositions**, not new PNGs.

| Composite ID | Children | Behavior |
|----------------|----------|----------|
| `artifact-layer` | 1× `.artifact__card` + 0–2× `.artifact__ghost*` | Already in HTML; swap `img` for `.intel-view` root |
| `scatter-tile` | 1× slug view | Preserves `--t --l --r --s --w --ar`; tile adds subtle **field** tint via `data-field` on parent `#scatter` |
| `constellation-node` | Scaled slug view inside `figure.node` | Optional `::after` line labels (CSS only) |
| `ide-file-thumb` | 32×32–48×48 minified slug renderer | Registry returns `variant: "thumb"` |
| `pathway-stop-card` | Slug + `.iv-pill` step index | Trail SVG stays as today |
| `workspace-minimap` | Smaller nodes; center `node--highlight` | Citations strip reads from static mock data |

**JS:** One `MutationObserver` or a single `initIntelArtifacts(rootEl)` called after DOM ready (and after audience/field changes) to refresh `data-field` on all `[data-intel-slug]`.

---

## 5. New operational views (required)

Each view is a **first-class component** with: `slug`, default `--ar`, `variants: ['full','thumb','tile']`, **props** (JSON below), and **field** differences.

### 5.1 `intel-seo-surface` (slug: `intel-seo-surface`)

- **Aspect default:** `16 / 9` or `1200 / 630` (OG frame).
- **Purpose:** show **search + share** layer on top of any artifact abstraction.
- **Structure:**
  - Row: faux browser chrome (3 dots + URL bar with **slug** text, no real URL needed).
  - `iv-titleline` ×2 (title + meta description lengths).
  - Row: **SERPreview** block — title (strong), URL (muted), description lines.
  - Footer chips: `canonical`, `hreflang`, `sitemap`, `robots`.
- **Info:** emphasize structured data icons (`Article`, `Course`, `FAQ` as tiny SVG glyphs).
- **Rel:** emphasize **CTR** test (A/B chip) and “shared by” avatars (static).
- **JS (optional):** character count meters updating `aria-valuenow` for demo.

### 5.2 `intel-geo-entity-card` (slug: `intel-geo-entity`)

- **Aspect default:** `4 / 5`.
- **Purpose:** **entity clarity** for AI/search systems — same content, machine-addressable.
- **Structure:**
  - `iv-eyebrow`: “Entity”
  - Primary line: **canonical name** (prop)
  - Grid: `sameAs` row of icon buttons (Wikipedia-style silhouettes, SVG).
  - `iv-rule` → **facts table** (3 rows: founded, jurisdiction, topic).
  - Bottom: `mentions` strip — linked **internal** topic chips.
- **Info:** full table + `sameAs`.
- **Rel:** “disputed” / “needs human confirm” **flag** on one row (amber via `color-mix`, not raw hex).

### 5.3 `intel-translation-locale-stack` (slug: `intel-translation-stack`)

- **Aspect default:** `1312 / 816` (landscape) or `4 / 5` for vertical.
- **Purpose:** drift across **locales** without losing source.
- **Structure:**
  - Three **stacked cards** (EN, ES, PT-BR) offset with transforms (like ghosts) — pure CSS.
  - Each card: `iv-chip` with locale + **version hash** (fake short SHA).
  - Center connector: “source string” `iv-bar` lines.
  - Footer: **TM (translation memory)** match percentage meter.
- **Info:** parity %, glossary hits.
- **Rel:** **Reviewer** avatars on ES card; comment bubble on PT-BR card.

### 5.4 `intel-ecommerce-shelf` (slug: `intel-ecommerce-shelf`)

- **Aspect default:** `16 / 10`.
- **Purpose:** commerce as **another expression** of the same intelligence.
- **Structure:**
  - Product row: image area = **thumb** of another registered slug (nested registry call).
  - Title, price, **variant** swatches (3 circles).
  - Trust row: rating stars (SVG outline), “fulfillment” chip.
  - Secondary line: **inventory** bar `--fill`.
- **Info:** SKU, variant matrix.
- **Rel:** **Gift** / “buy for cohort” with recipient avatars.

### 5.5 `intel-subscription-ledger` (slug: `intel-subscription-ledger`)

- **Aspect default:** `4 / 5`.
- **Purpose:** tie **formation graph** to **billing states** without a real payment UI.
- **Structure:**
  - Plan name + `iv-chip` (Starter / Pro / Team / Enterprise — align with multiplication copy).
  - Usage meters: seats, **API** calls (static), storage.
  - Timeline: 3 vertical nodes “renewal”, “invoice sent”, “payment OK”.
  - Footer: **MRR** number (obviously placeholder typography).
- **Info:** invoice IDs, line items (skeleton).
- **Rel:** **Finance + pastoring** — avatar pair “owner” + “billing contact”.

### 5.6 `intel-ai-agent-workpack` (slug: `intel-ai-agent-workpack`)

- **Aspect default:** `16 / 10`.
- **Purpose:** explicit **agent** boundary: tools, corpus scope, citations.
- **Structure:**
  - Left: **Tool list** (icons: `search`, `retrieve`, `summarize`, `draft`) — static.
  - Center: “Run” card with **query** `iv-bar` (strong) + **answer** skeleton paragraphs.
  - Right: **Citations** vertical list mapping to §3 slugs (chips with slug short names).
  - Footer: `context window` meter + “grounded only” toggle (visual only).
- **Info:** tool traces, token meter.
- **Rel:** **Human approval** queue badge on one citation.

---

## 6. Field + audience matrix (content props)

Implementations should accept a **single context object** (for HTML: `data-intel-props` as JSON string on a wrapper, parsed once — or inline `data-*` attributes for a11y).

```ts
// Logical contract (TypeScript for implementers; not shipped in mockup)
type IntelField = "info" | "rel";
type IntelAudience = "leader" | "nonprofit" | "church" | "seminary";

type IntelContext = {
  field: IntelField;
  audience: IntelAudience;
  variant: "full" | "thumb" | "tile";
  locale?: string; // for translation view
  title?: string;
  subtitle?: string;
};
```

**Copy deltas:** mirror `fragmentation-unified-narrative.js` — if the narrative already swaps chapter text by audience, **artifact views** should only adjust **labels** (e.g. “members” vs “seats” vs “students”) via props, not re-architect layout.

---

## 7. File / module layout (when implemented)

Suggested split for maintainability:

```text
docs/build/
  fragmentation-intel-primitives.css   # .intel-view, .iv-*, layout tokens
  fragmentation-intel-registry.js    # register + mount + img replacement shim
  prompts/
    fragmentation-intelligence-artifacts-component-spec.md  # this file
```

React port later: one component per slug under `src/components/sections/fragmentation-story/intel/` mapping the same props; primitives become Tailwind + `cn()`.

---

## 8. QA checklist before replacing `<img>`

- [ ] All **14** legacy slugs from §3 render in **full** and **thumb** without overflow at `--ar` extremes.
- [ ] §5 views each render once in a **gallery page** (optional `fragmentation-intel-gallery.html`) for visual QA.
- [ ] `data-field` toggle visibly changes **≥2** distinct style decisions per slug.
- [ ] Lighthouse: no CLS when swapping field (fixed heights via aspect-ratio).
- [ ] Grep mockup: zero `fragmentation-story/*.webp` in narrative sections (or feature-flagged).

---

## 9. Mapping: new views → narrative placement (recommended)

| New view | Suggested insertion point |
|----------|---------------------------|
| `intel-seo-surface` | After **integration** IDE block (footnote “surfaces”) or inside `indexed_by` expansion |
| `intel-geo-entity` | Beside **schema** column in IDE, as second tab |
| `intel-translation-stack` | **Formation** stage — alternate pathway card or caption illustration |
| `intel-ecommerce-shelf` | **Multiplication** — optional seventh “revenue expression” tile in hub cluster |
| `intel-subscription-ledger` | **Multiplication** captions area or tenant card flip (back face) |
| `intel-ai-agent-workpack` | **Activation** — replace static answer panel bottom third |

These placements are **editorial** recommendations only; final art direction may vary.

---

*End of specification.*
