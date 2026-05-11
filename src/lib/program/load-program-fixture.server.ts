import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";

const FIXTURE_ROOT = path.join(process.cwd(), "src", "lib", "program", "fixtures");

export function loadProgramFixtureJson(
  category: "safety" | "sandbox",
  templateId: string,
): ProgramFixtureBase {
  const file = path.join(FIXTURE_ROOT, category, `${templateId}.content.json`);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing program fixture: ${file}`);
  }
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as ProgramFixtureBase;
  return raw;
}
