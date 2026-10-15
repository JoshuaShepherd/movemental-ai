import type { Metadata } from "next";

import { GuidebookIndex } from "@/components/mv/guidebook/guidebook-views";
import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

export const metadata: Metadata = {
  title: "The guidebook | Movemental",
  description:
    "The whole method, in the open: everything a capable team needs to resolve and respond on its own, in editions for nonprofits, churches, schools and seminaries, and networks.",
  alternates: { canonical: "/guidebook" },
};

/** The guidebook index. Board: Guidebook. `?edition=` picks the edition. */
export default async function GuidebookNewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { edition } = await searchParams;
  return (
    <>
      <MvHeader />
      <GuidebookIndex edition={typeof edition === "string" ? edition : undefined} />
      <MvFooter />
    </>
  );
}
