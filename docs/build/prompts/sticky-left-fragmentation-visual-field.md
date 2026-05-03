# Build prompt: left sticky visual field — content fragmentation story

Use this prompt when implementing a long-form page section (for example methodology, services, or a narrative landing slice) where the **right column** carries scrollable copy and the **left column** is a **sticky visual stage** that tells the story of **content fragmentation** through image choreography.

This document assumes Movemental conventions: semantic tokens only (`bg-section`, `text-foreground`, `border-border` for focus rings if needed), no pasted-on shadows except `shadow-ambient` when elevation is justified, Inter typography, and a client boundary only on the animation wrapper (keep the page shell as Server Components).

---

## 1. Asset inventory (WebP, optimized)

All files live under `public/images/fragmentation-story/`. Import in Next.js as `/images/fragmentation-story/<filename>`.

| Suggested narrative role | File | What it depicts (for art direction) |
|--------------------------|------|-------------------------------------|
| Act I — unified ritual / single surface | `order-of-service-structured-units.webp` | Ordered bulletin — fixed sequence, one artifact |
| Act I — designed wholeness | `session-essential-structures-card.webp` | Session card with numbered “structure” |
| Act II — system splits | `formal-design-systems-split-flow.webp` | Diagram: one node → split → branches |
| Act II — distribution logic | `core-hub-to-fragment-nodes.webp` | Hub “core function” → multiple nodes |
| Act II — broadcast metaphor | `stage-presentation-three-shapes.webp` | Stage + screen with three distinct shapes |
| Act II — informal logic | `sketch-converge-diverge-flow.webp` | Hand sketch: inputs converge, outputs diverge |
| Act III — modular surfaces | `module-formal-systems-intro.webp` | Module card + progress |
| Act III — authored fragments | `book-fragments-of-form.webp` | Book: “Fragments of Form” |
| Act III — explicit thesis | `cover-principles-design-fragmentation.webp` | Cover naming fragmentation |
| Act III — research artifact | `cover-structural-fragments-investigation.webp` | Investigation layout, bar “paragraphs” |
| Act IV — parallel channels | `podcast-card-abstract-structures.webp` | Episode card + waveform / abstract shards |
| Act IV — conversational shards | `mobile-chat-skeleton-bubbles.webp` | Chat UI with skeleton lines |
| Act V — thread sprawl | `email-thread-multi-participant.webp` | Email thread with segments |
| Act V — misaligned thread | `message-thread-staggered-fragments.webp` | Same theme, staggered / threaded reply |

**Ordering principle:** move from **single coherent artifact** → **diagrammatic split** → **many surfaces (book, module, covers)** → **real-time channels (podcast, chat)** → **async sprawl (email, staggered thread)**. Adjust beats to match page copy, but keep the emotional arc: *calm unity → explicit break → noisy multiplicity*.

---

## 2. Layout: left sticky visual field

### Grid

- Desktop (`lg+`): two columns — **left 40–45%** sticky stage, **right 55–60%** prose blocks with generous `section-y` padding.
- The sticky region height: `min(100dvh, …)` with **safe area** insets so content never sits under the fixed site nav (respect existing `pt-16` / nav height).
- Tablet: stack order **copy first**, then a shorter **horizontal strip** of the visual (or a single “chapter” image) so the story does not trap scroll on small viewports.
- Mobile: replace sticky with **inline chapter images** between copy blocks (same assets, reduced motion).

### Sticky container rules

- Left column wrapper: `lg:sticky lg:top-[var(--sticky-top)]` where `--sticky-top` accounts for nav (e.g. `5rem` or token-equivalent).
- Inner stage: flex column, vertically centered when the viewport is tall; when short, align **top** so the first “beat” is always visible.
- **Max width** for the image stack: ~`min(420px, 100%)` so cards feel editorial, not full-bleed wallpaper.
- Use **tonal stacking** only: stage sits on `bg-section` or `bg-card` without 1px section borders per DESIGN.md.

### Visual hierarchy inside the stage

1. **Primary card** — one image at a time, dominant scale (~0.92 of stage width).
2. **Ghost siblings** — optional smaller duplicates, offset 8–16px, at `opacity-40–55`, blurred **very lightly** (`backdrop`/`blur-sm` sparingly) to suggest “other copies elsewhere.”
3. **Shard layer** — optional CSS “shards” (rect clips of the same `next/image` via `clip-path` or duplicated layers with masks) only if performance stays solid; prefer **two real layers** over many DOM nodes.

---

## 3. Story beats (map to scroll or sections)

Map each **copy `<section>`** (or `data-chapter` block) to one **primary asset**. Example mapping:

1. **Thesis** — `order-of-service-structured-units` + headline: one schedule, one room.
2. **Designed order** — `session-essential-structures-card`.
3. **First crack** — crossfade to `formal-design-systems-split-flow`; optional SVG line draw overlay (see animation).
4. **Operational reality** — `core-hub-to-fragment-nodes` + quick flash of `stage-presentation-three-shapes` if copy mentions audiences.
5. **Knowledge splits** — stack `book-fragments-of-form` sliding up over `module-formal-systems-intro` (parallax 6–12px only).
6. **Ongoing noise** — `mobile-chat-skeleton-bubbles` + `email-thread-multi-participant`; end on `message-thread-staggered-fragments` if the copy is about misalignment / context loss.

