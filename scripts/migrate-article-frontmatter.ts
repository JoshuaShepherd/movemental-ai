#!/usr/bin/env tsx

/**
 * One-shot migration: inject canonical frontmatter onto every publishable
 * article under `docs/articles/` based on the inventory declared below.
 *
 * Idempotent: re-running merges missing keys without clobbering existing ones.
 * Run via `pnpm tsx scripts/migrate-article-frontmatter.ts`.
 */

import fs from "node:fs";
import path from "node:path";

const ARTICLES_DIR = path.join(process.cwd(), "docs", "articles");

type Inv = {
  slug: string;
  shape:
    | "canon"
    | "guide"
    | "playbook"
    | "field-guide"
    | "case-study"
    | "methodology"
    | "ai-note"
    | "sandbox"
    | "story";
  canon_section?: "moment" | "problem" | "path" | "future" | "synthesis";
  canon_order?: number;
  series?: "fragmentation" | "content-strategy" | "sandbox" | "ssss" | "two-intelligences" | "ai-governance";
  series_order?: number;
  audience?: string[];
  topics?: string[];
  featured?: boolean;
};

const INVENTORY: Inv[] = [
  // --- CANON (moment) ---
  { slug: "the-frontier-you-didnt-choose", shape: "canon", canon_section: "moment", canon_order: 1, topics: ["ai-posture"] },
  { slug: "the-two-equal-errors", shape: "canon", canon_section: "moment", canon_order: 2, topics: ["ai-posture"] },
  { slug: "integrity-vs-impact", shape: "canon", canon_section: "moment", canon_order: 3, topics: ["integrity", "ai-posture"] },
  { slug: "this-is-not-a-tools-problem", shape: "canon", canon_section: "moment", canon_order: 4, topics: ["ai-posture"] },
  { slug: "why-this-moment-feels-disorienting", shape: "canon", canon_section: "moment", canon_order: 5, topics: ["ai-posture"] },

  // --- CANON (problem) ---
  { slug: "the-fragmentation-tax", shape: "canon", canon_section: "problem", canon_order: 6, topics: ["fragmentation"] },
  { slug: "content-that-doesnt-move", shape: "canon", canon_section: "problem", canon_order: 7, topics: ["fragmentation", "content-strategy"] },
  { slug: "the-collapse-of-signal-in-the-ai-age", shape: "canon", canon_section: "problem", canon_order: 8, topics: ["signal"] },
  { slug: "why-expertise-is-becoming-invisible", shape: "canon", canon_section: "problem", canon_order: 9, topics: ["signal"] },
  { slug: "the-death-of-isolated-work", shape: "canon", canon_section: "problem", canon_order: 10, topics: ["fragmentation", "signal"] },

  // --- CANON (path) ---
  { slug: "there-is-a-way-through-this", shape: "canon", canon_section: "path", canon_order: 11, topics: ["ssss"] },
  { slug: "the-ssss-framework", shape: "canon", canon_section: "path", canon_order: 12, topics: ["ssss"] },
  { slug: "why-order-matters", shape: "canon", canon_section: "path", canon_order: 13, topics: ["ssss"] },
  { slug: "safety-before-speed", shape: "canon", canon_section: "path", canon_order: 14, topics: ["ssss", "ai-governance"] },
  { slug: "the-purpose-of-sandbox", shape: "canon", canon_section: "path", canon_order: 15, topics: ["ssss", "sandbox"] },
  { slug: "skills-as-formation-not-training", shape: "canon", canon_section: "path", canon_order: 16, topics: ["ssss", "formation"] },
  { slug: "why-solutions-come-last", shape: "canon", canon_section: "path", canon_order: 17, topics: ["ssss"] },

  // --- CANON (future) ---
  { slug: "when-work-begins-to-move", shape: "canon", canon_section: "future", canon_order: 18, topics: ["multiplication"] },
  { slug: "from-content-to-movement", shape: "canon", canon_section: "future", canon_order: 19, topics: ["multiplication", "content-strategy"] },
  { slug: "the-return-of-coherent-leadership", shape: "canon", canon_section: "future", canon_order: 20, topics: ["signal", "formation"] },
  { slug: "ai-with-integrity", shape: "canon", canon_section: "future", canon_order: 21, topics: ["integrity", "ai-posture"] },
  { slug: "building-for-the-next-decade", shape: "canon", canon_section: "future", canon_order: 22, topics: ["multiplication", "formation"] },

  // --- CANON (synthesis) ---
  { slug: "the-movemental-thesis", shape: "canon", canon_section: "synthesis", canon_order: 23, topics: ["ssss", "integrity", "fragmentation"], featured: true },

  // --- GUIDES (content-strategy series) ---
  { slug: "01-content-strategy-for-movement-leaders", shape: "guide", series: "content-strategy", series_order: 1, topics: ["content-strategy"] },
  { slug: "02-the-evergreen-article-architecture", shape: "guide", series: "content-strategy", series_order: 2, topics: ["content-strategy"] },
  { slug: "03-transformation-over-information", shape: "guide", series: "content-strategy", series_order: 3, topics: ["content-strategy", "formation"] },
  { slug: "04-the-eight-week-formation-scaffold", shape: "guide", series: "content-strategy", series_order: 4, topics: ["content-strategy", "formation"] },
  { slug: "05-formation-journeys-the-pathway-architecture", shape: "guide", series: "content-strategy", series_order: 5, topics: ["content-strategy", "formation"] },
  { slug: "06-the-christocentric-spine", shape: "guide", series: "content-strategy", series_order: 6, topics: ["content-strategy", "formation"], audience: ["church"] },

  // --- GUIDES (standalone) ---
  { slug: "guide-ai-credibility-2026", shape: "guide", topics: ["ai-credibility", "signal"], featured: true },
  { slug: "movemental-stack-nonprofit-use-cases", shape: "guide", topics: ["ai-posture"], audience: ["nonprofit"] },
  { slug: "substack-and-movemental-system", shape: "guide", topics: ["content-strategy"] },

  // --- PLAYBOOKS ---
  { slug: "playbook-movement-leader", shape: "playbook", audience: ["leader"], topics: ["ssss", "multiplication"] },
  { slug: "playbook-nonprofit", shape: "playbook", audience: ["nonprofit"], topics: ["ssss", "ai-governance"] },
  { slug: "playbook-church", shape: "playbook", audience: ["church"], topics: ["ssss", "formation"] },
  { slug: "playbook-institution", shape: "playbook", audience: ["institution"], topics: ["ssss", "ai-governance"] },

  // --- FIELD GUIDES ---
  {
    slug: "ssss-field-guide-for-organizational-leaders",
    shape: "field-guide",
    audience: ["leader", "nonprofit", "church", "institution"],
    topics: ["ssss"],
    featured: true,
  },

  // --- METHODOLOGY ---
  { slug: "fragmentation-inventory", shape: "methodology", topics: ["fragmentation"], featured: true },
  { slug: "solutions-deployment", shape: "methodology", topics: ["ssss"] },
  { slug: "sandbox-discovery", shape: "methodology", topics: ["sandbox"] },

  // --- CASE STUDIES ---
  { slug: "case-study-youthfront", shape: "case-study", audience: ["nonprofit"], topics: ["fragmentation", "multiplication"] },

  // --- AI NOTES ---
  { slug: "ai-collapses-the-cost-of-integration", shape: "ai-note", topics: ["dual-intelligence", "ai-posture"] },
  { slug: "ai-means-organizations-have-to-rebuild", shape: "ai-note", topics: ["ai-posture"] },
  { slug: "nonprofits-pii-private-agentic-rag", shape: "ai-note", audience: ["nonprofit"], topics: ["ai-governance"] },
  { slug: "the-one-constraint-behind-every-ai-conversation", shape: "ai-note", topics: ["ai-posture"] },
  { slug: "the-skill-of-ai", shape: "ai-note", topics: ["formation"] },

  // --- STORY / supporting essays ---
  { slug: "the-story-of-movemental", shape: "story", topics: [], featured: true },
  { slug: "context-changes-everything", shape: "story", topics: ["ai-posture"] },
  { slug: "fragmentation-to-multiplication", shape: "story", topics: ["fragmentation", "multiplication"] },
  { slug: "intelligence-fragmentation", shape: "story", topics: ["dual-intelligence"] },
  { slug: "relational-intelligence", shape: "story", topics: ["dual-intelligence"] },
  { slug: "two-intelligences-integration", shape: "story", topics: ["dual-intelligence"] },
  { slug: "the-cost-of-fragmentation", shape: "story", topics: ["fragmentation"] },
  { slug: "the-work-of-safety", shape: "story", topics: ["ssss"] },
  { slug: "why-your-content-isnt-compounding", shape: "story", topics: ["content-strategy", "fragmentation"] },

  // --- METHODOLOGY (assessment backbone) ---
  { slug: "the-ssss-journey-assessment-checklist", shape: "methodology", topics: ["ssss"], audience: ["leader"] },
];

