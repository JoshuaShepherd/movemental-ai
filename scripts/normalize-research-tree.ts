#!/usr/bin/env tsx
/**
 * Normalize tenant movement-leader research trees to the canonical sidebar-aligned layout.
 * Usage: pnpm research:tree-normalize [--slug=alan-hirsch] [--dry-run]
 */
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

import {
  CANONICAL_RESEARCH_PATHS,
  ensureDir,
  fileStatus,
  isPopulatedMarkdown,
  reflectedUnderstandingPath,
  SIDEBAR_MANIFEST,
  slugDir,
  slugToEnvPrefix,
  TENANT_RESEARCH_SLUGS,
} from "./research-tree-paths";

const STAFF_SECTION_HEADING_PATTERNS = [
  /gap\s*analysis/i,
  /movemental\s+(fit|opportunit|recommendation|analysis)/i,
  /what we will not do/i,
  /at[-\s]?a[-\s]?glance scorecard/i,
  /competitive landscape/i,
  /^commerce\b/i,
  /audience profile/i,
];

const STAFF_INLINE_PATTERN =
  /\*{0,2}(movemental[\s-]+(fit|analysis|opportunit\w*)|gap[\s-]analysis|recommendation:\s*\**\s*onboard)\b.*$/i;

function stripStaffSections(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let skipUntilLevel: number | null = null;

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      if (skipUntilLevel !== null && level <= skipUntilLevel) {
        skipUntilLevel = null;
      }
      if (skipUntilLevel === null && STAFF_SECTION_HEADING_PATTERNS.some((re) => re.test(text))) {
        skipUntilLevel = level;
        continue;
      }
      if (skipUntilLevel !== null) continue;
    } else if (skipUntilLevel !== null) {
      continue;
    }
    out.push(line.replace(STAFF_INLINE_PATTERN, "").replace(/\s+$/, ""));
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function slugToDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((p) => {
      if (p === "jr") return "JR";
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" ");
}

function parseArgs(): { slug: string | null; dryRun: boolean } {
  const slugArg = process.argv.find((a) => a.startsWith("--slug="));
  return {
    slug: slugArg ? slugArg.slice("--slug=".length) : null,
    dryRun: process.argv.includes("--dry-run"),
  };
}

function movePath(from: string, to: string, dryRun: boolean, log: string[]): void {
  if (!existsSync(from)) return;
  if (existsSync(to)) return;
  log.push(`move ${from} → ${to}`);
  if (!dryRun) {
    ensureDir(join(to, ".."));
    renameSync(from, to);
  }
}

function copyIfMissing(from: string, to: string, dryRun: boolean, transform?: (s: string) => string): boolean {
  if (!existsSync(from)) return false;
  if (existsSync(to) && isPopulatedMarkdown(to)) return false;
  const content = transform ? transform(readFileSync(from, "utf8")) : readFileSync(from, "utf8");
  if (!dryRun) {
    ensureDir(join(to, ".."));
    writeFileSync(to, content, "utf8");
  }
  return true;
}

function writeEmptyStub(
  path: string,
  sidebar: string,
  slug: string,
  dryRun: boolean,
): void {
  if (existsSync(path)) return;
  const name = slugToDisplayName(slug);
  const content = `---
status: empty
sidebar: ${sidebar}
---

<!-- Intentionally empty: no ${sidebar.replace(/-/g, " ")} research on file for ${name}. -->
`;
  if (!dryRun) {
    ensureDir(join(path, ".."));
    writeFileSync(path, content, "utf8");
  }
}

const SIDEBAR_FOR_PATH: Record<string, string> = {
  "profile/identity.md": "author-profile",
  "profile/biography.md": "biography",
  "profile/theology.md": "theological-profile",
  "profile/voice-analysis.md": "voice-editorial-identity",
  "profile/calling-profile.md": "vocational-profile",
  "summary.md": "vocational-profile",
  "network/organizations.md": "author-profile",
  "content/books.md": "bibliography",
  "content/frameworks.md": "frameworks",
  "content/articles.md": "articles-blog-posts",
  "content/audio.md": "audio-podcast",
  "content/videos.md": "video-content",
  "content/content-audit.md": "content-audit",
  "content/academic.md": "academic-work",
  "content/courses.md": "courses-training",
  "analysis/audience-analysis.md": "audience-profile",
  "digital-presence/websites.md": "where-you-publish",
  "digital-presence/platforms.md": "where-you-publish",
  "digital-presence/newsletters.md": "where-you-publish",
  "digital-presence/social-media.md": "social-media",
  "fragmentation-story.md": "the-fragmentation-story",
  "welcome-letter.md": "(onboarding)",
};

