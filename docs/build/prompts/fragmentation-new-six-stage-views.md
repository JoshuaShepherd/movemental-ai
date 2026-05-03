# Prompt — `/fragmentation-new` — six-stage views, no piece-by-piece Part I

## Purpose

Build a **parallel** route at `/fragmentation-new` that reuses the existing fragmentation story's **content, dock, intel artifacts, and Part II stages**, but collapses Part I (the per-chapter sticky scrub + the scatter pin) into a **single end-state "Fragmentation" stage view**. The result: **six stages, all shown as equal-rhythm panels**:

1. **Fragmentation** *(new — replaces the per-artifact scrub + scatter climax)*
2. **Integration** *(existing)*
3. **Activation** *(existing)*
4. **Formation** *(existing)*
5. **Multiplication** *(existing)*
6. **Movement** *(existing)*

The point of this parallel is to let reviewers compare two editorial choices side-by-side: the current piece-by-piece unfolding (`/fragmentation`) vs. the panelized "show me the end state, then how we re-compose it" version (`/fragmentation-new`). **Do not delete or modify `/fragmentation`.**

## Hard constraints

- **pnpm only.** No `npm` / `yarn`.
- **Reuse, do not fork, shared modules.** Do not duplicate `fragmentation-story-content.ts`, any `intel-artifacts/*`, `fragmentation-story-dock.tsx`, `fragmentation-story-wayfinding.tsx`, or the five existing Part II stage components. Import them.
- **Semantic tokens only.** `bg-inverse-surface`, `text-inverse-foreground`, `bg-section`, `bg-card`, `text-primary`, etc. No hex, no `bg-black`, no `text-gray-*`. Follow [docs/design/DESIGN.md](../design/DESIGN.md).
- **No 1px section borders, no drop shadows** — use tonal stacking (`bg-card` on `bg-section`). `shadow-ambient` only when true elevation is required.
- **Inter only** (already loaded in root layout). Display headings: `tracking-tight`. Eyebrows: uppercase + `tracking-eyebrow`.
- **Search-param contract unchanged.** `?audience=church|nonprofit|leader&field=informational|relational|both&nodes=20|40|80` — reuse `parseAudienceParam` / `parseFieldParam` / `parseNodeCountParam`.
- **Intel artifact purity.** Every visual is a registered React intel surface via `<FragmentationIntelArtifact slug={…} audience={…} field={…} embedded />`. No raster story art. No new slugs.
- **No new Drizzle schema, no new API routes, no new hooks.** This is a purely presentational route.
- **Turbopack-safe.** All GSAP / ScrollTrigger inside `useLayoutEffect` guarded by `typeof window !== "undefined"` and cleaned up with `gsap.context(...).revert()`, same shape as the existing stages.

## Files to create

```
src/app/(site)/fragmentation-new/
  page.tsx                                       # route shell, metadata
src/components/sections/fragmentation-story/
  fragmentation-story-new-shell.tsx              # dock + wayfinding + panel sequence
  fragmentation-story-stage-fragmentation.tsx    # NEW — the end-state Fragmentation panel
  fragmentation-story-new-part-two.tsx           # OPTIONAL wrapper that re-uses existing stages
```

Do **not** touch:

- `fragmentation-story-acts.tsx`
- `fragmentation-story-scatter.tsx`
- `fragmentation-story-stage-layers.tsx`
- `fragmentation-story-page-content.tsx`
- `fragmentation-story-shell.tsx`
- `fragmentation-story-part-two.tsx`

All reuse is via import.

## Route file — `src/app/(site)/fragmentation-new/page.tsx`

- Export `metadata` — title `"The fragmentation story — six views"`, description echoing "from a single view of fragmentation to movement, without rerunning the piece-by-piece break."
- Accept `searchParams: Promise<{ audience?: string; field?: string; nodes?: string }>` — same shape as `/fragmentation`.
- Await, parse via the three existing param parsers from `fragmentation-story-content.ts`, pass the three `initial*` values into `<FragmentationStoryNewShell />`.
- Wrap in `<main className="min-w-0 overflow-x-clip">`.
- Keep the same `<Section id="intro" variant="midnight" spacing="lg">` intro block as `/fragmentation`, but swap the lead paragraph to call out the editorial difference: "Part I used to unfold one artifact at a time. Here it is as one panel — the fragmented field, end state — so the eye can move straight into how it re-composes." Keep the two permalink examples (change them to `/fragmentation-new`).

