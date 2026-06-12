import type { Metadata } from "next";

import { StandaloneDeck } from "@/components/agent-room/deck/standalone-deck";
import { churchDeck } from "@/components/agent-room/deck/church-deck";

export const metadata: Metadata = {
  title: "Why a platform, not a website builder? | Movemental",
  description:
    "You're not paying more for a website — you're finally able to share the ministry God has given you the way it deserves, now that the cost of building the platform came down. The church price reframe.",
  alternates: {
    canonical: "/agent/churches/deck",
  },
};

/**
 * Standalone full-viewport deck — same `churchDeck` data as the section
 * embedded in /agent/churches, so the two surfaces never drift.
 */
export default function ChurchesDeckPage() {
  return <StandaloneDeck data={churchDeck} foot="Movemental · For churches" />;
}
