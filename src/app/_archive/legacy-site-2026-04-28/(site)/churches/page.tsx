// Stitch screen: "movemental_church_systems_pathway"
// Tree:
//   <Section spacing="lg">         -- hero
//   <Section variant="section">    -- Current Reality
//   <Section>                      -- Paradigm Shift (Formation)
//   <Section variant="section">    -- Assessment (4 "Start Here" cards)
//   <Section>                      -- Core System Builds (5 items)
//   <Section variant="section">    -- System Integration
//   <Section>                      -- Typical Paths (3 cards)
//   <Section>                      -- Time Horizon
//   <Section variant="section">    -- Concrete Outputs
//   <Section variant="midnight">   -- Theological Reflection
//   <Section>                      -- Final CTA

import type { Metadata } from "next";

import { ChurchesPageContent } from "@/components/sections/churches/churches-page-content";

export const metadata: Metadata = {
  title: "For Churches",
  description:
    "Formation cannot remain accidental. For churches navigating formation, care, and memory in an AI-disrupted world — a narrow way between fragmented pastoral reality and premature technological adoption.",
};

export default function ChurchesPage() {
  return <ChurchesPageContent />;
}
