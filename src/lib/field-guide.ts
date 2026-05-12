import "server-only";

import fs from "node:fs";
import path from "node:path";

import { slugifyHeading } from "@/lib/slugify-heading";

export type FieldGuideTocEntry = {
  id: string;
  depth: 2 | 3;
  text: string;
};

export type FieldGuideContent = {
  slug: string;
  title: string;
  subtitle: string;
  authors: string[];
  version: string;
  date: string;
  publisher: string;
  description: string;
  body: string;
  toc: FieldGuideTocEntry[];
};

const CONTENT_DIR = path.join(process.cwd(), "src/content/field-guide");

function splitFrontmatter(raw: string): { frontmatter: string; body: string } {
  if (!raw.startsWith("---")) {
    return { frontmatter: "", body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { frontmatter: "", body: raw };
  }
  const frontmatter = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  return { frontmatter, body };
}

function parseFrontmatter(block: string): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  const lines = block.split(/\r?\n/);
  let currentListKey: string | null = null;
  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");
    if (!line.trim()) {
      currentListKey = null;
      continue;
    }
    const listMatch = /^\s+-\s+(.+)$/.exec(line);
    if (listMatch && currentListKey) {
      const value = listMatch[1].trim().replace(/^["']|["']$/g, "");
      const existing = out[currentListKey];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        out[currentListKey] = [value];
      }
      continue;
    }
    const kvMatch = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!kvMatch) {
      currentListKey = null;
      continue;
    }
    const [, key, rawValue] = kvMatch;
    const value = rawValue.trim();
    if (!value) {
      out[key] = [];
      currentListKey = key;
      continue;
    }
    out[key] = value.replace(/^["']|["']$/g, "");
    currentListKey = null;
  }
  return out;
}

function extractToc(markdown: string): FieldGuideTocEntry[] {
  const lines = markdown.split("\n");
  const toc: FieldGuideTocEntry[] = [];
  const seen = new Set<string>();
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
    while (seen.has(unique)) {
      unique = `${id}-${n++}`;
    }
    seen.add(unique);
    toc.push({ id: unique, depth, text });
  }
  return toc;
}

function asString(value: string | string[] | undefined, fallback = ""): string {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

function asArray(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

export function getFieldGuide(slug: string): FieldGuideContent {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const fm = parseFrontmatter(frontmatter);

  return {
    slug,
    title: asString(fm.title, "Field Guide"),
    subtitle: asString(fm.subtitle, ""),
    authors: asArray(fm.authors),
    version: asString(fm.version, "1.0"),
    date: asString(fm.date, ""),
    publisher: asString(fm.publisher, "Movemental"),
    description: asString(fm.description, ""),
    body,
    toc: extractToc(body),
  };
}
