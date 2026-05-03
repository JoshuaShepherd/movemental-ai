# Design tokens — Movemental

**Canonical implementation:** `src/app/globals.css` (`:root` + `@theme inline` + `@layer base`).  
**Reference export:** [`tokens.css`](./tokens.css) (keep values aligned when tokens change).

Tailwind v4 maps semantic names to utilities at build time from `@theme inline`. In TSX, prefer **`bg-*` / `text-*` utilities** that resolve to these tokens—not raw hex.

---

## Color — surfaces

Depth is **tonal stacking** (ghost lift): e.g. `bg-card` on `bg-section` reads as elevation without a border.

| Token / utility | CSS variable | Purpose | When not to use |
| --------------- | ------------ | ------- | ----------------- |
| `background` | `--background` | Default page canvas (`#f7f9fb`) | As the only layer everywhere—alternate with `section` for rhythm |
| `section` / `muted` | `--section`, `--muted` | Softer band between defaults; footer | For text that needs maximum contrast on white—use `card` |
| `card` | `--card` | Sheets, cards, nav glass base | Avoid stacking pure white on white with no tonal step |
| `elevated` / `secondary` | `--elevated`, `--secondary` | Inset wells, hover lift, icon wells | As large hero fields—can feel heavy at full bleed |
| `surface-highest` | `--surface-highest` | Input-like inset | Decorative page backgrounds |
| `foreground` | `--foreground` | Primary ink | On `midnight` without switching to `inverse-foreground` |
| `muted-foreground` | `--muted-foreground` | Secondary ink, body in `Prose` | Large display headlines (use `foreground`) |
| `inverse-surface` | `--inverse-surface` | Midnight bands | More than ~2 consecutive full-width bands without a light breather |
| `inverse-foreground` | `--inverse-foreground` | Text on midnight | Light sections (use `foreground`) |

**Midnight scoping:** `Section` with `variant="midnight"` sets `data-variant="midnight"`. Base styles in `globals.css` remap headings inside that scope so `text-foreground` patterns still resolve to inverse ink where appropriate.

---

## Color — brand & state

| Token / utility | CSS variable | Purpose | When not to use |
| --------------- | ------------ | ------- | ----------------- |
| `primary` | `--primary` | Actions, key links, focus | Hero backgrounds, huge panels |
| `primary-dim` | `--primary-dim` | Gradient end (CTA only) | Solid fills without gradient intent |
| `primary-foreground` | `--primary-foreground` | Text on primary | On non-primary backgrounds |
| `destructive` | `--destructive` | Errors, destructive actions | Decoration |

**CTA gradient (allowed only for buttons / pills):** `--gradient-primary` = `linear-gradient(135deg, var(--primary), var(--primary-dim))`. No other marketing gradients.

---

## Chrome — borders, rings, inputs

| Token / utility | CSS variable | Purpose |
| --------------- | ------------ | ------- |
| `border` | `--border` | `outline_variant` @ 15% opacity—forms, dividers inside components |
| `input` | `--input` | Field chrome |
| `ring` | `--ring` | Focus ring (primary @ 20%) |
| `outline` | `--outline` | Raw reference; prefer `border` token |

**No-line rule (major sections):** do not use `border-t` / `divide-y` between page-scale bands. **Exception:** form controls, compact chips on midnight (`HomeEvidence`), and **intra-section** accent rails (pull-quote indicators) are not “section dividers.”

---

## Typography

**Family:** Inter only (`next/font/google` in `src/app/layout.tsx`, variable `--font-sans`). `@theme inline` repeats literal Inter names for Tailwind parse safety.

