# Color Conflict Diagnosis & Fix Guide

## The Core Problem

**You are running Tailwind CSS v4.1.18 but configuring it with a Tailwind v3 `tailwind.config.ts` file.** Tailwind v4 does NOT read `tailwind.config.ts` by default. Your colors defined in that config file are likely being **completely ignored** by the Tailwind compiler, which means:

- All shadcn/ui color utilities (`bg-primary`, `text-muted-foreground`, etc.) only work because of the `@theme` block in `globals.css`
- All `mvmt.*` colors, static palettes (`sage`, `scarlet-rush`, `velvet-orchid`, `bright-snow`), custom `boxShadow`, custom `borderRadius`, and custom `fontFamily` defined in `tailwind.config.ts` are **not being picked up by Tailwind v4**
- The `tailwindcss-animate` plugin loaded via `require()` in the config is also likely not being loaded
- The `darkMode: "class"` setting is being ignored (Tailwind v4 uses `@variant dark` or media query by default)
- The `content` paths in the config are ignored (Tailwind v4 uses automatic content detection)

This explains why colors are "all wrong" — the template system's `mvmt.*` Tailwind utilities never generate any CSS, and components using them render with no color values.

---

## How Tailwind v4 Works (vs v3)

| Feature | Tailwind v3 | Tailwind v4 |
|---------|-------------|-------------|
| Config | `tailwind.config.ts` | `@theme {}` block in CSS |
| Colors | `theme.extend.colors` in config | `--color-*` CSS vars in `@theme` |
| Plugins | `plugins: [require('...')]` in config | `@plugin "..."` in CSS |
| Dark mode | `darkMode: "class"` in config | `@variant dark (&:where(.dark, .dark *))` in CSS |
| Content | `content: [...]` in config | Automatic detection |
| Import | `@tailwind base/components/utilities` | `@import "tailwindcss"` |

Your `globals.css` line 1 (`@import "tailwindcss"`) confirms v4 mode. The `@theme` block on lines 3-36 is the v4 way and IS working — that's why shadcn colors work. But everything else in `tailwind.config.ts` is dead code.

---

## What's Broken Specifically

### 1. `mvmt.*` colors — NOT registered in `@theme`
The `@theme` block only declares shadcn colors (`--color-background`, `--color-primary`, etc.). It does NOT declare:
```
--color-mvmt-text-primary
--color-mvmt-accent
--color-mvmt-surface-dark
... (all 22 mvmt tokens)
```
**Result:** Classes like `bg-mvmt-accent`, `text-mvmt-text-primary` generate no CSS. Components using them have no colors.

### 2. Static palettes — NOT registered in `@theme`
`sage`, `bright-snow`, `scarlet-rush`, `velvet-orchid` with their 50-950 shades are only in the v3 config.
**Result:** Classes like `bg-sage-500`, `text-scarlet-rush-600` generate no CSS.

### 3. `tailwindcss-animate` plugin — NOT loaded
The v3-style `plugins: [require("tailwindcss-animate")]` is ignored.
**Result:** Animation utilities from this plugin don't work. shadcn/ui components that rely on animate classes (dialogs, dropdowns, accordions) lose their animations.

### 4. Dark mode — NOT configured for class strategy
Tailwind v4 defaults to `prefers-color-scheme` media query. The `darkMode: "class"` from config is ignored.
**Result:** `.dark` class on `<html>` doesn't trigger dark mode styles via Tailwind utilities (though your raw CSS variables in `.dark {}` still work since they're plain CSS).

### 5. Custom box shadows, border radii, font families — NOT registered
`shadow-mvmt-sm`, `rounded-mvmt-lg`, `font-mvmt-heading` etc. are only in the v3 config.

---

## The Fix

### Step 1: Migrate everything from `tailwind.config.ts` into `globals.css` `@theme` block

Replace the current `@theme` block with a comprehensive one:

