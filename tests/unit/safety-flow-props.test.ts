import { describe, expect, it } from "vitest";

import { safetyFlowProps } from "../../src/lib/agent-room/component-props";
import { SAFETY_FLOW_ENGINE_STEPS } from "../../src/lib/agent-room/data/safety-flow";

describe("safety flow engine props (AU-21)", () => {
  it("accepts all engine wizard steps", () => {
    for (const step of SAFETY_FLOW_ENGINE_STEPS) {
      const parsed = safetyFlowProps.safeParse({ step });
      expect(parsed.success, `step ${step} should validate`).toBe(true);
    }
  });

  it("accepts result step with optional answer", () => {
    const parsed = safetyFlowProps.safeParse({ step: "result", answer: "draft" });
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data).toEqual({ step: "result", answer: "draft" });
    }
  });

  it("rejects unknown steps", () => {
    const parsed = safetyFlowProps.safeParse({ step: "signup_sent" });
    expect(parsed.success).toBe(false);
  });
});
