# Assets — Alan Hirsch course migration

Images referenced by the static templates should live here with stable kebab-case names. Record provenance below so future agents know where each binary came from.

## Conventions

- **Naming:** `kebab-case`, no spaces.
- **Format priority:** WebP for photographs, SVG for diagrams/icons, PNG only when transparency or lossless is required.
- **Inline SVG for icons.** Lucide icons that appear in page bodies are pasted inline with `currentColor` so they inherit semantic color — do not copy them here unless they are used as raster assets.
- **Responsive variants.** Match the source naming convention (`-mobile`, `-tablet`, `-desktop`, `-2x`) when copying.

## Registry

| filename (here) | purpose | source (alan-hirsch path) | notes |
| --- | --- | --- | --- |
| *(none yet)* | — | — | The current static pages use illustrative placeholders rendered as CSS-only figure blocks. When promoting to React, copy the canonical assets from the paths below. |

## Source paths awaiting copy (on next asset pass)

1. `public/images/art/courses/art-course-forgotten-ways.webp` — hero art for `forgotten-ways/index.html`.
2. `public/images/art/courses/course-forgotten-ways-cover-{mobile,tablet,desktop,2x}.webp` — responsive cover for hero + catalog.
3. `public/images/art/courses/art-courses-hero-formation.webp`, `courses-hero-formation-{tablet,desktop,2x}.webp` — catalog landing hero.
4. `public/images/art/courses/art-course-formation-journey-{warm,shaping}.webp` — misc artwork.
5. `public/images/art/courses/course-fallback-formation-{mobile,2x}.webp` — fallback thumbnail.
6. `public/images/art/portals/portal-forgotten-ways-icon-2x.webp`, `art-portal-forgotten-ways.webp` — portal badge.

## Why placeholders

The migration is deliberately "copy first, binary second":

1. The layout, tokens, and motion contracts are verified independently of the art pipeline.
2. Binaries are heavy and the site-templates system already expects art from `public/` once promoted to React.
3. Copying high-resolution WebPs into `docs/html/…/assets/` bloats the docs tree; these files are better left in the sibling repo or routed through the Supabase media bucket when they resurface in React.

When a human promotes a template to React, move the art copy from the sibling repo into movemental's `public/images/...` folder under the same semantic name, and wire `next/image` to it.
