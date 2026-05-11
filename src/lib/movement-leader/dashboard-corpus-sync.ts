/**
 * Phase 06 — sync research markdown into shared Supabase tables used by movemental-dashboard:
 * `movement_leader_corpus_data` and `movement_leader_generated_content`.
 *
 * Reads from `docs/movement_leader_research/<corpus-slug>/` plus repo-level
 * `docs/movement_leader_research/reflected-understanding/<slug>.md`.
 *
 * Run via `pnpm leader:sync-corpus-dashboard` or POST `/api/internal/movement-leader/corpus-sync`.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

import type postgres from "postgres";

const MAX_READ = 200_000;

function j(value: unknown): postgres.JSONValue {
  return value as postgres.JSONValue;
}

export type DashboardCorpusSyncInput = {
  /** Prefer `movement_leaders.id`. */
  movementLeaderId?: string;
  /** Resolve leader via `movement_leaders.application_id`. */
  applicationId?: string;
  /** Resolve via `research_corpus_slug` or `slug`. */
  corpusSlug?: string;
  /** Override repo root (default: movemental-ai repo root). */
  repoRoot?: string;
  /** Skip Anthropic framing generation (corpus upsert only). */
  skipGeneration?: boolean;
};

export type DashboardCorpusSyncResult = {
  movement_leader_id: string;
  corpus_slug: string;
  files_read: number;
  generated_sections: number;
  source_version: string;
};

function readText(abs: string): string | null {
  try {
    const s = fs.readFileSync(abs, "utf8");
    return s.length > MAX_READ ? `${s.slice(0, MAX_READ)}\n\n… [truncated]` : s;
  } catch {
    return null;
  }
}

function readFirst(root: string, rels: string[]): { rel: string; body: string } | null {
  for (const rel of rels) {
    const abs = path.join(root, rel);
    const body = readText(abs);
    if (body) return { rel, body };
  }
  return null;
}

function listCallingProfileFiles(leaderDir: string): string[] {
  let names: string[];
  try {
    names = fs.readdirSync(leaderDir);
  } catch {
    return [];
  }
  return names.filter(
    (n) =>
      n.toLowerCase().includes("calling") &&
      (n.endsWith(".md") || n.endsWith(".mdx")) &&
      !n.startsWith("_"),
  );
}

