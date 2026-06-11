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

  it("MAP_Q has four questions with a Safety gate; computeMapRead orders gaps sharpest-first", () => {
    expect(MAP_Q).toHaveLength(4);
    expect(MAP_Q[0].opts[0]).toMatchObject({ gatePass: true });
    expect(MAP_Q[0].opts[1]).toMatchObject({ gateFail: true });
    const read = computeMapRead([
      MAP_Q[0].opts[0],
      MAP_Q[1].opts[2],
      MAP_Q[3].opts[2],
    ]);
    expect(read.clearedSafety).toBe(true);
    expect(read.gaps[0]).toMatchObject({ stage: "sandbox", sev: 2 });
    expect(read.gaps[1]).toMatchObject({ stage: "tech", sev: 2 });
    const readFail = computeMapRead([MAP_Q[0].opts[2]]);
    expect(readFail.clearedSafety).toBe(false);
    expect(readFail.stages.safety).toMatchObject({ sev: 3 });
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
