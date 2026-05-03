# Prompt: apply editorial feature sections page-by-page (uniformity by page type)

Use this document when **composing or refactoring** `(site)` marketing pages so they reuse the **Movemental feature-section component library** consistently—similar routes should feel like siblings, not one-off experiments, while still respecting narrative needs and [docs/design/DESIGN.md](../../design/DESIGN.md) (tonal stacking, Midnight as a regional band, semantic tokens only).

## Preconditions (read first)

1. [docs/design/DESIGN.md](../../design/DESIGN.md) — section rhythm, primitives chain, no decorative section borders, primary as a light-switch, `shadow-ambient` only when a slab truly floats.
2. [docs/build/prompts/stitch-to-react-migration.md](./stitch-to-react-migration.md) — token remap and React boundaries; pinned Stitch project `2208910962065880866` for any net-new visuals.
3. [docs/build/audit/site-pages-inventory.md](../audit/site-pages-inventory.md) — authoritative route list and page intent.
4. Skim the implementations (props + comments) under `src/components/editorial-stitch/` and `src/components/primitives/feature-split.tsx` before assigning a pattern to a page.

## Canonical “feature section” palette

Treat these as the **approved building blocks** for marketing feature moments (value props, proof rails, chaptered long pages, and closing conversion). Prefer **composing** them inside `Section` + `Container` rather than inventing new card chrome.

| Role | Component | Module | When to use |
| --- | --- | --- | --- |
| **Hero-split / narrative rail** | `FeatureSplit` | `@/components/primitives` | One strong headline or stat-led thesis in a narrow column; deeper explanation, list, media, or `SurfaceCard` in the wide column. The default pattern for “claim → evidence” on light bands. |
| **Lifted value panel (icon)** | `IconFeatureCard` | `@/components/editorial-stitch` | Single pillar or principle: icon + eyebrow + title + short body on `bg-muted` ghost-lift. Use in **grids of 2–4** for parity across audience pages. |
| **Story card with image** | `AtmosphericMediaCard` | `@/components/editorial-stitch` | When a **specific visual** carries the metaphor (leaders, places, artifacts). One primary CTA per card (`ArrowLink`). |
| **Texture + media accent** | `DotTextureCard` | `@/components/editorial-stitch` | Mid-page **breathing** block: conceptual copy + supporting image without full-bleed atmosphere; good between dense prose sections. |
| **UI / system preview shell** | `EditorialPreviewWell` | `@/components/editorial-stitch` | Drop-in frame for screenshots, simplified UI chrome, or nav previews—keeps “product truth” visually subordinate to copy unless the section is explicitly a walkthrough. |
| **Section header (gallery scale)** | `EditorialShowcaseIntro` | `@/components/editorial-stitch` | Top of a major band: eyebrow + display title + lede. Use **`titleAs="h2"`** when the page already has an `h1` (almost every inner section on long pages). |
| **Midnight pull statement** | `MidnightStatementQuote` | `@/components/editorial-stitch` | **At most one** per scroll depth on a route unless the page is explicitly quote-driven; pairs with `Section variant="midnight"` or sits inside an inverse band. Do not duplicate [primitives `PullQuote`](../../design/DESIGN.md) for the same semantic job on one page. |
| **Closing / bridge CTA** | `GhostCtaPanel` | `@/components/editorial-stitch` | End-of-page or end-of-chapter **single primary action**; center-aligned slab with gradient button per spec. |
| **Supporting surfaces** | `SurfaceCard`, `StatStrip` / `StatItem`, `EditorialComparisonTable`, `TestimonialRail`, `InPageToc` | `@/components/primitives` | Combine with `FeatureSplit` for proof and comparison pages; `InPageToc` for long FAQ / methodology / evidence-style pages. |

**Import ergonomics:** feature blocks from `@/components/editorial-stitch` and layout primitives from `@/components/primitives` (see `editorial-stitch/index.ts` and `primitives/index.ts`).

