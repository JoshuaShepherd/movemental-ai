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
    ).toEqual({ kind: "agent", utterance: "About Movemental" });
    expect(
      resolveStreamChipRoute({ label: "What does it cost?", say: "What does it cost?" }),
    ).toEqual({ kind: "agent", utterance: "What does it cost?" });
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

  it("resolveChipRoute expanded → agent utterances for opening info chips", () => {
    expect(
      resolveChipRoute({ label: "About Movemental", say: "About Movemental" }, "expanded"),
    ).toEqual({ kind: "agent", utterance: "About Movemental" });
    expect(
      resolveChipRoute({ label: "What does it cost?", say: "What does it cost?" }, "expanded"),
    ).toEqual({ kind: "agent", utterance: "What does it cost?" });
    expect(
      resolveChipRoute({ label: "Get in touch", say: "Get in touch" }, "expanded"),
    ).toEqual({ kind: "agent", utterance: "Get in touch" });
  });

  it("returns null for scene follow-up labels", () => {
    expect(getKnownStreamChipRoute("See the whole path")).toBeNull();
    expect(getKnownStreamChipRoute("Show me Safety")).toBeNull();
  });
});
