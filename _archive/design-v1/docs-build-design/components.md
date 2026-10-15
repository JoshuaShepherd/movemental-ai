# Components (L3–L4)

Approved compositions: **UI shell** (shadcn) + **domain sections** (homepage blocks, nav). Pages should assemble these rather than bespoke Tailwind sculptures.

---

## L3 — UI shell (shadcn / Radix)

**Location:** `src/components/ui/`  
**Rule:** Do not hand-edit generated files for one-off polish—wrap or pass `className`.

### Button

**File:** `src/components/ui/button.tsx`

| Variant | Use |
| ------- | --- |
| `default` | Primary conversion actions |
| `outline` | Secondary hero CTA, low-commitment paths |
| `secondary` / `ghost` | Toolbar-style contexts (nav uses `default` for CTA) |
| `link` | Inline text actions inside dense copy |
| `destructive` | Rare on marketing site |

**Marketing sizing:** Hero patterns use `size="lg"` + `className` height/px overrides (`h-14`, `h-16`) for touch-friendly targets. **Radius:** default is `rounded-lg` from CVA; Services hero uses `rounded-full` override—**pick one primary shape per page** to avoid clown buttons.

### Card

**File:** `src/components/ui/card.tsx`

**Use for:** grouped **UI** content (settings-like layouts), not the default marketing bento tile (those use plain `li`/`div` + tonal classes—see `HomeBento`).

Marketing may use `Card` when adopting shadcn composition for a form or pricing table later.

### Input, Textarea, Label, Dialog, Sheet, …

Use for real interactivity. Always keep **`border-border`** and **`ring-ring`** behavior.

---

## L4 — Global chrome

### SiteNav

**File:** `src/components/nav/site-nav.tsx`

- Fixed `z-50`, full width
- Glass: `bg-card/80 backdrop-blur-xl` (with `supports-[backdrop-filter]:bg-card/70`)
- Inner row mirrors `Container` padding + `max-w-[var(--container-max)]`
- Brand link + `SiteNavMenus` (client) + CTA `Button` + `MobileNav`

### SiteFooter

**File:** `src/components/nav/site-footer.tsx`

- `bg-section` (tonal), **no top border**
- `Container` + multi-column link grids
- Link classes: `text-muted-foreground` → hover `text-foreground`, `focus-visible:ring-primary`, `min-h-11` touch targets

### MobileNav / SiteNavMenus

**Files:** `mobile-nav.tsx`, `site-nav-menus.tsx`, config in `nav-links.ts`

---

## L4 — Homepage sections (canonical set)

**Directory:** `src/components/sections/`  
**Composer:** `src/app/(site)/page.tsx`

| Component | File | Problem it solves |
| --------- | ---- | ------------------- |
| `HomeHero` | `home-hero.tsx` | Above-the-fold promise + dual CTA |
| `HomePhilosophy` | `home-philosophy.tsx` | Midnight thesis—adaptive challenge |
| `HomeBento` | `home-bento.tsx` | Explain “what this is” as four capability tiles |
| `HomeAudiences` | `home-audiences.tsx` | Segment visitors by audience type |
| `HomeEvidence` | `home-evidence.tsx` | Proof + screenshot (midnight) |
| `HomeMechanism` | `home-mechanism.tsx` | Three-level process narrative |
| `HomeFinalCta` | `home-final-cta.tsx` | Single closing invitation |

### Primitives used (summary)

| Section | `Section` variant | Key primitives / UI |
| ------- | ----------------- | --------------------- |
| Hero | *(raw `section` — see migration notes)* | `Container`, `Display`, `Eyebrow`, `Prose`, `Button` |
| Philosophy | `midnight` / `lg` | `Display`, `Container` |
| Bento | `default` / `lg` | `Display`, `Prose`, `Container` |
| Audiences | `section` / `lg` | `Display`, `ArrowLink`, `Image` |
| Evidence | `midnight` / `lg` | `Display`, proof list, `Image` |
| Mechanism | `default` / `lg` | `Display`, `Eyebrow`, `Prose` |
| Final Cta | `section` / `lg` | `Display`, `Prose`, `Button` |

### Variant / layout rules

- **Hero underlap:** First band uses `-mt-16` + internal top padding so content clears fixed nav (`(site)/layout.tsx` applies `pt-16` to `main`).
- **Bento cards:** Ghost lift only; hover shifts surface + inverts icon well.
- **Audience cards:** `bg-card` on `bg-section`; image `aspect-[16/10]`; hover `shadow-ambient`; grayscale → color on hover.
- **Evidence chips:** `rounded-2xl`, subtle `ring-inverse-foreground/10`—**dense UI exception** on midnight (readable grid).
- **Mechanism:** Embeds `bg-inverse-surface` **inside** a light `Section` for level 02—valid “inset midnight” module.

---

## L4 — Inner pages (example: Services)

**File:** `src/app/(site)/services/page.tsx`

Stitch-derived, composes `Section` + `Container` + grids similarly to home. Treat as **reference implementation** for:

- Sticky sidebar narrative (`lg:sticky lg:top-32`)
- Split media + copy
- Numbered list emphasis (`text-primary` index)

Do not treat every Services one-off as a new system primitive until a **second page** needs the same structure.

---

## Section header block (pattern)

Standard intro block inside a `Section`:

```tsx
<div className="mx-auto mb-24 max-w-3xl text-center">
  <Display size="sm" as="h2" className="mb-6">Title</Display>
  <Prose className="mx-auto text-center text-xl font-light">Subhead</Prose>
</div>
```

**Spacing token:** `mb-24` between intro and grid is common on home; keep within ±8px when reusing.

---

## When to add a new composed component

Add under `sections/` when **all** are true:

1. Appears (or will appear) on **2+ routes**
2. Has a stable **narrative job** (proof, mechanism, CTA…)
3. Can be expressed with **existing tokens** without new hex

Otherwise keep JSX local to the page.

---

## Common mistakes

- Building “feature columns” with `text-center` + icon + `text-sm` for every internal page (feels SaaS)—prefer editorial asymmetry from Services patterns when long-form.
- Using `Card` for every tile—marketing ghost cards usually **should not** use shadcn `Card` ring.
- Omitting `sizes` on `next/image` for responsive layouts.
- Replacing `ArrowLink` with icon-free links and losing focus rings.
