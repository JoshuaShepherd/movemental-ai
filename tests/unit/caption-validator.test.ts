import { describe, expect, it } from "vitest";

import {
  CAPTION_CHAR_FALLBACK,
  validateCaption,
} from "../../src/lib/agent-room/caption-validator";

describe("caption-validator", () => {
  it("accepts a short single-line caption", () => {
    const result = validateCaption("Welcome — let's look at Safety.");
    expect(result.eligible).toBe(true);
    if (result.eligible) {
      expect(result.caption).toBe("Welcome — let's look at Safety.");
    }
  });

  it("rejects multiline strings", () => {
    expect(validateCaption("Line one\nLine two").eligible).toBe(false);
  });

  it("rejects strings over the character fallback", () => {
    const long = "a".repeat(CAPTION_CHAR_FALLBACK + 1);
    expect(validateCaption(long).eligible).toBe(false);
  });

  it("rejects empty strings", () => {
    expect(validateCaption("   ").eligible).toBe(false);
  });
});
