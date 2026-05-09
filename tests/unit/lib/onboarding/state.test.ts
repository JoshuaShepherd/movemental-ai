import { describe, expect, it } from "vitest";

import {
  computeNewlyAvailableKeys,
  readLeaderPaymentsEnabled,
  shouldAutoSkipTaxForm,
  type TaskRowLike,
} from "@/lib/onboarding/state";
import { ONBOARDING_TASKS } from "@/lib/onboarding/tasks";

function row(
  key: string,
  status: TaskRowLike["status"],
  movemental_unlocked = true,
): TaskRowLike {
  return { task_key: key, status, movemental_unlocked };
}

describe("onboarding state helpers", () => {
  it("promotes sign_agreement dependents after agreement completes", () => {
    const byKey = new Map<string, TaskRowLike>(
      ONBOARDING_TASKS.map((def) => {
        if (def.key === "sign_agreement") return [def.key, row(def.key, "completed")];
        if (def.dependsOn.includes("sign_agreement")) return [def.key, row(def.key, "locked")];
        return [def.key, row(def.key, "locked")];
      }),
    );

    const promoted = computeNewlyAvailableKeys(ONBOARDING_TASKS, byKey);
    expect(promoted).toContain("confirm_payment");
    expect(promoted).toContain("choose_cohort");
  });

  it("does not promote Movemental-gated tasks until unlocked", () => {
    const byKey = new Map<string, TaskRowLike>([
      ["organization_profile", row("organization_profile", "completed")],
      ["corpus_review", row("corpus_review", "locked", false)],
    ]);

    const promoted = computeNewlyAvailableKeys(ONBOARDING_TASKS, byKey);
    expect(promoted).not.toContain("corpus_review");
  });

  it("reads leader payment flag from organization settings", () => {
    expect(readLeaderPaymentsEnabled(null)).toBe(false);
    expect(readLeaderPaymentsEnabled({ leader_payments_enabled: true })).toBe(true);
  });

  it("detects tax_form auto-skip only after agreement completion without leader payments", () => {
    const byKey = new Map<string, TaskRowLike>([
      ["sign_agreement", row("sign_agreement", "completed")],
      ["tax_form", row("tax_form", "locked")],
    ]);
    expect(shouldAutoSkipTaxForm(false, byKey)).toBe(true);
    expect(shouldAutoSkipTaxForm(true, byKey)).toBe(false);
  });
});
