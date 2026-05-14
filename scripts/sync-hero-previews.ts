/**
 * Copies optional audience homepage HTML into `public/hero-previews/` for home hero iframe previews.
 *
 * Source HTML lives under the Core `1-html` library (`labs/movemental-ai/docs-templates/`) or legacy
 * `docs/templates/`. When sources are missing (e.g. Vercel without sibling `1-html`), writes minimal
 * stubs so `prebuild` still passes.
 *
 * Run via `pnpm sync:hero-previews` or automatically before `pnpm dev` / `pnpm prebuild`.
 */
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  tryResolveMovementalDocsHtmlRoot,
  tryResolveMovementalDocsTemplatesRoot,
} from "../src/lib/dev-paths/movemental-static-html-roots";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "public", "hero-previews");

const AUDIENCE_KEYS = ["nonprofits", "churches", "institutions"] as const;

/** Optional static HTML for audience iframe previews; absent files produce a stub. */
const AUDIENCE_PREVIEW_STUB = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Hero preview</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; margin: 0; }
  </style>
</head>
<body>
  <p>No static preview HTML found. Add audience preview HTML under the Core <code>1-html/labs/movemental-ai/docs-templates/audience-previews/</code> tree (or set <code>MOVEMENTAL_DOCS_TEMPLATES_ROOT</code>).</p>
</body>
</html>
`;

const LEADERS_INDEX_STUB = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Leaders hero preview</title>
  <link rel="stylesheet" href="./site-theme.css" />
</head>
<body>
  <p>No Alan Hirsch preview HTML in the Core templates tree. Commit <code>external/1-html</code> or set <code>MOVEMENTAL_DOCS_TEMPLATES_ROOT</code> for full previews.</p>
  <script src="./site-shell.js"></script>
</body>
</html>
`;

const SITE_THEME_STUB = `/* sync-hero-previews: docs-html lab not available */\nbody { margin: 0; font-family: system-ui, sans-serif; }\n`;
const SITE_SHELL_STUB = `"use strict";\n`;

async function copyAudiencePreviewOrStub(srcPath: string, destPath: string) {
  try {
    await copyFile(srcPath, destPath);
  } catch {
    console.warn(`sync-hero-previews: missing ${srcPath} — writing stub`);
    await writeFile(destPath, AUDIENCE_PREVIEW_STUB, "utf8");
  }
}

function rewriteVendoredAssets(html: string): string {
  return html
    .replaceAll('href="../../../docs/html/site-templates/site-theme.css"', 'href="./site-theme.css"')
    .replaceAll('src="../../../docs/html/site-templates/site-shell.js"', 'src="./site-shell.js"');
}

async function main() {
  const templatesRoot = tryResolveMovementalDocsTemplatesRoot(root);
  const docsHtmlRoot = tryResolveMovementalDocsHtmlRoot(root);

  if (!templatesRoot) {
    console.warn(
      "sync-hero-previews: Movemental docs-templates tree not found — audience + leaders HTML use stubs (CI/Vercel OK).",
    );
  }
  if (!docsHtmlRoot) {
    console.warn(
      "sync-hero-previews: Movemental docs-html tree not found — site-theme.css / site-shell.js use stubs (CI/Vercel OK).",
    );
  }

  await mkdir(join(out, "leaders"), { recursive: true });
  await mkdir(join(out, "nonprofits"), { recursive: true });
  await mkdir(join(out, "churches"), { recursive: true });
  await mkdir(join(out, "institutions"), { recursive: true });

  for (const key of AUDIENCE_KEYS) {
    const destPath = join(out, key, "index.html");
    if (!templatesRoot) {
      await writeFile(destPath, AUDIENCE_PREVIEW_STUB, "utf8");
      continue;
    }
    const srcPath = join(templatesRoot, "audience-previews", `${key}.html`);
    await copyAudiencePreviewOrStub(srcPath, destPath);
  }

  const alanHirschPages = templatesRoot ? join(templatesRoot, "alan-hirsch", "pages") : null;
  const fallbackLeadersHtml = templatesRoot
    ? join(templatesRoot, "alan-hirsch", "exemplars", "exemplar-landing-general.html")
    : null;

  let pageFiles: string[] = [];
  if (alanHirschPages) {
    try {
      pageFiles = (await readdir(alanHirschPages)).filter((f) => f.endsWith(".html"));
    } catch {
      pageFiles = [];
    }
  }

  if (pageFiles.length > 0 && alanHirschPages) {
    for (const name of pageFiles) {
      const raw = await readFile(join(alanHirschPages, name), "utf8");
      await writeFile(join(out, "leaders", name), rewriteVendoredAssets(raw), "utf8");
    }
  } else if (fallbackLeadersHtml) {
    try {
      const raw = await readFile(fallbackLeadersHtml, "utf8");
      await writeFile(join(out, "leaders", "index.html"), rewriteVendoredAssets(raw), "utf8");
    } catch {
      console.warn(
        `sync-hero-previews: could not read ${fallbackLeadersHtml} — writing leaders stub`,
      );
      await writeFile(join(out, "leaders", "index.html"), rewriteVendoredAssets(LEADERS_INDEX_STUB), "utf8");
    }
  } else {
    console.warn("sync-hero-previews: no templates root or exemplar — writing leaders stub");
    await writeFile(join(out, "leaders", "index.html"), rewriteVendoredAssets(LEADERS_INDEX_STUB), "utf8");
  }

  const siteThemeSrc = docsHtmlRoot ? join(docsHtmlRoot, "site-templates", "site-theme.css") : null;
  const siteShellSrc = docsHtmlRoot ? join(docsHtmlRoot, "site-templates", "site-shell.js") : null;

  try {
    if (siteThemeSrc) await copyFile(siteThemeSrc, join(out, "leaders", "site-theme.css"));
    else throw new Error("no docs-html");
  } catch {
    await writeFile(join(out, "leaders", "site-theme.css"), SITE_THEME_STUB, "utf8");
  }

  try {
    if (siteShellSrc) await copyFile(siteShellSrc, join(out, "leaders", "site-shell.js"));
    else throw new Error("no docs-html");
  } catch {
    await writeFile(join(out, "leaders", "site-shell.js"), SITE_SHELL_STUB, "utf8");
  }

  console.log("sync-hero-previews: wrote", out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
