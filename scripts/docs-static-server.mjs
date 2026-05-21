#!/usr/bin/env node
/**
 * Static server for docs/ with redirects into HTML viewers (not raw .md dumps).
 *
 *   node scripts/docs-static-server.mjs
 *   READER_PORT=8765 node scripts/docs-static-server.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const DOCS_ROOT = path.join(REPO_ROOT, "docs");
const PORT = Number(process.env.READER_PORT || 8765, 10);

/** Exact path → redirect target (relative or absolute path on same host). */
const REDIRECTS = new Map([
  [
    "/movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md",
    "/movement_leader_research/alan-hirsch/collated/",
  ],
]);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0] || "/");
  const normalized = path.posix.normalize(decoded);
  if (normalized.includes("..")) return null;
  const rel = normalized.replace(/^\//, "");
  const abs = path.join(DOCS_ROOT, rel);
  if (!abs.startsWith(DOCS_ROOT)) return null;
  return abs;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  if (body instanceof Buffer) res.end(body);
  else res.end(body ?? "");
}

function serveFile(res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Not found\n");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        send(res, 500, { "Content-Type": "text/plain; charset=utf-8" }, "Read error\n");
        return;
      }
      send(res, 200, { "Content-Type": type, "Cache-Control": "no-cache" }, data);
    });
  });
}

function serveDir(res, dirPath, urlPath) {
  const indexPath = path.join(dirPath, "index.html");
  fs.stat(indexPath, (err, stat) => {
    if (!err && stat.isFile()) {
      serveFile(res, indexPath);
      return;
    }
    fs.readdir(dirPath, { withFileTypes: true }, (readErr, entries) => {
      if (readErr) {
        send(res, 500, { "Content-Type": "text/plain; charset=utf-8" }, "Read error\n");
        return;
      }
      const rows = entries
        .filter((e) => !e.name.startsWith("."))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((e) => {
          const slash = e.isDirectory() ? "/" : "";
          const href = path.posix.join(urlPath, e.name + slash);
          return `<li><a href="${href}">${e.name}${slash ? "/" : ""}</a></li>`;
        })
        .join("\n");
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Index of ${urlPath}</title></head><body><h1>${urlPath}</h1><ul>${rows}</ul></body></html>`;
      send(res, 200, { "Content-Type": "text/html; charset=utf-8" }, html);
    });
  });
}

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0] || "/";

  const redirect = REDIRECTS.get(urlPath);
  if (redirect) {
    send(res, 302, { Location: redirect, "Cache-Control": "no-cache" }, "");
    return;
  }

  let filePath = safePath(urlPath);
  if (!filePath) {
    send(res, 403, { "Content-Type": "text/plain; charset=utf-8" }, "Forbidden\n");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Not found\n");
      return;
    }
    if (stat.isDirectory()) {
      const withSlash = urlPath.endsWith("/") ? urlPath : urlPath + "/";
      if (withSlash !== urlPath) {
        send(res, 301, { Location: withSlash }, "");
        return;
      }
      serveDir(res, filePath, urlPath);
      return;
    }
    serveFile(res, filePath);
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.error(`[docs-static-server] http://127.0.0.1:${PORT}/ (root: docs/)`);
  console.error(
    `[docs-static-server] Alan Hirsch collated viewer → http://127.0.0.1:${PORT}/movement_leader_research/alan-hirsch/collated/`,
  );
});
