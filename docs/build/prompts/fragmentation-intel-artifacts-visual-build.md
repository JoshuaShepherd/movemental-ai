# Fragmentation story — intel-artifact React components: visual build & wire-in

> **Goal.** Make the existing [`src/components/intel-artifacts/`](../../../src/components/intel-artifacts/) library look *exactly* like the artifacts called for in the fragmentation narrative — both the **seven informational** and **six relational** intelligence artifacts from Approach B, plus the **14 narrative slugs** already pinned 1:1 to `public/images/fragmentation-story/*.webp`. Then replace every `<Image src="/images/fragmentation-story/…">` in the `/(site)/fragmentation` tree with the registered component, so the page tells the story from *designed UI* instead of raster art.
>
> **Not a mandate.** This is a step-by-step build prompt. Read it top to bottom before opening any file. Every step has a scope, inputs, and a visible acceptance check.

---

## 0. Authoritative references (read in this order)

1. [`docs/design/DESIGN.md`](../design/DESIGN.md) — tonal stacking, semantic tokens, no raw hex, no 1px section borders, `shadow-ambient` only.
2. [`docs/build/audit/fragmentation-story-approaches-audit.md`](../audit/fragmentation-story-approaches-audit.md) — the three approaches (A full-story HTML, B unified-system HTML, C React production) and their divergent artifact vocabularies.
3. [`docs/build/prompts/fragmentation-intelligence-artifacts-component-spec.md`](./fragmentation-intelligence-artifacts-component-spec.md) — the original contract for `.intel-view` / `iv-*` primitives and the 14 narrative + 6 operational slugs.
4. [`docs/build/fragmentation-sticky-mockup-css.html`](../fragmentation-sticky-mockup-css.html) — **visual source of truth** for each narrative slug. Lines 3220–3545 contain the `ART` lookup with the canonical HTML template per slug. Your React components must read like direct ports.
5. [`docs/build/fragmentation-unified-system-mockup.html`](../fragmentation-unified-system-mockup.html) — source of the *two families* language (7 informational + 6 relational artifacts sharing one design system).
6. [`docs/build/fragmentation-unified-full-story-mockup.html`](../fragmentation-unified-full-story-mockup.html) — narrative placements (scatter tiles, constellation nodes, IDE thumbs, pathway cards, tenant logos).

> **Current state to keep in mind.** The `intel-artifacts/` folder already ships 14 narrative React components and 6 operational ones, each with `field: "info" | "rel"` variants. They compile and render. They do **not** yet cover the full "unified-system" relational vocabulary (CRM card, node / node-group primitives, generic doc, video frame), and they are **not wired** into `src/components/sections/fragmentation-story/*`. This prompt closes both gaps.

---

## 1. Mental model: two families, one design system

The fragmentation story is built on two **peer** families of artifacts. Keep them visually indistinguishable in treatment (same radius, same tokens, same ambient shadow), but narratively distinct in their role:

| Family | Purpose in narrative | Canonical members |
|---|---|---|
| **Informational intelligence artifacts** | Where the *content* lives: books, modules, covers, docs, podcasts, videos, notes. The stuff leaders author. | `book-fragments-of-form`, `module-formal-systems-intro`, `cover-principles-design-fragmentation`, `cover-structural-fragments-investigation`, `podcast-card-abstract-structures`, `session-essential-structures-card`, `order-of-service-structured-units`, `sketch-converge-diverge-flow`, `stage-presentation-three-shapes`, **NEW:** `doc-pdf-generic`, `video-frame-timestamped`, `notes-sticky-sketch` |
| **Relational intelligence artifacts** | Where the *people* live: threads, conversations, cohorts, peers. The stuff that connects the content to humans. | `email-thread-multi-participant`, `mobile-chat-skeleton-bubbles`, `message-thread-staggered-fragments`, `core-hub-to-fragment-nodes`, `formal-design-systems-split-flow`, **NEW:** `crm-person-card`, `node-single`, `node-group` |

