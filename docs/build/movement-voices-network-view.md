# Movement Voices: from horizontal carousel to interactive network view

This document is a **build playbook** for replacing the home credibility band’s horizontal voice carousel with an **on-design, interactive network** that showcases **relational scenius** (many leaders, shared threads of practice) using **avatar-forward** nodes.

It assumes the current implementation:

- Carousel: `src/components/sections-mock/home/voices-carousel.tsx` (`VoiceCarousel`)
- Data + usage: `src/components/sections-mock/home/credibility-fold.tsx` (`VOICES` + `<VoiceCarousel … />`)
- Existing graph stack in-repo: **Graphology** + **Sigma.js** (`src/lib/knowledge-graph/sigmaGraph.ts`, `src/components/marketing/knowledge-graph/FieldNetworkView.tsx`)
- **D3** is available as `d3` v7 (includes **d3-force** and scales); **@xyflow/react** is also in `package.json` for flow-style UIs.

---

## 1. Do we use D3?

**Partially — depends on what you optimize for.**

| Approach | Best when | In this repo |
|----------|-----------|--------------|
| **D3-force (+ SVG or canvas)** | Full control over avatars as DOM/SVG, modest node counts (~8–40), custom physics | `d3` is already installed; you import `forceSimulation`, `forceLink`, etc., from `"d3"` |
| **Graphology + Sigma** | Larger / denser graphs, smooth pan/zoom, WebGL performance, same pattern as `FieldNetworkView` | Already used for field-scale graphs; extend layouts + node rendering for images |
| **@xyflow/react** | Fast path: each node is a React component (e.g. `next/image` avatar), built-in drag/pan/minimap | Already imported for `SystemLayerFlow.tsx`-style marketing diagrams |

**Recommendation for this homepage band:** Prefer **React Flow** *or* **Sigma + image nodes** over raw D3-only SVG **if** you want polished avatars with minimal low-level rendering work. Use **D3-force** as the **layout engine** (positions) regardless: compute `x,y` once, then feed **React Flow** or **Sigma**.

**Do not** default to “D3 for everything in the DOM” without considering accessibility (see §6) and performance on mobile.

---

## 2. Product + narrative constraints (before implementation)

1. **Scenius, not directory** — The graph should read as *shared field*, not a flat roster. Edges or a light central structuring idea (e.g. thematic pillars, “formation / mission / place”) beat random dots.
2. **Canon** — Public copy stays aligned with [movement-leaders-as-ecosystem-layer](./strategy/movement-leaders-as-ecosystem-layer.md): trusted voices are an **ecosystem layer**, not a fourth audience card. Avoid recruiting CTAs in this band.
3. **Design tokens** — Follow `docs/design/DESIGN.md`: semantic surfaces (`bg-card`, `bg-section`, `border-border`, `text-foreground` / `text-muted-foreground`), **no** raw hex in components, minimal hard borders; depth via tonal stacking.

---

## 3. Data model (upgrade from `CarouselVoice`)

Today each voice is:

```ts
// voices-carousel.tsx — CarouselVoice
{ name, title, initials, imageSrc }
```

For a network you need:

- **`id`** — Stable key (slug), e.g. `alan-hirsch`
- **`imageSrc`** — Same `/images/voices/*.webp` paths as today
- **Edges** — At minimum one of:
  - **Star / hub** — Lightweight invisible or faint links to 1–3 abstract “theme” nodes (formation, missional practice, stewardship) *or* a single soft central attractor
  - **Pairwise** — Curated co-activation (same movement stream, shared publication, fellowship) — **only** if you can maintain it
  - **Synthetic proximity** — No semantic edge: use **force** clustering by tags (still honest if tags are real)

Store edges in the same file as voices or a small `voices-graph.ts` module exported to both carousel (legacy) and network until the carousel is removed.

---

## 4. Step-by-step implementation

### Phase A — Replace the surface area

1. **Create** `MovementVoicesNetwork.tsx` (name as you prefer) under `src/components/sections-mock/home/` (or `src/components/marketing/` if reused).
2. **Copy the header row** pattern from `VoiceCarousel` (eyebrow “Movement Voices”, optional reset/fit button) so the section doesn’t lose rhythm.
3. In `credibility-fold.tsx`, **swap** `<VoiceCarousel voices={VOICES} … />` for `<MovementVoicesNetwork voices={VOICES} graph={…} />`.
4. Keep **`VOICES`** as the single source of leader metadata until you move to CMS/DB.

### Phase B — Layout (D3-force)

1. **Install nothing** if you use `import { forceSimulation, forceManyBody, forceLink, forceCollide, forceCenter } from "d3"`.
2. Build a **`SimulationNode`** type: `id`, `x`, `y`, `vx`, `vy`, plus UI fields (`name`, `imageSrc`, …).
3. Initialize nodes in a **rough circle** or **small random jitter** inside `[0,1]` or pixel box so the simulation converges fast.
4. Add **forces**:
   - `forceLink` for edges (strength tuned low so the graph breathes)
   - `forceManyBody` (negative charge = repel)
   - `forceCollide` with radius from avatar size so circles don’t overlap
   - `forceCenter` to keep the cluster in view
5. **Tick** the simulation until `alpha < 0.01` (or fixed iterations), then **fix positions** for deterministic SSR/hydration **or** run only in `useEffect` on the client (recommended for graphs).
6. **Normalize** coordinates to your container width/height with `d3-scale` (`scaleLinear`) so the graph scales on resize.

### Phase C — Rendering choice

**Option 1 — React Flow (fastest avatar quality)**

