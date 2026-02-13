# Perfect Single Page — Design Summary

**Template:** `perfect-single-page.html` + `styles/perfect-single-page.css`  
**Source brief:** `PERFECT-SINGLE-PAGE-PROMPT.md` (root)

---

## Message & audience

- **Message:** Your content can move. One place where your books, teaching, and network stay connected — so your voice stays central and your work stays findable.
- **Primary CTA:** Get in touch.
- **Audience:** Movement leaders (authors, teachers, church planters) who want their work findable and lasting.

---

## Typography

- **Heading:** Fraunces (Google Fonts), weights 400, 600, 700. Variable optical size.
- **Body:** Source Sans 3 (Google Fonts), weights 400, 500, 600, 700.
- **Scale:** ~1.25 modular (xs 0.75rem → 5xl 3rem). Line-height: body 1.6, display 1.15.

---

## Palette

- **Backgrounds:** `#FBFAF8` (primary), `#F4F2EE` (alt), `#1a1a2e` (dark), `#0f0f1a` (darker).
- **Text:** `#1a1a2e` (primary), `#5a6572` (muted), `#8a94a0` (subtle); on dark: `#f5f5f7`, `#b8b8c4`.
- **Accent:** `#c73c3e` (primary), `#a02f31` (hover). Single accent for CTA and highlights.
- **Source:** In-house; dark primary + warm cream + scarlet accent for a contemporary editorial feel.

---

## Public image / illustration paths used

| Use            | Path                                                                 |
|----------------|----------------------------------------------------------------------|
| Hero band      | `/media-library/images/landscape/16-9/hero-graphic.svg`            |
| Section (split)| `/media-library/images/landscape/4-3/section-graphic.svg`          |
| Content band   | `/media-library/images/landscape/16-9/content-graphic.svg`          |
| Card icons     | `/globe.svg`, `/window.svg`, `/file.svg` (root `public/`)          |

All paths resolve under project `public/`. For HTML opened from `html/`, relative paths use `../public/...`.

---

## What makes it “of our time” and custom

Generous spacing, one strong accent, Fraunces for a distinct editorial tone (not generic Inter), and a single dark-to-cream rhythm with clear hierarchy. No purple gradients or floating blobs; the hero uses a public SVG graphic keyed to the same palette so the page feels cohesive and on-brand.
