import { z } from "zod";

/**
 * Canonical frontmatter contract for long-form articles under `docs/articles/`.
 * Changes here ripple to: the FS loader (`src/lib/articles.ts`), the inventory
 * (`docs/articles/_inventory.md`), and the validator (`scripts/validate-article-frontmatter.ts`).
 */

export const ARTICLE_SHAPES = [
  "canon",
  "guide",
  "playbook",
  "field-guide",
  "case-study",
  "methodology",
  "ai-note",
  "sandbox",
  "story",
] as const;
export type ArticleShape = (typeof ARTICLE_SHAPES)[number];

export const CANON_SECTIONS = ["moment", "problem", "path", "future", "synthesis"] as const;
export type CanonSection = (typeof CANON_SECTIONS)[number];

export const AUDIENCES = ["leader", "nonprofit", "church", "institution", "seminary", "any"] as const;
export type Audience = (typeof AUDIENCES)[number];

export const TOPICS = [
  "fragmentation",
  "ssss",
  "integrity",
  "signal",
  "formation",
  "sandbox",
  "multiplication",
  "dual-intelligence",
  "ai-posture",
  "ai-credibility",
  "ai-governance",
  "content-strategy",
] as const;
export type Topic = (typeof TOPICS)[number];

export const SERIES_KEYS = [
  "fragmentation",
  "content-strategy",
  "sandbox",
  "ssss",
  "two-intelligences",
  "ai-governance",
] as const;
export type SeriesKey = (typeof SERIES_KEYS)[number];

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be YYYY-MM-DD");

export const articleFrontmatterSchema = z
  .object({
    title: z.string().min(4),
    slug: z.string().min(2).optional(),
    shape: z.enum(ARTICLE_SHAPES),
    deck: z.string().min(10).max(280).optional(),
    author: z.string().min(2).default("Movemental"),
    published_at: isoDate.optional(),
    updated_at: isoDate.optional(),
    audience: z.array(z.enum(AUDIENCES)).default(["any"]),
    topics: z.array(z.enum(TOPICS)).default([]),
    related_slugs: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    featured_in_section: z.boolean().default(false),
    canonical_url: z.string().url().nullable().optional(),
    canon_section: z.enum(CANON_SECTIONS).optional(),
    canon_order: z.number().int().min(1).max(99).optional(),
    series: z.enum(SERIES_KEYS).optional(),
    series_order: z.number().int().min(1).max(99).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.shape === "canon") {
      if (!val.canon_section) {
        ctx.addIssue({
          code: "custom",
          path: ["canon_section"],
          message: "canon pieces require canon_section",
        });
      }
      if (val.canon_order == null) {
        ctx.addIssue({
          code: "custom",
          path: ["canon_order"],
          message: "canon pieces require canon_order",
        });
      }
    }
    if (val.series && val.series_order == null) {
      ctx.addIssue({
        code: "custom",
        path: ["series_order"],
        message: "series pieces require series_order",
      });
    }
  });

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
