import { describe, expect, it } from "vitest";

import {
  extractHeroTimelineSections,
  hasFullHeroTimelineLayout,
  toSafeStartHeroTimelineFixture,
} from "@/lib/program/normalize-hero-timeline";
import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";

describe("normalize-hero-timeline", () => {
  it("maps sandbox milestones to timeline stages", () => {
    const f: ProgramFixtureBase = {
      fixtureVersion: 1,
      templateId: "sandboxlive_dashboard_pre_kickoff_state",
      screenFamily: "sandboxlive-shell",
      shell: { brandLine: "X" },
      page: { headline: "H" },
      sections: [
        {
          id: "p",
          kind: "timeline",
          milestones: [
            { label: "A", state: "complete" },
            { label: "B", state: "current" },
          ],
        },
      ],
    };
    const sections = extractHeroTimelineSections(f);
    expect(sections[0]?.kind).toBe("timeline");
    if (sections[0]?.kind === "timeline") {
      expect(sections[0].stages[0]?.title).toBe("A");
      expect(sections[0].stages[1]?.state).toBe("current");
    }
  });

  it("detects full hero layout when timeline, roster, prep present", () => {
    const sections = extractHeroTimelineSections({
      fixtureVersion: 1,
      templateId: "t",
      screenFamily: "safestart-hero-timeline",
      shell: {},
      page: {},
      sections: [
        { id: "a", kind: "timeline", stages: [{ stageLabel: "1", title: "t", state: "current" }] },
        {
          id: "b",
          kind: "rosterColumns",
          columns: [{ title: "C", items: [{ name: "n" }] }],
        },
        { id: "c", kind: "prepChecklist", title: "Prep", intro: "", bullets: ["x"] },
      ],
    } as ProgramFixtureBase);
    expect(hasFullHeroTimelineLayout(sections)).toBe(true);
  });

  it("toSafeStartHeroTimelineFixture fills brand line fallback", () => {
    const f: ProgramFixtureBase = {
      fixtureVersion: 1,
      templateId: "x",
      screenFamily: "safestart-hero-timeline",
      shell: { brandLine: null },
      page: { headline: null },
      sections: [],
    };
    const h = toSafeStartHeroTimelineFixture(f);
    expect(h.shell.brandLine).toBe("MOVEMENTAL");
    expect(h.page.headline).toBe("x");
  });
});
