# Prompt: Fragmentation stages GSAP deck — narrative visualizations for stages 3–6

## Context

The horizontal deck at `docs/html/fragmentation-stages-gsap/` already establishes a **strong editorial shell**: warm cream palette, Inter + Instrument Serif for caption emphasis, pinned horizontal scroll (GSAP + ScrollTrigger), and a **two-speed visual language**:

- **Stages 01–02** now lean on **concrete story assets** — the same intel WebPs and “typed library” conceit as `/fragmentation` (`FragmentationIntelArtifact`, integration IDE panel). A viewer can infer *what* is fragmenting and *what* “one system” means without reading a manifesto.
- **Stages 03–06** still follow the original spec in `docs/build/prompts/fragmentation-stages-gsap-horizontal.md`: monochrome SVG “diagrams” (hub + rays, five-node path, binary tree, hand-placed network). They read as **decorative analogies** — pleasant geometry that *suggests* activation, formation, multiplication, and movement without **binding** to the product story.

This prompt asks you to **extend the 01–02 approach** into the later stages: same craft, same restraint, but each viz must **carry a legible narrative beat** a thoughtful viewer could paraphrase in one sentence *without* the headline.

---

## Non-negotiables (keep the family)

- **Canvas**: keep `viewBox="0 0 640 480"` (or document any change), `currentColor` / ink-on-cream grammar, stroke weights in the ~1–1.3 range, respect `prefers-reduced-motion: reduce` and existing `.slide.is-active` / ScrollTrigger choreography patterns in `styles.css` + `script.js`.
- **Typography**: Inter for any labels inside SVG; Instrument Serif only where the slide already uses italic emphasis in copy (usually none inside the viz).
- **Continuity with 01–02**: where it clarifies the story, **reuse** `public/images/fragmentation-story/*.webp` (or the same slugs) at **readable** sizes — not wallpaper. Prefer **cropped thumbs**, **silhouettes**, or **one hero + small satellites** over fourteen full tiles unless the composition stays legible at deck scale.
- **No new rainbow**: no decorative gradients, no “tech blue” blobs. If you need emphasis, use **weight**, **spacing**, **one** semantic fill (e.g. `fill="currentColor"` on a single “live” node), or **motion** — same discipline as the rest of the deck.

---

## The bar: “story, not shape”

For each of stages **03–06**, before drawing anything, write (in your design notes or in HTML comments) a **viewer sentence** — what a person should be able to say after two seconds beside the slide:

- Bad: “There’s a pulsing circle with lines.”
- Good: “One surface is live; specific artifacts are being pulled into use from the library.”

Then **design so that sentence is inevitable**: labels, micro-copy, recognizable card shapes, sequence of motion, or a **before → after** state within the same slide if needed.

Avoid:

- Pure geometry that could illustrate *any* product (“nodes and edges”).
- Stock metaphors (rocket, mountain, generic “growth tree”) with no tie to **intel**, **people**, **systems**, or **field**.

Anchor language to the **six stage captions** already on the slides (they are the contract):

| Stage | Caption (contract) |
|-------|----------------------|
| 03 Activation | Your intelligence becomes **usable**. |
| 04 Formation | People are **shaped**, not just informed. |
| 05 Multiplication | Your work begins to **scale through systems**. |
| 06 Movement | Your work becomes part of a **connected field**. |

---

## Per-stage narrative briefs (propose concrete viz directions)

### 03 — Activation

**Story job**: show the **moment of use** — search, pathway, agent, or surface **addressing** typed content (not “data glow”).

**Directions to explore** (pick one coherent composition):

- **Retrieval into action**: central “live” surface (could be a simplified hub card or neutral frame) with **2–3 labeled rays** terminating on **recognizable thumbs** (course module, thread, book) and a tiny label: e.g. “Pathway”, “Answer”, “Session” — whatever matches Movemental vocabulary.
- **Query → result strip**: a single-line “prompt” or “question” (plain text, not lorem) and a **short ranked stack** of artifact tiles sliding in — motion sells *selection*, not magic.

**Motion**: must read as *pulling into use*, not random pulse. Rays or motion should **terminate on** specific artifacts, not empty space.

---

### 04 — Formation

**Story job**: show **progression of people** through a **formation arc**, not an abstract timeline.

**Directions to explore**:

- Keep the **five beats** (Recognition → Imitation) but replace anonymous dots with **five micro-states**: e.g. silhouettes, avatars-as-dots, or **stages of a cohort card** that visibly deepen (outline → partial fill → full “sent” state). The **traveller** should read as a **person** (even a 6px dot with a “you are here” ring) moving through **named** stations — labels must stay legible.
- Optional: one **artifact** (e.g. session card) **transforms** as the traveller passes — “informed” vs “shaped” made literal.

**Motion**: pauses at nodes should feel like **dwell time in a practice**, not easing demo.

---

### 05 — Multiplication

**Story job**: show **systems carrying load** — templates, pathways, cohorts, or **replicated** artifacts — not a binary tree for its own sake.

**Directions to explore**:

- **One authored object → many instances**: e.g. a **module** or **order-of-service** thumb at root; leaves are **smaller stamped variants** (same aspect, reduced detail) or **badged copies** (“Cohort B”, “Campus 2”) — viewer sees *cloning with meaning*.
- **Pipeline**: horizontal “lanes” (Design → Publish → Distribute) with **throughput** (small ticks, counts, or subtle motion along edges) — only if labels stay readable at 640×480.

**Motion**: stagger should imply **deployment** or **fan-out**, not fireworks.

---

### 06 — Movement

**Story job**: show **non-hierarchical** connection — peers, bridges, reciprocity — and ideally **reuse** 2–3 artifact types as **nodes** so the graph is “the same library, now in relationship.”

**Directions to explore**:

- Replace anonymous nodes with **mixed shapes** (book, thread, hub, session) at **small** sizes; edges labeled sparingly (“cites”, “teaches with”, “same cohort”) *only if* legible — otherwise **one** legend line outside the graph.
- **Breathing** motion should vary by **role** (e.g. hub vs leaf), not identical for every node — otherwise it reads as screensaver.

**Avoid**: perfectly symmetric “network” that could illustrate blockchain or social graphs generically.

---

## Deliverable

1. **Spec paragraph per stage** (what the viewer sentence is, what elements prove it).
2. **Updated SVG** (and CSS if new classes) in `docs/html/fragmentation-stages-gsap/` for slides 03–06, preserving scroll + snap behavior.
3. **Short QA checklist** (self-review):
   - [ ] Could I remove the stage title and still guess the stage from the viz alone?
   - [ ] Does at least one element **only** make sense for Movemental’s arc (not a generic SaaS diagram)?
   - [ ] At 1280px viewport, is every intentional label readable?
   - [ ] Reduced motion: is the **final story state** still obvious without loops?

---

## Reference hooks (read, don’t paste marketing)

- Product arc and stage language: `src/app/(site)/fragmentation/page.tsx` and `src/components/sections/fragmentation-story/*` (especially `fragmentation-story-content.ts`, integration + activation sections).
- Intel asset set: `public/images/fragmentation-story/` (filenames = slugs).
- Original deck mechanical spec (stroke grammar, GSAP patterns): `docs/build/prompts/fragmentation-stages-gsap-horizontal.md`.

---

## Success criterion

Stages **03–06** should feel like **the second reel of the same film** as **01–02**: same lens, same props (artifacts, surfaces, people), **higher** narrative density — not a return to abstract wallpaper.
