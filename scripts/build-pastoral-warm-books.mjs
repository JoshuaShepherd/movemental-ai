#!/usr/bin/env node
/**
 * Build pastoral-warm book content from _docs/themes-content/mdx.
 * Compiles each book's MDX sections to HTML and writes:
 *   - public/templates/library/pastoral-warm/content/books/<bookSlug>/<sectionSlug>.html
 *   - public/templates/library/pastoral-warm/content/books/manifest.json
 *
 * Run from repo root: node scripts/build-pastoral-warm-books.mjs
 * Or: npm run template:build-pastoral-warm-books
 *
 * Pastoral-warm only. Uses remark + remark-html (markdown → HTML); MDX-specific
 * syntax (e.g. JSX) may appear as raw text in output.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { remark } from "remark";
import htmlPlugin from "remark-html";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MDX_ROOT = path.join(ROOT, "_docs", "themes-content", "mdx");
const OUT_ROOT = path.join(
  ROOT,
  "public",
  "templates",
  "library",
  "pastoral-warm",
  "content",
  "books"
);

async function markdownToHtml(markdown) {
  const result = await remark().use(htmlPlugin).process(markdown);
  return String(result);
}

function sectionSlugFromFile(filename) {
  if (!filename || !filename.endsWith(".mdx")) return null;
  return path.basename(filename, ".mdx").replace(/^\d+-/, "") || path.basename(filename, ".mdx");
}

async function buildBook(bookDirName) {
  const bookJsonPath = path.join(MDX_ROOT, bookDirName, "book.json");
  if (!fs.existsSync(bookJsonPath)) return null;
  let bookMeta;
  try {
    bookMeta = JSON.parse(fs.readFileSync(bookJsonPath, "utf8"));
  } catch (e) {
    console.warn("Skip (invalid book.json):", bookDirName, e.message);
    return null;
  }
  const slug = bookMeta.slug || bookDirName;
  const sections = bookMeta.sections || [];
  const manifestEntry = {
    slug,
    title: bookMeta.title || bookDirName,
    author: bookMeta.author || "Alan Hirsch",
    sections: [],
  };
  const outBookDir = path.join(OUT_ROOT, slug);
  fs.mkdirSync(outBookDir, { recursive: true });

  for (const section of sections) {
    const file = section.file;
    if (!file) continue;
    const sectionSlug = section.slug || sectionSlugFromFile(file) || file.replace(/\.mdx$/, "");
    const mdxPath = path.join(MDX_ROOT, bookDirName, file);
    if (!fs.existsSync(mdxPath)) {
      console.warn("Missing file:", mdxPath);
      manifestEntry.sections.push({
        slug: sectionSlug,
        title: section.title || sectionSlug,
        type: section.type || "chapter",
        order: section.order ?? 0,
      });
      continue;
    }
    const raw = fs.readFileSync(mdxPath, "utf8");
    const { content: markdown } = matter(raw);
    const sectionHtml = await markdownToHtml(markdown || "");
    const outPath = path.join(outBookDir, sectionSlug + ".html");
    fs.writeFileSync(outPath, sectionHtml, "utf8");
    manifestEntry.sections.push({
      slug: sectionSlug,
      title: section.title || sectionSlug,
      type: section.type || "chapter",
      order: section.order ?? 0,
    });
  }

  return manifestEntry;
}

async function main() {
  if (!fs.existsSync(MDX_ROOT)) {
    console.error("MDX root not found:", MDX_ROOT);
    process.exit(1);
  }
  fs.mkdirSync(OUT_ROOT, { recursive: true });

  const dirs = fs.readdirSync(MDX_ROOT, { withFileTypes: true });
  const books = [];
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const entry = await buildBook(d.name);
    if (entry) books.push(entry);
  }

  const manifest = { books };
  const manifestPath = path.join(OUT_ROOT, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Wrote", manifestPath);
  console.log("Books:", books.length);
  books.forEach((b) => console.log("  -", b.slug, "(" + b.sections.length + " sections)"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
