import { appendOrgQuery, getWorkspacePrimaryNavItems, withOrgIfNeeded } from "@/lib/authenticated/workspace-primary-nav";
import { describe, expect, it } from "vitest";

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
    const staff = getWorkspacePrimaryNavItems({ programNavLabel: "Program", showStaff: true });
    expect(staff.some((i) => i.href === "/agent-runtime")).toBe(true);
  });

  it("omits staff links for non-staff", () => {
    const member = getWorkspacePrimaryNavItems({ programNavLabel: "Program", showStaff: false });
    expect(member.some((i) => i.href === "/agent-runtime")).toBe(false);
  });
});
