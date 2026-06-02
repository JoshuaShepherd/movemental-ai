/**
 * Lossless substrate → Supabase sync for the movemental movement-leader corpus.
 *
 * Reads the canonical COLLATED substrate
 *   docs/movement_leader_research/_collated/<SLUG>_RESEARCH_COLLATED.md
 * (falling back to the per-leader folder copy) plus its COLLATION_MANIFEST, and
 * upserts the FULL content — without truncation — into the single shared table
 * `movement_leader_corpus_data`, keyed by `movement_leaders.id`.
 *
 * Differences from the legacy `runDashboardCorpusSync`:
 *   - works from the consolidated substrate, not scattered per-topic files;
 *   - never truncates (no MAX_READ clip) — the whole markdown is stored verbatim;
 *   - actually populates `frameworks` (the legacy path hardcoded `[]`);
 *   - stores every section in `substrate_sections` + the raw markdown in
 *     `substrate_md`, so nothing is lost even where a typed column is sparse;
 *   - preserves `calling_profile` and `reflected_understanding_md` (substrate
 *     does not carry these) instead of clobbering them.
 *
 * Run via `pnpm leader:upload-substrate <slug|all>`.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import type postgres from "postgres";

function j(value: unknown): postgres.JSONValue {
  return value as postgres.JSONValue;
}

export type SubstrateCorpusSyncInput = {
  /** Prefer `movement_leaders.id`. */
  movementLeaderId?: string;
  /** Resolve via `research_corpus_slug` or `slug`. */
  corpusSlug?: string;
  /** Override repo root (default: cwd). */
  repoRoot?: string;
};

export type SubstrateCorpusSyncResult = {
  movement_leader_id: string;
  corpus_slug: string;
  substrate_path: string;
  substrate_bytes: number;
  sections: number;
  frameworks: number;
  source_version: string;
  truncated: false;
};

/** Canonical substrate `##` section name → typed corpus column(s). */
const SECTION_TO_COLUMN: Record<string, string[]> = {
  Identity: ["identity"],
  Disambiguation: ["identity"],
  "Editorial bio": ["identity", "biography"],
  Timeline: ["biography"],
  Frameworks: ["frameworks"],
  Bibliography: ["books"],
  "Voice fingerprint": ["voice_analysis"],
  "Theological positioning": ["theology"],
  "Intellectual genealogy": ["network"],
  "Network graph": ["network", "organizations", "endorsements"],
  "Reach metrics": ["network"],
  "Distribution inventory": ["network"],
  "Sources (provenance)": ["network"],
  Sources: ["network"],
  "Open questions": ["network"],
};

/** Read a file in full — NO truncation. Returns null if absent. */
function readFull(abs: string): string | null {
  try {
    return fs.readFileSync(abs, "utf8");
  } catch {
    return null;
  }
}

/**
 * Split a markdown document on top-level `## ` headings.
 * Returns `{ preamble, sections: { name: bodyIncludingHeading } }`.
 */
