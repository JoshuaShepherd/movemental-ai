import type { Metadata } from "next";

import { StandaloneDeck } from "@/components/agent-room/deck/standalone-deck";
import { nonprofitDeck } from "@/components/agent-room/deck/nonprofit-deck";

export const metadata: Metadata = {
  title: "Why a platform, not a website builder? | Movemental",
  description:
    "You're not paying more for a website — you're affording the platform your mission always needed, now that the cost of building it came down. The nonprofit price reframe.",
  alternates: {
    canonical: "/agent/nonprofits/deck",
  },
};

/**
 * Standalone full-viewport deck — same `nonprofitDeck` data as the section
 * embedded in /agent/nonprofits, so the two surfaces never drift.
 */
export default function NonprofitsDeckPage() {
  return <StandaloneDeck data={nonprofitDeck} foot="Movemental · For nonprofits" />;
}
