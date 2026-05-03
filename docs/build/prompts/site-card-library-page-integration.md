# Site-wide card library integration — page-by-page rollout prompt

Use this document as a **standalone agent prompt** when integrating the upgraded marketing card components across `(site)` routes. Goal: **token-correct surfaces**, **predictable rhythm** between similar page types, and **intentional variety** only where editorial hierarchy calls for it (not ad-hoc one-offs per section).

---

## 0. Read first (non-negotiable)

1. [`docs/design/DESIGN.md`](../../design/DESIGN.md) — light-primary + regional Midnight, semantic tokens, tonal stacking, no decorative section borders, `shadow-ambient` rules, Inter + type rhythm.
2. [`docs/build/prompts/stitch-to-react-migration.md`](./stitch-to-react-migration.md) — especially token remaps and section primitives; do not introduce raw hex, `bg-white`, or border-based sectioning to “fix” cards.
3. [`docs/build/audit/site-pages-inventory.md`](../audit/site-pages-inventory.md) — authoritative route list and what each page is trying to do.

**Component sources of truth**

| Layer | Import path | Role |
| --- | --- | --- |
| **Base marketing card** | `@/components/primitives` → `SurfaceCard` | Default wrapper for tiles, grids, and inset panels. Tones: `on-background`, `on-section`, `midnight`. Use `interactive` + `asChild` for whole-card links. |
| **Editorial gallery cards** | `@/components/editorial-stitch` | `IconFeatureCard`, `DotTextureCard`, `AtmosphericMediaCard` — Stitch-translated patterns for **featured** rows, not every cell in a dense grid. |
| **System build hub tiles** | `@/components/system-builds` → `SystemBuildCard` | Canonical linked tile for modular build pathways (wraps `SurfaceCard`). Prefer extending this pattern over duplicating Link+padding on similar hubs. |
| **shadcn `Card`** | `@/components/ui/card` | Reserved for dense UI shells (forms, dashboards) where primitives are not the right abstraction — **not** the default for marketing editorial grids. |

---

## 1. Design principles for integration

### 1.1 Uniformity by **page archetype**, not global sameness

- **Same archetype → same card grammar.** Example: the three audience landings (`/movement-leaders`, `/churches`, `/nonprofits`) should share grid density, tone choice for comparable sections, and link affordance (e.g. all use `SurfaceCard` + `asChild` for destination cards, or all use `SystemBuildCard`-level consistency if the content is pathway-like).
- **Different archetype → allowed divergence.** Long-form narrative pages (`/manifesto`, `/vision`, `/knowledge-ecosystem`) may use fewer grids and more `Prose` + single `IconFeatureCard`-scale moments; do not force a three-column card grid where the story is linear.
- **One flagship rule:** `/` (home) may combine **more** editorial card types than inner pages, but each type should appear **once per narrative beat** (avoid three different “feature card” languages in adjacent bands).

### 1.2 Tone selection (`SurfaceCard`)

- Cards sitting on **`bg-section`** → prefer `tone="on-section"` (static `shadow-ambient` per primitive). Use `className="shadow-none"` only when the parent already provides lift and double-shadow reads as muddy (match existing `system-builds` sections as precedent).
- Cards on **`bg-background`** → `tone="on-background"`; add `interactive` when the whole card is clickable.
- Cards inside **`variant="midnight"` / inverse bands** → `tone="midnight"`; respect `focus-visible:ring-offset-inverse-surface` behavior already encoded in the primitive.

### 1.3 When to use editorial-stitch cards

- **`IconFeatureCard`:** Single-column or full-width “curated authority” beats (large type, one icon, one thesis). Good for mid-page emphasis, not for 6-up grids.
- **`DotTextureCard`:** Narrative + media hybrid with semantic dot texture; use where Stitch gallery intended a **textured panel**, not as a default list tile.
- **`AtmosphericMediaCard`:** High-impact CTA or story anchor with image field + `ArrowLink` — cap frequency (typically **0–2 per page** unless the page is explicitly a gallery).

### 1.4 Accessibility and content

- Preserve heading order: card titles should not skip levels vs surrounding `Display` / section headings.
- Linked cards: prefer **`SurfaceCard asChild` + `Link`** (or `SystemBuildCard`) so semantics and hit targets stay unified.
- Images inside cards: meaningful `alt`, appropriate `sizes`, respect `prefers-reduced-motion` (already partially handled in editorial cards — do not strip `motion-reduce` classes when editing).

---

## 2. Page batches (suggested execution order)

Work **batch-by-batch** so similar pages land in one PR or one focused session; after each batch, run `pnpm lint`, `pnpm typecheck`, and a quick visual pass at `sm` / `lg` breakpoints.

### Batch A — Audience and “who it’s for” (uniform grid language)

| Route | Integration notes |
| --- | --- |
| `/movement-leaders` | Already uses `SurfaceCard`; align padding (`p-6`/`p-8` vs custom `p-10`/`p-12`) with sibling audience pages unless content density truly requires an exception — document exceptions in PR description. |
| `/churches` | Same as above; unify “start here” / diagnostic card rows with nonprofits/leaders. |
| `/nonprofits` | Same as above. |
| `/who-its-for` | Uses interactive `SurfaceCard`; keep as reference for **linked grid** pattern across audience pages. |

**Batch exit criteria:** Comparable sections across the four routes use the same primitive, tone, and interactive pattern for the same *job* (e.g. destination links vs static callouts).

### Batch B — Services and system builds (pathway + hub consistency)

