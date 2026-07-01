import { describe, expect, it } from "vitest";

import {
  getKnownStreamChipRoute,
  resolveChipRoute,
  resolveStreamChipRoute,
} from "../../src/lib/agent-room/composer-routing";

describe("composer routing (PAR-02)", () => {
  it("routes lead chip to local toSafetyFlow (screen first, voice after)", () => {
    const route = resolveStreamChipRoute({
      label: "Get a clear next AI step",
      say: "Get a clear next AI step",
      lead: true,
    });
    expect(route).toEqual({ kind: "local", scene: "toSafetyFlow" });
  });

  it("routes info chips to agent utterances in stream mode", () => {
    expect(
      resolveStreamChipRoute({ label: "About Movemental", say: "About Movemental" }),
    ).toEqual({ kind: "agent", utterance: "About Movemental", renderComponent: "about" });
    expect(
      resolveStreamChipRoute({ label: "What does it cost?", say: "What does it cost?" }),
    ).toEqual({
      kind: "agent",
      utterance: "What does it cost?",
      renderComponent: "pricing",
    });
  });

  it("resolveChipRoute collapsed → local scenes for opening info chips", () => {
    expect(
      resolveChipRoute({ label: "About Movemental", say: "About Movemental" }, "collapsed"),
    ).toEqual({ kind: "local", scene: "whatIs" });
    expect(
      resolveChipRoute({ label: "What does it cost?", say: "What does it cost?" }, "collapsed"),
    ).toEqual({ kind: "local", scene: "cost" });
    expect(
      resolveChipRoute({ label: "Get in touch", say: "Get in touch" }, "collapsed"),
    ).toEqual({ kind: "local", scene: "talkToUs" });
    expect(
      resolveChipRoute(
        { label: "Get a clear next AI step", say: "Get a clear next AI step", lead: true },
        "collapsed",
      ),
    ).toEqual({ kind: "local", scene: "toSafetyFlow" });
  });

  it("resolveChipRoute expanded → agent utterances with renderComponent (G4)", () => {
    expect(
      resolveChipRoute({ label: "About Movemental", say: "About Movemental" }, "expanded"),
    ).toEqual({
      kind: "agent",
      utterance: "About Movemental",
      renderComponent: "about",
    });
    expect(
      resolveChipRoute({ label: "What does it cost?", say: "What does it cost?" }, "expanded"),
    ).toEqual({
      kind: "agent",
      utterance: "What does it cost?",
      renderComponent: "pricing",
    });
    expect(
      resolveChipRoute({ label: "Get in touch", say: "Get in touch" }, "expanded"),
    ).toEqual({
      kind: "agent",
      utterance: "Get in touch",
      renderComponent: "contact",
    });
  });

  it("resolveChipRoute scene follow-ups fall through to agent utterance (handled by suggest.to)", () => {
    for (const label of [
      "See the whole path",
      "Show me Safety",
      "Show me Sandbox",
      "Map where we actually stand",
    ]) {
      expect(resolveChipRoute({ label, say: label }, "collapsed")).toEqual({
        kind: "agent",
        utterance: label,
      });
      expect(resolveChipRoute({ label, say: label }, "expanded")).toEqual({
        kind: "agent",
        utterance: label,
      });
    }
  });

  it("resolveChipRoute unknown labels use say text as agent utterance", () => {
    expect(
      resolveChipRoute({ label: "Custom chip", say: "Custom utterance" }, "collapsed"),
    ).toEqual({ kind: "agent", utterance: "Custom utterance" });
  });

  it("opening labels matrix — collapsed local, expanded agent", () => {
    const opening = [
      ["Get a clear next AI step", "toSafetyFlow"],
      ["About Movemental", "whatIs"],
      ["What does it cost?", "cost"],
      ["Get in touch", "talkToUs"],
    ] as const;

    for (const [label, scene] of opening) {
      expect(resolveChipRoute({ label, say: label }, "collapsed")).toEqual({
        kind: "local",
        scene,
      });
      if (label === "Get a clear next AI step") {
        expect(resolveChipRoute({ label, say: label }, "expanded")).toEqual({
          kind: "local",
          scene,
        });
      } else {
        expect(resolveChipRoute({ label, say: label }, "expanded")).toEqual({
          kind: "agent",
          utterance: label,
          renderComponent:
            label === "About Movemental"
              ? "about"
              : label === "What does it cost?"
                ? "pricing"
                : "contact",
        });
      }
    }
  });

  it("returns null for scene follow-up labels", () => {
    expect(getKnownStreamChipRoute("See the whole path")).toBeNull();
    expect(getKnownStreamChipRoute("Show me Safety")).toBeNull();
  });
});
