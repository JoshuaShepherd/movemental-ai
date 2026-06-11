import { describe, expect, it } from "vitest";

import { aggregateOrg } from "./aggregate";
import type { ParticipantScore } from "./types";

const leader: ParticipantScore = {
  stagePercents: { Safety: 40, Sandbox: 70, Training: 80, Technology: 75 },
  overallPercent: 66,
  dominantGapStage: "Safety",
  illusionFlags: ["safety_paper"],
};

describe("aggregateOrg", () => {
  it("flags a single submission as provisional and names the lowest stage as the gap", () => {
    const out = aggregateOrg([leader]);
    expect(out.provisional).toBe(true);
    expect(out.respondedCount).toBe(1);
    expect(out.dominantGap).toBe("Safety");
    expect(out.orderedPath).toEqual(["Safety", "Sandbox", "Training", "Technology"]);
    expect(out.placementLine).toMatch(/Safety/);
    expect(out.mostDivergentStages).toEqual([]); // no team to disagree yet
  });

  it("surfaces the stage the team disagrees most on", () => {
    const optimist: ParticipantScore = {
      stagePercents: { Safety: 90, Sandbox: 60, Training: 60, Technology: 60 },
      overallPercent: 70,
      dominantGapStage: "Sandbox",
      illusionFlags: [],
    };
    const pessimist: ParticipantScore = {
      stagePercents: { Safety: 20, Sandbox: 58, Training: 62, Technology: 60 },
      overallPercent: 50,
      dominantGapStage: "Safety",
      illusionFlags: ["safety_paper"],
    };
    const out = aggregateOrg([optimist, pessimist], { invitedCount: 3 });
    expect(out.respondedCount).toBe(2);
    expect(out.invitedCount).toBe(3);
    // Safety spread is 70 pts vs <5 elsewhere → the contested stage.
    expect(out.mostDivergentStages).toContain("Safety");
    expect(out.stages.Safety.mean).toBe(55);
    expect(out.stages.Safety.spread).toBe(70);
  });

  it("aggregates illusion flags with unanimous vs contested", () => {
    const a: ParticipantScore = { ...leader, illusionFlags: ["safety_paper", "shadow_sandbox"] };
    const b: ParticipantScore = { ...leader, illusionFlags: ["safety_paper"] };
    const out = aggregateOrg([a, b]);
    const safetyPaper = out.illusions.find((i) => i.id === "safety_paper");
    const shadow = out.illusions.find((i) => i.id === "shadow_sandbox");
    expect(safetyPaper?.unanimous).toBe(true);
    expect(safetyPaper?.label).toMatch(/paper/i);
    expect(shadow?.contested).toBe(true);
    expect(shadow?.count).toBe(1);
  });
});
