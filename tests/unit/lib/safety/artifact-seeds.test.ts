import { describe, expect, it } from "vitest";

import { SAFETY_ARTIFACT_SEEDS, seedBodyMd } from "@/lib/services/safety/artifact-seeds";

describe("SAFETY_ARTIFACT_SEEDS", () => {
  it("defines five charter layers with unique slugs", () => {
    expect(SAFETY_ARTIFACT_SEEDS).toHaveLength(5);
    const slugs = SAFETY_ARTIFACT_SEEDS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(5);
  });

  it("returns non-empty draft bodies for each seed", () => {
    for (const seed of SAFETY_ARTIFACT_SEEDS) {
      expect(seedBodyMd(seed.draftKey).length).toBeGreaterThan(20);
    }
  });
});