**Rule.** Every component exposes `field: "info" | "rel"`. Switching `field` must visibly change **at least two distinct cues** per component (per spec §1.4) — not just recolor a chip. The Approach B thesis ("one library, many arrangements") works only if the *same* artifact re-stages convincingly on both fields.

---

## 2. Scope of work (the step-by-step)

There are **eight** steps, executed roughly top-down. Each ends with a visible acceptance test.

### Step 1 — Inventory gap analysis

**Goal.** Produce a written table comparing the current registry to what the story needs.

**Inputs.**
- `src/components/intel-artifacts/types.ts` — existing slugs.
- `docs/build/fragmentation-unified-system-mockup.html` lines ~60–210 (the 13-artifact `.artifact` set) — Approach B vocabulary.
- `docs/build/fragmentation-sticky-mockup-css.html` lines 3220–3545 — ART templates with informational-first styling.
- `src/components/sections/fragmentation-story/fragmentation-story-content.ts` lines 31–47 — the `IMG` map driving `<Image>` placements today.

**Do.**
1. List the **14 narrative slugs** already registered. Mark each as `COVERED`.
2. Against the Approach B relational vocabulary, identify missing primitives:
   - `crm-person-card` — avatar + name skeleton + tag (used as person affordance).
   - `node-single` — a ringed circle with optional label. (Primitive, not a full card — see Step 3.)
   - `node-group` — a filled circle with `+N` badge.
3. Against the Approach B informational vocabulary, identify missing *generic* forms:
   - `doc-pdf-generic` — stacked-bar document with `PDF` badge (separate from the two covers).
   - `video-frame-timestamped` — dark-surface card with play triangle and timestamp chip.
   - `notes-sticky-sketch` — yellow-tinted sticky with bar-chart doodle (Caveat-style optional; tracking only).
4. Output the result in `docs/build/audit/fragmentation-intel-artifacts-gap.md` as a single table: slug, status (`covered` / `new`), family, narrative role, insertion points.

**Acceptance.** The gap doc exists and is referenced from this build prompt's Changelog (Step 8).

---

### Step 2 — Extend shared primitives

**Goal.** The `iv-*` primitive set is solid but thin; add the missing atomics the new components will need, and level up two existing ones.

**Files to edit.**
- [`src/components/intel-artifacts/primitives.tsx`](../../../src/components/intel-artifacts/primitives.tsx)

**Add:**

1. **`IvNode`** — a circle vertex. Props: `size: "xs" | "sm" | "md"`, `tone: "outline" | "filled" | "primary"`, `label?: string`. Renders as a `<span>` with ringed border (`ring-1 ring-border`) or `bg-primary`. Used directly in relational compositions and inside the new `node-single` / `node-group` components.
2. **`IvNodeGroup`** — `IvNode` + absolutely positioned `+N` badge in primary. Props: `count: number`, `tone?`.
3. **`IvPdfBadge`** — a 24×14 pill reading `PDF` in `text-[0.55rem]` uppercase, `bg-muted`, `text-muted-foreground`, `ring-1 ring-border`.
4. **`IvPlayGlyph`** — an inline SVG triangle (right-pointing), sized in `cqw`, fill `bg-primary` on a dark circle. For video frame components.
5. **`IvSticky`** — a wrapper that applies a warm tint via `bg-[color-mix(in_srgb,var(--primary)_6%,var(--card))]` (no raw yellow; stay in semantic-token bounds) and a very slight `-rotate-1`. For sticky notes.

**Level up:**

6. **`IvBar`** — today takes `widthPct` and snaps to 5% steps. Add an optional `height?: "xs" | "sm" | "md" | "lg"` so callers stop spraying `className="h-2.5"` all over. Keep existing API.
7. **`IvAvatar`** — today accepts `initials`. Add optional `size?: "sm" | "md"` and `unread?: boolean` (renders the `-top-0.5 -right-0.5 size-1.5 bg-primary rounded-full` dot seen in the email template). This collapses three places that currently re-implement it inline.

**Tokens.**
- Keep the existing color-mix usage. Do not introduce new `bg-*` utility names.
- All new primitives must honor `prefers-reduced-motion` (no shimmer on the `IvPlayGlyph`, etc.).

