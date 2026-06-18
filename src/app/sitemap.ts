import type { MetadataRoute } from "next";

import { isSiteLaunchReady } from "@/lib/site-launch";
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
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview mode: omit agent-first routes until launch-ready is explicitly set.
  if (!isSiteLaunchReady()) {
    return [];
  }

  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: canonicalPageUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
