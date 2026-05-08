/**
 * Home (Ledger edition).
 *
 * Faithful translation of `docs/html/home-citations-ledger.html` into
 * Movemental's React primitives. Every empirical claim sits next to a chip
 * and the page closes with the references rail. See the build prompt for the
 * editorial rules: max 3 chips per line, single best citation per claim.
 *
 * This composition replaces the prior TopographicHero/AudienceFold sequence
 * for the home route. The catalog of source claims rendered here lives in
 * `src/lib/citations/claims.ts` and is anchored to the Movemental Research
 * Corpus v1.0.
 */

import Link from "next/link";

import {
  CitationsProvider,
  Cite,
  Marker,
  ReferencesRail,
} from "@/components/citations";
import type { CitationId } from "@/lib/citations/claims";
import { Container, Section } from "@/components/primitives";

const HOME_CLAIMS = [
  "nonprofit-92-adoption",
  "nonprofit-81-adhoc",
  "high-performer-cohort-5-7",
  "nonprofit-47-no-policy",
  "fbi-ic3-893m",
  "barna-gloo-spiritual-trust-1-in-3",
  "barna-pushpay-church-tech-2026",
  "lifeway-pastor-42-use",
  "mckinsey-workflow-redesign",
] as const satisfies ReadonlyArray<CitationId>;

export function HomeLedger() {
  return (
    <CitationsProvider claims={HOME_CLAIMS}>
      <HeroLedger />
      <StatStripLedger />
      <GapArgumentLedger />
      <PathLedger />
      <ClosingLedger />
      <ReferencesRail />
    </CitationsProvider>
  );
}

/* ------------------------------------------------------------------ HERO */

