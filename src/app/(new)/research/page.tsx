import type { Metadata } from "next";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { ResearchIndex } from "@/components/mv/legacy/research-views";

export const metadata: Metadata = {
  title: "Research Library | Movemental",
  description:
    "Original papers on AI, trust, and the organizations whose credibility is on the line. Read here and cite freely.",
};

export default function V2ResearchPage() {
  return (
    <>
      <MvHeader />
      <ResearchIndex />
      <MvFooter />
    </>
  );
}
