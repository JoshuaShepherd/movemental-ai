# Prompt: Clean Up Hard-Coded Styles and Unify Design Through Tailwind

## Objective

Eliminate all hard-coded styles that bypass Tailwind's design system across the Movemental AI public-facing codebase. After this cleanup, every color, spacing value, font size, and visual property should be controllable from `tailwind.config.ts` and `globals.css` — giving us a single source of truth for the entire visual language.

---

## Problem Summary

An audit of all non-template pages (`app/(public)/`) and components (`components/` excluding `components/ui/`) found **~1,500+ hard-coded style violations** across **~130 files**. These fall into four categories that need resolution in priority order.

---

## Priority 1: Inline `style={{}}` with `--mvmt-*` CSS Variables (~1,262 occurrences, ~96 files)

### What's wrong

The `components/layouts/movement-leader/` template components apply colors, backgrounds, borders, and text colors via inline `style={{ color: "var(--mvmt-text-primary)" }}` instead of Tailwind utility classes. This means:

- Tailwind can't tree-shake or optimize these styles
- Dark mode, responsive overrides, and hover states can't layer on top
- The styles are invisible to Tailwind's design system and can produce contrast conflicts with the base theme defined in `globals.css`

### What to do

1. **Register all `--mvmt-*` tokens as Tailwind colors** in `tailwind.config.ts` under `theme.extend.colors.mvmt`:

```ts
mvmt: {
  "on-dark-primary": "var(--mvmt-on-dark-primary)",
  "on-dark-secondary": "var(--mvmt-on-dark-secondary)",
  "on-dark-muted": "var(--mvmt-on-dark-muted)",
  "on-dark-subtle": "var(--mvmt-on-dark-subtle)",
  "text-primary": "var(--mvmt-text-primary)",
  "text-secondary": "var(--mvmt-text-secondary)",
  "text-muted": "var(--mvmt-text-muted)",
  "surface-dark": "var(--mvmt-surface-dark)",
  "surface-dark-elevated": "var(--mvmt-surface-dark-elevated)",
  "surface-light": "var(--mvmt-surface-light)",
  "surface-light-muted": "var(--mvmt-surface-light-muted)",
  accent: "var(--mvmt-accent)",
  "accent-hover": "var(--mvmt-accent-hover)",
  "cta-bg": "var(--mvmt-cta-bg)",
  "cta-text": "var(--mvmt-cta-text)",
  "border-on-dark": "var(--mvmt-border-on-dark)",
  "border-on-dark-medium": "var(--mvmt-border-on-dark-medium)",
  "border-light": "var(--mvmt-border-light)",
  "border-medium": "var(--mvmt-border-medium)",
  "footer-bg": "var(--mvmt-footer-bg)",
  "footer-text": "var(--mvmt-footer-text)",
  "footer-text-highlight": "var(--mvmt-footer-text-highlight)",
}
```

Also register shadow, radius, and font-family tokens:

```ts
// theme.extend.boxShadow
"mvmt-sm": "var(--mvmt-shadow-sm)",
"mvmt-md": "var(--mvmt-shadow-md)",
"mvmt-lg": "var(--mvmt-shadow-lg)",

// theme.extend.borderRadius
"mvmt-sm": "var(--mvmt-radius-sm)",
"mvmt-md": "var(--mvmt-radius-md)",
"mvmt-lg": "var(--mvmt-radius-lg)",
"mvmt-xl": "var(--mvmt-radius-xl)",

// theme.extend.fontFamily
"mvmt-heading": "var(--mvmt-font-heading)",
"mvmt-body": "var(--mvmt-font-body)",
```

2. **Replace all inline style references** in the ~96 layout component files. For example:

```tsx
// BEFORE
<h1 style={{ color: "var(--mvmt-on-dark-primary)" }}>Title</h1>

// AFTER
<h1 className="text-mvmt-on-dark-primary">Title</h1>
```

```tsx
// BEFORE
<div style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>

// AFTER
<div className="bg-mvmt-surface-dark">
```

3. **For gradient tokens** (`--mvmt-gradient-*`) that can't be expressed as single Tailwind utilities, create a small set of utility classes in `globals.css`:

