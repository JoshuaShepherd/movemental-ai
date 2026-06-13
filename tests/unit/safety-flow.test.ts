import { describe, expect, it } from "vitest";

import {
  safetyFlowBackStep,
  safetyFlowStepAfterAnswer,
  safetyFlowStepperIndex,
  SAFETY_FLOW_QUESTION,
} from "../../src/lib/agent-room/data/safety-flow";

describe("safety flow wizard routing", () => {
  it("maps answers to result or ahead", () => {
    expect(safetyFlowStepAfterAnswer("start")).toBe("result");
    expect(safetyFlowStepAfterAnswer("draft")).toBe("result");
    expect(safetyFlowStepAfterAnswer("done")).toBe("ahead");
  });

  it("stepper index tracks wizard progress", () => {
    expect(safetyFlowStepperIndex("question")).toBe(0);
    expect(safetyFlowStepperIndex("result")).toBe(1);
    expect(safetyFlowStepperIndex("charter")).toBe(2);
    expect(safetyFlowStepperIndex("fork")).toBe(3);
    expect(safetyFlowStepperIndex("signup")).toBe(3);
    expect(safetyFlowStepperIndex("signup_sent")).toBe(3);
  });

  it("back navigation walks the linear path", () => {
    expect(safetyFlowBackStep("result")).toBe("question");
    expect(safetyFlowBackStep("charter")).toBe("result");
    expect(safetyFlowBackStep("fork")).toBe("charter");
    expect(safetyFlowBackStep("signup")).toBe("fork");
    expect(safetyFlowBackStep("question")).toBeNull();
  });

  it("question has four answer options", () => {
    expect(SAFETY_FLOW_QUESTION.options).toHaveLength(4);
  });
});
