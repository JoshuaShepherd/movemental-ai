/**
 * Build local agent-orchestration HTML reader into gitignored viewer/ output.
 *
 *   pnpm agent-orchestration:viewer:build
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const PACK_ROOT = path.join(REPO_ROOT, "docs/build/agent-orchestration");
const TEMPLATE_DIR = path.join(__dirname, "agent-orchestration-viewer");
const OUT_DIR = path.join(PACK_ROOT, "viewer");

const SKIP_DIRS = new Set(["viewer", "node_modules", ".git"]);

/** Pinned first within a nav group (execution prompts, runbooks). */
const PINNED_GROUP_DOCS: Record<string, string[]> = {
  "page-scripts": ["page-scripts/00-00-execution-prompt.md"],
};

const GROUP_RULES = [
  { id: "page-scripts", label: "Page scripts (plain English)", prefix: "page-scripts/" },
  { id: "audits", label: "Audits & QA", prefix: "audits/" },
  { id: "start", label: "Start here", prefix: "", rootOnly: true },
  { id: "ssot", label: "SSOT & reference", prefix: "ssot/" },
  { id: "engine", label: "Engine & prompts", prefix: "engine/" },
  { id: "prompts", label: "Implementation prompts", prefix: "prompts/" },
  { id: "policy", label: "Policy & parity", prefix: "policy/" },
  { id: "design", label: "Design canon", prefix: "design/" },
  { id: "adr", label: "ADR", prefix: "adr/" },
];

const READING_ORDER = [
  {
    path: "page-scripts/00-00-execution-prompt.md",
    why: "Queued agent prompt — definitive fixes from page-script audit (run before other work)",
  },
  { path: "page-scripts/README.md", why: "Per-screen plain-English walkthroughs — start here for visitor experience" },
  { path: "page-scripts/00-room-arrival-and-routing.md", why: "Shell, dock, and global routing before any screen" },
  { path: "page-scripts/00-composer-drawer-global.md", why: "Shared composer/dock mechanics for every screen" },
  { path: "overview.md", why: "Mental model, routing tree, redesign levers" },
  { path: "ssot/agent-platform-complete-reference.md", why: "Topology, screens, engine tools" },
  { path: "ssot/agent-room-conversation-choreography-model-ssot.md", why: "Caption vs thread invariants I1–I6" },
  { path: "policy/agent-room-handoff.md", why: "Hybrid local vs SSE handoff" },
  { path: "engine/README.md", why: "Prompt edit → seed workflow" },
  { path: "engine/prompts/room-host.md", why: "Live host system prompt" },
  { path: "ssot/movemental-ui-ai-design-consultation-2026-06-18.md", why: "Strategic tensions & AU pack source" },
  { path: "documentation-index.md", why: "Full SSOT registry" },
];

const LAYERS = [
  { id: "0", name: "Invariants", summary: "I1–I6 caption/thread rules, closed ScreenId", files: "caption-validator.ts, choreography SSOT" },
  { id: "1", name: "Runtime mode", summary: "hybrid | stub | stream", files: "src/lib/agent-room/mode.ts" },
  { id: "2", name: "Classification", summary: "LOCAL vs AGENT routing", files: "move-classifier.ts, route-input.ts, composer-routing.ts" },
  { id: "3", name: "Local choreography", summary: "SCENES data + act runner", files: "data/scenes.ts, scene-runner.ts" },
  { id: "4", name: "Live agent", summary: "room-host + tools via SSE", files: "use-agent-room-hybrid.ts, agent-stream-turn.ts" },
  { id: "5", name: "Presentation", summary: "Dock collapsed/expanded", files: "shell/agent-dock.tsx, discuss-thread.tsx" },
  { id: "6", name: "Capture", summary: "Forms, enroll, assess handoff", files: "capture.ts, suggest-chip-targets.ts" },
];

const REDESIGN_LEVERS = [
  { risk: "Low", lever: "Flip collapsed chip routing", files: "composer-routing.ts", effect: "Opening chips → AGENT not local scenes" },
  { risk: "Low", lever: "Narrow regex table", files: "route-input.ts", effect: "Fewer typed messages trigger show acts" },
  { risk: "Medium", lever: "Prose-first host prompt", files: "room-host.md + seed", effect: "Default text_delta without ui_render" },
  { risk: "Medium", lever: "Discuss on by default", files: "discuss.ts + env", effect: "Long-form thread mode" },
  { risk: "High", lever: "Revise I1–I6", files: "choreography SSOT + dock", effect: "Split layout or inline answers on sheet" },
];

function titleFromMarkdown(filePath, content) {
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/\*+/g, "").trim();
  const base = path.basename(filePath, ".md");
  return base.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function badgeFor(pathRel) {
  if (pathRel === "overview.md") return "start";
  if (pathRel.includes("ssot") && pathRel.includes("choreography")) return "ssot";
  if (pathRel.endsWith("room-host.md")) return "prompt";
  if (pathRel.includes("phase1") || pathRel.includes("2026-06-15")) return "hist";
  return "";
}

