import type { Metadata } from "next";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { ResearchFindingsPage } from "@/components/mv/legacy/research-views";

export const metadata: Metadata = {
  title: "Key Findings | Movemental Research",
  description:
    "Six independent studies converge: adoption is broad, capability is rare, governance is mostly absent.",
};

export default function V2ResearchFindingsPage() {
  return (
    <>
      <MvHeader />
      <ResearchFindingsPage />
      <MvFooter />
    </>
  );
}
