/**
 * Canonical public metadata for the fragmentation book on `/book`.
 * Single source of truth for titles in metadata, email, and share copy.
 */

import { SAFETY_FIELD_GUIDE_COVER_IMAGE } from "@/lib/safety-field-guide";

export const BOOK_TITLE = "From Fragmentation to Movement";

/** Raster cover art (WebP) — full book jacket. */
export const BOOK_COVER_IMAGE = "/images/books/organizational-intelligence-book.webp";

/** Safety lead magnet (*AI Safety Handbook*) cover — shared across capture surfaces. */
export const FIELD_GUIDE_COVER_IMAGE = SAFETY_FIELD_GUIDE_COVER_IMAGE;

export const BOOK_SUBTITLE =
  "A structural path from scatter field to field — for movement leaders, nonprofits, churches, and institutions.";

/** Short label for compact UI (toolbar, share dialogs). */
export const BOOK_SHORT_NAME = "Fragmentation to Movement";

export const BOOK_DESCRIPTION =
  "Every organization carrying meaning through time pays a fragmentation tax. This free book names the structural problem, maps the six-stage path from fragmentation to movement, and shows why integration is the load-bearing stage — for movement leaders, nonprofits, churches, and institutions.";

/** Prior book title (redirects / internal references only). */
export const ARCHIVED_BOOK_SHORT_TITLE = "Content That Moves";

/** SEO / OG description for chapter routes that are not yet on disk. */
export const COMING_SOON_CHAPTER_DESCRIPTION =
  "This chapter is coming soon. Read published chapters from the book home page.";
