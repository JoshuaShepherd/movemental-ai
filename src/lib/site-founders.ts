/**
 * Founders surfaced on the public homepage (`CredibilityFold`) and short
 * bio routes under `/about/founders/[slug]`. Full narrative lives on `/about`
 * and full bios at `/about/[slug]`.
 *
 * @deprecated Prefer `@/lib/founders/content` — this module re-exports for
 * backward compatibility with archived marketing components.
 */
export {
  ABOUT_FOUNDER_SLUGS,
  FOUNDER_PROFILES,
  FOUNDER_SLUGS,
  type FounderSlug,
  getFounderBySlug,
  founderProfilePath,
} from "./founders/content";

import {
  FOUNDER_PROFILES,
  type FounderSlug,
  getFounderBySlug,
} from "./founders/content";

export const SITE_FOUNDER_SLUGS = ["brad-brisco", "alan-hirsch", "josh-shepherd"] as const;

export type SiteFounderSlug = (typeof SITE_FOUNDER_SLUGS)[number] | "joshua-shepherd";

export type SiteFounder = {
  slug: SiteFounderSlug;
  name: string;
  shortTitle: string;
  portrait: string;
  aboutAnchorId: "founder-b" | "founder-a" | "founder-j";
  bioSummary: string;
};

const ANCHOR_BY_SLUG: Record<FounderSlug, SiteFounder["aboutAnchorId"]> = {
  "brad-brisco": "founder-b",
  "alan-hirsch": "founder-a",
  "josh-shepherd": "founder-j",
};

export const SITE_FOUNDERS: readonly SiteFounder[] = (
  ["brad-brisco", "alan-hirsch", "josh-shepherd"] as const
).map((slug) => {
  const profile = FOUNDER_PROFILES[slug];
  return {
    slug,
    name: profile.name,
    shortTitle: profile.jobTitle,
    portrait: profile.portrait,
    aboutAnchorId: ANCHOR_BY_SLUG[slug],
    bioSummary: profile.shortBio,
  };
});

export function getSiteFounderBySlug(slug: string): SiteFounder | undefined {
  const profile = getFounderBySlug(slug);
  if (!profile) return undefined;
  return {
    slug: profile.slug,
    name: profile.name,
    shortTitle: profile.jobTitle,
    portrait: profile.portrait,
    aboutAnchorId: ANCHOR_BY_SLUG[profile.slug],
    bioSummary: profile.shortBio,
  };
}
