import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/** Tenant cohort with corpus rows — excludes jamie-roach. */
export const TENANT_RESEARCH_SLUGS = [
  "alan-hirsch",
  "brad-brisco",
  "jr-woodward",
  "liz-rios",
  "lucas-pulley",
  "roy-moran",
  "andrew-jones",
  "jeremy-chambers",
  "peyton-jones",
  "brian-sanders",
  "neil-cole",
  "dave-ferguson",
  "rob-wegner",
  "michael-cooper",
  "rowland-smith",
  "meghan-good",
] as const;

export type TenantResearchSlug = (typeof TENANT_RESEARCH_SLUGS)[number];

export const SUBSTRATE_SLUGS = new Set<TenantResearchSlug>([
  "alan-hirsch",
  "brad-brisco",
  "jr-woodward",
  "liz-rios",
  "lucas-pulley",
]);

/** Canonical on-disk paths aligned with Author Profile sidebar / ETL. */
export const CANONICAL_RESEARCH_PATHS = [
  "profile/identity.md",
  "profile/biography.md",
  "profile/theology.md",
  "profile/voice-analysis.md",
  "profile/calling-profile.md",
  "summary.md",
  "network/organizations.md",
  "content/books.md",
  "content/frameworks.md",
  "content/articles.md",
  "content/audio.md",
  "content/videos.md",
  "content/content-audit.md",
  "content/academic.md",
  "content/courses.md",
  "analysis/audience-analysis.md",
  "digital-presence/websites.md",
  "digital-presence/platforms.md",
  "digital-presence/newsletters.md",
  "digital-presence/social-media.md",
  "fragmentation-story.md",
  "welcome-letter.md",
] as const;

export const SIDEBAR_MANIFEST: Array<{
  sidebar: string;
  file: string;
  title: string;
}> = [
  { sidebar: "author-profile", file: "profile/identity.md", title: "Author Profile (identity)" },
  { sidebar: "author-profile", file: "network/organizations.md", title: "Author Profile (orgs)" },
  { sidebar: "biography", file: "profile/biography.md", title: "Biography" },
  { sidebar: "theological-profile", file: "profile/theology.md", title: "Theological Profile" },
  { sidebar: "vocational-profile", file: "summary.md", title: "Vocational Profile (summary)" },
  { sidebar: "vocational-profile", file: "profile/calling-profile.md", title: "Vocational Profile (calling)" },
  { sidebar: "voice-editorial-identity", file: "profile/voice-analysis.md", title: "Voice & Editorial Identity" },
  { sidebar: "bibliography", file: "content/books.md", title: "Bibliography" },
  { sidebar: "frameworks", file: "content/frameworks.md", title: "Frameworks" },
  { sidebar: "articles-blog-posts", file: "content/articles.md", title: "Articles & Blog Posts" },
  { sidebar: "audio-podcast", file: "content/audio.md", title: "Audio & Podcast" },
  { sidebar: "video-content", file: "content/videos.md", title: "Video Content" },
  { sidebar: "content-audit", file: "content/content-audit.md", title: "Content Audit" },
  { sidebar: "academic-work", file: "content/academic.md", title: "Academic Work" },
  { sidebar: "courses-training", file: "content/courses.md", title: "Courses & Training" },
  { sidebar: "audience-profile", file: "analysis/audience-analysis.md", title: "Audience & Reach" },
  { sidebar: "where-you-publish", file: "digital-presence/websites.md", title: "Where You Publish (websites)" },
  { sidebar: "where-you-publish", file: "digital-presence/platforms.md", title: "Where You Publish (platforms)" },
  { sidebar: "where-you-publish", file: "digital-presence/newsletters.md", title: "Where You Publish (newsletters)" },
  { sidebar: "social-media", file: "digital-presence/social-media.md", title: "Social Media" },
  { sidebar: "the-fragmentation-story", file: "fragmentation-story.md", title: "The Fragmentation Story" },
  { sidebar: "a-letter", file: "reflected-understanding/<slug>.md", title: "A Letter" },
  { sidebar: "(onboarding)", file: "welcome-letter.md", title: "Welcome letter" },
];

export function researchRoot(): string {
  return join(process.cwd(), "docs/movement_leader_research");
}

/**
 * Containers a leader's research tree may live in, in priority order. Leaders
 * whose corpus has been loaded are archived under `_onboarded_leaders/` to keep
 * the top level focused on in-flight work; both locations are canonical.
 */
export function researchContainers(): string[] {
  return [researchRoot(), join(researchRoot(), "_onboarded_leaders")];
}

/** The container that actually holds this slug's tree (falls back to top level). */
function resolveContainer(slug: string): string {
  const containers = researchContainers();
  for (const container of containers) {
    if (existsSync(join(container, slug))) return container;
  }
  return containers[0];
}

export function slugDir(slug: string): string {
  return join(resolveContainer(slug), slug);
}

export function reflectedUnderstandingPath(slug: string): string {
  return join(resolveContainer(slug), "reflected-understanding", `${slug}.md`);
}

export function slugToEnvPrefix(slug: string): string {
  return slug.toUpperCase().replace(/-/g, "_");
}

export function isPopulatedMarkdown(path: string): boolean {
  if (!existsSync(path)) return false;
  const raw = readFileSync(path, "utf8");
  const body = raw
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
  if (!body) return false;
  if (/^status:\s*empty/m.test(raw)) return false;
  return body.length > 40;
}

export function fileStatus(path: string): "populated" | "empty" | "missing" {
  if (!existsSync(path)) return "missing";
  return isPopulatedMarkdown(path) ? "populated" : "empty";
}

export function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

export function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}
