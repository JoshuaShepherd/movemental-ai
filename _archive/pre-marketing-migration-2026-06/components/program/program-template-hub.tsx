import Link from "next/link";
import { LayoutGrid, Shield, type LucideIcon } from "lucide-react";

import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import type { SubgroupBucket } from "@/lib/program/group-program-templates";
import type { StitchManifestTemplate } from "@/lib/program/stitch-manifest";

const cardFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-section";

/** One Safety region: optional COO-style macro heading + subgroup buckets. */
export type ProgramSafetyMacroSection = {
  macroHeading: string | null;
  buckets: SubgroupBucket[];
};

type ProgramTemplateHubProps = {
  persona: DashboardPersona;
  safetyTotalCount: number;
  sandboxTotalCount: number;
  safetyMacros: ProgramSafetyMacroSection[];
  sandboxBuckets: SubgroupBucket[];
};

function TemplateCard({
  template,
  subgroupLabel,
  Icon,
}: {
  template: StitchManifestTemplate;
  subgroupLabel: string;
  Icon: LucideIcon;
}) {
  return (
    <li>
      <Link
        href={`/program/${template.category}/${template.id}`}
        className={`flex h-full flex-col rounded-xl bg-card px-5 py-5 text-left transition-colors hover:bg-elevated ${cardFocusRing}`}
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-section text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="mt-4 text-[0.95rem] font-semibold text-foreground">{template.title}</span>
        <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{subgroupLabel}</span>
        <span className="mt-4 text-sm font-medium text-primary">Open →</span>
      </Link>
    </li>
  );
}

function SubgroupBucketGrid({
  buckets,
  Icon,
  idPrefix,
}: {
  buckets: SubgroupBucket[];
  Icon: LucideIcon;
  /** Disambiguates heading ids when the same subgroup appears in multiple regions. */
  idPrefix: string;
}) {
  return (
    <div className="space-y-10">
      {buckets.map((bucket) => (
        <section key={bucket.subgroupKey} aria-labelledby={`${idPrefix}-${bucket.subgroupKey}`}>
          <h4
            id={`${idPrefix}-${bucket.subgroupKey}`}
            className="font-headline text-base italic text-foreground"
          >
            {bucket.label}
          </h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {bucket.templates.map((t) => (
              <TemplateCard key={t.id} template={t} subgroupLabel={bucket.label} Icon={Icon} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function ProgramTemplateHub({
  persona,
  safetyTotalCount,
  sandboxTotalCount,
  safetyMacros,
  sandboxBuckets,
}: ProgramTemplateHubProps) {
  return (
    <div className="flex flex-col">
      <Section variant="default" spacing="sm">
        <Container>
          <header className="max-w-prose">
            <Eyebrow className="mb-2">Program</Eyebrow>
            <h1 className="text-2xl tracking-[-0.02em] text-foreground">Program templates</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {persona === "implementation_org" ? (
                <>
                  Your signed-in library of Safety and Sandbox working surfaces for governance. Begin with the
                  operations-ready Safety sequence—policy, inventory, and board ratification—then open Sandbox when
                  your facilitated program calls for experimentation. Each card opens the live preview for that
                  template.
                </>
              ) : (
                <>
                  Your private library of Safety and Sandbox templates—the same curated set that Movemental uses to
                  rehearse governance and learning flows before they ship. This hub is only visible after sign-in;
                  marketing pages on the public site cover the story at a glance, not these working files.
                </>
              )}
            </p>
          </header>
        </Container>
      </Section>

      <Section variant="section" spacing="sm">
        <Container>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" aria-hidden />
            <h2 className="text-[0.95rem] font-medium text-foreground">
              Safety ({safetyTotalCount})
            </h2>
          </div>

          <div className="mt-8 space-y-12">
            {safetyMacros.map((macro, i) => (
              <div key={macro.macroHeading ?? `safety-flat-${i}`}>
                {macro.macroHeading ? (
                  <h3 className="text-sm font-medium text-foreground">{macro.macroHeading}</h3>
                ) : null}
                <div className={macro.macroHeading ? "mt-6" : undefined}>
                  <SubgroupBucketGrid buckets={macro.buckets} Icon={Shield} idPrefix={`safety-${i}`} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="default" spacing="sm">
        <Container>
          <div className="flex items-center gap-2">
            <LayoutGrid className="size-4 text-muted-foreground" aria-hidden />
            <h2 className="text-[0.95rem] font-medium text-foreground">
              Sandbox ({sandboxTotalCount})
            </h2>
          </div>
          <div className="mt-8">
            <SubgroupBucketGrid buckets={sandboxBuckets} Icon={LayoutGrid} idPrefix="sandbox" />
          </div>
        </Container>
      </Section>
    </div>
  );
}
