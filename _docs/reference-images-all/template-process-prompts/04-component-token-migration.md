# Hero Component Token Migration Prompt

Use this prompt to migrate each hero component from hardcoded colors to the token system.

---

## Instructions for Claude

When asked to migrate a hero component, follow these steps:

### Step 1: Read the Component
```
Read the component at components/layouts/movement-leader/hero-[name].tsx
```

### Step 2: Identify All Hardcoded Colors

Search for these patterns:
- `text-white` (any variant)
- `text-gray-*` (100-900)
- `text-black`
- `bg-white`, `bg-black`, `bg-gray-*`
- `from-*`, `via-*`, `to-*` (gradient colors)
- `border-white/*`, `border-gray-*`
- Hex values: `#RRGGBB`
- Style objects with hardcoded colors

### Step 3: Apply Token Replacements

#### Text on DARK Backgrounds
Replace hardcoded colors with these tokens:

| Hardcoded | Token Replacement |
|-----------|-------------------|
| `text-white` | `text-[var(--mvmt-on-dark-primary)]` |
| `text-gray-100`, `text-gray-200` | `text-[var(--mvmt-on-dark-primary)]` |
| `text-gray-300` | `text-[var(--mvmt-on-dark-secondary)]` |
| `text-gray-400`, `text-gray-500` | `text-[var(--mvmt-on-dark-muted)]` |
| `text-white/80`, `text-white/90` | `text-[var(--mvmt-on-dark-secondary)]` |
| `text-white/60`, `text-white/70` | `text-[var(--mvmt-on-dark-muted)]` |
| `text-white/40`, `text-white/50` | `text-[var(--mvmt-on-dark-subtle)]` |

#### Text on LIGHT Backgrounds
| Hardcoded | Token Replacement |
|-----------|-------------------|
| `text-black`, `text-gray-900` | `text-[var(--mvmt-text-primary)]` |
| `text-gray-700`, `text-gray-800` | `text-[var(--mvmt-text-primary)]` |
| `text-gray-600` | `text-[var(--mvmt-text-secondary)]` |
| `text-gray-500` | `text-[var(--mvmt-text-muted)]` |
| `text-gray-400` | `text-[var(--mvmt-text-muted)]` |

#### Background Surfaces
| Hardcoded | Token Replacement |
|-----------|-------------------|
| `bg-white` | `bg-[var(--mvmt-surface-light)]` |
| `bg-gray-50`, `bg-gray-100` | `bg-[var(--mvmt-surface-light-muted)]` |
| `bg-black`, `bg-gray-900` | `bg-[var(--mvmt-surface-dark)]` |
| `bg-gray-800` | `bg-[var(--mvmt-surface-dark-elevated)]` |
| `bg-[var(--mvmt-bg-dark)]` | `bg-[var(--mvmt-surface-dark)]` |

#### Gradients
For inline style gradients:
```jsx
// Before
style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%)" }}

// After
style={{ background: "var(--mvmt-gradient-hero-brand)" }}
```

For Tailwind gradient classes, convert to inline styles:
```jsx
// Before
className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900"

// After
style={{ background: "var(--mvmt-gradient-hero-dark)" }}
// OR add a new token if needed
```

#### Borders
| Hardcoded | Token Replacement |
|-----------|-------------------|
| `border-white/10`, `border-white/20` | `border-[var(--mvmt-border-on-dark)]` |
| `border-white/30` | `border-[var(--mvmt-border-on-dark-medium)]` |
| `border-gray-200` | `border-[var(--mvmt-border-light)]` |
| `border-gray-300` | `border-[var(--mvmt-border-medium)]` |

### Step 4: Preserve Structural Classes

