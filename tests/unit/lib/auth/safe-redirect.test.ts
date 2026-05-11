import { describe, expect, it } from "vitest";

import { sanitizeAuthRedirectNext } from "@/lib/auth/safe-redirect";

describe("sanitizeAuthRedirectNext", () => {
  it("allows simple internal paths", () => {
    expect(sanitizeAuthRedirectNext("/dashboard")).toBe("/dashboard");
    expect(sanitizeAuthRedirectNext("/program/safety/foo")).toBe("/program/safety/foo");
    expect(sanitizeAuthRedirectNext("/auth/update-password")).toBe("/auth/update-password");
  });

  it("rejects open redirects", () => {
    expect(sanitizeAuthRedirectNext("https://evil.com")).toBe("/dashboard");
    expect(sanitizeAuthRedirectNext("//evil.com")).toBe("/dashboard");
    expect(sanitizeAuthRedirectNext("\\\\evil.com")).toBe("/dashboard");
  });

  it("uses fallback for null and empty", () => {
    expect(sanitizeAuthRedirectNext(null)).toBe("/dashboard");
    expect(sanitizeAuthRedirectNext(undefined)).toBe("/dashboard");
    expect(sanitizeAuthRedirectNext("")).toBe("/dashboard");
  });

  it("accepts custom fallback", () => {
    expect(sanitizeAuthRedirectNext(null, "/login")).toBe("/login");
  });

  it("decodes encoded safe paths", () => {
    expect(sanitizeAuthRedirectNext(encodeURIComponent("/dashboard/onboarding/1"))).toBe(
      "/dashboard/onboarding/1",
    );
  });
});
