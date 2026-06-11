/**
 * Founders surfaced on the public homepage (`CredibilityFold`) and short
 * bio routes under `/about/founders/[slug]`. Full narrative lives on `/about`
 * (`#founder-b`, `#founder-a`, `#founder-j`).
 */
export const SITE_FOUNDER_SLUGS = ["brad-brisco", "alan-hirsch", "joshua-shepherd"] as const;

export type SiteFounderSlug = (typeof SITE_FOUNDER_SLUGS)[number];

export type SiteFounder = {
  slug: SiteFounderSlug;
  /** Display name (may include honorific). */
  name: string;
  /** Line under the name on the home credibility strip. */
  shortTitle: string;
  portrait: string;
  /** In-page anchor on `/about` (see `about-page-content.tsx`). */
  aboutAnchorId: "founder-b" | "founder-a" | "founder-j";
  /** One paragraph for the lightweight `/about/founders/*` page. */
  bioSummary: string;
};

export const SITE_FOUNDERS: readonly SiteFounder[] = [
  {
    slug: "brad-brisco",
    name: "Dr. Brad Brisco",
    shortTitle: "CEO & Co-founder",
    portrait: "/images/voices/brad-brisco.webp",
    aboutAnchorId: "founder-b",
    bioSummary:
      "Brad has led church planting strategy at the North American Mission Board for over a decade and is one of the most-respected voices in the missional church movement in North America, including multiple books on missional ecclesiology.",
  },
  {
    slug: "alan-hirsch",
    name: "Alan Hirsch",
    shortTitle: "Chief Missiologist & Co-founder",
    portrait: "/images/voices/alan-hirsch.webp",
    aboutAnchorId: "founder-a",
    bioSummary:
      "Alan is the missiologist behind The Forgotten Ways and the APEST and 5Q frameworks, adopted across denominations and seminaries globally. He coined the term Movemental.",
  },
  {
    slug: "joshua-shepherd",
    name: "Joshua Shepherd",
    shortTitle: "CTO & Founder",
    portrait: "/images/voices/josh-shepherd.webp",
    aboutAnchorId: "founder-j",
    bioSummary:
      "Josh is the technical founder behind Movemental’s platform, bringing years as a Methodist pastor and as a founder to how the product serves organizations and leaders.",
  },
];

export function getSiteFounderBySlug(slug: string): SiteFounder | undefined {
  return SITE_FOUNDERS.find((f) => f.slug === slug);
}