## Shell — `fragmentation-story-new-shell.tsx`

Client component. Same state shape as `FragmentationStoryShell`:

```ts
const [audience, setAudience] = useState(initialAudience);
const [field, setField] = useState(initialField);
const [movementNodeCount, setMovementNodeCount] = useState(initialNodeCount);
const [activeChapter, setActiveChapter] = useState<ChapterId>("fragmentation");
```

Render order:

1. Sticky wrapper at `top-16 z-40` containing `<FragmentationStoryDock />` (reused) + `<FragmentationStoryWayfinding />` (reused). **Extend `ChapterId` only if necessary** — prefer passing a **synthetic active id** that wayfinding can treat as "Fragmentation" without schema changes. If wayfinding cannot accept a new id without edits, render a minimal local wayfinding strip that highlights the six stage labels (Fragmentation, Integration, Activation, Formation, Multiplication, Movement) and skip the reused component in this route only. Do not edit the shared wayfinding.
2. `<FragmentationStoryStageFragmentation audience field />` — the new panel (see below).
3. `<FragmentationStoryStageIntegration audience field />` (reused, unchanged).
4. `<FragmentationStoryStageActivation audience field />` (reused).
5. `<FragmentationStoryStageFormation audience field />` (reused).
6. `<FragmentationStoryStageMultiplication audience field />` (reused).
7. `<FragmentationStoryStageMovement audience nodeCount={movementNodeCount} onNodeCountChange={setMovementNodeCount} />` (reused).
8. `<FragmentationStoryOutroCta />` (reused).

URL sync `useEffect` that writes `audience`, `field`, `nodes` into `window.history.replaceState(...)` — copy from `FragmentationStoryShell`.

`IntersectionObserver` on each stage panel to drive `activeChapter` for the wayfinding, with the six canonical ids listed in the stage section below.

## New component — `fragmentation-story-stage-fragmentation.tsx`

This is the editorial thesis of the whole route: **one panel that says "this is what fragmentation looks like when you stop unpacking it."** It should read as the **same visual weight and rhythm** as `fragmentation-story-stage-integration.tsx` — a copy column on one side, an artifact composition on the other — not as a cinematic pin.

### Layout

- `<Section id="stage-fragmentation" variant="midnight" spacing="lg" className="scroll-mt-16">` — midnight band, matching the current acts section color.
- `<Container>` with a two-column grid at `lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12`.
- **Left column (copy):**
  - `<Eyebrow className="text-inverse-foreground/60">Stage 1 · Fragmentation</Eyebrow>`
  - `<Display as="h2" size="md" className="text-balance text-inverse-foreground">` with the headline "All of this belongs together. None of it is connected." (reuse from existing intro) **or** a variant pulled from `getClimaxCopy()` in `fragmentation-story-content.ts` — use the existing function, do not hand-write new copy.
  - A single paragraph (≤ 42ch max-width per line) pulled from the existing content module — prefer re-composing from `getFullStorySnippet("fragmentation")` if it exists; otherwise from the `climax.sub` string. If neither exists, pull the first paragraph of chapter `"misalignment"` via `getChaptersFor(audience, field)`.
  - A small "cost ledger" inline list rendered from `getCostLedger(audience, field)` — **reuse the existing function**, iterate its entries, render as a tight `<ul>` with `text-inverse-foreground/70`.
- **Right column (visual):**
  - A **static, unanimated** composite of the scattered field, derived from `getScatterTilesForAudience(audience)`. This is the key visual: **the end state of the current cinematic scatter, rendered as a single still panel.**
  - Container: `relative mx-auto aspect-[16/10] w-full max-w-xl` on desktop, `aspect-[10/16]` on mobile.
  - Iterate every tile from `getScatterTilesForAudience(audience)` and render it with the same positioning math as `ScatterTilesStatic` in `fragmentation-story-scatter.tsx` (`absolute`, `style={{ width: tile.w, top: tile.t, left: tile.l, transform: \`translate(-50%, -50%) rotate(${tile.rotate}deg) scale(${tile.s})\` }}`).
  - Wrap each tile's artifact in the standard shell: `relative isolate overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient`, `aspectRatio: tile.ar`, then `<FragmentationIntelArtifact slug={tile.slug} audience field variant="thumb" embedded aria-label="" />`.
  - **No scroll-linked animation, no GSAP timeline, no pin.** At most: a single one-shot fade-in via `motion.div` or CSS keyframe (500ms, `ease-out`) when the section enters the viewport. Respect `prefers-reduced-motion`.
