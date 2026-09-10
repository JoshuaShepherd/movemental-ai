import type { Metadata } from "next";

import { ResearchSources } from "@/components/research/research-sources";

export const metadata: Metadata = {
  title: "Sources & Citations",
  description:
    "Every claim, sourced. The master citation registry behind the Movemental research library.",
};

export default function ResearchSourcesPage() {
  return <ResearchSources />;
}