## Composition rules (design best practices)

1. **One heading level per band.** Page `h1` lives in the hero (or `EditorialShowcaseIntro` with `titleAs="h1"` on short pages only). Section intros use `Display` / `Eyebrow` with `h2` semantics.
2. **Alternate surface rhythm.** After a `variant="section"` band dense with cards, follow with `variant="default"` or `elevated` prose before another heavy grid—avoids “card carpet.”
3. **Uniform grids.** For “three audience pillars” or “four system layers,” use the **same** card component family per page type (e.g. all `IconFeatureCard` or all `AtmosphericMediaCard`), mixing only when one tile **must** carry imagery and the rest do not.
4. **FeatureSplit is for argument, not decoration.** Reserve it for sections where the split meaningfully separates thesis from substantiation (stats, quotes, tables). Do not use it for short filler; use a single `SurfaceCard` or prose block instead.
5. **Midnight sparingly.** Use `MidnightStatementQuote` or `Section variant="midnight"` for **one** high-emphasis thesis per page (or two on very long evidence/platform pages with clear visual separation).
6. **CTA discipline.** Prefer one `GhostCtaPanel` near the end; secondary links stay text `ArrowLink` or outline buttons in the hero/footer per existing patterns.
7. **Motion.** Respect `prefers-reduced-motion`; card hover scales are already guarded in library components—do not add competing scroll jank on the same band.

## Page archetypes (uniform templates)

When two routes share an archetype, they should share **section order** and **component choices** unless the inventory explicitly calls for a different story (e.g. book vs. services).

| Archetype | Typical routes | Recommended stack (top → bottom) |
| --- | --- | --- |
| **A. Audience landings** | `/movement-leaders`, `/churches`, `/nonprofits` | Hero (`LightHeroPhotoBackdrop` or simple `Section`) → `EditorialShowcaseIntro` (`titleAs="h2"` if hero has `h1`) → **uniform 3-column** `IconFeatureCard` grid → optional `FeatureSplit` (objection / proof) → `TestimonialRail` or quote → `GhostCtaPanel` → footer CTAs. |
| **B. Product / system story** | `/platform`, `/system`, `/how-it-works`, `/walkthrough` | Short hero → `EditorialShowcaseIntro` → `FeatureSplit` + `SurfaceCard` or `EditorialPreviewWell` for diagrams → `IconFeatureCard` or `DotTextureCard` for layer list → optional `EditorialComparisonTable` on `/evidence`-like pages → midnight band **or** `MidnightStatementQuote` once → closing `GhostCtaPanel`. |
| **C. Services overview** | `/services` | Intro + **three** parallel offers as `IconFeatureCard` or `AtmosphericMediaCard` (pick one per row; do not alternate families row-to-row). |
| **D. System build modules** | `/services/system-builds/*`, `/services/discovery-lab`, `/services/organizational-systems` | Shared: outcomes header (`EditorialShowcaseIntro`) → timeline or numbered `FeatureSplit` rails → `DotTextureCard` for “artifact” highlights → `GhostCtaPanel` scoped to that module’s inquiry. Keep **the same rail pattern** across all four-week build pages so they read as one product line. |
| **E. Argument / proof** | `/evidence`, `/pricing` (economics narrative) | `FeatureSplit`-heavy with `EditorialComparisonTable` or stats; avoid redundant `IconFeatureCard` grids that repeat the comparison table content. |
| **F. Long reader** | `/faq`, long legal (use judgment) | Hero minimal → `InPageToc` sticky → body uses **prose-first** `Section`s; use `EditorialPreviewWell` only if embedding product screenshots; **skip** `GhostCtaPanel` duplication if the page already ends with a contact form link in prose. |
| **G. Narrative / thought leadership** | `/about`, `/manifesto`, `/vision`, `/movemental-at-100`, `/knowledge-ecosystem`, `/who-is-a-movement-leader` | Alternate prose `Section`s with **one** `MidnightStatementQuote` or midnight `Section` for the thesis; optional single `FeatureSplit` for “why now”; closing `GhostCtaPanel` or inline CTA only once. |
| **H. Conversion** | `/contact`, `/apply`, `/inquiry`, `/assess` | Form is the hero; use `EditorialShowcaseIntro` above the fold sparingly; **no** `GhostCtaPanel` (avoid double primary). Optional `IconFeatureCard` row for “what happens next” in three steps. |
| **I. Book promo** | `/book`, chapter reader chrome | Book-specific components take precedence; use `EditorialShowcaseIntro` on landing only; do not force marketing grids into the reader. |

