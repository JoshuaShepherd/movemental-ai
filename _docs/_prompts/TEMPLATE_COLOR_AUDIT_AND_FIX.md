# Prompt: Template Color Audit & Fix

## Background

After migrating from a Tailwind v3 config to v4-native `@theme` declarations (see `COLOR_CONFLICT_DIAGNOSIS_AND_FIX.md`), the `mvmt-*` Tailwind utilities now generate CSS correctly. However, the template components themselves have multiple color-application issues that cause wrong or missing colors, poor contrast, and broken variant theming.

---

## Issue 1 (HIGH): Navbar contrast — SiteNavigation is outside variant scope

### Problem

`app/templates/layout.tsx` renders the nav in a SEPARATE `.template-movement-leader` div from the page content:

```tsx
// layout.tsx (current)
<div className="min-h-screen">
  <div className="template-movement-leader">     {/* ← base tokens only, NO data-variant */}
    <SiteNavigation />
  </div>
  {children}                                      {/* ← each page adds its own .template-movement-leader[data-variant="..."] */}
</div>
```

This means:
- The nav always gets **base** `--mvmt-*` tokens (dark surface `#181818`, white text)
- It never receives variant-specific overrides (e.g., a light-themed variant can't make the nav light)
- There are **two separate** `.template-movement-leader` scopes on the page — tokens don't cascade between them

### Fix

Restructure the layout so the nav and page content share a single `.template-movement-leader` wrapper. The `data-variant` must be lifted to this shared wrapper, which requires the layout to know the active variant. Two approaches:

**Option A — URL-based variants (recommended for production):**
Use a query param or route segment (`/templates/articles?variant=art-clean-longform`) so the layout can read it server-side and set `data-variant` on a single shared wrapper around both nav and content.

**Option B — Shared client state (simpler, fine for a showcase):**
Convert `layout.tsx` to use a React context that child pages set:

```tsx
// layout.tsx
"use client";
import { createContext, useContext, useState } from "react";
import { SiteNavigation } from "@/components/layouts/movement-leader";

export const VariantContext = createContext<{
  variant: string;
  setVariant: (v: string) => void;
}>({ variant: "", setVariant: () => {} });

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState("");
  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      <div className="min-h-screen template-movement-leader" data-variant={variant || undefined}>
        <SiteNavigation />
        {children}
      </div>
    </VariantContext.Provider>
  );
}
```

Each page then calls `setVariant(activeTemplate)` via the context instead of managing its own wrapper.

---

## Issue 2 (HIGH): SiteNavigation uses inline styles for colors

### Problem

`components/layouts/movement-leader/site-navigation.tsx` uses inline `style={{}}` and `onMouseEnter`/`onMouseLeave` event handlers to manage hover colors:

```tsx
// Lines 43-48: hover via JS event handlers
onMouseEnter={(e) => (e.currentTarget.style.color = "var(--mvmt-on-dark-primary)")}
onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mvmt-on-dark-muted)")}

// Lines 73-77: active/inactive via inline style
style={{ color: isActive ? "var(--mvmt-on-dark-primary)" : "var(--mvmt-on-dark-secondary)" }}

// Line 55: divider via inline style
style={{ backgroundColor: "var(--mvmt-border-on-dark)" }}
```

This bypasses Tailwind's hover/state system, breaks with SSR, and prevents responsive overrides.

### Fix

Replace all inline styles with Tailwind `mvmt-*` utility classes:

```tsx
// Back link
<Link
  href="/"
  className="flex items-center gap-1.5 text-xs font-medium tracking-wider transition-colors shrink-0 text-mvmt-on-dark-muted hover:text-mvmt-on-dark-primary"
>

// Divider
<div className="h-5 w-px shrink-0 bg-mvmt-border-on-dark" />

// Template links — use conditional classes instead of inline style + JS hover
<Link
  className={cn(
    "px-3 py-2 text-xs font-medium tracking-wider transition-colors whitespace-nowrap rounded-md hover:text-mvmt-on-dark-primary",
    isActive
      ? "text-mvmt-on-dark-primary bg-white/10"
      : "text-mvmt-on-dark-secondary"
  )}
>
```

Remove all `onMouseEnter`/`onMouseLeave` handlers and `style={{}}` props.

---

## Issue 3 (MEDIUM): 62 template components use inline `style={{}}` with `var(--mvmt-*)`

### Problem

62 component files use inline `style={{ color: "var(--mvmt-text-primary)" }}` or `style={{ backgroundColor: "var(--mvmt-surface-dark)" }}` instead of Tailwind utility classes. This was partially addressed in the earlier `STYLE_CLEANUP_PROMPT.md` but remains unresolved.

Now that all `mvmt-*` tokens are registered in `@theme`, every inline `var(--mvmt-*)` reference has a corresponding Tailwind utility.

### Fix — Token-to-class mapping

| Inline style | Replace with Tailwind class |
|---|---|
| `style={{ color: "var(--mvmt-text-primary)" }}` | `text-mvmt-text-primary` |
| `style={{ color: "var(--mvmt-text-secondary)" }}` | `text-mvmt-text-secondary` |
| `style={{ color: "var(--mvmt-text-muted)" }}` | `text-mvmt-text-muted` |
| `style={{ color: "var(--mvmt-on-dark-primary)" }}` | `text-mvmt-on-dark-primary` |
| `style={{ color: "var(--mvmt-on-dark-secondary)" }}` | `text-mvmt-on-dark-secondary` |
| `style={{ color: "var(--mvmt-on-dark-muted)" }}` | `text-mvmt-on-dark-muted` |
| `style={{ color: "var(--mvmt-on-dark-subtle)" }}` | `text-mvmt-on-dark-subtle` |
| `style={{ color: "var(--mvmt-accent)" }}` | `text-mvmt-accent` |
| `style={{ color: "var(--mvmt-cta-text)" }}` | `text-mvmt-cta-text` |
| `style={{ color: "var(--mvmt-footer-text)" }}` | `text-mvmt-footer-text` |
| `style={{ color: "var(--mvmt-footer-text-highlight)" }}` | `text-mvmt-footer-text-highlight` |
| `style={{ backgroundColor: "var(--mvmt-surface-dark)" }}` | `bg-mvmt-surface-dark` |
| `style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}` | `bg-mvmt-surface-dark-elevated` |
| `style={{ backgroundColor: "var(--mvmt-surface-light)" }}` | `bg-mvmt-surface-light` |
| `style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}` | `bg-mvmt-surface-light-muted` |
| `style={{ backgroundColor: "var(--mvmt-accent)" }}` | `bg-mvmt-accent` |
| `style={{ backgroundColor: "var(--mvmt-accent-hover)" }}` | `bg-mvmt-accent-hover` |
| `style={{ backgroundColor: "var(--mvmt-cta-bg)" }}` | `bg-mvmt-cta-bg` |
| `style={{ backgroundColor: "var(--mvmt-footer-bg)" }}` | `bg-mvmt-footer-bg` |
| `style={{ borderColor: "var(--mvmt-border-on-dark)" }}` | `border-mvmt-border-on-dark` |
| `style={{ borderColor: "var(--mvmt-border-on-dark-medium)" }}` | `border-mvmt-border-on-dark-medium` |
| `style={{ borderColor: "var(--mvmt-border-light)" }}` | `border-mvmt-border-light` |
| `style={{ borderColor: "var(--mvmt-border-medium)" }}` | `border-mvmt-border-medium` |

### Execution

For each of the 62 files, search-and-replace inline `style={{}}` props that reference `var(--mvmt-*)` with the corresponding Tailwind class. Where a single element has BOTH a `className` and `style` prop referencing mvmt tokens, merge the style values into className.

For `onMouseEnter`/`onMouseLeave` handlers that swap `var(--mvmt-*)` colors, replace with Tailwind `hover:` variants:
- `onMouseEnter={(e) => e.currentTarget.style.color = "var(--mvmt-on-dark-primary)"}` → add `hover:text-mvmt-on-dark-primary` to className
- Delete the `onMouseEnter` and `onMouseLeave` handlers entirely

---

## Issue 4 (MEDIUM): 30 template components use arbitrary-value syntax `text-[var(--mvmt-*)]`

### Problem

30 files use `text-[var(--mvmt-text-primary)]` or `bg-[var(--mvmt-surface-dark)]` instead of the registered utility `text-mvmt-text-primary` / `bg-mvmt-surface-dark`. The arbitrary-value syntax works but:
- Generates unique CSS rules per usage (no deduplication)
- Is harder to read and maintain
- Bypasses Tailwind's design system validation

### Fix

Search-and-replace across the 30 files:

| Arbitrary value class | Replace with |
|---|---|
| `text-[var(--mvmt-text-primary)]` | `text-mvmt-text-primary` |
| `text-[var(--mvmt-text-secondary)]` | `text-mvmt-text-secondary` |
| `bg-[var(--mvmt-surface-dark)]` | `bg-mvmt-surface-dark` |
| `bg-[var(--mvmt-surface-light)]` | `bg-mvmt-surface-light` |
| `border-[var(--mvmt-border-light)]` | `border-mvmt-border-light` |
| (etc. for all `--mvmt-*` tokens) | |

General rule: `{prefix}-[var(--mvmt-{token})]` → `{prefix}-mvmt-{token}`

---

## Issue 5 (MEDIUM): 105 hardcoded hex colors in content template mock data

### Problem

16 `content-*` template files embed hardcoded hex colors in mock data arrays:

```tsx
// content-category-blog.tsx
const categories = [
  { name: "Design", color: "#E0E7FF", textColor: "#3730A3" },
  { name: "Code", color: "#DBEAFE", textColor: "#1E40AF" },
  ...
];
```

These are used as `style={{ backgroundColor: cat.color, color: cat.textColor }}` on category badges/tags. They don't respond to variant theming.

### Fix

Two options:

**Option A (simple):** Accept that mock data has decorative colors that won't change per variant. These are placeholder values for a template showcase. Low priority.

**Option B (thorough):** Define a small palette of category accent tokens in the `--mvmt-*` system (e.g., `--mvmt-cat-1-bg`, `--mvmt-cat-1-text` through `--mvmt-cat-6-*`), register them in `@theme`, use utility classes, and let variants override them. High effort for showcase-only benefit.

**Recommendation:** Option A. Flag these as known hardcodes, fix only if/when templates are used in production tenant sites.

---

## Issue 6 (LOW): Hardcoded gradients and rgba values

### Problem

- `content-integration-guides.tsx`: 6 hardcoded `linear-gradient(135deg, #hex, #hex)` strings
- 5 files: 11 hardcoded `rgba(0,0,0,0.4)` / `rgba(255,255,255,0.08)` values for overlays/glass effects

### Fix

- The gradient hex values should ideally use `var(--mvmt-gradient-*)` tokens, but this requires defining 6+ new gradient tokens. Low priority for showcase.
- The `rgba` overlay values are UI effects (backdrops, glass), not brand colors. They can remain hardcoded — they're universal and not theme-dependent.

---

## Execution Order

| Step | Issue | Files affected | Priority |
|------|-------|----------------|----------|
| 1 | Fix layout wrapper (Issue 1) | `app/templates/layout.tsx` + all 17 page files | HIGH |
| 2 | Fix SiteNavigation (Issue 2) | `site-navigation.tsx` | HIGH |
| 3 | Replace inline styles (Issue 3) | 62 component files | MEDIUM |
| 4 | Replace arbitrary values (Issue 4) | 30 component files | MEDIUM |
| 5 | Hardcoded mock data colors (Issue 5) | 16 content files | LOW (defer) |
| 6 | Hardcoded gradients/rgba (Issue 6) | 6 files | LOW (defer) |

### Validation after each step

```bash
npm run build          # Must pass
npx tsc --noEmit       # Must pass
```

Then visually verify:
1. Navigate to `/templates` — navbar should have readable text on dark surface
2. Switch hero variants — colors should change per variant
3. Navigate to each template category (Articles, Chat, etc.) — variant switcher should change colors
4. Check that the navbar responds to variant changes (after Issue 1 fix)

---

## Files Reference

| Purpose | Location |
|---------|----------|
| CSS variant definitions | `app/globals.css` (lines 200+) |
| Tailwind v4 theme | `app/globals.css` (`@theme` block, lines 1-132) |
| Templates layout | `app/templates/layout.tsx` |
| Site navigation | `components/layouts/movement-leader/site-navigation.tsx` |
| Template pages | `app/templates/**/page.tsx` (17 files) |
| Template components | `components/layouts/movement-leader/*.tsx` (~185 files) |
| Previous style audit | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
| Tailwind v4 migration | `_docs/_prompts/COLOR_CONFLICT_DIAGNOSIS_AND_FIX.md` |
