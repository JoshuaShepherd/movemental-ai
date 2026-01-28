# Mobbin Multi-Template Page Implementation

## Overview

This prompt guides the complete workflow for building **multi-template page types** from Mobbin reference images. Each page type (Home, About, Books, Articles, Podcasts, Video, Courses, Chat, Assessments) gets multiple template variants that users can switch between using a sticky template switcher.

**Input**: Directory of Mobbin reference images for a page type
**Output**: Multiple template components + template switcher + optimized author images + archived references

---

## Project Architecture

### Page Types & Navigation

The site uses standard Next.js App Router navigation between page types:

```
app/
├── templates/
│   └── movement-leader/
│       ├── page.tsx              # Home (hero templates)
│       ├── about/page.tsx        # About page templates
│       ├── books/page.tsx        # Books page templates
│       ├── articles/page.tsx     # Articles/Content templates
│       ├── podcasts/page.tsx     # Podcasts/Audio templates
│       ├── video/page.tsx        # Video page templates
│       ├── courses/page.tsx      # Courses page templates
│       ├── chat/page.tsx         # Chat/AI page templates
│       └── assessments/page.tsx  # Assessments page templates
```

### Component Structure

```
components/layouts/movement-leader/
├── index.ts                      # Barrel exports
├── template-switcher.tsx         # Reusable template switcher
├── site-navigation.tsx           # Standard site navigation
│
├── hero-{variant-name}.tsx       # Home/Hero templates
├── about-{variant-name}.tsx      # About page templates
├── books-{variant-name}.tsx      # Books page templates
├── articles-{variant-name}.tsx   # Articles page templates
├── podcasts-{variant-name}.tsx   # Podcasts page templates
├── video-{variant-name}.tsx      # Video page templates
├── courses-{variant-name}.tsx    # Courses page templates
├── chat-{variant-name}.tsx       # Chat page templates
└── assessments-{variant-name}.tsx # Assessments page templates
```

### Reference Images Location

```
_docs/_prompts/reference-images/
├── home-hero/          # Hero/home page references
├── about/              # About page references
├── books/              # Books page references
├── articles/           # Articles/content references
├── podcasts/           # Podcasts page references
├── video/              # Video page references
├── courses/            # Courses page references
├── chat/               # Chat page references
└── assessments/        # Assessments page references
```

### Template Styling Isolation

Each template must be **individually customizable at page/template level** without styles bleeding across templates. Use **one token prefix per template family** (e.g. `--mvmt-*`, `--home-minimal-*`) and use only that prefix in that template’s pages and components. Put new tokens in `app/globals.css` in a clearly labeled block (“Template: …”) or, preferred, under a wrapper class (e.g. `.template-movement-leader { --mvmt-*: … }`) so they only apply when that template’s layout is mounted. See [Template Styling Isolation](../../template-styling-isolation.md).

---

## Phase 1: Setup & Analysis

### Step 1.1: Identify Reference Images

When given a directory path (e.g., `_docs/_prompts/reference-images/books/`):

1. **List all images** in the directory
2. **View each image** to understand the design pattern
3. **Categorize by style**: Split, Gradient, Dark, Light, Overlay, Minimal, etc.
4. **Note key elements**: Layout structure, color scheme, typography style, unique features

### Step 1.2: Plan Template Variants

For each reference image, determine:

- **Variant name**: Descriptive kebab-case name (e.g., `books-grid-showcase`, `books-featured-author`)
- **Category**: For filtering in template switcher
- **Key features**: What makes this template distinct
- **Copy transformation**: How to adapt the content to movement leader context

**Example Analysis Output**:
```
Reference: codecademy-courses.png
├── Variant: courses-pricing-cards
├── Category: Light
├── Features: Pricing card overlay, instructor info, feature checklist
└── Copy: Course pricing → Cohort pricing, Instructor → Movement Coach
```

---

## Phase 2: Color Palette & Typography Selection

Before creating design tokens, select a color palette and font pairing from the curated 2026 collections. This ensures templates reflect current design trends and maintain visual consistency.

### Step 2.1: Analyze Reference Design Style

Based on the Mobbin reference images, determine the design mood:

