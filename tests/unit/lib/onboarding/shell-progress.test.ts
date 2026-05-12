import { describe, expect, it } from "vitest";

import {
  computeLeaderOnboardingProgressPercentSync,
  computeOrgCustomerOnboardingProgressPercent,
} from "@/lib/onboarding/shell-progress-core";
import { ONBOARDING_TASKS } from "@/lib/onboarding/tasks";
import { isBlockingRequirement } from "@/lib/onboarding/state";
import type { MovementLeaderRow } from "@/lib/movement-leaders/movement-leaders.server";

function minimalLeader(over: Partial<MovementLeaderRow>): MovementLeaderRow {
  return {
    id: "lid",
    slug: "slug",
    full_name: "Name",
    email: "a@b.c",
    photo_url: null,
    primary_role: null,
    primary_organization: null,
    bio_short: null,
    bio_long: null,
    personal_piece: null,
    movement_leader_data: {},
    reflected_understanding_endorsed_at: null,
    public_page_approved_at: null,
    public_page_published_at: null,
    status: "active",
    ...over,
  };
}

describe("computeOrgCustomerOnboardingProgressPercent", () => {
  it("returns null when org onboarding is marked complete", () => {
    const tasks = ONBOARDING_TASKS.map((d) => ({
      key: d.key,
      dbStatus: "completed" as const,
    }));
    expect(
      computeOrgCustomerOnboardingProgressPercent({
        organization: { onboarding_completed_at: "2020-01-01" },
        tasks,
        leaderPaymentsEnabled: false,
      }),
    ).toBeNull();
  });

  it("returns null when all blocking tasks are done", () => {
    const leaderPayments = false;
    const blockingKeys = new Set(
      ONBOARDING_TASKS.filter((d) => isBlockingRequirement(d, leaderPayments)).map((d) => d.key),
    );
    const tasks = ONBOARDING_TASKS.map((d) => ({
      key: d.key,
      dbStatus:
        blockingKeys.has(d.key) && d.requirement !== "optional"
          ? ("completed" as const)
          : ("skipped" as const),
    }));
    expect(
      computeOrgCustomerOnboardingProgressPercent({
        organization: { onboarding_completed_at: null },
        tasks,
        leaderPaymentsEnabled: leaderPayments,
      }),
    ).toBeNull();
  });

  it("returns a mid percent when partially complete", () => {
    const leaderPayments = false;
    const tasks = ONBOARDING_TASKS.map((d) => {
      if (d.key === "sign_agreement") return { key: d.key, dbStatus: "completed" as const };
      return { key: d.key, dbStatus: "locked" as const };
    });
    const pct = computeOrgCustomerOnboardingProgressPercent({
      organization: { onboarding_completed_at: null },
      tasks,
      leaderPaymentsEnabled: leaderPayments,
    });
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });
});

describe("computeLeaderOnboardingProgressPercentSync", () => {
  it("returns null when published", () => {
    expect(
      computeLeaderOnboardingProgressPercentSync(
        minimalLeader({ public_page_published_at: "2020-01-01" }),
        true,
      ),
    ).toBeNull();
  });

  it("returns 0 when nothing is done (reflection draft present but not endorsed)", () => {
    expect(
      computeLeaderOnboardingProgressPercentSync(
        minimalLeader({
          movement_leader_data: { reflected_understanding: "Draft essay body." },
        }),
        false,
      ),
    ).toBe(0);
  });

  it("counts steps toward 100 before publish", () => {
    const pct = computeLeaderOnboardingProgressPercentSync(
      minimalLeader({
        bio_short: "x",
        bio_long: "y",
        photo_url: "https://x",
        personal_piece: "a".repeat(80),
        reflected_understanding_endorsed_at: "2020-01-01",
        public_page_approved_at: "2020-01-01",
      }),
      true,
    );
    expect(pct).toBe(Math.round((6 / 7) * 100));
  });
});
