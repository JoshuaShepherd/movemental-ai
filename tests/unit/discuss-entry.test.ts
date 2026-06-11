import { describe, expect, it } from "vitest";

import {
  handleDiscussChipTarget,
  resolveDiscussChip,
  resolveTypedDiscussSignal,
} from "../../src/lib/agent-room/discuss-entry";

describe("discuss-entry", () => {
  it("resolves toDiscuss chip with post-readback reason", () => {
    expect(resolveDiscussChip("toDiscuss", { lastScene: "readback" })).toBe(
      "post-readback",
    );
    expect(resolveDiscussChip("toDiscuss", { lastScene: "toPath" })).toBe("user");
    expect(resolveDiscussChip("toBeat")).toBeNull();
  });

  it("resolveTypedDiscussSignal offers on meta phrasing", () => {
    expect(
      resolveTypedDiscussSignal({
        text: "what if our board is split",
        phase: "guide",
        screenId: "home",
        freeTextStreak: 0,
        fallbackStreak: 0,
      }).kind,
    ).toBe("offer");
  });

  it("resolveTypedDiscussSignal noop during beat screen", () => {
    expect(
      resolveTypedDiscussSignal({
        text: "what if our board is split",
        phase: "guide",
        screenId: "beat",
        freeTextStreak: 0,
        fallbackStreak: 0,
      }).kind,
    ).toBe("noop");
  });

  it("handleDiscussChipTarget calls run when chip is not toDiscuss", () => {
    const ran: string[] = [];
    handleDiscussChipTarget(
      "toBeat",
      () => {},
      (s) => ran.push(s),
    );
    expect(ran).toEqual(["toBeat"]);
  });
});