```css
@import "tailwindcss";

/* Load the animate plugin the v4 way */
@plugin "tailwindcss-animate";

/* Configure dark mode to use class strategy */
@variant dark (&:where(.dark, .dark *));

@theme {
  /* ===== shadcn/ui colors (existing, keep as-is) ===== */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  /* Chart colors */
  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));

  /* ===== Movement Leader template colors (NEW) ===== */
  --color-mvmt-text-primary: var(--mvmt-text-primary);
  --color-mvmt-text-secondary: var(--mvmt-text-secondary);
  --color-mvmt-text-muted: var(--mvmt-text-muted);
  --color-mvmt-on-dark-primary: var(--mvmt-on-dark-primary);
  --color-mvmt-on-dark-secondary: var(--mvmt-on-dark-secondary);
  --color-mvmt-on-dark-muted: var(--mvmt-on-dark-muted);
  --color-mvmt-on-dark-subtle: var(--mvmt-on-dark-subtle);
  --color-mvmt-surface-dark: var(--mvmt-surface-dark);
  --color-mvmt-surface-dark-elevated: var(--mvmt-surface-dark-elevated);
  --color-mvmt-surface-light: var(--mvmt-surface-light);
  --color-mvmt-surface-light-muted: var(--mvmt-surface-light-muted);
  --color-mvmt-accent: var(--mvmt-accent);
  --color-mvmt-accent-hover: var(--mvmt-accent-hover);
  --color-mvmt-cta-bg: var(--mvmt-cta-bg);
  --color-mvmt-cta-text: var(--mvmt-cta-text);
  --color-mvmt-border-on-dark: var(--mvmt-border-on-dark);
  --color-mvmt-border-on-dark-medium: var(--mvmt-border-on-dark-medium);
  --color-mvmt-border-light: var(--mvmt-border-light);
  --color-mvmt-border-medium: var(--mvmt-border-medium);
  --color-mvmt-footer-bg: var(--mvmt-footer-bg);
  --color-mvmt-footer-text: var(--mvmt-footer-text);
  --color-mvmt-footer-text-highlight: var(--mvmt-footer-text-highlight);

  /* ===== Static palettes (NEW) ===== */
  --color-sage-50: #f0f4f0;
  --color-sage-100: #e2e9e2;
  --color-sage-200: #c5d3c5;
  --color-sage-300: #a8bda8;
  --color-sage-400: #8ba78b;
  --color-sage-500: #6e916e;
  --color-sage-600: #587458;
  --color-sage-700: #425742;
  --color-sage-800: #2c3a2c;
  --color-sage-900: #161d16;
  --color-sage-950: #0f140f;

  --color-bright-snow-50: #f1f3f3;
  --color-bright-snow-100: #e3e8e8;
  --color-bright-snow-200: #c7d1d1;
  --color-bright-snow-300: #acb9b9;
  --color-bright-snow-400: #90a2a2;
  --color-bright-snow-500: #748b8b;
  --color-bright-snow-600: #5d6f6f;
  --color-bright-snow-700: #465353;
  --color-bright-snow-800: #2e3838;
  --color-bright-snow-900: #171c1c;
  --color-bright-snow-950: #0c0e0e;

  --color-scarlet-rush-50: #faebeb;
  --color-scarlet-rush-100: #f5d6d7;
  --color-scarlet-rush-200: #eaaeaf;
  --color-scarlet-rush-300: #e08587;
  --color-scarlet-rush-400: #d55d5f;
  --color-scarlet-rush-500: #cb3437;
  --color-scarlet-rush-600: #a22a2c;
  --color-scarlet-rush-700: #7a1f21;
  --color-scarlet-rush-800: #511516;
  --color-scarlet-rush-900: #290a0b;
  --color-scarlet-rush-950: #140505;

  --color-velvet-orchid-50: #f4eef7;
  --color-velvet-orchid-100: #e8dcef;
  --color-velvet-orchid-200: #d1b9df;
  --color-velvet-orchid-300: #ba96cf;
  --color-velvet-orchid-400: #a373bf;
  --color-velvet-orchid-500: #8c50af;
  --color-velvet-orchid-600: #70408c;
  --color-velvet-orchid-700: #543069;
  --color-velvet-orchid-800: #382046;
  --color-velvet-orchid-900: #1c1023;
  --color-velvet-orchid-950: #0e0812;

  /* ===== Border radius ===== */
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-mvmt-sm: var(--mvmt-radius-sm);
  --radius-mvmt-md: var(--mvmt-radius-md);
  --radius-mvmt-lg: var(--mvmt-radius-lg);
  --radius-mvmt-xl: var(--mvmt-radius-xl);

  /* ===== Box shadows ===== */
  --shadow-mvmt-sm: var(--mvmt-shadow-sm);
  --shadow-mvmt-md: var(--mvmt-shadow-md);
  --shadow-mvmt-lg: var(--mvmt-shadow-lg);

  /* ===== Font families ===== */
  --font-mvmt-heading: var(--mvmt-font-heading);
  --font-mvmt-body: var(--mvmt-font-body);

  /* ===== Font sizes ===== */
  --text-2xs: 10px;
  --text-2xs--line-height: 14px;
  --text-3xs: 8px;
  --text-3xs--line-height: 12px;
}
```

