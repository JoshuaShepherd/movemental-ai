import type { Metadata } from "next";

import { FootnotesRegistryView } from "@/v2/components/footnotes/footnotes-registry-view";

export const metadata: Metadata = {
  title: "Claims, Sources & Notes | Movemental",
  description:
    "Single reference for Movemental site claims, primary sources, and reader-facing notes.",
};

export default function V2FootnotesPage() {
  return <FootnotesRegistryView />;
}