function generateReadme(slug: string, root: string): string {
  const lines = [
    `# ${slugToDisplayName(slug)} — research sidebar manifest`,
    "",
    "Canonical paths aligned with Author Profile `/profile` navigation.",
    "",
    "| Sidebar slug | File | Status |",
    "| --- | --- | --- |",
  ];

  for (const row of SIDEBAR_MANIFEST) {
    let file = row.file;
    if (file.includes("<slug>")) {
      file = `reflected-understanding/${slug}.md`;
    }
    const full =
      file.startsWith("reflected-understanding/") && !file.includes("<slug>")
        ? join(root, "..", file)
        : join(root, file);
    const status = fileStatus(full);
    lines.push(`| ${row.sidebar} | ${file} | ${status} |`);
  }

  lines.push("");
  lines.push("_Staff-only research lives in `_staff/`; collateral in `_misc/`._");
  lines.push("");
  return lines.join("\n");
}

function splitLizDigitalPresence(root: string, dryRun: boolean, log: string[]): void {
  const src = join(root, "digital-presence.md");
  if (!existsSync(src)) return;

  const md = readFileSync(src, "utf8");
  ensureDir(join(root, "digital-presence"));

  const sections: Record<string, string> = {
    "digital-presence/websites.md": "",
    "digital-presence/platforms.md": "",
    "digital-presence/newsletters.md": "",
    "digital-presence/social-media.md": "",
  };

  let current: keyof typeof sections | null = null;
  const lines = md.split("\n");
  const buffers: Record<string, string[]> = {
    websites: ["# Web properties", ""],
    platforms: ["# Platforms & publishing", ""],
    newsletters: ["# Newsletters", ""],
    social: ["# Social media", ""],
  };

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (/^##\s+owned domains|^##\s+web properties/i.test(line)) {
      current = "websites";
    } else if (/^##\s+newsletter|^##\s+long-form writing/i.test(line)) {
      current = "newsletters";
    } else if (/^##\s+social/i.test(line)) {
      current = "social";
    } else if (/^##\s+podcast|^##\s+platform health|^##\s+email|^##\s+academic|^##\s+amazon/i.test(line)) {
      current = current ?? "platforms";
      if (/^##\s+podcast|^##\s+platform health|^##\s+email|^##\s+academic|^##\s+amazon/i.test(line)) {
        current = "platforms";
      }
    }
    if (current) buffers[current].push(line);
  }

  const mapping: Array<[string, string[]]> = [
    ["digital-presence/websites.md", buffers.websites],
    ["digital-presence/newsletters.md", buffers.newsletters],
    ["digital-presence/social-media.md", buffers.social],
    ["digital-presence/platforms.md", buffers.platforms],
  ];

  for (const [rel, buf] of mapping) {
    const dest = join(root, rel);
    if (isPopulatedMarkdown(dest)) continue;
    const body = buf.join("\n").trim();
    if (body.length < 20) continue;
    log.push(`split liz-rios: ${rel}`);
    if (!dryRun) writeFileSync(dest, body + "\n", "utf8");
  }

  movePath(src, join(root, "_misc", "digital-presence-source.md"), dryRun, log);
}

function mergeAffiliations(root: string, dryRun: boolean, log: string[]): void {
  const affiliations = join(root, "network/affiliations.md");
  const orgs = join(root, "network/organizations.md");
  if (!existsSync(affiliations)) return;

  const aff = readFileSync(affiliations, "utf8");
  if (!dryRun) {
    ensureDir(join(orgs, ".."));
    const existing = existsSync(orgs) ? readFileSync(orgs, "utf8") : "";
    const merged = existing.trim()
      ? `${existing.trim()}\n\n---\n\n## Affiliations\n\n${aff.trim()}\n`
      : aff;
    writeFileSync(orgs, merged, "utf8");
    movePath(affiliations, join(root, "_misc", "network", "affiliations.md"), dryRun, log);
  } else {
    log.push(`merge network/affiliations.md → organizations.md`);
  }
}

