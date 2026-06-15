# Image and media URL index

Inventory of **image URLs referenced in this repo** (`src/`, `public/`, `docs/ai-studio` mirror), with a short description of each asset. Regenerate or extend when new components ship.

**Storage note:** The Supabase MCP tools wired in this workspace target the database, not Storage buckets. This file is sourced from the codebase. For a live object list under `media-library`, use the Supabase Dashboard → Storage or the Storage API / CLI.

---

## Supabase Storage (absolute URLs)

**Base:** `https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/`

| Description | URL path (append to base) |
|-------------|---------------------------|
| Movemental wordmark / logo — transparent PNG (`site-header` light branch) | `logos/movemental-logo-transparent.png` |
| Movemental logo — transparent white WebP (header on dark / midnight bar) | `logos/movemental-logo-transparent-white.webp` |
| Movemental wordmark — transparent WebP (`site-logo` default / light) | `logos/movemental-logo-transparent.webp` |
| Alan Hirsch headshot / portrait | `voices/alan-hirsch.webp` |
| Brad Brisco headshot | `voices/brad-brisco.webp` |
| JR Woodward headshot | `voices/jr-woodward.webp` |
| Liz Rios headshot | `voices/liz-rios.webp` |
| Rowland Smith headshot | `voices/rowland-smith.webp` |
| Lucas Pulley headshot | `voices/lucas-pulley.webp` |
| Tim Catchim headshot | `voices/tim-catchim.webp` |
| Rob Wegner headshot | `voices/rob-wegner.webp` |
| Joshua Shepherd headshot | `voices/josh-shepherd.webp` |

**Primary code references:** `src/components/nav/site-header.tsx`, `src/components/nav/site-logo.tsx`, `src/data/home-data.ts` (`VOICES`), `src/components/studio/pages/VoicesPage.tsx`, `HomePage.tsx`, `TeamPage.tsx`, and `docs/ai-studio/src/pages/VoicesPage.tsx`.

---

## Site-relative paths (`public/`)

Prefix with the deployment origin (e.g. `https://movemental.ai`) or use as-is in Next.js (`/…`).

### Book covers

Defined in `src/lib/book-meta.ts` and rendered via `src/components/book/book-cover.tsx`.

| Description | Path |
|-------------|------|
| Main book cover — *From Fragmentation to Movement* full jacket (WebP) | `/images/books/organizational-intelligence-book.webp` |
| **Field guide cover** — AI Stewardship Sequence field guide tone (WebP) | `/images/books/field-guide-cover.webp` |

### Services hero

| Description | Path |
|-------------|------|
| Services page hero — desk / overhead organized workspace | `/images/site/hero-desk-overhead-organized.webp` |

### Team section headshots

`src/components/sections/team/team-page-content.tsx`

| Description | Path |
|-------------|------|
| Brad Brisco | `/headshots/brad-brisco.webp` |
| Alan Hirsch | `/headshots/alan-hirsch.webp` |
| Joshua Shepherd | `/headshots/joshua-shepherd.webp` |

### Home concept founders

`src/components/sections/home/home-concept-modern-page-content.tsx` uses the same `/headshots/*.webp` paths as above for the founder row.

### Mock / alternate voice portraits

Sections under `sections-mock/` use **`/images/voices/<slug>.webp`** for the same leaders (Alan, Brad, Josh, Liz, Rowland, JR, Lucas, Tim, Rob). Example files: `credibility-fold.tsx`, `voices-content.tsx`, `team-content.tsx`.

### Fragmentation narrative art

Central map: `src/components/sections/fragmentation-story/fragmentation-story-content.ts` (`IMG`, `fragmentationStoryWebpPath`, `CHAPTER_INLINE` alts).

| Description (short) | Path |
|---------------------|------|
| Order of service — structured units | `/images/fragmentation-story/order-of-service-structured-units.webp` |
| Session card — essential structures | `/images/fragmentation-story/session-essential-structures-card.webp` |
| Formal design systems — split flow | `/images/fragmentation-story/formal-design-systems-split-flow.webp` |
| Book — “Fragments of Form” | `/images/fragmentation-story/book-fragments-of-form.webp` |
| Module — formal systems intro | `/images/fragmentation-story/module-formal-systems-intro.webp` |
| Cover — principles / design fragmentation | `/images/fragmentation-story/cover-principles-design-fragmentation.webp` |
| Cover — structural fragments investigation | `/images/fragmentation-story/cover-structural-fragments-investigation.webp` |
| Podcast card — abstract structures | `/images/fragmentation-story/podcast-card-abstract-structures.webp` |
| Mobile chat — skeleton bubbles | `/images/fragmentation-story/mobile-chat-skeleton-bubbles.webp` |
| Email thread — multi-participant | `/images/fragmentation-story/email-thread-multi-participant.webp` |
| Message thread — staggered fragments | `/images/fragmentation-story/message-thread-staggered-fragments.webp` |
| Core hub to fragment nodes | `/images/fragmentation-story/core-hub-to-fragment-nodes.webp` |
| Sketch — converge / diverge flow | `/images/fragmentation-story/sketch-converge-diverge-flow.webp` |
| Stage presentation — three shapes | `/images/fragmentation-story/stage-presentation-three-shapes.webp` |

**Consumers include:** `home-problem.tsx`, `home-turn.tsx`, `home-integration.tsx`, `fragmentation-deck.tsx`, `fragmentation-story-intel-artifact.tsx`.

### Static SVGs committed under `public/` (this clone)

| Description | Path |
|-------------|------|
| Brand mark | `/images/brand/brand-mark.svg` |
| Placeholder / scaffold SVGs | `/next.svg`, `/vercel.svg`, `/window.svg`, `/file.svg`, `/globe.svg` |

---

## Dynamic or template URLs (not fixed asset paths)

| Mechanism | Purpose |
|-----------|---------|
| `https://ui-avatars.com/api/?name=…&size=400&background=F3EFEA` | Fallback avatar when a portrait `src` fails (studio voice/team `<img onError />`). |
| `book_endorsements.endorser_avatar_url` | Per-row endorsement photos from the database; not hardcoded in source. |
| `lh3.googleusercontent.com` | Allowed in `next.config.ts` for Stitch-era placeholders; no concrete URLs in `src/` at last sweep. |

---

## Committed voices (`src/lib/committed-voices.ts`)

Published `/voices/[slug]` entries intentionally omit `portraitSrc` until licensed assets exist; UI falls back to initials. Planned convention: `/headshots/<slug>.webp`.

---

## Related automation

`scripts/upload-voices-to-supabase-storage.ts` uploads `public/images/voices/*.webp` into the `media-library` bucket under `movemental/voices/` — aligning local filenames with the Supabase URLs above when those files exist on disk.
