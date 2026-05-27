#!/usr/bin/env node
/**
 * Fetch book cover images from Open Library (by ISBN or title/author search)
 * and save as .jpg under ../books/. Run from directories/images/scripts/.
 * Then run: node convert-to-webp.js --keep  (to add .webp alongside).
 *
 * Usage: node fetch-book-covers.js [--dry]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_ROOT = path.resolve(__dirname, "..");
const BOOKS_DIR = path.join(IMAGES_ROOT, "books");
const CONFIG_PATH = path.join(__dirname, "book-covers-config.json");
const DRY = process.argv.includes("--dry");
const MISSING_ONLY = process.argv.includes("--missing-only");
const RATE_MS = 1600;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchByIsbn(isbn) {
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

async function searchOpenLibrary(title, author) {
  const params = new URLSearchParams({
    title: title.replace(/:.*$/, "").trim(),
    author: author || "",
    limit: "1",
    fields: "cover_i,title,author_name",
  });
  const url = `https://openlibrary.org/search.json?${params}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const doc = data.docs && data.docs[0];
  if (!doc || doc.cover_i == null) return null;
  const coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
  const coverRes = await fetch(coverUrl);
  if (!coverRes.ok) return null;
  return Buffer.from(await coverRes.arrayBuffer());
}

async function fetchCover(entry) {
  if (entry.isbn) {
    return fetchByIsbn(entry.isbn);
  }
  if (entry.title) {
    return searchOpenLibrary(entry.title, entry.author || "");
  }
  return null;
}

async function main() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error("Missing", CONFIG_PATH);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  const books = config.books || [];
  const aliases = config.aliases || [];

  if (!DRY && !fs.existsSync(BOOKS_DIR)) {
    fs.mkdirSync(BOOKS_DIR, { recursive: true });
    console.log("Created", path.relative(IMAGES_ROOT, BOOKS_DIR));
  }

  const seen = new Set();
  for (const entry of books) {
    const outBase = entry.out;
    if (!outBase) continue;
    const outPath = path.join(BOOKS_DIR, `${outBase}.jpg`);
    if (seen.has(outBase)) continue;
    seen.add(outBase);
    if (MISSING_ONLY && fs.existsSync(outPath)) {
      console.log("Have", outBase);
      continue;
    }

    if (DRY) {
      console.log("[dry] would fetch ->", path.relative(IMAGES_ROOT, outPath));
      await sleep(100);
      continue;
    }

    const buf = await fetchCover(entry);
    await sleep(RATE_MS);
    if (!buf || buf.length < 500) {
      console.warn("Skip (no cover):", outBase);
      continue;
    }
    fs.writeFileSync(outPath, buf);
    console.log("OK", path.relative(IMAGES_ROOT, outPath));
  }

  for (const { from: fromBase, to: toBase } of aliases) {
    const fromPath = path.join(BOOKS_DIR, `${fromBase}.jpg`);
    const toPath = path.join(BOOKS_DIR, `${toBase}.jpg`);
    if (DRY) {
      console.log("[dry] would alias", fromBase, "->", toBase);
      continue;
    }
    if (!fs.existsSync(fromPath)) {
      console.warn("Alias skip (missing source):", fromBase, "->", toBase);
      continue;
    }
    fs.copyFileSync(fromPath, toPath);
    console.log("Alias", toBase, "<-", fromBase);
  }

  console.log("Done. Run: node convert-to-webp.js --keep");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
