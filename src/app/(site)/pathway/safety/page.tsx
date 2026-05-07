import type { Metadata } from "next";

import { SafetyPage } from "@/components/studio/pages/pathway/SafetyPage";

export const metadata: Metadata = {
  title: "Safety Documentation",
  description: "Stage 01 — AI use and trust charters, board-ready documentation.",
};

export default function Page() {
  return <SafetyPage />;
}