```css
.bg-mvmt-gradient-hero-brand { background: var(--mvmt-gradient-hero-brand); }
.bg-mvmt-gradient-hero-dark { background: var(--mvmt-gradient-hero-dark); }
.bg-mvmt-gradient-overlay-dark { background: var(--mvmt-gradient-overlay-dark); }
.bg-mvmt-gradient-overlay-hero { background: var(--mvmt-gradient-overlay-hero); }
```

### Files to process

All `.tsx` files in `components/layouts/movement-leader/`. The top offenders by inline style count:

| File | Count |
|------|-------|
| `chat-team-channels.tsx` | 52 |
| `chat-split-templates.tsx` | 47 |
| `books-detail-cart.tsx` | 38 |
| `chat-panel-sidebar.tsx` | 37 |
| `chat-assistant-friendly.tsx` | 34 |
| `chat-suggestion-chips.tsx` | 30 |
| `books-detail-modal.tsx` | 30 |
| `search-resource-hub.tsx` | 29 |
| `chat-hero-overlay.tsx` | 28 |
| `books-filtered-grid.tsx` | 26 |

Process ALL files in this directory, not just the top offenders.

---

## Priority 2: Hard-Coded Hex Colors in Tailwind Arbitrary Values (4 occurrences, 1 file)

### What's wrong

`components/onboarding/OnboardingForm.tsx` uses `bg-[#1A1A1A]`, `bg-[#2A2A2A]`, and `text-[#1A1A1A]` — raw hex codes that bypass the theme.

### What to do

These hex values (`#1A1A1A`, `#2A2A2A`) match the `--mvmt-surface-dark` and `--mvmt-surface-dark-elevated` tokens already defined in `globals.css`. Replace them:

```tsx
// BEFORE
className="bg-[#1A1A1A]"    → className="bg-mvmt-surface-dark"
className="bg-[#2A2A2A]"    → className="bg-mvmt-surface-dark-elevated"
className="text-[#1A1A1A]"  → className="text-mvmt-surface-dark"
```

### File

- `components/onboarding/OnboardingForm.tsx` — lines 74, 81, 100, 123

---

## Priority 3: Arbitrary Font Sizes Below `text-xs` (~40 occurrences, ~25 files)

### What's wrong

Components use `text-[8px]`, `text-[9px]`, `text-[10px]`, and `text-[11px]` — sizes below Tailwind's smallest default (`text-xs` = 12px). These create inconsistent micro-typography and can cause contrast/readability issues.

### What to do

1. **Extend Tailwind's fontSize scale** in `tailwind.config.ts`:

```ts
fontSize: {
  "2xs": ["0.625rem", { lineHeight: "0.875rem" }],  // 10px — replaces text-[10px]
  "3xs": ["0.5rem", { lineHeight: "0.75rem" }],      // 8px  — replaces text-[8px]
}
```

2. **Decide whether 8px and 9px sizes are actually needed.** Audit each usage — most of these appear in layout template previews where the small sizes simulate real UI at reduced scale. If legitimate, use the new tokens. If not, bump up to `text-2xs` or `text-xs`.

3. **Replace all arbitrary font-size values:**

```tsx
text-[8px]  → text-3xs   (or bump to text-2xs)
text-[9px]  → text-2xs   (round up from 9px to 10px)
text-[10px] → text-2xs
text-[11px] → text-xs    (round up from 11px to 12px)
```

### Files affected

Primarily in `components/layouts/movement-leader/`:
- `chat-team-channels.tsx` (8 occurrences)
- `chat-split-templates.tsx` (5)
- `chat-suggestion-chips.tsx` (4)
- `chat-panel-sidebar.tsx` (3)
- `chat-widget-popup.tsx` (3)
- Plus ~20 other layout and dashboard component files (1-2 each)

---

## Priority 4: Arbitrary Pixel Values in Sizing/Spacing (~30 occurrences, ~27 files)

### What's wrong

Components use arbitrary pixel values like `w-[800px]`, `h-[400px]`, `min-h-[160px]`, `max-w-[900px]`, `pl-[14px]`, `ml-[-2px]` that bypass Tailwind's spacing scale.