function archiveLegacyRoot(root: string, slug: string, dryRun: boolean, log: string[]): void {
  const prefix = slugToEnvPrefix(slug);
  const legacyDir = join(root, "_staff", "legacy");
  ensureDir(legacyDir);

  let entries: string[];
  try {
    entries = readdirSync(root);
  } catch {
    return;
  }

  for (const name of entries) {
    if (!name.endsWith(".md")) continue;
    if (name === "README.md" || name === "summary.md" || name === "welcome-letter.md") continue;
    if (name === "fragmentation-story.md") continue;
    if (name.startsWith("_")) continue;
    const upper = name.toUpperCase();
    if (
      upper.startsWith(`${prefix}_`) ||
      upper.includes("_RESEARCH_") ||
      upper.includes("_COLLATION_") ||
      upper.includes("_MASTER_") ||
      upper.includes("_VOICE_") ||
      upper.includes("_PROFILES_") ||
      name === "biography.md" ||
      name === "content-analysis.md" ||
      name === "gap-analysis.md" ||
      name === "movemental-analysis.md" ||
      name === "digital-presence-discovery.md" ||
      name === "committed-voice.md" ||
      name === "identity-verification.md" ||
      name === "content-marketing-playbook.md"
    ) {
      movePath(join(root, name), join(legacyDir, name), dryRun, log);
    }
  }
}

function moveStaffAndMisc(root: string, dryRun: boolean, log: string[]): void {
  const staffMoves: Array<[string, string]> = [
    ["analysis/gap-analysis.md", "_staff/gap-analysis.md"],
    ["analysis/movemental-fit.md", "_staff/movemental-fit.md"],
    ["analysis/competitive-landscape.md", "_staff/competitive-landscape.md"],
    ["gap-analysis.md", "_staff/gap-analysis-root.md"],
    ["movemental-analysis.md", "_staff/movemental-analysis.md"],
    ["content-marketing-playbook.md", "_staff/content-marketing-playbook.md"],
    ["identity-verification.md", "_staff/identity-verification.md"],
    ["hirsch-affinity-rubric.md", "_staff/hirsch-affinity-rubric.md"],
    ["hirsch-affinity-ranked-list.md", "_staff/hirsch-affinity-ranked-list.md"],
    ["AUTHOR_PROFILE_PRESENTATION_STANDARDS.md", "_staff/legacy/AUTHOR_PROFILE_PRESENTATION_STANDARDS.md"],
  ];

  const miscMoves: Array<[string, string]> = [
    ["committed-voice.md", "_misc/committed-voice.md"],
    ["committed-voice-2026-05-20.md", "_misc/committed-voice-2026-05-20.md"],
    ["digital-presence-discovery.md", "_misc/digital-presence-discovery.md"],
    ["analysis/content-analysis.md", "_misc/analysis-content-analysis.md"],
    ["content-analysis.md", "_misc/content-analysis-root.md"],
    ["network/collaborators.md", "_misc/network/collaborators.md"],
    ["network/endorsements.md", "_misc/network/endorsements.md"],
    ["network/events.md", "_misc/network/events.md"],
    ["network/endorsers.md", "_misc/network/endorsers.md"],
    ["network/movemental-overlap.md", "_misc/network/movemental-overlap.md"],
    ["network/network-summary.md", "_misc/network/network-summary.md"],
  ];

  for (const [from, to] of staffMoves) {
    movePath(join(root, from), join(root, to), dryRun, log);
  }
  for (const [from, to] of miscMoves) {
    movePath(join(root, from), join(root, to), dryRun, log);
  }

  for (const dirName of ["media", "collated", "pdf"]) {
    movePath(join(root, dirName), join(root, "_misc", dirName), dryRun, log);
  }

  for (const name of readdirSync(root)) {
    if (name.endsWith(".html") || name.endsWith(".json") && name.includes("COLLATION")) {
      movePath(join(root, name), join(root, "_misc", "collated", name), dryRun, log);
    }
  }
}

