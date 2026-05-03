/**
 * Book content pipeline — server-only.
 *
 * Reads manuscript markdown from disk at build/RSC time.
 * Client components should import from `@/lib/book-types` instead.
 */
import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { BOOK_SPINE, bookParts } from "./book-types";
import type { Chapter, Paragraph } from "./book-types";

// Re-export everything from book-types for server consumers
export * from "./book-types";

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                   */
/* ------------------------------------------------------------------ */

function getPartForChapter(num: number): { partNumber: number; partTitle: string } {
  for (const part of bookParts) {
    if (part.chapters.includes(num)) {
      return { partNumber: part.number, partTitle: part.title };
    }
  }
  return { partNumber: 0, partTitle: "" };
}

const MANUSCRIPT_DIR = join(
  process.cwd(),
  "docs/book-development/fragmentation-manuscript-ordered"
);

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match
    ? match[1]
        .replace(/^(Chapter \d+\s*[:\u2014]\s*|Preface\s*[:\u2014]\s*|Coda\s*[:\u2014]\s*)/i, "")
        .replace(/\*+([^*]+)\*+/g, "$1") // strip markdown bold/italic
    : "Untitled";
}

function stripTitle(markdown: string): string {
  return markdown.replace(/^#\s+.+\n*/, "");
}

function splitParagraphs(body: string): Paragraph[] {
  const blocks = body.split(/\n{2,}/).filter((b) => b.trim().length > 0);
  return blocks.map((text, index) => ({
    id: `p-${index}`,
    text: text.trim(),
    index,
  }));
}

function loadLiveChapter(
  entry: (typeof BOOK_SPINE)[number],
  raw: string
): Omit<Chapter, "publicationStatus"> {
  const title = extractTitle(raw);
  const body = stripTitle(raw);
  const paragraphs = splitParagraphs(body);
  const wordCount = body.trim().length ? body.split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 250));
  const { partNumber, partTitle } = getPartForChapter(entry.number);

  return {
    number: entry.number,
    slug: entry.slug,
    title,
    chapterKind: entry.chapterKind,
    partNumber,
    partTitle,
    body,
    paragraphs,
    wordCount,
    readingTime,
  };
}

function buildComingSoonChapter(entry: (typeof BOOK_SPINE)[number]): Chapter {
  const { partNumber, partTitle } = getPartForChapter(entry.number);
  return {
    number: entry.number,
    slug: entry.slug,
    title: entry.plannedTitle,
    chapterKind: entry.chapterKind,
    partNumber,
    partTitle,
    body: "",
    paragraphs: [],
    wordCount: 0,
    readingTime: 0,
    publicationStatus: "coming_soon",
  };
}

/* ------------------------------------------------------------------ */
/*  Core loaders (called at build time / RSC time)                     */
/* ------------------------------------------------------------------ */

let chapterCache: Chapter[] | null = null;

export function getAllChapters(): Chapter[] {
  if (chapterCache) return chapterCache;

  chapterCache = BOOK_SPINE.map((entry) => {
    const filename = `${entry.filePrefix}-${entry.slug}.md`;
    const path = join(MANUSCRIPT_DIR, filename);
    if (!existsSync(path)) {
      return buildComingSoonChapter(entry);
    }
    const raw = readFileSync(path, "utf-8");
    return {
      ...loadLiveChapter(entry, raw),
      publicationStatus: "live" as const,
    };
  });

  return chapterCache;
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return getAllChapters().find((c) => c.slug === slug);
}

export function getChapterSlugs(): string[] {
  return getAllChapters().map((c) => c.slug);
}

export function getAdjacentChapters(slug: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getAllChapters();
  const idx = chapters.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? chapters[idx - 1]! : null,
    next: idx < chapters.length - 1 && idx >= 0 ? chapters[idx + 1]! : null,
  };
}

/** Published units only (for read time / word stats on landing). */
export function getLiveChapters(): Chapter[] {
  return getAllChapters().filter((c) => c.publicationStatus === "live");
}