| Design Mood | Recommended Palettes | Recommended Typography |
|-------------|---------------------|------------------------|
| **Luxury/Premium** | Midnight Opulence, Obsidian Elegance, Royal Burgundy | Playfair Display + Lato |
| **Modern/Tech** | AI Iridescence, Copper Tech, Digital Lavender | DM Serif Display + Inter |
| **Clean/Minimal** | Platinum Prestige, Cloud Dancer companions | Poppins + Roboto |
| **Warm/Organic** | Warm Earth, Elegant Forest, Golden Hour Elite | Lora + Nunito |
| **Bold/Creative** | Hyper-Digital, Neon Accent Dark, Transformative Teal | Oswald + Quicksand |
| **Calm/Wellness** | Arctic Luxury, Powdered Pastels | Cormorant Garamond + Karla |

### Step 2.2: Select Color Palette

Choose from the **25 curated palettes** in `_docs/_guides/color-palettes-2026.md`:

```
Palette Selection:
├── Category: [luxury | neutrals | cloud-dancer | digital]
├── Palette ID: [e.g., midnight-opulence]
├── Mode: [light | dark]
└── Colors:
    ├── Primary: #xxxxxx
    ├── Secondary: #xxxxxx
    ├── Tertiary: #xxxxxx
    └── Accent: #xxxxxx
```

### Step 2.3: Select Font Pairing

Choose from the **25 curated font pairings** in `_docs/_guides/typography-2026.md`:

```
Typography Selection:
├── Pairing ID: [e.g., playfair-lato]
├── Heading Font: [font family]
├── Body Font: [font family]
└── Weights: [required weights]
```

**Check font availability**: Verify the selected fonts are loaded in `app/layout.tsx`. If not, add them:

```tsx
import { New_Font } from "next/font/google";

const newFont = New_Font({
  variable: "--font-new-font",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
```

### Step 2.4: Document Selection

Add selection to the template planning output:

```
Template: {page-type}-{variant-name}
├── Reference: {mobbin-reference.png}
├── Palette: Midnight Opulence (#1a1a2e, #16213e, #0f3460, #efc07b)
├── Typography: Playfair Display + Lato
└── Mode: Dark
```

---

## Phase 3: Design Tokens

Create design tokens in `app/globals.css` using the selected palette and typography, with a **template-specific prefix** so styles do not bleed across templates. Use only this prefix in this template's pages and components. Prefer defining tokens under a **wrapper class** (e.g. `.template-movement-leader { … }`) if that template has or will have a layout wrapper; otherwise use a clearly labeled `:root` block. See [Template Styling Isolation](../../template-styling-isolation.md).

### Step 3.1: Map Palette to Tokens

Using the selected palette, create semantic token mappings:

```css
/* Template: Movement Leader — Palette: Midnight Opulence */
:root {
  /* Core palette colors */
  --mvmt-primary: #1a1a2e;       /* From palette primary */
  --mvmt-secondary: #16213e;     /* From palette secondary */
  --mvmt-tertiary: #0f3460;      /* From palette tertiary */
  --mvmt-accent: #efc07b;        /* From palette accent */

  /* Semantic mappings (dark mode) */
  --mvmt-bg-primary: var(--mvmt-primary);
  --mvmt-bg-secondary: var(--mvmt-secondary);
  --mvmt-bg-surface: var(--mvmt-tertiary);
  --mvmt-text-primary: #ffffff;
  --mvmt-text-secondary: rgba(255, 255, 255, 0.7);
  --mvmt-text-muted: rgba(255, 255, 255, 0.5);
  --mvmt-border-light: rgba(255, 255, 255, 0.1);
  --mvmt-border-medium: rgba(255, 255, 255, 0.2);
}
```

### Step 3.2: Map Typography to Tokens

Using the selected font pairing:

