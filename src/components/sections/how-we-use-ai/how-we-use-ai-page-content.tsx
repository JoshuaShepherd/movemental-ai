import Link from "next/link";

import { Container, HumanHighlightEx3, Reveal, Section } from "@/components/primitives";
import { cn } from "@/lib/utils";

import { HowWeUseAiToolkitTrigger } from "./how-we-use-ai-toolkit-trigger";

/**
 * /how-we-use-ai — auxiliary page that names where Movemental stands on AI.
 *
 * Voice: plain. No marketing language, no clever phrasing, no banned consultant
 * vocabulary. Italic emphasis only for semantic weight (book/framework names,
 * key terms being defined). Composed from the standard primitives — `Section`,
 * `Container`, `Reveal` — and follows the same midnight ↔ cream tonal stacking
 * the /about page uses.
 *
 * The page does its own work; do not paste home/about heroes into it. There is
 * no nav link; the route is reached from the footer.
 */

type Category = {
  /** Lower-case label that pairs with the heading (Green light / Yellow / Red). */
  label: string;
  /** Heading text rendered in display serif. */
  heading: string;
  /** Body paragraph in muted ink. */
  body: React.ReactNode;
  /** Status dot color — semantic tokens only. */
  dot: "go" | "caution" | "stop";
};

const CATEGORIES: readonly Category[] = [
  {
    label: "Green light",
    heading: "Clear human benefit, no meaningful negative consequence.",
    body: (
      <>
        Use cases where AI provides clear human benefit with no meaningful negative consequences.
        The washing machine of AI applications. Examples include AI used to make existing content
        searchable, AI used to translate between languages a person does not speak, AI used to
        surface patterns in data that would otherwise take weeks to find. Green light use cases are
        the easiest part of our work. We deploy them readily.
      </>
    ),
    dot: "go",
  },
  {
    label: "Yellow light",
    heading: "Real benefit, but only with sufficient guardrails.",
    body: (
      <>
        Use cases where AI provides real benefit but only with sufficient guardrails in place. The
        majority of AI applications fall here. Examples include AI used to draft communications
        that humans review before sending, AI used to help with research where citation and
        verification are required, AI used to facilitate group conversations where the AI never
        substitutes for the participants&apos; actual contributions. Yellow light use cases are
        most of what our facilitated Safety work addresses. We help organizations build the
        guardrails that make these use cases workable.
      </>
    ),
    dot: "caution",
  },
  {
    label: "Red light",
    heading: "Harm, regardless of how carefully the use is deployed.",
    body: (
      <>
        Use cases where AI use causes harm regardless of how carefully it is deployed. Examples
        include AI used to author content under a human&apos;s name without disclosure, AI used to
        make eligibility decisions that affect people&apos;s access to services, AI used to
        impersonate humans in pastoral or counseling contexts, AI used to surveil people in ways
        that change how they are served. Red light use cases are what our Named Refusals document
        is built around. We do not deploy these. We help the organizations we work with publicly
        commit to refusing them as well.
      </>
    ),
    dot: "stop",
  },
];

type Commitment = {
  number: string;
  title: string;
  body: React.ReactNode;
};

const COMMITMENTS: readonly Commitment[] = [
  {
    number: "01",
    title: "We do not use AI to author our content",
    body: (
      <>
        The writing on this site, in the field guide, in the case studies, and in the work we
        publish under our names is written by us. AI helps us with research, with editing, with
        infrastructure. It does not author the work that carries our names. The distinction
        between authorship and infrastructure matters, and we observe it carefully.
      </>
    ),
  },
  {
    number: "02",
    title: "We disclose AI's role when AI was substantially involved",
    body: (
      <>
        When AI was substantially involved in shaping content the reader receives — substantial
        enough that not disclosing it would mislead — we disclose it. The threshold is not whether
        AI touched the work, but whether the reader&apos;s understanding of the work would change
        if they knew. When in doubt, we disclose.
      </>
    ),
  },
  {
    number: "03",
    title: "We refuse the use cases we have publicly named",
    body: (
      <>
        The Named Refusals document at the heart of every Safety engagement is not theoretical for
        us. We refuse those same use cases in our own work. We do not impersonate movement leaders
        with AI. We do not use AI to substitute for human relational care. We do not use AI to
        make decisions that affect who has access to what we offer.
      </>
    ),
  },
  {
    number: "04",
    title: "We use the platform we sell",
    body: (
      <>
        Every guardrail we ask Safety customers to build, we have built into our own work. Every
        artifact we help organizations produce, we have produced for ourselves. The Care
        Boundaries, the Disclosure Standards, the Vendor and Tool Inventory, the Data Handling
        Protocol, the Incident Response Plan, the Named Refusals — these exist for Movemental as
        an organization, ratified, in active use. We eat our own dog food.
      </>
    ),
  },
  {
    number: "05",
    title: "We do this work with the wisest people we know",
    body: (
      <>
        The antidote to any individual lack of wisdom about AI is doing the work alongside people
        whose wisdom predates AI. Brad Brisco, Alan Hirsch, and the network of Movement Voices
        that has signed on are not advisors lending names to a deck. They are co-stewards of how
        this work is done. When we are uncertain, we ask them. The credibility of Movemental&apos;s
        AI use is held by the credibility of the humans doing it.
      </>
    ),
  },
];

