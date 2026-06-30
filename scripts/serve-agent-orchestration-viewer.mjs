#!/usr/bin/env node
/**
 * Serve agent-orchestration pack + local HTML reader.
 *
 *   pnpm agent-orchestration:viewer
 *   AGENT_ORCH_VIEWER_PORT=8791 node scripts/serve-agent-orchestration-viewer.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");
const PACK_ROOT = path.join(REPO_ROOT, "docs/build/agent-orchestration");
const PORT = Number(process.env.AGENT_ORCH_VIEWER_PORT || 8791, 10);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0] || "/");
  const normalized = path.posix.normalize(decoded);
  if (normalized.includes("..")) return null;
  const rel = normalized.replace(/^\//, "");
  const abs = path.join(PACK_ROOT, rel);
  if (!abs.startsWith(PACK_ROOT)) return null;
  if (!fs.existsSync(abs)) return null;
  try {
    const resolved = fs.realpathSync(abs);
    if (!resolved.startsWith(REPO_ROOT)) return null;
  } catch {
    return null;
  }
  return abs;
}

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body ?? "");
}

const server = http.createServer((req, res) => {
  let filePath = safePath(req.url || "/");

  if (!filePath) {
    send(res, 403, { "Content-Type": "text/plain" }, "Forbidden");
    return;
  }

  if (req.url === "/" || req.url === "") {
    filePath = path.join(PACK_ROOT, "viewer", "index.html");
  } else if (req.url === "/viewer" || req.url === "/viewer/") {
    filePath = path.join(PACK_ROOT, "viewer", "index.html");
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      send(res, 404, { "Content-Type": "text/plain" }, "Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        send(res, 500, { "Content-Type": "text/plain" }, "Error");
        return;
      }
      send(res, 200, { "Content-Type": type, "Cache-Control": "no-store" }, data);
    });
  });
});

server.listen(PORT, () => {
  const url = `http://127.0.0.1:${PORT}/viewer/`;
  console.error(`Agent orchestration reader → ${url}`);
  console.log(url);
});