function HeroLedger() {
  return (
    <Section variant="default" spacing="lg" aria-labelledby="hero-h1">
      <Container>
        <p className="inline-flex items-center gap-3 mb-7 text-[0.72rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          <span aria-hidden="true" className="inline-block w-7 h-px bg-foreground" />
          For organizational leaders · evidence edition
        </p>
        <h1
          id="hero-h1"
          className="font-serif italic text-foreground text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[1.02] tracking-[-0.025em] max-w-[22ch] mb-7"
        >
          AI is already <Marker as="em">inside</Marker> your organization.
        </h1>
        <div className="max-w-[40rem] text-[1.18rem] leading-[1.6] text-muted-foreground space-y-7">
          <p>
            <strong className="text-foreground font-medium">92%</strong> of
            nonprofits already use AI
            <Cite claimId="nonprofit-92-adoption" />. Most use is reactive,
            individual, and ad-hoc
            <Cite claimId="nonprofit-81-adhoc" /> — and the gap between
            adoption and actual capability is now the single most documented
            finding in the field.
          </p>
          <p>
            We built a path to walk you through the organizational and
            technological challenges posed by AI:{" "}
            <strong className="text-foreground font-medium">
              Safety, Sandbox, Skills, Solutions
            </strong>
            , in order.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/walkthrough"
            className="inline-flex items-center justify-center px-6 py-3 rounded-pill bg-primary text-primary-foreground font-medium text-[0.95rem] hover:bg-primary-dim transition-colors"
          >
            See the path
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-pill border border-border text-foreground font-medium text-[0.95rem] hover:border-foreground transition-colors"
          >
            Start a conversation
          </Link>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------ STAT STRIP */

function StatStripLedger() {
  return (
    <Section variant="section" spacing="sm" aria-label="Headline statistics">
      <Container>
        <div className="grid grid-cols-1 min-[720px]:grid-cols-2 min-[1040px]:grid-cols-4 divide-y min-[1040px]:divide-y-0 min-[1040px]:divide-x divide-border">
          <StatCell
            value="7%"
            claimId="high-performer-cohort-5-7"
            label={
              <>
                of nonprofits report{" "}
                <Marker>major capability gain</Marker> from AI. The rest run
                pilots that don&rsquo;t move the metrics.
              </>
            }
          />
          <StatCell
            value="47%"
            claimId="nonprofit-47-no-policy"
            label={
              <>
                of nonprofits operate with{" "}
                <Marker>no AI governance policy</Marker> — and only 5% of
                churches have one.
              </>
            }
          />
          <StatCell
            value="$893M"
            claimId="fbi-ic3-893m"
            label={
              <>
                in <Marker>AI-fraud losses</Marker> reported to the FBI in
                2025. The threat against your staff and donors is no longer
                theoretical.
              </>
            }
          />
          <StatCell
            value="1 in 3"
            claimId="barna-gloo-spiritual-trust-1-in-3"
            label={
              <>
                U.S. adults already trust AI for{" "}
                <Marker>spiritual guidance</Marker> on par with a pastor. The
                conversation is happening with or without you.
              </>
            }
          />
        </div>
      </Container>
    </Section>
  );
}

function StatCell({
  value,
  claimId,
  label,
}: {
  value: string;
  claimId: CitationId;
  label: React.ReactNode;
}) {
  return (
    <div className="px-7 py-6 first:pt-0 min-[1040px]:first:pt-6 min-[1040px]:pl-7 min-[1040px]:first:pl-0">
      <p className="font-serif italic text-foreground text-[clamp(2.6rem,5vw,3.6rem)] leading-none tracking-[-0.03em] mb-2 stat-cell__value">
        {value}
        <Cite claimId={claimId} />
      </p>
      <p className="text-[0.92rem] leading-[1.45] text-muted-foreground max-w-[26ch]">
        {label}
      </p>
    </div>
  );
}

/* ----------------------------------------------------- GAP ARGUMENT */

function GapArgumentLedger() {
  return (
    <Section variant="default" spacing="lg" aria-labelledby="gap-h">
      <Container>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] gap-10 min-[900px]:gap-20">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-eyebrow text-muted-foreground mb-4">
              The pattern
            </p>
            <h2
              id="gap-h"
              className="font-serif italic text-foreground text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.02em]"
            >
              Adoption without <em>capability</em>.
            </h2>
          </div>
          <div className="max-w-[36rem] text-[1.06rem] leading-[1.7] text-foreground space-y-6">
            <p>
              The pattern is now documented across at least four independent
              2025–2026 studies in nonprofit, enterprise, and faith-sector
              research
              <Cite claimId="high-performer-cohort-5-7" />: widespread
              adoption, a <Marker>5–7% high-performer cohort</Marker>, and a
              governance/workflow gap that consistently predicts who lands in
              that cohort.
            </p>
            <p>
              In churches the picture rhymes.{" "}
              <strong className="font-medium">60%</strong> of church leaders
              personally use AI at least monthly, but only{" "}
              <strong className="font-medium">33%</strong> of churches use AI
              in any part of operations
              <Cite claimId="barna-pushpay-church-tech-2026" />. Only{" "}
              <strong className="font-medium">5%</strong> have a formal
              policy. Among Protestant pastors,{" "}
              <strong className="font-medium">42%</strong> are using AI for
              ministry today
              <Cite claimId="lifeway-pastor-42-use" /> — without a charter, a
              sandbox, or a stewardship frame.
            </p>
            <p>
              This is not a tools problem. It is an{" "}
              <Marker>
                organizational, formation, and workflow problem
              </Marker>
              . The data supports the thesis you will hear us say throughout
              this site:{" "}
              <strong className="font-medium">
                formation precedes deployment
              </strong>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------ THE PATH */

function PathLedger() {
  return (
    <Section variant="section" spacing="lg" aria-labelledby="path-h">
      <Container>
        <p className="text-[0.72rem] font-semibold uppercase tracking-eyebrow text-muted-foreground mb-4">
          The Movemental AI Path
        </p>
        <h2
          id="path-h"
          className="font-serif italic text-foreground text-[clamp(2rem,3.6vw,3rem)] leading-[1.08] tracking-[-0.02em] mb-6"
        >
          Four stages, in order.
        </h2>
        <p className="max-w-[52rem] font-serif italic text-foreground text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.25] tracking-[-0.015em] mb-14">
          A strong human foundation precedes any technological implementation.
          Skip a stage and the work compounds in the wrong direction
          <Cite claimId="mckinsey-workflow-redesign" />.
        </p>
        <div className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[900px]:grid-cols-4 border-y border-border">
          <PathStep
            num="01"
            name="Safety"
            outcome="A 14-document governance package and AI charter your board can ratify in two weeks. Closes the policy gap that 47% of nonprofits and 95% of churches sit inside."
            isFirst
          />
          <PathStep
            num="02"
            name="Sandbox"
            outcome="Cohort-based discovery across your teams. Use cases triaged, risks named, ethical concerns surfaced — without the consequences of publication."
          />
          <PathStep
            num="03"
            name="Skills"
            outcome="Formation that produces leaders, not just users. Grounded in adult learning research (Kolb) and intrinsic motivation (Pink), not vendor certifications."
          />
          <PathStep
            num="04"
            name="Solutions"
            outcome="AI-integrated technological deployment built on the secure foundation. Workflow redesign, not bolt-on automation."
            isLast
          />
        </div>
      </Container>
    </Section>
  );
}

function PathStep({
  num,
  name,
  outcome,
  isFirst,
  isLast,
}: {
  num: string;
  name: string;
  outcome: string;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  return (
    <article
      className={`px-7 py-9 ${
        isFirst ? "" : "border-t min-[900px]:border-t-0 min-[900px]:border-l"
      } ${isLast ? "" : ""} border-border`}
    >
      <p
        className="font-serif italic text-[1.4rem] mb-2"
        style={{ color: "var(--cite-hl-strong)" }}
      >
        {num}
      </p>
      <h3 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-foreground mb-2">
        {name}
      </h3>
      <p className="text-[0.95rem] leading-[1.55] text-muted-foreground">
        {outcome}
      </p>
    </article>
  );
}

/* ------------------------------------------------------------ CLOSING */

function ClosingLedger() {
  return (
    <Section
      variant="midnight"
      spacing="lg"
      aria-labelledby="closing-h"
      className="!pb-[calc(var(--section-y-lg)+2rem)]"
    >
      <Container>
        <h2
          id="closing-h"
          className="font-serif italic text-inverse-foreground text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] max-w-[22ch] mb-6"
        >
          The path is being{" "}
          <em
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, color-mix(in srgb, var(--cite-hl) 40%, transparent) 60%)",
              padding: "0 0.08em",
              color: "var(--cite-hl)",
            }}
          >
            walked
          </em>
          .
        </h2>
        <p className="max-w-[36rem] text-[1.1rem] leading-[1.6] text-inverse-muted mb-10">
          Movemental walks church and nonprofit leaders through Safety,
          Sandbox, Skills, Solutions — in order. Begin where you actually are.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-pill font-medium text-[0.95rem] transition-colors"
            style={{
              background: "var(--cite-hl)",
              color: "var(--cite-hl-ink)",
            }}
          >
            Start a conversation
          </Link>
          <Link
            href="/walkthrough"
            className="inline-flex items-center justify-center px-6 py-3 rounded-pill border text-inverse-foreground font-medium text-[0.95rem] hover:bg-white/10 transition-colors"
            style={{ borderColor: "rgba(244, 239, 229, 0.35)" }}
          >
            See the full field guide
          </Link>
        </div>
      </Container>
    </Section>
  );
}