| Role | Implementation | Notes |
| ---- | ---------------- | ----- |
| Display / hero | `Display` primitive (`size` lg/md/sm) | `font-semibold`, `leading-[1.05]`, `tracking-[-0.02em]`, `text-balance` |
| Page headings | `h2`–`h4` in `@layer base` | `tracking-tight`, `text-foreground` |
| Eyebrow | `Eyebrow` primitive | `0.75rem`, `uppercase`, `tracking-[0.05em]`, `text-muted-foreground` |
| Body (marketing column) | `Prose` | `text-base`, `leading-[1.7]`, `text-muted-foreground`, `max-w-[var(--prose-max)]` |
| Emphasis in prose | `[&_strong]:text-foreground` | Keeps container muted for reading stamina |
| Links in prose | `text-primary`, underline on hover | See `prose.tsx` |

**Contextual overrides (use sparingly):** centered hero subheads may apply `text-xl` / `text-2xl`, `font-light`, `text-center` on `Prose`. That is a **local composition choice**, not a second body token.

---

## Spacing — section vertical rhythm

| Token | Value | Utility pattern |
| ----- | ----- | ---------------- |
| `--section-y-sm` | `80px` | `Section` default (`spacing="sm"`) |
| `--section-y-lg` | `120px` | Hero / landmark (`spacing="lg"`) |

Heros that tuck under the nav add **extra top padding** inside `Container` (e.g. `pt-32` … `lg:pt-48`)—see `HomeHero`.

---

## Layout — width

| Token | Value | Usage |
| ----- | ----- | ----- |
| `--container-max` | `1200px` | `Container` + nav inner row |
| `--prose-max` | `680px` | `Prose` default measure |

**Common headline widths (composition, not global tokens):** `max-w-4xl`, `max-w-3xl`, `max-w-5xl` appear in homepage sections for display balance.

---

## Radius

| Scale | Source | Typical use |
| ----- | ------ | ----------- |
| Base | `--radius: 0.375rem` | Design doc “md” |
| Tailwind steps | `rounded-xs` … `rounded-xl` from `@theme inline` | Utility shell |
| Marketing soft cards | `rounded-3xl`, `rounded-2xl`, `rounded-[2.5rem]` in sections | **Normalize toward:** large marketing cards `rounded-3xl` or `rounded-[2.5rem]`; chips `rounded-full`; controls follow shadcn defaults |

**Known tension:** shadcn `Button` uses `rounded-lg` in `buttonVariants` (`src/components/ui/button.tsx`). DESIGN.md notes this. Marketing can override with `className` (e.g. `rounded-full` on Services hero) when the Stitch spec demands it—prefer **one pattern per page** for primary buttons.

---

## Shadow

| Token | Value | When |
| ----- | ----- | ---- |
| `shadow-ambient` | `0 12px 40px rgba(42, 52, 57, 0.06)` | Floating cards (audience cards on hover), eyebrow pill on hero, media frames |

Do not introduce `shadow-md`, `shadow-lg`, or arbitrary rgba shadows in marketing pages.

---

## Motion

| Source | Behavior |
| ------ | -------- |
| `globals.css` `@media (prefers-reduced-motion: reduce)` | Collapses transitions/animations |
| `ArrowLink` | `group-hover/arrow:translate-x-1` on icon |
| Section hover (e.g. bento) | `duration-500` tonal transitions |

Custom motion (GSAP, etc.) must respect reduced-motion.

---

## Z-index

| Layer | Pattern |
| ----- | ------- |
| Fixed nav | `z-50` on `SiteNav` header |
| Section content over decorative layers | `relative z-10` where needed |

Avoid ad-hoc z-index stacks; use the nav as the high watermark unless a modal/dialog is open (shadcn layers).

---

## Examples (utilities → intent)

```tsx
<Section variant="section">…</Section>           // tonal band
<div className="rounded-3xl bg-card …">        // ghost lift card
<Button variant="default">…</Button>            // primary action
<ArrowLink href="…" tone="foreground">…</ArrowLink> // editorial secondary path
```

---

## Change control

Any token change requires updating **both** `globals.css` and [`tokens.css`](./tokens.css), plus `docs/design/DESIGN.md` section 3, then this file. Run `pnpm lint` and `pnpm typecheck`.