### Step 2: Delete or gut `tailwind.config.ts`

Tailwind v4 can still read a v3 config file if you explicitly import it, but the cleanest path is to remove the file entirely and let everything live in CSS. If you need backwards compatibility during migration, you can add this to `globals.css`:

```css
@config "../tailwind.config.ts";
```

But the recommended approach is to **delete `tailwind.config.ts`** and have the `@theme` block be the single source of truth, as shown in Step 1.

### Step 3: Verify `tailwindcss-animate` works with v4

The `tailwindcss-animate` package needs to be v4-compatible. Check the installed version:
```bash
npm ls tailwindcss-animate
```
If it's < 1.0.7, update it. The `@plugin` directive in CSS is the v4 way to load plugins.

### Step 4: Validate

```bash
npm run build
```

If the build succeeds, visually check:
1. A dashboard page (shadcn colors: `bg-primary`, `text-muted-foreground`)
2. A template page with a variant (mvmt colors: `bg-mvmt-accent`, `text-mvmt-text-primary`)
3. A component using static palette (`bg-sage-500`, `text-scarlet-rush-600`)
4. Dark mode toggle (`.dark` class on html)
5. Animations (dialog open/close, accordion expand)

---

## Secondary Issues (Fix After Core Migration)

### A. `accent` name collision
Both shadcn (`bg-accent` → light purple HSL) and mvmt (`bg-mvmt-accent` → hex purple) define an accent color. These are intentionally namespaced and not a conflict — just be aware that `bg-accent` ≠ `bg-mvmt-accent`.

### B. Opacity modifier incompatibility with mvmt colors
The mvmt colors use hex/rgba values (`#9B59B6`, `rgba(255,255,255,0.15)`), not HSL components. In Tailwind v4, arbitrary opacity modifiers like `bg-mvmt-accent/50` should work with hex values, so this is not a problem in v4 (it was in v3).

### C. Content variant duplication
Some variants exist under both `content-*` and `cnt-*` prefixes with slightly different values. Consolidate to one prefix.

### D. Inline `style={{}}` usage
Per the existing `STYLE_CLEANUP_PROMPT.md`, ~1,262 occurrences of inline `style={{ color: "var(--mvmt-*)" }}` should be migrated to Tailwind utilities. This cleanup becomes possible only AFTER the mvmt colors are registered in `@theme` (Step 1 above).

---

## Summary

| What | Status | Fix |
|------|--------|-----|
| Tailwind version | v4.1.18 | — |
| Config approach | **v3 config file (IGNORED)** | Migrate to `@theme` in CSS |
| shadcn colors | Working (via `@theme`) | Keep as-is |
| mvmt colors | **BROKEN** (not in `@theme`) | Add `--color-mvmt-*` to `@theme` |
| Static palettes | **BROKEN** (not in `@theme`) | Add `--color-sage-*` etc. to `@theme` |
| tailwindcss-animate | **BROKEN** (v3 require) | Use `@plugin` directive |
| Dark mode (class) | **BROKEN** (v3 config) | Use `@variant dark` directive |
| Custom shadows/radii/fonts | **BROKEN** (v3 config) | Add `--shadow-*`, `--radius-*`, `--font-*` to `@theme` |
| Inline style cleanup | Deferred | Do after `@theme` migration |

**Root cause: Tailwind v4 ignoring the v3 config file. Fix by moving all definitions into `@theme`.**
