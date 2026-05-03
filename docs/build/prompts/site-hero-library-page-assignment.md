# Site hero library — page-by-page assignment prompt

Use this document when **planning or implementing** the first screenful of marketing routes so hero treatment stays **coherent across similar page types** while still allowing deliberate exceptions. It assumes the **React primitives** below are the canonical hero building blocks unless a route is explicitly tied to a **Stitch screen** that prescribes a different composition (home remains Stitch-led).

---

## 0. Prepend these rules to any authoring run

1. Read [`docs/design/DESIGN.md`](../../design/DESIGN.md) — light-primary site, **Midnight as a regional band** (not global dark mode), tonal stacking instead of decorative borders, **primary blue as a light switch** (CTAs / key focus only).
2. For implementation details and token mapping, follow [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) where a page is Stitch-derived; otherwise compose from **primitives only**.
3. Route coverage should stay aligned with [`docs/build/audit/site-pages-inventory.md`](../audit/site-pages-inventory.md) as the URL checklist evolves.

---

## 1. Hero component inventory (code)

| Export | Module | Role |
| ------ | ------ | ---- |
| `LightHeroPhotoBackdrop` | `src/components/primitives/hero-with-photo-backdrop.tsx` | Full-bleed photograph + **light** semantic scrim (`bg-background/85`); children sit in `Container` + type stack. Use for **warm, editorial entry** on light-first narratives. |
| `MidnightHeroPhotoBackdrop` | same | Photo at low opacity + **Midnight** scrim (`bg-inverse-surface/88`); inverse type tokens. Use for **authority, contrast, or “chapter opening”** moments. |
| `FeatureSplit` | `src/components/primitives/feature-split.tsx` | Two-column **intro + body** grid (hero-split pattern from DESIGN.md). Use when the hero must carry **both a sharp thesis and dense supporting structure** (diagrams, lists, secondary cards) without stacking everything vertically. |
| `BookHero` | `src/components/book/book-hero.tsx` | **Book landing only** (`/book`): cover, edition lens selector, and manuscript framing. Do not reuse on generic marketing pages. |
| Plain `Section` + `Container` + `Eyebrow` / `Display` / `Prose` | `src/components/primitives/*` | **Minimal / utility / legal** heroes and anywhere photography would feel ornamental. Still use `spacing="lg"` and nav offset classes where the rest of the site does. |

**Re-exports:** `@/components/primitives` exposes `LightHeroPhotoBackdrop`, `MidnightHeroPhotoBackdrop`, and `FeatureSplit`.

---

## 2. Design principles for assignment

1. **Uniformity inside archetypes.** Pages that answer the same *job* (e.g. the three audience landings, the four system-build children, the three “organization type” paths) should share the **same hero component class** and the same **type roles** (Eyebrow → Display → short Prose → primary CTA row). Swap **image and copy**, not layout mechanics.
2. **Contrast between archetypes.** Alternate **Midnight vs light** entry when adjacent routes in the IA would otherwise blur together (e.g. manifesto vs vision), not at random.
3. **One primary visual idea per hero.** Either a **photo backdrop** *or* a **split layout with structured content**—avoid photo + heavy split competing for attention.
4. **Performance.** Use `priority` on the **LCP** image for above-the-fold heroes only; consistent `sizes="100vw"` unless the art direction requires a tighter hint.
5. **Stitch exception.** **`/` (home)** — keep the current Stitch-derived editorial composition unless a single replacement design is approved as a unit; do not partially swap in a photo backdrop without a full layout pass.

---

## 3. Archetype → default hero pattern

| Archetype | Default pattern | Rationale |
| --------- | ----------------- | --------- |
| **A — Pillar narrative** (about, positioning essays) | `LightHeroPhotoBackdrop` | Approachable, editorial, still premium; photo humanizes long-form follow-through. |
| **B — Provocation / charter** (manifesto, sharp stance) | `MidnightHeroPhotoBackdrop` | Signals weight and refusals; matches “Midnight as authority” in DESIGN.md. |
| **C — Audience landing** (parallel segments) | Same as **A** for all segment pages | One **visual system** across movement / church / nonprofit; only imagery and copy change. |
| **D — Product / system story** (platform, system, walkthrough) | `LightHeroPhotoBackdrop` *or* lead `Section variant="midnight"` without photo when imagery is weak | Prefer photo when you have a **single strong plate**; otherwise Midnight **flat** band avoids generic stock. |
| **E — Long-form + scan** (how-it-works, FAQ, evidence when TOC-heavy) | `FeatureSplit` inside first `Section` (light) | Hero carries **title lane + TOC or key callouts** without pushing the fold. FAQ may stay **plain Section** if the hero is intentionally minimal. |
| **F — Economics / comparison** (pricing) | `MidnightHeroPhotoBackdrop` **or** `Section variant="midnight"` (no photo) | Anchors “serious decision”; avoid playful photography. |
| **G — Services hub & children** | **Hub:** `LightHeroPhotoBackdrop`. **Child system-builds:** uniform `MidnightHeroPhotoBackdrop` (or flat Midnight) across all four children | Readers recognize “service delivery” vs “thought leadership” by **consistent dark entry** on child routes. |
| **H — Book** | `BookHero` on `/book` only | Domain-specific; includes lens UX. |
| **I — Conversion** (contact, apply, inquiry) | Plain `Section` (light), no full-bleed photo | Trust and form clarity; photography rarely helps completion rate. |
| **J — Legal** | Plain `Section` (light), smallest viable display | Utility pages; match each other exactly. |
| **K — Lists / indexes** (case studies, blog) | `LightHeroPhotoBackdrop` **or** plain `Section` | Prefer **plain** if there is no dedicated art; avoid duplicate generic office photos across index pages. |
| **L — Vision / future-state** (vision, movemental-at-100, knowledge-ecosystem) | `MidnightHeroPhotoBackdrop` for **vision** and **movemental-at-100**; `LightHeroPhotoBackdrop` for **knowledge-ecosystem** if the narrative is connective / map-like rather than declarative | Creates rhythm: dark for “time horizon / scale”, light for “ecosystem / graph” if you want differentiation. |

