import type { MetadataRoute } from "next";

import { listArticleSlugs } from "@/lib/articles";
import { listCommittedVoiceSlugs, VOICES_HUB_PATH } from "@/lib/committed-voices";
import { FOUNDER_SLUGS } from "@/lib/founders/content";
import { allResearchSlugs } from "@/lib/research/data";
import { isSiteLaunchReady } from "@/lib/site-launch";
import { canonicalPageUrl } from "@/lib/site-url";

/** Indexable public routes for movemental.ai (agent-first + document graph). */
const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/agent", changeFrequency: "weekly", priority: 1.0 },
  { path: "/agent/about", changeFrequency: "monthly", priority: 0.85 },
  { path: "/agent/how-we-use-ai", changeFrequency: "monthly", priority: 0.85 },
  { path: "/agent/churches", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agent/nonprofits", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agent/institutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/agent/churches/deck", changeFrequency: "yearly", priority: 0.5 },
  { path: "/agent/nonprofits/deck", changeFrequency: "yearly", priority: 0.5 },
  { path: "/agent/institutions/deck", changeFrequency: "yearly", priority: 0.5 },
  { path: VOICES_HUB_PATH, changeFrequency: "monthly", priority: 0.85 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.85 },
  { path: "/research", changeFrequency: "weekly", priority: 0.85 },
  { path: "/research/findings", changeFrequency: "monthly", priority: 0.7 },
  { path: "/research/sources", changeFrequency: "monthly", priority: 0.7 },
  { path: "/footnotes", changeFrequency: "monthly", priority: 0.7 },
  { path: "/assess", changeFrequency: "monthly", priority: 0.9 },
  { path: "/enroll", changeFrequency: "monthly", priority: 0.8 },
  { path: "/field-guide", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
];

function slugRoutes(
  prefix: string,
  slugs: readonly string[],
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  return slugs.map((slug) => ({
    url: canonicalPageUrl(`${prefix}/${slug}`),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteLaunchReady()) {
    return [];
  }

  const lastModified = new Date();
  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: canonicalPageUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));

  const articleSlugs = listArticleSlugs().filter((slug) => !slug.includes("/"));
  const articleEntries = articleSlugs.map((slug) => ({
    url: canonicalPageUrl(`/articles/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...slugRoutes("/research", allResearchSlugs(), "monthly", 0.75),
    ...slugRoutes("/about", FOUNDER_SLUGS, "yearly", 0.6),
    ...slugRoutes("/voices", listCommittedVoiceSlugs(), "monthly", 0.7),
    ...articleEntries,
  ];
}
