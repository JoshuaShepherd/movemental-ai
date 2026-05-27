/**
 * Why Movemental Final — cohesive typography system
 *
 * Rationale:
 * - Headlines / voice: Playfair (serif) — editorial weight and credibility; used for
 *   hero lines, section leads, and any "statement" that should feel authored.
 * - Body / UI: Inter (sans) — readable at all sizes, neutral; used for body copy,
 *   captions, and interface text.
 * - Labels / accents: Space Grotesk (sans) — distinct but not a second personality;
 *   used for small caps, labels, meta, and technical accents so they read as support.
 *
 * All three are already loaded in app/layout.tsx. Use these constants so the page
 * reads as one voice.
 */

export const fontHeading =
  'var(--font-playfair), Georgia, serif' as const
export const fontBody =
  'var(--font-inter), system-ui, sans-serif' as const
export const fontAccent =
  'var(--font-space-grotesk), system-ui, sans-serif' as const

export const typography = {
  heading: fontHeading,
  body: fontBody,
  accent: fontAccent,
} as const
