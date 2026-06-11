import type { Metadata } from "next";

import { ResearchFindings } from "@/components/research/research-findings";

export const metadata: Metadata = {
  title: "Key Findings",
  description:
    "Six independent studies converge: adoption is broad, capability is rare, governance is mostly absent.",
};

export default function ResearchFindingsPage() {
  return <ResearchFindings />;
}
