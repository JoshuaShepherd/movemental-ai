# Prompt: Fragmentation Mockup (HTML) → React / Next.js / Tailwind Migration

> **How to run this:** Invoke with `@docs/build/prompts/fragmentation-html-to-react-migration.md`. Builds on the general rules in [stitch-to-react-migration.md](./stitch-to-react-migration.md) — read §2 (non-negotiables), §7 (translation table), and §11 (validation checklist) there first. This prompt narrows those rules to a single artifact: converting the unified fragmentation story mockup to a production React page with **1-to-1 correspondence**.

---

## 1. Mission

Convert the entirety of [docs/build/fragmentation-unified-full-story-mockup.html](../fragmentation-unified-full-story-mockup.html) (3,743 lines, 10 narrative sections) into the Next.js route at [src/app/(site)/fragmentation/page.tsx](../../../src/app/(site)/fragmentation/page.tsx) such that **every section, every chapter, every artifact, every caption, every interaction, and every copy string from the HTML is represented faithfully in React.** The existing React implementation under `src/components/sections/fragmentation-story/` is the starting point — extend, refactor, or rewrite it so the final page matches the HTML structure node-for-node.

### Source of truth ordering

1. Structural / copy truth → `docs/build/fragmentation-unified-full-story-mockup.html`
2. Token / design truth → `docs/design/DESIGN.md` + `src/app/globals.css`
3. Migration mechanics → [stitch-to-react-migration.md](./stitch-to-react-migration.md)

Where the HTML contradicts DESIGN.md (raw hex, hardcoded grays, 1px dividers), **DESIGN.md wins** — translate via the table in `stitch-to-react-migration.md §7`.

## 2. The ten sections (checklist)

Each HTML anchor id must appear in the rendered React output (either as the `id` on a `<Section>` wrapper or on the inner container). The page is read in this exact order:

| # | HTML anchor | HTML line range | Purpose |
|---|---|---|---|
| 1 | `#intro` | 2017–2035 | Midnight hero — "All of this belongs together. None of it is connected." |
| 2 | `#audience-dock` | 2037–2109 | Sticky dock: Leader/Nonprofit/Church/Seminary tabs + Informational/Relational rail |
| 3 | `#fragmentation` | 2112–2391 | Sticky left visual stage + right chapter column (Acts I–V) |
| 4 | `#scatter` | 2394–2480 | Pinned scatter field, radial flash, 14 artifact tiles, cost ledger, climax quote |
| 5 | `#bridge-part-two` | 2482–2498 | Bridge copy between Part One and Part Two |
| 6 | `#stage-integration` | 2500–2753 | Constellation of 8 artifacts + IDE/schema "under the hood" |
| 7 | `#stage-activation` | 2755–2864 | Workspace mock: query box, chat panel, AI answer with citations |
| 8 | `#stage-formation` | 2866–2953 | Pathway visualization: cohort → guided steps → outcomes |
| 9 | `#stage-multiplication` | 2955–3155 | Hub + subscribing orgs network diagram |
| 10 | `#stage-movement` | 3157–3170 | Placeholder midnight hold section |
| 11 | `#outro-cta` | 3172–3194 | Final CTA section |

Plus the fixed bottom debug bar (`#active-chapter`) — hidden in production, only visible when `?debug=1` query param is present.

## 3. Interaction parity

The HTML mockup ships with inline GSAP/ScrollTrigger (lines 3195+). The React port already uses plain React state for **audience** and **field** selection. Match these behaviors:

- **Audience tabs** (`data-tab="leader|nonprofit|church|seminary"`) — clicking updates the active audience. The active card swaps copy throughout Part One chapters and Part Two stage captions. The current React `FragmentationStoryDock` already does this; verify every copy string in [fragmentation-story-content.ts](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts) matches the four audience variants in the HTML.
- **Field rail** (`data-view="info|rel"`) — toggles between Informational and Relational framings. Swaps chapter titles and bodies.
- **Sticky chapter stage** — on viewports ≥ 64rem the left column pins while the right column scrolls through six `<article class="chapter" data-chapter="…">` entries. The chapter matching the nearest-viewport-center article becomes `.is-active` on the stage, and its slug is mirrored into the debug bar (`#active-chapter`).
- **Scatter pin** — the `#scatter` section pins while the flash, tile grid, veil, cost ledger, and climax cross-fade in sequence.
- **Stage captions** — each Part Two stage has a sticky caption column (`#integration-captions`, `#activation-captions`, etc.). Current React implementation must render every caption.
- **URL state** — `?audience=…&field=…` query params seed initial state (already handled in `parseAudienceParam` / `parseFieldParam`). Changes update `history.replaceState` so deep-links survive.

Animations implemented via GSAP in the mockup can be reimplemented with pure CSS + IntersectionObserver (or with `gsap` imported into a client component). Don't install GSAP just for this task — the existing implementation has enough motion without it. If an animation is load-bearing for comprehension (scatter flash, cost veil), reimplement it with `IntersectionObserver` + CSS keyframes.

