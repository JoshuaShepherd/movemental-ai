# Brad Brisco Template Batch — Design Pick

**Evaluated with:** Chrome DevTools MCP (full-page screenshots + snapshots), `_docs` design criteria, and code-based design knowledge.

**Batch:** All `html/brad-brisco-*.html` variants (base, alt, behance, editorial, flashy, glass, mint, mono, paper, serene, terracotta, terrain, gsap).

---

## Design criteria used (from `_docs`)

- **07-design-system-ux-philosophy.md:** Content-first, generous spacing, limited palette + one accent, clear typography hierarchy, MAYA (Most Advanced Yet Acceptable), accessibility, restraint.
- **design-expert-new-template.md:** Behance/Mobbin-worthy; full home page experience; distinct palette, type, hero; at least one clear design idea.
- **PROTOTYPE-SPEC.md / PERFECT-SINGLE-PAGE-DESIGN-SUMMARY.md:** Movemental = credibility, editorial tone, “of our time,” avoid generic Inter-only.

---

## Pick: **brad-brisco-editorial**

**Files:** `html/brad-brisco-editorial.html` + `html/styles/brad-brisco-editorial.css`

### Why this template wins on design

1. **Content-first and hierarchy**  
   Light monochrome (off-white `#FAFAFA` / `#F0F0F0`), black text, one blue accent (`#2563EB`). Newsreader (serif) for display + Karla for body. Centered hero with a clear image band below. Section numbers (01, 02, 03…) in large, faded type give rhythm and wayfinding without competing with copy. Matches “content leads,” “limited palette + one accent,” and “clear typography hierarchy.”

2. **Design-system alignment**  
   Single accent, generous section padding (`clamp(56px, 8vw, 96px)`), reading progress bar, nav that gains background on scroll. Restraint and consistency without feeling boring.

3. **Credibility and audience fit**  
   Light, readable, magazine-like. Fits “movement leaders” and “credibility ecology” — authoritative but approachable, no dark or flashy vibe.

4. **Distinct design idea**  
   Value cards use a **3D hover tilt** (transform/perspective). Section numbers in a fixed-width column (`--e-num-width: 80px`) create a strong editorial rhythm. That’s a clear, implementable idea that isn’t repeated in the other variants.

5. **Behance/Mobbin bar**  
   Newsreader + Karla is a specific editorial pairing (not generic Inter). Alternating section backgrounds and large numerals read as intentional layout, not template soup.

6. **Different from base and alt**  
   Base = dark sage/scarlet, full-bleed hero. Alt = warm cream/amber, split hero. Editorial = light, centered hero + image band, numbered sections — adds a third, clearly distinct direction.

---

## Runner-up: **brad-brisco-serene**

**Files:** `html/brad-brisco-serene.html` + `html/styles/brad-brisco-serene.css`

- Light, paper-like (`#fafaf9`), single teal accent (`#0d9488`). Crimson Pro + Figtree.
- **Hero:** Circular portrait + copy “pod” (spotlight treatment) — distinctive and memorable.
- Document-margin section labels, scroll progress, calm hierarchy. Slightly softer than editorial; equally content-first and on-brand.

Use **serene** if you want a warmer, more “spotlight” hero; use **editorial** if you want stronger section rhythm and a more magazine-like structure.

---

## Other variants (short notes)

| Template     | Strength                          | Why not top pick                              |
|-------------|-----------------------------------|-----------------------------------------------|
| **behance** | Portfolio-grade; bento; Syne+Sora; rose | Darker, more cinematic; less “content-first” default |
| **glass**   | Glassmorphism; Ibarra Real Nova + Manrope; indigo | Very current but effect-heavy; editorial/serene fit system better |
| **alt**     | Warm editorial; split hero; Fraunces | Already in “existing” set; editorial adds a different structure |
| **base**    | Brand-aligned sage/scarlet; full-bleed | Dark-first; editorial gives a light, section-led alternative |
| **flashy**  | Slate + cyan; floating card       | Sans-only; less editorial personality         |
| **terracotta / paper / mint / mono / terrain / gsap** | Each has a clear direction | Weaker fit to “content-first + one accent + clear hierarchy” or less distinctive vs. editorial/serene |

---

## Screenshots saved

Full-page (or viewport) screenshots were written under `html/` for comparison:

- `_compare-brad-brisco.png`
- `_compare-brad-brisco-alt.png`
- `_compare-brad-brisco-behance.png`
- `_compare-brad-brisco-editorial.png`
- `_compare-brad-brisco-flashy.png`
- `_compare-brad-brisco-glass.png`
- `_compare-brad-brisco-serene.png`
- `_compare-brad-brisco-terracotta.png`
- `_compare-brad-brisco-paper.png`
- `_compare-brad-brisco-mint.png`

You can delete these after review or keep them for future batch comparisons.

---

## One-line summary

**Best template from this batch (by design):** **`brad-brisco-editorial`** — light editorial, one blue accent, Newsreader + Karla, large section numbers, 3D-tilt value cards; best fit for content-first, credibility, and design-system criteria. **Runner-up:** `brad-brisco-serene` (teal, circular portrait hero, Crimson Pro + Figtree).
