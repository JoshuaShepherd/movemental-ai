# Movemental AI — Site Style and Improvements

**Purpose:** Single reference for the visual and structural style of the Movemental AI site, plus improvements aligned to the templates repo `_docs` (design-instructional-guides, BUILD_HTML_DESIGN_PROTOTYPE, DESIGN_CHAIN_EXECUTION, DESIGN_DECISION_ORDER, HERO_AND_MEDIA_SPEC, etc.). Use when duplicating pages for templating or when aligning the live site to template standards.

**Source repo:** `c:\dev\movemental-sites\movemental-ai`  
**Templates reference:** `c:\dev\#source\templates\_docs`

---

## 1. Tech stack and layout

| Item | Current |
|------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind v4, `app/globals.css` |
| Fonts | next/font: Inter, Poppins, DM Sans, Nunito, Playfair Display, Lora, Space Grotesk |
| Root layout | `app/layout.tsx` — applies font variables to `<html>`, Inter as body default |
| Public layout | `app/(public)/layout.tsx` — `PublicNavigation`, `<main>`, `PublicFooter` |
| Components | `components/shared/` (PublicNavigation, PublicFooter), `components/ui/` (shadcn-style) |

---

## 2. Design tokens (current)

### 2.1 Global `:root` (shadcn-style, light)

- **Background:** `120 14% 95%` (hsl) — sage-tinted light  
- **Foreground:** `120 27% 7%`  
- **Primary:** `359 59% 50%` (red/coral CTA)  
- **Secondary:** `276 38% 50%` (violet)  
- **Muted:** `180 8% 90%` / muted-foreground `180 10% 28%`  
- **Accent:** `276 38% 90%` / accent-foreground `276 38% 50%`  
- **Border / input:** `180 8% 80%`  
- **Radius:** `0.5rem`  
- **Charts:** 5 chart colors defined (orange, teal, dark blue, yellow, orange-red)

Dark mode (`.dark`): background `120 15% 8%`, foreground `120 14% 95%`; same primary/secondary hues, adjusted muted/border.

### 2.2 Movement Leader template (`.template-movement-leader`)

Scoped tokens used by template/marketing sections:

| Role | Value |
|------|--------|
| On-dark primary | `#FFFFFF` |
| On-dark secondary | `#E2E8F0` |
| On-dark muted | `#CBD5E1` |
| On-dark subtle | `#94A3B8` |
| Text primary | `#1A1A2E` |
| Text secondary | `#64748B` |
| Text muted | `#6B7280` |
| Surface dark | `#181818` |
| Surface dark elevated | `#242424` |
| Surface light | `#FFFFFF` |
| Surface light muted | `#FAFBFC` |
| Accent | `#9B59B6` |
| Accent hover | `#8E44AD` |
| CTA bg/text | `#9B59B6` / `#FFFFFF` |
| Borders (dark) | `rgba(255,255,255,0.15)` / `0.25` |
| Borders (light) | `#E2E8F0` / `#CBD5E1` |
| Footer bg | `#F5F5F5` |
| Footer text | `#64748B` / highlight `#1A1A2E` |
| Radius sm/md/lg | `0.375rem` / `0.75rem` / `1rem` |
| Radius full | `9999px` |
| Shadows | sm/md/lg defined |
| Font heading/body | Both `var(--font-inter)` (override elsewhere, e.g. Playfair for compare-substack) |

Static palettes in `@theme`: sage (50–950), bright-snow (50–950), scarlet-rush (50–950), velvet-orchid (50–950). Used by name (e.g. `sage-950`, `bright-snow-400`) in components.

### 2.3 Typography

- **Body default:** Inter (from root layout).  
- **Movement leader:** `--mvmt-font-heading` / `--mvmt-font-body` — both Inter in base template; Playfair + Inter used in compare-substack scoped block.  
- **Compare Substack page:** Playfair Display for headings; Inter for body.

### 2.4 Nav and footer

