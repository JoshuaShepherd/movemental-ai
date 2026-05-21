#!/usr/bin/env node
/** Open the Alan Hirsch collated HTML viewer (starts docs server if needed). */
import { spawn, execFile } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const REPO_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.READER_PORT || 8765, 10);
const url = `http://127.0.0.1:${port}/movement_leader_research/alan-hirsch/collated/`;

function canBind(p) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.once("error", () => resolve(false));
    s.listen(p, "127.0.0.1", () => s.close(() => resolve(true)));
  });
}

function waitFor(p, ms = 8000) {
  const end = Date.now() + ms;
  return (async function loop() {
    if (Date.now() > end) throw new Error(`Port ${p} not ready`);
    const ok = await new Promise((res) => {
      const c = net.connect(p, "127.0.0.1", () => {
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
  try {
    if (process.platform === "darwin") await execFileP("open", [u]);
    else if (process.platform === "win32") await execFileP("cmd", ["/c", "start", "", u]);
    else await execFileP("xdg-open", [u]);
  } catch {
    console.log(u);
  }
}

async function main() {
  let child;
  if (await canBind(port)) {
    child = spawn("node", ["scripts/docs-static-server.mjs"], {
      cwd: REPO_ROOT,
      stdio: "inherit",
    });
    await waitFor(port);
  }
  console.error(`Alan Hirsch collated viewer → ${url}`);
  await openUrl(url);
  if (child) {
    process.on("SIGINT", () => {
      child.kill("SIGINT");
      process.exit(0);
    });
    await new Promise((r) => child.on("exit", r));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
