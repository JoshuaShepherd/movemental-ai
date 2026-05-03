# Fragmentation story — three approaches, compared

**Scope.** This audit describes, side-by-side, the three live implementations of the fragmentation → multiplication narrative in this repo:

| # | Approach | File | Role |
|---|---|---|---|
| A | Full-story HTML mockup | [`docs/build/fragmentation-unified-full-story-mockup.html`](../fragmentation-unified-full-story-mockup.html) | Canonical narrative mockup — six stages, audience switcher, pinned sticky stage, scatter climax, tenant + infrastructure multiplication |
| B | Unified-system HTML mockup | [`docs/build/fragmentation-unified-system-mockup.html`](../fragmentation-unified-system-mockup.html) | Conceptual experiment — one continuous artifact set transformed through five stages, no "scene swap" |
| C | React production page | [`src/app/(site)/fragmentation/page.tsx`](../../../src/app/(site)/fragmentation/page.tsx) → `fragmentation-story-*` components | Shipped Next.js 16 / React 19 implementation of approach A's narrative |

All three share the same underlying thesis: a single corpus of artifacts moves from *fragmentation* (scatter) through *integration*, *activation*, *formation*, and *multiplication*. They diverge sharply on **how much of that narrative is told via re-composition of the same objects vs. via a sequence of distinct scenes**, and on **who the audience is**.

---

## 1. Approach A — `fragmentation-unified-full-story-mockup.html`

**4,066 lines. Single HTML file.** Self-contained: inline `<style>` (~2,200 lines), inline markup (~1,700 lines), inline `<script>` with GSAP + ScrollTrigger. Pulls from the shared `site-theme.css` for semantic tokens.

### Narrative architecture

Part I — the problem:

1. **`#intro`** — midnight hero: *"All of this belongs together. None of it is connected."*
2. **Audience dock** (`#audience-dock`) — sticky top bar with four audience tabs (Leaders / Nonprofits / Churches / Seminaries) and an "Informational ↔ Relational" field toggle. Drives copy accents in later stages via `data-tab` / `data-view`.
3. **`#fragmentation`** (Acts I–V) — a two-column pinned stage with six chapters on the right and a left-side sticky composite that cross-fades between artifact states (`a--unity`, `a--first-break`, `a--divergence`, `a--channels`, `a--misalignment`). Each chapter narrates one beat: *Unity → Session → First break → Divergence → Channels multiply → Misalignment*.
4. **`#scatter`** — pinned climax. 15 scattered WebP tiles (book, hub, covers, email, split flow, thread, chat, module, order-of-service, podcast, session card, sketch, stage) fly in from a single point, settle into their scatter positions, a veil + cost ledger fades on, then the climax copy resolves ("One intelligence. Many expressions.") with a primary-color flash.

Part II — the answer:

5. **`#bridge-part-two`** — transition band: *"We don't generate a new scene for each stage. We re-compose the same intelligence."*
6. **`#stage-integration`** — nodes arrange around a central hub with animated connection lines (SVG strokes drawing in on scrub).
7. **`#stage-activation`** — IDE-style workspace (file tree + editor + schema panel) showing the corpus as queryable, citation-ready content.
8. **`#stage-formation`** — pathway arc across five stops (Dissonance → Action → Reflection → Community → Local Embodied Practice) with a primary-colored trail drawing along the path on scroll.
9. **`#stage-multiplication`** — central "Platform" hub + six subscribing tenant clusters (Pro, Team, Starter, Enterprise, Pro, Enterprise) with logos, member counts, usage bars. **Now followed by a new infrastructure overlay** (`#multi-infra`) — four channels covering how the system spreads: Search & Discovery (ranked results), AI Response (grounded, cited), Translation (language variants), Peer Network (hub + node graph). Captions below the frame re-frame multiplication as three complementary forms: tenants, informational infrastructure, relational infrastructure.
10. **`#stage-movement`** — placeholder band for the forthcoming sixth-stage narrative (network effects in the field, ordination, sent communities).
11. **`#outro-cta`** — midnight CTA: *"You built the intelligence. Now give it a system."*

