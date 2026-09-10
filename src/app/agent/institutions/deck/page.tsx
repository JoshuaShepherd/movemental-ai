import type { Metadata } from "next";
import { institutionDeck } from "@/components/agent-room/deck/institution-deck";
import { DeckPresentationView } from "@/v2/components/deck/deck-presentation-view";

export const metadata: Metadata = {
  title: "Why a Platform for Institutions | Movemental",
  description: "Executive presentation deck for seminary and institutional leaders.",
};

export default function InstitutionsDeckPage() {
  return <DeckPresentationView deck={institutionDeck} backHref="/agent/institutions" />;
}