```css
:root {
  /* Typography from selected pairing */
  --mvmt-font-heading: var(--font-playfair-display), serif;
  --mvmt-font-body: var(--font-lato), sans-serif;

  /* Type scale */
  --mvmt-text-xs: 0.75rem;
  --mvmt-text-sm: 0.875rem;
  --mvmt-text-base: 1rem;
  --mvmt-text-lg: 1.125rem;
  --mvmt-text-xl: 1.25rem;
  --mvmt-text-2xl: 1.5rem;
  --mvmt-text-3xl: 1.875rem;
  --mvmt-text-4xl: 2.25rem;
  --mvmt-text-5xl: 3rem;
  --mvmt-text-6xl: 3.75rem;

  /* Font weights */
  --mvmt-font-normal: 400;
  --mvmt-font-medium: 500;
  --mvmt-font-semibold: 600;
  --mvmt-font-bold: 700;

  /* Line heights */
  --mvmt-leading-tight: 1.2;
  --mvmt-leading-normal: 1.5;
  --mvmt-leading-relaxed: 1.75;
}
```

### Step 3.3: Complete Token Example

**Example (labeled block on :root):**
```css
/* Template: Movement Leader — Palette: Midnight Opulence | Typography: Playfair + Lato */
:root {
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

**Preferred (scoped under wrapper):** If the template has a layout that wraps with `className="template-movement-leader"`, define tokens under that class instead of `:root` so they exist only when that template is mounted:
```css
.template-movement-leader {
  --mvmt-primary: #1a1a2e;
  /* … rest of --mvmt-* */
}
```

---

## Phase 4: Author Image Processing

### Step 4.1: Locate Author Images

Check for existing images in:
```
public/media-library/images/headshots/{author-name}/
```

### Step 4.2: Process New Images (If Provided)

If new author images are provided:

1. **Get dimensions** using PowerShell or Node.js:
```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($path)
Write-Output "$($img.Width)x$($img.Height)"
```

2. **Determine aspect ratio**:
   - 3:4 portrait (e.g., 1856x2464)
   - 16:9 landscape (e.g., 2912x1632)
   - 1:1 square

3. **Rename with convention**: `{author}-{descriptor}-{aspect}.webp`
   - `brad-brisco-office-bw-3x4.webp`
   - `brad-brisco-casual-light-16x9.webp`
   - `brad-brisco-portrait-dark-16x9.webp`

4. **Convert to WebP** using sharp:
```javascript
import sharp from 'sharp';

await sharp(sourcePath)
  .webp({ quality: 85, effort: 6 })
  .toFile(outputPath);
```

5. **Delete original large files** after successful conversion

### Step 4.3: Image Assignment Strategy

Match images to template styles:

| Image Style | Best For Templates |
|-------------|-------------------|
| Dark/B&W portrait | Dark themes, serious/professional |
| Light/casual | Light themes, approachable/friendly |
| Library/books | Content-focused, scholarly |
| Outdoor/golden | Aspirational, inspirational |
| Urban/community | Mission-focused, movement |
| Studio/clean | Minimal, professional |

---

## Phase 5: Template Component Creation

### Step 5.1: Component Structure

Each template component follows this structure:

```tsx
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
// ... other imports

interface {PageType}{VariantName}Props {
  className?: string;
}

/**
 * {Description} - Based on {Reference} reference
 * {Key features and layout description}
 */
export function {PageType}{VariantName}({ className }: {PageType}{VariantName}Props) {
  return (
    <section className={cn("relative ...", className)}>
      {/* Template content */}
    </section>
  );
}

{PageType}{VariantName}.displayName = "{PageType}{VariantName}";
```

### Step 5.2: Copy Transformation (CRITICAL)

**EVERY piece of text** must be transformed to movement leader context:

| Reference Copy | Movement Leader Copy |
|---------------|---------------------|
| "Order your meal" | "Start your journey" |
| "Shop now" | "Start Multiplying" |
| "$29/month" | "Free to start" |
| "5-star rating" | "10,000+ leaders equipped" |
| "Fast delivery" | "Field-tested frameworks" |
| "Our products" | "Books, Courses, Podcasts" |
| Generic testimonial | Network reference (Exponential, Forge, etc.) |

**Movement Leader Vocabulary**:
- Discipleship, multiplication, church planting
- Missional communities, kingdom impact
- Movement catalyst, practitioner, coach
- Books, courses, podcasts, assessments
- Leaders trained, churches planted, disciples made, countries reached

**Author Names**: Brad Brisco, Alan Hirsch, Dave Ferguson, Neil Cole, etc.

**Network Names**: Exponential, Forge, NewThing, V3, Missio, Saturate, Send Network

### Step 5.3: Image Integration

Always use Next.js Image component:

```tsx
import Image from "next/image";

