import { describe, expect, it } from "vitest";

import { COMPONENT_IDS, type ComponentId } from "./stream-chunk";
import { SCREEN_IDS, type ScreenId } from "./acts";
import {
  COMPONENT_TO_SCREEN,
  SCREEN_TO_COMPONENT,
  isEngineExtra,
  toComponentId,
  toScreenId,
} from "./screen-map";

/** The 3 engine-extra ids that have no Ink Band screen. */
const ENGINE_EXTRA: ComponentId[] = ["network", "audience", "handoff_human"];

describe("screen-map: ComponentId ↔ ScreenId SSOT (INT-01)", () => {
  it("maps every ComponentId: Ink Band ids 1:1, engine-extra to null", () => {
    for (const id of COMPONENT_IDS) {
      const screen = toScreenId(id);
      if (ENGINE_EXTRA.includes(id)) {
        expect(screen, `${id} should be engine-extra (null)`).toBeNull();
      } else {
        // Ink Band screens resolve to the ScreenId of the same name.
        expect(screen).toBe(id as unknown as ScreenId);
      }
    }
  });

  it("the forward table keys exactly match COMPONENT_IDS (contract mirror)", () => {
    expect(Object.keys(COMPONENT_TO_SCREEN).sort()).toEqual([...COMPONENT_IDS].sort());
  });

  it("every ScreenId resolves to a ComponentId and round-trips", () => {
    for (const screen of SCREEN_IDS) {
      const component = toComponentId(screen);
      expect(COMPONENT_IDS).toContain(component);
      if (screen === "safetyDashboard") {
        // Funnel-only stub: maps to the shared `safety` component until a dedicated id exists.
        expect(component).toBe("safety");
        expect(toScreenId(component)).toBe("safety");
        continue;
      }
      if (screen === "sandbox" || screen === "training" || screen === "technology") {
        // Stage detail screens: stub-only until dedicated ComponentIds exist.
        expect(component).toBe("path");
        expect(toScreenId(component)).toBe("path");
        continue;
      }
      // ScreenId → ComponentId → ScreenId is the identity for Ink Band screens.
      expect(toScreenId(component)).toBe(screen);
    }
  });

  it("the reverse table keys exactly match SCREEN_IDS", () => {
    expect(Object.keys(SCREEN_TO_COMPONENT).sort()).toEqual([...SCREEN_IDS].sort());
  });

  it("isEngineExtra is true only for the engine-extra ids", () => {
    for (const id of COMPONENT_IDS) {
      expect(isEngineExtra(id)).toBe(ENGINE_EXTRA.includes(id));
    }
  });

  it("`beat` (renamed from reality_check_beat) is in the set and maps to itself", () => {
    expect(COMPONENT_IDS).toContain("beat");
    expect(COMPONENT_IDS).not.toContain("reality_check_beat" as unknown as ComponentId);
    expect(toScreenId("beat")).toBe("beat");
  });
});
