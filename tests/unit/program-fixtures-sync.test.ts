import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const manifestPath = join(process.cwd(), "src/lib/program/data/stitch-templates.json");

type Manifest = {
  templates: Array<{ id: string; category: "safety" | "sandbox" }>;
};

describe("program fixtures sync", () => {
  it("every manifest template has a vendored fixture file", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;
    for (const t of manifest.templates) {
      const p = join(process.cwd(), "src/lib/program/fixtures", t.category, `${t.id}.content.json`);
      expect(existsSync(p), `missing fixture for ${t.id}`).toBe(true);
    }
  });
});
