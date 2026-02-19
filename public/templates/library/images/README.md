# Images for HTML templates

Standalone images for the HTML demos in `_docs/html/`. Copied from `public/` and organized by purpose so this directory is self-contained.

## Directory structure

| Folder | Contents | Example path |
|--------|----------|--------------|
| **alan/** | Alan Hirsch portraits, headshots, hero images | `images/alan/professional_portrait_photography_of_man_standing_i.webp` |
| **brad/** | Brad Brisco portraits, headshots, hero images | `images/brad/brad-brisco-studio-backdrop-3x4.webp` |
| **dave/** | Dave Ferguson portraits, headshots, hero images | `images/dave/dave-ferguson.webp` |
| **art/hero-sections/** | Hero background art (abstract, charcoal-style) | `images/art/hero-sections/art-abstract-communal-figures-loosely-circling-a-centra.webp` |
| **art/courses/** | Course cover art | `images/art/courses/course-mdna-primer-cover-desktop.webp` |
| **art/mdna/** | mDNA theme art | `images/art/mdna/art-abstract-symbolic-crown-rendered-in-expressive-char.webp` |
| **art/textures/** | Background textures (hero, section, card) | `images/art/textures/texture-hero-background.webp` |
| **books/** | Book cover images (leader books + editorial) | `images/books/book-hero-maker.webp` — see `books/STATUS.md` and `scripts/fetch-book-covers.js` |
| **logo/** | Logo variants (horizontal, black/white/full-color, heights) | `images/logo/logo-horizontal-black-h64.webp` |
| **orgs/** | Partner/org logos (5Q, Forge, MLC, 100 Movements) | `images/orgs/5q-collective-logo.webp` |
| **marks/** | Brand mark, favicon | `images/marks/brand-mark.svg`, `images/marks/favicon.svg` |
| **icons/** | PWA / app icons | `images/icons/icon-192.png`, `images/icons/icon-512.png` |
| **reference/** | Reference/mockup images (chatbot, course preview, themes) | `images/reference/chatbot.png` |
| **hero/16x9/** | Template-ready full-bleed hero (16:9, overlay-safe left) | `images/hero/16x9/alan-hero-16x9.webp` |
| **hero/3x4/** | Template-ready portrait-panel hero (3:4) | `images/hero/3x4/alan-hero-3x4.webp` |
| **portraits/headshot/** | Cropped headshots (4:5, square) for avatars and panels | `images/portraits/headshot/alan-headshot-4x5.webp` |
| **scripts/** | Crop script to generate hero/ and portraits/ from source images | See **Cropped / template-ready images** below |

## Using in HTML

From any `.html` file in `_docs/html/`, reference with a relative path:

```html
<!-- Hero background -->
<img src="images/art/hero-sections/art-abstract-communal-figures-loosely-circling-a-centra.webp" alt="" />

<!-- Alan portrait -->
<img src="images/alan/professional_portrait_photography_of_man_standing_i.webp" alt="Alan Hirsch" />

<!-- Brad portrait -->
<img src="images/brad/brad-brisco-studio-backdrop-3x4.webp" alt="Brad Brisco" />

<!-- Dave portrait -->
<img src="images/dave/dave-ferguson.webp" alt="Dave Ferguson" />

<!-- Book cover -->
<img src="images/books/book-the-forgotten-ways.webp" alt="The Forgotten Ways" />

<!-- Brand mark -->
<img src="images/marks/brand-mark.svg" alt="" />
```

## Cropped / template-ready images

To **crop and realign** source images so they fit template layouts (e.g. 16:9 with left third clear for overlay, 3:4 portrait panel, 4:5 headshots):

1. Ensure source images exist in `alan/`, `brad/`, `dave/`, and optionally `art/hero-sections/` (copy from `public/` if needed).
2. From `images/scripts/` run: `npm install` then `npm run crop`.
3. Outputs are written to `hero/16x9/`, `hero/3x4/`, and `portraits/headshot/`. Use these paths in HTML or leader JSON for consistent aspect ratios and overlay-safe composition.

See **scripts/README.md** for details and **_docs/IMAGE_CROP_SPECS_AND_TEMPLATE_FIT.md** for crop specs and which template uses which ratio.

## Book covers

Book cover images in `books/` are fetched from the [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers). From `images/scripts/`: run `npm run fetch-book-covers` (or `npm run fetch-book-covers:missing` to skip existing files). Then run `npm run convert-to-webp -- --keep` to generate `.webp` alongside `.jpg`. Config: `scripts/book-covers-config.json`. See `books/STATUS.md` for placeholder notes.

## Source

These files were copied from the main app’s `public/` directory. Backups (e.g. `public/.image-backups`, `public/images/.backup`) were not copied. To refresh from `public/`, re-run the copy script or copy the folders above manually.
