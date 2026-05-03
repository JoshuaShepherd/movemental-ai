#!/usr/bin/env node
/**
 * Scans this directory for *.md and writes manifest.json for the local reader.
 * Run: node generate-manifest.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

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

function walkMarkdown(dir, baseRel, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".") || e.name === "node_modules") continue;
    const full = path.join(dir, e.name);
    const rel = baseRel ? `${baseRel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      walkMarkdown(full, rel, out);
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".md")) {
      out.push(rel);
    }
  }
}

function pathToDoc(rel) {
  const norm = rel.replace(/\\/g, "/");
  const parts = norm.split("/");
  let slug;
  let subParts;
  if (parts.length === 1) {
    slug = "__root__";
    subParts = [];
  } else {
    slug = parts[0];
    subParts = parts.slice(1, -1);
  }
  const file = parts[parts.length - 1];
  const base = file.replace(/\.md$/i, "");
  const groupKey = subParts.length ? subParts[0] : "";
  const group = titleCaseFolder(groupKey);
  const rest = subParts.slice(1);
  const subLabel = rest.length ? rest.map(titleCaseFolder).join(" · ") : "";

  const title = base
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    id: norm.replace(/\.md$/i, ""),
    path: norm,
    slug,
    group,
    subLabel,
    fileBase: base,
    title: subLabel ? `${title} (${subLabel})` : title,
  };
}

const files = [];
walkMarkdown(ROOT, "", files);
files.sort((a, b) => a.localeCompare(b, "en"));

const docsFinal = files.map(pathToDoc);

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
console.log(`Wrote ${docsFinal.length} documents, ${leaders.length} leaders → ${outPath}`);