### Audience/field personalization

The audience dock persists across the entire page. It drives:

- Chapter paragraph accents in `#fragmentation` (8 audiences × 5 chapters × 2 fields of accent copy injected inline via script).
- Cost-ledger items in `#scatter` (4 audiences × 2 fields = 8 ledger sets).
- Snippet copy in `#stage-integration` (same matrix).

### Motion system

- GSAP 3.12 + ScrollTrigger, all pinned.
- Sticky-stage cross-fades use `onEnter` / `onEnterBack` on per-chapter triggers to toggle `is-active` classes.
- Scatter sequence is a single scrubbed timeline (`+=220%` end, `scrub: 0.85`) that animates 15 tiles from a common origin → their target `top/left/rotate/scale`, fades in a veil + cost ledger, fades cost out, flashes primary glow, resolves climax copy.
- Integration draws SVG lines (length-from-hypotenuse stroke-dasharray trick).
- Formation animates a path-length stroke-dashoffset along the SVG pathway and staggers stops in.
- Multiplication has no scrub animation; it's a static composition with decorative dashed SVG lines.
- All effects honor `prefers-reduced-motion: reduce`.

### Visual system

- Semantic tokens only (`--card`, `--section`, `--inverse-surface`, `--primary`, `--muted-foreground`, etc.) — DESIGN.md compliant.
- Midnight bands alternate with light bands for regional contrast.
- Imagery: the 14-file WebP library under `public/images/fragmentation-story/`.

### Strengths

- Editorial gravity — the long act-by-act narrative earns the climax.
- Audience switcher is a real content system: copy adapts meaningfully, not just cosmetically.
- Scatter climax is the most visually memorable moment in the repo.
- Newly-added infrastructure overlay makes multiplication dual-layered (organizational + informational + relational) without losing the tenant grid.

### Weaknesses / open threads

- Long. 4K+ lines of HTML/CSS/JS in one file; every change is a full-page diff.
- Multiplication still visually reads as "more stuff, same composition" — the *continuous transformation* intuition is not enforced.
- `#stage-movement` is a placeholder.
- No TypeScript types — every data change is manual in-script editing.

---

## 2. Approach B — `fragmentation-unified-system-mockup.html`

**1,008 lines. Single HTML file.** Conceptual redesign built to answer a specific critique of approach A: *stages should feel like the SAME artifact system reconfiguring, not five different scenes.*

### Design rule (mandatory)

> Reuse the same 13 artifacts across all five stages. Change only position, grouping, visibility, relationships, overlays, and motion behavior. Never introduce new scene images per stage.

### Artifact set (fixed across stages)

Seven informational artifacts:

1. **Book** — gradient spine card, "The Forgotten Ways · Alan Hirsch"
2. **Doc / PDF** — stacked-bar document with PDF badge
3. **Course module** — chip ("Module 03"), progress bar
4. **Framework diagram** — inline SVG hub-and-spoke
5. **Podcast tile** — radial gradient + waveform
6. **Video frame** — dark card with play button and timestamp
7. **Notes / sketch** — yellow sticky, Caveat-style font, bar-chart sketch

Six relational artifacts:

8. **Email thread** — from/subject/participant dots
9. **Chat** — three-bubble exchange
10. **CRM card** — avatar + name + tag
11. **Node A** / **Node B** — small ringed circles
12. **Node group** — larger filled circle with "+5"

All 13 objects share a unified design language (semantic tokens, shadow-ambient, rounded corners, Inter) so they read as peers, not as per-stage illustrations.

### Stage transformations (same objects, new states)

Each stage is expressed as a **layout object** — a map of artifact id → `{ x, y, r, s }` — applied by tweening CSS custom properties (`--ax`, `--ay`, `--ar`, `--as`) on the same DOM nodes.

