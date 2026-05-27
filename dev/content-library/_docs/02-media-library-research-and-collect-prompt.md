# Prompt 2: Movement Leader Image & Media Library — Research & Collection

**Audience:** Claude/Cursor agent or human researcher  
**Purpose:** Discover, verify, index, and collect all relevant images and media assets for a movement leader—headshots, book covers, featured images, social assets, and platform imagery—for use in Movemental templates, mock-ups, and the media library.  
**Context:** Movement leaders include Dave Ferguson, Mark Sayers, Brad Brisco, Alan Hirsch, Michael Frost, and others. Target structure: `public/media-library/` and leader-specific paths.

---

## Scope

Produce a **complete, verified index and collection** of:

- **Headshots** — Professional, candid, social; various crops (square, 3:4, 16:9)
- **Book covers** — All published books (print and ebook editions)
- **Featured images** — Article hero images, blog banners, podcast artwork
- **Social media assets** — Profile photos, cover images, branded graphics
- **Event/conference imagery** — Speaker photos, stage shots, promotional graphics
- **Organization/ministry branding** — Logos, marks (when leader is primary)
- **Video thumbnails** — For key teaching/speaking videos (when high-res available)
- **Course/curriculum artwork** — Covers, module graphics

If it represents the leader or their work and is usable in templates, it belongs in the index.

---

## Phase 1: Discovery & Research

### 1.1 Identify All Image Sources

1. **Primary websites**
   - Personal site (About, team, author pages)
   - Church or ministry site (staff, pastor, team)
   - Organization sites (Exponential, NewThing, Forge, etc.)
   - Publisher author pages (Baker, Zondervan, NavPress)

2. **Social & professional**
   - LinkedIn profile photo
   - Twitter/X header and avatar
   - Facebook profile and cover
   - Instagram (if professional use)

3. **Books & publishing**
   - Amazon Author Central
   - Goodreads author page
   - Publisher product pages (high-res covers)
   - ChristianBook.com, Barnes & Noble

4. **Podcasts**
   - Apple Podcasts, Spotify show art
   - Podcast website
   - Episode-specific artwork (if distinct)

5. **Video**
   - YouTube channel banner and avatar
   - Video thumbnails (for key videos)
   - Vimeo, church media, conference sites

6. **Newsletters**
   - Substack profile/header
   - Email header graphics

7. **Conference & events**
   - Speaker pages (Exponential, Sentralized, etc.)
   - Event promotion graphics
   - Stage/audience photos (with usage rights)

### 1.2 Build the Master Media Index

Create a markdown document: `[leader-slug]-MEDIA-INDEX.md` with this structure:

```markdown
# [Leader Full Name]: Media & Image Index

**Research date:** YYYY-MM-DD
**Leader slug:** [leader-slug]

---

## 1. Headshots

| Variant | Description | Source URL | Dimensions | License/Notes |
|---------|-------------|------------|------------|---------------|
| Primary | Studio, neutral backdrop | https://... | 1200×1600 | From [site] |
| Social | LinkedIn-style | https://... | 400×400 | LinkedIn |
| Candid | Conference/speaking | https://... | 1920×1080 | Exponential speaker page |

---

## 2. Book Covers

| Title | Edition | Source URL | Dimensions | Format |
|-------|---------|------------|------------|--------|
| Hero Maker | Hardcover | https://... | 1200×1800 | JPG |
| Hero Maker | eBook | https://... | 800×1200 | PNG |

---

## 3. Featured / Article Images

| Context | Description | Source URL | Dimensions |
|---------|-------------|------------|------------|
| Blog hero | Default featured image | https://... | 1200×630 |
| Substack | Header/featured | https://... | — |

---

## 4. Podcast / Video Artwork

| Asset | Platform | URL | Dimensions |
|-------|----------|-----|------------|
| Show art | Apple Podcasts | https://... | 3000×3000 |
| Channel art | YouTube | https://... | 2560×1440 |

---

## 5. Social Profile Assets

| Platform | Asset type | URL |
|----------|------------|-----|
| Twitter/X | Avatar | ... |
| Twitter/X | Header | ... |
| LinkedIn | Profile photo | ... |

---

## 6. Conference / Event Imagery

| Event | Asset | URL | Year |
|-------|-------|-----|------|
| Exponential | Speaker photo | ... | 2024 |
| Sentralized | Promo graphic | ... | 2024 |

---

## 7. Gaps & Unavailable

| Needed | Status | Notes |
|--------|--------|-------|
| High-res headshot | Not found | Only low-res on LinkedIn |
| Book X cover | Found | Publisher site, 800px |
```

