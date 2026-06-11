import type { Metadata } from "next";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { FootnotesPageClient } from "@/components/site-footnotes/footnotes-page-client";
import { EEAT_REGISTRY } from "@/lib/citations/eeat-registry";

export const metadata: Metadata = {
  title: "Claims, sources & notes",
  description:
    "Single reference for Movemental site claims, primary sources, and reader-facing notes.",
};

export default function FootnotesPage() {
  return (
    <InkBandUtilityShell>
      <main style={{ maxWidth: "52rem", margin: "0 auto", padding: "2.5rem 1.25rem 4rem" }}>
        <FootnotesPageClient entries={EEAT_REGISTRY} />
      </main>
    </InkBandUtilityShell>
  );
}
