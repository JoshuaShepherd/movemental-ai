import type { Metadata } from "next";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { ResearchSourcesPage } from "@/components/mv/legacy/research-views";

export const metadata: Metadata = {
  title: "Sources & Citations | Movemental Research",
  description:
    "Every claim, sourced. The master citation registry behind the Movemental research library.",
  alternates: {
    canonical: "/sources",
  },
};

export default function V2SourcesPage() {
  return (
    <>
      <MvHeader />
      <ResearchSourcesPage />
      <MvFooter />
    </>
  );
}
