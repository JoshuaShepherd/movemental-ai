import { describe, expect, it } from "vitest";

import { validateComponentProps } from "../../src/lib/agent-room/component-props";
import {
  TRANSCRIPT_TURN_CAP,
  transcriptRowsToThread,
  type TranscriptRow,
} from "../../src/lib/agent-room/transcript-service";

describe("transcript restore helpers", () => {
  it("maps durable rows to thread turns", () => {
    const rows: TranscriptRow[] = [
      { role: "user", content: "What is the path?", createdAt: "2026-06-18T00:00:00Z" },
      { role: "assistant", content: "Four stages.", createdAt: "2026-06-18T00:00:01Z" },
    ];
    expect(transcriptRowsToThread(rows)).toEqual([
      { role: "user", content: "What is the path?" },
      { role: "assistant", content: "Four stages." },
    ]);
  });

  it("exports a turn cap aligned with proxy history", () => {
    expect(TRANSCRIPT_TURN_CAP).toBe(50);
  });
});

describe("validateComponentProps (AU-16 dynamic props)", () => {
  it("accepts about lede within max length", () => {
    expect(validateComponentProps("about", { lede: "Trust-first AI for churches." })).toEqual({
      lede: "Trust-first AI for churches.",
    });
  });

  it("rejects about lede over 300 chars", () => {
    expect(validateComponentProps("about", { lede: "x".repeat(301) })).toBeNull();
  });
});
