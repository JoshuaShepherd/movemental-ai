/**
 * Slugs that existed under `/book/read/[slug]` for the prior *Content That Moves*
 * manuscript. Each redirects to `/field-guide` so external links resolve to the
 * live field-guide hub (the `/book` route is not shipped).
 */
export const LEGACY_BOOK_READ_SLUGS: readonly string[] = [
  "preface-the-story",
  "the-credibility-crisis",
  "ai-is-not-a-technological-challenge",
  "where-we-are-and-why-now",
  "finding-a-guide",
  "ai-as-credibility-amplifier-not-faker",
  "amplification-not-replacement",
  "the-maturity-model-and-why-experimentation-matters",
  "voice-preservation-as-priority",
  "scenius-as-credibility-solution",
  "transparency-disclosure-and-trust",
  "my-2025-with-ai",
  "pace-and-discernment",
  "what-to-refuse-and-what-were-free-to-do",
  "what-ai-displaces-and-what-we-protect",
  "practice-parameters",
  "ai-and-content-creation",
  "ai-and-formation-and-leadership",
  "everything-i-know-about-prompting",
  "from-gutenberg-to-networks-of-trust",
  "content-that-moves",
  "where-i-am-now",
  "the-scenius-at-scale-movemental-at-100",
] as const;
