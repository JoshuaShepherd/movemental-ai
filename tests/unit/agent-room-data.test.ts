import { describe, expect, it } from "vitest";

import { SCENES } from "@/lib/agent-room/data/scenes";
import { LEADERS } from "@/lib/agent-room/data/leaders";
import { PROFILES, getProfile } from "@/lib/agent-room/data/profiles";
import { MAP_Q, computeMapRead } from "@/lib/agent-room/data/map-q";
import { FAQ_SECTIONS } from "@/lib/agent-room/data/faq";

describe("agent-room data layer (AF-06)", () => {
  it("SCENES has the core scene names the runner calls", () => {
    for (const name of ["opening", "toBeat", "whatIs", "cost", "toSafety", "withUs"]) {
      expect(SCENES).toHaveProperty(name);
    }
    expect(SCENES.opening.length).toBeGreaterThan(0);
    expect(Array.isArray(SCENES.toBeat)).toBe(true);
  });

  it("LEADERS is the 17-portrait band with public image paths", () => {
    expect(LEADERS).toHaveLength(17);
    expect(LEADERS[0]).toMatchObject({ name: "Alan Hirsch", img: "/agent-room/leaders/0.jpg" });
    expect(LEADERS.every((l) => l.img.startsWith("/agent-room/leaders/"))).toBe(true);
    expect(LEADERS.every((l) => !l.img.startsWith("data:"))).toBe(true); // no inline base64
  });

  it("PROFILES has 17 approved records and getProfile gates on approval", () => {
    expect(Object.keys(PROFILES)).toHaveLength(17);
    expect(getProfile(0)?.lede).toContain("Missional theologian");
    expect(getProfile(999)).toBeNull();
  });

  it("MAP_Q has six questions; computeMapRead orders gaps sharpest-first", () => {
    expect(MAP_Q).toHaveLength(6);
    // Pick the sharpest safety gap (sev 3) + a tech gap (sev 2). After the
    // gentlest-first reorder the inventory question (safety sev 3) is at index 2;
    // the tech question stays last. computeMapRead aggregates by stage, so the
    // sev-3 safety gap must still sort ahead of the sev-2 tech gap.
    const read = computeMapRead([MAP_Q[2].opts[2], MAP_Q[5].opts[2]]);
    expect(read.gaps[0]).toMatchObject({ stage: "safety", sev: 3 });
    expect(read.gaps[1]).toMatchObject({ stage: "tech", sev: 2 });
  });

  it("FAQ_SECTIONS has ten groups with q/a items", () => {
    expect(FAQ_SECTIONS).toHaveLength(10);
    expect(FAQ_SECTIONS[0].items.length).toBeGreaterThan(0);
    expect(FAQ_SECTIONS[0].items[0]).toHaveProperty("q");
    expect(FAQ_SECTIONS[0].items[0]).toHaveProperty("a");
  });

  it("data modules carry no DOM/window references", () => {
    // computeMapRead is pure and runs in the test (node) env without a DOM.
    expect(() => computeMapRead([])).not.toThrow();
  });
});
