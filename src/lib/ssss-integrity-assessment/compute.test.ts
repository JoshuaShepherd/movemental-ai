import { describe, expect, it } from "vitest";

import { computeSsssIntegrityResult } from "./compute";
import { SSSS_INTEGRITY_ITEM_COUNT } from "./items";

function fill(v: number): number[] {
  return Array.from({ length: SSSS_INTEGRITY_ITEM_COUNT }, () => v);
}

describe("computeSsssIntegrityResult", () => {
  it("scores all 5s as ~100% normalized", () => {
    const r = computeSsssIntegrityResult(fill(5));
    expect(r.normalizedOverallPercent).toBe(100);
    expect(r.likelyIllusion).toBe("none");
  });

  it("detects safety_paper pattern", () => {
    const scores = fill(4);
    scores[0] = 2; // Q01 low
    scores[1] = 5; // Q02 high
    const r = computeSsssIntegrityResult(scores);
    expect(r.illusionFlags).toContain("safety_paper");
  });

  it("throws on wrong length", () => {
    expect(() => computeSsssIntegrityResult([1, 2, 3])).toThrow();
  });
});
