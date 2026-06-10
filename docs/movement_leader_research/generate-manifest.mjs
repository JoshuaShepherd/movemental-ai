#!/usr/bin/env node
/**
 * Scans this directory for *.md and writes manifest.json for the local reader.
 * Run: node generate-manifest.mjs
 *
 * Path rules:
 * - Files under `_onboarded_leaders/<slug>/…` use that slug in the manifest
 *   but keep the full fetch path so reader.js can load them over HTTP.
 * - When the same logical doc exists at both `<slug>/…` and
 *   `_onboarded_leaders/<slug>/…`, the onboarded copy wins.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

const ONBOARDED_PREFIX = "_onboarded_leaders/";
const SKIP_DIR_NAMES = new Set(["node_modules", ".git"]);

const SPECIAL_LEADER_NAMES = {
  __root__: "Root & misc",
  audience: "Audience",
  network: "Network",
  "tam-search": "TAM / field map",
  "alan-mcwilliam": "Alan McWilliam",
  "aj-swoboda": "A. J. Swoboda",
};

function titleCaseFolder(segment) {
  if (!segment) return "Overview & index";
  if (segment === "digital-presence") return "Digital presence";
  if (segment === "content-marketing-playbook") return "Content & marketing";
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function slugToLeaderName(slug) {
  if (SPECIAL_LEADER_NAMES[slug]) return SPECIAL_LEADER_NAMES[slug];
  const parts = slug.split("-");
  const out = [];
  for (const p of parts) {
    if (p === "jr" || p === "sr") {
      out.push(p.toUpperCase() + ".");
      continue;
    }
    if (/^i+$/i.test(p) && p.length <= 4) {
      out.push(p.toUpperCase().replace(/I/g, "I"));
      continue;
    }
    if (p === "iii" || p === "ii" || p === "iv") {
      out.push(p.toUpperCase());
      continue;
    }
    out.push(p.charAt(0).toUpperCase() + p.slice(1));
  }
  return out.join(" ");
}

function shouldSkipDir(name, baseRel) {
  if (name.startsWith(".") || SKIP_DIR_NAMES.has(name)) return true;
  // Skip staff-only subtrees inside leader folders.
  if (name === "_staff" || name === "_misc") return true;
  return false;
}

function walkMarkdown(dir, baseRel, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (shouldSkipDir(e.name, baseRel)) continue;
    const full = path.join(dir, e.name);
    const rel = baseRel ? `${baseRel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      walkMarkdown(full, rel, out);
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".md")) {
      out.push(rel);
    }
  }
}

/** Resolve leader slug + canonical logical path vs HTTP fetch path. */
function resolvePathParts(rel) {
  const norm = rel.replace(/\\/g, "/");
  if (norm.startsWith(ONBOARDED_PREFIX)) {
    const logical = norm.slice(ONBOARDED_PREFIX.length);
    const slug = logical.split("/")[0] ?? logical;
    return { fetchPath: norm, logicalPath: logical, slug, isOnboarded: true };
  }
  if (!norm.includes("/")) {
    return { fetchPath: norm, logicalPath: norm, slug: "__root__", isOnboarded: false };
  }
  const slug = norm.split("/")[0];
  return { fetchPath: norm, logicalPath: norm, slug, isOnboarded: false };
}

function pathToDoc(rel) {
  const { fetchPath, logicalPath, slug } = resolvePathParts(rel);
  const parts = logicalPath.split("/");
  const file = parts[parts.length - 1];
  const base = file.replace(/\.md$/i, "");
  const subParts = slug === "__root__" ? [] : parts.slice(1, -1);
  const groupKey = subParts.length ? subParts[0] : "";
  const group = titleCaseFolder(groupKey);
  const rest = subParts.slice(1);
  const subLabel = rest.length ? rest.map(titleCaseFolder).join(" · ") : "";

  const title = base
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const logicalId = logicalPath.replace(/\.md$/i, "");

  return {
    id: logicalId,
    path: fetchPath,
    slug,
    group,
    subLabel,
    fileBase: base,
    title: subLabel ? `${title} (${subLabel})` : title,
  };
}

/** Prefer onboarded tree when the same logical doc appears twice. */
function dedupeDocs(docs) {
  const byLogicalId = new Map();
  for (const doc of docs) {
    const existing = byLogicalId.get(doc.id);
    if (!existing) {
      byLogicalId.set(doc.id, doc);
      continue;
    }
    const existingOnboarded = existing.path.startsWith(ONBOARDED_PREFIX);
    const nextOnboarded = doc.path.startsWith(ONBOARDED_PREFIX);
    if (nextOnboarded && !existingOnboarded) {
      byLogicalId.set(doc.id, doc);
    }
  }
  return [...byLogicalId.values()];
}

const files = [];
walkMarkdown(ROOT, "", files);
files.sort((a, b) => a.localeCompare(b, "en"));

const docsFinal = dedupeDocs(files.map(pathToDoc)).filter((doc) => {
  const full = path.join(ROOT, doc.path);
  return fs.existsSync(full);
});

docsFinal.sort((a, b) => a.path.localeCompare(b.path, "en"));

const bySlug = new Map();
for (const d of docsFinal) {
  if (!bySlug.has(d.slug)) bySlug.set(d.slug, []);
  bySlug.get(d.slug).push(d);
}

const leaders = [...bySlug.entries()]
  .map(([slug, list]) => ({
    slug,
    name: slugToLeaderName(slug),
    fileCount: list.length,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

const manifest = {
  generated: new Date().toISOString(),
  version: 1,
  rootLabel: "Movement leader research",
  leaders,
  docs: docsFinal,
};

const outPath = path.join(ROOT, "manifest.json");
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), "utf8");

const frameworks = docsFinal.filter((d) => d.fileBase === "frameworks");
const missingFrameworks = frameworks.filter((d) => !fs.existsSync(path.join(ROOT, d.path)));
console.log(`Wrote ${docsFinal.length} documents, ${leaders.length} leaders → ${outPath}`);
console.log(`Frameworks entries: ${frameworks.length}, missing on disk: ${missingFrameworks.length}`);
if (missingFrameworks.length) {
  for (const d of missingFrameworks) console.warn(`  WARN missing: ${d.path}`);
  process.exitCode = 1;
}
