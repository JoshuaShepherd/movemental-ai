import { appendOrgQuery, getWorkspacePrimaryNavItems, withOrgIfNeeded } from "@/lib/authenticated/workspace-primary-nav";
import type { WorkspaceCourseEntitlements } from "@/lib/dashboard/workspace-course-entitlements";
import { describe, expect, it } from "vitest";

/** Explicit allowlist: Program + SandboxLive + SafeStart (typical buyer). */
const SAFETY_AND_SANDBOX: WorkspaceCourseEntitlements = {
  safety: true,
  sandbox: true,
  skills: false,
  solutions: false,
};

describe("appendOrgQuery", () => {
  it("adds org query when slug present", () => {
    expect(appendOrgQuery("/welcome", "acme")).toBe("/welcome?org=acme");
  });

  it("returns href unchanged when slug missing", () => {
    expect(appendOrgQuery("/welcome", null)).toBe("/welcome");
    expect(appendOrgQuery("/welcome", "")).toBe("/welcome");
  });

  it("appends with & when href already has query", () => {
    expect(appendOrgQuery("/welcome?tab=1", "acme")).toBe("/welcome?tab=1&org=acme");
  });
});

describe("withOrgIfNeeded", () => {
  it("respects appendOrg false", () => {
    expect(withOrgIfNeeded({ href: "/admin/onboarding", appendOrg: false }, "acme")).toBe("/admin/onboarding");
  });
});

describe("getWorkspacePrimaryNavItems", () => {
  it("includes agent runtime for staff", () => {
    const staff = getWorkspacePrimaryNavItems({
      programNavLabel: "Program",
      showStaff: true,
      courses: SAFETY_AND_SANDBOX,
    });
    expect(staff.some((i) => i.href === "/agent-runtime")).toBe(true);
  });

  it("omits staff links for non-staff", () => {
    const member = getWorkspacePrimaryNavItems({
      programNavLabel: "Program",
      showStaff: false,
      courses: SAFETY_AND_SANDBOX,
    });
    expect(member.some((i) => i.href === "/agent-runtime")).toBe(false);
  });

  it("omits program and safestart when safety course is off", () => {
    const items = getWorkspacePrimaryNavItems({
      programNavLabel: "Program",
      showStaff: false,
      courses: { safety: false, sandbox: true, skills: false, solutions: false },
    });
    expect(items.some((i) => i.href === "/program")).toBe(false);
    expect(items.some((i) => i.href === "/safestart")).toBe(false);
    expect(items.some((i) => i.href === "/sandboxlive")).toBe(true);
  });

  it("adds skills and solutions when enabled", () => {
    const items = getWorkspacePrimaryNavItems({
      programNavLabel: "Program",
      showStaff: false,
      courses: { safety: true, sandbox: true, skills: true, solutions: true },
    });
    expect(items.some((i) => i.href === "/dashboard/skills")).toBe(true);
    expect(items.some((i) => i.href === "/dashboard/solutions")).toBe(true);
  });
});
