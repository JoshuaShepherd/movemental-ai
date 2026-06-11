import type { Metadata } from "next";

import { ResearchLibrary } from "@/components/research/research-library";

export const metadata: Metadata = {
  title: "Research Library",
  description:
    "Original papers on AI, trust, and the organizations whose credibility is on the line. Read here and cite freely.",
};

export default function ResearchPage() {
  return <ResearchLibrary />;
}