The **right column** should literally **name** what the left column shows (e.g. “one bulletin” → “many inboxes”) so the visual never fights the narrative.

---

## 4. Animation: GSAP (recommended for scroll choreography)

**Stack:** `gsap` + `ScrollTrigger` (already in repo via `gsap`; register plugin in a client component).

### Principles

- **Scrubbed timelines** tied to the **right column** scroll range (`trigger: section`, `start: "top center"`, `end: "bottom center"`, `scrub: 0.6–1.2` for editorial weight).
- Prefer **opacity + translateY + slight rotateZ** (1–3°) over scale explosions; fragmentation reads as **separation**, not “bounce.”
- **Stagger** 40–80ms when multiple cards represent channels.
- Respect `prefers-reduced-motion: reduce` — disable scrub, show static chapter image per section.

### Concrete GSAP moves

| Beat | Technique |
|------|-----------|
| Unified → split | Single `next/image` crossfade; simultaneously animate a **masked duplicate** sliding apart 12–24px on X for “torn” read |
| Hub → nodes | Scale down hub 1 → 0.92 while three **ghost cards** fade in at offsets; optional `motionPath` only if budget allows |
| Diagram emphasis | Overlay minimal SVG on `formal-design-systems-split-flow` / `core-hub-to-fragment-nodes`; `drawSVG`-style stroke (GSAP plugin) or CSS `stroke-dashoffset` without extra deps |
| Sprawl | `email-thread-multi-participant` fixed; animate **clip-path** inset to reveal rows one at a time on scroll |
| Chaos capstone | `message-thread-staggered-fragments`: stagger `y` + `opacity` on cropped regions (pre-cut in design, not runtime heavy) |

### Performance

- Use `next/image` with explicit `width` / `height` and `sizes="(min-width: 1024px) 40vw, 100vw"`.
- Pin only the **left column inner wrapper**, not entire full-width sections.
- Cap simultaneous filters; prefer **two layers** max with transforms.

---

## 5. Animation: Framer Motion (`motion` package)

Use when you want **declarative** variants and smaller timelines (fewer beats).

### Patterns

- **`useScroll` + `useTransform`** on `scrollYProgress` of a `ref` wrapping the **right column** article — drive `opacity`, `y`, and `rotate` of the active image.
- **`AnimatePresence` + `mode="wait"`** for chapter swaps (cleaner than many scrubbed keys if you only have 4–6 chapters).
- **`layoutId`** sparingly: one shared string for “the card” morphing between two **similar aspect** images only; mismatched ratios look glitched.

### When to choose Motion over GSAP

- **Motion:** 4–7 discrete chapters, mobile-first reduced implementation time.
- **GSAP:** continuous scrub, overlapping timelines, diagram draw, pinned choreography with **section-linked** durations.

---

## 6. Fragmentation clarity checklist

- [ ] First frame reads as **one** surface (order, session, or book closed).
- [ ] Mid sequence introduces **a visible split** (diagram or duplicated card offset).
- [ ] Late sequence shows **≥2 simultaneous surfaces** (chat + email, or podcast + thread).
- [ ] Final frame emphasizes **misalignment** (staggered thread) or **skeleton content** (bars, not paragraphs) — matches “lost signal” copy.
- [ ] Sticky release: when the narrative section ends, `pinReleases` / unpins so the footer feels grounded.
- [ ] `prefers-reduced-motion` tested.

---

## 7. Implementation sketch (pseudo-structure)

```tsx
// Client component — e.g. FragmentationStickyStage.tsx
// Outer page remains a Server Component that passes chapter ids + copy blocks.

<article ref={articleRef} className="lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
  <aside className="lg:sticky lg:top-24 lg:self-start">
    <div className="relative mx-auto w-full max-w-[26rem]">
      {/* next/image stack + optional shard layers */}
    </div>
  </aside>
  <div className="space-y-section-y-lg">
    {chapters.map((chapter) => (
      <section key={chapter.id} data-chapter={chapter.id}>
        {/* prose */}
      </section>
    ))}
  </div>
</article>
```

Wire `data-chapter` attributes to ScrollTrigger markers **or** to `useScroll` offsets derived from `getBoundingClientRect` once (resize observer optional).

---

## 8. Acceptance criteria

- Left visual stays **readable** at all pinned positions (no cropped faces of cards unless intentional).
- No layout shift: reserve aspect-ratio boxes per chapter.
- Lighthouse: avoid chaining expensive layout reads in scroll handlers; batch with GSAP ticker or rAF-throttled transforms.
- All imagery from this folder only for this narrative slice — **do not** mix unrelated marketing stock.

---

## 9. Optional copy-facing labels (for CMS later)

If these become CMS-driven, stable slugs:

`unity-bulletin`, `unity-session`, `split-formal-flow`, `split-core-nodes`, `broadcast-stage`, `sketch-flow`, `surface-module`, `artifact-book`, `cover-principles`, `cover-investigation`, `channel-podcast`, `channel-chat`, `sprawl-email`, `sprawl-staggered-thread`

Map slugs → paths in a single `const FRAGMENTATION_IMAGES` record in `src/` for type safety and import sanity.
