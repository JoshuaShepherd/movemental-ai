import type { MetadataRoute } from "next";

import { canonicalPageUrl } from "@/lib/site-url";

/** Indexable public routes for movemental.ai (agent-first surface). */
const ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/agent", changeFrequency: "weekly", priority: 1.0 },
  { path: "/assess", changeFrequency: "monthly", priority: 0.9 },
  { path: "/enroll", changeFrequency: "monthly", priority: 0.8 },
  { path: "/field-guide", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: canonicalPageUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