1. Wrap the graph in `<ReactFlow nodes={…} edges={…}>` with `nodeTypes` mapping each leader to a card: `next/image` in a circle (`rounded-full`, `ring-1 ring-border`, object-cover).
2. Set `nodesDraggable={false}` or `true` depending on whether drag adds delight or friction.
3. Use **frozen layout**: set `position: { x, y }` from the D3-force output × your scale.
4. Provide **minimap** / **controls** only if they match DESIGN.md minimalism (often a single “Reset view” is enough).

**Option 2 — Sigma + Graphology (aligns with `FieldNetworkView`)**

1. Extend **`knowledgeGraphToSigma`** patterns or add **`voicesToSigmaGraph(voices, edges)`** in `src/lib/knowledge-graph/` (or a dedicated `lib/voices-graph/` if you want separation from knowledge graphs).
2. Assign **precomputed** `x`, `y` from D3-force (Sigma expects graph coordinates).
3. For **avatars**, use Sigma’s **image node** approach (see Sigma v3 docs: custom node program or built-in image rendering). Preload images to avoid pop-in; fallback to initials on `onerror` (mirror carousel behavior conceptually).
4. Reuse lifecycle from `FieldNetworkView`: dynamic `import("sigma")`, `ResizeObserver`, **`sigma.kill()`** on unmount.

**Option 3 — SVG + D3 only**

1. One `<svg>` with `<defs>` clipPaths for circular avatars; `<image href={…} />` per node.
2. Draw faint `<line>` edges below nodes.
3. Attach pointer handlers for hover/focus. Most work is **a11y** and **resize** handling.

### Phase D — Interaction

1. **Hover** — Show name + title in a **panel** beside the graph (like `GraphDetailPanel`) or a **floating tooltip** that respects `prefers-reduced-motion`.
2. **Click** — Optional: link to `/voices` anchor or individual voice route **if** it exists and matches IA; otherwise keep click = focus/highlight only.
3. **Pan/zoom** — React Flow: built-in. Sigma: built-in. SVG: consider skipping pinch-zoom on mobile or use a light d3-zoom on the `<svg>` root.

### Phase E — Visual polish (on-design)

1. **Canvas container** — `rounded-xl` or `rounded-md`, `bg-card` on `bg-section`, **optional** `shadow-ambient` only if the section needs lift (DESIGN.md allows `shadow-ambient` sparingly).
2. **Edges** — Low-contrast strokes: use `currentColor` with opacity via CSS variable semantics, e.g. `text-muted-foreground` at ~15–20% effective stroke, **not** random grays.
3. **Avatar size** — Balance between “readable face” and density; on mobile, fewer visible labels — rely on hover/focus detail.
4. **Motion** — If the simulation runs in view, respect **`prefers-reduced-motion`**: skip simulation animation; use final positions only.

---

## 5. Cleanup

1. Remove `VoiceCarousel` import from `credibility-fold.tsx` when fully replaced.
2. If `VoiceCarousel` is unused elsewhere, delete `voices-carousel.tsx` or keep it briefly behind a feature flag during QA.
3. Add a **smoke test** or Playwright check that the credibility section mounts without console errors and that voice names appear in the **accessible** tree (see below).

---

## 6. Accessibility (non-negotiable)

1. The graph canvas is often **`role="img"`** with **`aria-label`** describing the whole scenius visualization, **or** expose **focusable** nodes in the DOM (React Flow makes this easier than raw WebGL).
2. Provide a **linear fallback**: a simple list of names + titles below the fold or toggled “List view” for screen readers and keyboard users.
3. **Keyboard**: tab to each voice if using DOM nodes; if not, offer arrow-key navigation or skip link to the list fallback.
4. **Contrast** for any labels drawn on the canvas — pull ink from tokens (`--foreground`, `--muted-foreground`), not ad hoc grey.

---

## 7. Verification checklist

- [ ] Resize: graph reflows or rescales (ResizeObserver / React Flow `fitView` / Sigma `resize`).
- [ ] No flash of wrong layout on hydration (client-only graph or stable SSR placeholder).
- [ ] Images optimized: `next/image` where using DOM; preloaded paths for Sigma.
- [ ] `pnpm lint` + `pnpm typecheck` clean.
- [ ] Narrative review: still “ecosystem proof,” not funnel recruitment.

---

## 8. Reference files in this repo

| File | Relevance |
|------|-----------|
| `src/components/sections-mock/home/voices-carousel.tsx` | Current carousel UI to replace |
| `src/components/sections-mock/home/credibility-fold.tsx` | `VOICES` data + insertion point |
| `src/components/marketing/knowledge-graph/FieldNetworkView.tsx` | Sigma lifecycle, detail panel pattern |
| `src/lib/knowledge-graph/sigmaGraph.ts` | Graphology → Sigma, layout ideas |
| `src/components/marketing/knowledge-graph/SystemLayerFlow.tsx` | React Flow usage reference |
| `docs/design/DESIGN.md` | Visual law for surfaces, type, motion |

---

## Summary

- **D3** is the right tool for **layout** (`d3-force`) and **scales**; it is usually **not** the whole UI layer unless you choose SVG.
- For **avatar-first** marketing polish with less rendering risk, prefer **D3-force + React Flow** or **D3-force + Sigma** alongside existing dependencies.
- Replace **`VoiceCarousel`** at **`credibility-fold.tsx`**, extend data with **`id` + edges**, and hold the narrative bar: **scenius**, **trusted voices**, **design tokens**, **accessible fallback**.
