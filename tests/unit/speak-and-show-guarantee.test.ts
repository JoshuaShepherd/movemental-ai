import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  appendBackToSheetAffordance,
  threadForPersistence,
  type ThreadTurn,
} from "@/lib/agent-room/thread";
import {
  getScreenDisplayName,
  shouldShowBehindIndicator,
} from "@/lib/agent-room/screen-display";

describe("speak-and-show — screen display (G2)", () => {
  it("labels known screens for behind-indicator copy", () => {
    expect(getScreenDisplayName("pricing")).toBe("Pricing");
    expect(getScreenDisplayName("home")).toBe("Home");
  });

  it("suppresses behind-indicator for full-bleed engine overlays", () => {
    expect(shouldShowBehindIndicator(null)).toBe(true);
    expect(shouldShowBehindIndicator("pricing")).toBe(true);
    expect(shouldShowBehindIndicator("network")).toBe(false);
    expect(shouldShowBehindIndicator("audience")).toBe(false);
    expect(shouldShowBehindIndicator("handoff_human")).toBe(false);
  });
});

describe("speak-and-show — back affordance (G3)", () => {
  it("appends a tappable back-to-sheet affordance after prose-only agent turn", () => {
    const base: ThreadTurn[] = [
      { role: "user", content: "Tell me more" },
      { role: "assistant", content: "Here is more context." },
    ];
    const next = appendBackToSheetAffordance(base, "home", "Home");
    const last = next[next.length - 1];
    expect(last).toMatchObject({
      role: "affordance",
      content: "↩ Back to Home",
      affordanceKind: "back_to_sheet",
      screenId: "home",
    });
  });

  it("does not duplicate the same back affordance", () => {
    const once = appendBackToSheetAffordance([], "path", "The path");
    const twice = appendBackToSheetAffordance(once, "path", "The path");
    expect(twice.filter((t) => t.role === "affordance")).toHaveLength(1);
  });

  it("omits affordance turns from session persistence", () => {
    const thread: ThreadTurn[] = [
      { role: "user", content: "hi" },
      {
        role: "affordance",
        content: "↩ Back to Pricing",
        affordanceKind: "back_to_sheet",
        screenId: "pricing",
      },
    ];
    expect(threadForPersistence(thread)).toEqual([{ role: "user", content: "hi" }]);
  });
});

describe("speak-and-show — host prompt (G1)", () => {
  it("documents mandatory speak-and-show in room-host.md", () => {
    const prompt = readFileSync(
      join(process.cwd(), "docs/build/agent-orchestration/engine/prompts/room-host.md"),
      "utf8",
    );
    expect(prompt).toMatch(/Speak-and-Show Guarantee \(mandatory\)/i);
    expect(prompt).toMatch(/never prose-only on these topics/i);
    expect(prompt).toMatch(/`show_pricing`/);
    expect(prompt).toMatch(/`show_path`/);
  });
});
