import type { Metadata } from "next";

import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { FootnotesRegistry } from "@/components/mv/legacy/footnotes-registry";
import { EEAT_REGISTRY } from "@/lib/citations/eeat-registry";

export const metadata: Metadata = {
  title: "Claims, Sources & Notes | Movemental",
  description:
    "Single reference for Movemental site claims, primary sources, and reader-facing notes.",
};

export default function V2FootnotesPage() {
  return (
    <>
      <MvHeader />
      <FootnotesRegistry entries={EEAT_REGISTRY} />
      <MvFooter />
    </>
  );
}
