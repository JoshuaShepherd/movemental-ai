# UI / UX exemplars from `~/Desktop/dev/repos`

This note records a single “best in folder” pick per category after scanning sibling repositories under `/Users/joshuashepherd/Desktop/dev/repos`. Judgment is **subjective**: editorial clarity, rhythm of layout, affordance density without clutter, and code that composes cleanly (tokens, props, separation of data vs presentation).

**Scope:** Examples live outside the **movemental** org site (`movemental` repo you are in now). Where noted, “unused here” means the pattern or codebase is not shipped as part of this Next.js marketing app.

---

## Ebook / e-reader

**Pick:** `alan-hirsch` — in-app book reader shell and chapter stack.

| Area | Path |
|------|------|
| Route (composition, URL state for chapter + language) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/content/books/[slug]/read/page.tsx` |
| Reading surface (typography, editorial prose class, font sizes) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/book-reader/reader-chapter-content.tsx` |
| Navigation chrome (TOC, progress, cover context) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/book-reader/reader-sidebar.tsx` |

**Why:** The reader is a **complete system**—sticky header/toolbar, scroll-derived progress, chapter query param, translation-aware routing, and a prose pipeline (`content-prose--editorial`) tuned for long-form—not a single pretty component. That is the bar for “e-reader” UX.

---

## Articles / post detail

**Pick:** `alan-hirsch` — `ArticleReader` and its article subcomponents.

| Area | Path |
|------|------|
| Page entry | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/content/articles/[slug]/page.tsx` |
| Client wrapper (tenant gate, chat context for the article) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content/ArticleDetailPageClient.tsx` |
| Reader orchestration (TOC from HTML, heading IDs, share, layout) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content/ArticleReader.tsx` |
| Decomposed UI (header, body, desktop/mobile TOC, etc.) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content/article/` |

**Why:** Long-form detail pages fail when everything is one template. This stack **extracts headings for TOC**, injects stable `id`s, wires **mobile vs desktop TOC**, share, optional AI-adjacent blocks, and tenant-driven copy—without sacrificing reading rhythm.

---

## Content library or card-based content page

**Pick:** `alan-hirsch` — unified library with type-specific cards.

| Area | Path |
|------|------|
| Data merge + tabs/search | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/content/ContentLibraryClient.tsx` |
| Card grid + per-type treatments | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryGrid.tsx` |
| Hero + filter bar | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryHero.tsx`, `ContentLibraryFilterBar.tsx` |

**Why:** The grid is not one generic card—it is **Stitch-faithful variants** (book, article, video, podcast, course) with distinct aspect ratios, motion, and metadata hierarchy. That is how a mixed library stays scannable.

---

## Landing page — course

**Pick:** `alan-hirsch` — course marketing route using the `course-landing` section system.

| Area | Path |
|------|------|
| Page composition | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/courses/[slug]/page.tsx` |
| Hero (meta strip, dual CTAs, cover) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/course-landing/CourseHeroSection.tsx` |
| Supporting sections (same folder) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/course-landing/` |

**Why:** Course landings need **credibility + logistics** (weeks, hours, cohort size) beside **emotion** (title, italic subtitle, cover). The hero encodes that split cleanly; the page stacks narrative sections with consistent spacing.

---

## Landing page — general (marketing / institutional)

**Pick:** `alan-hirsch` — about hero as a general-purpose “brand + person” landing block.

| Path |
|------|
| `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/about-page/about-hero.tsx` |

**Why:** Strong **two-column editorial rhythm** (portrait + typographic hierarchy), restrained label, serif/display pairing, and copy blocks that breathe. It reads as a magazine profile rather than a startup hero clone.

*Runner-up (product story, not biography):* `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/ai-lab/AILabHero.tsx` — layered gradient, background art, dual CTAs, tenant-aware copy.

---

## Hero section — three examples

These are intentionally **different hero archetypes** so you can steal the right pattern for a given story.

1. **Cinematic full-viewport** — pathway “descent” moment  
   `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/pathways-hub/detail/metanoia-cinematic-hero.tsx`  
   Full-bleed imagery, gradient wash, centered serif headline, scroll cue.

2. **Product / offer hero** — course enrollment  
   `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/course-landing/CourseHeroSection.tsx`  
   Grid split, badge, meta strip, primary + outline CTAs, rotated cover frame.

3. **Scroll-driven narrative hero** — pinned GSAP storytelling  
   `/Users/joshuashepherd/Desktop/dev/repos/movemental-ai/components/why-movemental-final/GSAPHeroTextSection.tsx`  
   Pinned section, phased copy blocks, scrubbed timeline—high craft for **argument over time**, not a static headline.

---

## Cards — three examples

All from the same implementation so you can compare **how one system varies density by content type**.

| Card pattern | Path (same file) |
|--------------|------------------|
| Editorial book tile (3:4 cover, tier badge, price row) | `StitchBookCard` in `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryGrid.tsx` |
| Article tile (read time, grayscale→color image, full-width CTA) | `StitchArticleCard` in the same file |
| Video tile (16:9, play affordance, duration pill) | `StitchVideoCard` in the same file |

**Why:** Each card optimizes for **the asset type’s natural shape** and scanning path (vertical book vs horizontal video vs text-forward article).

---

## Wildcard — three well-coded examples not used in this movemental repo

“Unused here” = not part of the **movemental** organizational site codebase; these are reference-grade patterns from siblings or upstream examples.

1. **Liveblocks — Notion-like collaborative doc shell**  
   `/Users/joshuashepherd/Desktop/dev/repos/liveblocks-main/examples/nextjs-notion-like-ai-editor/`  
   Reference architecture for **multiplayer document UI** (sidebar, rooms, notifications). Start from `app/components/DefaultLayout.tsx` and the editor route tree under `app/`.

2. **movemental-ai — GSAP scroll hero**  
   `/Users/joshuashepherd/Desktop/dev/repos/movemental-ai/components/why-movemental-final/GSAPHeroTextSection.tsx`  
   Clean `@gsap/react` usage, pinned `ScrollTrigger`, phased narrative—good study for motion that still respects readability.

3. **movemental-dashboard — TipTap “platform editor”**  
   `/Users/joshuashepherd/Desktop/dev/repos/movemental-dashboard/src/components/editor/RichContentEditor.tsx`  
   Large but coherent: TipTap + extensions + slash menu + media dialogs—**how to grow an editor** without collapsing everything into one file of spaghetti.

---

## Honorable mentions (not “winner” but worth a look)

| Idea | Where |
|------|--------|
| Pathway index typographic hero | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/pathways-hub/hero.tsx` |
| Pathway detail typographic hero | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/pathways-hub/detail/pathway-detail-hero.tsx` |
| movemental-ai layout lab (many hero variants) | `/Users/joshuashepherd/Desktop/dev/repos/movemental-ai/components/layouts/movement-leader/` |

---

*Generated for internal build reference; paths are absolute for one-click navigation from the machine that holds the repos.*
