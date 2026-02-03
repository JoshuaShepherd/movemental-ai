# Prompt: Template Card & Color Palette Blending Fix

## Problem Summary

Template components are meant to look visually distinct per variant, but cards and UI chrome (template-switchers) blend together because:

1. **Template-switcher components use global shadcn/ui colors** (`bg-muted`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`, `bg-background`, `border-border`) instead of `--mvmt-*` tokens. Since these resolve to the sitewide Movemental palette (scarlet-rush reds, velvet-orchid purples), every template switcher looks identical regardless of which variant is active.

2. **Variant color overrides are too narrow.** Most variants only override `--mvmt-accent`, `--mvmt-cta-bg`, and `--mvmt-surface-dark`. They do NOT override surface-light, border, or text tokens. This means card backgrounds (`bg-mvmt-surface-light`), borders (`border-mvmt-border-light`), and text (`text-mvmt-text-secondary`) resolve to the same base values across all variants — making cards look identical even when the accent color changes.

3. **Some card decorative elements use hardcoded hex colors** (e.g. `content-case-studies.tsx` uses `#DBEAFE`, `#E0E7FF`, `#FCE7F3` for card header backgrounds). These never respond to variant theming at all.

---

## Affected Files

### Category A: Template-switcher components (17 files) — use global colors, should use `--mvmt-*`

All files matching `components/layouts/movement-leader/*-template-switcher.tsx` plus `template-switcher.tsx`:

- `about-template-switcher.tsx`
- `articles-template-switcher.tsx`
- `assessments-template-switcher.tsx`
- `auth-template-switcher.tsx`
- `books-template-switcher.tsx`
- `chat-template-switcher.tsx`
- `content-template-switcher.tsx`
- `courses-template-switcher.tsx`
- `faq-template-switcher.tsx`
- `lead-magnet-template-switcher.tsx`
- `misc-template-switcher.tsx`
- `pricing-template-switcher.tsx`
- `reader-template-switcher.tsx`
- `search-template-switcher.tsx`
- `special-template-switcher.tsx`
- `testimonials-template-switcher.tsx`
- `template-switcher.tsx`

**Global classes found in these files:**
- `bg-primary` / `text-primary-foreground` (active filter pills)
- `bg-muted` / `hover:bg-muted` (dropdown items, hover states)
- `text-muted-foreground` (labels, category tags)
- `bg-background` (dropdown background)
- `border-border` (button/dropdown borders)

### Category B: Variant CSS in `globals.css` — insufficient token overrides

Most variant blocks (lines 280–2600 in `globals.css`) only set:
- `--mvmt-accent` / `--mvmt-accent-hover`
- `--mvmt-cta-bg` / `--mvmt-cta-text`
- `--mvmt-surface-dark` / `--mvmt-surface-dark-elevated` (some variants)

They do NOT set:
- `--mvmt-surface-light` / `--mvmt-surface-light-muted`
- `--mvmt-border-light` / `--mvmt-border-medium`
- `--mvmt-text-primary` / `--mvmt-text-secondary` / `--mvmt-text-muted`
- `--mvmt-on-dark-primary` / `--mvmt-on-dark-secondary`

This means all light-surface cards look the same (`#FFFFFF` bg, `#E2E8F0` border, `#1A1A2E` heading, `#64748B` body text) across every variant.

### Category C: Hardcoded card decoration colors

Files with inline hex colors for card visual elements that ignore the variant system:
- `content-case-studies.tsx` — `#DBEAFE`, `#E0E7FF`, `#FCE7F3` card headers
- Various other components with hardcoded avatar/placeholder colors

---

## Fix Plan

### Fix 1: Migrate template-switcher components to `--mvmt-*` tokens

For all 17 template-switcher files, replace global shadcn classes with mvmt equivalents:

| Global class | Replace with |
|---|---|
| `bg-background` | `bg-mvmt-surface-light` |
| `bg-muted` / `hover:bg-muted` | `bg-mvmt-surface-light-muted` / `hover:bg-mvmt-surface-light-muted` |
| `bg-primary` | `bg-mvmt-accent` (or inline `style={{ backgroundColor: 'var(--mvmt-accent)' }}`) |
| `text-primary-foreground` | `text-mvmt-cta-text` (or inline `style={{ color: 'var(--mvmt-cta-text)' }}`) |
| `text-muted-foreground` | `text-mvmt-text-muted` |
| `border-border` | `border-mvmt-border-light` |

Since all switchers share the same structure, this is a mechanical find-and-replace per file.

### Fix 2: Expand variant CSS token overrides in `globals.css`

For each variant block in `globals.css`, add overrides for card-relevant tokens. Group variants by visual family:

**Light/warm variants** (e.g. `centered-product`, `centered-serif`, `clean-minimal-alt`):
```css
--mvmt-surface-light: #FFFBF5;          /* warm white */
--mvmt-surface-light-muted: #FFF8F0;
--mvmt-border-light: #E8DDD0;           /* warm border */
--mvmt-border-medium: #D4C4B0;
```

**Cool/blue variants** (e.g. `circular-feature`, `chat-widget`):
```css
--mvmt-surface-light: #F8FAFF;          /* cool white */
--mvmt-surface-light-muted: #F0F4FF;
--mvmt-border-light: #D4DFEF;           /* cool border */
```

**Dark variants** (e.g. `dark-features`, `agency-gradient`):
```css
--mvmt-surface-light: #1E1E2E;          /* dark card */
--mvmt-surface-light-muted: #252538;
--mvmt-border-light: rgba(255,255,255,0.1);
--mvmt-text-primary: #F1F5F9;
--mvmt-text-secondary: #94A3B8;
```

**Neutral/minimal variants** (e.g. `clean-minimal`):
```css
--mvmt-surface-light: #FFFFFF;
--mvmt-border-light: #E5E5E5;           /* neutral gray */
--mvmt-border-medium: #D4D4D4;
```

Each variant should override at minimum: `--mvmt-surface-light`, `--mvmt-surface-light-muted`, `--mvmt-border-light`, and optionally `--mvmt-text-secondary` to give cards a distinct feel.

### Fix 3: Replace hardcoded card decoration colors with CSS variables

Add new per-variant tokens for decorative card elements:

```css
/* In base .template-movement-leader: */
--mvmt-card-decorative-1: #DBEAFE;
--mvmt-card-decorative-2: #E0E7FF;
--mvmt-card-decorative-3: #FCE7F3;
```

Then in components, replace:
```tsx
// Before
{ color: "#DBEAFE" }

// After
{ color: "var(--mvmt-card-decorative-1)" }
```

And override per variant in CSS to match the variant's palette.

---

## Execution Order

1. **Fix 1 first** — template-switchers. Mechanical replacement, no visual design decisions needed.
2. **Fix 2 second** — expand variant tokens. Requires choosing per-variant surface/border colors that complement each variant's accent. Do a few representative variants first (one warm, one cool, one dark, one neutral) and validate visually before doing all ~180 variants.
3. **Fix 3 last** — decorative colors. Lower priority since these are small visual elements.

## Validation

After each fix:
1. `npx tsc --noEmit` — type check passes
2. `npm run build` — build succeeds
3. Visual check: navigate to `/templates/movement-leader/` and switch between variants. Cards, switcher UI, and section backgrounds should look noticeably different per variant.
