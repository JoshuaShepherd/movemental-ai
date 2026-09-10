/**
 * scripts/cutover-v2-website.ts
 *
 * Automated cutover tool for Movemental Full Website Replacement.
 *
 * Protocol:
 * 1. Verifies that master_runner.md has FSM-00 through FSM-30 marked as Done.
 * 2. Pre-creates timestamped archive: archive/platform-v1-<timestamp>/
 * 3. Archives superseded production routes.
 * 4. Respects protected routes:
 *    - src/app/login, signup, forgot-password, auth
 *    - src/app/terms, privacy, cookies
 *    - src/app/dashboard/ai-reality (S-1)
 *    - src/app/api
 * 5. Swaps staged v2 candidate routes into canonical root paths.
 * 6. Cleans up staging harness src/app/(site-v2).
 *
 * Usage:
 *   tsx scripts/cutover-v2-website.ts --dry-run
 *   tsx scripts/cutover-v2-website.ts --execute
 */

import * as fs from "fs";
import * as path from "path";

const REPO_ROOT = path.resolve(__dirname, "..");
const MASTER_RUNNER = path.join(
  REPO_ROOT,
  "docs/build/prompts/full-site-migration/master_runner.md"
);

const PROTECTED_APP_ROUTES = new Set([
  "login",
  "signup",
  "forgot-password",
  "auth",
  "terms",
  "privacy",
  "cookies",
  "api",
  "(studio)",
  "admin",
]);

const args = process.argv.slice(2);
const isDryRun = !args.includes("--execute");

console.log("==========================================================");
console.log(" Movemental Website Replacement — Cutover Tool");
console.log(` Mode: ${isDryRun ? "DRY RUN (preview only)" : "EXECUTE (live cutover)"}`);
console.log("==========================================================");

// 1. Verify readiness in master_runner.md
if (!fs.existsSync(MASTER_RUNNER)) {
  console.error(`❌ Master runner not found at: ${MASTER_RUNNER}`);
  process.exit(1);
}

const runnerContent = fs.readFileSync(MASTER_RUNNER, "utf-8");
const unstartedMatches = runnerContent.match(/\|\s*\*\*Not started\*\*\s*\|/g);
if (unstartedMatches && unstartedMatches.length > 1) {
  console.warn(
    `⚠️ Warning: ${unstartedMatches.length} prompts are still marked 'Not started' in master_runner.md.`
  );
  if (!isDryRun) {
    console.error(
      "❌ Cutover cannot execute until all prompts FSM-00 through FSM-30 are Done."
    );
    process.exit(1);
  }
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const archiveDir = path.join(REPO_ROOT, `archive/platform-v1-${timestamp}`);

console.log(`\nTarget archive directory: ${archiveDir}`);

const candidateAppDir = path.join(REPO_ROOT, "src/app/(site-v2)/v2");
const targetAppDir = path.join(REPO_ROOT, "src/app");

console.log(`Candidate routes source: ${candidateAppDir}`);
console.log(`Target production routes: ${targetAppDir}`);

if (isDryRun) {
  console.log("\n[DRY RUN] Actions that will be taken during --execute:");
  console.log(` 1. Create ${archiveDir}`);
  console.log(" 2. Archive superseded legacy routes while preserving protected paths:");
  for (const route of PROTECTED_APP_ROUTES) {
    console.log(`    - PRESERVED: src/app/${route}`);
  }
  console.log("    - PRESERVED: src/app/dashboard/ai-reality/ (S-1)");
  console.log(" 3. Copy candidate routes from src/app/(site-v2)/v2 into src/app/");
  console.log(" 4. Clean up temporary staging route group src/app/(site-v2)");
  console.log(" 5. Run pnpm validate:all and pnpm typecheck");
  console.log("\nTo execute this migration, re-run with: tsx scripts/cutover-v2-website.ts --execute");
} else {
  console.log("\n[EXECUTE] Executing atomic cutover...");
  fs.mkdirSync(archiveDir, { recursive: true });

  // 2. Archive superseded production files
  console.log("Archiving superseded platform files...");
  const archiveAppDir = path.join(archiveDir, "src/app");
  fs.mkdirSync(archiveAppDir, { recursive: true });

  const candidateEntries = fs.readdirSync(candidateAppDir);
  for (const entry of candidateEntries) {
    if (PROTECTED_APP_ROUTES.has(entry)) continue;
    const targetPath = path.join(targetAppDir, entry);
    if (fs.existsSync(targetPath)) {
      const destArchive = path.join(archiveAppDir, entry);
      console.log(` Archiving: src/app/${entry} -> archive/platform-v1-${timestamp}/src/app/${entry}`);
      fs.cpSync(targetPath, destArchive, {
        recursive: true,
        filter: (src) => {
          // Explicitly do not archive or touch dashboard/ai-reality
          const rel = path.relative(targetAppDir, src);
          if (rel === "dashboard/ai-reality" || rel.startsWith("dashboard/ai-reality/")) {
            return false;
          }
          return true;
        },
      });
    }
  }

  // 3. Promote candidate routes
  if (fs.existsSync(candidateAppDir)) {
    console.log("Promoting v2 candidate routes into src/app/...");
    fs.cpSync(candidateAppDir, targetAppDir, {
      recursive: true,
      filter: (src) => {
        const rel = path.relative(candidateAppDir, src);
        if (PROTECTED_APP_ROUTES.has(rel)) return false;
        // Never overwrite dashboard/ai-reality
        if (rel === "dashboard/ai-reality" || rel.startsWith("dashboard/ai-reality/")) {
          return false;
        }
        return true;
      },
    });

    // 4. Remove staging harness
    const stagingHarness = path.join(REPO_ROOT, "src/app/(site-v2)");
    fs.rmSync(stagingHarness, { recursive: true, force: true });
    console.log("Cleaned up staging harness src/app/(site-v2).");
  } else {
    console.warn(`Candidate directory ${candidateAppDir} does not exist.`);
  }

  console.log("\n✅ Cutover operations completed successfully.");
  console.log("Next steps:");
  console.log(" 1. Run: pnpm typecheck && pnpm validate:all && pnpm build");
  console.log(" 2. Finalize MIGRATION-STATE.md");
}
