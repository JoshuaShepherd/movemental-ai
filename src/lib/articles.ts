import fs from "node:fs";
import path from "node:path";

import {
  ARTICLE_SHAPES,
  articleFrontmatterSchema,
  type ArticleShape,
  type CanonSection,
  type Audience,
  type Topic,
  type SeriesKey,
} from "@/lib/articles-schema";
import { slugifyHeading } from "@/lib/slugify-heading";

/**
 * Server-only loader for long-form articles stored as markdown in `docs/articles`.
 * Frontmatter (parsed with the Zod contract in `articles-schema.ts`) is the
 * authoritative source of shape, canon position, series, audience, and topics —
 * the old hand-maintained `EYEBROW_OVERRIDES` map has been retired.
 */

const ARTICLES_DIR = path.join(process.cwd(), "docs", "articles");

/**
 * Files that are not public articles (internal briefs, course outlines, video
 * scripts). Everything else is treated as a publishable article and becomes a
 * static route at `/articles/[slug]` (root files) or `/articles/sandbox/[slug]`
 * (files under `docs/articles/sandbox/`).
 */
const EXCLUDED_SLUGS = new Set([
  "00_ai-brief-why-movemental",
  "01_ai-vision-overview",
  "01_copy-deck-why-movemental",
  "02_individual-site-presentation",
  "03_platform-presentation",
  "07-ai-adoption-for-nonprofits-course-outline",
  "07-author-onboarding-course-outline",
  "08-ai-powered-fundraising-system-4-week-course-outline",
  "ai-governance-ethics-course-outline",
  "COURSE_STRATEGY",
  "HOW_MOVEMENTAL_USES_AI",
  "HOW_MOVEMENTAL_WORKS_VIDEO_SCRIPT",
  "LINKING-STRATEGY-EEAT-GEO-PLAYBOOK",
  "Thought Leader Platform Research Report",
  "UNIFORM-AND-DISTINCT-PLATFORM-GUIDE",
  "VIDEO_SCRIPT_MOVEMENTAL_COURSES_INTRO",
  "activation-workflow",
  "formation-workflow",
  "multiplication-workflow",
  "ai-integration-workflow",
  "nonprofit-content-build",
  "nonprofit-discovery-lab",
  "nonprofit-foundation-build",
  "nonprofit-fundraising-build",
  "nonprofit-governance-ethics-build",
  "credibility-how-it-works-video",
]);

export type TocEntry = {
  id: string;
  depth: 2 | 3;
  text: string;
};

/**
 * Summary (for cards, rails, continue-reading). Mirrors `Article` minus body/TOC.
 */
export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  /** Human-readable label (derived from `shape`). Back-compat with existing UI. */
  eyebrow: string;
  readTime: string;
  shape: ArticleShape;
  deck: string | null;
  author: string;
  publishedAt: string | null;
  updatedAt: string | null;
  audience: readonly Audience[];
  topics: readonly Topic[];
  featured: boolean;
  featuredInSection: boolean;
  canonSection: CanonSection | null;
  canonOrder: number | null;
  series: SeriesKey | null;
  seriesOrder: number | null;
};

export type Article = ArticleSummary & {
  body: string;
  toc: TocEntry[];
  relatedSlugs: readonly string[];
  canonicalUrl: string | null;
};

/** Archive chip categories — re-anchored on shape. */
export type ArticleArchiveCategory =
  | "all"
  | "canon"
  | "guides"
  | "playbooks"
  | "methodology"
  | "sandbox";

export type ArticleArchiveEntry = ArticleSummary & {
  /** File mtime for "newest / oldest" sort. */
  updatedAtMs: number;
  archiveCategory: Exclude<ArticleArchiveCategory, "all">;
};

export function articleArchiveCategory(
  shape: ArticleShape,
): Exclude<ArticleArchiveCategory, "all"> {
  if (shape === "canon") return "canon";
  if (shape === "guide") return "guides";
  if (shape === "playbook") return "playbooks";
  if (shape === "sandbox") return "sandbox";
  if (shape === "methodology" || shape === "field-guide" || shape === "case-study") {
    return "methodology";
  }
  // ai-note + story land in methodology bucket for now — the archive has a
  // coarse chip set by design. Individual pieces still carry their own shape.
  return "methodology";
}