- **PublicNavigation:** Dropdowns for Platform (How It Works, Self-Screen, Compare, Pricing, FAQ), Learn (AI Book, Books, Topics, Resources, Profile Workspace), Company (Why Movemental, About, Team, Network). Logo: `/media-library/images/logo/logo-horizontal-full-color-h32.webp`. Variant `dark`/`light`; scroll state.  
- **PublicFooter:** Three columns — Platform, Explore, About — plus logo and legal (Privacy, Terms). Uses `sage-950` / `bright-snow-400` for dark variant; `bg-muted/30 border-border` for light.

---

## 3. Hero and key patterns

- **Hero:** No single canonical hero pattern documented in code; various pages use full-width sections, gradients (`--mvmt-gradient-hero-brand`, `--mvmt-gradient-hero-dark`, `--mvmt-gradient-overlay-hero`), and dark/light sections.  
- **Gradients:** Brand (indigo/purple/blue), dark (navy), overlay dark (top fade), overlay hero (left-to-right fade).  
- **No explicit “hero pattern” choice** (e.g. split diagonal, portrait+copy, glass centered) from the templates repo’s HERO_AND_MEDIA_SPEC §3 is codified site-wide.

---

## 4. Improvements (aligned to templates repo `_docs`)

These bring the Movemental AI site in line with the improved prompts and specs in `c:\dev\#source\templates\_docs`.

### 4.1 Design decision order (DESIGN_DECISION_ORDER.md)

- **Design mode:** The site is a **product/marketing** site (how-it-works, compare, pricing, book) rather than a “movement leader” content platform. Recommend naming a mode (e.g. “product-editorial” or “movemental-product”) and documenting it so palette, type, and components are chosen in order: mode → palette → typography → spacing/radius → layout → components → motion.  
- **Palette:** Already semantic (primary, secondary, accent, muted). Improve by: (1) ensuring all surfaces use tokens (no raw hex in components where avoidable), (2) defining a single “hero background” token set for above-the-fold sections.  
- **Typography:** Limit to 2–3 sizes for body/headings; use `text-muted-foreground` (or mvmt equivalent) consistently for secondary text. Document heading hierarchy (h1/h2/h3) and line-heights in one place.  
- **Radius:** Keep consistent across cards, buttons, inputs (already `--radius` and mvmt radius scale).  
- **Layout:** Document max-widths and breakpoints (e.g. container, reading width, dashboard width) in one place; mobile-first.

### 4.2 Hero and media (HERO_AND_MEDIA_SPEC.md)

- **Bounded hero pattern:** Pick **one** hero pattern from the spec (e.g. full-bleed background, portrait+copy, split diagonal, glass centered) per page type (e.g. home vs. how-it-works vs. compare) and document it. Avoid “generic” or unstated hero layout.  
- **Media slot:** For any hero that should show a thought leader or product visual, assign a **single** hero media slot and path convention (e.g. `tenantConfig.hero.image` → `public/images/hero/` or `public/images/portraits/`). Do not leave hero media unspecified.  
- **Anti-pattern:** Avoid plain hero (black text on white with no media and no pattern) unless “Text-only” is explicitly chosen and appropriate for that page.

### 4.3 Public surface and shared layout (PUBLIC_SURFACE_SPEC, SHARED_LAYOUT.md)

- **Nav uniformity:** The templates repo requires **uniform** nav across templates: Home, Content, Themes, Assessments, AI Lab, Search, Sign In/Account — with About, Formation, Pricing in footer only. Movemental AI’s nav is **product-specific** (How It Works, Compare, Pricing, FAQ, etc.). For **templating** movement-leader sites from this codebase, introduce a configurable nav that can switch between “product” (current) and “movement leader” (Home, Content, Themes, Assessments, AI Lab, etc.) so the same code can drive both.  
- **Footer:** Align footer link set with spec where templates are derived: Home, About, Formation, Pricing, Privacy, Terms, Accessibility.  
- **Sticky header:** Ensure PublicHeader is sticky/fixed with consistent `z-index` and body padding.