**Acceptance.** `pnpm typecheck` passes. No component outside `primitives.tsx` imports Tailwind arbitrary values for anything these primitives now own.

---

### Step 3 — Build the 6 new components (3 informational, 3 relational)

**Goal.** Fill the Approach B vocabulary gap identified in Step 1. Each file lands in the existing `narrative-artifacts.tsx` (*not* a new file) so the registry is one import.

**Conventions (mandatory, same as existing members).**
- Functional component, props typed as `IntelArtifactBaseProps`.
- First child is `<IntelView field={field} variant={variant} …>`.
- `embedded` support (for when nested inside another labeled component).
- `variant === "thumb"` **must** render — at minimum collapse multi-row content to a single line + eyebrow.
- `aria-label` defaulted to a sentence describing the artifact.
- `data-field` toggle changes **≥2** decisions (not just color).

#### 3.1 `doc-pdf-generic` (informational)

- **Aspect.** 4 / 5 default, 1 / 1 for `thumb`.
- **Structure.** `IvEyebrow` "Brief · 6 pages" → `IvBar widthPct={80}` title → `IvRule` → column of five faint bars (body paragraph skeleton) → footer row: `IvPdfBadge` + "v3 · Mar" chip.
- **Info cues.** Page-count chip; tiny TOC bars on the right edge.
- **Rel cues.** Reviewer avatar stack below the footer; "comments · 4" chip.

#### 3.2 `video-frame-timestamped` (informational)

- **Aspect.** 16 / 9.
- **Structure.** Inset frame `absolute inset-[6%]` with `bg-inverse-surface` and a centered `IvPlayGlyph`. Bottom strip: timestamp chip (`04:12`), progress bar at 38%.
- **Info cues.** `Chapters · 7` chip in the top-left; resolution chip bottom-right.
- **Rel cues.** Right-rail avatar stack of "watching now"; comment bubble glyph overlay bottom-left.

#### 3.3 `notes-sticky-sketch` (informational)

- **Aspect.** 1 / 1.
- **Structure.** `IvSticky` wrapper. Title line (`IvBar widthPct={50}`), 3 wavy skeleton bars, inline micro-bar-chart (5 bars of varying `%` heights, the 3rd is `bg-primary`).
- **Info cues.** "Field notes" eyebrow, date stamp chip.
- **Rel cues.** Initials chip "— D.R." bottom-right; two reaction dots.

#### 3.4 `crm-person-card` (relational)

- **Aspect.** 4 / 5.
- **Structure.** Horizontal row: `IvAvatar size="md"` → column with name bar (`widthPct={70}`) + role bar (`widthPct={45}`, faint). Tag row: 2–3 `IvChip` (`Pastor`, `Cohort 4`). `IvRule`. Meter: "relationship warmth" at 72% (renders as `IvMeter`).
- **Info cues.** Labels like `Role`, `Tenure · 4y`.
- **Rel cues.** Last-touch timeline (3 dots with decreasing opacity), "Warm intro pending" `IvChip accent`.

#### 3.5 `node-single` (relational)