| Stage | Layout | Overlays | Motion character |
|---|---|---|---|
| 1. Fragmentation | `FRAG` — scattered, rotated, independent | — | Slow per-artifact drift via yoyo tweens |
| 2. Integration | `INTEG` — two clusters (info left, rel right); connection lines drawn on SVG between each hub and its members, plus a dashed bridge between hubs | `#connections` paths fade in to `opacity: 0.55` | Smooth convergence, `power2.inOut` |
| 3. Activation | `ACTIV` — `course` scales up to the center (focus); others shrink and fade back | `#ui-layer` fades in (searchbar with blinking cursor, right-side context panel); `course` gets `is-focus` + `is-lit` | Focus transitions; no new objects |
| 4. Formation | `FORM` — artifacts arrange along a left→right pathway | `#pathway` SVG trail + moving marker (`left: 8% → 94%`); per-artifact `is-lit` class applied in sequence along a `pathOrder` | Sequential activation via scheduled `call()` |
| 5. Multiplication | `MULT` — system contracts to core; four echo clusters appear at field corners | `#echo` layer: Region · North, AI · Translated, SEO · Discovery, Network · Peer, plus dashed `echo-lines` showing cross-system connections | Outward replication, staggered scale-in |

### Implementation

- Single sticky canvas (`.stage-canvas`, `height: 100vh`) pinned over a 900vh `.story-track`.
- Five GSAP timelines, each bound to a `seg(a, b)` ScrollTrigger (`scrub: 0.6`) over successive 150vh segments.
- `setStageMeta(i)` fades the header eyebrow / title / caption out, swaps text, fades back in; updates progress dots.
- Transform order preserved via chained `translate(-50%, -50%) translate3d(var) rotate(var) scale(var)`.
- All motion is transform/opacity — no filters, no layout thrash.

### Strengths

- Makes the *one library, many arrangements* thesis visceral. You literally see the book move from the edge of fragmentation to its formation position without being replaced.
- Faster to grok than approach A — a single viewport tells the whole story.
- Cheap to extend: add a new layout object and a new scroll segment.
- Lightweight: ~1K lines, no images beyond inline SVG and gradients.

### Weaknesses / open threads

- No audience/field personalization.
- No production-grade copy — this is a shape study, not a narrative.
- Drops the scatter climax, cost ledger, and IDE-workspace moments that Approach A uses to earn emotional weight.
- The 13 artifacts are stand-ins (no real book covers, no real cohort names) — this is the mechanism, not the content.

---

## 3. Approach C — React production page

**Entry.** [`src/app/(site)/fragmentation/page.tsx`](../../../src/app/(site)/fragmentation/page.tsx) — 23 lines. Server component that reads `searchParams`, resolves defaults (`audience`, `field`), and renders `<FragmentationStoryPageContent />`.

### Component tree

```
fragmentation/page.tsx  (RSC, sets Metadata)
└── FragmentationStoryPageContent  (RSC — intro hero + Shell)
    └── FragmentationStoryShell  (CC — state: audience, field, activeChapter)
        ├── FragmentationStoryDock       — sticky tab bar + field toggle
        ├── FragmentationStoryActs       — Part I: acts I–V, sticky stage
        │   └── FragmentationStoryStageLayers  — cross-fading composites
        ├── FragmentationStoryScatter    — pinned scatter climax + cost ledger
        └── FragmentationStoryPartTwo    — Part II: integration → multiplication + outro
```

All data (chapter copy, audience accents, cost ledger, snippets, scatter tile positions, image paths) lives in a single pure-data module: [`fragmentation-story-content.ts`](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts) (532 lines). No runtime fetching; this is the canonical source of truth that the HTML mockup is modeled from.

### Client-side behavior

