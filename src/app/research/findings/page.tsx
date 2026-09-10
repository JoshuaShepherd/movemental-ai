import type { Metadata } from "next";
import { ResearchFindingsView } from "@/v2/components/research/research-findings-view";

export const metadata: Metadata = {
  title: "Key Findings | Movemental Research",
  description:
    "Six independent studies converge: adoption is broad, capability is rare, governance is mostly absent.",
};

export default function V2ResearchFindingsPage() {
  return <ResearchFindingsView />;
}
