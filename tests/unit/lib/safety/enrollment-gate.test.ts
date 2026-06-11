import { describe, expect, it } from "vitest";

import { slugifyHeading } from "@/lib/slugify-heading";

/**
 * Enrollment gate hits the database — integration coverage belongs in e2e/ops QA.
 * This spec locks slug derivation used during provision (dedupe suffix logic is in org-slug.ts).
 */
describe("provision slug derivation", () => {
  it("slugifies org names for organizations.slug base", () => {
    expect(slugifyHeading("Grace Community Church")).toBe("grace-community-church");
    expect(slugifyHeading("St. Mark's Nonprofit!")).toBe("st-marks-nonprofit");
  });
});
