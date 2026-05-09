import type { OnboardingTaskDefinition } from "@/lib/onboarding/tasks";
import { ONBOARDING_TASKS } from "@/lib/onboarding/tasks";

export type TaskRowStatus =
  | "locked"
  | "available"
  | "in_progress"
  | "completed"
  | "skipped";

/** UI-facing state after merging catalog rules with row data. */
export type OnboardingTaskUiStatus =
  | "locked"
  | "waiting_movemental"
  | "available"
  | "in_progress"
  | "completed"
  | "skipped";

export interface TaskRowLike {
  task_key: string;
  status: TaskRowStatus;
  movemental_unlocked: boolean;
}

export function readLeaderPaymentsEnabled(settings: unknown): boolean {
  if (!settings || typeof settings !== "object") return false;
  return Boolean((settings as Record<string, unknown>).leader_payments_enabled);
}

export function dependencySatisfied(
  def: OnboardingTaskDefinition,
  rowByKey: Map<string, TaskRowLike>,
): boolean {
  return def.dependsOn.every((k) => {
    const r = rowByKey.get(k);
    return r && (r.status === "completed" || r.status === "skipped");
  });
}

/** Whether this definition blocks org completion when unfinished. */
export function isBlockingRequirement(
  def: OnboardingTaskDefinition,
  leaderPaymentsEnabled: boolean,
): boolean {
  if (def.requirement === "optional") return false;
  if (def.key === "tax_form" && !leaderPaymentsEnabled) return false;
  return true;
}

export function evaluateTaskUiStatus(
  def: OnboardingTaskDefinition,
  row: TaskRowLike | undefined,
  rowByKey: Map<string, TaskRowLike>,
): OnboardingTaskUiStatus {
  if (!row) return "locked";
  if (row.status === "completed" || row.status === "skipped") {
    return row.status;
  }
  if (row.status === "in_progress") return "in_progress";
  if (!dependencySatisfied(def, rowByKey)) return "locked";
  if (def.requiresMovementalPrep && !row.movemental_unlocked) {
    return "waiting_movemental";
  }
  if (row.status === "available") return "available";
  return "locked";
}

/**
 * Returns task keys that should move from `locked` to `available`, given current rows.
 * Does not mutate. Caller persists updates.
 */
export function computeNewlyAvailableKeys(
  defs: readonly OnboardingTaskDefinition[],
  rowByKey: Map<string, TaskRowLike>,
): string[] {
  const promoted: string[] = [];
  for (const def of defs) {
    const row = rowByKey.get(def.key);
    if (!row || row.status !== "locked") continue;
    if (!row.movemental_unlocked && def.requiresMovementalPrep) continue;
    if (!dependencySatisfied(def, rowByKey)) continue;
    promoted.push(def.key);
  }
  return promoted;
}

export function shouldAutoSkipTaxForm(
  leaderPaymentsEnabled: boolean,
  rowByKey: Map<string, TaskRowLike>,
): boolean {
  if (leaderPaymentsEnabled) return false;
  const sign = rowByKey.get("sign_agreement");
  if (!sign || sign.status !== "completed") return false;
  const tax = rowByKey.get("tax_form");
  if (!tax) return false;
  return tax.status === "locked" || tax.status === "available";
}
