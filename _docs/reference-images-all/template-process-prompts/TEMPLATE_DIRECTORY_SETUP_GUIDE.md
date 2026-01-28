# Prompt: Step-by-Step Expert Guide — Isolated Template Directory with Scoped Styling

> **Purpose**: Generate a step-by-step implementation guide for creating a `templates/` directory within the Movemental AI project where each template has fully isolated styling (including independent dark/light mode) with zero bleed into or from the project's global Tailwind styles.
>
> **Context**: This project uses **Next.js 15, React 19, Tailwind CSS v4** (`@tailwindcss/postcss`), class-based dark mode via `@custom-variant dark (&:where(.dark, .dark *))`, and shadcn/ui CSS variable theming in `app/globals.css`. The public site lives under `app/(public)/`. Templates will be used in the Template Showroom (onboarding stage 2) and Design Preference Selection (onboarding stage 3).

---

## System Prompt

You are a senior front-end architect with deep expertise in Tailwind CSS v4, Next.js App Router, CSS custom properties, CSS cascade layers, and style isolation patterns. You will produce a step-by-step guide that a developer can follow exactly to set up a template system where:

1. Each template is fully self-contained with its own color palette, typography, spacing, and border-radius tokens.
2. Each template supports independent light/dark mode toggling (a template can be in dark mode while the main site is in light mode, and vice versa).
3. No template's styles leak into the main project's global styles.
4. No global project styles (from `app/globals.css`, shadcn/ui, or Tailwind's `@theme` block) leak into any template.
5. The approach follows current Tailwind CSS v4 best practices as documented at https://tailwindcss.com/docs/.

---

## Required Context Files to Read Before Writing the Guide

Read these files to understand the current project setup:

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Current Tailwind config (v4 with class-based dark mode) |
| `postcss.config.mjs` | PostCSS config using `@tailwindcss/postcss` |
| `app/globals.css` | Global styles: `@import "tailwindcss"`, `@theme` block, `:root` / `.dark` CSS variables |
| `app/(public)/layout.tsx` | Public site layout (where templates will render) |
| `CLAUDE.md` | Project architecture overview |
| `_docs/site-docs/04_onboarding_path_overview.md` | Onboarding flow context |
| `_docs/ai-vision/04_ui-ux-proposal.md` | UI/UX patterns and design references |
| `_docs/onboarding/brad-brisco-input-checklist.md` | Brand asset requirements per leader |

---

## Guide Requirements

Produce a guide with the following sections. Each section must include exact file paths, complete code, and rationale.

### Section 1: Directory Structure

Create the following structure and explain the purpose of each file:

```
templates/
  _shared/
    types.ts                  # TemplateConfig interface, TemplateTheme type, shared contracts
    TemplateShell.tsx          # Isolation wrapper component (CSS containment boundary)
    useTemplateTheme.ts        # Hook for per-template dark/light mode toggle
  [template-name]/
    index.tsx                  # Template entry point (default export)
    theme.css                  # Template-scoped CSS variables (light + dark tokens)
    config.ts                  # TemplateConfig metadata (name, description, thumbnail, tags)
    components/                # Template-internal components (not shared across templates)
      Header.tsx
      Hero.tsx
      Footer.tsx
      ...
```

**Explain**:
- Why `templates/` lives at the project root (not inside `app/`) — it is a content/design library, not a route.
- Why each template gets its own `theme.css` rather than sharing a single Tailwind config.
- How `_shared/` provides the isolation contract without coupling templates to each other.

### Section 2: Style Isolation Strategy

This is the most critical section. Cover all three isolation layers:

#### Layer A — CSS Custom Property Scoping

Each template defines its own CSS custom properties under a unique scope selector. This prevents variable name collisions with the global `app/globals.css` `:root` variables.

**Requirements**:
- Template variables must be scoped to a wrapper element (e.g., `[data-template="template-name"]`), NOT to `:root`.
- Template variables should use a namespace prefix (e.g., `--tpl-background`, `--tpl-primary`) to avoid any collision with the global `--background`, `--primary` etc.
- Both light and dark token sets must be defined within the template's `theme.css`.

**Show the exact CSS pattern** for `theme.css`:

```css
/* templates/horizon/theme.css */
[data-template="horizon"] {
  --tpl-background: 210 20% 98%;
  --tpl-foreground: 222 84% 5%;
  --tpl-primary: 199 89% 48%;
  --tpl-primary-foreground: 0 0% 100%;
  /* ... full token set ... */
}

[data-template="horizon"].tpl-dark {
  --tpl-background: 222 84% 5%;
  --tpl-foreground: 210 40% 98%;
  --tpl-primary: 199 89% 58%;
  --tpl-primary-foreground: 222 84% 5%;
  /* ... full dark token set ... */
}
```

**Why `.tpl-dark` instead of `.dark`**: The main site uses `.dark` on `<html>`. Using `.tpl-dark` on the template wrapper means template dark mode is entirely independent of the site-level dark mode class.

#### Layer B — CSS Cascade Layer Isolation

Use the CSS `@layer` directive to place template styles in their own cascade layer, preventing them from competing with Tailwind utility styles or global base styles.

**Show the exact pattern** for importing template styles:

```css
@layer templates {
  @import "./theme.css";
}
```

**Explain cascade layer ordering** relative to Tailwind's built-in layers (`theme`, `base`, `components`, `utilities`) and why the `templates` layer should sit between `components` and `utilities` so that utility overrides still work within templates.

#### Layer C — `TemplateShell` Component Isolation

The `TemplateShell` React component provides the runtime isolation boundary:

```tsx
// templates/_shared/TemplateShell.tsx
```

**Requirements for TemplateShell**:
- Renders a `<div>` with `data-template={templateName}` attribute (activates scoped CSS vars).
- Applies `tpl-dark` class when the template's local dark mode is active.
- Uses `style={{ all: 'initial' }}` or CSS `all: revert-layer` on the wrapper to prevent inherited global styles from leaking in. **Explain the tradeoff**: `all: initial` resets everything (including font inheritance) while `all: revert-layer` only reverts to the previous cascade layer. Recommend the right choice and explain why.
- Sets `color-scheme: light` or `color-scheme: dark` on the wrapper so native form controls match.
- Provides a React context for child components to read/toggle the template theme.

### Section 3: Template-Internal Styling with Tailwind Utilities

Templates still use Tailwind utility classes, but they reference the template-scoped CSS variables instead of the global ones.

**Show how to wire template variables to Tailwind utilities** using one of these approaches (choose the best one and explain why):

**Option A — Inline `@theme` per template** (NOT recommended — explain why: `@theme` is global/root-scoped, can't be nested under a data-attribute selector).

**Option B — Arbitrary values referencing scoped vars**:
```tsx
<div className="bg-[hsl(var(--tpl-background))] text-[hsl(var(--tpl-foreground))]">
```
Explain when this is acceptable (prototype/small templates) and when it's not (repetitive, no autocomplete).

**Option C — Template-local utility layer** (RECOMMENDED):
Define a small set of utility classes in the template's `theme.css` that map scoped variables to semantic class names:

```css
@layer templates {
  [data-template="horizon"] {
    /* tokens ... */
  }

  .tpl-bg { background-color: hsl(var(--tpl-background)); }
  .tpl-text { color: hsl(var(--tpl-foreground)); }
  .tpl-bg-primary { background-color: hsl(var(--tpl-primary)); }
  .tpl-text-primary { color: hsl(var(--tpl-primary)); }
  /* ... full utility mapping ... */
}
```

This gives templates a clean set of `tpl-*` classes that are autocomplete-friendly, never collide with global Tailwind utilities, and resolve to template-scoped variables.

### Section 4: Per-Template Dark Mode Toggle

**Show the complete `useTemplateTheme` hook**:
- Manages local state (not connected to the site-level dark mode).
- Toggles `.tpl-dark` on the nearest `[data-template]` ancestor.
- Optionally respects `prefers-color-scheme` as a default.
- Stores preference in a namespaced key (e.g., `tpl-theme-horizon`) if persistence is needed.

**Show a TemplateThemeToggle component** that can be dropped into any template.

### Section 5: Registering Templates and Loading in the Showroom

**Show how to create a template registry**:

```ts
// templates/registry.ts
import type { TemplateConfig } from './_shared/types';

export const templateRegistry: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  horizon: () => import('./horizon'),
  ember: () => import('./ember'),
  // ...
};
```

**Explain**:
- Dynamic imports for code splitting (each template is its own chunk).
- How the Showroom page (`app/(public)/onboarding-chart/` or a new showroom route) renders a template preview using `TemplateShell` + the lazy-loaded template component.
- How template CSS files are imported (either statically in the template's `index.tsx` or dynamically).

### Section 6: Adding the `templates/` Path to Tailwind Content Config

Update `tailwind.config.ts` to scan the templates directory:

```ts
content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./templates/**/*.{js,ts,jsx,tsx,mdx}",  // ADD THIS
],
```

**Explain why this is needed**: Tailwind purges unused classes. Without this path, any Tailwind utility used inside a template component would be stripped from the production build.

### Section 7: Example — Complete "Horizon" Template

Build one complete example template called `horizon` with:
- `config.ts` — metadata
- `theme.css` — full light + dark token set (at least: background, foreground, primary, secondary, muted, accent, border, card, destructive)
- `index.tsx` — a representative landing page layout (hero, features grid, CTA)
- `components/Header.tsx` — template-scoped header
- `components/Hero.tsx` — template-scoped hero section
- `components/Footer.tsx` — template-scoped footer

**The example must demonstrate**:
- Zero use of global CSS variables (`--background`, `--primary`, etc.) — only `--tpl-*` variables.
- Dark mode toggle working independently of the site.
- Standard Tailwind utilities (`flex`, `grid`, `p-4`, `rounded-lg`, etc.) working normally inside the template.
- Template-specific `tpl-*` color utilities.

### Section 8: Verification Checklist

Provide a checklist the developer should run through to verify isolation:

- [ ] Set the main site to light mode. Set a template to dark mode. Confirm the template renders dark while the rest of the page is light.
- [ ] Set the main site to dark mode. Set a template to light mode. Confirm the template renders light while the rest of the page is dark.
- [ ] Inspect a template element in DevTools. Confirm it uses `--tpl-*` variables, NOT global `--background` etc.
- [ ] Inspect a non-template element. Confirm it does NOT have any `--tpl-*` variables or `tpl-*` classes.
- [ ] Add a new template by copying the `horizon` folder, renaming, and changing only `theme.css` + `config.ts`. Confirm it works without touching any global file.
- [ ] Run `npm run build` and confirm no Tailwind purge errors.
- [ ] Run `npx tsc --noEmit` and confirm no type errors (per CLAUDE.md lock-before-proceed).

### Section 9: Anti-Patterns to Avoid

List these explicitly:

1. **Do NOT put template CSS variables on `:root`** — they will collide with global variables.
2. **Do NOT use the global `.dark` class for template dark mode** — it couples template state to site state.
3. **Do NOT import `app/globals.css` inside a template** — it re-applies global resets.
4. **Do NOT use `@theme` for template tokens** — `@theme` registers at `:root` globally and generates global utility classes. It cannot be scoped.
5. **Do NOT modify `components/ui/`** — these are shadcn/ui managed components (per CLAUDE.md).
6. **Do NOT use `!important` to override global styles** — use cascade layers and CSS specificity via `[data-template]` selectors.
7. **Do NOT share components between templates** — each template is self-contained. Shared logic goes in `_shared/` only as hooks/types, never as visual components.

---

## Output Format

Return the guide as a single markdown document with all code blocks, file paths, and explanations inline. Use collapsible `<details>` sections for lengthy code blocks. Number every step for easy reference.

---

## Additional Notes

- The project uses `@tailwindcss/postcss` (v4 PostCSS plugin), NOT the legacy `tailwindcss` CLI. All CSS processing goes through PostCSS.
- The project has `tailwindcss-animate` installed. Templates may use animation utilities.
- The project's `globals.css` uses `@import "tailwindcss"` which auto-includes preflight. Template isolation must account for preflight resets already being applied globally.
- Templates are a design/content library. They are NOT routes. They are rendered within routes (e.g., the Showroom page renders template previews).
- The guide should be implementation-ready — a developer should be able to follow it and have a working isolated template system at the end.
