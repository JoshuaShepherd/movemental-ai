import { describe, expect, it } from "vitest";

import { routeInput } from "../../src/lib/agent-room/route-input";

describe("routeInput", () => {
  it("routes philosophy questions to FAQ", () => {
    expect(routeInput("What's their philosophy")).toBe("toFaq");
    expect(routeInput("what is your approach to AI")).toBe("toFaq");
    expect(routeInput("Are you pro-AI or anti-AI?")).toBe("toFaq");
  });

  it("routes what’s / what is questions to about", () => {
    expect(routeInput("what's movemental")).toBe("whatIs");
    expect(routeInput("what is movemental")).toBe("whatIs");
  });

  it("returns fallback for truly off-domain input", () => {
    expect(routeInput("quantum physics")).toBe("fallback");
  });

  it("does not route mid-sentence about to the About screen", () => {
    expect(routeInput("question about donors")).toBe("fallback");
  });
});
