/**
 * Overwrite canonical Movemental wordmarks in Supabase Storage.
 *
 *   pnpm exec tsx scripts/upload-movemental-logos.ts
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";

config({ path: path.join(process.cwd(), ".env.local") });

const urlRaw = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleRaw = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!urlRaw?.trim() || !serviceRoleRaw?.trim()) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (load via .env.local).",
  );
  process.exit(1);
}

const url = urlRaw.trim();
const serviceRole = serviceRoleRaw.trim();
const supabase = createClient(url, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const BUCKET = "media-library";
const SRC = "/tmp/movemental-logo-new";

const FILES: { local: string; remote: string; type: string }[] = [
  { local: "movemental-logo-light.webp", remote: "movemental/logos/movemental-logo-light.webp", type: "image/webp" },
  { local: "movemental-logo-light.png", remote: "movemental/logos/movemental-logo-light.png", type: "image/png" },
  { local: "movemental-logo-dark.webp", remote: "movemental/logos/movemental-logo-dark.webp", type: "image/webp" },
  { local: "movemental-logo-dark.png", remote: "movemental/logos/movemental-logo-dark.png", type: "image/png" },
  { local: "movemental-logo-transparent.webp", remote: "movemental/logos/movemental-logo-transparent.webp", type: "image/webp" },
  { local: "movemental-logo-transparent.png", remote: "movemental/logos/movemental-logo-transparent.png", type: "image/png" },
  { local: "movemental-logo-transparent-white.webp", remote: "movemental/logos/movemental-logo-transparent-white.webp", type: "image/webp" },
  { local: "movemental-logo-transparent-white.png", remote: "movemental/logos/movemental-logo-transparent-white.png", type: "image/png" },
  { local: "movemental-logo.webp", remote: "movemental/logos/movemental-logo.webp", type: "image/webp" },
  { local: "movemental-logo-white.webp", remote: "movemental/logos/movemental-logo-white.webp", type: "image/webp" },
  { local: "movemental-logo-transparent.webp", remote: "danielle-strickland/network/movemental-logo-transparent.webp", type: "image/webp" },
  { local: "movemental-logo-transparent.webp", remote: "meghan-good/network/movemental-logo-transparent.webp", type: "image/webp" },
];

async function main() {
  for (const file of FILES) {
    const body = await readFile(path.join(SRC, file.local));
    const { error } = await supabase.storage.from(BUCKET).upload(file.remote, body, {
      contentType: file.type,
      upsert: true,
      cacheControl: "60",
    });
    if (error) {
      console.error(`${file.remote}:`, error.message);
      process.exit(1);
    }
    console.error(`OK ${file.remote} (${body.length} bytes)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