### What to do

1. **Map values to the nearest Tailwind scale value where possible:**

| Arbitrary | Tailwind equivalent |
|-----------|-------------------|
| `max-w-[900px]` | `max-w-4xl` (896px) or define a custom token |
| `max-w-[280px]` | `max-w-xs` (320px) or define custom |
| `min-h-[160px]` | `min-h-40` (160px) ✓ exact match |
| `h-[200px]` | `h-52` (208px) — close enough, or define token |
| `h-[400px]` | `h-96` (384px) — close, or `h-[25rem]` |
| `w-[800px]` | `w-[50rem]` if needed, but prefer `max-w-3xl` |
| `min-w-[600px]` | `min-w-[37.5rem]` — define a breakpoint-based approach |

2. **For values used in data visualizations** (charts, timelines) that need exact pixel control, move them to Tailwind config as named tokens:

```ts
// theme.extend.spacing or theme.extend.width
"chart-sm": "7.5rem",   // 120px
"chart-md": "12.5rem",  // 200px
"chart-lg": "15rem",    // 240px
```

3. **For the decorative circles** in `onboarding-path/OnboardingHero.tsx` (`w-[800px]`, `w-[600px]`, `w-[400px]`), either use `size-` utilities with rem values or extract to config.

### Key files

- `components/onboarding-path/OnboardingHero.tsx` (6 arbitrary values)
- `components/valuation/visualizations/` (multiple chart files)
- `components/dashboard/DashboardSidebar.tsx`
- `components/fit-check/ScaleInput.tsx`
- Various layout template files

---

## Priority 5: Remaining Inline Styles in Non-Layout Components (~30 occurrences, ~27 files)

### What's wrong

Functional components outside `layouts/movement-leader/` use inline `style={{}}` for dynamic values like progress bar widths, chart bar heights, and animation transforms.

### What to do

**These are the lowest priority** because many are legitimately dynamic (computed at runtime from data). Evaluate case-by-case:

- **Dynamic width/height percentages** (progress bars, chart bars): Keep inline styles — Tailwind can't handle runtime-computed percentages. No action needed.
- **Animation transforms** (`scaleX`, positioning): Keep if driven by scroll/animation state.
- **Static layout values** (`width: 100%`, `left: 50%`): Replace with `w-full`, `left-1/2`, etc.

### Files to review

- `components/valuation/visualizations/ValuationMathCard.tsx` — `width: 100%`, `left: 50%` → use Tailwind
- `components/e-reader/EReaderContent.tsx` — review if styles are truly dynamic
- All other files listed in Priority 1's non-layout table

---

## Validation Checklist

After completing all changes:

1. **Run `npx tsc --noEmit`** — confirm no TypeScript errors
2. **Run `npm run build`** — confirm production build succeeds
3. **Search for remaining violations:**
   - `grep -r "style={{" components/ --include="*.tsx"` — should only return legitimately dynamic styles
   - `grep -rP "bg-\[#|text-\[#|border-\[#" components/ --include="*.tsx"` — should return zero
   - `grep -rP "text-\[\d+px\]" components/ --include="*.tsx"` — should return zero (all migrated to named tokens)
4. **Visual regression check** — compare screenshots of key pages before/after:
   - Homepage (`/`)
   - AI Vision (`/ai-vision`)
   - Pricing (`/pricing`)
   - Book pages (`/book`, `/books`)
   - Fit Check (`/fit-check`)
   - Team (`/team`)
   - Any page that renders a layout template preview

---

## Scope Exclusions

- `components/ui/` — shadcn/ui managed, do not modify
- `app/(public)/` page files — already clean (zero hard-coded styles found)
- Inline styles that are genuinely runtime-computed (progress bars, chart bars, scroll-driven animations) — keep as inline styles

---

## Architecture Note

The `globals.css` file already defines all `--mvmt-*` CSS custom properties correctly, scoped under `.template-movement-leader` with per-variant overrides. The CSS layer is sound. The problem is entirely in the **consumption layer** — components read these tokens via inline `style={{}}` instead of Tailwind classes. Registering the tokens in `tailwind.config.ts` and replacing inline styles with utility classes is the fix.
