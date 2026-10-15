import type { Metadata } from "next";

import { LeadersIndex } from "@/components/mv/leaders/leaders-views";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "Movement leaders | Movemental",
  description:
    "Movement leaders doing this work in their own organizations: writing their own Resolutions and taking up the work in the places they lead.",
  alternates: { canonical: "/leaders-new" },
};

/** The network. Board: Leaders. */
export default function LeadersNewPage() {
  return (
    <>
      <MvHeader />
      <LeadersIndex />
      <MvFooter />
    </>
  );
}
