/**
 * Copies optional audience homepage HTML into `public/hero-previews/` for home hero iframe previews.
 *
 * When source HTML under `docs/templates/` is missing, writes a minimal stub so `prebuild` still passes.
 *
 * If `docs/templates/alan-hirsch/pages/` is missing or has no `.html` files (e.g. after
 * removing the sibling template tree), `leaders/index.html` is generated from
 * `docs/templates/alan-hirsch/exemplars/exemplar-landing-general.html` so Vercel `prebuild` still passes.
 *
 * Run via `pnpm sync:hero-previews` or automatically before `pnpm dev` / `pnpm prebuild`.
 */
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "public", "hero-previews");

/** Optional static HTML for audience iframe previews; absent files produce a stub. */
const AUDIENCE_PREVIEW_HTML = {
  nonprofits: join(root, "docs/templates/audience-previews/nonprofits.html"),
  churches: join(root, "docs/templates/audience-previews/churches.html"),
  institutions: join(root, "docs/templates/audience-previews/institutions.html"),
} as const;

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
  <p>No static preview HTML found. Add <code>docs/templates/audience-previews/&lt;audience&gt;.html</code> or adjust <code>scripts/sync-hero-previews.ts</code>.</p>
</body>
</html>
`;

async function copyAudiencePreviewOrStub(srcPath: string, destPath: string) {
  try {
    await copyFile(srcPath, destPath);
  } catch {
    console.warn(`sync-hero-previews: missing ${srcPath} — writing stub`);
    await writeFile(destPath, AUDIENCE_PREVIEW_STUB, "utf8");
  }
}

/** Static shell pages (optional). When empty/removed, leaders preview uses `FALLBACK_LEADERS_HTML`. */
const ALAN_HIRSCH_PAGES = join(root, "docs/templates/alan-hirsch/pages");
/** Exemplar HTML copied to `public/hero-previews/leaders/index.html` when `pages/` has no `.html` files. */
const FALLBACK_LEADERS_HTML = join(
  root,
  "docs/templates/alan-hirsch/exemplars/exemplar-landing-general.html"
);
const SITE_THEME = join(root, "docs/html/site-templates/site-theme.css");
const SITE_SHELL = join(root, "docs/html/site-templates/site-shell.js");

function rewriteVendoredAssets(html: string): string {
  return html
    .replaceAll('href="../../../docs/html/site-templates/site-theme.css"', 'href="./site-theme.css"')
    .replaceAll('src="../../../docs/html/site-templates/site-shell.js"', 'src="./site-shell.js"');
}

async function main() {
  await mkdir(join(out, "leaders"), { recursive: true });
  await mkdir(join(out, "nonprofits"), { recursive: true });
  await mkdir(join(out, "churches"), { recursive: true });
  await mkdir(join(out, "institutions"), { recursive: true });

  for (const [key, srcPath] of Object.entries(AUDIENCE_PREVIEW_HTML)) {
    await copyAudiencePreviewOrStub(srcPath, join(out, key, "index.html"));
  }

  let pageFiles: string[] = [];
  try {
    pageFiles = (await readdir(ALAN_HIRSCH_PAGES)).filter((f) => f.endsWith(".html"));
  } catch {
    pageFiles = [];
  }

  if (pageFiles.length === 0) {
    console.warn(
      `sync-hero-previews: no HTML in ${ALAN_HIRSCH_PAGES} — writing leaders/index.html from ${FALLBACK_LEADERS_HTML}`
    );
    const raw = await readFile(FALLBACK_LEADERS_HTML, "utf8");
    await writeFile(join(out, "leaders", "index.html"), rewriteVendoredAssets(raw), "utf8");
  } else {
    for (const name of pageFiles) {
      const raw = await readFile(join(ALAN_HIRSCH_PAGES, name), "utf8");
      await writeFile(join(out, "leaders", name), rewriteVendoredAssets(raw), "utf8");
    }
  }
  await copyFile(SITE_THEME, join(out, "leaders", "site-theme.css"));
  await copyFile(SITE_SHELL, join(out, "leaders", "site-shell.js"));

  console.log("sync-hero-previews: wrote", out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
