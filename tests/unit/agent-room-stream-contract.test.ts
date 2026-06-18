import { describe, expect, it } from "vitest";

// Relative imports: the `@/` alias does not resolve from `tests/unit/` in this
// repo's vitest setup (the sibling `screen-map.test.ts` uses relative too).
import {
  parseSSEBuffer,
  parseStreamChunk,
} from "../../src/lib/agent-room/stream-chunk";
import { validateComponentProps } from "../../src/lib/agent-room/component-props";

/**
 * INT-07 — the deterministic half of the fallback matrix, as pure-function unit
 * tests (no browser, no engine, no flake). Covers two rows the room must honor
 * when the live engine sends something unexpected:
 *
 *   - "Malformed chunk → dropped silently; stream continues"  → parse* drops it
 *   - "Invalid ui_render props → screen unchanged"            → validate* → null
 *
 * The browser-level fallback (503/502 → error voice, never blank) is covered by
 * the route-mocked Playwright spec; the live happy-path by the engine-gated spec.
 */

describe("stream chunk parsing (malformed → dropped, never thrown)", () => {
  it("parses a valid text_delta", () => {
    expect(parseStreamChunk('{"type":"text_delta","delta":"hi"}')).toEqual({
      type: "text_delta",
      delta: "hi",
    });
  });

  it("parses a valid ink_gesture (INT-04)", () => {
    expect(
      parseStreamChunk('{"type":"ink_gesture","kind":"arrow","target":"#opts"}'),
    ).toEqual({ type: "ink_gesture", kind: "arrow", target: "#opts" });
  });

  it("parses a valid ui_render", () => {
    expect(
      parseStreamChunk(
        '{"type":"ui_render","surface":"screen","component":"capture","props":{"kind":"free"}}',
      ),
    ).toMatchObject({ type: "ui_render", component: "capture" });
  });

  it("drops non-JSON (returns null, does not throw)", () => {
    expect(parseStreamChunk("not json at all")).toBeNull();
  });

  it("drops an unknown chunk type", () => {
    expect(parseStreamChunk('{"type":"definitely_not_a_chunk","x":1}')).toBeNull();
  });

  it("drops an ink_gesture with an invalid kind", () => {
    expect(
      parseStreamChunk('{"type":"ink_gesture","kind":"spin","target":"#opts"}'),
    ).toBeNull();
  });
});

describe("parseSSEBuffer (mixes valid + malformed; keeps valid, returns tail)", () => {
  it("keeps valid events, silently drops the malformed one, and returns the partial tail", () => {
    const buffer =
      "data: {\"type\":\"text_delta\",\"delta\":\"a\"}\n\n" +
      "data: not-json\n\n" +
      "data: {\"type\":\"text_delta\",\"delta\":\"b\"}\n\n" +
      "data: {\"type\":\"text_delta\",\"delta"; // truncated → tail
    const { chunks, remaining } = parseSSEBuffer(buffer);
    expect(chunks).toEqual([
      { type: "text_delta", delta: "a" },
      { type: "text_delta", delta: "b" },
    ]);
    expect(remaining).toContain('"delta');
  });

  it("ignores the [DONE] sentinel", () => {
    const { chunks } = parseSSEBuffer("data: [DONE]\n\n");
    expect(chunks).toEqual([]);
  });
});

describe("validateComponentProps (invalid props → null → screen unchanged)", () => {
  it("accepts a valid beat", () => {
    const props = {
      beatId: "org_kind",
      question: "What kind of organization are you?",
      options: ["Church", "Nonprofit"],
      progress: { step: 1, total: 6 },
    };
    expect(validateComponentProps("beat", props)).toMatchObject({ beatId: "org_kind" });
  });

  it("rejects a beat missing required fields → null", () => {
    expect(validateComponentProps("beat", { options: ["only one"] })).toBeNull();
  });

  it("accepts a valid capture kind", () => {
    expect(validateComponentProps("capture", { kind: "free" })).toEqual({ kind: "free" });
  });

  it("rejects an out-of-set capture kind → null", () => {
    expect(validateComponentProps("capture", { kind: "bogus" })).toBeNull();
  });

  it("static-repertoire components accept empty props", () => {
    expect(validateComponentProps("path", {})).toEqual({});
  });

  it("accepts valid pricing dynamic props", () => {
    expect(
      validateComponentProps("pricing", { highlightStage: 2, eyebrow: "Sandbox options" }),
    ).toEqual({ highlightStage: 2, eyebrow: "Sandbox options" });
  });

  it("rejects oversized pricing eyebrow → null", () => {
    expect(validateComponentProps("pricing", { eyebrow: "x".repeat(81) })).toBeNull();
  });

  it("rejects invalid highlightStage → null", () => {
    expect(validateComponentProps("pricing", { highlightStage: 5 })).toBeNull();
  });

  it("accepts founders introLine and rejects oversized string", () => {
    expect(validateComponentProps("founders", { introLine: "Short intro." })).toEqual({
      introLine: "Short intro.",
    });
    expect(validateComponentProps("founders", { introLine: "x".repeat(201) })).toBeNull();
  });
});

describe("beat → readback SSE fixture (PAR-03 contract)", () => {
  it("parses a minimal beat-answer → next-beat sequence", () => {
    const events = [
      '{"type":"ink_gesture","kind":"circle","target":"[data-oi=\\"1\\"]"}',
      '{"type":"text_delta","delta":"So the picture is partial."}',
      '{"type":"ui_render","surface":"screen","component":"beat","props":{"beatId":"reality","question":"Is AI already being used?","options":["Yes","Some","No"],"progress":{"step":2,"total":6}}}',
      '{"type":"ink_gesture","kind":"arrow","target":"#opts"}',
    ];
    const chunks = events.map((e) => parseStreamChunk(e)).filter(Boolean);
    expect(chunks).toHaveLength(4);
    expect(chunks[0]).toMatchObject({ type: "ink_gesture", kind: "circle" });
    expect(chunks[2]).toMatchObject({ type: "ui_render", component: "beat" });
  });

  it("parses agent_handoff after final beat (readback path)", () => {
    expect(
      parseStreamChunk(
        '{"type":"agent_handoff","from":"room-host","to":"room-diagnostician","reason":"reality_check_complete"}',
      ),
    ).toMatchObject({ type: "agent_handoff", to: "room-diagnostician" });
  });
});
