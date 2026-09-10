import type { Metadata } from "next";
import { nonprofitDeck } from "@/components/agent-room/deck/nonprofit-deck";
import { DeckPresentationView } from "@/v2/components/deck/deck-presentation-view";

export const metadata: Metadata = {
  title: "Why a Platform for Non-Profits | Movemental",
  description: "Executive presentation deck for non-profit leaders.",
};

export default function NonprofitsDeckPage() {
  return <DeckPresentationView deck={nonprofitDeck} backHref="/agent/nonprofits" />;
}
