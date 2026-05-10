/**
 * Canonical public paths for paired works — import from UI and metadata
 * so "book" vs "Movemental Path field guide" never drift to the wrong href.
 */

/** Living manuscript: two intelligences, six stages, integration thesis. */
export const BOOK_HUB_PATH = "/book" as const;

/**
 * Compiled Movemental Path field guide (Safety, Sandbox, Skills, Solutions).
 * Separate from `/book`; links to the book for the longer fragmentation arc.
 *
 * Constant name retains historical `SSSS_` prefix for route stability; the
 * user-visible label is "Movemental Path field guide."
 */
export const SSSS_FIELD_GUIDE_PATH = "/articles/ssss-field-guide-for-organizational-leaders" as const;