Treat this table as the **default**; section 4 overrides when a specific URL needs a documented exception.

---

## 4. Page-by-page recommendations

Legend: **L** = `LightHeroPhotoBackdrop`, **M** = `MidnightHeroPhotoBackdrop`, **FS** = `FeatureSplit` (within `Section`), **B** = `BookHero`, **P** = plain `Section` hero (type stack only), **S** = special / Stitch-composed (do not swap ad hoc).

| Path | Recommended hero | Notes |
| ---- | ---------------- | ----- |
| `/` | **S** | Stitch editorial home; unchanged unless full redesign. |
| `/about` | **L** | Pillar narrative. |
| `/manifesto` | **M** | Charter / provocation. |
| `/vision` | **M** | Future-state authority. |
| `/movemental-at-100` | **M** | Pair with `/vision`; same family. |
| `/knowledge-ecosystem` | **L** | Lighter “field / system” read; optional **FS** if you show a diagram in-hero. |
| `/who-is-a-movement-leader` | **L** | Same band as `/about` where both are definitional. |
| `/movement-leaders` | **L** | Audience triple — **match `/churches` and `/nonprofits`**. |
| `/churches` | **L** | Same structure as other audience pages. |
| `/nonprofits` | **L** | Same structure as other audience pages. |
| `/platform` | **L** or **FS** | Product story: split if you need a schematic in-hero. |
| `/system` | **L** or **FS** | Prefer **FS** if TOC or subsystem list is primary. |
| `/how-it-works` | **FS** | Process + TOC-friendly. |
| `/walkthrough` | **L** | Guided tour benefits from **human / product context** photo. |
| `/evidence` | **M** or **L** | **M** if you want argument-as-docket; **L** if evidence is “inviting inspectability.” Pick one and align `/pricing` differently for contrast. |
| `/pricing` | **M** (or flat Midnight **P**) | Economics band; avoid clashing with `/evidence` if both use photo—**one** Midnight photo, one flat or light. |
| `/faq` | **P** or **FS** | Minimal hero + search/TOC; photography usually noise. |
| `/services` | **L** | Services hub — light, welcoming. |
| `/services/discovery-lab` | **L** | Sprint / lab framing: light keeps “bounded experiment” open. |
| `/services/organizational-systems` | **L** | Same family as services hub. |
| `/services/system-builds` | **L** | Hub stays light; children go dark (see below). |
| `/services/system-builds/foundation` | **M** | Child uniform **M**. |
| `/services/system-builds/content` | **M** | Child uniform **M**. |
| `/services/system-builds/fundraising` | **M** | Child uniform **M**. |
| `/services/system-builds/governance-ethics` | **M** | Child uniform **M**. |
| `/book` | **B** | Canonical book hero. |
| `/book/read/[slug]` | **P** (chapter chrome) | Reader UX; not marketing photo heroes. |
| `/book/endorse` | **P** | Form-forward. |
| `/book/contributors` | **P** | Index / list. |
| `/book/moderate` | **P** | Internal. |
| `/case-studies` | **L** or **P** | **P** if no unique photography; do not reuse home hero art. |
| `/blog` | **P** | Index; keep thin until editorial volume exists. |
| `/assess` | **P** or **L** | **P** default for form-first; **L** only with assessment-specific art. |
| `/contact` | **P** | Conversion archetype. |
| `/apply` | **P** | Conversion archetype. |
| `/inquiry` | **P** | Conversion archetype. |
| `/privacy` | **P** | Legal; match `/terms` and `/cookies`. |
| `/terms` | **P** | Legal. |
| `/cookies` | **P** | Legal. |

**Archived / non-canonical routes** (e.g. under `_archived/`) may keep experimental heroes for reference; do not treat them as production SSOT.

---

## 5. Implementation checklist (for the agent)

1. **Pick the cell** from section 4; if changing an existing page, note whether you are aligning an outlier to its **archetype** or documenting a **one-off exception** in the PR description.
2. **Compose children** of photo heroes with `Container`, `Eyebrow`, `Display` (`size` consistent with neighbors in the same archetype), one short `Prose` lede, then `Button` / `ArrowLink` row as needed.
3. **Nav offset:** preserve the site’s fixed nav clearance pattern (e.g. `className` with `pt-[calc(4rem+…)]` or equivalent) so heroes do not slide under `SiteNav`.
4. **Accessibility:** meaningful `imageAlt`; scrims are decorative (`aria-hidden` is already on scrim layers in the primitives—do not remove).
5. **No token regressions:** no raw hex, `bg-white`, or ad hoc `border` between major bands; scrim and section variants stay semantic.
6. After bulk changes, run **`pnpm lint`** and **`pnpm typecheck`** on touched files.

---

## 6. Maintenance

When new `(site)` routes ship, add a row to **section 4** and assign an archetype in **section 3**. When new hero **primitives** are added to `src/components/primitives/`, extend **section 1** and revisit archetype defaults if the new primitive fills a gap (e.g. video-backed hero).
