import type { Result } from "@/lib/services/simplified/base.service";

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(code: string, message: string): Result<never> {
  return { success: false, error: { code, message } };
}

const NAME_MIN = 3;
const NAME_MAX = 200;

export function normalizeSignatoryLegalName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim();
}

export function validateSignatoryLegalName(name: string): Result<string> {
  const n = normalizeSignatoryLegalName(name);
  if (n.length < NAME_MIN) {
    return err("invalid_name", `Enter your full legal name (at least ${NAME_MIN} characters).`);
  }
  if (n.length > NAME_MAX) {
    return err("invalid_name", "That name is too long.");
  }
  const parts = n.split(" ").filter(Boolean);
  if (parts.length < 2) {
    return err("invalid_name", "Enter your first and last name as they should appear on the agreement.");
  }
  return ok(n);
}