### 1.3 Verification Rules

- **Check dimensions** — Inspect image size (right-click, browser dev tools, or metadata).
- **Note license** — Personal site = likely owned; stock = check usage; social = often restricted for commercial reuse.
- **Prefer official sources** — Author site, publisher, organization over third-party or social (quality and rights).
- **Cross-reference** — Use `_docs/site-docs/scenius-network-node-images.md` and `public/media-library/README.md` for existing conventions.

---

## Phase 2: Collection & Download

### 2.1 Ethical and Legal Guidelines

- **Respect usage rights** — Do not use images for commercial purposes without permission.
- **Templates/mock-ups** — Internal mock-ups and pitch materials generally allow fair use of publicly displayed images (headshots, book covers) for demonstration.
- **Production use** — For live sites, obtain proper licenses or use only images the leader/organization provides or approves.
- **Attribution** — When required, record photographer/source in metadata.
- **Watermarks** — Avoid watermarked or low-quality sources when a clean version exists.

### 2.2 Preferred Sources (in order)

1. **Leader's own site** — Highest likelihood of rights for templates.
2. **Publisher product pages** — Book covers are typically promotional; standard for author pages.
3. **Organization sites** — Church, Exponential, NewThing, etc., where leader is affiliated.
4. **Conference speaker pages** — Often provide high-res speaker photos for press/promo.
5. **Social media** — Use only when no better source; note resolution limits.
6. **Stock / generic** — Avoid for leader-specific templates; use only for thematic backgrounds.

### 2.3 Download Strategy

- **Headshots:** Get highest resolution available (min 512px on short edge for circles; 1024+ preferred).
- **Book covers:** Prefer 800px+ on short edge; 1200px+ for hero use.
- **Featured images:** 1200×630 (OG) or 1920×1080 for heroes.
- **Podcast/video art:** Native resolution (often 3000×3000 for podcasts).
- **Formats:** Prefer WebP or PNG for graphics; JPEG for photos. Convert if needed for consistency.

### 2.4 Tooling

- **Browser:** Right-click save, or use "Save image as" for full resolution.
- **wget/curl:** For direct image URLs when known.
- **Puppeteer/Playwright:** To capture rendered images from JS-heavy pages.
- **ImageMagick/squoosh:** For resize, crop, format conversion, optimization.
- **Manual checklist:** For complex or rights-sensitive assets, document URL and source for human collection.

---

## Phase 3: Organization & File Structure

### 3.1 Target Directory Structure

Align with `public/media-library/` and `_docs/site-docs/scenius-network-node-images.md`:

```
public/media-library/
├── images/
│   ├── headshots/
│   │   └── [leader-slug]/
│   │       ├── [leader-slug]-primary.webp
│   │       ├── [leader-slug]-primary-3x4.webp
│   │       ├── [leader-slug]-social-square.webp
│   │       └── [leader-slug]-[variant].webp
│   ├── books/
│   │   └── [leader-slug]/
│   │       ├── hero-maker.webp
│   │       ├── exponential-2010.webp
│   │       └── ...
│   ├── featured/
│   │   └── [leader-slug]/
│   │       └── [article-slug]-hero.webp
│   ├── network/                    # For scenius graph (illustration or photo)
│   │   └── [leader-slug]-illustration-headshot.png
│   └── ...
```

### 3.2 Naming Conventions

