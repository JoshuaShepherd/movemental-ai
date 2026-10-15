import type { Metadata } from "next";

import {
  Agreement,
  AlreadyResponding,
  ClosingBand,
  CompanySection,
  HomeHero,
  HumanQuestions,
  LeadersBand,
  ProofInPractice,
  ResolveSection,
  RespondMap,
  WorkWithMovemental,
} from "@/components/mv/home/sections";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: { absolute: "Movemental | Lead the response to AI" },
  description:
    "Movemental helps churches, nonprofits and institutions lead the response to AI: deciding what AI should and should not do, preparing the knowledge and people it depends on, and building the tools that put those decisions into practice.",
  alternates: { canonical: "/" },
};

/** The new home page, migrated from the Claude Design board Home v3 (Oct 15, 2026). */
export default function HomePageNew() {
  return (
    <>
      <MvHeader />
      <HomeHero />
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
