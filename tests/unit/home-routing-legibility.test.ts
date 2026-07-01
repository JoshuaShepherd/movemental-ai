import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { resolveChipRoute } from "@/lib/agent-room/composer-routing";
import {
  containsReauthoredFacts,
  inferRenderableTopic,
  RENDERABLE_TOPIC_IDS,
} from "@/lib/agent-room/renderable-topics";
describe("G4 — renderable topic SSOT", () => {
  it("enumerates the renderable-topic set", () => {
    expect(RENDERABLE_TOPIC_IDS).toContain("about");
    expect(RENDERABLE_TOPIC_IDS).toContain("pricing");
    expect(RENDERABLE_TOPIC_IDS).toContain("contact");
  });

  it("infers pricing from cost phrasing", () => {
    expect(inferRenderableTopic("What does it cost?")).toBe("pricing");
  });

  it("detects re-authored quantitative facts in prose", () => {
    expect(containsReauthoredFacts("Plans start at $500/month.")).toBe(true);
    expect(containsReauthoredFacts("Email josh@movemental.ai")).toBe(true);
    expect(containsReauthoredFacts("Here is how pricing works —")).toBe(false);
  });
});

describe("G4 — expanded info chips carry renderComponent", () => {
  it("About / Cost / Contact expanded chips expect speak-and-show render", () => {
    expect(
      resolveChipRoute({ label: "About Movemental", say: "About Movemental" }, "expanded"),
    ).toMatchObject({ kind: "agent", renderComponent: "about" });
    expect(
      resolveChipRoute({ label: "What does it cost?", say: "What does it cost?" }, "expanded"),
    ).toMatchObject({ kind: "agent", renderComponent: "pricing" });
    expect(
      resolveChipRoute({ label: "Get in touch", say: "Get in touch" }, "expanded"),
    ).toMatchObject({ kind: "agent", renderComponent: "contact" });
  });

  it("collapsed info chips stay LOCAL (no reversal on chip path)", () => {
    expect(
      resolveChipRoute({ label: "What does it cost?", say: "What does it cost?" }, "collapsed"),
    ).toEqual({ kind: "local", scene: "cost" });
  });
});

describe("G5 — speakshow.violation telemetry", () => {
  it("exports trackSpeakShowViolation for prose-only-on-renderable turns", async () => {
    const { trackSpeakShowViolation: track } = await import("@/lib/analytics/agent-room-events");
    expect(typeof track).toBe("function");
  });
});

describe("G4 — room-host prompt references renderable topics", () => {
  it("documents never re-author prices/contacts in prose", () => {
    const prompt = readFileSync(
      join(process.cwd(), "docs/build/agent-orchestration/engine/prompts/room-host.md"),
      "utf8",
    );
    expect(prompt).toMatch(/never re-author/i);
    expect(prompt).toMatch(/renderable-topics/i);
  });
});
