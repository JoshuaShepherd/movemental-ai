# Audit — `/fragmentation-new` — six-stage trajectory

Companion to [docs/build/prompts/fragmentation-new-six-stage-views.md](../prompts/fragmentation-new-six-stage-views.md). This is a linear, segment-by-segment walkthrough of what the parallel route renders, what data feeds each segment, how the two intelligence fields (informational / relational) are depicted, and where the behavior differs from `/fragmentation`. The purpose is to **let us review the logic and revise what is actually being depicted** before committing the code.

Every data reference below points to an existing export in
[src/components/sections/fragmentation-story/fragmentation-story-content.ts](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts).
Every artifact reference is a registered React intel surface — no raster art.

---

## Editorial thesis

`/fragmentation` unfolds Part I piece by piece: six chapters, each scrubs an artifact into view over a sticky stage, ending in a pinned scatter "climax." It's cinematic, but reviewers lose the through-line because they're busy parsing each beat.

`/fragmentation-new` collapses Part I into **one still panel** — the end state of the scatter, audience- and field-filtered — and then spends the rest of the page on the **same five re-composition stages** (`Integration → Activation → Formation → Multiplication → Movement`). The six stages become **peer panels**, each with its own copy column + visual column, so the argument reads as: *here is the fragmented field · here is how it re-composes · five times · ending in movement.*

---

## Route + state contract

- **Route file:** `src/app/(site)/fragmentation-new/page.tsx`
- **Search params (identical to `/fragmentation`):**
  - `audience ∈ { "leader", "nonprofit", "church", "institution" }` — default from `parseAudienceParam`
  - `field ∈ { "informational", "relational" }` — default from `parseFieldParam`
  - `nodes ∈ { 20, 40, 80 }` — default from `parseNodeCountParam`
- **State (client shell):** `audience`, `field`, `movementNodeCount`, `activeChapter` — same shape as `FragmentationStoryShell`, with `activeChapter` drawn from a six-item set: `"fragmentation" | "integration" | "activation" | "formation" | "multiplication" | "movement"`.
- **URL sync:** `history.replaceState` on dock changes, lifted from `FragmentationStoryShell`.

---

## Section 0 — Intro band

- Component: inline in `page.tsx`, reusing `<Section variant="midnight" spacing="lg">` + `<Container>` + `<Eyebrow>` + `<Display>`.
- Content: same headline as `/fragmentation` ("All of this belongs together. None of it is connected."), but the lead paragraph calls out the editorial difference — one panel for fragmentation, then five re-composition stages.
- Two example permalinks point at `/fragmentation-new` (not `/fragmentation`), preserving the audience / field / density examples.
- Intelligence depiction: **neutral.** Both fields acknowledged ("informational … relational"), neither emphasized.

---

## Section 1 — Stage: **Fragmentation** *(new)*

### Component

`src/components/sections/fragmentation-story/fragmentation-story-stage-fragmentation.tsx` — new.

### Layout

- `<Section id="stage-fragmentation" variant="midnight" spacing="lg">` — same midnight tone as the current acts band. Keeps the continuity of "fragmentation lives in the dark, re-composition lives in the light."
- `<Container>` with `grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12`.
- **Left column — copy:**
  - Eyebrow: `Stage 1 · Fragmentation`
  - Display heading: pulled from `getClimaxCopy()` — specifically `climax.titleBefore + climax.titleEmphasis` so the wording stays in one source.
  - Lead paragraph: `climax.sub`.
  - Cost ledger: `<ul>` rendered from `getCostLedger(audience, field)`. Each item uses `text-inverse-foreground/70` and a small `•` bullet.
- **Right column — visual:**
  - Container: `relative mx-auto aspect-[16/10] w-full max-w-xl` (desktop) / `aspect-[10/16]` (< md).
  - Tiles: `getScatterTilesForAudience(audience)` → iterate every tile, render at its `top/left/rotate/scale` (same math as `ScatterTilesStatic`), with the tile's intel slug routed through `<FragmentationIntelArtifact slug audience field variant="thumb" embedded />`.
  - **No scroll-linked animation.** One-shot 500ms entrance fade on viewport intersection; `prefers-reduced-motion: reduce` skips it entirely.
- Caption below the grid: "Every tile above is a live intel surface — same library the next five stages re-compose."

### Data flow

