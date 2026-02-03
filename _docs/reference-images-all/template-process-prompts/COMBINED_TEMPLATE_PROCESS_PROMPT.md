# Template Development Process — Complete Prompt

This is the consolidated prompt for building multi-variant template sites from Mobbin reference images. It covers the full workflow: iron-clad rules, end-to-end build process, reference fidelity, cleanup passes, token migration, and directory setup.

---

## Table of Contents

1. [Iron-Clad Rules](#1-iron-clad-rules)
2. [End-to-End Build Workflow](#2-end-to-end-build-workflow)
3. [Reference Fidelity](#3-reference-fidelity)
4. [Second-Pass Cleanup](#4-second-pass-cleanup)
5. [Component Token Migration](#5-component-token-migration)
6. [Template Directory Setup](#6-template-directory-setup)

---

## 1. Iron-Clad Rules

These rules exist because a prior implementation defined a complete token system and then built 200+ components that ignored it. Every rule addresses a real failure mode.

### Rule 1: Components MUST Use Tokens — No Exceptions

Every color, font-family, and gradient in a template component must reference a CSS custom property with the template prefix (`--mvmt-*`, `--assess-*`, etc.).

**Forbidden patterns:**

```tsx
className="text-white"
className="text-gray-300"
className="bg-stone-900"
className="from-indigo-900 via-purple-900"
style={{ background: "#4F46E5" }}
```

**Required patterns:**

```tsx
className="text-[var(--mvmt-on-dark-primary)]"
className="bg-[var(--mvmt-surface-dark)]"
style={{ background: "var(--mvmt-gradient-hero-brand)" }}
```

If a component uses `text-white` instead of `var(--mvmt-on-dark-primary)`, changing the token value has zero effect. The variant system, theme switching, and contrast fixes all depend on components reading tokens.

**Allowed Tailwind utilities (non-color):** Layout (`flex`, `grid`), spacing (`p-*`, `m-*`, `gap-*`), sizing (`w-*`, `h-*`), position, border-radius (`rounded-*`), shadows (`shadow-*`), typography size (`text-sm`, `text-lg`), font-weight (`font-bold`), responsive prefixes, animations.

### Rule 2: Define Tokens BEFORE Building Components

1. Extract design values from the reference image (reconciliation note)
2. Define all tokens in `globals.css` under `.template-{family}` and variant overrides
3. Build the component using only those tokens
4. Verify: grep the component for any hardcoded color — if found, fix before merging

### Rule 3: Every Variant Gets Its Own Token Override Block

If a variant has a distinct palette, typography, or accent color:

```css
.template-movement-leader[data-variant="product-showcase"] {
  --mvmt-primary: #1a1a2e;
  --mvmt-accent: #efc07b;
  --mvmt-font-heading: var(--font-playfair-display), serif;
}
```

Structural-only variants (same palette as base) don't need overrides — but must still use tokens.

### Rule 4: Page Wrapper Must Bind the Variant

```tsx
<div className="template-movement-leader" data-variant={activeTemplate}>
```

Without `data-variant`, per-variant token overrides never activate.

### Rule 5: Reconciliation Note Before Implementation

Before building or revising any variant:

1. Open the archived reference image
2. Document: colors (hex), fonts (serif/sans, weight), spacing, effects (radius, shadow), layout, component treatment (button shape, card style)
3. Map extracted values to tokens

### Rule 6: Verification Checklist Per Component

Before marking any component done:

- [ ] Grep for `text-white`, `text-gray`, `text-black`, `bg-white`, `bg-black`, `bg-gray`, `from-`, `via-`, `to-`, `#[0-9a-fA-F]{3,8}` — zero matches in color positions
- [ ] All `color`, `background`, `border-color` values come from `var(--prefix-*)` tokens
- [ ] Page wrapper has `data-variant={activeTemplate}`
- [ ] Component renders correctly when switching variants
- [ ] Text meets WCAG AA contrast (4.5:1) against its background

### Rule 7: Token Categories Must Be Complete

A template token set must cover ALL color usage scenarios. Missing categories cause fallback to hardcoded values.

| Category | Tokens |
|----------|--------|
| Text on light bg | `--prefix-text-primary`, `--prefix-text-secondary`, `--prefix-text-muted` |
| Text on dark bg | `--prefix-on-dark-primary`, `--prefix-on-dark-secondary`, `--prefix-on-dark-muted` |
| Surfaces | `--prefix-surface-light`, `--prefix-surface-dark`, `--prefix-surface-elevated` |
| Accent / CTA | `--prefix-accent`, `--prefix-cta-bg`, `--prefix-cta-text` |
| Borders | `--prefix-border-light`, `--prefix-border-dark` |
| Gradients | `--prefix-gradient-hero`, `--prefix-gradient-overlay` (as needed) |
| Typography | `--prefix-font-heading`, `--prefix-font-body` |
| Footer | `--prefix-footer-bg`, `--prefix-footer-text`, `--prefix-footer-text-highlight` |

If a component needs a color without a token, add the token first.

### Rule 8: No Global/Shadcn Tokens in Template Body

Template components must not use `--primary`, `--background`, `--foreground`, `--muted`, or any Shadcn/global token. Global tokens are for the app shell only.

### The Design Chain

```
Reference Image → extract → Reconciliation Note → define → Token Block in globals.css → consume → Component uses ONLY var(--prefix-*) → bind → Page wrapper applies data-variant → result → Changing a token changes every component; switching variants re-themes the page
```

Break any link and the system fails silently.

---

## 2. End-to-End Build Workflow

### Project Architecture

**Page Types & Navigation:**

```
app/templates/
├── page.tsx              # Home (hero templates)
├── about/page.tsx
├── books/page.tsx
├── articles/page.tsx
├── podcasts/page.tsx
├── video/page.tsx
├── courses/page.tsx
├── chat/page.tsx
└── assessments/page.tsx
```

**Component Structure:**

```
components/layouts/movement-leader/
├── index.ts                      # Barrel exports
├── template-switcher.tsx
├── site-navigation.tsx
├── hero-{variant-name}.tsx
├── about-{variant-name}.tsx
├── books-{variant-name}.tsx
├── (etc.)
```

**Reference Images:** `_docs/reference-images-all/` — organized by page-type prefix.

### Phase 1: Setup & Analysis

1. **List all images** in the reference directory
2. **View each image** to understand the design pattern
3. **Categorize by style**: Split, Gradient, Dark, Light, Overlay, Minimal
4. **Plan variants**: For each reference, determine variant name (kebab-case), category, key features, copy transformation

### Phase 2: Color Palette & Typography Selection

**Analyze reference design mood:**

| Design Mood | Palettes | Typography |
|-------------|----------|------------|
| Luxury/Premium | Midnight Opulence, Obsidian Elegance | Playfair Display + Lato |
| Modern/Tech | AI Iridescence, Copper Tech | DM Serif Display + Inter |
| Clean/Minimal | Platinum Prestige, Cloud Dancer | Poppins + Roboto |
| Warm/Organic | Warm Earth, Elegant Forest | Lora + Nunito |
| Bold/Creative | Hyper-Digital, Neon Accent Dark | Oswald + Quicksand |
| Calm/Wellness | Arctic Luxury, Powdered Pastels | Cormorant Garamond + Karla |

Select palette from `_docs/_guides/color-palettes-2026.md` and font pairing from `_docs/_guides/typography-2026.md`. Verify fonts are loaded in `app/layout.tsx`.

### Phase 3: Design Tokens

Create tokens in `globals.css` scoped under a wrapper class (preferred) or labeled `:root` block.

**Complete token example (scoped):**

```css
.template-movement-leader {
  /* Color Palette */
  --mvmt-primary: #1a1a2e;
  --mvmt-secondary: #16213e;
  --mvmt-tertiary: #0f3460;
  --mvmt-accent: #efc07b;
  --mvmt-accent-light: #f5e6c8;

  /* Gradients */
  --mvmt-gradient-start: #1a1a2e;
  --mvmt-gradient-mid: #16213e;
  --mvmt-gradient-end: #0f3460;
  --mvmt-gradient-bold: linear-gradient(135deg, var(--mvmt-gradient-start) 0%, var(--mvmt-accent) 100%);

  /* Semantic Backgrounds */
  --mvmt-bg-primary: var(--mvmt-primary);
  --mvmt-bg-secondary: var(--mvmt-secondary);
  --mvmt-bg-surface: var(--mvmt-tertiary);
  --mvmt-bg-light: #fafafa;

  /* Semantic Text */
  --mvmt-text-primary: #ffffff;
  --mvmt-text-secondary: rgba(255, 255, 255, 0.7);
  --mvmt-text-muted: rgba(255, 255, 255, 0.5);
  --mvmt-text-on-accent: #1a1a2e;

  /* Borders */
  --mvmt-border-light: rgba(255, 255, 255, 0.1);
  --mvmt-border-medium: rgba(255, 255, 255, 0.2);

  /* Typography */
  --mvmt-font-heading: var(--font-playfair-display), serif;
  --mvmt-font-body: var(--font-lato), sans-serif;

  /* Effects */
  --mvmt-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --mvmt-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --mvmt-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --mvmt-shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
  --mvmt-radius-sm: 0.375rem;
  --mvmt-radius-md: 0.5rem;
  --mvmt-radius-lg: 0.75rem;
  --mvmt-radius-xl: 1rem;
}
```

### Phase 4: Author Image Processing

1. Check `public/media-library/images/headshots/{author-name}/` for existing images
2. Rename with convention: `{author}-{descriptor}-{aspect}.webp` (e.g. `brad-brisco-office-bw-3x4.webp`)
3. Convert to WebP (quality 85) using sharp
4. Match image style to template mood:

| Image Style | Best For |
|-------------|----------|
| Dark/B&W portrait | Dark themes, professional |
| Light/casual | Light themes, approachable |
| Library/books | Content-focused, scholarly |
| Outdoor/golden | Aspirational, inspirational |

### Phase 5: Template Component Creation

**Component structure:**

```tsx
"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface {PageType}{VariantName}Props {
  className?: string;
}

export function {PageType}{VariantName}({ className }: {PageType}{VariantName}Props) {
  return (
    <section className={cn("relative ...", className)}>
      {/* Template content */}
    </section>
  );
}

{PageType}{VariantName}.displayName = "{PageType}{VariantName}";
```

**Copy transformation — every piece of text must use movement leader context:**

| Reference Copy | Movement Leader Copy |
|---------------|---------------------|
| "Order your meal" | "Start your journey" |
| "Shop now" | "Start Multiplying" |
| "$29/month" | "Free to start" |
| "5-star rating" | "10,000+ leaders equipped" |
| Generic testimonial | Network reference (Exponential, Forge, etc.) |

**Movement leader vocabulary:** Discipleship, multiplication, church planting, missional communities, kingdom impact, movement catalyst, practitioner, coach. Author names: Brad Brisco, Alan Hirsch, Dave Ferguson, Neil Cole. Networks: Exponential, Forge, NewThing, V3, Missio, Saturate, Send Network.

### Phase 6: Template Switcher

Each page type gets a template switcher with variant type, category filtering, and dropdown UI. The page renders the active variant component via a `Record<Variant, ComponentType>` map.

```tsx
const templateComponents: Record<Variant, React.ComponentType> = {
  "variant-a": VariantA,
  "variant-b": VariantB,
};

export default function Page() {
  const [activeTemplate, setActiveTemplate] = useState<Variant>("variant-a");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="min-h-screen">
      <div className="sticky top-16 z-40 bg-white border-b">
        <TemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
```

### Phase 7: Batch Processing

For each image in directory:
1. View image → understand design pattern
2. Determine variant name and category
3. Select color palette and font pairing
4. Plan copy transformation
5. Create component with palette and typography
6. Integrate author images
7. Add to template switcher
8. Update barrel exports

### Phase 8: Archive Processed References

After all templates for a page type are created:

1. Create `_docs/reference-archive/{page-type}/`
2. Rename images: `{page-type}-{short-descriptor}-{index}.png`
3. Create `manifest.json` mapping original filename → archived name, template path, variant ID
4. Move images from source to archive

---

## 3. Reference Fidelity

Use this when templates don't match their reference images — typically because they share one palette/font/spacing scale instead of having per-variant differentiation.

### Problem

| Issue | Fix |
|-------|-----|
| One shared palette | Per-variant palette from color guide, scoped via data-variant overrides |
| One font family | Per-variant font pairing from typography guide |
| Same spacing scale | Per-variant spacing tokens from reference |
| Same radius/shadows | Per-variant effect tokens from reference |
| Same layout proportions | Match reference structure per variant |
| Same button/card treatment | Match reference component styling per variant |
| No reconciliation note | Create per-variant design extraction before building |

### Per-Variant Design Extraction (Reconciliation Note)

For each variant, open its archived reference and document:

- **Color**: Primary background, surface, text primary/secondary/muted, accent, CTA, borders. Map to a palette from the color guide.
- **Typography**: Heading (serif/sans, weight), body font, relative scale. Map to a pairing from the typography guide.
- **Spacing**: Section padding, card padding, gaps. Base unit and key values.
- **Effects**: Corner radius (none/small/medium/large/pill) for buttons, cards, inputs. Shadows (none/subtle/medium/strong). Border treatment.
- **Layout**: Hero proportions, grid columns/gaps, section order and density.
- **Components**: Button shape (pill vs rounded-rect), card style (border vs shadow), link treatment.
- **Imagery**: Placement, aspect ratios, treatment (shadow, radius, overlay).

Store notes in `_docs/reference-archive/{page-type}/reconciliation-{variant_id}.md`.

### Token Strategy

Use `data-variant` overrides on the family wrapper:

```css
.template-movement-leader[data-variant="product-showcase"] {
  --mvmt-primary: #...;
  --mvmt-accent: #...;
  --mvmt-font-heading: ...;
  --mvmt-radius-md: ...;
  --mvmt-shadow-card: ...;
  --mvmt-spacing-section: ...;
}
```

Override only what differs from the base. Keep the same `--mvmt-*` prefix so existing components work; values change when the variant wrapper is present.

### Cohesive-Design Checklist (Before Locking Any Variant)

- [ ] Spacing: Same base unit and rhythm in all main sections (from variant tokens)
- [ ] Typography: One clear hierarchy; no orphaned font sizes or weights
- [ ] Color: Backgrounds, text, accents follow variant token set
- [ ] Components: Buttons, cards, links match reference (radius, weight, hover)
- [ ] Lead reference: Would the reference designer recognize this as coherent?
- [ ] Contrast: Body and muted text meet WCAG AA; no hardcoded low-contrast opacity

### Avoiding Over-Normalization

- **Do**: Extract the pattern (e.g. "card with image + title + meta") and restyle it to the lead reference's spacing, type, color, and effects.
- **Don't**: Reuse the same component with identical radius, shadow, and padding everywhere.
- Use variant-specific tokens so the same structural pattern can look tight/flat in one variant and generous/elevated in another.

---

## 4. Second-Pass Cleanup

Use when the main fidelity plan missed something for specific variants, or a template still doesn't match its reference.

### Scoping

Choose one of:
- **By page type**: All variants in a page type's manifest
- **By variant list**: Specific variant IDs
- **By category**: e.g. "all dark themes", "all hero variants"

### Per-Variant Workflow

1. **Open reference and implementation side by side** — archived image + component file + reconciliation note (if exists)
2. **Compare and list gaps** in: color, typography, spacing, effects, layout, components, imagery
3. **Preserve movement leader content** — change style only, not copy
4. **Implement fixes** — tokens in `globals.css`, layout in markup, component styling, imagery treatment. Template-prefixed tokens only.
5. **Update reconciliation note** if non-obvious decisions were made
6. **Run cohesive-design checklist** before marking done

---

## 5. Component Token Migration

Use when retrofitting existing components from hardcoded colors to the token system.

### Token Replacement Tables

**Text on dark backgrounds:**

| Hardcoded | Token |
|-----------|-------|
| `text-white` | `text-[var(--mvmt-on-dark-primary)]` |
| `text-gray-100/200` | `text-[var(--mvmt-on-dark-primary)]` |
| `text-gray-300` | `text-[var(--mvmt-on-dark-secondary)]` |
| `text-gray-400/500` | `text-[var(--mvmt-on-dark-muted)]` |
| `text-white/80, /90` | `text-[var(--mvmt-on-dark-secondary)]` |
| `text-white/60, /70` | `text-[var(--mvmt-on-dark-muted)]` |
| `text-white/40, /50` | `text-[var(--mvmt-on-dark-subtle)]` |

**Text on light backgrounds:**

| Hardcoded | Token |
|-----------|-------|
| `text-black`, `text-gray-900` | `text-[var(--mvmt-text-primary)]` |
| `text-gray-700/800` | `text-[var(--mvmt-text-primary)]` |
| `text-gray-600` | `text-[var(--mvmt-text-secondary)]` |
| `text-gray-500/400` | `text-[var(--mvmt-text-muted)]` |

**Surfaces:**

| Hardcoded | Token |
|-----------|-------|
| `bg-white` | `bg-[var(--mvmt-surface-light)]` |
| `bg-gray-50/100` | `bg-[var(--mvmt-surface-light-muted)]` |
| `bg-black`, `bg-gray-900` | `bg-[var(--mvmt-surface-dark)]` |
| `bg-gray-800` | `bg-[var(--mvmt-surface-dark-elevated)]` |

**Gradients:**

```tsx
// Before
style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%)" }}
// After
style={{ background: "var(--mvmt-gradient-hero-brand)" }}
```

**Borders:**

| Hardcoded | Token |
|-----------|-------|
| `border-white/10, /20` | `border-[var(--mvmt-border-on-dark)]` |
| `border-white/30` | `border-[var(--mvmt-border-on-dark-medium)]` |
| `border-gray-200` | `border-[var(--mvmt-border-light)]` |
| `border-gray-300` | `border-[var(--mvmt-border-medium)]` |

### Do NOT Change

Layout, spacing, sizing, position, flex/grid, border-radius, shadow, typography size, font-weight, animation, responsive prefixes.

### Image Overlays

Keep gradient overlays (`from-black/70 via-transparent`) as-is unless converting to a token-based overlay pattern:

```tsx
<div className="absolute inset-0" style={{ background: "var(--mvmt-gradient-overlay-dark)" }} />
```

### Token Reference Values

```css
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-on-dark-secondary: #E2E8F0;
--mvmt-on-dark-muted: #CBD5E1;
--mvmt-on-dark-subtle: #94A3B8;
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #64748B;
--mvmt-text-muted: #94A3B8;
--mvmt-surface-dark: #0F0F23;
--mvmt-surface-dark-elevated: #1A1A2E;
--mvmt-surface-light: #FFFFFF;
--mvmt-surface-light-muted: #FAFBFC;
--mvmt-gradient-hero-brand: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%);
--mvmt-gradient-hero-dark: linear-gradient(135deg, #1A1A2E 0%, #0F0F23 100%);
--mvmt-gradient-overlay-dark: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
--mvmt-border-on-dark: rgba(255, 255, 255, 0.15);
--mvmt-border-on-dark-medium: rgba(255, 255, 255, 0.25);
--mvmt-border-light: #E2E8F0;
--mvmt-border-medium: #CBD5E1;
```

### Post-Migration Verification

1. No hardcoded color classes remain (grep for `text-white`, `text-gray`, `bg-gray`)
2. Component renders correctly in browser
3. Text is readable (contrast check)
4. Build passes without TypeScript errors

---

## 6. Template Directory Setup

### Architecture

```
templates/
  _shared/
    types.ts                  # TemplateConfig, TemplateTheme, shared contracts
    TemplateShell.tsx          # Isolation wrapper (CSS containment boundary)
    useTemplateTheme.ts        # Per-template dark/light mode toggle
  [template-name]/
    index.tsx                  # Entry point
    theme.css                  # Scoped CSS variables (light + dark)
    config.ts                  # Metadata (name, description, thumbnail, tags)
    components/                # Template-internal components
```

`templates/` lives at project root (not inside `app/`) — it's a content/design library, not a route. Each template gets its own `theme.css` for full isolation.

### Style Isolation — Three Layers

**Layer A: CSS Custom Property Scoping**

Template variables are scoped to a wrapper element, not `:root`. Use a namespace prefix (`--tpl-*`) to avoid collision with global variables.

```css
[data-template="horizon"] {
  --tpl-background: 210 20% 98%;
  --tpl-foreground: 222 84% 5%;
  --tpl-primary: 199 89% 48%;
}

[data-template="horizon"].tpl-dark {
  --tpl-background: 222 84% 5%;
  --tpl-foreground: 210 40% 98%;
  --tpl-primary: 199 89% 58%;
}
```

Use `.tpl-dark` (not `.dark`) so template dark mode is independent of site-level dark mode.

**Layer B: CSS Cascade Layer Isolation**

Place template styles in their own cascade layer:

```css
@layer templates {
  @import "./theme.css";
}
```

The `templates` layer sits between `components` and `utilities` so utility overrides still work.

**Layer C: TemplateShell Component**

The wrapper component:
- Renders `<div data-template={name}>` (activates scoped CSS vars)
- Applies `tpl-dark` class when template dark mode is active
- Uses `all: revert-layer` to prevent inherited global styles from leaking in
- Sets `color-scheme: light` or `dark` for native form controls
- Provides React context for child theme toggling

### Template-Internal Styling

**Recommended: Template-local utility layer**

```css
@layer templates {
  [data-template="horizon"] { /* tokens */ }

  .tpl-bg { background-color: hsl(var(--tpl-background)); }
  .tpl-text { color: hsl(var(--tpl-foreground)); }
  .tpl-bg-primary { background-color: hsl(var(--tpl-primary)); }
  .tpl-text-primary { color: hsl(var(--tpl-primary)); }
}
```

This gives clean `tpl-*` classes that never collide with global Tailwind utilities.

### Template Registry

```ts
export const templateRegistry: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  horizon: () => import('./horizon'),
  ember: () => import('./ember'),
};
```

Dynamic imports for code splitting. Add `"./templates/**/*.{js,ts,jsx,tsx,mdx}"` to Tailwind content config.

### Anti-Patterns

1. Do NOT put template CSS variables on `:root`
2. Do NOT use `.dark` for template dark mode
3. Do NOT import `app/globals.css` inside a template
4. Do NOT use `@theme` for template tokens (it registers globally)
5. Do NOT modify `components/ui/` (shadcn managed)
6. Do NOT use `!important` to override global styles
7. Do NOT share visual components between templates — shared logic in `_shared/` only as hooks/types

### Verification Checklist

- [ ] Site light + template dark: template renders dark, site stays light
- [ ] Site dark + template light: template renders light, site stays dark
- [ ] Template elements use `--tpl-*` variables, NOT global `--background` etc.
- [ ] Non-template elements have no `--tpl-*` variables or classes
- [ ] New template works by copying a folder and changing `theme.css` + `config.ts`
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes

---

## Quick Reference

### File Locations

| Item | Location |
|------|----------|
| Color Palettes Guide | `_docs/_guides/color-palettes-2026.md` |
| Typography Guide | `_docs/_guides/typography-2026.md` |
| Design tokens | `app/globals.css` |
| Font loading | `app/layout.tsx` |
| Template components | `components/layouts/movement-leader/{page-type}-{variant}.tsx` |
| Template switcher | `components/layouts/movement-leader/template-switcher.tsx` |
| Barrel exports | `components/layouts/movement-leader/index.ts` |
| Page routes | `app/templates/{page-type}/page.tsx` |
| Author images | `public/media-library/images/headshots/{author}/` |
| Reference archive | `_docs/reference-archive/{page-type}/` |

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Template component | `{PageType}{VariantName}` | `BooksFeaturedAuthor` |
| Template file | `{page-type}-{variant-name}.tsx` | `books-featured-author.tsx` |
| Variant ID | `{variant-name}` | `featured-author` |
| Author image | `{author}-{descriptor}-{aspect}.webp` | `brad-brisco-casual-light-16x9.webp` |
| Archived reference | `{page-type}-{descriptor}-{index}.png` | `books-grid-showcase-01.png` |

### Archive Layout

```
_docs/reference-archive/
├── {page-type}/
│   ├── manifest.json
│   ├── reconciliation-{variant_id}.md
│   └── {page-type}-{descriptor}-01.png
```
