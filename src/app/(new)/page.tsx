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
import { MovementalLeaders } from "@/components/mv/home/movemental-leaders";
import { MvHomeHeader } from "@/components/mv/mv-home-header";

export const metadata: Metadata = {
  title: { absolute: "Movemental | Lead the response to AI" },
  description:
    "Movemental helps churches, nonprofits and institutions lead the response to AI: deciding what AI should and should not do, preparing the knowledge and people it depends on, and building the tools that put those decisions into practice.",
  alternates: { canonical: "/" },
};

/** The home page: board Home v3, with the first screen and network from Home-Headline-C (Oct 15, 2026). */
export default function HomePageNew() {
  return (
    <>
      <MvHomeHeader />
      <HomeHero />
      <MovementalLeaders />
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
