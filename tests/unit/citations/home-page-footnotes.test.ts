import { describe, expect, it } from "vitest";

import type { CitationId } from "@/lib/citations/claims";
import { EEAT_REGISTRY, getRegistryIdForCitation } from "@/lib/citations/eeat-registry";
import { HOME_PAGE_CLAIM_ORDER } from "@/lib/citations/home-page-claims";

const homeClaimSet = new Set<CitationId>(HOME_PAGE_CLAIM_ORDER);

describe("home page footnotes ↔ live chips", () => {
  it("HOME_PAGE_CLAIM_ORDER lists each id at most once", () => {
    const seen = new Set<string>();
    for (const id of HOME_PAGE_CLAIM_ORDER) {
      expect(seen.has(id), `duplicate claim id on home: ${id}`).toBe(false);
      seen.add(id);
    }
  });

  it("every EEAT home row with inline citationIds is wired on the home provider", () => {
    for (const row of EEAT_REGISTRY) {
      if (row.page !== "/") continue;
      const ids = row.citationIds ?? [];
      if (ids.length === 0) continue;
      for (const id of ids) {
        expect(
          homeClaimSet.has(id),
          `Row "${row.id}" cites "${id}" but HOME_PAGE_CLAIM_ORDER omits it`,
        ).toBe(true);
      }
    }
  });

  it("every home provider claim maps to an EEAT registry row", () => {
    for (const id of HOME_PAGE_CLAIM_ORDER) {
      expect(getRegistryIdForCitation(id), id).toBeDefined();
    }
  });
});
