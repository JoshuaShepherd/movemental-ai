import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Canonical static HTML / template lab for Movemental lives in the monorepo-wide
 * `01-Movemental-Core/1-html` tree (sibling of this repo), or in-repo at
 * `external/1-html` (optional git submodule) for CI/Vercel.
 *
 * Override with `MOVEMENTAL_STATIC_HTML_ROOT` / `MOVEMENTAL_DOCS_TEMPLATES_ROOT`
 * when the default layout does not apply.
 */
const LABS = join("labs", "movemental-ai");

function firstExistingDir(candidates: string[]): string | null {
  for (const c of candidates) {
    if (c && existsSync(c)) return c;
  }
  return null;
}

/** Root of the former `docs/html/**` tree (contains `site-templates/`, prototypes, etc.). */
export function resolveMovementalDocsHtmlRoot(repoRoot: string): string {
  const fromEnv = process.env.MOVEMENTAL_STATIC_HTML_ROOT?.trim();
  if (fromEnv && existsSync(fromEnv)) return fromEnv;

  const hit = firstExistingDir([
    join(repoRoot, "external", "1-html", LABS, "docs-html"),
    join(repoRoot, "..", "1-html", LABS, "docs-html"),
  ]);
  if (hit) return hit;

  const legacy = join(repoRoot, "docs", "html");
  if (existsSync(join(legacy, "site-templates", "site-theme.css"))) return legacy;

  throw new Error(
    [
      "Movemental static HTML lab not found.",
      "Expected one of:",
      "  - sibling ../1-html/labs/movemental-ai/docs-html (Core checkout)",
      "  - external/1-html/labs/movemental-ai/docs-html (git submodule)",
      "  - MOVEMENTAL_STATIC_HTML_ROOT pointing at that docs-html directory",
    ].join("\n"),
  );
}

/** Root of the former `docs/templates/**` tree (Alan Hirsch exemplars, audience previews). */
export function resolveMovementalDocsTemplatesRoot(repoRoot: string): string {
  const fromEnv = process.env.MOVEMENTAL_DOCS_TEMPLATES_ROOT?.trim();
  if (fromEnv && existsSync(fromEnv)) return fromEnv;

  const hit = firstExistingDir([
    join(repoRoot, "external", "1-html", LABS, "docs-templates"),
    join(repoRoot, "..", "1-html", LABS, "docs-templates"),
  ]);
  if (hit) return hit;

  const legacy = join(repoRoot, "docs", "templates");
  if (existsSync(join(legacy, "alan-hirsch", "exemplars"))) return legacy;

  throw new Error(
    [
      "Movemental docs templates tree not found.",
      "Expected ../1-html/labs/movemental-ai/docs-templates or MOVEMENTAL_DOCS_TEMPLATES_ROOT.",
    ].join("\n"),
  );
}
