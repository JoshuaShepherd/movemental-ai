import type {
  ArticleShape,
  Audience,
  CanonSection,
  SeriesKey,
  Topic,
} from "@/lib/articles-schema";
import {
  type Article,
  type ArticleSummary,
  listArticlesFull,
  toArticleSummary,
} from "@/lib/articles";

/**
 * Pure, React-free collection helpers built on top of the parsed article list.
 * Route files consume these to render the new surfaces under `/articles/*`.
 */

function byCanonOrder(a: Article, b: Article): number {
  return (a.canonOrder ?? 0) - (b.canonOrder ?? 0);
}

function bySeriesOrder(a: Article, b: Article): number {
  return (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0);
}

function byPublishedDescending(a: Article, b: Article): number {
  const av = a.publishedAt ? Date.parse(a.publishedAt) : 0;
  const bv = b.publishedAt ? Date.parse(b.publishedAt) : 0;
  if (av !== bv) return bv - av;
  return a.title.localeCompare(b.title);
}

export function listByShape(shape: ArticleShape): ArticleSummary[] {
  return listArticlesFull()
    .filter((a) => a.shape === shape)
    .sort(byPublishedDescending)
    .map(toArticleSummary);
}

export function listCanonOrdered(): Article[] {
  return listArticlesFull()
    .filter((a) => a.shape === "canon" && a.canonOrder != null)
    .sort(byCanonOrder);
}

export function listBySection(section: CanonSection): Article[] {
  return listCanonOrdered().filter((a) => a.canonSection === section);
}

export const CANON_SECTIONS_ORDER: readonly CanonSection[] = [
  "moment",
  "problem",
  "path",
  "future",
  "synthesis",
] as const;

export const CANON_SECTION_META: Record<CanonSection, { title: string; deck: string }> = {
  moment: {
    title: "The moment",
    deck: "Disorientation is not a personal failure, it is the correct response to a generational rupture.",
  },
  problem: {
    title: "The problem",
    deck: "Fragmentation, signal collapse, and the death of isolated work. Why the old tools stopped working.",
  },
  path: {
    title: "The path",
    deck: "Safety → Sandbox → Training → Tech. The sequence is the framework.",
  },
  future: {
    title: "The future",
    deck: "What it feels like on the other side, coherent leadership, compounding work, movement.",
  },
  synthesis: {
    title: "Synthesis",
    deck: "The full argument in one sitting.",
  },
};

export function listGuides(): Article[] {
  const guides = listArticlesFull().filter((a) => a.shape === "guide");
  return guides.sort((a, b) => {
    if (a.series && b.series && a.series === b.series) return bySeriesOrder(a, b);
    if (a.series && !b.series) return -1;
    if (!a.series && b.series) return 1;
    return byPublishedDescending(a, b);
  });
}

export function listPlaybooks(): Article[] {
  return listArticlesFull()
    .filter((a) => a.shape === "playbook")
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function listFieldGuides(): Article[] {
  return listArticlesFull().filter((a) => a.shape === "field-guide");
}

export function listCaseStudies(): Article[] {
  return listArticlesFull().filter((a) => a.shape === "case-study");
}

export function listMethodology(): Article[] {
  return listArticlesFull().filter((a) => a.shape === "methodology");
}

export function listAiNotes(): Article[] {
  return listArticlesFull().filter((a) => a.shape === "ai-note");
}

export function listMethodologyAndEvidence(): Article[] {
  return listArticlesFull()
    .filter((a) => a.shape === "methodology" || a.shape === "field-guide" || a.shape === "case-study")
    .sort((a, b) => {
      if (a.shape === b.shape) return byPublishedDescending(a, b);
      const order: ArticleShape[] = ["methodology", "case-study", "field-guide"];
      return order.indexOf(a.shape) - order.indexOf(b.shape);
    });
}

export function listSeriesArticles(series: SeriesKey): Article[] {
  return listArticlesFull()
    .filter((a) => a.series === series)
    .sort(bySeriesOrder);
}

export function listByTopic(topic: Topic): Article[] {
  return listArticlesFull()
    .filter((a) => a.topics.includes(topic))
    .sort(byPublishedDescending);
}

export function listByAudience(audience: Audience): Article[] {
  return listArticlesFull()
    .filter((a) => a.audience.includes(audience))
    .sort(byPublishedDescending);
}

export function listFeatured(): Article[] {
  return listArticlesFull()
    .filter((a) => a.featured)
    .sort(byPublishedDescending);
}

export function adjacentCanon(slug: string): { prev: Article | null; next: Article | null } {
  const canon = listCanonOrdered();
  const idx = canon.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? canon[idx - 1] : null,
    next: idx < canon.length - 1 ? canon[idx + 1] : null,
  };
}