| Element | Source |
| --- | --- |
| Headline | `getClimaxCopy()` → `{ titleBefore, titleEmphasis }` |
| Lead paragraph | `getClimaxCopy()` → `sub` |
| Cost ledger | `getCostLedger(audience, field)` |
| Scatter composite | `getScatterTilesForAudience(audience)` → `ScatterTile[]` |
| Each tile's visual | `<FragmentationIntelArtifact slug={tile.slug} audience field variant="thumb" embedded />` |

### Intelligence depiction

- `field="informational"` — tiles whose classification is informational stay at `opacity-100`; the rest dim to `opacity-60`. The classification comes from the existing intel artifact's field routing — do **not** duplicate it here.
- `field="relational"` — mirror of above.
- `field="both"` — all tiles at full opacity.
- Copy never changes by field at this stage; only the *emphasis* of the composite does. This matches how `/fragmentation` already behaves in Part I.

### Behavior delta vs `/fragmentation`

| Aspect | `/fragmentation` | `/fragmentation-new` |
| --- | --- | --- |
| Per-chapter scrub | Yes — six chapters with sticky-stage layers | **Removed** |
| Scatter pin | Yes — tall track, pinned viewport | **Removed** — scatter rendered as a static composite |
| Climax panel | Full-viewport climax with cost ledger, scale-in | **Inlined into this single panel's copy column** |
| Visual weight | Two sticky acts (`acts` + `scatter`) | One peer panel, same rhythm as the next five stages |

### Review questions (what we need to pressure-test)

1. Does the still composite convey "fragmented" strongly enough without motion?
2. Is `climax.sub` actually the right opening paragraph, or should we author a new one specifically for this panel?
3. Should the cost ledger live on the left (current plan) or beneath the composite on the right?
4. Do we want any subtle, non-scrub motion — a slow rotational drift on tiles, for instance — or is truly still the editorial win?

---

## Section 2 — Stage: **Integration** *(reused)*

### Component

`fragmentation-story-stage-integration.tsx` — imported, unchanged. Driven by `INTEGRATION_COPY` + `getFullStorySnippet(audience, field)`.

### What it depicts

- Scattered artifacts from Stage 1 are pulled into a **single structured grid** ("the library") — same intel slugs, re-positioned into a node layout, with a highlight ring on the focus artifact.
- The scrubbed GSAP timeline brings opacity from `0.4 → 1.0` on each node as the viewport enters. This is a *beneficial* scrub (per-node) because it mirrors the act of re-composition.

### Intelligence depiction

- `field="informational"` — the library's text-like slugs (curriculum, documents, frameworks) take the highlight.
- `field="relational"` — the stakeholder / thread / community slugs take the highlight.
- Copy swap comes from `getFullStorySnippet(audience, field)` — one paragraph varies per audience × field (4 × 2 = 8 variants).

### Review questions

1. Does Integration read as the *direct inverse* of the new Stage 1 composite, or should we tighten the visual echo (same tiles in same positions, animating into their grid cells)?

---

## Section 3 — Stage: **Activation** *(reused)*

### Component

`fragmentation-story-stage-activation.tsx` — imported, unchanged. Driven by `ACTIVATION_COPY`.

### What it depicts

- The integrated library becomes **usable** — artifacts gain surfaces (a session card, a thread, a dashboard) that show intelligence *in motion*, not just organized.

### Intelligence depiction

- Informational: artifacts ship as reading, briefings, and structured sessions.
- Relational: artifacts ship as threads, chairs, and living introductions.
- `ACTIVATION_COPY` currently encodes this split — verify by reading lines 607–627 of the content module before changing.

### Review questions

1. Is the Activation visual currently doing enough to signal "in use" vs Integration's "arranged"? (Not a `/fragmentation-new` question, but the parallel route will make any weakness more obvious.)

---

## Section 4 — Stage: **Formation** *(reused)*

### Component

`fragmentation-story-stage-formation.tsx` — imported, unchanged. Driven by `FORMATION_COPY` + (relational branch) `FORMATION_RELATIONAL_STOPS`.

### What it depicts

- The library now **forms people** — a learner arc for informational formation, and a stops-along-the-way journey for relational formation.

### Intelligence depiction

- **Most asymmetric stage.** Informational shows a linear curriculum progression; relational shows `FORMATION_RELATIONAL_STOPS` (coaches, chapters, reviews). Two different visualizations in one component, switched by `field`.

### Review questions

1. The relational variant runs noticeably longer than the informational variant. Acceptable, or do we tighten?

---

## Section 5 — Stage: **Multiplication** *(reused)*

### Component

`fragmentation-story-stage-multiplication.tsx` — imported, unchanged. Driven by `MULTIPLICATION_COPY`, `getMultiplicationEcosystem(audience)`, `MULTIPLICATION_INFRA`.

