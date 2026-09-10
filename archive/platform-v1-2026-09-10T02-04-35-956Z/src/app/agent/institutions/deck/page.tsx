import type { Metadata } from "next";

import { StandaloneDeck } from "@/components/agent-room/deck/standalone-deck";
import { institutionDeck } from "@/components/agent-room/deck/institution-deck";

export const metadata: Metadata = {
  title: "Movemental, or a website builder? | Movemental",
  description:
    "For an institution this isn't a website line-item — it's credibility and governance infrastructure. The category reframe for seminaries, denominations, and universities.",
  alternates: {
    canonical: "/agent/institutions/deck",
  },
};

/**
 * Standalone full-viewport deck — same `institutionDeck` data as the section
 * embedded in /agent/institutions, so the two surfaces never drift.
 */
export default function InstitutionsDeckPage() {
  return <StandaloneDeck data={institutionDeck} foot="Movemental · For institutions" />;
}