DO NOT change these Tailwind classes:
- Layout: `flex`, `grid`, `block`, `inline`, `hidden`
- Spacing: `p-*`, `m-*`, `gap-*`, `space-*`
- Sizing: `w-*`, `h-*`, `max-*`, `min-*`
- Position: `absolute`, `relative`, `fixed`, `sticky`
- Flex/Grid: `items-*`, `justify-*`, `col-*`, `row-*`
- Border radius: `rounded-*`
- Shadow: `shadow-*`
- Typography size: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, etc.
- Font weight: `font-*`
- Animation: `animate-*`, `transition-*`
- Responsive: `sm:`, `md:`, `lg:`, `xl:`

### Step 5: Handle Image Overlays

For gradient overlays on images:
```jsx
// Before
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

// After - keep as is for now, these are intentional opacity overlays
// OR convert to token if consistent pattern needed:
<div className="absolute inset-0" style={{ background: "var(--mvmt-gradient-overlay-dark)" }} />
```

---

## Example Migration

### Before (hero-author-spotlight.tsx excerpt)
```jsx
<h1 className="text-white">Ignite Movements.</h1>
<p className="text-gray-300">Join a community...</p>
<p className="text-gray-400">from 120+ countries</p>
<div className="bg-gradient-to-br from-gray-600 to-gray-800" />
```

### After
```jsx
<h1 className="text-[var(--mvmt-on-dark-primary)]">Ignite Movements.</h1>
<p className="text-[var(--mvmt-on-dark-secondary)]">Join a community...</p>
<p className="text-[var(--mvmt-on-dark-muted)]">from 120+ countries</p>
<div className="bg-[var(--mvmt-surface-dark-elevated)]" />
```

---

## Migration Order (by priority)

### P0 - Default/Featured Heroes
1. `hero-author-spotlight.tsx` - Default home page hero
2. `hero-mission-bold.tsx` - Brand statement hero

### P1 - Dark Background Heroes
3. `hero-dark-features.tsx` - Zapier-style
4. `hero-pricing-card.tsx` - Codecademy-style
5. `hero-product-showcase.tsx` - Webflow-style
6. `hero-agency-gradient.tsx` - Framer-style

### P2 - Mixed/Light Heroes
7. `hero-gradient-illustration.tsx` - GitLab-style
8. `hero-full-bleed.tsx` - SeatGeek-style
9. `hero-chat-widget.tsx` - Intercom-style

### P3 - Already Token-Compliant (verify only)
10. `hero-clean-minimal.tsx` - Unsplash-style
11. `hero-floating-card.tsx` - OpenTable-style
12. `hero-template-preview.tsx` - Framer Boost-style

---

## Verification

After migration, verify:
1. No hardcoded color classes remain (grep for `text-white`, `text-gray`, `bg-gray`)
2. Component renders correctly in browser
3. Text is readable (contrast check)
4. Build passes without TypeScript errors

---

## Token Reference (from globals.css)

```css
/* Dark surface text */
--mvmt-on-dark-primary: #FFFFFF;      /* 16.1:1 */
--mvmt-on-dark-secondary: #E2E8F0;    /* 11.5:1 */
--mvmt-on-dark-muted: #CBD5E1;        /* 9.2:1 */
--mvmt-on-dark-subtle: #94A3B8;       /* 5.5:1 */

/* Light surface text */
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #64748B;
--mvmt-text-muted: #94A3B8;

/* Surfaces */
--mvmt-surface-dark: #0F0F23;
--mvmt-surface-dark-elevated: #1A1A2E;
--mvmt-surface-light: #FFFFFF;
--mvmt-surface-light-muted: #FAFBFC;

/* Gradients */
--mvmt-gradient-hero-brand: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%);
--mvmt-gradient-hero-dark: linear-gradient(135deg, #1A1A2E 0%, #0F0F23 100%);
--mvmt-gradient-overlay-dark: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);

/* Borders */
--mvmt-border-on-dark: rgba(255, 255, 255, 0.15);
--mvmt-border-on-dark-medium: rgba(255, 255, 255, 0.25);
--mvmt-border-light: #E2E8F0;
--mvmt-border-medium: #CBD5E1;
```