function parseLooseFrontmatter(src: string): { meta: Record<string, string>; body: string } {
  const t = src.replace(/^\uFEFF/, "").trimStart();
  if (!t.startsWith("---")) {
    return { meta: {}, body: src };
  }
  const nl = t.indexOf("\n", 3);
  if (nl === -1) return { meta: {}, body: src };
  const end = t.indexOf("\n---", nl);
  if (end === -1) return { meta: {}, body: src };
  const fmBlock = t.slice(nl + 1, end).trim();
  const meta: Record<string, string> = {};
  for (const line of fmBlock.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  const body = t.slice(end + 4).replace(/^\s*\n/, "");
  return { meta, body };
}

function wrapDoc(rel: string, raw: string) {
  const { meta, body } = parseLooseFrontmatter(raw);
  return { path: rel, frontmatter: meta, markdown: body };
}

function gitHeadSha(repoRoot: string): string {
  try {
    return execSync("git rev-parse HEAD", { cwd: repoRoot, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

async function anthropicOnce(params: { system: string; user: string }): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return "";
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      temperature: 0.4,
      system: params.system,
      messages: [{ role: "user", content: params.user }],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Anthropic HTTP ${res.status}: ${t.slice(0, 400)}`);
  }
  const json = (await res.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const block = json.content?.find((c) => c.type === "text");
  return (block?.text ?? "").trim();
}

const SYSTEM_VOICE =
  "You write for Movemental — warm, precise, editorial, never hype. Short answer: one paragraph or one sentence only, no bullet lists, no markdown fences.";

async function generateFramings(corpusSummary: string): Promise<Record<string, string>> {
  const base = corpusSummary.slice(0, 24_000);
  const prompts: Record<string, string> = {
    identity:
      "Write ONE substantial paragraph (4–7 sentences) synthesizing who this leader is, their calling, and their current focus, grounded ONLY in the research excerpt below. Newsreader-style dignity; no clichés.",
    calling:
      'Write ONE opening sentence that begins exactly: "This is the calling the research surfaced — " then finish the sentence in their voice (max 35 additional words).',
    work:
      'Write ONE sentence beginning: "This is a body of work that should have a network — " then complete (max 40 additional words).',
    voice:
      'Write ONE sentence beginning: "This is the sound of your work — " then complete (max 40 additional words).',
    where_it_lives:
      'Write ONE sentence beginning: "This is where your work lives. " then add a second short sentence: "The platform is built to change this." (You may lightly edit the second sentence for grammar only.)',
    network:
      "Write ONE sentence (max 45 words) about the strength and shape of their collaborative network as shown in the excerpt.",
    gaps:
      'Write TWO sentences. First begins: "None of this is criticism — " and names gaps constructively. Second invites partnership.',
  };
  const out: Record<string, string> = {};
  for (const [section, instruction] of Object.entries(prompts)) {
    try {
      const text = await anthropicOnce({
        system: SYSTEM_VOICE,
        user: `${instruction}\n\n--- RESEARCH EXCERPT ---\n${base}`,
      });
      if (text) out[section] = text;
    } catch {
      // continue other sections
    }
  }
  return out;
}

export async function runDashboardCorpusSync(
  sql: postgres.Sql,
  input: DashboardCorpusSyncInput,
): Promise<DashboardCorpusSyncResult> {
  const repoRoot = input.repoRoot ?? path.join(process.cwd());
  const researchRoot = path.join(repoRoot, "docs", "movement_leader_research");

  const id = input.movementLeaderId?.trim();
  const appId = input.applicationId?.trim();
  const slugIn = input.corpusSlug?.trim();

  type LeaderRow = { id: string; slug: string; research_corpus_slug: string | null };
  let rows: LeaderRow[];
  if (id) {
    rows = await sql<LeaderRow[]>`
      select id, slug, research_corpus_slug
      from movement_leaders
      where id = ${id}::uuid
      limit 1
    `;
  } else if (appId) {
    rows = await sql<LeaderRow[]>`
      select id, slug, research_corpus_slug
      from movement_leaders
      where application_id = ${appId}::uuid
      limit 1
    `;
  } else if (slugIn) {
    rows = await sql<LeaderRow[]>`
      select id, slug, research_corpus_slug
      from movement_leaders
      where
        lower(trim(coalesce(research_corpus_slug, ''))) = lower(trim(${slugIn}))
        or lower(trim(slug)) = lower(trim(${slugIn}))
      limit 1
    `;
  } else {
    throw new Error("Provide movementLeaderId, applicationId, or corpusSlug.");
  }

  const leader = rows[0];
  if (!leader) {
    throw new Error("No movement_leaders row matched the request.");
  }

  const corpusSlug = (leader.research_corpus_slug?.trim() || leader.slug).trim();
  const leaderDir = path.join(researchRoot, corpusSlug);

  if (!fs.existsSync(leaderDir)) {
    throw new Error(`Research directory missing: docs/movement_leader_research/${corpusSlug}/`);
  }

  const identity = readFirst(leaderDir, ["profile/identity.md"]);
  const biography = readFirst(leaderDir, ["profile/biography.md"]);
  const theology = readFirst(leaderDir, ["profile/theology.md"]);
  const voiceAnalysis = readFirst(leaderDir, ["profile/voice-analysis.md"]);

  const callingFiles = listCallingProfileFiles(leaderDir);
  const callingRel = callingFiles[0];
  const callingBody = callingRel ? readText(path.join(leaderDir, callingRel)) : null;
  const callingAlt = readFirst(leaderDir, ["profile/calling.md"]);
  const callingJson =
    callingBody && callingRel
      ? wrapDoc(callingRel, callingBody)
      : callingAlt
        ? wrapDoc(callingAlt.rel, callingAlt.body)
        : {};

  const booksSingle = readFirst(leaderDir, ["content/books.md"]);
  const coursesSingle = readFirst(leaderDir, ["content/courses.md"]);
  const academicSingle = readFirst(leaderDir, ["content/academic.md"]);
  const booksColumn: unknown[] = [];
  if (booksSingle) booksColumn.push(wrapDoc(booksSingle.rel, booksSingle.body));
  if (coursesSingle) booksColumn.push(wrapDoc(coursesSingle.rel, coursesSingle.body));
  if (academicSingle) booksColumn.push(wrapDoc(academicSingle.rel, academicSingle.body));

  const articlesSingle = readFirst(leaderDir, ["content/articles.md"]);
  const audioSingle = readFirst(leaderDir, ["content/audio.md"]);
  const videosSingle = readFirst(leaderDir, ["content/videos.md"]);

  const articles = articlesSingle ? [wrapDoc(articlesSingle.rel, articlesSingle.body)] : [];
  const audio = audioSingle ? [wrapDoc(audioSingle.rel, audioSingle.body)] : [];
  const videos = videosSingle ? [wrapDoc(videosSingle.rel, videosSingle.body)] : [];

  const dp: unknown[] = [];
  for (const rel of [
    "digital-presence/websites.md",
    "digital-presence/newsletters.md",
    "digital-presence/social-media.md",
    "digital-presence/platforms.md",
  ]) {
    const t = readText(path.join(leaderDir, rel));
    if (t) dp.push(wrapDoc(rel, t));
  }

  const media: unknown[] = [];
  for (const rel of ["media/citations.md", "media/press-coverage.md", "media/reviews.md"]) {
    const t = readText(path.join(leaderDir, rel));
    if (t) media.push(wrapDoc(rel, t));
  }

  const network: Record<string, unknown> = {};
  for (const rel of ["network/collaborators.md", "network/events.md"]) {
    const t = readText(path.join(leaderDir, rel));
    if (t) {
      const key = rel.replace("network/", "").replace(".md", "");
      network[key] = wrapDoc(rel, t);
    }
  }

  const orgSingle = readFirst(leaderDir, ["network/organizations.md"]);
  const endSingle = readFirst(leaderDir, ["network/endorsements.md"]);
  const organizationsColumn: unknown[] = orgSingle ? [wrapDoc(orgSingle.rel, orgSingle.body)] : [];
  const endorsementsColumn: unknown[] = endSingle ? [wrapDoc(endSingle.rel, endSingle.body)] : [];

  const analysis: Record<string, unknown> = {};
  for (const rel of [
    "analysis/content-analysis.md",
    "analysis/audience-analysis.md",
    "analysis/gap-analysis.md",
    "analysis/movemental-fit.md",
  ]) {
    const t = readText(path.join(leaderDir, rel));
    if (t) {
      const key = rel.replace("analysis/", "").replace(".md", "");
      analysis[key] = wrapDoc(rel, t);
    }
  }
  if (Object.keys(analysis).length) {
    network.analysis = analysis;
  }
  if (dp.length) {
    network.digital_presence = dp;
  }
  if (media.length) {
    network.media = media;
  }

  const reflectedInLeader = readFirst(leaderDir, [`reflected-understanding/${corpusSlug}.md`]);
  const reflectedRepo = readFirst(researchRoot, [`reflected-understanding/${corpusSlug}.md`]);
  const reflected = reflectedInLeader ?? reflectedRepo;
  const reflected_understanding_md = reflected?.body ?? null;

  const identityJson = identity ? wrapDoc(identity.rel, identity.body) : {};
  const biographyJson = biography ? wrapDoc(biography.rel, biography.body) : {};
  const theologyJson = theology ? wrapDoc(theology.rel, theology.body) : {};
  const voiceJson = voiceAnalysis ? wrapDoc(voiceAnalysis.rel, voiceAnalysis.body) : {};
  const frameworks: unknown[] = [];

  const fileCount =
    [identity, biography, theology, voiceAnalysis, orgSingle, endSingle, articlesSingle, audioSingle, videosSingle, booksSingle, coursesSingle, academicSingle, reflected].filter(
      Boolean,
    ).length +
    (callingBody ? 1 : 0) +
    dp.length +
    media.length +
    Object.keys(network).length;

  const source_version = gitHeadSha(repoRoot);
  const now = new Date().toISOString();

  await sql`
    insert into movement_leader_corpus_data (
      id,
      movement_leader_id,
      corpus_slug,
      identity,
      biography,
      theology,
      voice_analysis,
      calling_profile,
      books,
      articles,
      audio,
      videos,
      frameworks,
      organizations,
      endorsements,
      network,
      reflected_understanding_md,
      last_synced_at,
      source_version
    ) values (
      gen_random_uuid(),
      ${leader.id}::uuid,
      ${corpusSlug},
      ${sql.json(j(identityJson))},
      ${sql.json(j(biographyJson))},
      ${sql.json(j(theologyJson))},
      ${sql.json(j(voiceJson))},
      ${sql.json(j(callingJson))},
      ${sql.json(j(booksColumn))},
      ${sql.json(j(articles))},
      ${sql.json(j(audio))},
      ${sql.json(j(videos))},
      ${sql.json(j(frameworks))},
      ${sql.json(j(organizationsColumn))},
      ${sql.json(j(endorsementsColumn))},
      ${sql.json(j(network))},
      ${reflected_understanding_md},
      ${now}::timestamptz,
      ${source_version}
    )
    on conflict (movement_leader_id) do update set
      corpus_slug = excluded.corpus_slug,
      identity = excluded.identity,
      biography = excluded.biography,
      theology = excluded.theology,
      voice_analysis = excluded.voice_analysis,
      calling_profile = excluded.calling_profile,
      books = excluded.books,
      articles = excluded.articles,
      audio = excluded.audio,
      videos = excluded.videos,
      frameworks = excluded.frameworks,
      organizations = excluded.organizations,
      endorsements = excluded.endorsements,
      network = excluded.network,
      reflected_understanding_md = excluded.reflected_understanding_md,
      last_synced_at = excluded.last_synced_at,
      source_version = excluded.source_version
  `;

  let generated = 0;
  if (!input.skipGeneration && process.env.ANTHROPIC_API_KEY) {
    const summaryBits = [
      identity?.body,
      biography?.body,
      callingBody,
      voiceAnalysis?.body,
      JSON.stringify(network).slice(0, 8000),
    ]
      .filter(Boolean)
      .join("\n\n");
    const framings = await generateFramings(summaryBits);
    const modelVersion = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

    await sql`
      update movement_leader_generated_content
      set superseded_at = ${now}::timestamptz
      where movement_leader_id = ${leader.id}::uuid
        and superseded_at is null
    `;

    for (const [section, content] of Object.entries(framings)) {
      if (!content) continue;
      await sql`
        insert into movement_leader_generated_content (
          id,
          movement_leader_id,
          section,
          content,
          model_version,
          generated_at
        ) values (
          gen_random_uuid(),
          ${leader.id}::uuid,
          ${section},
          ${content},
          ${modelVersion},
          ${now}::timestamptz
        )
      `;
      generated++;
    }
  }

  return {
    movement_leader_id: leader.id,
    corpus_slug: corpusSlug,
    files_read: fileCount,
    generated_sections: generated,
    source_version,
  };
}
