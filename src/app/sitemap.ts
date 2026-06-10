import type { MetadataRoute } from "next";

import { canonicalPageUrl } from "@/lib/site-url";

/** Agent-only public routes for movemental.com. */
const ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/agent", changeFrequency: "weekly", priority: 1.0 },
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
