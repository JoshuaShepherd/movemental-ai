/**
 * Canonical public paths for paired works — import from UI and metadata
 * so "book" vs "Movemental Path field guide" never drift to the wrong href.
 */

/**
 * Legacy book hub slug; the `/book` app route is not shipped — Next redirects
 * `/book` to `/field-guide`. Prefer linking to the field guide hub directly.
 */
export const BOOK_HUB_PATH = "/book" as const;

/**
 * Public field guide / Movemental Path literary hub (`FieldGuidePage`).
 *
 * Constant name retains historical `SSSS_` prefix for import stability; the
 * user-visible label is typically "Movemental Path field guide" or "Field guide."
 */
export const SSSS_FIELD_GUIDE_PATH = "/field-guide" as const;
