import { describe, expect, it } from "vitest";

import { PATH_STAGE_LABELS, PATH_STAGE_RAIL } from "../../src/lib/agent-room/naming";
import { publicStageLabel, ssssStageToPublic } from "../../src/lib/ai-reality/stage-mapper";
import { FAQ_SECTIONS } from "../../src/lib/agent-room/data/faq";
import { isSiteLaunchReady, previewRobotsMetadata } from "../../src/lib/site-launch";

describe("canonical public stage labels (AU-01)", () => {
  it("PATH_STAGE_LABELS uses Safety · Sandbox · Training · Tech", () => {
    expect(PATH_STAGE_LABELS).toEqual({
      safety: "Safety",
      sandbox: "Sandbox",
      training: "Training",
      tech: "Tech",
    });
  });

  it("PATH_STAGE_RAIL renders Training and Tech, not Skills or Solutions", () => {
    const titles = PATH_STAGE_RAIL.map((s) => s.title).join(" ");
    expect(titles).toContain("Training");
    expect(titles).toContain("Tech");
    expect(titles).not.toMatch(/\bSkills\b/);
    expect(titles).not.toMatch(/\bSolutions\b/);
  });

  it("publicStageLabel and legacy mapper bridge Skills→Training, Solutions→Tech", () => {
    expect(publicStageLabel("training")).toBe("Training");
    expect(publicStageLabel("tech")).toBe("Tech");
    expect(ssssStageToPublic("Skills")).toBe("Training");
    expect(ssssStageToPublic("Solutions")).toBe("Tech");
  });

  it("FAQ path copy uses canonical stage names", () => {
    const pathAnswer = FAQ_SECTIONS.flatMap((s) => s.items).find((i) =>
      i.q.includes("Movemental Path"),
    )?.a;
    expect(pathAnswer).toContain("Training");
    expect(pathAnswer).toContain("Tech");
    expect(pathAnswer).not.toMatch(/\bSkills\b/);
    expect(pathAnswer).not.toMatch(/\bSolutions\b/);
  });
});

describe("preview launch policy (AU-03)", () => {
  it("defaults to preview noindex when NEXT_PUBLIC_SITE_LAUNCH_READY is unset", () => {
    expect(isSiteLaunchReady()).toBe(false);
    expect(previewRobotsMetadata()).toEqual({ index: false, follow: false });
  });
});