function migrateLegacyContent(root: string, slug: string, dryRun: boolean, log: string[]): void {
  const prefix = slugToEnvPrefix(slug);

  const callingLegacy = join(root, `${prefix}_CALLING_PROFILE.md`);
  const callingCanon = join(root, "profile/calling-profile.md");
  if (copyIfMissing(callingLegacy, callingCanon, dryRun, stripStaffSections)) {
    log.push(`migrate calling → profile/calling-profile.md`);
  }

  const audienceLegacy = join(root, `${prefix}_AUDIENCE_PROFILE.md`);
  const audienceCanon = join(root, "analysis/audience-analysis.md");
  if (copyIfMissing(audienceLegacy, audienceCanon, dryRun, stripStaffSections)) {
    log.push(`migrate audience → analysis/audience-analysis.md`);
  }

  const auditLegacy = join(root, `${prefix}_CONTENT_AUDIT.md`);
  const auditCanon = join(root, "content/content-audit.md");
  if (copyIfMissing(auditLegacy, auditCanon, dryRun, stripStaffSections)) {
    log.push(`migrate content audit → content/content-audit.md`);
  }

  const voiceLegacy = join(root, `${prefix}_VOICE_IDENTITY.md`);
  const voiceCanon = join(root, "profile/voice-analysis.md");
  if (copyIfMissing(voiceLegacy, voiceCanon, dryRun, stripStaffSections)) {
    log.push(`migrate voice → profile/voice-analysis.md`);
  }

  const rootBio = join(root, "biography.md");
  const profileBio = join(root, "profile/biography.md");
  if (existsSync(rootBio) && fileStatus(profileBio) !== "populated") {
    copyIfMissing(rootBio, profileBio, dryRun, stripStaffSections);
    log.push(`migrate root biography.md → profile/biography.md`);
  }
}

function normalizeSlug(slug: string, dryRun: boolean): string[] {
  const root = slugDir(slug);
  const log: string[] = [];

  if (!existsSync(root)) {
    log.push(`SKIP — missing directory ${root}`);
    return log;
  }

  ensureDir(join(root, "profile"));
  ensureDir(join(root, "content"));
  ensureDir(join(root, "analysis"));
  ensureDir(join(root, "digital-presence"));
  ensureDir(join(root, "network"));
  ensureDir(join(root, "_staff", "legacy"));
  ensureDir(join(root, "_misc", "network"));

  migrateLegacyContent(root, slug, dryRun, log);

  if (slug === "liz-rios") {
    splitLizDigitalPresence(root, dryRun, log);
    mergeAffiliations(root, dryRun, log);
  }

  moveStaffAndMisc(root, dryRun, log);
  archiveLegacyRoot(root, slug, dryRun, log);

  for (const rel of CANONICAL_RESEARCH_PATHS) {
    const full = join(root, rel);
    if (fileStatus(full) === "missing") {
      writeEmptyStub(full, SIDEBAR_FOR_PATH[rel] ?? rel, slug, dryRun);
      log.push(`stub ${rel}`);
    }
  }

  const ru = reflectedUnderstandingPath(slug);
  if (!existsSync(ru)) {
    writeEmptyStub(ru, "a-letter", slug, dryRun);
    log.push(`stub reflected-understanding/${slug}.md`);
  }

  const readme = generateReadme(slug, root);
  const readmePath = join(root, "README.md");
  if (!dryRun) writeFileSync(readmePath, readme, "utf8");
  else log.push(`write README.md`);

  return log;
}

function main(): void {
  const { slug: onlySlug, dryRun } = parseArgs();
  const slugs = onlySlug
    ? TENANT_RESEARCH_SLUGS.filter((s) => s === onlySlug)
    : [...TENANT_RESEARCH_SLUGS];

  if (onlySlug && slugs.length === 0) {
    console.error(`Unknown slug: ${onlySlug}`);
    process.exit(1);
  }

  if (dryRun) console.log("DRY RUN — no files will be modified\n");

  for (const slug of slugs) {
    console.log(`\n=== ${slug} ===`);
    const actions = normalizeSlug(slug, dryRun);
    for (const a of actions) console.log(`  ${a}`);
  }

  console.log("\nDone.");
}

main();
