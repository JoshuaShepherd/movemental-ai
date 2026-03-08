# Crop script: template-ready images

This script reads source images from the author folders (`alan/`, `brad/`, `dave/`) and `art/hero-sections/`, then writes **cropped and realigned** versions into:

- **hero/16x9/** — 1920×1080, right-anchored (left third clear for overlay)
- **hero/3x4/** — 600×800, for portrait-panel layouts
- **portraits/headshot/** — 4:5 and square headshots

## Prerequisites

- **Source images** must exist under `directories/images/`:
  - `alan/`, `brad/`, `dave/` — at least one image per folder (e.g. `.webp`, `.png`, `.jpg`)
  - `art/hero-sections/` — optional; first 5 images get a 16:9 crop

If you normally keep images in the main app’s `public/`, copy (or symlink) those folders into `directories/images/` before running.

## Run

From **directories/images/scripts/**:

```bash
npm install
npm run crop
```

Dry run (log only, no files written):

```bash
npm run crop:dry
```

From **directories/images/**:

```bash
cd scripts && npm install && npm run crop
```

## Output files

| Source | Outputs |
|--------|--------|
| First image in `alan/` | `hero/16x9/alan-hero-16x9.webp`, `hero/3x4/alan-hero-3x4.webp`, `portraits/headshot/alan-headshot-4x5.webp`, `alan-headshot-square.webp` |
| First image in `brad/` | Same pattern for `brad-*` |
| First image in `dave/` | Same pattern for `dave-*` |
| First 5 in `art/hero-sections/` | `hero/16x9/art-{basename}-16x9.webp` |

## Using in templates

Point hero or portrait `src` (or leader JSON) at these paths, e.g.:

- Full-bleed hero: `../images/hero/16x9/alan-hero-16x9.webp`
- Portrait panel: `../images/hero/3x4/alan-hero-3x4.webp`
- Author avatar: `../images/portraits/headshot/alan-headshot-4x5.webp`

See **_docs/IMAGE_CROP_SPECS_AND_TEMPLATE_FIT.md** for full specs and template mapping.