| Route | Integration notes |
| --- | --- |
| `/services` | Audit for ad-hoc `rounded-xl bg-*` panels; migrate to `SurfaceCard` or existing section primitives. |
| `/services/discovery-lab` | Align sprint / deliverable tiles with system-build visual language where content parallels modular builds. |
| `/services/organizational-systems` | Prefer `SurfaceCard` stacks consistent with Batch A density or Batch B hub rows — pick one and stick to it within the page. |
| `/services/system-builds` | Prefer **`SystemBuildCard`** for modular install tiles; do not re-hand-roll link cards. |
| `/services/system-builds/foundation` | Reuse patterns from `@/components/system-builds/*` where sections mirror hub content (throughline, typical paths, outputs). |
| `/services/system-builds/content` | Same. |
| `/services/system-builds/fundraising` | Same. |
| `/services/system-builds/governance-ethics` | Same. |
| `/system-builds` | Treat as sibling to `/services/system-builds` for card grammar; `SystemBuildCard` should match hub behavior. |

**Batch exit criteria:** All “modular four-week install” style grids use the same card component and link treatment; section-level `SurfaceCard` tone matches parent `Section` background.

### Batch C — Platform story and evidence (long-form + occasional tiles)

| Route | Integration notes |
| --- | --- |
| `/platform` | Map capability/layer tiles to `SurfaceCard`; reserve `IconFeatureCard` / `AtmosphericMediaCard` for true hero or pivot moments only. |
| `/system` | Align with `/how-it-works` where sections are parallel (TOC-driven, layered story). |
| `/how-it-works` | Reference implementation for mixed `on-section` / `midnight` tiles — mirror tone logic on `/system` when content structure matches. |
| `/walkthrough` | Favor clarity over decoration; cards illustrate UI concepts — use `SurfaceCard` + concise titles. |
| `/evidence` | Comparison and proof sections: uniform tile size within each row; editorial cards only for opening or closing emphasis if needed. |

**Batch exit criteria:** Within each page, all comparison grids share one card primitive; Midnight bands use `midnight` tone, not manual `bg-*` overrides.

### Batch D — Conversion, economics, and social proof

| Route | Integration notes |
| --- | --- |
| `/pricing` | Comparison columns: consistent `SurfaceCard` or table+card hybrid per DESIGN.md; avoid mixing `Card` and `SurfaceCard` without a documented reason. |
| `/faq` | FAQ items are often accordion/list UI — do not force `SurfaceCard` into accordion rows if it harms semantics; use cards only for intro/outro panels or highlighted answers. |
| `/case-studies` | Segment cards and rails: align with `testimonial-rail` + `SurfaceCard` patterns where previews are editorial. |
| `/blog` | Placeholder article tiles: establish **one** article teaser card pattern for future real posts (`SurfaceCard` + image + meta). |

### Batch E — Narrative, vision, and methodology-adjacent pages

| Route | Integration notes |
| --- | --- |
| `/about` | Bios and values: cards for people/claims, not every paragraph. |
| `/manifesto`, `/vision`, `/movemental-at-100`, `/knowledge-ecosystem`, `/who-is-a-movement-leader` | Prefer prose-forward layout; use editorial-stitch cards as **section punctuation**, not repeating grids. |

### Batch F — Home (integration last or in dedicated PR)

| Route | Integration notes |
| --- | --- |
| `/` | Highest scrutiny: each band should use **at most one** “special” card type per scroll depth tier; consolidate leader/profile tiles to shared `SurfaceCard` grammar; use `DotTextureCard` / `AtmosphericMediaCard` only where Stitch spec calls for that beat. |

### Batch G — Book, assessments, blog, legal (surgical)

| Route | Integration notes |
| --- | --- |
| `/book`, `/book/read/[slug]`, `/book/endorse`, `/book/contributors` | Book-specific components (`endorsement-card`, chapter UI) take precedence; do not blanket-replace with marketing `SurfaceCard` where it breaks reader UX. |
| `/assess` | Form-first: shadcn patterns for inputs; marketing wrappers around the form may use `SurfaceCard`. |
| `/contact`, `/apply`, `/inquiry` | Same as assess — cards for explainer panels, not for each field. |
| `/privacy`, `/terms`, `/cookies` | Minimal card use; focus on readable `Prose` and token compliance. |

---

## 3. Per-page checklist (copy for PR description)

For each route you touch:

- [ ] Replaced ad-hoc `rounded-* bg-*` marketing panels with `SurfaceCard` (or justified exception).
- [ ] Tone matches parent section background (`on-background` / `on-section` / `midnight`).
- [ ] Whole-card links use `asChild` + `Link` (or `SystemBuildCard`).
- [ ] Editorial-stitch cards used sparingly and consistently with sibling pages of the same archetype.
- [ ] No new raw hex / `bg-white` / decorative borders between bands.
- [ ] Headings and focus rings remain accessible; `pnpm lint` + `pnpm typecheck` clean.

---

## 4. Explicit anti-patterns

- Wrapping **every** block in a card — editorial pages need breathing room; tonal stacking can be `bg-card` sections without looking like a tile game.
- Using **`Card` + `CardHeader`** for simple marketing tiles when `SurfaceCard` suffices — increases API surface and drifts from DESIGN.md primitives chain.
- Mixing **different inner padding scales** on the same grid row (`p-6` next to `p-12`) without content-driven reason.
- Adding **borders** between cards for separation — use gap, tone, or section background changes instead.

---

## 5. Deliverable

For each batch merged, add a short note (PR comment or changelog bullet): **routes updated**, **card types introduced/removed**, and **any intentional cross-page alignment** (e.g. “nonprofits/churches/leaders now share linked grid pattern from `/who-its-for`”).

When in doubt, prefer **`SurfaceCard` + section primitives** and match the **closest sibling page in this document** before inventing a new variant.