## 4. Execution protocol

### 4a. Inventory pass (audit)

Before editing anything, build a spreadsheet-in-your-head of every copy string, image, and structural element in the HTML, then cross-check against the existing React components:

```
src/components/sections/fragmentation-story/
  fragmentation-story-page-content.tsx   # intro
  fragmentation-story-shell.tsx          # client wrapper
  fragmentation-story-dock.tsx           # #audience-dock
  fragmentation-story-acts.tsx           # #fragmentation (acts I–V)
  fragmentation-story-stage-layers.tsx   # left sticky stage artifacts
  fragmentation-story-scatter.tsx        # #scatter
  fragmentation-story-part-two.tsx       # #bridge-part-two through #outro-cta
  fragmentation-story-content.ts         # copy + asset paths
```

Produce a gap list in this format:

```
[MISSING]  integration-ide file tree — not rendered anywhere
[MISMATCH] scatter-cost-ledger — HTML has 6 items, React has 4
[OK]       intro hero copy — matches HTML verbatim
```

Do this first. No edits until the gap list exists.

### 4b. Close the gaps

For each `[MISSING]` or `[MISMATCH]` entry, edit the relevant React file (or add a new one under `src/components/sections/fragmentation-story/`). Keep the section anchor ids intact so deep-links keep working.

### 4c. Image paths

HTML references images as `../../public/images/fragmentation-story/<slug>.webp`. React must use `/images/fragmentation-story/<slug>.webp` (Next.js serves `public/` at the root). Wrap every `<img>` in `next/image` with explicit `width`/`height` or `fill` + a sized parent.

### 4d. Token translation

Apply the [§7 table from stitch-to-react-migration.md](./stitch-to-react-migration.md) mechanically. The HTML's inline `<style>` block already uses semantic CSS vars (`--inverse-surface`, `--muted-foreground`, etc.) that match `globals.css`, so most class translation is 1:1. Watch for:

- `background: var(--inverse-surface)` → `<Section variant="midnight">` (already in primitives)
- `color: color-mix(in srgb, var(--inverse-foreground) 80%, transparent)` → `text-inverse-foreground/80`
- `color: color-mix(in srgb, var(--inverse-foreground) 55%, transparent)` → `text-inverse-foreground/60` (nearest Tailwind opacity)
- Inline `clamp(…)` sizes → match against DESIGN.md typography scale before inlining; prefer `Display size="…"` / `text-2xl`/`text-3xl` variants

### 4e. Semantic structure

- Use `<Section>`, `<Container>`, `<Display>`, `<Eyebrow>`, `<Prose>` primitives — no raw `<div class="container">`.
- Use `<Button>` from shadcn for every `.cta-button`.
- Images → `next/image`.
- `role="tab"` / `aria-selected` / `aria-pressed` — preserve every a11y attribute from the HTML.

## 5. Validation — strict 1-to-1 check

After edits, run this protocol:

```bash
pnpm typecheck                # must pass
pnpm lint                     # must pass
pnpm build                    # must complete
```

Then produce a **Correspondence Report** in your final summary with one row per section in the §2 table:

```
Section           HTML copy strings   React copy strings   Status
#intro            2                    2                    OK
#audience-dock    4 + 2                4 + 2                OK
#fragmentation    5 acts × N bodies    5 acts × N bodies    OK
…
```

Any status other than OK must be called out explicitly. A section where the React version **paraphrases** the HTML does not pass — copy must match verbatim (modulo curly-quote/ASCII normalization).

Check these specific verbatim strings are present somewhere in `src/components/sections/fragmentation-story/**`:

- "All of this belongs together. None of it is connected."
- "One surface. One sequence."
- "Designed to be whole."
- "The same thing—twice."
- "A book. A module. A cover. A PDF."
- "Now it lives, in real time, in parallel."
- "The thread loses the plot."
- "All of it, all at once."
- The six `.scatter__cost-ledger` items (HTML lines 2456–2464)
- The integration stage caption titles and bodies (HTML lines 2559–2578)
- The activation stage mock query: "How do we frame formation for a bi-vocational team?"
- The multiplication subscribing-org labels (HTML lines 2991–3129)

Grep for each string; if any is absent, add it.

## 6. Definition of done

- [ ] Every section id from §2 is present in the rendered `/fragmentation` route, in the correct order.
- [ ] Every verbatim string from §5 can be `grep`-ed in `src/components/sections/fragmentation-story/**`.
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm build` all pass.
- [ ] The Correspondence Report is included in the final summary, one row per section, all rows OK.
- [ ] No raw hex outside `globals.css`; no `bg-white`/`bg-black`/`text-gray-*`; no decorative `border`.
- [ ] Every image uses `next/image` with a valid `/images/fragmentation-story/<slug>.webp` source.
- [ ] `?audience=…&field=…` query params still seed initial state.
- [ ] The route renders under `pnpm dev` with zero console errors.

Until all checkboxes are ticked, the conversion is not done.
