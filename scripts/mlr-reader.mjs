#!/usr/bin/env node
/**
 * Opens the static movement_leader_research reader in a browser.
 * Serves the repo `docs/` tree on READER_PORT (default 8765) when the port is free;
 * if something already listens (e.g. `pnpm reader:serve`), reuses it.
 *
 * Usage:
 *   node scripts/mlr-reader.mjs [slug] [file.md]
 *   pnpm reader:roy-moran
 *   pnpm reader:mlr -- alan-hirsch README.md
 *
 * With no slug, opens the library home (no hash).
 */
import { spawn, execFile } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");

const argv = process.argv.slice(2).filter((a) => a !== "--");
const slug = argv[0];
const doc = argv[1] || "README.md";
const port = Number(process.env.READER_PORT || 8765, 10);

if (!Number.isFinite(port) || port < 1 || port > 65535) {
  console.error("Invalid READER_PORT");
  process.exit(1);
}

const basePath = `/movement_leader_research/index.html`;
const url = slug
  ? `http://127.0.0.1:${port}${basePath}#/${encodeURI(`${slug}/${doc}`.replace(/\\/g, "/"))}`
  : `http://127.0.0.1:${port}${basePath}`;
const relPath = slug ? `${slug}/${doc}`.replace(/\\/g, "/") : "(library home)";

function canBindPort(p) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.once("error", () => resolve(false));
    srv.listen(p, "127.0.0.1", () => {
      srv.close(() => resolve(true));
    });
  });
}

function waitForListen(p, ms = 8000) {
  const deadline = Date.now() + ms;
  return (async function loop() {
    if (Date.now() > deadline) {
      throw new Error(`Nothing reachable on 127.0.0.1:${p} after ${ms}ms`);
    }
    const ok = await new Promise((res) => {
      const c = net.createConnection({ port: p, host: "127.0.0.1" });
      c.on("connect", () => {
        c.end();
        res(true);
      });
      c.on("error", () => res(false));
    });
    if (ok) return;
    await new Promise((r) => setTimeout(r, 150));
    return loop();
  })();
}

async function openUrl(u) {
  const platform = process.platform;
  try {
    if (platform === "darwin") {
      await execFileP("open", [u], { windowsHide: true });
    } else if (platform === "win32") {
      await execFileP("cmd", ["/c", "start", "", u], { windowsHide: true });
    } else {
      await execFileP("xdg-open", [u], { windowsHide: true });
    }
  } catch {
    console.error("Open this URL in a browser:\n", u);
  }
}

async function main() {
  const free = await canBindPort(port);
  let child;
  if (free) {
    child = spawn("python3", ["-m", "http.server", String(port), "-d", "docs"], {
      cwd: REPO_ROOT,
      stdio: "inherit",
      detached: false,
    });
    child.on("error", (err) => {
      console.error("Failed to start python http.server:", err.message);
      process.exit(1);
    });
    await waitForListen(port);
  } else {
    console.error(`Port ${port} already in use — opening reader (is \`pnpm reader:serve\` running?).`);
  }

  console.error(`Research reader → ${relPath}`);
  await openUrl(url);

  if (child) {
    process.on("SIGINT", () => {
      child.kill("SIGINT");
      process.exit(0);
    });
    await new Promise((resolve) => {
      child.on("exit", resolve);
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
