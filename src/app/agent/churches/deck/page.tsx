import type { Metadata } from "next";
import { churchDeck } from "@/components/agent-room/deck/church-deck";
import { DeckPresentationView } from "@/v2/components/deck/deck-presentation-view";

export const metadata: Metadata = {
  title: "Why a Platform for Churches | Movemental",
  description: "Executive presentation deck for church leaders.",
};

export default function ChurchesDeckPage() {
  return <DeckPresentationView deck={churchDeck} backHref="/agent/churches" />;
}