- `FragmentationStoryShell` owns `audience` / `field` / `activeChapter` state and mirrors the first two into the URL via `history.replaceState`. A `debug=1` query flag reveals an `aria-live="polite"` chapter indicator.
- `FragmentationStoryDock` is purely presentational — buttons call `onAudienceChange` / `onFieldChange`.
- `FragmentationStoryActs` only enables GSAP ScrollTriggers on desktop (`min-width: 64rem`) and non-reduced-motion; otherwise the layout flows normally. Triggers are `onEnter` / `onEnterBack` only, so the sticky stage updates the `active` ChapterId which drives the `StageLayers` cross-fade.
- `FragmentationStoryStageLayers` mounts all six chapter composites and toggles `.is-active` via comparison against `active` — all composites are always in the DOM, costs are at paint time.
- `FragmentationStoryScatter` runs one scrubbed timeline that mirrors approach A: tiles converge → settle → veil/cost → flash → climax.
- `FragmentationStoryPartTwo` runs two scrubbed timelines:
  - **Integration**: nodes fade+scale in, connection lines draw via stroke-dasharray.
  - **Formation**: pathway trail draws via `path.getTotalLength()`, stops stagger in.
- `MultiplicationNetwork` is static (no scrub) and matches approach A's tenant grid exactly (same six tenants: Pro/AM, Team/RC, Starter/HC, Enterprise/FI, Pro/GW, Enterprise/MF).

### Audience/field copy system

Copy personalization is centralized in `fragmentation-story-content.ts`:

- `baseChapters: ChapterDef[]` — six chapters, each with default paragraphs and optional `audienceParagraphs` per field.
- `informationalAccent` / `relationalAccent` — audience × chapter overrides that append one sentence to `paragraphs[0]`.
- `getChaptersFor(audience, field)` — resolves a chapter list with `resolvedParagraphs`.
- `getCostLedger(audience, field)` — returns the three-item ledger for scatter.
- `getClimaxCopy()` — constant.
- `getFullStorySnippet(audience, field)` — integration subtitle.
- `parseAudienceParam` / `parseFieldParam` — defensive URL-param parsers.
- `splitEmphasis(text)` — converts `**bold**` inline syntax into token list for JSX rendering.

### Design system integration

- `Section` / `Container` / `Display` / `Eyebrow` / `ArrowLink` primitives.
- `shadcn/ui` `Button` in CTA.
- `next/image` with `fill` + `sizes` on every artifact — proper responsive loading.
- Semantic tokens throughout (`text-inverse-foreground/55`, `bg-inverse-surface`, `ring-primary`, `text-muted-foreground`).
- `cn()` utility for conditional classes; no raw Tailwind color utilities except arbitrary opacity variants of semantic tokens.
- Tailwind v4 arbitrary values like `rounded-[var(--radius-md)]`, `tracking-eyebrow`.

### URL contract

`/(site)/fragmentation?audience=nonprofit&field=relational` is a stable, shareable permalink. `parseAudienceParam` / `parseFieldParam` enforce narrow types so any other query value falls back to defaults.

### Strengths

- Real production shape. Types, server rendering, progressive enhancement, accessibility (`sr-only` headings, `aria-live` indicators, `aria-labelledby` on sections, `aria-pressed` / `aria-selected` on tab buttons, motion-reduced fallbacks).
- Single pure-data module — changing copy is a one-file edit; no HTML/JS blending.
- Cleanly split client boundaries — layouts stay server-rendered.
- URL-synced audience/field makes personalized links possible.

### Weaknesses / open threads