## Page-by-page placement notes (align with inventory)

Use this as a **checklist** when auditing or building. “—” means no default requirement for that family.

| Path / group | Primary archetype | Feature highlights |
| --- | --- | --- |
| `/` | Composite home | Already models `FeatureSplit` + `SurfaceCard`; use library cards for **new** bands instead of bespoke divs. |
| `/about`, `/manifesto`, `/vision`, `/movemental-at-100`, `/knowledge-ecosystem`, `/who-is-a-movement-leader` | G | `MidnightStatementQuote` at most once per page; `FeatureSplit` for “problem / response” if length warrants. |
| `/movement-leaders`, `/churches`, `/nonprofits` | A | Match grid column count and card component across all three. |
| `/platform`, `/system`, `/how-it-works`, `/walkthrough` | B | Prefer `EditorialPreviewWell` for UI story; align TOC + `FeatureSplit` depth across `/system` and `/how-it-works`. |
| `/evidence`, `/pricing` | E | Comparison + stats; restrained use of `IconFeatureCard`. |
| `/faq` | F | `InPageToc` + prose; optional `FeatureSplit` for a single “how to read this page” if needed. |
| `/services` | C | Parallel cards + one closing CTA pattern shared with services children. |
| `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds`, `/services/system-builds/*` | D | Shared four-week narrative shell; `DotTextureCard` for deliverable highlights. |
| `/case-studies`, `/blog` | A–B hybrid | Index pages: uniform card rail; defer `AtmosphericMediaCard` until real imagery exists. |
| `/book`, `/book/read/*` | I | Landing only for full feature palette; reader stays typographic. |
| `/contact`, `/apply`, `/inquiry`, `/assess` | H | Form-first; minimal feature chrome. |
| `/privacy`, `/terms`, `/cookies` | F (lite) | Prose-only; no marketing feature grids unless a callout is explicitly requested. |

## Execution instructions (for the agent)

1. Classify the target route using the **archetype** table; if it fits two, pick the dominant user intent from the inventory summary.
2. Map existing sections to the **palette** table; replace ad-hoc `div` cards with the closest library component without changing copy meaning.
3. Enforce **sibling uniformity**: when editing one audience page, diff the other two in the same archetype and align structure.
4. Run a quick **a11y pass**: heading order, link text in `AtmosphericMediaCard` / `GhostCtaPanel`, reduced motion.
5. If Stitch parity is required, diff against the pinned project screen before merging layout changes.

## Acceptance checklist

- [ ] Tokens only (`bg-section`, `bg-card`, `text-muted-foreground`, etc.); no raw hex or `bg-white` / `bg-black`.
- [ ] No full-width decorative borders between bands; form fields keep `border-border` only where needed.
- [ ] `FeatureSplit` used for substantive thesis/evidence splits, not as default layout for every section.
- [ ] Same archetype pages share **card family** and **approximate section order**.
- [ ] At most one **primary-gradient** closing slab per view (`GhostCtaPanel` or hero primary—not both fighting for attention without hierarchy).
- [ ] `EditorialShowcaseIntro` title level matches real page outline (`h1` vs `h2`).

When this pass is complete, optionally note the archetype and key components in the PR description so the next editor preserves the pattern.