export function adjacentSeries(slug: string): { prev: Article | null; next: Article | null } {
  const article = listArticlesFull().find((a) => a.slug === slug);
  if (!article?.series) return { prev: null, next: null };
  const ordered = listSeriesArticles(article.series);
  const idx = ordered.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? ordered[idx - 1] : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}

/**
 * Intent-driven related summaries. Respects authorial `related_slugs`, then
 * series neighbors, then topic overlap within the same shape.
 */
export function buildRelatedSummariesFor(slug: string, limit = 3): ArticleSummary[] {
  const all = listArticlesFull();
  const article = all.find((a) => a.slug === slug);
  if (!article) return [];

  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const out: Article[] = [];
  const seen = new Set<string>([slug]);

  // 1. Authorial override
  for (const rel of article.relatedSlugs) {
    if (seen.has(rel)) continue;
    const match = bySlug.get(rel);
    if (match) {
      out.push(match);
      seen.add(rel);
      if (out.length >= limit) return out.map(toArticleSummary);
    }
  }

  // 2. Canon adjacency
  if (article.shape === "canon") {
    const canon = listCanonOrdered();
    for (const candidate of canon) {
      if (seen.has(candidate.slug)) continue;
      if (candidate.canonSection === article.canonSection) {
        out.push(candidate);
        seen.add(candidate.slug);
        if (out.length >= limit) return out.map(toArticleSummary);
      }
    }
  }

  // 3. Series neighbors
  if (article.series) {
    for (const candidate of listSeriesArticles(article.series)) {
      if (seen.has(candidate.slug)) continue;
      out.push(candidate);
      seen.add(candidate.slug);
      if (out.length >= limit) return out.map(toArticleSummary);
    }
  }

  // 4. Same shape + topic overlap
  const topicSet = new Set(article.topics);
  const sameShape = all.filter(
    (a) => a.shape === article.shape && !seen.has(a.slug),
  );
  const scored = sameShape
    .map((a) => {
      const overlap = a.topics.filter((t) => topicSet.has(t)).length;
      return { a, overlap };
    })
    .filter((row) => row.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);
  for (const row of scored) {
    out.push(row.a);
    seen.add(row.a.slug);
    if (out.length >= limit) return out.map(toArticleSummary);
  }

  // 5. Fallback — same shape, newest first (excluding sandbox/canon cross-pollution)
  for (const candidate of sameShape) {
    if (seen.has(candidate.slug)) continue;
    out.push(candidate);
    seen.add(candidate.slug);
    if (out.length >= limit) return out.map(toArticleSummary);
  }

  return out.map(toArticleSummary);
}

export const SERIES_META: Record<SeriesKey, { title: string; deck: string }> = {
  fragmentation: {
    title: "Fragmentation",
    deck: "Where fragmentation actually lives, what it costs, and how to begin reassembling a body of work.",
  },
  "content-strategy": {
    title: "Content strategy",
    deck: "A six-piece sequence for movement leaders, from strategy to evergreen architecture to the Christocentric spine.",
  },
  sandbox: {
    title: "Sandbox curriculum",
    deck: "Nine pieces that form the public argument behind the Sandbox Season.",
  },
  ssss: {
    title: "The Movemental Path",
    deck: "Safety, Sandbox, Training, Tech: the core public methodology.",
  },
  "two-intelligences": {
    title: "Two intelligences",
    deck: "Relational and artificial, how they integrate inside a mission-driven organization.",
  },
  "ai-governance": {
    title: "AI governance",
    deck: "What safety, review, and explicit boundaries look like in practice.",
  },
};

export const TOPIC_META: Record<Topic, { title: string; deck: string }> = {
  fragmentation: { title: "Fragmentation", deck: "Work exists but does not connect." },
  ssss: { title: "Movemental Path", deck: "Safety, Sandbox, Training, Tech." },
  integrity: { title: "Integrity", deck: "Structural coherence between what you say, what you ship, and who you are." },
  signal: { title: "Signal", deck: "Why real expertise is becoming invisible, and what still reads as credible." },
  formation: { title: "Formation", deck: "What skill becomes once it's judgment." },
  sandbox: { title: "Sandbox", deck: "Structured exploration as the input to real learning." },
  multiplication: { title: "Multiplication", deck: "When work begins to move." },
  "dual-intelligence": { title: "Dual intelligence", deck: "Relational + artificial, integrated honestly." },
  "ai-posture": { title: "AI stance", deck: "How serious leaders hold themselves inside an AI-saturated decade." },
  "ai-credibility": { title: "AI & credibility", deck: "Trust in an age where surface can be generated." },
  "ai-governance": { title: "AI governance", deck: "Explicit boundaries, review loops, and leadership ownership." },
  "content-strategy": { title: "Content strategy", deck: "A body of work that compounds, not scattered output." },
};