// --- Sandbox curriculum (nested) — read directly from files since order lives in frontmatter ---

type Frontmatter = Record<string, unknown>;

function parseFrontmatterBlock(raw: string): { data: Frontmatter; body: string; hasBlock: boolean } {
  const stripped = raw.replace(/^\uFEFF/, "");
  if (!stripped.startsWith("---\n") && !stripped.startsWith("---\r\n")) {
    return { data: {}, body: stripped, hasBlock: false };
  }
  const end = stripped.indexOf("\n---", 4);
  if (end === -1) return { data: {}, body: stripped, hasBlock: false };
  const block = stripped.slice(4, end);
  const body = stripped.slice(end + 4).replace(/^\s+/, "");

  const data: Frontmatter = {};
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    const val: string = m[2].trim();
    {
      if (val === "") {
        data[key] = "";
        continue;
      }
      if (val === "true" || val === "false") {
        data[key] = val === "true";
        continue;
      }
      if (val === "null" || val === "~") {
        data[key] = null;
        continue;
      }
      if (/^-?\d+$/.test(val)) {
        data[key] = Number.parseInt(val, 10);
        continue;
      }
      if (val.startsWith("[") && val.endsWith("]")) {
        const items = val
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) =>
            (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))
              ? s.slice(1, -1)
              : s,
          );
        data[key] = items;
        continue;
      }
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        data[key] = val.slice(1, -1);
        continue;
      }
      data[key] = val;
    }
  }
  return { data, body, hasBlock: true };
}