function walkPack(relDir = "") {
  /** @type {Array<{ rel: string; abs: string }>} */
  const files = [];
  const absDir = path.join(PACK_ROOT, relDir);
  if (!fs.existsSync(absDir)) return files;

  for (const ent of fs.readdirSync(absDir, { withFileTypes: true })) {
    if (ent.name.startsWith(".") || SKIP_DIRS.has(ent.name)) continue;
    const relPath = (relDir ? `${relDir}/` : "") + ent.name;
    const absPath = path.join(absDir, ent.name);

    let st;
    try {
      st = fs.statSync(absPath);
    } catch {
      continue;
    }

    if (st.isDirectory()) {
      files.push(...walkPack(relPath));
    } else if (ent.name.endsWith(".md")) {
      files.push({ rel: relPath.replace(/\\/g, "/"), abs: absPath });
    }
  }
  return files;
}

function relPackPath(absPath, packRel) {
  return packRel.replace(/\\/g, "/");
}

function groupFor(relPath) {
  if (relPath.startsWith("page-scripts/")) return "page-scripts";
  if (["overview.md", "README.md", "documentation-index.md", "movemental-room-script.md"].includes(relPath)) {
    return "start";
  }
  for (const rule of GROUP_RULES) {
    if (rule.prefix && relPath.startsWith(rule.prefix)) return rule.id;
  }
  if (relPath.startsWith("engine")) return "engine";
  if (relPath.startsWith("prompts")) return "prompts";
  return "ssot";
}

function groupMeta(id) {
  const descriptions = {
    "page-scripts":
      "Plain-English script overviews — one file per screen, step-by-step visitor experience.",
    audits: "Live-site audits, missing assets, and generation briefs for demo templates.",
    start: "Overview, pack README, documentation index, visitor script.",
    ssot: "Behavioral single sources of truth — platform reference, choreography, chat UI, consultation.",
    engine: "Human-editable engine construction: host prompt, tools, corpus, runtime assembly.",
    prompts: "AU consultation prompts, parity packs, integration and migration runners.",
    policy: "Hybrid handoff ADR, stub/stream parity matrix, sign-off notes.",
    design: "Ink Band visual charter for the agent room.",
    adr: "Component-level architecture decision record.",
  };
  const rule = GROUP_RULES.find((r) => r.id === id);
  return { label: rule?.label ?? id, description: descriptions[id] ?? "" };
}

function buildManifest(documents) {
  /** @type {Map<string, typeof documents>} */
  const byGroup = new Map();
  for (const doc of documents) {
    const g = doc.group;
    if (!byGroup.has(g)) byGroup.set(g, []);
    byGroup.get(g).push(doc);
  }

  const order = ["page-scripts", "audits", "start", "ssot", "engine", "prompts", "policy", "design", "adr"];
  const groups = order
    .filter((id) => byGroup.has(id))
    .map((id) => {
      const meta = groupMeta(id);
      const pinned = PINNED_GROUP_DOCS[id] ?? [];
      const docs = byGroup.get(id).sort((a, b) => {
        const ai = pinned.indexOf(a.path);
        const bi = pinned.indexOf(b.path);
        if (ai !== -1 || bi !== -1) {
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        }
        return a.title.localeCompare(b.title);
      });
      return { id, label: meta.label, description: meta.description, documents: docs };
    });

  return {
    generatedAt: new Date().toISOString(),
    packRoot: "docs/build/agent-orchestration",
    stats: { documentCount: documents.length },
    readingOrder: READING_ORDER,
    layers: LAYERS,
    redesignLevers: REDESIGN_LEVERS,
    groups,
    documents,
  };
}

function main() {
  const packFiles = walkPack();
  const seen = new Set();
  /** @type {Array<{path:string,title:string,group:string,badge:string}>} */
  const documents = [];

  for (const { rel, abs } of packFiles) {
    if (rel.startsWith("viewer/")) continue;
    const key = rel.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    let content = "";
    try {
      content = fs.readFileSync(abs, "utf8");
    } catch {
      continue;
    }

    const relPath = relPackPath(abs, rel);
    documents.push({
      path: relPath,
      title: titleFromMarkdown(relPath, content),
      group: groupFor(relPath),
      badge: badgeFor(relPath),
    });
  }

  documents.sort((a, b) => a.path.localeCompare(b.path));

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const file of ["index.html", "styles.css", "app.js"]) {
    fs.copyFileSync(path.join(TEMPLATE_DIR, file), path.join(OUT_DIR, file));
  }

  const manifest = buildManifest(documents);
  fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));

  console.error(`Built viewer: ${documents.length} docs → ${OUT_DIR}`);
  console.log(OUT_DIR);
}

main();
