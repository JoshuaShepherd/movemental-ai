import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container, Display, Eyebrow, Section } from "@/components/primitives";

import { assessmentEntry } from "./nonprofit-content";

/** Marketing-only entry; live flow lives in `SsssIntegrityDiagnostic` on `/assess`. */
export function AssessmentEntryContent() {
  return (
    <Section spacing="lg" className="pt-24 pb-16 md:pt-28 md:pb-24">
      <Container className="mx-auto max-w-3xl">
        <Eyebrow className="mb-4 text-primary">{assessmentEntry.eyebrow}</Eyebrow>
        <Display size="lg" as="h1" className="text-balance">
          {assessmentEntry.headline}
        </Display>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          {assessmentEntry.subhead}
        </p>
        <ul className="mt-10 space-y-4">
          {assessmentEntry.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/40"
                aria-hidden="true"
              />
              <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
                {bullet}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          For the full item bank, scoring logic, and workshop bridge, read the{" "}
          <Link
            href="/articles/the-ssss-journey-assessment-checklist"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            operational backbone article
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-col items-start gap-3">
          <Button
            asChild
            className="h-auto rounded-md bg-linear-to-br from-primary to-primary-dim px-8 py-4 text-base font-semibold text-primary-foreground shadow-ambient"
          >
            <Link href="/assess">{assessmentEntry.ctaLabel}</Link>
          </Button>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{assessmentEntry.ctaNote}</p>
        </div>
      </Container>
    </Section>
  );
}
