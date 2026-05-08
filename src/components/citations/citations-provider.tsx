"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { CitationId } from "@/lib/citations/claims";

/**
 * Citation page context.
 *
 * Authors declare a page's citations as an ordered array of claim ids:
 *
 *   const HOME_CLAIMS = ["nonprofit-92-adoption", "nonprofit-81-adhoc", ...] as const;
 *
 *   <CitationsProvider claims={HOME_CLAIMS}>
 *     <HeroLedger />
 *     <ReferencesRail />
 *   </CitationsProvider>
 *
 * `<Cite />` calls `useCitationNumber(claimId)` to look up its index in the
 * array (1-based) and renders that as the chip number. `<ReferencesRail />`
 * iterates the same array to render the matching `<ol>`. The provider is
 * pure derivation — no state, no effects — so SSR renders the right numbers
 * on first paint and the page does not flicker.
 */

type CitationsContextValue = {
  claims: ReadonlyArray<CitationId>;
  /** 1-based page-scoped chip number for a claim id; returns 0 if the claim is
   *  not registered for this page (development warning rendered by the chip). */
  numberFor: (id: CitationId) => number;
};

const CitationsContext = createContext<CitationsContextValue | null>(null);

export function CitationsProvider({
  claims,
  children,
}: {
  claims: ReadonlyArray<CitationId>;
  children: ReactNode;
}) {
  const value = useMemo<CitationsContextValue>(() => {
    const index = new Map<CitationId, number>();
    claims.forEach((id, i) => {
      // First occurrence wins — repeating a claim id reuses the same chip.
      if (!index.has(id)) {
        index.set(id, i + 1);
      }
    });
    return {
      claims,
      numberFor: (id) => index.get(id) ?? 0,
    };
  }, [claims]);

  return (
    <CitationsContext.Provider value={value}>
      {children}
    </CitationsContext.Provider>
  );
}

export function useCitations(): CitationsContextValue {
  const ctx = useContext(CitationsContext);
  if (!ctx) {
    throw new Error(
      "useCitations must be called inside a <CitationsProvider />. Wrap the page tree.",
    );
  }
  return ctx;
}

export function useCitationNumber(id: CitationId): number {
  return useCitations().numberFor(id);
}
