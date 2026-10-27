import type { Metadata } from "next";

import {
  Agreement,
  AlreadyResponding,
  ClosingBand,
  CompanySection,
  HumanQuestions,
  LeadersBand,
  ProofInPractice,
  ResolveSection,
  RespondMap,
  WorkWithMovemental,
} from "@/components/mv/home/sections";
import { MvFooter } from "@/components/mv/mv-footer";
import { LeadersArc } from "@/components/mv/home/leaders-arc";
import { MvHomeHeader } from "@/components/mv/mv-home-header";

export const metadata: Metadata = {
  title: { absolute: "Movemental | Lead the response to AI" },
  description:
    "Movemental helps churches, nonprofits and institutions lead the response to AI: deciding what AI should and should not do, preparing the knowledge and people it depends on, and building the tools that put those decisions into practice.",
  alternates: { canonical: "/" },
};

/** The home page: board Home v3, with the first screen from the leaders arc (Home-Resolve, Oct 27, 2026). */
export default function HomePageNew() {
  return (
    <>
      <MvHomeHeader />
      <LeadersArc />
      <AlreadyResponding />
      <HumanQuestions />
      <ResolveSection />
      <Agreement />
      <RespondMap />
      <WorkWithMovemental />
      <ProofInPractice />
      <LeadersBand />
      <CompanySection />
      <ClosingBand />
      <MvFooter />
    </>
  );
}