### What it depicts

- The formed people + library **reproduce through infrastructure** — orbits, credibility edges, and named infra channels.
- Shows the shift from "this org runs a program" to "this org runs a network."

### Intelligence depiction

- `InfraChannel.kind ∈ { "informational", "relational" }` — `MULTIPLICATION_INFRA` is pre-classified. Field selection raises the matching channels and dims the others.
- Orbit nodes come from `MULTIPLICATION_ORBIT_NODES[audience]` (via the ecosystem helper); they represent *who* gets multiplied, regardless of field.

### Review questions

1. Are orbit + infra both pulling weight, or should the parallel route surface one more than the other to keep visual parity with the new Stage 1?

---

## Section 6 — Stage: **Movement** *(reused)*

### Component

`fragmentation-story-stage-movement.tsx` — imported, unchanged. Driven by `getMovementCopy(audience)` + `getMovementNetwork(audience, nodeCount)`.

### What it depicts

- The terminal frame: **platforms as a field.** A live network graph (nodes = orgs / leaders / seeds / expansions, edges = real links), scaled by the `nodes` dock control (20 / 40 / 80).
- This is the only stage where the density dock matters.

### Intelligence depiction

- Movement is **field-neutral by design** — the argument is that a mature system meets as *one* field, regardless of which kind of intelligence started the work. No `field` filter is applied here; only audience shapes the network, per `MOVEMENT_NODES[audience]`.

### Review questions

1. The choice to drop field at Movement is editorial. Do we want a subtle tint (informational-leaning vs relational-leaning nodes) to keep the two-field story alive through the final frame?

---

## Section 7 — Outro CTA *(reused)*

`fragmentation-story-outro-cta.tsx` — imported, unchanged. No new behavior. Links to `/apply` / `/contact` / `/assess` as today.

---

## Dock + wayfinding behavior

- **Dock:** reused as-is. Same audience + field controls. URL sync via the shell's `useEffect`.
- **Wayfinding:** six labels (Fragmentation · Integration · Activation · Formation · Multiplication · Movement). If the shared `FragmentationStoryWayfinding` accepts a `"fragmentation"` chapter id, we drive it. If not, we render a local six-item strip only on this route.
- **Chapter detection:** `IntersectionObserver` on each stage's root `<section>`, mirroring the mobile fallback pattern in `fragmentation-story-acts.tsx`.

---

## Not affected

- `/fragmentation` — untouched.
- `fragmentation-story-acts.tsx`, `fragmentation-story-scatter.tsx`, `fragmentation-story-stage-layers.tsx` — untouched.
- Drizzle schema, services, API routes, hooks — untouched. This is a presentational parallel.
- Intel artifact registry — no new slugs.
- Analytics — no new events in this iteration (noted in the prompt as deferred).

---

## Open questions for review

1. **Color band rhythm.** Stage 1 stays midnight; Stages 2–6 inherit their existing backgrounds (some `section`, some `inverse-surface` within their own internal bands). Do we want a consistent **light-after-midnight** break to make the "re-composition" flip visible, or keep each stage's own current tone?
2. **Stage 1 copy source.** `climax.sub` was written for the end of a cinematic pin. Does it read well as the *opening* paragraph of a still panel, or do we need a fresh string in `fragmentation-story-content.ts`?
3. **Cost ledger placement.** Left column (with the copy) or under the composite (on the right)? Trade-off: left keeps the panel clean; right creates a "receipt" pattern under the scatter.
4. **Tile dimming strength.** `opacity-60` for off-field tiles is the current plan — verify that's strong enough to read as "deprioritized" without reading as "broken."
5. **Entrance motion.** Single fade only, or add a very slight tile-level y-drift (≤ 8px) to give the still composite a breath? Must remain non-scrub.
6. **Wayfinding label.** Should the first label read *Fragmentation* or *The fragmented field* for clarity against the other five gerund-ish labels?
7. **Movement field-neutrality.** Is dropping the field filter at Movement the right final beat, or should we keep a faint field-leaning tint to preserve the two-intelligence argument all the way to the end?

---

## Change log

- **2026-04-15** — Initial audit. Paired with [docs/build/prompts/fragmentation-new-six-stage-views.md](../prompts/fragmentation-new-six-stage-views.md). No code written yet.
- **2026-04-15 (rev 2)** — Revised per review feedback before implementation. Corrections below supersede any conflicting guidance earlier in this document.

---

## Revision addendum (rev 2)

