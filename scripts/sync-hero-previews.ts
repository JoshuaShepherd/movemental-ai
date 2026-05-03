/**
 * Copies Stitch homepage HTML + optional Alan Hirsch static `pages/*.html` shell
 * into `public/hero-previews/` for home hero iframe previews.
 *
 * If `templates/alan-hirsch/pages/` is missing or has no `.html` files (e.g. after
 * removing the sibling template tree), `leaders/index.html` is generated from
 * `templates/alan-hirsch/exemplars/exemplar-landing-general.html` so Vercel `prebuild` still passes.
 *
 * Run via `pnpm sync:hero-previews` or automatically before `pnpm dev` / `pnpm prebuild`.
 */
import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "public", "hero-previews");

const STITCH = {
  nonprofits: join(root, "templates/stitch/unified-mission-system/html/movemental-homepage.html"),
  churches: join(root, "templates/stitch/church-formation-system/html/movemental-homepage-mockup.html"),
  institutions: join(
    root,
    "templates/stitch/institutional-intelligence-system/html/movemental-institutional-intelligence-homepage.html"
  ),
} as const;

/** Static shell pages (optional). When empty/removed, leaders preview uses `FALLBACK_LEADERS_HTML`. */
const ALAN_HIRSCH_PAGES = join(root, "templates/alan-hirsch/pages");
/** Exemplar HTML copied to `public/hero-previews/leaders/index.html` when `pages/` has no `.html` files. */
const FALLBACK_LEADERS_HTML = join(
  root,
  "templates/alan-hirsch/exemplars/exemplar-landing-general.html"
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

  for (const [key, srcPath] of Object.entries(STITCH)) {
    await copyFile(srcPath, join(out, key, "index.html"));
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
