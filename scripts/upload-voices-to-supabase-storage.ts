/**
 * One-shot: upload every `public/images/voices/*.webp` to Supabase Storage.
 *
 * Requires `.env.local` with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 *
 *   pnpm exec tsx scripts/upload-voices-to-supabase-storage.ts
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
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
const PREFIX = "movemental/voices";

async function main() {
  const voicesDir = path.join(process.cwd(), "public", "images", "voices");
  const files = (await readdir(voicesDir))
    .filter((f) => f.endsWith(".webp"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.error("No .webp files in public/images/voices");
    process.exit(1);
  }

  const origin = url.replace(/\/+$/, "");
  const publicUrls: string[] = [];

  for (const file of files) {
    const storagePath = `${PREFIX}/${file}`;
    const body = await readFile(path.join(voicesDir, file));
    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, body, {
      contentType: "image/webp",
      upsert: true,
    });
    if (error) {
      console.error(`${file}:`, error.message);
      process.exit(1);
    }
    publicUrls.push(
      `${origin}/storage/v1/object/public/${BUCKET}/${storagePath}`,
    );
    console.error(`OK ${storagePath}`);
  }

  console.log(JSON.stringify(publicUrls, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
