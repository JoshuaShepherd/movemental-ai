import type { Metadata } from "next";

import { FoundationsPage as StudioFoundationsPage } from "@/components/studio/pages/pathway/FoundationsPage";

export const metadata: Metadata = {
  title: "Safety Documentation",
  description: "Mile Marker 01 — AI use and trust charters, board-ready documentation.",
};

export default function Page() {
  return (
    <StudioFoundationsPage />
  );
}
