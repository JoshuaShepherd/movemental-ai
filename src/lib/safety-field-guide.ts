import { SAFETY_GUIDEBOOK } from "@/lib/agent-room/naming";

/**
 * Canonical URLs for the Safety stage lead magnet — the AI Safety Handbook.
 * PDF ships from `public/downloads/`; cover art from `public/images/`.
 */

/** SEO-stable filename; served at `/downloads/…`. */
export const SAFETY_FIELD_GUIDE_PDF_PATH =
  "/downloads/movemental-it-starts-with-safety-field-guide.pdf" as const;

/** Primary product name for the Safety lead magnet. */
export const SAFETY_HANDBOOK_DISPLAY_TITLE = SAFETY_GUIDEBOOK.fullTitle;

/** Volume / series label (field guide edition). */
export const SAFETY_FIELD_GUIDE_DISPLAY_TITLE = "It Starts With Safety" as const;

/** Raster cover (WebP) for heroes, OG/Twitter, dock capture, and field-guide page. */
export const SAFETY_HANDBOOK_COVER_IMAGE = "/images/ai-safety-handbook-cover.webp" as const;

/** @deprecated Use {@link SAFETY_HANDBOOK_COVER_IMAGE}. Kept for existing imports. */
export const SAFETY_FIELD_GUIDE_COVER_IMAGE = SAFETY_HANDBOOK_COVER_IMAGE;

export const SAFETY_HANDBOOK_COVER_WIDTH = 765;
export const SAFETY_HANDBOOK_COVER_HEIGHT = 1024;

export const SAFETY_HANDBOOK_COVER_ALT =
  `${SAFETY_HANDBOOK_DISPLAY_TITLE}, first response documentation for nonprofits, churches, and institutions` as const;

export const SAFETY_FIELD_GUIDE_DOWNLOAD_FILENAME =
  "movemental-it-starts-with-safety-field-guide.pdf" as const;