const DOT_CLASS: Record<Category["dot"], string> = {
  go: "bg-status-go",
  caution: "bg-status-caution",
  stop: "bg-status-stop",
};

export function HowWeUseAiPageContent() {
  return (
    <div className="text-pretty">
      {/* ============================================================ */}
      {/* Section 1 — Hero                                              */}
      {/* ============================================================ */}
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="hwu-hero-title"
        className="band-midnight scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container width="default" className="max-w-5xl">
          <Reveal>
            <p className="mb-8 text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
              How Movemental uses AI
            </p>
            <h1
              id="hwu-hero-title"
              className="mb-10 max-w-[20ch] font-serif text-5xl font-medium leading-[1.05] tracking-display text-inverse-foreground md:text-6xl lg:text-7xl"
            >
              Where we stand on AI.
            </h1>
            <p className="max-w-160 text-lg leading-relaxed text-inverse-muted md:text-xl">
              This page exists because the people we work with deserve to know what we believe
              about AI and how we use it. The rest of our website describes what we do. This page
              describes{" "}
              <HumanHighlightEx3 inverse>the values and commitments behind that work.</HumanHighlightEx3>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 2 — What AI is and isn't                              */}
      {/* ============================================================ */}
      <Section variant="default" spacing="lg" aria-labelledby="hwu-mirror-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                What AI is and isn&apos;t
              </p>
              <h2
                id="hwu-mirror-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                AI mirrors and amplifies the humans it&apos;s around.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 max-w-(--prose-max) space-y-[1.4em] text-[17px] leading-[1.75] text-foreground">
              <p>
                AI is trained on the broad output of human writing, speech, and behavior. When you
                interact with it, it mirrors and amplifies what it has been trained on, and it
                mirrors and amplifies you specifically. The outputs you get back reflect both the
                training data and the human in the room.
              </p>
              <p>
                This is the part most discussions of AI miss. People who are worried about AI are
                often worried about humanity itself, because AI surfaces and amplifies what humans
                have already produced. People who are hopeful about AI are often hopeful about
                humanity for the same reason. How a person reacts to AI tends to reveal their
                underlying view of human nature.
              </p>
              <p>
                We think this framing is more useful than treating AI as either a savior or a
                threat. AI is neither. It is a powerful mirror and amplifier. The question is not
                whether AI is good or bad in the abstract. The question is what humans we are
                willing to put in the room with it.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 3 — The decision behind Movemental                    */}
      {/* ============================================================ */}
      <Section
        variant="section"
        spacing="lg"
        aria-labelledby="hwu-decision-title"
        className="border-t border-border"
      >
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                The decision
              </p>
              <h2
                id="hwu-decision-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                We chose to put specific humans in the room.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 max-w-(--prose-max) space-y-[1.4em] text-[17px] leading-[1.75] text-foreground">
              <p>
                If AI mirrors and amplifies the humans it&apos;s around, the most important thing
                we could do was deliberately gather humans whose work and character we trusted.
                Movement leaders. Practitioners. Theologians. People whose credibility was built
                over decades of offline human work, before AI existed.
              </p>
              <p>
                This required a network. Networks like this had not existed at scale, partly
                because the people who would belong to them have lives, local commitments, and
                embodied practices that make in-person convening rare. The first hero involved in
                Movemental lives in Melbourne. The second lives in Tampa. They cannot easily
                gather. Building the network had to be digital.
              </p>
              <p>
                Building the network digitally also required infrastructure. Substantial
                infrastructure. The kind that, until recently, would have required a large agency
                or organization to construct. AI changed that. One person, working carefully,
                could now build the platform a network of this size requires. So we built it.
              </p>
              <p>
                The thing people are saying yes to when they join Movemental is not the technology.
                It is each other. The platform exists to make that possible at a scale that was
                not possible before.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 4 — The test we apply (pivotal, generous space)       */}
      {/* ============================================================ */}
      <Section variant="default" spacing="lg" aria-labelledby="hwu-test-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                How we evaluate AI use
              </p>
              <h2
                id="hwu-test-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                Take the AI out of the story.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 max-w-(--prose-max) space-y-[1.4em] text-[17px] leading-[1.75] text-foreground">
              <p>
                The test we use for any AI use case is simple. Take the AI out of the story. Look
                at what remains.
              </p>
              <p>
                If what remains is people doing valuable human work that AI helped them do faster,
                larger, or more accessibly — the use is humanly valuable. If what remains is just
                AI output dressed up to look like human work — the use is suspect, regardless of
                how impressive the output is.
              </p>
              <p>
                In Movemental&apos;s case, what remains when you take the AI out is a group of
                practitioners who had been circling each other&apos;s work for years and who
                wanted to do something together. The technology made it possible to gather. The
                technology did not make the gathering valuable. The humans did.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 5 — Three categories (vertical, not grid)             */}
      {/* ============================================================ */}
      <Section
        variant="section"
        spacing="lg"
        aria-labelledby="hwu-categories-title"
        className="border-t border-border"
      >
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                How we think about use cases
              </p>
              <h2
                id="hwu-categories-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                Three categories.
              </h2>
              <p className="mt-8 max-w-160 text-lg leading-relaxed text-muted-foreground">
                Not all AI use cases are equivalent. We sort them into three categories. This
                sorting is the foundation of how we facilitate Safety engagements, and it is how
                we evaluate our own use of AI internally.
              </p>
            </div>
          </Reveal>

          <ol className="mt-16 list-none p-0">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.label} delay={i * 60} as="li">
                <div
                  className={cn(
                    "grid grid-cols-12 gap-6 py-9 md:gap-10",
                    i > 0 && "border-t border-border",
                  )}
                >
                  <div className="col-span-12 md:col-span-3">
                    <p className="inline-flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "inline-block size-2 rounded-full",
                          DOT_CLASS[c.dot],
                        )}
                      />
                      {c.label}
                    </p>
                  </div>
                  <div className="col-span-12 max-w-176 md:col-span-9">
                    <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight text-foreground md:text-[28px]">
                      {c.heading}
                    </h3>
                    <p className="mt-4 text-[17px] leading-relaxed text-foreground">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 6 — Five commitments (vertical, midnight)             */}
      {/* ============================================================ */}
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="hwu-commitments-title"
        className="band-midnight"
      >
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
                What we commit to
              </p>
              <h2
                id="hwu-commitments-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-inverse-foreground md:text-5xl"
              >
                Five commitments we keep.
              </h2>
              <p className="mt-8 max-w-160 text-lg leading-relaxed text-inverse-muted">
                These are the commitments Movemental makes to the people we serve and to the
                movement leaders in our network. They are not aspirational. They shape every line
                of code we ship and every artifact we facilitate.
              </p>
            </div>
          </Reveal>

          <ol className="mt-16 list-none p-0">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.number} delay={i * 60} as="li">
                <div
                  className={cn(
                    "grid grid-cols-12 gap-6 py-9 md:gap-10",
                    i > 0 && "border-t border-inverse-border",
                  )}
                >
                  <div className="col-span-12 md:col-span-2">
                    <span
                      aria-hidden="true"
                      className="font-serif italic font-normal leading-none tracking-tight text-inverse-foreground/55 text-[clamp(36px,4vw,52px)]"
                    >
                      {c.number}
                    </span>
                  </div>
                  <div className="col-span-12 max-w-176 md:col-span-10">
                    <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight text-inverse-foreground md:text-[28px]">
                      {c.title}
                    </h3>
                    <p className="mt-4 text-[17px] leading-relaxed text-inverse-foreground/80">
                      {c.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 7 — What we are and aren't                            */}
      {/* ============================================================ */}
      <Section variant="default" spacing="lg" aria-labelledby="hwu-position-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                What we are
              </p>
              <h2
                id="hwu-position-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                We are not an AI company.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 max-w-(--prose-max) space-y-[1.4em] text-[17px] leading-[1.75] text-foreground">
              <p>
                We are a company of humans who use AI as carefully as we can, in service of a
                network of movement leaders whose work matters. AI is the infrastructure. The
                leaders are the work.
              </p>
              <p>
                The reason we are doing this now is that AI cannot be put back. Every organization
                our network serves is going to face the same questions about AI, whether they want
                to or not. The vendors who will help them are mostly not the people who understand
                the substance of what they do. We are a few years into wrestling with these
                questions in a field where the most experienced person could only have three years
                of experience. That head start is what we offer.
              </p>
              <p>
                The rest of our website describes the path, the offerings, and the work itself.
                This page exists so that anyone reading the website knows where we stand on the
                underlying questions. If our practice ever drifts from what is on this page, we
                want to be held to it.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 8 — Closing                                           */}
      {/* ============================================================ */}
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="hwu-closing-title"
        className="band-midnight"
      >
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
                Where to from here
              </p>
              <h2
                id="hwu-closing-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-inverse-foreground md:text-5xl"
              >
                If you want to see how this plays out in practice.
              </h2>
              <p className="mt-8 max-w-152 text-lg leading-relaxed text-inverse-muted">
                The free Safety toolkit is the most direct way to see how Movemental&apos;s
                commitments translate into actual work. Sixteen pages. The seven artifacts
                described in detail. A self-assessment your team can take together. Read it in an
                evening.
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <HowWeUseAiToolkitTrigger source="how-we-use-ai-closing" />
                <Link href="/contact" className="btn-pill btn-pill--ghost">
                  Start a conversation
                </Link>
              </div>

              <p className="mt-10 font-serif text-base italic font-normal text-inverse-foreground/55">
                Or read about who built this at{" "}
                <Link
                  href="/about"
                  className="underline decoration-inverse-foreground/30 underline-offset-[0.25em] transition-colors hover:decoration-inverse-foreground"
                >
                  /about
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
