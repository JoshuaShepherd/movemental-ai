import { describe, expect, it } from "vitest";

import {
  normalizeSignatoryLegalName,
  validateSignatoryLegalName,
} from "@/lib/onboarding/org-agreement-esign.validation";

describe("normalizeSignatoryLegalName", () => {
  it("trims and collapses spaces", () => {
    expect(normalizeSignatoryLegalName("  Jane   Q.  Doe  ")).toBe("Jane Q. Doe");
  });
});

describe("validateSignatoryLegalName", () => {
  it("requires two words", () => {
    const r = validateSignatoryLegalName("Madonna");
    expect(r.success).toBe(false);
  });

  it("accepts first last", () => {
    const r = validateSignatoryLegalName("Jane Doe");
    expect(r.success).toBe(true);
    if (r.success) expect(r.data).toBe("Jane Doe");
  });
});
