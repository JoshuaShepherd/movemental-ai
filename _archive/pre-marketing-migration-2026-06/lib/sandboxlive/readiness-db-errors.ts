import "server-only";

/** Postgres undefined_table — sandbox readiness tables not migrated yet. */
export function isSandboxReadinessTableMissing(error: unknown): boolean {
  let current: unknown = error;
  for (let depth = 0; depth < 8 && current; depth += 1) {
    if (typeof current === "object" && current !== null) {
      const code =
        "code" in current ? String((current as { code: unknown }).code) : "";
      if (code === "42P01") {
        return true;
      }
      const message =
        "message" in current ? String((current as { message: unknown }).message) : "";
      if (
        message.includes("does not exist") &&
        message.includes("sandbox_staff_readiness")
      ) {
        return true;
      }
    }
    if (typeof current === "string") {
      if (
        current.includes("does not exist") &&
        current.includes("sandbox_staff_readiness")
      ) {
        return true;
      }
      break;
    }
    if (
      typeof current === "object" &&
      current !== null &&
      "cause" in current &&
      (current as { cause: unknown }).cause !== undefined
    ) {
      current = (current as { cause: unknown }).cause;
    } else {
      break;
    }
  }
  return false;
}

export const SANDBOX_READINESS_MIGRATION_HINT =
  "Run scripts/sql/20260514_sandbox_staff_readiness_invites_anon.sql and scripts/sql/20260514_sandbox_staff_readiness_submissions.sql (or pnpm db:migrate).";
