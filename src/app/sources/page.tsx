import type { Metadata } from "next";
import { ResearchSourcesView } from "@/v2/components/research/research-sources-view";

export const metadata: Metadata = {
  title: "Sources & Citations | Movemental Research",
  description:
    "Every claim, sourced. The master citation registry behind the Movemental research library.",
};

export default function V2SourcesPage() {
  return <ResearchSourcesView />;
}