/** Eyebrow label shown on cards & hero. Derived from shape for consistency. */
export function shapeEyebrow(shape: ArticleShape): string {
  switch (shape) {
    case "canon":
      return "Canon";
    case "guide":
      return "Guide";
    case "playbook":
      return "Playbook";
    case "field-guide":
      return "Field guide";
    case "case-study":
      return "Case study";
    case "methodology":
      return "Methodology";
    case "ai-note":
      return "AI note";
    case "sandbox":
      return "Sandbox";
    case "story":
      return "Essay";
    default: {
      const _exhaustive: never = shape;
      return String(_exhaustive);
    }
  }
}

/** Strip optional YAML frontmatter from the top of a markdown file. */
function splitFrontmatter(raw: string): { frontmatter: string | null; body: string } {
  const trimmed = raw.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---\n") && !trimmed.startsWith("---\r\n")) {
    return { frontmatter: null, body: trimmed };
  }
  const closing = trimmed.indexOf("\n---", 4);
  if (closing === -1) return { frontmatter: null, body: trimmed };
  return {
    frontmatter: trimmed.slice(4, closing),
    body: trimmed.slice(closing + 4).replace(/^\s+/, ""),
  };
}

/**
 * Minimal YAML-ish parser for the shapes our frontmatter actually uses.
 * See `scripts/validate-article-frontmatter.ts` for the superset.
 */
function parseFrontmatterBlock(block: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    const rawVal = m[2].trim();
    if (rawVal === "") {
      out[key] = "";
      continue;
    }
    if (rawVal === "true" || rawVal === "false") {
      out[key] = rawVal === "true";
      continue;
    }
    if (rawVal === "null" || rawVal === "~") {
      out[key] = null;
      continue;
    }
    if (/^-?\d+$/.test(rawVal)) {
      out[key] = Number.parseInt(rawVal, 10);
      continue;
    }
    if (/^-?\d+\.\d+$/.test(rawVal)) {
      out[key] = Number.parseFloat(rawVal);
      continue;
    }
    if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
      const items = rawVal
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) =>
          (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))
            ? s.slice(1, -1)
            : s,
        );
      out[key] = items;
      continue;
    }
    if (
      (rawVal.startsWith('"') && rawVal.endsWith('"')) ||
      (rawVal.startsWith("'") && rawVal.endsWith("'"))
    ) {
      out[key] = rawVal.slice(1, -1);
      continue;
    }
    out[key] = rawVal;
  }
  return out;
}

function humanize(slug: string): string {
  return slug
    .replace(/^\d+[-_]/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 240));
  return `${mins} min read`;
}

function extractToc(markdown: string): TocEntry[] {
  const lines = markdown.split("\n");
  const toc: TocEntry[] = [];
  const seenIds = new Set<string>();
  let inFence = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    const id = slugifyHeading(text);
    if (!id) continue;

    let unique = id;
    let n = 1;
    while (seenIds.has(unique)) {
      unique = `${id}-${n++}`;
    }
    seenIds.add(unique);
    toc.push({ id: unique, depth, text });
  }

  return toc;
}

function readArticleFile(slug: string): string {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  return fs.readFileSync(filePath, "utf-8");
}

function articleFilePath(slug: string): string {
  return path.join(ARTICLES_DIR, `${slug}.md`);
}

function listSandboxArticleSlugs(): string[] {
  const sandboxDir = path.join(ARTICLES_DIR, "sandbox");
  if (!fs.existsSync(sandboxDir)) return [];
  return fs
    .readdirSync(sandboxDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => `sandbox/${name.replace(/\.md$/, "")}`);
}

