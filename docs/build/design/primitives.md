# Primitives (L2)

Foundational building blocks. **All marketing pages should default to these** before inventing local divs with ad-hoc Tailwind.

**Source:** `src/components/primitives/`  
**Barrel:** `src/components/primitives/index.ts`

Each primitive exposes `data-slot="…"` for debugging and targeted CSS.

---

## Section

**File:** `src/components/primitives/section.tsx`

| Prop | Values | Role |
| ---- | ------ | ---- |
| `variant` | `default`, `section`, `elevated`, `midnight` | Full-bleed tonal band |
| `spacing` | `sm` (80px), `lg` (120px) | Vertical padding via `--section-y-*` |
| `as` | polymorphic | Rarely change from `section` |

**Visual behavior:** No borders; the edge is defined only by the background change against the previous band.

**Anti-patterns:**

- Wrapping a page in one giant `Section` with internal borders
- Using `midnight` for more than alternating narrative emphasis (fatigue)

**Midnight:** Sets `data-variant="midnight"`; `globals.css` remaps heading colors inside the band.

---

## Container

**File:** `src/components/primitives/container.tsx`

**Role:** Horizontal safe area + `max-w-[var(--container-max)]` (1200px).

**Spacing:** `px-4 sm:px-6 lg:px-12` — matches nav inner wrapper (`site-nav.tsx`).

**Anti-patterns:**

- `max-w-7xl` / arbitrary max widths for marketing pages (breaks the single rail)
- Nesting multiple full-width `Container` rows with conflicting padding (usually one per horizontal slice)

---

## Display

**File:** `src/components/primitives/display.tsx`

**Role:** Hero-scale heading (`size`: `lg` | `md` | `sm`). Responsive steps built in.

**Typography:** `font-semibold`, `leading-[1.05]`, `tracking-[-0.02em]`, `text-balance`.

**Content guidance:** One primary clause per `Display`. Split emphasis with muted spans only when hierarchy stays obvious (see `HomeMechanism` closing).

**Anti-patterns:**

- Using `Display` for card titles (too large—use `text-2xl font-bold` pattern inside cards)
- Stacking two `Display lg` without a visual or tonal break between them

---

## Eyebrow

**File:** `src/components/primitives/eyebrow.tsx`

**Role:** Overline / kicker above a `Display` or section title.

**Default style:** `0.75rem`, `uppercase`, `tracking-[0.05em]`, `text-muted-foreground`.

**Approved contextual variants (pill / wide tracking):** Homepage and Services use **pill treatments** with wider tracking (`tracking-[0.2em]`–`0.25em]`) and backgrounds (`bg-card`, `bg-elevated`, `bg-foreground` + inverse text). Treat these as **composition layers** on top of `Eyebrow`, not a forked component—document the intent: “pill kicker” vs “plain kicker.”

**Anti-patterns:**

- Eyebrow copy longer than one line on mobile (shorten the kicker)
- `text-primary` eyebrows that fight a `Display` directly beneath (reserve primary for links/actions unless spec calls for category color)

---

## Prose

**File:** `src/components/primitives/prose.tsx`

**Role:** Reading column for marketing body: `max-w-[var(--prose-max)]`, `leading-[1.7]`, `text-muted-foreground`.

**Links:** `text-primary`, underline on hover.

**Anti-patterns:**

- Setting the whole container to `text-foreground` for long paragraphs (hurts reading stamina)
- Using `Prose` for dense FAQ lists without tightening structure—prefer lists with clear `text-foreground` headings per item

---

## ArrowLink

**File:** `src/components/primitives/arrow-link.tsx`

**Role:** Editorial CTA row: label + `ArrowRight`, hover slide, **`focus-visible` ring** (`ring-primary`).

| Prop | Values |
| ---- | ------ |
| `size` | `sm`, `md`, `lg` |
| `tone` | `primary`, `foreground` |

Uses `group/arrow` to avoid clashing with parent `group` (e.g. cards).

**Anti-patterns:**

- Raw `<Link className="flex items-center gap-3">` duplicates without focus ring
- Using `lg` size for inline links in paragraphs—reserve for section closers

**Where it appears:** `HomeAudiences` card CTAs (`tone="foreground"`).

---

## Button (L3 but referenced here)

Marketing pages use **`Button`** from `src/components/ui/button.tsx` for solid / outline actions. See [`components.md`](./components.md).

---

## Patterns not yet extracted (should become primitives if repeated)

These appear multiple times in `sections/` and `services/page.tsx`:

| Pattern | Current locations | Primitive candidate |
| ------- | ----------------- | ------------------- |
| Pill kicker | `HomeHero`, `HomeMechanism`, Services hero | `Eyebrow` variant `pill` + tone tokens |
| Vertical connector | `HomeMechanism` (`bg-elevated` rounded pill) | `Connector` (decorative, `aria-hidden`) |
| Pull-quote rail | `HomePhilosophy` (`w-1` inverse column) | `AccentRail` (not a section border) |
| Media + grayscale hover | `HomeAudiences`, Services hero | `MediaFrame` with documented hover |
| CTA row (primary + secondary) | `HomeHero` | `CtaGroup` wrapping two `Button`s |

Until extracted, **copy the established homepage pattern** rather than inventing new flex gaps and radii.

---

## Card shell (marketing)

Not a single exported primitive today. **Canonical marketing card:**

- `rounded-3xl` (or `rounded-2xl` for denser grids)
- `bg-section` or `bg-card` on a contrasting `Section` variant
- Hover: tonal shift (`hover:bg-card`) and/or `hover:shadow-ambient`
- Optional `group` for coordinated icon inversion (`HomeBento`)

**Contrast:** shadcn `Card` (`ui/card.tsx`) uses `ring-1 ring-foreground/10`—appropriate for **UI dashboards / forms**, not the default marketing ghost-lift card.

---

## Implementation notes for agents

1. Import primitives from `@/components/primitives`.
2. Compose as: `Section` → `Container` → headings / `Prose` / grids.
3. After **two** copy-pastes of the same JSX block, extract to `src/components/sections/`.