- **Part II is now split** across `fragmentation-story-stage-*.tsx` files plus a small `fragmentation-story-part-two.tsx` orchestrator — the old “single 1,155-line file” debt is resolved.
- **Infrastructure multiplication overlay is ported** (SEO / AI / Translation / Peer-style relational infra) with informational + relational grouping; captions follow the three-layer framing (tenants + dual infra).
- `FragmentationStoryStageLayers` still mounts **six** simultaneous composites — fine today, but watch bundle/DOM cost if chapter count grows past ~10.
- **Multiplication motion:** React now runs a **scrubbed** timeline (diagram contract, spoke draw-in, infra cards, captions). Optional next step is richer **Approach B “echo geometry”** (corner clusters) if we want closer parity to the unified-system mockup’s spatial metaphor.
- **Mobile Part I** now ships **inline chapter figures** (`CHAPTER_INLINE` in `fragmentation-story-content.ts`) below `lg`, plus **IntersectionObserver** chapter sync when ScrollTrigger is off; sticky stage remains desktop-first by design.

---

## 4. Shared conceptual model

All three approaches agree on the **six named beats** of the operating story (fragmentation → integration → activation → formation → multiplication → movement) and on the dual-field (informational / relational) lens. They also share:

- **Semantic tokens only.** Midnight bands via `bg-inverse-surface` / `color: --inverse-foreground`; primary CTAs via `--primary` / `--primary-foreground`; no raw hex.
- **Artifact vocabulary.** Books, documents / covers, modules, podcasts, emails, threads, chat, hub diagrams, frameworks, people / nodes.
- **Motion discipline.** Transform + opacity only; scrub ScrollTrigger; respect `prefers-reduced-motion`.
- **One pathway, five stops.** Formation uses the same dissonance → action → reflection → community → local-practice arc in both A and C (B collapses it into a generic scrubbed pathway without the copy).
- **Central-hub multiplication.** Both A and C render a central Platform with six tenant satellites; A additionally renders four infrastructure channels; B renders four corner clusters.

---

## 5. Comparison matrix

| Dimension | A · Full-story HTML | B · Unified-system HTML | C · React production |
|---|---|---|---|
| Length | 4,066 lines | 1,008 lines | 23 + ~2,500 lines across 8 files |
| Stages covered | 6 (frag + 4 + movement placeholder) | 5 (frag → multiplication) | 6 (fragmentation acts + scatter + five Part II stages incl. movement network) |
| Audience switcher | Yes (4 audiences, persistent) | No | Yes (URL-synced) |
| Field toggle (info/rel) | Yes | No | Yes |
| Scatter climax | Full — 15 tiles, veil, cost ledger, flash | Implicit (Fragmentation stage) | Full — matches A |
| Integration viz | Hub + 8 connection lines, scrub draw | Two clusters (info/rel) + bridge, continuous | Hub + 8 lines, scrub draw |
| Activation viz | IDE panel (file tree + editor + schema) | Searchbar + context panel overlay | IDE panel (matches A) |
| Formation viz | Pathway arc, 5 named stops, trail draw | Generic pathway, sequential lit markers | Pathway arc, 5 named stops, trail draw |
| Multiplication viz | Tenant hub + 6 orgs **+ infra overlay (SEO/AI/Translation/Network)** | Core + 4 corner clusters w/ dashed cross-links | Tenant hub + 6 orgs **+ infra overlay** + **scrubbed** motion (contract → infra reveal) |
| Copy personalization matrix | 4 × 2 × 3 surfaces ≈ 24 accent strings | None | Same as A — via `fragmentation-story-content.ts` |
| Reduced-motion support | Yes | Yes | Yes |
| Data/markup separation | None (inline) | None (inline) | Pure-data module + components |
| Deploy target | Mockup only | Mockup only | `/(site)/fragmentation` |

---

## 6. Where the new "unified-system" multiplication lands

The critique that prompted Approach B — *"stages must feel like the same system reconfiguring, not five scenes"* — has been partially reconciled in A's multiplication stage:

