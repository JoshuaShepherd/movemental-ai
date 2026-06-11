#!/usr/bin/env tsx
/**
 * Validates that every static redirect destination in next.config.ts resolves to
 * a live App Router page or a file under public/.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(__dirname, "..");
const APP_DIR = join(ROOT, "src", "app");
const CONFIG_PATH = join(ROOT, "next.config.ts");
const PUBLIC_DIR = join(ROOT, "public");

type RedirectRule = { source: string; destination: string };

function parseRedirects(config: string): RedirectRule[] {
  const rules: RedirectRule[] = [];
  const re =
    /source:\s*["']([^"']+)["'],\s*\n\s*destination:\s*["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(config)) !== null) {
    rules.push({ source: m[1]!, destination: m[2]! });
  }
  return rules;
}

function collectPageRoutes(dir: string, segments: string[] = []): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry.startsWith("api")) continue;
      const nextSeg =
        entry.startsWith("(") && entry.endsWith(")") ? segments : [...segments, entry];
      routes.push(...collectPageRoutes(full, nextSeg));
    } else if (entry === "page.tsx") {
      const path = segments.length === 0 ? "/" : `/${segments.join("/")}`;
      routes.push(path);
    }
  }
  return routes;
}

function routePatternToRegex(route: string): RegExp {
  const parts = route.split("/").filter(Boolean);
  const reParts = parts.map((p) => {
    if (p.startsWith("[") && p.endsWith("]")) return "[^/]+";
    return p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  });
  return new RegExp(`^/${reParts.join("/")}/?$`);
}

function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0] ?? path;
  if (withoutQuery === "/") return "/";
  return withoutQuery.replace(/\/+$/, "") || "/";
}

function isPublicAsset(pathname: string): boolean {
  if (!pathname.startsWith("/")) return false;
  const rel = pathname.slice(1);
  return existsSync(join(PUBLIC_DIR, rel));
}

function matchesLiveRoute(pathname: string, routePatterns: string[]): boolean {
  const normalized = normalizePath(pathname);
  if (normalized === "/") return routePatterns.includes("/");
  return routePatterns.some((pattern) => routePatternToRegex(pattern).test(normalized));
}

function resolveRedirectChain(
  destination: string,
  rules: RedirectRule[],
  visited: Set<string> = new Set(),
): string {
  const path = normalizePath(destination);
  if (visited.has(path)) return path;
  visited.add(path);

  const rule = rules.find((r) => {
    if (!r.source.includes(":")) {
      return normalizePath(r.source) === path;
    }
    return false;
  });

  if (!rule) return path;
  return resolveRedirectChain(rule.destination, rules, visited);
}

function main(): void {
  const config = readFileSync(CONFIG_PATH, "utf-8");
  const rules = parseRedirects(config);
  const pageRoutes = collectPageRoutes(APP_DIR);

  const failures: string[] = [];

  for (const rule of rules) {
    const terminal = resolveRedirectChain(rule.destination, rules);
    const terminalPath = normalizePath(terminal);

    if (terminalPath.includes(":")) {
      failures.push(
        `${rule.source} → ${rule.destination} (terminal ${terminalPath} has dynamic segments)`,
      );
      continue;
    }

    if (matchesLiveRoute(terminalPath, pageRoutes) || isPublicAsset(terminalPath)) {
      continue;
    }

    failures.push(
      `${rule.source} → ${rule.destination} (terminal ${terminalPath} — no page.tsx or public file)`,
    );
  }

  if (failures.length > 0) {
    console.error("redirects:check FAILED — unresolved destinations:\n");
    for (const f of failures) console.error(`  • ${f}`);
    console.error(`\nLive routes (${pageRoutes.length}):`);
    for (const r of pageRoutes.sort()) console.error(`  ${r}`);
    process.exit(1);
  }

  console.log(
    JSON.stringify(
      {
        status: "LOCKED",
        rules: rules.length,
        liveRoutes: pageRoutes.length,
        message: `All ${rules.length} redirect destinations resolve to live pages or public assets.`,
      },
      null,
      2,
    ),
  );
}

main();
