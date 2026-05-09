import { describe, expect, it } from "vitest";

import { ONBOARDING_TASKS, TASK_KEY_SET } from "@/lib/onboarding/tasks";

describe("onboarding task catalog", () => {
  it("resolves every dependsOn to a real task key", () => {
    for (const task of ONBOARDING_TASKS) {
      for (const dep of task.dependsOn) {
        expect(TASK_KEY_SET.has(dep), `Missing dependency ${dep} for ${task.key}`).toBe(true);
      }
    }
  });

  it("has an acyclic dependency graph", () => {
    const visiting = new Set<string>();
    const visited = new Set<string>();

    function visit(key: string) {
      if (visited.has(key)) return;
      if (visiting.has(key)) {
        throw new Error(`Cycle detected at ${key}`);
      }
      visiting.add(key);
      const task = ONBOARDING_TASKS.find((t) => t.key === key);
      for (const dep of task?.dependsOn ?? []) {
        visit(dep);
      }
      visiting.delete(key);
      visited.add(key);
    }

    for (const t of ONBOARDING_TASKS) {
      visit(t.key);
    }

    expect(visited.size).toBe(ONBOARDING_TASKS.length);
  });

  it("marks every Phase 3 task as Movemental-prep gated", () => {
    const phase3 = ONBOARDING_TASKS.filter((t) => t.phase === "content");
    expect(phase3.length).toBeGreaterThan(0);
    for (const t of phase3) {
      expect(t.requiresMovementalPrep).toBe(true);
    }
  });

  it("keeps Phase 4 tasks downstream of Phase 3 via dependencies", () => {
    const phase4 = ONBOARDING_TASKS.filter((t) => t.phase === "activation");
    const phase3Keys = new Set(ONBOARDING_TASKS.filter((t) => t.phase === "content").map((t) => t.key));

    function reachesPhase3(key: string, guard: Set<string>): boolean {
      if (phase3Keys.has(key)) return true;
      if (guard.has(key)) return false;
      guard.add(key);
      const task = ONBOARDING_TASKS.find((t) => t.key === key);
      if (!task) return false;
      return task.dependsOn.some((dep) => reachesPhase3(dep, guard));
    }

    for (const t of phase4) {
      expect(reachesPhase3(t.key, new Set())).toBe(true);
    }
  });
});
