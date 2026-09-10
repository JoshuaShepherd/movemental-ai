import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { FootnotesPageClient } from "@/components/site-footnotes/footnotes-page-client";
import { EEAT_REGISTRY } from "@/lib/citations/eeat-registry";

/**
 * Staging view for Movemental Footnotes & EEAT Citation Registry.
 * Matches design specification in Movemental Footnotes.dc.html.
 */
export function FootnotesRegistryView() {
  return (
    <InkBandUtilityShell>
      <main style={{ maxWidth: "52rem", margin: "0 auto", padding: "2.5rem 1.25rem 4rem" }}>
        <FootnotesPageClient entries={EEAT_REGISTRY} />
      </main>
    </InkBandUtilityShell>
  );
}