function serializeFrontmatter(data: Frontmatter): string {
  const preferredOrder = [
    "title",
    "slug",
    "shape",
    "canon_section",
    "canon_order",
    "series",
    "series_order",
    "deck",
    "author",
    "published_at",
    "updated_at",
    "audience",
    "topics",
    "related_slugs",
    "featured",
    "featured_in_section",
    "canonical_url",
  ];
  const keys = [
    ...preferredOrder.filter((k) => k in data),
    ...Object.keys(data).filter((k) => !preferredOrder.includes(k)),
  ];

  const lines = ["---"];
  for (const k of keys) {
    const v = data[k];
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      lines.push(`${k}: [${v.map((s) => String(s)).join(", ")}]`);
    } else if (typeof v === "boolean" || typeof v === "number") {
      lines.push(`${k}: ${v}`);
    } else if (v === null) {
      lines.push(`${k}: null`);
    } else {
      const s = String(v);
      const needsQuote = /[:#]/.test(s) || s.startsWith("[") || s.startsWith("{");
      lines.push(needsQuote ? `${k}: "${s.replace(/"/g, '\\"')}"` : `${k}: ${s}`);
    }
  }
  lines.push("---", "");
  return lines.join("\n");
}

function extractH1(body: string): string | null {
  const m = body.match(/^#\s+(.+?)\s*#*\s*$/m);
  return m ? m[1].trim() : null;
}

function migrateCanonical(): { updated: number; skipped: number } {
  let updated = 0;
  let skipped = 0;
  for (const inv of INVENTORY) {
    const file = path.join(ARTICLES_DIR, `${inv.slug}.md`);
    if (!fs.existsSync(file)) {
      console.log(`[skip] ${inv.slug} — file not found`);
      skipped += 1;
      continue;
    }
    const raw = fs.readFileSync(file, "utf-8");
    const parsed = parseFrontmatterBlock(raw);
    const existing = parsed.data;
    const title = typeof existing.title === "string" ? existing.title : extractH1(parsed.body) ?? inv.slug;

    const merged: Frontmatter = {
      title,
      slug: typeof existing.slug === "string" ? existing.slug : inv.slug,
      shape: inv.shape,
      ...(inv.canon_section ? { canon_section: inv.canon_section } : {}),
      ...(inv.canon_order ? { canon_order: inv.canon_order } : {}),
      ...(inv.series ? { series: inv.series } : {}),
      ...(inv.series_order ? { series_order: inv.series_order } : {}),
      author: typeof existing.author === "string" ? existing.author : "Josh Shepherd",
      audience: Array.isArray(existing.audience) && existing.audience.length
        ? existing.audience
        : inv.audience ?? ["any"],
      topics: Array.isArray(existing.topics) && existing.topics.length
        ? existing.topics
        : inv.topics ?? [],
      ...(typeof existing.deck === "string" ? { deck: existing.deck } : {}),
      ...(typeof existing.published_at === "string" ? { published_at: existing.published_at } : {}),
      ...(typeof existing.updated_at === "string" ? { updated_at: existing.updated_at } : {}),
      ...(Array.isArray(existing.related_slugs) ? { related_slugs: existing.related_slugs } : {}),
      ...(inv.featured || existing.featured === true ? { featured: true } : {}),
    };

    const nextRaw = serializeFrontmatter(merged) + parsed.body;
    if (nextRaw !== raw) {
      fs.writeFileSync(file, nextRaw, "utf-8");
      console.log(`[ok]   ${inv.slug}`);
      updated += 1;
    } else {
      skipped += 1;
    }
  }
  return { updated, skipped };
}

function migrateSandbox(): { updated: number; skipped: number } {
  const dir = path.join(ARTICLES_DIR, "sandbox");
  if (!fs.existsSync(dir)) return { updated: 0, skipped: 0 };

  let updated = 0;
  let skipped = 0;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".md")) continue;
    const file = path.join(dir, name);
    const slug = `sandbox/${name.replace(/\.md$/, "")}`;
    const raw = fs.readFileSync(file, "utf-8");
    const parsed = parseFrontmatterBlock(raw);
    const existing = parsed.data;
    const sandboxOrder =
      typeof existing.sandbox_order === "number"
        ? existing.sandbox_order
        : Number.parseInt(String(existing.sandbox_order ?? ""), 10);
    const title = typeof existing.title === "string" ? existing.title : extractH1(parsed.body) ?? slug;

    const merged: Frontmatter = {
      title,
      slug: typeof existing.slug === "string" ? existing.slug : name.replace(/\.md$/, ""),
      shape: "sandbox",
      series: "sandbox",
      ...(Number.isFinite(sandboxOrder) ? { series_order: sandboxOrder, sandbox_order: sandboxOrder } : {}),
      ...(typeof existing.sandbox_layer === "string" ? { sandbox_layer: existing.sandbox_layer } : {}),
      author: typeof existing.author === "string" ? existing.author : "Josh Shepherd",
      audience: Array.isArray(existing.audience) && existing.audience.length
        ? existing.audience
        : ["leader", "nonprofit"],
      topics: Array.isArray(existing.topics) && existing.topics.length ? existing.topics : ["sandbox"],
      ...(typeof existing.deck === "string" ? { deck: existing.deck } : {}),
      ...(typeof existing.canon_section === "string" ? { canon_section_legacy: existing.canon_section } : {}),
    };

    const nextRaw = serializeFrontmatter(merged) + parsed.body;
    if (nextRaw !== raw) {
      fs.writeFileSync(file, nextRaw, "utf-8");
      console.log(`[ok]   ${slug}`);
      updated += 1;
    } else {
      skipped += 1;
    }
  }
  return { updated, skipped };
}

function main(): void {
  console.log("Migrating canonical articles…");
  const canonicalResult = migrateCanonical();
  console.log(`  updated: ${canonicalResult.updated}, unchanged: ${canonicalResult.skipped}\n`);

  console.log("Migrating sandbox curriculum…");
  const sandboxResult = migrateSandbox();
  console.log(`  updated: ${sandboxResult.updated}, unchanged: ${sandboxResult.skipped}\n`);
}

main();
