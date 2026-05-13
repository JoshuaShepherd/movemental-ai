import type { MetadataRoute } from "next";

import { canonicalPageUrl } from "@/lib/site-url";

/**
 * Public-facing routes for movemental.com. Keep this list aligned with
 * pages under `src/app/(site)/`. Anything gated, archived, or in an
 * `_archive` tree should not appear here.
 */
const ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/pathway", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pathway/safety", changeFrequency: "monthly", priority: 0.88 },
  { path: "/pathway/sandbox", changeFrequency: "monthly", priority: 0.88 },
  { path: "/pathway/skills", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pathway/solutions", changeFrequency: "monthly", priority: 0.85 },
  { path: "/the-path", changeFrequency: "monthly", priority: 0.85 },
  { path: "/start-with-safety", changeFrequency: "monthly", priority: 0.9 },
  { path: "/churches", changeFrequency: "monthly", priority: 0.8 },
  { path: "/nonprofits", changeFrequency: "monthly", priority: 0.8 },
  { path: "/institutions", changeFrequency: "monthly", priority: 0.8 },
  { path: "/movement-leaders", changeFrequency: "monthly", priority: 0.7 },
  { path: "/voices", changeFrequency: "monthly", priority: 0.75 },
  { path: "/evidence", changeFrequency: "monthly", priority: 0.75 },
  { path: "/field-guides", changeFrequency: "monthly", priority: 0.85 },
  { path: "/field-guides/safety", changeFrequency: "monthly", priority: 0.85 },
  { path: "/library", changeFrequency: "monthly", priority: 0.55 },
  { path: "/technology", changeFrequency: "monthly", priority: 0.55 },
  { path: "/how-we-use-ai", changeFrequency: "monthly", priority: 0.5 },
  { path: "/footnotes", changeFrequency: "monthly", priority: 0.5 },
  { path: "/safety/sign", changeFrequency: "yearly", priority: 0.45 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.85 },
  { path: "/assess", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/about/founders/brad-brisco", changeFrequency: "yearly", priority: 0.45 },
  { path: "/about/founders/alan-hirsch", changeFrequency: "yearly", priority: 0.45 },
  { path: "/about/founders/joshua-shepherd", changeFrequency: "yearly", priority: 0.45 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
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