- **Headshots:** `[leader-slug]-[variant].webp` — e.g. `dave-ferguson-primary.webp`, `brad-brisco-studio-3x4.webp`
- **Book covers:** `[book-slug].webp` — e.g. `hero-maker.webp`, `forgotten-ways.webp` (kebab-case from title)
- **Featured:** `[context]-[slug].webp` — e.g. `blog-default-hero.webp`, `article-leadership-multiplication.webp`

### 3.3 Metadata File

Create `[leader-slug]-media-manifest.json` in `dev/content-library/[leader-slug]/`:

```json
{
  "leader_slug": "dave-ferguson",
  "leader_full_name": "Dave Ferguson",
  "last_updated": "YYYY-MM-DD",
  "headshots": [
    {
      "file": "dave-ferguson-primary.webp",
      "path": "public/media-library/images/headshots/dave-ferguson/dave-ferguson-primary.webp",
      "variant": "primary",
      "dimensions": { "width": 1200, "height": 1600 },
      "aspect_ratio": "3:4",
      "source_url": "https://...",
      "source_site": "daveferguson.org",
      "notes": "Studio, neutral backdrop"
    }
  ],
  "book_covers": [
    {
      "file": "hero-maker.webp",
      "book_title": "Hero Maker",
      "year": 2018,
      "path": "public/media-library/images/books/dave-ferguson/hero-maker.webp",
      "source_url": "https://...",
      "dimensions": { "width": 800, "height": 1200 }
    }
  ],
  "featured": [],
  "gaps": ["High-res 16:9 hero headshot not found"]
}
```

---

## Phase 4: Formatting for Templates

### 4.1 Template Requirements

From `html/[leader]/PROMPT.md` and `_docs/site-docs/scenius-network-node-images.md`:

- **About page:** Headshot, ideally 3:4 or square, min 256px short edge.
- **Homepage hero:** Optional leader photo; if used, 16:9 or 4:3 for hero strip.
- **Book chips/cards:** Book cover, ~200–400px width.
- **Scenius network:** Illustration (Alan-style) or photo headshot (Brad-style); square or near-square, ≥256px; solid or simple background.
- **Article cards:** Featured image 16:9 or 4:3; 1200×630 for social.

### 4.2 Crop & Size Guidelines

| Use case | Aspect ratio | Min dimensions | Format |
|----------|--------------|----------------|--------|
| Profile/About | 3:4 or 1:1 | 512×512 | WebP |
| Network node | 1:1 | 256×256 | PNG or WebP |
| Book card | 2:3 (book shape) | 400×600 | WebP |
| Hero | 16:9 or 4:3 | 1200×675 | WebP |
| Featured/social | 16:9 or 1.91:1 | 1200×630 | WebP |

### 4.3 Optimization

- **WebP** — Preferred for web; 80–85% quality for photos.
- **PNG** — For graphics with transparency (e.g. illustrations).
- **Alt text** — Record in manifest: e.g. "Dave Ferguson, author and speaker" or "Hero Maker book cover."

---

## Completion Checklist

- [ ] All image sources identified and documented.
- [ ] Master index `[leader-slug]-MEDIA-INDEX.md` complete with URLs and dimensions.
- [ ] Headshots collected and saved under `public/media-library/images/headshots/[leader-slug]/`.
- [ ] Book covers collected under `public/media-library/images/books/[leader-slug]/`.
- [ ] Featured/podcast/video artwork indexed (and collected where high-value).
- [ ] Media manifest JSON produced.
- [ ] Files named per conventions; WebP/PNG as appropriate.
- [ ] Crops/sizes created for template use cases (About, book cards, network node).
- [ ] Gaps documented (missing assets, low-res only, rights unclear).
- [ ] Cross-referenced with `public/media-library/README.md` and `scenius-network-node-images.md`.

---

## Reference Documents

| Document | Purpose |
|----------|---------|
| `public/media-library/README.md` | Media library structure and conventions |
| `public/media-library/QUICK-REFERENCE.md` | Quick reference for media paths |
| `_docs/site-docs/scenius-network-node-images.md` | Node avatar spec (illustration vs photo) |
| `_docs/ui/logo-usage.md` | Logo and mark usage |
| `html/[leader]/PROMPT.md` | Template asset requirements (e.g. headshot path) |
