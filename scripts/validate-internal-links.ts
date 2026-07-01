#!/usr/bin/env tsx
/**
 * Scans `src/` for internal hrefs and verifies each resolves to a live route,
 * public asset, or known redirect source in next.config.ts.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "src");
const APP_DIR = join(SRC_DIR, "app");
const CONFIG_PATH = join(ROOT, "next.config.ts");
const PUBLIC_DIR = join(ROOT, "public");

const HREF_RE = /href=["'{](\/[^"'#?}]+)/g;

function parseRedirectSources(config: string): Set<string> {
  const sources = new Set<string>();
  const re = /source:\s*["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(config)) !== null) {
    sources.add(m[1]!);
  }
  return sources;
}

function collectPageRoutes(dir: string, segments: string[] = []): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "api") continue;
      const nextSeg =
        entry.startsWith("(") && entry.endsWith(")") ? segments : [...segments, entry];
      routes.push(...collectPageRoutes(full, nextSeg));
    } else if (entry === "page.tsx") {
      routes.push(segments.length === 0 ? "/" : `/${segments.join("/")}`);
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

function matchesLiveRoute(pathname: string, routePatterns: string[]): boolean {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/") return routePatterns.includes("/");
  return routePatterns.some((pattern) => routePatternToRegex(pattern).test(normalized));
}

function isPublicAsset(pathname: string): boolean {
  const rel = pathname.replace(/^\//, "");
  return existsSync(join(PUBLIC_DIR, rel));
}

function walkFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules") continue;
      walkFiles(full, acc);
    } else if (/\.(tsx?|jsx?|mdx)$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

function main(): void {
  const config = readFileSync(CONFIG_PATH, "utf-8");
  const redirectSources = parseRedirectSources(config);
  const pageRoutes = collectPageRoutes(APP_DIR);
  const failures: string[] = [];
  const checked = new Set<string>();

  for (const file of walkFiles(SRC_DIR)) {
    const content = readFileSync(file, "utf-8");
    let m: RegExpExecArray | null;
    HREF_RE.lastIndex = 0;
    while ((m = HREF_RE.exec(content)) !== null) {
      const href = m[1]!;
      if (href.startsWith("/api/")) continue;
      if (checked.has(href)) continue;
      checked.add(href);

      if (matchesLiveRoute(href, pageRoutes) || isPublicAsset(href)) continue;

      const hasRedirect = [...redirectSources].some((source) => {
        if (!source.includes(":")) return source === href;
        const pattern = source
          .replace(/:[^/]+/g, "[^/]+")
          .replace(/\*/g, ".*");
        return new RegExp(`^${pattern}$`).test(href);
      });

      if (hasRedirect) continue;

      failures.push(`${href} (from ${relative(ROOT, file)})`);
    }
  }

  if (failures.length > 0) {
    console.error("link:check FAILED — unresolved internal hrefs:\n");
    for (const f of failures.slice(0, 50)) console.error(`  • ${f}`);
    if (failures.length > 50) {
      console.error(`  … and ${failures.length - 50} more`);
    }
    process.exit(1);
  }

  console.log(
    JSON.stringify(
      {
        status: "LOCKED",
        hrefsChecked: checked.size,
        message: `All ${checked.size} unique internal hrefs resolve.`,
      },
      null,
      2,
    ),
  );
}

main();
