import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const indexPath = join(process.cwd(), "src/lib/program/data/template-content-index.json");

type IndexDoc = {
  entries: Array<{ templateId: string; screenFamily: string; fixturePath: string }>;
};

describe("template-content-index", () => {
  it("has screenFamily for every entry", () => {
    const doc = JSON.parse(readFileSync(indexPath, "utf8")) as IndexDoc;
    for (const e of doc.entries) {
      expect(e.screenFamily?.length ?? 0).toBeGreaterThan(0);
      expect(e.fixturePath).toContain(".content.json");
    }
  });
});