1. **Organizational layer (unchanged).** Central platform + 6 tenants (Pro, Team, Starter, Enterprise, Pro, Enterprise).
2. **Informational infrastructure (new).** Three cards showing Search & Discovery (ranked SERP-style rows with a highlighted hit), AI Response (chip + grounded-answer lines), Translation (EN active, ES/PT/FR/KO/SW variants with a stacked-bar artifact).
3. **Relational infrastructure (new).** Peer Network card with a 5-node star + dashed edges.

This is additive — the tenant grid still reads first. To bring this parity into Approach C, the change set is:

- Extend `MultiplicationNetwork` (or add a sibling `MultiplicationInfrastructure` component) under `#stage-multiplication` in [`fragmentation-story-part-two.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-part-two.tsx).
- Replace the three "Tenants / Users compound / Network returns" caption cards with the three re-framed captions (Tenants, Informational infrastructure, Relational infrastructure) — same copy as lines 3139–3150 of the HTML file.
- No new data source needed; all content is constant.

---

## 7. Observations and recommendations

1. **A and C are the same narrative at different rendering levels.** C mirrors A beat-for-beat, with cleaner data separation and production safeguards. Approach B is a *thesis illustration*, not a production replacement.
2. **Approach B's mechanism is worth stealing back into C's multiplication stage specifically.** Multiplication is the only stage in A/C that doesn't dramatize continuous transformation — it's a static composition. Adopting B's *contract-and-echo* pattern (main system compresses, echo clusters grow at the edges) inside C's multiplication frame would be the single highest-leverage motion upgrade.
3. **`fragmentation-story-part-two.tsx` split is done** — keep new stage files as the edit surface; avoid re-aggregating giant JSX shells.
4. **Data module is the asset.** `fragmentation-story-content.ts` is what makes audience personalization maintainable. Any future stage (movement, local practice, sent communities) should land there first, not in JSX.
5. **Infrastructure multiplication port (A → C) is shipped** — keep captions + infra cards aligned with Approach A when HTML mockup copy changes; treat `MULTIPLICATION_COPY` as the source of truth.
6. **Approach B should not be deleted.** It is the clearest statement of the "one system, many arrangements" principle and is small enough to serve as a permanent reference for future pages (mechanism sections, homepage proofs, pricing explainers).

---

## 8. File reference

| Concern | Path |
|---|---|
| Full-story HTML mockup | [`docs/build/fragmentation-unified-full-story-mockup.html`](../fragmentation-unified-full-story-mockup.html) |
| Unified-system HTML mockup | [`docs/build/fragmentation-unified-system-mockup.html`](../fragmentation-unified-system-mockup.html) |
| Shared external stylesheet | [`docs/build/html/site-templates/site-theme.css`](../html/site-templates/site-theme.css) |
| Image library (14 WebPs) | [`public/images/fragmentation-story/`](../../../public/images/fragmentation-story/) |
| React route entry | [`src/app/(site)/fragmentation/page.tsx`](../../../src/app/(site)/fragmentation/page.tsx) |
| Page content shell (server) | [`src/components/sections/fragmentation-story/fragmentation-story-page-content.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-page-content.tsx) |
| Client shell (state) | [`src/components/sections/fragmentation-story/fragmentation-story-shell.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-shell.tsx) |
| Audience / field dock | [`src/components/sections/fragmentation-story/fragmentation-story-dock.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-dock.tsx) |
| Part I — acts & sticky stage | [`src/components/sections/fragmentation-story/fragmentation-story-acts.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-acts.tsx) |
| Sticky stage composites | [`src/components/sections/fragmentation-story/fragmentation-story-stage-layers.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-stage-layers.tsx) |
| Scatter climax | [`src/components/sections/fragmentation-story/fragmentation-story-scatter.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-scatter.tsx) |
| Part II — integration → CTA | [`src/components/sections/fragmentation-story/fragmentation-story-part-two.tsx`](../../../src/components/sections/fragmentation-story/fragmentation-story-part-two.tsx) |
| Pure-data content module | [`src/components/sections/fragmentation-story/fragmentation-story-content.ts`](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts) |
