#!/usr/bin/env node
/**
 * Remove em dashes from user-facing site copy.
 * Skips code comments; applies context-aware replacements in strings and markdown.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const EXTENSIONS = ["ts", "tsx", "md", "json"];
const SKIP_PATTERNS = [
  "**/node_modules/**",
  "**/*.test.ts",
  "**/README.md",
  "**/schema.ts",
  "**/program/fixtures/**",
];

function isCommentLine(line) {
  const t = line.trimStart();
  return (
    t.startsWith("//") ||
    t.startsWith("*") ||
    t.startsWith("/**") ||
    t.startsWith("*/")
  );
}

function replaceEmDashInText(text) {
  text = text.replace(/^(\s*)—\s+/gm, "$1");
  text = text.replace(/>(\s*)—\s+/g, ">$1");
  text = text.replace(/\s—\sMovemental/g, " | Movemental");

  text = text.replace(/([a-z])—([a-z])/gi, (_, a, b) =>
    b === b.toUpperCase() ? `${a}. ${b}` : `${a}, ${b}`,
  );

  for (let i = 0; i < 5; i++) {
    text = text.replace(/(\S)\s—\s([a-z])/g, (_, before, after) => `${before}, ${after}`);
    text = text.replace(/(\S)\s—\s([A-Z])/g, (_, before, after) => {
      if (/[\)"']$/.test(before)) return `${before}, ${after}`;
      if (before.length < 40 && !/[.!?]$/.test(before)) return `${before}: ${after}`;
      return `${before}. ${after}`;
    });
  }

  text = text.replace(/^(\s*)—(\s*)$/gm, "$1·$2");
  text = text.replace(/>(\s*)—(\s*)</g, ">$1·$2<");
  text = text.replace(/\s—\s/g, ", ");
  text = text.replace(/—/g, ", ");
  return text;
}

function processLine(line) {
  if (
    isCommentLine(line) &&
    !line.includes('"') &&
    !line.includes("'") &&
    !line.includes("`") &&
    !/>[^<{]+</.test(line)
  ) {
    return line;
  }

  if (/^\s*>[^<{]+</.test(line.trim())) {
    return replaceEmDashInText(line);
  }

  return line.replace(
    /(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|>[^<{]+<)/g,
    (segment) => (segment.includes("—") ? replaceEmDashInText(segment) : segment),
  );
}

function processMarkdown(content) {
  return content
    .split("\n")
    .map((line) => (line.includes("—") ? replaceEmDashInText(line) : line))
    .join("\n");
}

function processFile(filePath) {
  let content = readFileSync(filePath, "utf8");
  const original = content;

  if (filePath.endsWith(".md")) {
    content = processMarkdown(content);
  } else if (filePath.endsWith(".tsx")) {
    content = content
      .split("\n")
      .map((line) => {
        if (!line.includes("—")) return line;
        if (isCommentLine(line)) return line;
        return replaceEmDashInText(line);
      })
      .join("\n");
    if (content.includes("—")) {
      content = content.replace(/`([^`]*?)`/gs, (block) =>
        block.includes("—") ? replaceEmDashInText(block) : block,
      );
    }
  } else {
    content = content
      .split("\n")
      .map((line) => (line.includes("—") ? processLine(line) : line))
      .join("\n");
    if (content.includes("—")) {
      content = content.replace(/`([^`]*?)`/gs, (block) =>
        block.includes("—") ? replaceEmDashInText(block) : block,
      );
    }
  }

  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    return true;
  }
  return false;
}

function shouldSkip(filePath) {
  return SKIP_PATTERNS.some((pattern) => {
    const needle = pattern.replace(/\*\*\//g, "").replace(/\*\*/g, "");
    return filePath.includes(needle);
  });
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (shouldSkip(full)) continue;
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (EXTENSIONS.some((ext) => full.endsWith(`.${ext}`))) out.push(full);
  }
  return out;
}

const files = walk("src");

let changed = 0;
for (const file of files) {
  if (processFile(file)) {
    changed++;
    console.log("fixed:", file);
  }
}

console.log(`\nUpdated ${changed} files.`);
