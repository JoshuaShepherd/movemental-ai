import fs from "node:fs";
import path from "node:path";

const ARTICLES_DIR = path.join(process.cwd(), "docs", "articles");

export type SandboxCanonHubEntry = {
  /** Path segment under `docs/articles/sandbox/` (no `sandbox/` prefix). */
  fileSlug: string;
  title: string;
  order: number;
  layer: string;
  href: `/articles/sandbox/${string}`;
};

function parseSimpleFrontmatter(raw: string): Record<string, string> {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw.replace(/^\uFEFF/, ""));
  if (!m?.[1]) return {};
  const out: Record<string, string> = {};
  for (const line of m[1].split(/\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const kv = /^([a-zA-Z0-9_]+):\s*(.+)$/.exec(trimmed);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

/**
 * Sandbox curriculum pieces under `docs/articles/sandbox/`, sorted by `sandbox_order`.
 * Used by `/articles/sandbox` hub and related navigation.
 */
export function listSandboxCanonHubEntries(): SandboxCanonHubEntry[] {
  const dir = path.join(ARTICLES_DIR, "sandbox");
  if (!fs.existsSync(dir)) return [];

  const rows: SandboxCanonHubEntry[] = [];
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".md")) continue;
    const fileSlug = name.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, name), "utf-8");
    const fm = parseSimpleFrontmatter(raw);
    const order = Number.parseInt(fm.sandbox_order ?? "", 10);
    const title = fm.title?.trim() || fileSlug.replace(/-/g, " ");
    const layer = (fm.sandbox_layer ?? "sandbox").trim();
    if (!Number.isFinite(order)) continue;
    rows.push({
      fileSlug,
      title,
      order,
      layer,
      href: `/articles/sandbox/${fileSlug}`,
    });
  }
  return rows.sort((a, b) => a.order - b.order);
}

export function groupSandboxCanonByLayer(entries: SandboxCanonHubEntry[]): Map<string, SandboxCanonHubEntry[]> {
  const map = new Map<string, SandboxCanonHubEntry[]>();
  for (const e of entries) {
    const list = map.get(e.layer) ?? [];
    list.push(e);
    map.set(e.layer, list);
  }
  return map;
}