function parseArticle(slug: string, raw: string): Article {
  const { frontmatter, body: afterFront } = splitFrontmatter(raw);

  const rawFm = frontmatter ? parseFrontmatterBlock(frontmatter) : {};
  const parsed = articleFrontmatterSchema.safeParse(rawFm);
  const fm = parsed.success
    ? parsed.data
    : // Lenient fallback so a malformed single file does not crash the build;
      // the `pnpm articles:check` script is the strict gate.
      ({
        title: typeof rawFm.title === "string" ? (rawFm.title as string) : humanize(slug),
        shape: (slug.startsWith("sandbox/") ? "sandbox" : "story") as ArticleShape,
        author: "Movemental",
        audience: ["any"] as unknown as Audience[],
        topics: [] as unknown as Topic[],
        related_slugs: [] as string[],
        featured: false,
        featured_in_section: false,
      } satisfies Partial<Record<string, unknown>> as unknown as NonNullable<
        ReturnType<typeof articleFrontmatterSchema.safeParse>["data"]
      >);

  // H1 is the authoritative title if present; frontmatter is the fallback.
  const h1Match = afterFront.match(/^#\s+(.+?)\s*#*\s*$/m);
  const title = h1Match ? h1Match[1].trim() : fm.title;
  let body = h1Match ? afterFront.replace(h1Match[0], "") : afterFront;
  body = body.replace(/^\s*---+\s*\n/, "").trimStart();

  const firstParagraph = body
    .split(/\n\s*\n/)
    .find(
      (block) =>
        block &&
        !block.startsWith("#") &&
        !block.startsWith(">") &&
        !block.startsWith("-") &&
        !block.startsWith("*") &&
        !/^\d+\./.test(block),
    );
  const excerpt = firstParagraph
    ? firstParagraph
        .replace(/\s+/g, " ")
        .replace(/[*_`[\]]/g, "")
        .trim()
        .slice(0, 260)
    : "";

  const toc = extractToc(body);
  const readTime = estimateReadTime(body);
  const shape: ArticleShape = ARTICLE_SHAPES.includes(fm.shape as ArticleShape)
    ? (fm.shape as ArticleShape)
    : slug.startsWith("sandbox/")
      ? "sandbox"
      : "story";

  return {
    slug,
    title,
    eyebrow: shapeEyebrow(shape),
    shape,
    deck: fm.deck ?? null,
    author: fm.author ?? "Movemental",
    publishedAt: fm.published_at ?? null,
    updatedAt: fm.updated_at ?? null,
    audience: (fm.audience ?? ["any"]) as readonly Audience[],
    topics: (fm.topics ?? []) as readonly Topic[],
    featured: fm.featured ?? false,
    featuredInSection: fm.featured_in_section ?? false,
    canonSection: (fm.canon_section ?? null) as CanonSection | null,
    canonOrder: fm.canon_order ?? null,
    series: (fm.series ?? null) as SeriesKey | null,
    seriesOrder: fm.series_order ?? null,
    relatedSlugs: (fm.related_slugs ?? []) as readonly string[],
    canonicalUrl: fm.canonical_url ?? null,
    excerpt,
    body,
    toc,
    readTime,
  };
}

/** All publishable article slugs, discovered from the filesystem at build time. */
export function listArticleSlugs(): string[] {
  const rootSlugs = fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .map((name) => name.replace(/\.md$/, ""));
  const nestedSlugs = listSandboxArticleSlugs();
  return [...rootSlugs, ...nestedSlugs].filter((slug) => !EXCLUDED_SLUGS.has(slug)).sort();
}

function toSummary(article: Article): ArticleSummary {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    eyebrow: article.eyebrow,
    readTime: article.readTime,
    shape: article.shape,
    deck: article.deck,
    author: article.author,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    audience: article.audience,
    topics: article.topics,
    featured: article.featured,
    featuredInSection: article.featuredInSection,
    canonSection: article.canonSection,
    canonOrder: article.canonOrder,
    series: article.series,
    seriesOrder: article.seriesOrder,
  };
}

/**
 * Cached parse — reads and parses every publishable file once per process.
 */
let _cache: { articles: Article[]; loaded: boolean } = { articles: [], loaded: false };

function loadAll(): Article[] {
  if (_cache.loaded) return _cache.articles;
  const out: Article[] = [];
  for (const slug of listArticleSlugs()) {
    try {
      out.push(parseArticle(slug, readArticleFile(slug)));
    } catch {
      // skip unreadable files silently — the validator surfaces them
    }
  }
  _cache = { articles: out, loaded: true };
  return out;
}

/** Full articles (body + TOC). Used by collection helpers. */
export function listArticlesFull(): Article[] {
  return loadAll();
}

/** Summaries for the library / continue-reading cards. */
export function listArticles(): ArticleSummary[] {
  return loadAll().map(toSummary);
}

/** Summaries plus archive metadata (mtime, chip category). */
export function listArticlesForArchive(): ArticleArchiveEntry[] {
  return loadAll().map((article) => {
    const stat = fs.statSync(articleFilePath(article.slug));
    return {
      ...toSummary(article),
      updatedAtMs: stat.mtimeMs,
      archiveCategory: articleArchiveCategory(article.shape),
    };
  });
}

/** Full article (body + TOC). Returns null when the slug is excluded or missing. */
export function getArticle(slug: string): Article | null {
  if (EXCLUDED_SLUGS.has(slug)) return null;
  try {
    return parseArticle(slug, readArticleFile(slug));
  } catch {
    return null;
  }
}

export function toArticleSummary(article: Article): ArticleSummary {
  return toSummary(article);
}
