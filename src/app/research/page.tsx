import type { Metadata } from "next";
import { ResearchHubView } from "@/v2/components/research/research-hub-view";

export const metadata: Metadata = {
  title: "Research Library | Movemental",
  description:
    "Original papers on AI, trust, and the organizations whose credibility is on the line. Read here and cite freely.",
};

export default function V2ResearchPage() {
  return <ResearchHubView />;
}
