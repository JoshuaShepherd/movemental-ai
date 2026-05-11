import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const manifestPath = join(process.cwd(), "src/lib/program/data/stitch-templates.json");

type Manifest = {
  templates: Array<{ id: string; category: "safety" | "sandbox" }>;
};

type ManifestWithStatic = Manifest & {
  templates: Array<Manifest["templates"][number] & { path: string; thumbnail: string }>;
};

describe("program fixtures sync", () => {
  it("every manifest template has a vendored fixture file", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Manifest;
    for (const t of manifest.templates) {
      const p = join(process.cwd(), "src/lib/program/fixtures", t.category, `${t.id}.content.json`);
      expect(existsSync(p), `missing fixture for ${t.id}`).toBe(true);
    }
  });

  it("every manifest template has static HTML + thumbnail under public/", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as ManifestWithStatic;
    for (const t of manifest.templates) {
      const html = join(process.cwd(), "public", t.path);
      const thumb = join(process.cwd(), "public", t.thumbnail);
      expect(existsSync(html), `missing public HTML for ${t.id}`).toBe(true);
      expect(existsSync(thumb), `missing public thumbnail for ${t.id}`).toBe(true);
    }
  });
});
