import { Search } from "lucide-react";

import {
  Container,
  Display,
  Eyebrow,
  Reveal,
  Section,
} from "@/components/primitives";

import { activationCapabilities, homeNarrativeBridges } from "./home-data";

/**
 * §7 · Activation — stage band 03.
 */
export function HomeActivation() {
  return (
    <Section id="activation" variant="section" spacing="lg">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="mb-4">Activation</Eyebrow>
          <Display size="md" as="h2" className="text-balance">
            Not just stored &mdash; usable.
          </Display>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {homeNarrativeBridges.integrationToActivation}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <WorkspaceMock />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {activationCapabilities.map((cap) => (
            <div
              key={cap.id}
              className="rounded-(--radius-md) bg-card p-5 shadow-ambient"
            >
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
                {cap.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WorkspaceMock() {
  return (
    <div className="mx-auto mt-16 w-full max-w-4xl overflow-hidden rounded-(--radius-lg) bg-inverse-surface text-inverse-foreground shadow-ambient">
      <div className="flex items-center gap-2 border-b border-inverse-foreground/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-inverse-foreground/20" aria-hidden />
        <span className="size-2.5 rounded-full bg-inverse-foreground/20" aria-hidden />
        <span className="size-2.5 rounded-full bg-inverse-foreground/20" aria-hidden />
        <span className="ml-4 font-mono text-xs text-inverse-foreground/50">
          workspace &middot; corpus
        </span>
      </div>
      <div className="grid gap-4 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="space-y-3">
          <label className="flex items-center gap-3 rounded-(--radius-md) bg-inverse-foreground/5 px-3 py-2 text-sm">
            <Search className="size-4 text-inverse-foreground/50" aria-hidden />
            <span className="font-mono text-xs text-inverse-foreground/70">
              how does apest form a leader?
            </span>
          </label>
          <div className="space-y-2 text-xs">
            <ResultRow title="The Forgotten Ways · ch. 6" meta="book · 2006" highlight />
            <ResultRow title="APEST Essentials · module 03" meta="course" />
            <ResultRow title="Brad Brisco · seminar transcript" meta="talk · 2019" />
          </div>
        </div>
        <div className="rounded-(--radius-md) bg-inverse-foreground/5 p-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
            Answer &middot; grounded
          </p>
          <p className="mt-3 text-sm leading-relaxed text-inverse-foreground/90">
            APEST forms a leader by locating them inside a fivefold ministry pattern &mdash;
            apostolic, prophetic, evangelistic, shepherding, teaching &mdash; and giving
            their formation a vocation, not just a role.
          </p>
          <p className="mt-4 text-[0.65rem] text-inverse-foreground/55">
            Cited: The Forgotten Ways, ch. 6 &middot; APEST Essentials, §3
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  title,
  meta,
  highlight,
}: {
  title: string;
  meta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-(--radius-sm) bg-inverse-foreground/15 px-3 py-2 ring-1 ring-inverse-foreground"
          : "rounded-(--radius-sm) bg-inverse-foreground/5 px-3 py-2"
      }
    >
      <p className="font-semibold text-inverse-foreground">{title}</p>
      <p className="mt-0.5 text-[0.65rem] uppercase tracking-eyebrow text-inverse-foreground/55">
        {meta}
      </p>
    </div>
  );
}