- **Below the grid (full-width inside the container):**
  - A subtle caption line: "Every tile above is a live intel surface — same library the next five stages re-compose." Use `text-sm text-inverse-foreground/55`.

### Intelligence field behavior

- `field="informational"` → raise opacity of tiles whose slug is in the informational set (dim relational set to `opacity-60`). Derive the set from existing `fragmentation-story-content.ts` — there is already field-routing logic used by `getScatterTilesForAudience` / intel artifacts. Use it; do not invent new classification.
- `field="relational"` → inverse of above.
- `field="both"` → all tiles full opacity.
- Do not introduce new field logic outside what the existing content module already provides.

### Accessibility

- Stage heading is the only `<h2>` in this section (id `stage-fragmentation-heading`, referenced by `aria-labelledby` on the `<section>`).
- Cost ledger is a real `<ul>`.
- All artifacts pass `aria-label=""` and rely on the stage's prose for context (matches current pattern).
- The composite panel gets `role="img"` and `aria-label` equal to the stage's one-sentence sub-headline.

### Motion

- Entrance: a single `opacity 0 → 1, y 8 → 0` over 500ms once per viewport entry. Use `gsap` if it's already imported up-chain; otherwise prefer a CSS `@starting-style` or Tailwind animation.
- No scrub. No pin. No per-tile stagger — the editorial point is "one view."
- `prefers-reduced-motion: reduce` → skip the entrance animation entirely.

## Wayfinding / dock behavior

- Dock reused as-is. Audience, field selectors write back to the URL via the shell's `useEffect`.
- Wayfinding: if the shared component accepts a `"fragmentation"` chapter id, drive it from `IntersectionObserver` on each stage panel. If it does not, render a local 6-item strip in this route only — labels exactly: *Fragmentation · Integration · Activation · Formation · Multiplication · Movement*. Active state uses `text-primary` + an underline pseudo-element; inactive uses `text-inverse-foreground/55`. No hover motion beyond color transition.

## QA before handing off

Run and pass, in this order:

```
pnpm typecheck
pnpm lint
pnpm test:run          # new shell doesn't break any existing fragmentation spec
pnpm dev               # visit /fragmentation-new, then /fragmentation
```

Manual checks (dev):

- [ ] `/fragmentation-new` loads at `http://localhost:3000/fragmentation-new` with the same dock chrome.
- [ ] The **Fragmentation** stage renders the scatter field as a **single still composite** — no pin, no per-tile stagger, no scrub.
- [ ] Scrolling past Fragmentation lands directly on **Integration** (re-composition begins).
- [ ] All five existing stages render identically to `/fragmentation`.
- [ ] `?audience=nonprofit&field=relational&nodes=40` in the URL correctly hydrates the dock state.
- [ ] Changing audience / field in the dock updates the Fragmentation composite *and* the five re-composition stages.
- [ ] `prefers-reduced-motion: reduce` — no motion on the Fragmentation panel; re-composition stages still follow their existing reduced-motion behavior.
- [ ] DevTools → Lighthouse a11y ≥ 95 on the new route. No contrast failures. Keyboard focus ring is visible on dock controls over the midnight band.
- [ ] `pnpm build` succeeds; no new Turbopack warnings.

## Out of scope

- Any change to `/fragmentation` copy, layout, or choreography.
- Any new intel artifact slug.
- Any new audience or field value.
- Any Drizzle schema, API route, or hook work.
- Analytics event definitions — if the existing page already tracks chapter/stage views, let the parallel route emit the same events **only if it's a one-line reuse**; otherwise skip telemetry in this iteration and note it in the audit.