// Full background
<Image
  src="/media-library/images/headshots/brad-brisco/brad-brisco-urban-steps-a-16x9.webp"
  alt="Brad Brisco"
  fill
  className="object-cover"
  priority
/>

// Avatar/thumbnail
<div className="w-14 h-14 rounded-full overflow-hidden">
  <Image
    src="/media-library/images/headshots/brad-brisco/brad-brisco-casual-light-16x9.webp"
    alt="Brad Brisco"
    width={56}
    height={56}
    className="object-cover w-full h-full"
  />
</div>
```

---

## Phase 6: Template Switcher

### Step 6.1: Create/Update Template Switcher

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export type {PageType}Variant =
  | "variant-a"
  | "variant-b"
  | "variant-c";
  // ... add all variants

interface TemplateSwitcherProps {
  activeTemplate: {PageType}Variant;
  onTemplateChange: (template: {PageType}Variant) => void;
}

const templates: Array<{
  id: {PageType}Variant;
  name: string;
  category: "Split" | "Gradient" | "Dark" | "Light" | "Overlay" | "Minimal";
}> = [
  { id: "variant-a", name: "Variant A Name", category: "Split" },
  { id: "variant-b", name: "Variant B Name", category: "Dark" },
  // ... all templates
];

export function TemplateSwitcher({ activeTemplate, onTemplateChange }: TemplateSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // ... implementation with dropdown, category filters, etc.
}
```

### Step 6.2: Page Integration

```tsx
"use client";

import { useState } from "react";
import { TemplateSwitcher, {PageType}Variant } from "@/components/layouts/movement-leader";

// Import all template components
import {
  {PageType}VariantA,
  {PageType}VariantB,
  // ... all variants
} from "@/components/layouts/movement-leader";

const templateComponents: Record<{PageType}Variant, React.ComponentType> = {
  "variant-a": {PageType}VariantA,
  "variant-b": {PageType}VariantB,
  // ... all mappings
};

export default function {PageType}Page() {
  const [activeTemplate, setActiveTemplate] = useState<{PageType}Variant>("variant-a");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="min-h-screen">
      {/* Sticky template switcher */}
      <div className="sticky top-16 z-40 bg-white border-b">
        <TemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>

      {/* Active template */}
      <ActiveComponent />

      {/* Page content below hero (if applicable) */}
    </div>
  );
}
```

---

## Phase 7: Build All Templates from Directory

When given a reference image directory, process ALL images:

### Step 7.1: Batch Processing Workflow

```
For each image in directory:
  1. View image → Understand design pattern
  2. Determine variant name and category
  3. Select color palette (from _docs/_guides/color-palettes-2026.md)
  4. Select font pairing (from _docs/_guides/typography-2026.md)
  5. Plan copy transformation
  6. Create component file with palette and typography
  7. Integrate author images
  8. Add to template switcher
  9. Update barrel exports
```

### Step 7.2: Parallel Component Creation

Create all template components efficiently:

1. **Read all reference images** first
2. **Plan all variants** before coding
3. **Create components** in batches (3-5 at a time)
4. **Update switcher** with all new variants at once
5. **Test** by checking build/lint

---

## Phase 8: Archive Processed References

After ALL templates for a page type are created:

### Step 8.1: Create Archive Directory

```
_docs/reference-archive/{page-type}/
├── manifest.json
└── {archived images}
```

### Step 8.2: Rename and Move Images

Rename with convention: `{page-type}-{short-descriptor}-{index}.png`

```bash
# Example
home-hero-minimal-lead-01.png
home-hero-dark-features-02.png
books-grid-showcase-01.png
```

### Step 8.3: Update Manifest

Create/update `manifest.json`:

```json
{
  "page_type": "home-hero",
  "archived_date": "2026-01-27",
  "images": [
    {
      "original": "codecademy-courses.png",
      "archived_as": "home-hero-pricing-card-01.png",
      "template_path": "components/layouts/movement-leader/hero-pricing-card.tsx",
      "variant_id": "pricing-card"
    }
  ]
}
```

