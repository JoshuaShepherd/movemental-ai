import { describe, expect, it } from "vitest";

import {
  isHighConfidenceLocalRoute,
  routeInput,
} from "../../src/lib/agent-room/route-input";

describe("routeInput", () => {
  it("routes philosophy questions to FAQ", () => {
    expect(routeInput("What's their philosophy")).toBe("toFaq");
    expect(routeInput("what is your approach to AI")).toBe("toFaq");
    expect(routeInput("Are you pro-AI or anti-AI?")).toBe("toFaq");
  });

  it("routes what's / what is movemental questions to about", () => {
    expect(routeInput("what's movemental")).toBe("whatIs");
    expect(routeInput("what is movemental")).toBe("whatIs");
    expect(routeInput("tell me about movemental")).toBe("whatIs");
  });

  it("routes high-confidence local intents", () => {
    expect(routeInput("what does it cost")).toBe("cost");
    expect(routeInput("show me the whole path")).toBe("toPath");
    expect(routeInput("get a clear next step")).toBe("toSafetyFlow");
    expect(routeInput("map where we stand")).toBe("toSafetyFlow");
    expect(routeInput("where should we start")).toBe("toSafetyFlow");
  });

  it("returns fallback for truly off-domain input", () => {
    expect(routeInput("quantum physics")).toBe("fallback");
    expect(routeInput("")).toBe("fallback");
    expect(routeInput("   ")).toBe("fallback");
  });

  it("does not route mid-sentence about to the About screen", () => {
    expect(routeInput("question about donors")).toBe("fallback");
    expect(routeInput("concern about our board")).toBe("fallback");
  });

  it("may route sandbox mentions in longer phrases (documented intent)", () => {
    expect(routeInput("tell me about our sandbox pilot")).toBe("toSandbox");
  });

  it("long paste with no keyword falls through to fallback", () => {
    const paste = "a".repeat(500);
    expect(routeInput(paste)).toBe("fallback");
  });
});

describe("isHighConfidenceLocalRoute", () => {
  it("guards whatIs against bare about", () => {
    expect(isHighConfidenceLocalRoute("tell me about movemental", "whatIs")).toBe(true);
    expect(isHighConfidenceLocalRoute("question about donors", "whatIs")).toBe(false);
  });

  it("accepts explicit cost and safety-flow phrasing", () => {
    expect(isHighConfidenceLocalRoute("what does it cost", "cost")).toBe(true);
    expect(isHighConfidenceLocalRoute("map where we stand", "toSafetyFlow")).toBe(true);
  });
});
