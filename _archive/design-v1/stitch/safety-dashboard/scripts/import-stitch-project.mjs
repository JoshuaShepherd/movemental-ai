#!/usr/bin/env node
/**
 * Import all screens from a Stitch project into docs/stitch/safety-dashboard/.
 * Requires STITCH_API_KEY (from stitch.withgoogle.com → Settings).
 *
 * Usage: STITCH_API_KEY=... node scripts/import-stitch-project.mjs [projectId]
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const projectId = process.argv[2] ?? "8694957891602637085";
const API_KEY = process.env.STITCH_API_KEY;

if (!API_KEY) {
  console.error("Set STITCH_API_KEY before running this script.");
  process.exit(1);
}

async function mcpCall(name, args) {
  const res = await fetch("https://stitch.googleapis.com/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  const json = await res.json();
  if (json.result?.isError) {
    throw new Error(`${name}: ${json.result.content?.[0]?.text ?? "unknown error"}`);
  }
  const text = json.result?.content?.[0]?.text;
  if (!text) throw new Error(`${name}: empty response`);
  return JSON.parse(text);
}

function slugify(title, screenId) {
  const base = (title || screenId)
    .toLowerCase()
    .replace(/\|/g, " ")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  return base || screenId.slice(0, 12);
}

function download(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  execSync(`bash "${path.join(root, "scripts/fetch-stitch.sh")}" "${url.replace(/"/g, '\\"')}" "${dest}"`, {
    stdio: "pipe",
    maxBuffer: 50 * 1024 * 1024,
  });
}

let projectTitle = projectId;
try {
  const project = await mcpCall("get_project", { name: `projects/${projectId}` });
  projectTitle = project.title || project.displayName || projectTitle;
} catch {
  // get_project may require OAuth; list_screens + get_screen work with API key
}

const { screens } = await mcpCall("list_screens", { projectId });
console.log(`Importing ${screens.length} screens from ${projectTitle}`);

const outDir = path.join(root, "screens");
fs.mkdirSync(outDir, { recursive: true });

const manifest = {
  projectId,
  projectTitle,
  stitchUrl: `https://stitch.withgoogle.com/projects/${projectId}`,
  fetchedAt: new Date().toISOString(),
  screenCount: screens.length,
  screens: [],
  failures: [],
};

const usedSlugs = new Set();

for (let i = 0; i < screens.length; i++) {
  const s = screens[i];
  const screenId = s.name.split("/").pop();
  let slug = slugify(s.title, screenId);
  if (usedSlugs.has(slug)) slug = `${slug}-${screenId.slice(0, 8)}`;
  usedSlugs.add(slug);

  const fileBase = `${String(i + 1).padStart(2, "0")}-${slug}`;
  process.stdout.write(`[${i + 1}/${screens.length}] ${s.title} ... `);

  try {
    const detail = await mcpCall("get_screen", { projectId, screenId, name: s.name });
    const htmlPath = path.join(outDir, `${fileBase}.html`);
    const pngPath = path.join(outDir, `${fileBase}.png`);

    if (detail.htmlCode?.downloadUrl) {
      download(detail.htmlCode.downloadUrl, htmlPath);
      const header = `<!--\n  STITCH SCREEN\n  Title: ${s.title}\n  Screen ID: ${screenId}\n  Project: ${projectId}\n  Downloaded: ${manifest.fetchedAt}\n-->\n`;
      const html = fs.readFileSync(htmlPath, "utf8");
      if (!html.includes("STITCH SCREEN")) fs.writeFileSync(htmlPath, header + html);
    }

    let hasPng = false;
    if (detail.screenshot?.downloadUrl) {
      const w = detail.width || detail.screenshot.width || s.width;
      try {
        download(w ? `${detail.screenshot.downloadUrl}=w${w}` : detail.screenshot.downloadUrl, pngPath);
        hasPng = true;
      } catch {
        download(detail.screenshot.downloadUrl, pngPath);
        hasPng = true;
      }
    }

    const entry = {
      screenId,
      title: s.title,
      slug: fileBase,
      deviceType: detail.deviceType || s.deviceType || null,
      width: detail.width || s.width || null,
      height: detail.height || s.height || null,
      htmlFile: `screens/${fileBase}.html`,
      pngFile: hasPng ? `screens/${fileBase}.png` : null,
    };
    fs.writeFileSync(
      path.join(outDir, `${fileBase}.meta.json`),
      JSON.stringify({ ...entry, name: s.name, fetchedAt: manifest.fetchedAt }, null, 2),
    );
    manifest.screens.push(entry);
    console.log("ok");
  } catch (err) {
    console.log("FAIL");
    manifest.failures.push({ screenId, title: s.title, error: String(err.message || err) });
  }
}

const dsDir = path.join(root, "_design-system");
fs.mkdirSync(dsDir, { recursive: true });
for (const [tool, args] of [
  ["fetch_design_md", { projectId }],
  ["get_project", { name: `projects/${projectId}` }],
]) {
  try {
    const r = await mcpCall(tool, args);
    if (r.designMd) fs.writeFileSync(path.join(dsDir, "design-system-spec.md"), r.designMd);
    if (r.designTheme) fs.writeFileSync(path.join(dsDir, "tokens.json"), JSON.stringify(r.designTheme, null, 2));
  } catch {
    // optional
  }
}

fs.writeFileSync(path.join(root, "manifest.json"), JSON.stringify(manifest, null, 2));

const readme = [
  "# Safety Dashboard — Stitch Import",
  "",
  "Reference export from Stitch. **Not wired into the app** — design source only.",
  "",
  `Project **${projectTitle}** (\`${projectId}\`)`,
  "",
  `Stitch: [${manifest.stitchUrl}](${manifest.stitchUrl})`,
  "",
  `Imported **${manifest.screens.length}** of **${screens.length}** screens on ${manifest.fetchedAt.split("T")[0]}.`,
  manifest.failures.length ? `\n> ${manifest.failures.length} screen(s) failed — see \`manifest.json\`.\n` : "",
  "| # | Title | Screen ID | Preview |",
  "|---|-------|-----------|---------|",
  ...manifest.screens.map(
    (s, idx) =>
      `| ${idx + 1} | ${s.title.replace(/\|/g, "\\|")} | \`${s.screenId}\` | [html](${s.htmlFile})${s.pngFile ? ` · [png](${s.pngFile})` : ""} |`,
  ),
  "",
  "## Re-import",
  "",
  "```bash",
  "cd docs/stitch/safety-dashboard",
  "STITCH_API_KEY=... node scripts/import-stitch-project.mjs 8694957891602637085",
  "```",
  "",
].join("\n");
fs.writeFileSync(path.join(root, "README.md"), readme);

console.log(`\nImported ${manifest.screens.length}/${screens.length} screens`);