### 4.4 Content cards and featured media (CONTENT_CARDS_AND_FEATURED_MEDIA_SPEC.md)

- **Cards:** For any content list (books, topics, articles): use per-type metadata (e.g. runtime for video/podcast; **no** reading time on book cards); required book cover on book cards; one primary image per card.  
- **Book detail:** Ensure book cover is required and from a single path convention (e.g. `public/images/books/` or catalog).

### 4.5 Build HTML design prototype (BUILD_HTML_DESIGN_PROTOTYPE.md)

- **Prototype output:** When building static HTML prototypes from this style, place them in a single directory (e.g. `_docs/html/movemental-ai/` or the templates repo’s `movemental-ai-template/`) with `index.html`, `css/main.css`, `js/main.js`.  
- **Image paths:** Use path conventions: e.g. `../images/hero/`, `../images/books/` from HTML; in CSS `url('../images/...')`.  
- **No wireframes:** Prototypes must use real colors, fonts, spacing, and representative content; no “apply design later.”

### 4.6 Design chain execution (DESIGN_CHAIN_EXECUTION_PROMPT.md)

- **Tokens from prototype:** If the site is treated as the “concrete design vision,” extract design tokens (color, typography, spacing, radius, hero pattern, card/button style) into a structured token set so new pages or Next.js templates can apply the same look.  
- **Validation:** Cross-check tokens against DESIGN_DECISION_ORDER, HERO_AND_MEDIA_SPEC, and CONTENT_CARDS_AND_FEATURED_MEDIA_SPEC; note deviations and fix either the site or the spec.

### 4.7 Accessibility and motion

- **Focus:** Use `focus-visible` and ring styles consistently.  
- **Motion:** Respect `prefers-reduced-motion`; document motion personality (e.g. subtle 150–250ms for key interactions).  
- **Contrast:** Ensure text/background combinations meet WCAG for the defined palette.

---

## 5. Summary table (style at a glance)

| Area | Current | Improvement |
|------|--------|-------------|
| Mode | Implicit product/marketing | Name mode; follow design decision order |
| Palette | :root + .template-movement-leader + static palettes | Single token set; no raw hex in components |
| Typography | Inter default; Playfair in places | Document hierarchy; 2–3 sizes; muted secondary |
| Hero | Ad hoc gradients/sections | One chosen pattern per page type; media slot + path |
| Nav | Product nav (How It Works, Compare, etc.) | Optional “movement leader” nav for templating |
| Footer | Platform / Explore / About | Add Formation, Accessibility when templating |
| Cards | Varies by page | Per-type metadata; book cover required; CONTENT_CARDS_AND_FEATURED_MEDIA_SPEC |
| Prototypes | Next.js only | HTML/CSS/JS option in designated directory with path conventions |

---

## 6. References

- Templates design-instructional-guides: `c:\dev\#source\templates\_docs\design-instructional-guides\`
- DESIGN_DECISION_ORDER: `_docs/design-instructional-guides/DESIGN_DECISION_ORDER.md`
- HERO_AND_MEDIA_SPEC: `_docs/design-instructional-guides/HERO_AND_MEDIA_SPEC.md`
- PUBLIC_SURFACE_SPEC: `_docs/design-instructional-guides/PUBLIC_SURFACE_SPEC.md`
- SHARED_LAYOUT: `_docs/design-instructional-guides/pages/SHARED_LAYOUT.md`
- BUILD_HTML_DESIGN_PROTOTYPE: `_docs/design-instructional-guides/template-construction/BUILD_HTML_DESIGN_PROTOTYPE.md`
- DESIGN_CHAIN_EXECUTION_PROMPT: `_docs/_prompts/DESIGN_CHAIN_EXECUTION_PROMPT.md`
- CONTENT_CARDS_AND_FEATURED_MEDIA_SPEC: `_docs/design-instructional-guides/CONTENT_CARDS_AND_FEATURED_MEDIA_SPEC.md`
