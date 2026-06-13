#!/usr/bin/env tsx
/**
 * Regenerate docs/captures/platform-manifest.json static routes from App Router pages.
 * Preserves dynamic-route samples and agent action shots from the existing manifest.
 */

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

type Shot = {
  id: string;
  group: string;
  file: string;
  path: string;
  fullPage: boolean;
  requiresAuth?: boolean;
  optional?: boolean;
  waitMs?: number;
  actions?: unknown[];
};

type Manifest = {
  baseUrl: string;
  signInPath: string;
  outputDir: string;
  viewport: { width: number; height: number };
  notes?: string;
  shots: Shot[];
};

const APP_ROOT = join(process.cwd(), "src/app");
const MANIFEST_PATH = join(process.cwd(), "docs/captures/platform-manifest.json");

const GROUP_BY_PREFIX: [string, string][] = [
  ["/agent/", "agent"],
  ["/agent", "agent"],
  ["/research/", "research"],
  ["/research", "research"],
  ["/dashboard/", "auth"],
  ["/dashboard", "auth"],
  ["/program/", "auth"],
  ["/program", "auth"],
  ["/login", "utility"],
  ["/signup", "utility"],
  ["/forgot-password", "utility"],
  ["/auth/", "utility"],
  ["/newsletter/", "utility"],
  ["/share/", "utility"],
  ["/team-invite/", "utility"],
];

const SKIP_SEGMENTS = new Set(["(paper)", "(studio)", "(public)", "(site)"]);

function groupForPath(path: string): string {
  for (const [prefix, group] of GROUP_BY_PREFIX) {
    if (path === prefix || path.startsWith(prefix)) return group;
  }
  return "public";
}

function slugifySegment(segment: string): string {
  return segment.replace(/^\[/, "").replace(/\]$/, "").replace(/\.\.\./, "param");
}

function discoverStaticRoutes(dir: string, segments: string[] = []): string[] {
  const routes: string[] = [];
  const pageTsx = join(dir, "page.tsx");
  const pageTs = join(dir, "page.ts");
  if ((existsSync(pageTsx) || existsSync(pageTs)) && segments.length === 0) {
    routes.push("/");
  }

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry.startsWith("_")) continue;

    const nextSegments = SKIP_SEGMENTS.has(entry) ? segments : [...segments, entry];
    const pageTsx = join(full, "page.tsx");
    const pageTs = join(full, "page.ts");
    if (existsSync(pageTsx) || existsSync(pageTs)) {
      const hasDynamic = nextSegments.some((s) => s.includes("[") || s.includes("]"));
      if (!hasDynamic) {
        routes.push("/" + nextSegments.filter(Boolean).join("/"));
      }
    }
    routes.push(...discoverStaticRoutes(full, nextSegments));
  }
  return routes;
}

function defaultShot(path: string, index: number): Shot {
  const group = groupForPath(path);
  const slug = path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
  const auth =
    path.startsWith("/dashboard") ||
    path.startsWith("/program") ||
    path === "/agent-runtime" ||
    path.startsWith("/agent-runtime/");
  const groupOverride = path === "/agent-runtime" || path.startsWith("/agent-runtime/") ? "auth" : group;
  return {
    id: `${groupOverride}-${slug.replace(/[^a-z0-9-]+/gi, "-")}`,
    group: groupOverride,
    file: `${groupOverride}/${String(index).padStart(2, "0")}-${slug.replace(/[^a-z0-9-]+/gi, "-")}.png`,
    path,
    fullPage: !path.startsWith("/agent") || path !== "/agent",
    requiresAuth: auth || undefined,
    waitMs: path === "/agent" ? 2200 : undefined,
  };
}

function loadPreservedShots(existing: Manifest | null): Shot[] {
  if (!existing) return [];
  return existing.shots.filter((shot) => {
    if (shot.path.includes("[") || shot.path.includes("]")) return true;
    if (shot.actions?.length) return true;
    if (shot.path.includes("?")) return true;
    // Keep explicit auth/program/research samples not discoverable as static pages
    if (/^\/research\/[^/]+$/.test(shot.path)) return true;
    if (/^\/program\/[^/]+\/[^/]+$/.test(shot.path)) return true;
    if (/^\/dashboard\/onboarding\//.test(shot.path)) return true;
    return false;
  });
}

function main() {
  const staticPaths = [...new Set(discoverStaticRoutes(APP_ROOT))].sort();
  const existing: Manifest | null = existsSync(MANIFEST_PATH)
    ? (JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest)
    : null;

  const preserved = loadPreservedShots(existing);
  const preservedPaths = new Set(preserved.map((s) => s.path));

  const generated: Shot[] = [];
  let i = 1;
  for (const path of staticPaths) {
    if (preservedPaths.has(path)) continue;
    // Skip token routes — need live tokens
    if (path.includes("[token]")) continue;
    generated.push(defaultShot(path, i++));
  }

  const shots = [...generated, ...preserved].sort((a, b) => {
    if (a.group !== b.group) return a.group.localeCompare(b.group);
    return a.path.localeCompare(b.path);
  });

  const manifest: Manifest = {
    baseUrl: existing?.baseUrl ?? "http://localhost:3000",
    signInPath: existing?.signInPath ?? "/login",
    outputDir: existing?.outputDir ?? "./docs/captures/output",
    viewport: existing?.viewport ?? { width: 1440, height: 900 },
    notes:
      "Generated static routes + preserved dynamic/action shots. Re-run pnpm captures:manifest after route changes.",
    shots,
  };

  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${MANIFEST_PATH}`);
  console.log(`Static routes: ${generated.length}, preserved: ${preserved.length}, total: ${shots.length}`);
  console.log(`App root scanned: ${relative(process.cwd(), APP_ROOT)}`);
}

main();
