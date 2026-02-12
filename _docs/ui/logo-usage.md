# Logo usage and asset manifest — Movemental.ai

Standards and asset reference for the Movemental full logo (horizontal lockup) across the app and properties. Source treatment and generation process: `_docs/_guides/logo-and-mark-treatment.md`.

---

## Asset location

All logo files live under:

```
public/media-library/images/logo/
```

---

## Naming convention

| Pattern | Meaning |
|--------|--------|
| `logo-horizontal-{variant}-h{height}` | Full logo (wordmark + mark), horizontal lockup, by variant and height in pixels. |
| `{variant}` | `full-color` (transparent BG), `black`, or `white`. |
| `h{height}` | Intended display height in px; width is proportional (aspect ratio preserved from master). |

**Formats:** Each size is produced as `.png` and `.webp`. Prefer WebP in the app where supported (e.g. Next.js `<Image>`); use PNG for fallback or email.

**Source/masters (do not delete):** `logo-transparent.png`, `logo-black.png`, `logo-white.png` — used as input for `npm run logo:generate`.

---

## Asset manifest (generated sizes)

Generated from masters at **853×407 px** (aspect ratio ~2.1∶1). All derived assets preserve this ratio.

### Available heights

| Height (px) | Use case |
|-------------|----------|
| 24 | Minimum legibility (tight spaces, small UI). |
| 32 | Default nav/footer. |
| 48 | Medium (cards, sidebars). |
| 64 | Prominent placement. |
| 128 | Large (hero, marketing). |
| 200 | Hero / feature. |
| 400 | High-DPI / large display. |

### Filenames by variant and size

**Full color (transparent background)**  
Use on imagery, gradients, or any non-solid background.

- `logo-horizontal-full-color-h24.png` / `.webp`
- `logo-horizontal-full-color-h32.png` / `.webp`
- `logo-horizontal-full-color-h48.png` / `.webp`
- `logo-horizontal-full-color-h64.png` / `.webp`
- `logo-horizontal-full-color-h128.png` / `.webp`
- `logo-horizontal-full-color-h200.png` / `.webp`
- `logo-horizontal-full-color-h400.png` / `.webp`

**Black (light backgrounds)**  
Use on white, light gray, or light-colored surfaces.

- `logo-horizontal-black-h24.png` / `.webp` … through `logo-horizontal-black-h400.png` / `.webp`

**White (dark backgrounds)**  
Use on dark gray, black, or dark-colored surfaces.

- `logo-horizontal-white-h24.png` / `.webp` … through `logo-horizontal-white-h400.png` / `.webp`

### Path in app

Base URL path: `/media-library/images/logo/`

Example:  
`/media-library/images/logo/logo-horizontal-white-h32.webp`

---

## Logo usage standards (Movemental.ai)

### 1. Variant by context

| Context | Variant | Example path |
|---------|---------|--------------|
| Light background (default pages, cards, modals) | `black` | `logo-horizontal-black-h32.webp` |
| Dark background (footer, dark nav, dark sections) | `white` | `logo-horizontal-white-h32.webp` |
| Photo, gradient, or mixed background | `full-color` | `logo-horizontal-full-color-h32.webp` |

### 2. Minimum size

- **Minimum display height: 24 px** (use `h24` assets or larger). Do not scale below 24 px height.
- Prefer **32 px height** for nav and footer for readability and tap targets.

### 3. Clear space

- Allow padding around the logo at least **equal to the height of the “M” in the wordmark** (or the mark height) on all sides.
- Do not crowd with text, borders, or other logos inside this padding.

### 4. Do not

- Stretch or distort (always preserve aspect ratio).
- Change colors of the provided assets (no tinting or recolor).
- Place the black logo on dark backgrounds or the white logo on light backgrounds (contrast must be sufficient).
- Use at sizes smaller than 24 px height.

### 5. Responsive / srcset

For responsive images, use the `h*` assets that match your breakpoints, e.g.:

- Default: `logo-horizontal-{variant}-h32.webp` (with `logo-horizontal-{variant}-h32.png` as fallback).
- `srcset` for higher DPI: add `logo-horizontal-{variant}-h64.webp` at `2x` if needed.

### 6. Regenerating assets

If the master PNGs change, regenerate all sizes and formats:

```bash
npm run logo:generate
```

This reads `logo-transparent.png`, `logo-black.png`, and `logo-white.png` and overwrites all `logo-horizontal-*-h*.png` and `*.webp` in `public/media-library/images/logo/`.

---

## Reference

- **Treatment guide:** `_docs/_guides/logo-and-mark-treatment.md`
- **Design tokens:** `_docs/_guides/color-palettes-2026.md`, `_docs/_guides/typography-2026.md`
- **Current usage:** `components/shared/PublicFooter.tsx` — update to use `logo-horizontal-white-h32` (or appropriate size) when switching from legacy `logo.webp` / `mark.webp`.
