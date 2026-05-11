import { describe, expect, it } from "vitest";

import { resolveDashboardPersona } from "@/lib/dashboard/dashboard-persona";
import { presentOnboardingTaskForPersona } from "@/lib/onboarding/onboarding-persona-present";

describe("resolveDashboardPersona", () => {
  it("defaults to movement_leader for individual orgs", () => {
    expect(
      resolveDashboardPersona({
        slug: "lucas-pulley",
        organization_type: "individual",
        settings: {},
      }),
    ).toBe("movement_leader");
  });

  it("treats nonprofit buyer organization rows as implementation_org", () => {
    expect(
      resolveDashboardPersona({
        slug: "youthfront",
        organization_type: "organization",
        settings: {},
      }),
    ).toBe("implementation_org");
  });

  it("keeps Movemental internal org as movement_leader", () => {
    expect(
      resolveDashboardPersona({
        slug: "movemental",
        organization_type: "organization",
        settings: {},
      }),
    ).toBe("movement_leader");
  });

  it("respects explicit settings.dashboardPersona", () => {
    expect(
      resolveDashboardPersona({
        slug: "movemental",
        organization_type: "organization",
        settings: { dashboardPersona: "implementation_org" },
      }),
    ).toBe("implementation_org");

    expect(
      resolveDashboardPersona({
        slug: "youthfront",
        organization_type: "organization",
        settings: { dashboardPersona: "movement_leader" },
      }),
    ).toBe("movement_leader");
  });
});

describe("presentOnboardingTaskForPersona", () => {
  it("leaves catalog copy for movement_leader", () => {
    const out = presentOnboardingTaskForPersona(
      "movement_leader",
      "organization_profile",
      "Catalog title",
      "Catalog body",
    );
    expect(out.title).toBe("Catalog title");
    expect(out.description).toBe("Catalog body");
  });

  it("overrides selected tasks for implementation_org", () => {
    const out = presentOnboardingTaskForPersona(
      "implementation_org",
      "organization_profile",
      "Tell us about your organization",
      "Org name, domain…",
    );
    expect(out.title).toBe("Tell us about your organization");
    expect(out.description).toContain("operating sites");
  });
});
