import { describe, expect, it } from "vitest";

import {
  createNewsletterUnsubscribeToken,
  verifyNewsletterUnsubscribeToken,
} from "@/lib/newsletter-unsubscribe-token";

describe("newsletter-unsubscribe-token", () => {
  const secret = "test-secret-at-least-16";

  it("round-trips a valid token", () => {
    const id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    const token = createNewsletterUnsubscribeToken(id, secret);
    const parsed = verifyNewsletterUnsubscribeToken(token, secret);
    expect(parsed).toEqual({ subscriberId: id });
  });

  it("rejects tampered payload", () => {
    const id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    const token = createNewsletterUnsubscribeToken(id, secret);
    const tampered = token.slice(0, -4) + "xxxx";
    expect(verifyNewsletterUnsubscribeToken(tampered, secret)).toBeNull();
  });

  it("rejects wrong secret", () => {
    const id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    const token = createNewsletterUnsubscribeToken(id, secret);
    expect(verifyNewsletterUnsubscribeToken(token, "other-secret-at-least-16")).toBeNull();
  });
});
