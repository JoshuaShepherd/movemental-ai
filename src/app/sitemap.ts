import type { MetadataRoute } from "next";

import { listArticleSlugs } from "@/lib/articles";
import { CHAPTERS } from "@/components/mv/guidebook/guidebook";
import { LEADERS } from "@/components/mv/leaders/leaders";
import { MAP_STAGES } from "@/components/mv/map/stages";
import { FOUNDER_SLUGS } from "@/lib/founders/content";
import { allResearchSlugs } from "@/lib/research/data";
import { isSiteLaunchReady } from "@/lib/site-launch";
import { canonicalPageUrl } from "@/lib/site-url";

/** Indexable public routes for movemental.ai (the Paper site, plus the document graph). */
const STATIC_ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/resolve", changeFrequency: "monthly", priority: 0.95 },
  { path: "/map", changeFrequency: "monthly", priority: 0.9 },
  { path: "/assessment", changeFrequency: "monthly", priority: 0.9 },
  { path: "/work-with-us", changeFrequency: "monthly", priority: 0.9 },
  { path: "/work-with-us/inquire", changeFrequency: "yearly", priority: 0.6 },
  { path: "/churches", changeFrequency: "monthly", priority: 0.85 },
  { path: "/nonprofits", changeFrequency: "monthly", priority: 0.85 },
  { path: "/institutions", changeFrequency: "monthly", priority: 0.85 },
  { path: "/guidebook", changeFrequency: "weekly", priority: 0.85 },
  { path: "/leaders", changeFrequency: "monthly", priority: 0.85 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/story", changeFrequency: "yearly", priority: 0.7 },
  { path: "/agent/how-we-use-ai", changeFrequency: "monthly", priority: 0.8 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.85 },
  { path: "/research", changeFrequency: "weekly", priority: 0.85 },
  { path: "/research/findings", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sources", changeFrequency: "monthly", priority: 0.7 },
  { path: "/footnotes", changeFrequency: "monthly", priority: 0.6 },
  { path: "/field-guide", changeFrequency: "monthly", priority: 0.6 },
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
    ...slugRoutes("/map", MAP_STAGES.map((m) => m.slug), "monthly", 0.75),
    ...slugRoutes("/guidebook", CHAPTERS.filter((c) => c.written).map((c) => c.slug), "monthly", 0.75),
    ...slugRoutes("/leaders", LEADERS.map((l) => l.slug), "monthly", 0.7),
    ...articleEntries,
  ];
}
