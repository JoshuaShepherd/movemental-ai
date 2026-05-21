/**
 * Build static bundle for docs/html/alan-hirsch-research-collated viewer.
 *
 *   pnpm docs:alan-hirsch-research-html
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

import {
  VIEWER_OUT_DIRS,
  writeViewerAssets,
} from "./generate-alan-hirsch-research-viewer-assets";

const REPO_ROOT = process.cwd();
const MD_PATH = path.join(
  REPO_ROOT,
  "docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md",
);

export type TocEntry = {
  id: string;
  level: number;
  text: string;
  children?: TocEntry[];
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "section";
}

function extractHeadings(md: string): { level: number; text: string; id: string }[] {
  const used = new Map<string, number>();
  const headings: { level: number; text: string; id: string }[] = [];

  for (const line of md.split("\n")) {
    const m = line.match(/^(#{1,6})\s+(.+)$/);
    if (!m) continue;
    const level = m[1]!.length;
    const text = m[2]!
      .replace(/\*\*/g, "")
      .replace(/`/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
    if (!text) continue;

    let base = slugify(text);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    headings.push({ level, text, id });
  }
  return headings;
}

function nestToc(flat: { level: number; text: string; id: string }[]): TocEntry[] {
  const root: TocEntry[] = [];
  const stack: { entry: TocEntry; level: number }[] = [];

  for (const h of flat) {
    const node: TocEntry = { id: h.id, level: h.level, text: h.text };
    while (stack.length > 0 && stack[stack.length - 1]!.level >= h.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1]!.entry;
      if (!parent.children) parent.children = [];
      parent.children.push(node);
    }
    stack.push({ entry: node, level: h.level });
  }
  return root;
}

function addHeadingIds(html: string, headings: { id: string; level: number }[]): string {
  let i = 0;
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/gi, (match, depth: string, inner: string) => {
    const h = headings[i];
    i += 1;
    if (!h) return match;
    return `<h${depth} id="${h.id}">${inner}</h${depth}>`;
  });
}

async function main() {
  const md = await readFile(MD_PATH, "utf8");
  const flatHeadings = extractHeadings(md);
  const toc = nestToc(flatHeadings);

  marked.setOptions({ gfm: true, breaks: false });
  let html = marked.parse(md) as string;
  html = addHeadingIds(html, flatHeadings);

  const metaMatch = md.match(/\*\*Slug:\*\*\s*`([^`]+)`/);
  const versionMatch = md.match(/\*\*Version:\*\*\s*([^\n]+)/);
  const updatedMatch = md.match(/\*\*Last updated:\*\*\s*([^\n]+)/);

  const bundle = {
    meta: {
      title: "Alan Hirsch — Movement Leader Research (Substrate)",
      slug: metaMatch?.[1] ?? "alan-hirsch",
      version: versionMatch?.[1]?.trim() ?? null,
      lastUpdated: updatedMatch?.[1]?.trim() ?? null,
      sourcePath: "docs/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md",
      generatedAt: new Date().toISOString(),
      headingCount: flatHeadings.length,
      lineCount: md.split("\n").length,
      charCount: md.length,
    },
    toc,
    html,
  };

  const bundleJson = JSON.stringify(bundle);
  await writeViewerAssets();
  for (const outDir of VIEWER_OUT_DIRS) {
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "bundle.json"), bundleJson, "utf8");
  }

  const mb = (Buffer.byteLength(bundleJson) / 1024 / 1024).toFixed(2);
  console.log(
    `[docs:alan-hirsch-research-html] Wrote bundle to ${VIEWER_OUT_DIRS.join(", ")} (${mb} MB, ${flatHeadings.length} headings, ${bundle.meta.lineCount} lines)`,
  );
  console.log(
    `[docs:alan-hirsch-research-html] Open: http://127.0.0.1:8765/movement_leader_research/alan-hirsch/collated/`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