export function splitSubstrateSections(md: string): {
  preamble: string;
  sections: Record<string, string>;
} {
  const lines = md.split("\n");
  const sections: Record<string, string> = {};
  let preambleLines: string[] = [];
  let current: { name: string; lines: string[] } | null = null;
  let inFence = false;

  const flush = () => {
    if (current) sections[current.name] = current.lines.join("\n").trim();
  };

  for (const line of lines) {
    if (/^(```|~~~)/.test(line.trim())) inFence = !inFence;
    const h2 = !inFence ? line.match(/^##\s+(.+?)\s*$/) : null;
    // `###` and deeper must NOT start a new section.
    if (h2 && !line.startsWith("### ")) {
      flush();
      current = { name: h2[1].trim(), lines: [line] };
    } else if (current) {
      current.lines.push(line);
    } else {
      preambleLines.push(line);
    }
  }
  flush();
  return { preamble: preambleLines.join("\n").trim(), sections };
}

/** Parse the Frameworks section into `[{ name, markdown }]` by `### ` subheadings. */
function parseFrameworks(frameworksSection: string | undefined): Array<{ name: string; markdown: string }> {
  if (!frameworksSection) return [];
  const lines = frameworksSection.split("\n");
  const out: Array<{ name: string; markdown: string }> = [];
  let cur: { name: string; lines: string[] } | null = null;
  let inFence = false;
  const flush = () => {
    if (cur && cur.name) out.push({ name: cur.name, markdown: cur.lines.join("\n").trim() });
  };
  for (const line of lines) {
    if (/^(```|~~~)/.test(line.trim())) inFence = !inFence;
    const h3 = !inFence ? line.match(/^###\s+(.+?)\s*$/) : null;
    if (h3) {
      flush();
      cur = { name: h3[1].trim(), lines: [] };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  flush();
  return out;
}

/** Extract every ```json fenced block, parsed; non-parseable blocks are skipped. */
function extractJsonBlocks(section: string | undefined): unknown[] {
  if (!section) return [];
  const out: unknown[] = [];
  const re = /```json\s*([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section))) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      /* skip non-JSON fenced block */
    }
  }
  return out;
}

function wrap(section: string, markdown: string) {
  return { source: "substrate", section, markdown };
}

/**
 * Resolve the collated substrate file for a slug. Prefers the `_collated/`
 * canonical copy; falls back to the per-leader folder.
 */
export function resolveSubstratePaths(
  researchRoot: string,
  corpusSlug: string,
): { mdPath: string | null; manifestPath: string | null } {
  const UP = corpusSlug.toUpperCase().replace(/-/g, "_");
  const candidates = [
    path.join(researchRoot, "_collated", `${UP}_RESEARCH_COLLATED.md`),
    path.join(researchRoot, corpusSlug, `${UP}_RESEARCH_COLLATED.md`),
  ];
  const mdPath = candidates.find((p) => fs.existsSync(p)) ?? null;
  const manifestCandidates = [
    path.join(researchRoot, "_collated", `${UP}_COLLATION_MANIFEST.json`),
    path.join(researchRoot, corpusSlug, `${UP}_COLLATION_MANIFEST.json`),
  ];
  const manifestPath = manifestCandidates.find((p) => fs.existsSync(p)) ?? null;
  return { mdPath, manifestPath };
}

export async function runSubstrateCorpusSync(
  sql: postgres.Sql,
  input: SubstrateCorpusSyncInput,
): Promise<SubstrateCorpusSyncResult> {
  const repoRoot = input.repoRoot ?? process.cwd();
  const researchRoot = path.join(repoRoot, "docs", "movement_leader_research");

  // 1. Resolve the leader row.
  type LeaderRow = { id: string; slug: string; research_corpus_slug: string | null };
  let rows: LeaderRow[];
  const id = input.movementLeaderId?.trim();
  const slugIn = input.corpusSlug?.trim();
  if (id) {
    rows = await sql<LeaderRow[]>`
      select id, slug, research_corpus_slug from movement_leaders where id = ${id}::uuid limit 1`;
  } else if (slugIn) {
    rows = await sql<LeaderRow[]>`
      select id, slug, research_corpus_slug from movement_leaders
      where lower(trim(coalesce(research_corpus_slug,''))) = lower(trim(${slugIn}))
         or lower(trim(slug)) = lower(trim(${slugIn}))
      limit 1`;
  } else {
    throw new Error("Provide movementLeaderId or corpusSlug.");
  }
  const leader = rows[0];
  if (!leader) {
    throw new Error(
      `No movement_leaders row matched "${id ?? slugIn}". ` +
        `Provision the leader first (movemental-tenant-provision) before uploading the corpus.`,
    );
  }
  const corpusSlug = (leader.research_corpus_slug?.trim() || leader.slug).trim();

  // 2. Read the FULL substrate — no truncation.
  const { mdPath, manifestPath } = resolveSubstratePaths(researchRoot, corpusSlug);
  if (!mdPath) {
    throw new Error(
      `No collated substrate found for "${corpusSlug}". Expected ` +
        `docs/movement_leader_research/_collated/${corpusSlug.toUpperCase().replace(/-/g, "_")}_RESEARCH_COLLATED.md`,
    );
  }
  const substrateMd = readFull(mdPath);
  if (substrateMd == null) throw new Error(`Could not read ${mdPath}`);
  const manifest = manifestPath ? (JSON.parse(readFull(manifestPath) ?? "null") as unknown) : null;

  // 3. Parse sections + map to typed columns.
  const { sections } = splitSubstrateSections(substrateMd);
  const sectionNames = Object.keys(sections);

  const columnBuckets: Record<string, Array<{ source: string; section: string; markdown: string }>> = {
    identity: [],
    biography: [],
    theology: [],
    voice_analysis: [],
    organizations: [],
    endorsements: [],
    network: [],
    books: [],
  };
  for (const [name, body] of Object.entries(sections)) {
    const cols = SECTION_TO_COLUMN[name];
    if (!cols) continue;
    for (const col of cols) {
      if (columnBuckets[col]) columnBuckets[col].push(wrap(name, body));
    }
  }

  const frameworksArr = parseFrameworks(sections["Frameworks"]);
  const networkGraph = extractJsonBlocks(sections["Network graph"]);

  const identityJson = columnBuckets.identity.length ? { source: "substrate", sections: columnBuckets.identity } : {};
  const biographyJson = columnBuckets.biography.length ? { source: "substrate", sections: columnBuckets.biography } : {};
  const theologyJson = columnBuckets.theology[0] ?? {};
  const voiceJson = columnBuckets.voice_analysis[0] ?? {};
  const networkJson = {
    source: "substrate",
    sections: columnBuckets.network,
    graph: networkGraph,
  };
  const organizationsColumn = columnBuckets.organizations;
  const endorsementsColumn = columnBuckets.endorsements;
  const booksColumn = columnBuckets.books;

  // 4. Preserve fields the substrate does not carry.
  type Existing = { calling_profile: unknown; reflected_understanding_md: string | null };
  const existingRows = await sql<Existing[]>`
    select calling_profile, reflected_understanding_md
    from movement_leader_corpus_data where movement_leader_id = ${leader.id}::uuid limit 1`;
  const existing = existingRows[0];
  const callingJson = (existing?.calling_profile as unknown) ?? {};
  const reflected_understanding_md = existing?.reflected_understanding_md ?? null;

  // 5. substrate_sections = every section, keyed by canonical name (lossless).
  const substrateSections: Record<string, string> = {};
  for (const name of sectionNames) substrateSections[name] = sections[name];

  const manifestHash =
    manifest && typeof manifest === "object" && manifest !== null && "sources" in manifest
      ? crypto.createHash("sha256").update(JSON.stringify(manifest)).digest("hex").slice(0, 16)
      : crypto.createHash("sha256").update(substrateMd).digest("hex").slice(0, 16);
  const source_version = `substrate:${manifestHash}`;
  const now = new Date().toISOString();

  // 6. Idempotent upsert — full markdown, no truncation.
  await sql`
    insert into movement_leader_corpus_data (
      id, movement_leader_id, corpus_slug,
      identity, biography, theology, voice_analysis, calling_profile,
      books, articles, audio, videos, frameworks,
      organizations, endorsements, network,
      reflected_understanding_md, substrate_md, substrate_sections, manifest,
      last_synced_at, source_version
    ) values (
      gen_random_uuid(), ${leader.id}::uuid, ${corpusSlug},
      ${sql.json(j(identityJson))}, ${sql.json(j(biographyJson))}, ${sql.json(j(theologyJson))},
      ${sql.json(j(voiceJson))}, ${sql.json(j(callingJson))},
      ${sql.json(j(booksColumn))}, ${sql.json(j([]))}, ${sql.json(j([]))}, ${sql.json(j([]))},
      ${sql.json(j(frameworksArr))},
      ${sql.json(j(organizationsColumn))}, ${sql.json(j(endorsementsColumn))}, ${sql.json(j(networkJson))},
      ${reflected_understanding_md}, ${substrateMd}, ${sql.json(j(substrateSections))},
      ${manifest === null ? null : sql.json(j(manifest))},
      ${now}::timestamptz, ${source_version}
    )
    on conflict (movement_leader_id) do update set
      corpus_slug = excluded.corpus_slug,
      identity = excluded.identity,
      biography = excluded.biography,
      theology = excluded.theology,
      voice_analysis = excluded.voice_analysis,
      calling_profile = excluded.calling_profile,
      books = excluded.books,
      frameworks = excluded.frameworks,
      organizations = excluded.organizations,
      endorsements = excluded.endorsements,
      network = excluded.network,
      reflected_understanding_md = excluded.reflected_understanding_md,
      substrate_md = excluded.substrate_md,
      substrate_sections = excluded.substrate_sections,
      manifest = excluded.manifest,
      last_synced_at = excluded.last_synced_at,
      source_version = excluded.source_version
  `;

  return {
    movement_leader_id: leader.id,
    corpus_slug: corpusSlug,
    substrate_path: path.relative(repoRoot, mdPath),
    substrate_bytes: Buffer.byteLength(substrateMd, "utf8"),
    sections: sectionNames.length,
    frameworks: frameworksArr.length,
    source_version,
    truncated: false,
  };
}

/** Idempotent DDL for the three lossless columns. Safe to run repeatedly. */
export const ENSURE_SUBSTRATE_COLUMNS_SQL = `
alter table public.movement_leader_corpus_data
  add column if not exists substrate_md       text,
  add column if not exists substrate_sections jsonb not null default '{}'::jsonb,
  add column if not exists manifest           jsonb;
`;