### 1. Stage 1 — Fragmentation must be felt, not read

- **Phased reveal, not static.** Each scatter tile is tagged with a `phase ∈ { 1, 2, 3 }` in the new `fragmentation-artifact-map.ts` registry.
  - Phase 1 — *"At first, it held together…"* — 4 tiles, clustered top-left (book, hub, coverP, coverS).
  - Phase 2 — *"Then it spread…"* — 5 tiles, middle band (email, split, thread, chat, module).
  - Phase 3 — *"Now it looks like this."* — 5 tiles, bottom + edges (order, podcast, session, sketch, stage).
- Each phase fades in as a group (≈ 450ms, `ease-out`) when the panel enters the viewport, on a single intersection trigger — **no scrub, no pin**. Captions crossfade in sync.
- `prefers-reduced-motion: reduce` → all three phases render at opacity 1 immediately and the captions shortcut to "Now it looks like this."

### 2. Continuity — shared artifact registry

- `fragmentation-artifact-map.ts` exports:
  - `ARTIFACT_IDS` — stable `string` id per scatter slug.
  - `ARTIFACT_META[id]` — `{ slug, phase, kind: "informational" | "relational" | "both" }`.
  - `getScatterFrame(audience)` — positions keyed by id (derived from `getScatterTilesForAudience`).
  - `getIntegrationFrame()` — target grid positions keyed by id (a simple 4×4 normalized grid for the continuity hint strip).
- Initial implementation uses the registry for:
  - Stage 1's 3-wave reveal.
  - A **"Carry forward"** strip rendered between Stage 1 and Stage 2 — a horizontal ribbon of the same 14 artifact thumbnails, captioned "These fourteen don't disappear. They re-compose." — the visual bridge into `FragmentationStoryStageIntegration` (which continues to own its IDE-panel visualization internally).
- Deeper spatial-interpolation continuity (the exact scatter → grid transform) is deferred to a follow-up pass; it would require rewriting `stage-integration`, which is out of scope per the "reuse, do not fork" rule.

### 3. Activation — aliveness

- New `fragmentation-story-stage-activation-new.tsx` wraps the reused `FragmentationStoryStageActivation` with a **lightweight "live query" card** above it.
- The card simulates one interaction every 4 seconds: a typed question appears ("Who taught the `fragments-of-form` intro last time?") → a 700ms typing-dot pause → a retrieved artifact card slides in with a name + date. Uses Framer Motion `AnimatePresence`. Respects reduced motion (static state).
- Copy framing: *"The library answers."*

### 4. Formation — asymmetry preserved and named

- New `fragmentation-story-stage-formation-new.tsx` prepends a 2-line callout band above the reused `FragmentationStoryStageFormation`:
  > *Information can be structured.*
  > *Formation requires relationship.*
- No visual normalization of the two branches — the relational branch continues to run longer because that's the truth the callout names.

### 5. Movement — dual encoding, not field-drop

- New `fragmentation-story-stage-movement-new.tsx` prepends a **dual-encoding legend** above the reused `FragmentationStoryStageMovement`:
  - *Edges* → relational intelligence (trust, reporting, succession).
  - *Node density* → informational intelligence (corpus carried by that entity).
  - *Tint* → kind emphasis (faint primary for informational-leaning, faint accent for relational-leaning).
- The legend is a semantic `<dl>` with three `<dt>/<dd>` pairs, no animation. The reused movement viz below is unchanged — the legend alone repositions it as "convergence of intelligences" instead of "abstraction."

### 6. Transformation, not replacement

- The carry-forward strip between every pair of stages is the durable signal that artifacts persist. Minimal implementation: one strip between Stage 1 and Stage 2 (where the break is most pronounced). Subsequent stages already reuse intel slugs internally.

### Files finalized

| File | Status |
| --- | --- |
| `src/app/(site)/fragmentation-new/page.tsx` | new |
| `src/components/sections/fragmentation-story/fragmentation-artifact-map.ts` | new |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-fragmentation.tsx` | new |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-activation-new.tsx` | new (wraps reused) |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-formation-new.tsx` | new (wraps reused) |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-movement-new.tsx` | new (wraps reused) |
| `src/components/sections/fragmentation-story/fragmentation-story-new-wayfinding.tsx` | new |
| `src/components/sections/fragmentation-story/fragmentation-story-new-shell.tsx` | new |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-integration.tsx` | reused, untouched |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-multiplication.tsx` | reused, untouched |
| `src/app/(site)/fragmentation/**` | untouched |
