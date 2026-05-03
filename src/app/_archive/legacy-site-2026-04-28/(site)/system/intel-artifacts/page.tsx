import type { Metadata } from "next";

import {
  IntelNarrativeArtifact,
  IntelOperationalArtifact,
  NARRATIVE_INTEL_SLUGS,
  OPERATIONAL_INTEL_SLUGS,
} from "@/components/intel-artifacts";
import { Container } from "@/components/primitives/container";
import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";

export const metadata: Metadata = {
  title: "Intel artifacts",
  description:
    "Design QA grid for fragmentation narrative and operational intelligence artifact components.",
  robots: { index: false, follow: false },
};

export default function IntelArtifactsGalleryPage() {
  return (
    <main className="bg-background pb-24 pt-12">
      <Container className="px-4 sm:px-6 lg:px-12">
        <Eyebrow>Design QA</Eyebrow>
        <Display as="h1" size="md" className="mt-2 text-foreground">
          Fragmentation intel artifacts
        </Display>
        <p className="mt-4 max-w-prose text-muted-foreground">
          Each registered slug in informational and relational emphasis, plus operational
          surfaces. Mirrors vocabulary used on the fragmentation story page.
        </p>

        <h2 className="mt-14 text-lg font-semibold tracking-tight text-foreground">
          Narrative slugs
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {NARRATIVE_INTEL_SLUGS.map((slug) => (
            <div
              key={slug}
              id={slug}
              className="rounded-[var(--radius-md)] bg-section p-4 shadow-ambient"
            >
              <p className="mb-4 font-mono text-xs text-muted-foreground">{slug}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    Informational
                  </p>
                  <div className="relative h-64 w-full min-w-0 overflow-hidden rounded-[var(--radius-md)] bg-card">
                    <IntelNarrativeArtifact slug={slug} field="info" className="h-full w-full" />
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    Relational
                  </p>
                  <div className="relative h-64 w-full min-w-0 overflow-hidden rounded-[var(--radius-md)] bg-card">
                    <IntelNarrativeArtifact slug={slug} field="rel" className="h-full w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-lg font-semibold tracking-tight text-foreground">
          Operational slugs
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {OPERATIONAL_INTEL_SLUGS.map((slug) => (
            <div
              key={slug}
              className="rounded-[var(--radius-md)] bg-section p-4 shadow-ambient"
            >
              <p className="mb-4 font-mono text-xs text-muted-foreground">{slug}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative min-h-[14rem] w-full min-w-0 overflow-hidden rounded-[var(--radius-md)] bg-card">
                  <IntelOperationalArtifact slug={slug} field="info" className="h-full min-h-[14rem] w-full" />
                </div>
                <div className="relative min-h-[14rem] w-full min-w-0 overflow-hidden rounded-[var(--radius-md)] bg-card">
                  <IntelOperationalArtifact slug={slug} field="rel" className="h-full min-h-[14rem] w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