- **Aspect.** 1 / 1 (used at small sizes — it's a chip-like token, not a card).
- **Structure.** One `IvNode size="md"` centered with optional label. Used at `variant="tile"` inside constellation compositions.
- **Info cues.** Ring tone; label reads identifier (e.g. `A-12`).
- **Rel cues.** Filled dot; label reads a name initial.

#### 3.6 `node-group` (relational)

- **Aspect.** 1 / 1.
- **Structure.** `IvNodeGroup count={5}` centered.
- **Info cues.** "cluster · 5" chip below.
- **Rel cues.** Inner mini avatars peeking from the group disc.

**Register each.** Extend [`src/components/intel-artifacts/types.ts`](../../../src/components/intel-artifacts/types.ts) — append to `NARRATIVE_INTEL_SLUGS` in this order so the story stays readable:

```ts
"doc-pdf-generic",
"video-frame-timestamped",
"notes-sticky-sketch",
"crm-person-card",
"node-single",
"node-group",
```

Update [`registry.tsx`](../../../src/components/intel-artifacts/registry.tsx) and [`index.ts`](../../../src/components/intel-artifacts/index.ts) to re-export them.

**Acceptance.** Typecheck passes. Each new slug appears in the QA gallery (Step 5).

---

### Step 4 — Raise the visual fidelity of the existing 14 narrative components

**Goal.** Close the visual delta between [`narrative-artifacts.tsx`](../../../src/components/intel-artifacts/narrative-artifacts.tsx) and the ART templates in [`fragmentation-sticky-mockup-css.html`](../fragmentation-sticky-mockup-css.html) (lines 3220–3545). Current React versions are correct in shape but several are *looser* than the HTML reference.

Per-slug checks — execute each as an Edit with an acceptance screenshot:

1. **`order-of-service-structured-units`** — ART template puts the title bar (`.ca-b.xl.w80`) **above** the rule. Current React hides it under a `!dense` guard (`narrative-artifacts.tsx` line 41). Make the title bar visible in `full` *and* `tile` variants (only omit in `thumb`).
2. **`session-essential-structures-card`** — ART template uses `Session 04` + `45 min` chip. Current React matches. Verify spacing: the 4-row step list should have `gap: clamp(0.25rem, 2.5cqw, 0.5rem)` equivalent — our `IvCol gap-2` reads correctly, but the ROW gap of `8px` feels tight; switch to `gap-2.5`.
3. **`formal-design-systems-split-flow`** — currently draws only three output circles without the short connector stubs into the right edge (`x=135 → x=150` in the ART SVG). Add them; they read as "…and this keeps going."
4. **`book-fragments-of-form`** — title "A formation primer" eyebrow is warm (primary) in ART; already warm in React. But the React version lacks the ISBN-row strong bar (`.ca-b.sm.w40`) that ART renders above the ISBN chip. Add an `IvBar widthPct={40} faint` *before* the `IvRule` in info variant.
5. **`module-formal-systems-intro`** — square `.ca-thumb` in ART is a rounded *image placeholder*; React renders it as a plain muted square. Tint it with the primary cover art gradient: `bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_25%,var(--card))_0%,var(--card)_100%)]`. Same rule as the podcast cover art.
6. **`cover-principles-design-fragmentation`** — React omits the ART's three-promise-bullets row in info field. Add: below the title bars, three bullet rows each as `IvRow { tiny IvNode tone="outline" size="xs" + IvBar widthPct=[85, 70, 60] faint }`. Spec §3 calls for "three promise bullets."
7. **`cover-structural-fragments-investigation`** — matches. Verify the `stage` bars' last item uses `bg-primary` (ART highlights the 4th bar); React already does (`i === 3 && "bg-primary"`). OK.
8. **`podcast-card-abstract-structures`** — React sins by using `aria-hidden` square cover art with no gradient. Tint via the same cover-art rule as the module, but **radial**: `bg-[radial-gradient(120%_80%_at_30%_30%,color-mix(in_srgb,var(--primary)_30%,var(--card))_0%,var(--card)_70%)]`.
9. **`mobile-chat-skeleton-bubbles`** — matches ART closely. Add the **typing-indicator bubble** (3 dots) that ART renders as the fifth bubble — currently collapsed. `<div class="ca-bubble in" style="width:…"><ca-dot/>×3`.
10. **`email-thread-multi-participant`** — matches. Audit: in `rel` the `To/CC` chip should sit *in the header row* (next to the subject), not at the bottom. Per ART this reads as "institutional drift" metadata. Move it.
11. **`message-thread-staggered-fragments`** — ART rotates staggered posts by tenths of a degree (`rotate(-0.5deg)`). React uses `-rotate-1` / `rotate-1` — doubled. Tone it down with inline `style` or add Tailwind arbitrary `[transform:rotate(-0.3deg)]`. The ART feels "barely off"; the React feels "wobbly".
12. **`core-hub-to-fragment-nodes`** — matches closely. In `rel`, add a small CSS-animated pulse on one edge (a thin `<line>` with `stroke-dasharray` animating via `motion-safe:animate-[latency_2s_infinite]`). Defer if GSAP is not in scope for this component.
13. **`sketch-converge-diverge-flow`** — ART has small arrow glyphs at each right-node path end (`<path d="M 78 28 L 82 30 L 80 34"/>`). React omits them. Add the three glyphs so "diverge" is explicit.
14. **`stage-presentation-three-shapes`** — screen inset in React is `bottom-[28%]`; ART uses `bottom-[36%]`. The React version feels too-tall-too-thin. Swap to `bottom-[36%]` and set a `top-[6%]`.

**Acceptance.** Visual diff the gallery page (Step 5) against a screenshot of the sticky mockup ART pane. Deltas are intentional only; no accidental divergence.

---

### Step 5 — QA gallery page

**Goal.** A single route that renders every slug × field × variant, so visual QA does not require scrolling the fragmentation page.

**Path.** `src/app/(site)/system/intel-artifacts/page.tsx` (nested under the existing `(site)/system/` design-system preview area).

**Structure.**
- Eyebrow: "Intel artifacts · QA gallery".
- Section: **Narrative (informational variants)** — 14 + 3 new informational slugs rendered with `field="info"`, variant `full`. Title each card with its slug in `font-mono text-xs`.
- Section: **Narrative (relational variants)** — same set with `field="rel"`.
- Section: **Operational** — 6 operational surfaces × both fields.
- Section: **Variants** — `full` vs `thumb` vs `tile` for `book-fragments-of-form`, `session-essential-structures-card`, `email-thread-multi-participant`, and one operational (`intel-seo-surface`). This is the CLS check — thumbs must not crop or overflow at the spec's aspect ratios.

Use the existing `Section` / `Container` primitives. Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.

**Acceptance.**
- `pnpm dev`, navigate to `/system/intel-artifacts`.
- Confirm: zero visual regressions, zero console warnings, zero CLS when resizing to mobile.
- Confirm: every component's `data-field` toggle visibly changes ≥2 decisions (hover-toggle a `rel`/`info` switch on the gallery page for fast comparison).

---

### Step 6 — Wire components into `/(site)/fragmentation`

**Goal.** Replace every `<Image src={IMG.…}>` inside `src/components/sections/fragmentation-story/*` with the matching `IntelNarrativeArtifact slug="…"`. This is the highest-impact part of the work.

**Inputs.**
- `src/components/sections/fragmentation-story/fragmentation-story-content.ts` — the `IMG` map.
- `src/components/sections/fragmentation-story/fragmentation-story-stage-layers.tsx` — sticky-stage composites.
- `src/components/sections/fragmentation-story/fragmentation-story-scatter.tsx` — scatter tiles.
- `src/components/sections/fragmentation-story/fragmentation-story-stage-integration.tsx` — IDE file rows, constellation nodes.
- `src/components/sections/fragmentation-story/fragmentation-story-stage-activation.tsx` — workspace thumbs.
- `src/components/sections/fragmentation-story/fragmentation-story-stage-formation.tsx` — pathway cards.
- `src/components/sections/fragmentation-story/fragmentation-story-stage-multiplication.tsx` — tenant logos (**do not** replace these — per Approach A, tenant logos stay abstract).
- `src/components/sections/fragmentation-story/fragmentation-story-acts.tsx` — inline chapter images.

**Slug map** (derived from `fragmentation-story-content.ts` lines 31–46):

| `IMG` key | Slug |
|---|---|
| `orderOfService` | `order-of-service-structured-units` |
| `sessionCard` | `session-essential-structures-card` |
| `splitFlow` | `formal-design-systems-split-flow` |
| `book` | `book-fragments-of-form` |
| `module` | `module-formal-systems-intro` |
| `coverPrinciples` | `cover-principles-design-fragmentation` |
| `coverStructural` | `cover-structural-fragments-investigation` |
| `podcast` | `podcast-card-abstract-structures` |
| `chat` | `mobile-chat-skeleton-bubbles` |
| `email` | `email-thread-multi-participant` |
| `thread` | `message-thread-staggered-fragments` |
| `hub` | `core-hub-to-fragment-nodes` |
| `sketch` | `sketch-converge-diverge-flow` |
| `stage` | `stage-presentation-three-shapes` |

**Field propagation.** Each fragmentation component already owns (or receives) the `field: IntelField` from `FragmentationStoryShell`. Thread it through. `IntelNarrativeArtifact` already defaults to `info`, so *read current field* at each call site rather than hardcoding.

**Variant choice.**
- Scatter tiles: `variant="tile"`.
- IDE thumbs: `variant="thumb"`.
- Constellation nodes (integration + workspace): `variant="thumb"`.
- Sticky-stage composites, scatter *primary* card, pathway-stop card, activation center: `variant="full"`.

**Aspect ratio.** Remove every inline `aspect-[…]` override on the wrapper once the artifact renders — the component's `IntelView` already sets it. Keep `aspect-*` only on absolute-positioned *parent frames* the story uses (scatter tile frame, IDE thumb wrapper).

**Replacement recipe (for each site):**

```tsx
// before
<Image src={IMG.book} alt="" fill className="object-cover" sizes="128px" />

// after
import { IntelNarrativeArtifact } from "@/components/intel-artifacts";
<IntelNarrativeArtifact slug="book-fragments-of-form" field={field} variant="thumb" embedded />
```

For elements that previously had a meaningful `alt`, **preserve accessibility**: if the parent already labels the illustration (`aria-labelledby`, heading above, etc.), pass `embedded` so the artifact becomes `aria-hidden`. If it was the *only* text for the image, pass `aria-label` with the old alt.

**Do not delete `IMG` yet.** Leave the map and the `.webp` files on disk for one release; feature-flag the cutover via a local boolean `const USE_COMPONENT_ARTIFACTS = true` at the top of `fragmentation-story-content.ts`. Only Step 8 deletes images.

**Acceptance.**
- Scroll the `/fragmentation` route at desktop and mobile.
- The scatter climax, pinned sticky stage, integration hub, activation workspace, formation pathway, and multiplication tenant grid all render without any broken images.
- Audience and field toggles *still* update the artifacts — bounce through all four audiences × both fields on every stage.
- Lighthouse: zero CLS regressions. Payload reduction ~80–150 KB depending on tile count.

---

### Step 7 — Storyboard refinements (per stage, per field)

**Goal.** Now that artifacts are components, tune *which* artifact appears *where*, with what field. Formerly impossible when every slot was a fixed image.

**Acts I–V (sticky stage) — `fragmentation-story-stage-layers.tsx`:**

- Chapter 1 "Unity" — `order-of-service-structured-units` (info). No change.
- Chapter 2 "Session" — `session-essential-structures-card`. When audience is `church`, set `field="rel"` so the facilitator row reads. For `seminary`, keep `info` (prerequisite / cohort median chip).
- Chapter 3 "First break" — `formal-design-systems-split-flow`. When `field === "rel"`, show the ghost "v2 in Slack" avatar already implemented — *unhide it* (current CSS has it conditionally but the parent composite doesn't toggle).
- Chapter 4 "Divergence" — add `cover-principles-design-fragmentation` next to the existing `module`. Compose a **two-card stack** (primary card + 40% scaled ghost offset `translate(8%, 8%) rotate(2deg)`).
- Chapter 5 "Channels multiply" — compose `podcast-card-abstract-structures` + `mobile-chat-skeleton-bubbles` + new `video-frame-timestamped`. The *new* video frame fills the "broadcast" slot that the HTML sticky mockup only implies.
- Chapter 6 "Misalignment" — `email-thread-multi-participant` + `message-thread-staggered-fragments` + new `crm-person-card`. The CRM card is the rel-field accent, showing "relationship warmth" decaying in parallel with the thread's misalignment.

**Scatter climax — `fragmentation-story-scatter.tsx`:**

The 15-tile list in `fragmentation-story-content.ts` currently names 13 assets. Add two tiles — `doc-pdf-generic` and `notes-sticky-sketch` — at positions near the outer ring so the scatter still reads as "messy plurality" without feeling staged. Keep the same origin-point converge animation.

**Integration (IDE + constellation) — `fragmentation-story-stage-integration.tsx`:**

- IDE file rows: each entry currently pairs a filename with a thumb image. Keep filenames; swap thumbs to `variant="thumb"` of the existing slug. Two rows still read as generic "md" — use `doc-pdf-generic` for those so the file tree has at least one *actually-PDF* row.
- Constellation: each node around the hub is one artifact. Today we render 8 nodes pointing to image thumbs. Replace with `IntelNarrativeArtifact variant="thumb" field={field}`. Add one `node-group` between two tight clusters to read "peer network" — this is the Approach B relational accent landing in Approach A's composition.

**Activation (workspace) — `fragmentation-story-stage-activation.tsx`:**

- Left file panel: a column of `variant="thumb"` artifacts.
- Center query/response: leave as-is (this is the *agent work surface*, not an artifact card).
- Right citations: instead of images, render a vertical list of `variant="tile"` artifacts — the answer literally cites *these* documents.
- (Optional, Step-8 follow-up.) Swap the bottom-third of the response panel for `IntelOperationalArtifact slug="intel-ai-agent-workpack"` so the activation frame shows both "corpus" and "agent boundary." Per spec §9.

**Formation (pathway) — `fragmentation-story-stage-formation.tsx`:**

- Each of the five stops (Dissonance → Action → Reflection → Community → Local Practice) is a `pathway-stop-card` composition. Today each card renders an image. Swap to artifacts:
  - Dissonance → `message-thread-staggered-fragments` (`field="rel"`).
  - Action → `module-formal-systems-intro` (`field="info"`).
  - Reflection → `notes-sticky-sketch` (`field="info"`).
  - Community → `crm-person-card` (`field="rel"`).
  - Local Practice → `stage-presentation-three-shapes` (`field="info"` for seminary; `field="rel"` for church).

**Multiplication — `fragmentation-story-stage-multiplication.tsx`:**

- Tenant logos stay abstract per Approach A — do **not** replace.
- **Port the infrastructure overlay** from Approach A (§6 of the audit): three cards — `intel-seo-surface`, `intel-ai-agent-workpack` (grounded response), `intel-translation-stack`. Plus one peer-network card composed of `node-single` × 5 and `node-group` × 1 on a dashed SVG star. Use `IntelOperationalArtifact` for the three; compose the peer-network card manually.
- Re-caption the three strip-cards under the frame: "Tenants" / "Informational infrastructure" / "Relational infrastructure" (from audit §6).

**Outro CTA — `fragmentation-story-outro-cta.tsx`:**

No artifact changes. Leave.

**Acceptance.** Record a full-page scroll capture with audience `leader`+`info`, then `nonprofit`+`rel`. The story should feel like the *same artifacts* recomposing through the stages — not five different scenes.

---

### Step 8 — Cleanup & cutover

**Goal.** Remove the flag, delete the .webp images, update docs.

**Do.**
1. Delete the `USE_COMPONENT_ARTIFACTS` flag from `fragmentation-story-content.ts`.
2. Remove the `IMG` map. Grep for any stragglers (`fragmentation-story/`) and swap them.
3. Delete `public/images/fragmentation-story/*.webp`. (14 files.) Keep one combined export in `public/images/fragmentation-story/_archive/` if marketing wants social cards, with a README noting "superseded by React intel-artifacts."
4. Add a Storybook story per slug under `src/components/intel-artifacts/*.stories.tsx` *if* Storybook is already configured in this repo; otherwise defer.
5. Update `docs/build/audit/fragmentation-story-approaches-audit.md` §7.5 to mark the A → C infrastructure port as complete.
6. Update the Changelog section of this file (below).

**Acceptance.**
- `pnpm build` passes.
- `pnpm typecheck` passes.
- `grep -r "fragmentation-story/" src/ public/` returns empty.
- `/fragmentation` renders identically to the HTML full-story mockup at all audience/field combinations.

---

## 3. Field-and-audience matrix (copy/props contract)

Every component already takes `field` and optional `audience`. Copy variance rule — mirror `fragmentation-unified-narrative.js`:

- `field` flips **two** visible decisions (a chip swap AND a layout accent — avatars, ghost, pulse, flag).
- `audience` changes **labels only** (e.g. "Members" for church, "Students" for seminary, "Staff" for nonprofit, "Cohort" for leaders). Do not re-architect layout per audience.

If an audience-specific label is needed, accept it as an optional prop on the individual component (e.g. `membersLabel?: string`) rather than baking in audience branches. The fragmentation story components supply the string based on `audience` state.

---

## 4. Acceptance checklist (final)

Run this in order before calling the task done:

- [ ] Gap analysis written at `docs/build/audit/fragmentation-intel-artifacts-gap.md`.
- [ ] Primitives extended (`IvNode`, `IvNodeGroup`, `IvPdfBadge`, `IvPlayGlyph`, `IvSticky`, `IvBar.height`, `IvAvatar.size/unread`).
- [ ] 6 new slugs registered (`doc-pdf-generic`, `video-frame-timestamped`, `notes-sticky-sketch`, `crm-person-card`, `node-single`, `node-group`).
- [ ] 14 existing slugs audited against sticky-mockup ART templates, visual deltas closed.
- [ ] QA gallery at `/system/intel-artifacts` renders every slug × field × variant, no console warnings.
- [ ] `/fragmentation` wired to registry; all `<Image src="/images/fragmentation-story/…">` removed.
- [ ] Audience × field toggles still drive artifacts (all 8 combinations scrolled).
- [ ] Infrastructure overlay (`intel-seo-surface`, `intel-ai-agent-workpack`, `intel-translation-stack`, peer-network composition) landed in multiplication.
- [ ] `pnpm typecheck && pnpm lint && pnpm build` pass.
- [ ] `public/images/fragmentation-story/*.webp` archived (or deleted).
- [ ] This file's Changelog updated.

---

## 5. File map (what lands where)

| Concern | Path |
|---|---|
| Shared primitives (extended) | `src/components/intel-artifacts/primitives.tsx` |
| Narrative components (14 audited + 6 new) | `src/components/intel-artifacts/narrative-artifacts.tsx` |
| Operational components (unchanged) | `src/components/intel-artifacts/operational-views.tsx` |
| Registry (6 new slugs) | `src/components/intel-artifacts/registry.tsx` |
| Types (append 6 slugs) | `src/components/intel-artifacts/types.ts` |
| Barrel export (append) | `src/components/intel-artifacts/index.ts` |
| QA gallery page | `src/app/(site)/system/intel-artifacts/page.tsx` |
| Fragmentation story — per-stage files (wire-in) | `src/components/sections/fragmentation-story/fragmentation-story-stage-layers.tsx`, `fragmentation-story-scatter.tsx`, `fragmentation-story-stage-integration.tsx`, `fragmentation-story-stage-activation.tsx`, `fragmentation-story-stage-formation.tsx`, `fragmentation-story-stage-multiplication.tsx`, `fragmentation-story-acts.tsx` |
| Gap analysis | `docs/build/audit/fragmentation-intel-artifacts-gap.md` (new, Step 1) |
| Audit update | `docs/build/audit/fragmentation-story-approaches-audit.md` (§6, §7.5) |

---

## 6. Non-goals (do not do)

- Do not add new motion choreography to `/fragmentation` in this pass. Artifacts replace images, the existing GSAP triggers are untouched.
- Do not port Approach B's full contract-and-echo scrub into Approach C's multiplication here (see audit §7.2). That is a separate, motion-only PR.
- Do not replace the six tenant logos in `fragmentation-story-stage-multiplication.tsx` with intel-artifacts. They are intentionally abstract per Approach A.
- Do not build new operational surfaces beyond the six already specified.
- Do not introduce any raster art. Every artifact must be HTML + inline SVG composed with semantic tokens.

---

## 7. Changelog

- **2026-04-15** — Initial build prompt written. Covers Steps 1–8 and acceptance checklist.

*End of prompt.*
