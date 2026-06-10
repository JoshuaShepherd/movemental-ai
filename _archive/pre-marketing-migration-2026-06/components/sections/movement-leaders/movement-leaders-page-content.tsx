import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import {
  Container,
  Display,
  Eyebrow,
  Section,
} from "@/components/primitives";
import { BOOK_HUB_PATH, SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

import {
  AudienceConceptHero,
  AudienceInvitationSection,
  AudienceMovesSection,
  AudienceOutcomesSection,
  AudienceSerifEm,
  AudienceShapeSection,
  AudienceStartingSection,
} from "@/components/sections/audience-concept";
import { VoicesStrip } from "@/components/sections/voices/voices-strip";

/**
 * For movement leaders — Concept Modern HTML parity
 * (`docs/html/audience-concept-modern/movement-leaders.html`).
 */
export function MovementLeadersPageContent() {
  return (
    <div data-audience="concept-modern" className="text-pretty">
      <AudienceConceptHero
        label={
          <span className="font-serif text-[0.95em] font-normal italic text-foreground">
            For movement leaders
          </span>
        }
        title={
          <>
            Integrate a life&apos;s work so it <AudienceSerifEm>carries forward</AudienceSerifEm>.
          </>
        }
        subhead={
          <>
            For the individual whose life&apos;s work is a body of ideas &mdash; authors, teachers,
            theologians, missiologists, founders of intellectual movements. People whose vocation is
            producing and transmitting thought that others carry into their own organizations.
          </>
        }
        ctas={[
          { label: "See the shape of the problem", href: "#shape", variant: "primary" },
          { label: "Read the moves", href: "#moves", variant: "ghost" },
        ]}
        aside={{
          body: (
            <>
              <p>
                &ldquo;On the surface it looks like abundance. Books, talks, a podcast, thirty years of
                serious work. Underneath, five specific failures are almost always running at
                once.&rdquo;
              </p>
            </>
          ),
          attribution: "From the playbook",
          ariaLabel: "The diagnosis",
        }}
      />

      <AudienceShapeSection
        label="The shape of your fragmentation"
        titleId="shape-title"
        title="Five failures, running together."
        lede={
          <>
            <strong className="font-medium text-foreground">
              Most movement leaders look, from the outside, like they have the opposite of a
              fragmentation problem.
            </strong>{" "}
            There is evidence of thirty years of serious work. Underneath, five structural failures
            drain roughly a third of productive capacity every year &mdash; across the{" "}
            <Link href="/book/read/two-intelligences" className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground">
              two intelligences
            </Link>{" "}
            that carry the work: the <strong className="font-medium text-foreground">informational</strong>{" "}
            (corpus, frameworks, articulation) and the{" "}
            <strong className="font-medium text-foreground">relational</strong> (scenius, lineage, succession).
          </>
        }
        failures={[
          {
            num: "Failure 01",
            title: "Voice dilution",
            body: "The framework is slightly different in every place it appears. Readers, translators, and AI tools quietly average across the variants &mdash; and the averaged version, which is no one&apos;s, becomes what gets taught downstream.",
          },
          {
            num: "Failure 02",
            title: "Scenius collapse",
            body: "The work comes from a community of practice &mdash; peers, editors, cohort alumni &mdash; who are invisible to everyone but you. Readers meet you as a lone genius, and the work is narrated as yours alone.",
          },
          {
            num: "Failure 03",
            title: "Rented audience",
            body: "Reach lives on platforms you do not own. The podcast, the YouTube, the Substack, the list. Each is rent. When pricing changes or the platform disappears, twenty years of audience disappears with it.",
          },
          {
            num: "Failure 04",
            title: "Apprenticeship failure",
            body: (
              <>
                Succession conversations stall on the same discovery: the successor is being asked to
                inherit not a body of work but the task of finally <AudienceSerifEm>gathering</AudienceSerifEm> a
                body of work &mdash; on top of developing their own voice.
              </>
            ),
          },
          {
            num: "Failure 05",
            title: "Opportunity cost",
            body: "The quietest and most expensive failure. Every year you do not integrate, you re-produce what you have already produced &mdash; a third of the year spent rebuilding things that already exist somewhere in the scatter.",
          },
        ]}
      />

      <AudienceMovesSection
        label="What integration looks like"
        titleId="moves-title"
        title={
          <>
            Five moves that make the <AudienceSerifEm>foundation</AudienceSerifEm> real.
          </>
        }
        moves={[
          {
            num: "Move 01",
            title: "Canonical framework pages",
            paragraphs: [
              <>
                For each of your three-to-seven load-bearing frameworks &mdash; the concepts that define
                your contribution &mdash; produce a <strong className="font-medium text-foreground">single canonical page</strong>. Not a chapter. Not a slide. A page that states the framework as you&apos;d state it today, links to its lineage, and is marked as canonical.
              </>,
              <>
                This is the page every talk, article, interview, translator, and AI tool links to. The
                hard part is not technical &mdash; it&apos;s committing to a version. That&apos;s a grief move,
                not a documentation move.
              </>,
            ],
          },
          {
            num: "Move 02",
            title: "Explicit lineage map",
            paragraphs: [
              <>
                For each canonical framework, name the three to ten sources it draws from, the peers
                whose work it&apos;s in conversation with, and the downstream thinkers who extend it.
              </>,
              <>
                This is <em className="font-serif italic">not</em> a bibliography. It&apos;s a relational structure that lets readers, students, translators, and AI tools see the work is part of a{" "}
                <strong className="font-medium text-foreground">field</strong>, not a solitary emission.
              </>,
            ],
          },
          {
            num: "Move 03",
            title: "Contributor network surfaced",
            paragraphs: [
              <>
                Separate from intellectual lineage is <em className="font-serif italic">operational scenius</em>{" "}
                &mdash; the editors, cohort alumni, translators, illustrators, peer reviewers, and research
                partners who shape current production.
              </>,
              <>
                Surface them. Make the work&apos;s collaborative nature visible in the ways it has actually
                been collaborative, without collapsing the distinctions between authorship and support.
              </>,
            ],
          },
          {
            num: "Move 04",
            title: "AI trained on the corpus, with disclosure",
            paragraphs: [
              <>
                If you don&apos;t train AI on your integrated corpus, someone else will train AI on your
                fragmented one. This is already happening.
              </>,
              <>
                Ground a dedicated tool on the canonical library. Make it available to practitioners and
                students. Disclose exactly what it&apos;s trained on, what it can&apos;t do, and where it&apos;s
                likely to be wrong. The AI and the foundation are{" "}
                <strong className="font-medium text-foreground">paired moves</strong> &mdash; AI without the
                foundation is slop, the foundation without AI is a research asset rather than a transmission
                one.
              </>,
            ],
          },
          {
            num: "Move 05",
            title: "Succession foundation",
            paragraphs: [
              <>
                Most succession planning selects a person. The person, if chosen well, is necessary. A
                person alone cannot inherit a body of work that has never been coherently gathered.
              </>,
              <>
                Three components are non-negotiable: current and stable canonical framework pages, the
                relational intelligence held in the foundation rather than in your head and phone, and the{" "}
                <strong className="font-medium text-foreground">decision rationales</strong> behind the
                load-bearing calls you&apos;ve made. The successor needs the reasoning, not just the results.
              </>,
            ],
          },
        ]}
      />

      <AudienceOutcomesSection
        label="What integration makes possible"
        titleId="outcomes-title"
        title="Inside a year or two, three changes become visible."
        outcomes={[
          {
            num: "01",
            title: "The work starts to compound.",
            body: (
              <>
                New articles reference canonical pages rather than restating them. Translations draw from
                canonical versions rather than back-translating through English summary. Every act of
                production <em className="font-serif italic">adds</em> to the foundation instead of fragmenting it further.
              </>
            ),
          },
          {
            num: "02",
            title: "The scenius becomes visible.",
            body: "Readers meet the work as a field, not a solo emission. They can see who else to read, how the work has evolved, and who contributed. The peers gain structural visibility; the field gains a legible topology.",
          },
          {
            num: "03",
            title: "The calendar stops being the bottleneck.",
            body: "With a grounded AI tool, practitioners get accurate answers to basic questions without requiring your personal attention. Your time becomes available for what only you can do &mdash; new thinking, deep mentorship, relational formation.",
          },
        ]}
      />

      <AudienceStartingSection
        label="Starting where you are"
        titleId="starting-title"
        title={
          <>
            Four weeks, not <AudienceSerifEm>twelve months</AudienceSerifEm>.
          </>
        }
        intro={
          <>
            <p>
              The initial foundation build is{" "}
              <strong className="font-medium text-foreground">four weeks of concentrated attention</strong>, not
              twelve months. The four weeks require preparatory decisions that are political and theological
              rather than technical &mdash; and those decisions are the actual work.
            </p>
            <p>Three questions to answer before anything else.</p>
          </>
        }
        questions={[
          {
            num: "Q. 01",
            prompt: "Which three to seven frameworks are actually load-bearing?",
            gloss: "You know. Every leader knows. These are the concepts that would still be cited in twenty-five years if the work endures. Write them down. Everything else waits.",
          },
          {
            num: "Q. 02",
            prompt: "Who is currently the sole carrier of intelligence the foundation needs to hold?",
            gloss: "Almost certainly: you, a longtime program director or chief of staff, and one or two senior collaborators. Their tacit knowledge needs to be captured early &mdash; the probability of loss in any given year is higher than zero, and the loss is irreversible.",
          },
          {
            num: "Q. 03",
            prompt: "What have you been treating as a book or a talk that should be treated as a foundation contribution?",
            gloss: "The next major piece you&apos;re about to produce could be filed and forgotten in eighteen months &mdash; or it could enter the foundation as a canonical articulation that carries forward without loss.",
          },
        ]}
      />

      <VoicesStrip />

      <AudienceInvitationSection
        label="Begin"
        titleId="invitation-title"
        title={
          <>
            Stop producing into the scatter. <AudienceSerifEm>Begin producing into the foundation.</AudienceSerifEm>
          </>
        }
        body={
          <>
            The work is not starting the foundation. The work is deciding to stop producing into the scatter.
            Everything after that decision is labor &mdash; and labor is tractable.
          </>
        }
        primaryCta={{ label: "Start a conversation", href: "/contact" }}
        secondaryCta={{ label: "See the full trajectory", href: "/fragmentation" }}
        tertiaryCta={{ label: "Read the full playbook", href: "/articles/playbook-movement-leader" }}
      />

      <Section id="stay-close" variant="section" spacing="lg">
        <Container className="mx-auto max-w-lg text-center">
          <RevealOnScroll>
            <Eyebrow className="mb-4">Canon and cadence</Eyebrow>
            <Display size="sm" as="h2" className="text-balance">
              Or begin quieter
            </Display>
            <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <Link
                href="/articles/two-intelligences-integration"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Two intelligences, one integration thesis
              </Link>
              <Link
                href={SSSS_FIELD_GUIDE_PATH}
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                AI Stewardship Sequence field guide
              </Link>
              <Link
                href={BOOK_HUB_PATH}
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Read the field guide (book)
              </Link>
              <Link
                href="/who-is-a-movement-leader"
                className="border-b border-border pb-0.5 font-medium text-foreground transition-colors hover:border-foreground"
              >
                Who is a movement leader?
              </Link>
            </div>
            <p className="mt-8 text-base text-muted-foreground">
              One note per month on formation, infrastructure, and what we&rsquo;re learning.
            </p>
            <div className="mt-6">
              <NewsletterForm source="movement-leaders-invitation" />
            </div>
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}
