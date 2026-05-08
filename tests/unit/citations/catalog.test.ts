/**
 * Citation catalog integrity tests.
 *
 * These tests are the structural gate that keeps the corpus in sync with what
 * appears on the live site. They protect against three failure modes:
 *
 *   1. Orphan claims — a claim referencing a source id that does not exist.
 *   2. URL rot — a source row missing or holding a non-https URL.
 *   3. Drift — a DROPPED claim from corpus Section 10 sneaking back into the
 *      catalog (the 91% of church leaders use AI, the 9% formal AI policy,
 *      the 25% of churches encountered AI scams).
 */

import { describe, expect, it } from "vitest";

import { citations, type Citation } from "@/lib/citations/claims";
import { sources } from "@/lib/citations/sources";

const claims: Citation[] = Object.values(citations);

describe("citation source catalog", () => {
  it("every source has a non-empty https URL", () => {
    for (const source of Object.values(sources)) {
      expect(source.url, source.id).toMatch(/^https:\/\//);
    }
  });

  it("every source carries a stable id matching its key", () => {
    for (const [key, source] of Object.entries(sources)) {
      expect(source.id).toBe(key);
    }
  });

  it("no source carries a confidence tag of DROP", () => {
    for (const source of Object.values(sources)) {
      // ConfidenceTag is a union without DROP; this guards against a future
      // typo or soft-typed import sneaking the value back in.
      expect(["VERIFIED", "QUALIFIED", "NEW"]).toContain(source.tag);
    }
  });
});

describe("citation claims catalog", () => {
  it("every claim points to an existing source", () => {
    for (const claim of claims) {
      expect(sources[claim.source], claim.id).toBeDefined();
    }
  });

  it("every claim id matches its key", () => {
    for (const [key, claim] of Object.entries(citations)) {
      expect(claim.id).toBe(key);
    }
  });

  it("does not contain corpus §10 DROP claims", () => {
    // These are the literal strings flagged for removal in
    // docs/research/state-of-ai-2026/movemental-research-corpus-v1.md §10.
    // If any claim text contains them, the corpus correction has been
    // re-introduced — fix the prose, do not soften this assertion.
    const droppedPhrases = [
      "91% of church leaders",
      "9% have a formal AI policy",
      "25% of churches encountered",
      "25% of churches have already encountered",
    ];

    for (const claim of claims) {
      const lower = claim.claim.toLowerCase();
      for (const phrase of droppedPhrases) {
        expect(lower, claim.id).not.toContain(phrase.toLowerCase());
      }
    }
  });

  it("popover claims surround stats in <strong> for emphasis", () => {
    // Any claim that names a percentage or dollar figure (i.e. an empirical
    // stat, not a paragraph reference) should also use <strong>, otherwise
    // the popover reads as flat prose. Paragraph markers like "¶112" and
    // years are intentionally excluded.
    for (const claim of claims) {
      const hasStat = /[%$]|\d{1,3}\s?(million|billion|trillion|×|x)\b/i.test(
        claim.claim,
      );
      if (hasStat) {
        expect(claim.claim, claim.id).toContain("<strong>");
      }
    }
  });
});