### Step 8.4: Clean Up

```bash
# Move images
mv _docs/_prompts/reference-images/{page-type}/*.png _docs/reference-archive/{page-type}/

# Verify source directory is empty (except .gitkeep if needed)
```

---

## Complete Execution Checklist

When executing this prompt for a new page type:

### Pre-Flight (Phase 1)
- [ ] Identify reference images directory
- [ ] View ALL reference images
- [ ] Plan ALL template variants with names and categories
- [ ] Verify author images exist (or process new ones)

### Design Selection (Phase 2)
- [ ] Analyze reference design mood (luxury, modern, minimal, warm, bold, calm)
- [ ] Select color palette from `_docs/_guides/color-palettes-2026.md`
- [ ] Select font pairing from `_docs/_guides/typography-2026.md`
- [ ] Verify selected fonts are loaded in `app/layout.tsx`
- [ ] Document palette and typography selection for each template

### Token Setup (Phase 3)
- [ ] Create or update design tokens in `globals.css`
- [ ] Map palette colors to semantic tokens (bg, text, border)
- [ ] Map typography to font tokens
- [ ] Use template-specific prefix (e.g., `--mvmt-*`)

### Build Phase (Phases 4-7)
- [ ] Process author images if needed
- [ ] Create ALL template components with:
  - [ ] Proper TypeScript interface
  - [ ] Movement leader copy (no generic text)
  - [ ] Author images using Next.js Image
  - [ ] Design token usage (palette-based variables)
  - [ ] Typography using selected font pairing
  - [ ] Responsive design
  - [ ] displayName set
- [ ] Update template switcher with all variants
- [ ] Update barrel exports (index.ts)
- [ ] Create/update page.tsx with template switching

### Verification
- [ ] Run `pnpm lint` - no new errors
- [ ] Run `pnpm build` - compiles (ignore pre-existing errors)
- [ ] Verify all templates render correctly

### Archive Phase
- [ ] Create archive directory if not exists
- [ ] Rename reference images with convention
- [ ] Move images to archive
- [ ] Create/update manifest.json
- [ ] Verify source directory is clean

---

## Quick Reference: File Locations

| Item | Location |
|------|----------|
| **Design Guides** | |
| Color Palettes Guide | `_docs/_guides/color-palettes-2026.md` |
| Typography Guide | `_docs/_guides/typography-2026.md` |
| **Implementation** | |
| Design tokens | `app/globals.css` |
| Font loading | `app/layout.tsx` |
| Template components | `components/layouts/movement-leader/{page-type}-{variant}.tsx` |
| Template switcher | `components/layouts/movement-leader/template-switcher.tsx` |
| Barrel exports | `components/layouts/movement-leader/index.ts` |
| Page routes | `app/templates/movement-leader/{page-type}/page.tsx` |
| **Assets** | |
| Author images | `public/media-library/images/headshots/{author}/` |
| Reference images | `_docs/_prompts/reference-images/{page-type}/` |
| Archive | `_docs/reference-archive/{page-type}/` |

---

## Quick Reference: Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Template component | `{PageType}{VariantName}` | `BooksFeaturedAuthor` |
| Template file | `{page-type}-{variant-name}.tsx` | `books-featured-author.tsx` |
| Variant ID | `{variant-name}` | `featured-author` |
| Author image | `{author}-{descriptor}-{aspect}.webp` | `brad-brisco-casual-light-16x9.webp` |
| Archived reference | `{page-type}-{descriptor}-{index}.png` | `books-grid-showcase-01.png` |

---

## Execution Command

To execute this workflow, provide:

```
Execute mobbin-design-implementation.md for:
- Page type: {books|about|articles|podcasts|video|courses|chat|assessments}
- Reference directory: _docs/_prompts/reference-images/{page-type}/
```

The AI will then:
1. Analyze all reference images in the directory
2. Select color palette and typography from 2026 guides
3. Create design tokens based on selections
4. Process author images if needed
5. Create all template variants with palette and typography
6. Set up template switching
7. Archive processed references
