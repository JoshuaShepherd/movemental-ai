import { canonicalPageUrl } from "@/lib/site-url";

import { type FounderProfile, founderProfilePath } from "./content";

const MOVEMENTAL_ORG = {
  "@type": "Organization" as const,
  name: "Movemental",
  url: canonicalPageUrl("/"),
};

/** Person JSON-LD for a founder profile page (EEAT / sameAs / worksFor). */
export function buildFounderPersonJsonLd(profile: FounderProfile): Record<string, unknown> {
  const url = canonicalPageUrl(founderProfilePath(profile.slug));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.jobTitle,
    description: profile.oneLine,
    image: profile.portrait.startsWith("http")
      ? profile.portrait
      : canonicalPageUrl(profile.portrait),
    url,
    mainEntityOfPage: url,
    worksFor: MOVEMENTAL_ORG,
    ...(profile.sameAs.length ? { sameAs: [...profile.sameAs] } : {}),
    ...(profile.knowsAbout.length ? { knowsAbout: [...profile.knowsAbout] } : {}),
  };
}
