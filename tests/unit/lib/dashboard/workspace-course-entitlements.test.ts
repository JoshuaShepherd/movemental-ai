import { describe, expect, it } from "vitest";

import {
  isSandboxLiveFirstHub,
  resolveWorkspaceCourseEntitlements,
  WORKSPACE_COURSES_NONE,
  workspaceSandboxNavLabel,
} from "@/lib/dashboard/workspace-course-entitlements";

describe("resolveWorkspaceCourseEntitlements", () => {
  it("defaults to no product courses when settings empty", () => {
    expect(resolveWorkspaceCourseEntitlements(null)).toEqual(WORKSPACE_COURSES_NONE);
  });

  it("maps sandbox_live_focus preset when workspaceCourses missing", () => {
    expect(resolveWorkspaceCourseEntitlements({ workspaceNavPreset: "sandbox_live_focus" })).toEqual({
      safety: false,
      sandbox: true,
      skills: false,
      solutions: false,
    });
  });

  it("explicit non-empty workspaceCourses wins over preset", () => {
    expect(
      resolveWorkspaceCourseEntitlements({
        workspaceNavPreset: "sandbox_live_focus",
        workspaceCourses: ["safety", "sandbox"],
      }),
    ).toEqual({
      safety: true,
      sandbox: true,
      skills: false,
      solutions: false,
    });
  });

  it("treats empty workspaceCourses array as explicitly none (preset ignored)", () => {
    expect(
      resolveWorkspaceCourseEntitlements({
        workspaceNavPreset: "sandbox_live_focus",
        workspaceCourses: [],
      }),
    ).toEqual(WORKSPACE_COURSES_NONE);
  });

  it("ignores unknown course strings", () => {
    expect(
      resolveWorkspaceCourseEntitlements({ workspaceCourses: ["sandbox", "nope", "skills"] }),
    ).toEqual({
      safety: false,
      sandbox: true,
      skills: true,
      solutions: false,
    });
  });
});

describe("workspaceSandboxNavLabel", () => {
  it('uses "Sandbox" when safety is off and sandbox is on', () => {
    expect(
      workspaceSandboxNavLabel({ safety: false, sandbox: true, skills: false, solutions: false }),
    ).toBe("Sandbox");
  });

  it('uses "SandboxLive" when safety is on', () => {
    expect(
      workspaceSandboxNavLabel({ safety: true, sandbox: true, skills: false, solutions: false }),
    ).toBe("SandboxLive");
  });
});

describe("isSandboxLiveFirstHub", () => {
  it("is true for implementation org without safety with sandbox", () => {
    expect(
      isSandboxLiveFirstHub("implementation_org", {
        safety: false,
        sandbox: true,
        skills: false,
        solutions: false,
      }),
    ).toBe(true);
  });

  it("is false for movement leader", () => {
    expect(
      isSandboxLiveFirstHub("movement_leader", {
        safety: false,
        sandbox: true,
        skills: false,
        solutions: false,
      }),
    ).toBe(false);
  });
});
