# Iron-Clad Rules for Template Development

These rules exist because a prior implementation defined a complete token system and then built 200+ components that ignored it. The architecture was correct; the execution was not. Every rule below addresses a real failure mode.

---

## Rule 1: Components MUST Use Tokens — No Exceptions

Every color, font-family, and gradient in a template component must reference a CSS custom property with the template prefix (`--mvmt-*`, `--assess-*`, etc.).

**Forbidden patterns inside template components:**

```tsx
// WRONG — hardcoded Tailwind color
className="text-white"
className="text-gray-300"
className="bg-stone-900"
className="from-indigo-900 via-purple-900"

// WRONG — hardcoded hex
style={{ background: "#4F46E5" }}
style={{ background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)" }}
```

**Required patterns:**

```tsx
// CORRECT — token reference
className="text-[var(--mvmt-on-dark-primary)]"
className="bg-[var(--mvmt-surface-dark)]"
style={{ background: "var(--mvmt-gradient-hero-brand)" }}
```

**Why this matters:** If a component uses `text-white` instead of `var(--mvmt-on-dark-primary)`, then changing the token value has zero effect. The variant system, theme switching, and contrast fixes all depend on components actually reading tokens.

**Allowed Tailwind utilities (non-color):** Layout (`flex`, `grid`), spacing (`p-*`, `m-*`, `gap-*`), sizing (`w-*`, `h-*`), position, border-radius (`rounded-*`), shadows (`shadow-*`), typography size (`text-sm`, `text-lg`), font-weight (`font-bold`), responsive prefixes, animations.

---

## Rule 2: Define Tokens BEFORE Building Components

Do not write a single component until the token block exists in `globals.css` under the template wrapper class.

**Order of operations:**
1. Extract design values from the reference image (reconciliation note)
2. Define all tokens in `globals.css` under `.template-{family}` and variant overrides
3. Build the component using only those tokens
4. Verify: grep the component for any hardcoded color — if found, fix before merging

---

## Rule 3: Every Variant Gets Its Own Token Override Block

If a variant has a distinct color palette, typography, or accent color compared to the base template, it needs a CSS block:

```css
.template-movement-leader[data-variant="product-showcase"] {
  --mvmt-primary: #1a1a2e;
  --mvmt-accent: #efc07b;
  --mvmt-font-heading: var(--font-playfair-display), serif;
  /* ... only the values that differ from base */
}
```

If the variant shares the base palette entirely (structural-only difference), it does not need an override block — but it still must use tokens, not hardcoded values.

---

## Rule 4: Page Wrapper Must Bind the Variant

Every template page must apply the variant to the wrapper:

```tsx
<div className="template-movement-leader" data-variant={activeTemplate}>
```

Without `data-variant`, per-variant token overrides in CSS never activate.

---

## Rule 5: Reconciliation Note Before Implementation

Before building or revising any template variant:

1. Open the archived reference image
2. Document: colors (hex), fonts (serif/sans, weight), spacing (tight/generous), effects (radius, shadow), layout (columns, proportions), component treatment (button shape, card style)
3. Map extracted values to tokens

This prevents the "all templates look the same" problem where every variant gets the same palette because nobody looked at the reference.

---

## Rule 6: Verification Checklist Per Component

Before marking any component done:

- [ ] `grep` the file for `text-white`, `text-gray`, `text-black`, `bg-white`, `bg-black`, `bg-gray`, `from-`, `via-`, `to-`, `#[0-9a-fA-F]{3,8}` — zero matches in color positions
- [ ] All `color`, `background`, `border-color` values come from `var(--prefix-*)` tokens
- [ ] The page wrapper has `data-variant={activeTemplate}`
- [ ] The component renders correctly when switching variants
- [ ] Text meets WCAG AA contrast (4.5:1) against its background — check tokens, not eyeball

---

## Rule 7: Token Categories Must Be Complete

A template token set must cover ALL color usage scenarios before components are built. Missing categories cause developers to fall back to hardcoded values.

**Required token categories:**

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

If a component needs a color that doesn't have a token, add the token first — never hardcode.

---

## Rule 8: No Global/Shadcn Tokens in Template Body

Template components must not use `--primary`, `--background`, `--foreground`, `--muted`, or any other Shadcn/global token for the template's visual styling. Global tokens are for the app shell (nav, modals, settings UI) only.

---

## Summary: The Design Chain

```
Reference Image
    ↓ extract
Reconciliation Note (colors, fonts, spacing, effects)
    ↓ define
Token Block in globals.css (scoped to wrapper + variant)
    ↓ consume
Component uses ONLY var(--prefix-*) for all colors/fonts
    ↓ bind
Page wrapper applies data-variant={activeTemplate}
    ↓ result
Changing a token value changes every component that uses it
Switching variants automatically re-themes the page
```

Break any link in this chain and the system fails silently — tokens exist but nothing changes.
