import { describe, expect, it } from "vitest";

import {
  shareBlueskyCompose,
  shareEmail,
  shareFacebookSharer,
  shareLinkedInOffsite,
  shareTwitterIntent,
} from "@/lib/share-links";

describe("share-links", () => {
  it("builds Twitter intent with encoded params", () => {
    const u = shareTwitterIntent("Hello & world", "https://example.com/a b");
    expect(u).toContain("twitter.com/intent/tweet");
    expect(decodeURIComponent(u)).toContain("Hello & world");
    expect(decodeURIComponent(u)).toContain("https://example.com/a b");
  });

  it("builds LinkedIn offsite URL", () => {
    expect(shareLinkedInOffsite("https://x.com/y")).toContain(
      "linkedin.com/sharing/share-offsite",
    );
  });

  it("builds Facebook sharer URL", () => {
    expect(shareFacebookSharer("https://a.com")).toContain("facebook.com/sharer");
  });

  it("builds Bluesky compose URL", () => {
    const u = shareBlueskyCompose("Title", "https://b.com");
    expect(u).toContain("bsky.app/intent/compose");
    expect(decodeURIComponent(u)).toContain("Title");
    expect(decodeURIComponent(u)).toContain("https://b.com");
  });

  it("builds mailto with encoded subject and body", () => {
    const u = shareEmail("Q & A", "https://c.com");
    expect(u.startsWith("mailto:?")).toBe(true);
    expect(decodeURIComponent(u)).toContain("Q & A");
    expect(decodeURIComponent(u)).toContain("https://c.com");
  });
});
