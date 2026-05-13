import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/studio/Container";

export const metadata: Metadata = {
  title: "Are we compatriots?",
  description:
    "Seven shared convictions, seven traits of a likely compatriot, and seven traits of someone the relationship doesn't yet fit. A self-check before starting the conversation.",
};

type Item = {
  title: string;
  body: string;
};

const SEVEN_CONVICTIONS: ReadonlyArray<Item> = [
  {
    title: "Mission shapes method.",
    body:
      "The how of the work answers to the why of the work. We will not adopt tools that erode the purpose they were meant to serve.",
  },
  {
    title: "Formation is not a feature.",
    body:
      "What the work does to the people inside it matters as much as what it produces for the people outside it. Both belong in the same dashboard.",
  },
  {
    title: "Speed is not the same as discernment.",
    body:
      "Faster is sometimes right and sometimes catastrophic. We hold the distinction explicitly rather than treating velocity as a virtue.",
  },
  {
    title: "Accountability is relational, not algorithmic.",
    body:
      "We rely on named people who can be reached by phone. Automated approvals are a tool inside that relationship, not a substitute for it.",
  },
  {
    title: "The vulnerable get the first vote.",
    body:
      "Where AI poses asymmetric risk to vulnerable communities, that risk constrains adoption — not the other way around.",
  },
  {
    title: "Inspectability is non-negotiable.",
    body:
      "Anything we publish or ship can be traced back to its sources by anyone who asks. Footnotes are part of the work.",
  },
  {
    title: "Institutions are worth defending.",
    body:
      "Movements need durable structures. We refuse the false choice between “movement” and “institution” — the work requires both.",
  },
];

const LIKELY_COMPATRIOT: ReadonlyArray<Item> = [
  {
    title:
      "You can articulate why your organization exists in terms that have nothing to do with AI &mdash; and you still want to talk about AI.",
    body:
      "The why predates the technology. You can say it without using the word, and you can say it the same way next year.",
  },
  {
    title:
      "You have been burned by a vendor whose incentives diverged from your mission &mdash; and you can name the specific moment you noticed.",
    body:
      "You have learned to read the contract, the data-use language, and the renewal terms with the same care you read scripture or a budget.",
  },
  {
    title:
      "You read about AI from both proponents and serious critics &mdash; and you can hold both without flattening either.",
    body:
      "You do not need every conversation to resolve to one side. You can name what each camp gets right and where each one over-claims.",
  },
  {
    title:
      "You have asked, in writing, what data your platform vendors use to train their models &mdash; and you have followed up when the answer was evasive.",
    body:
      "You treat vendor due diligence as a fiduciary act. You do not accept “we take privacy seriously” as a substitute for specifics.",
  },
  {
    title:
      "You make space in your operating cadence for the formation question &mdash; not just the throughput question.",
    body:
      "When you review a quarter, you ask what the work is doing to the people inside it. That review has a slot on the calendar.",
  },
  {
    title:
      "You expect your published work to be edited and corrected by people you respect &mdash; and you are unembarrassed when it is.",
    body:
      "You treat editorial pushback as a gift. The work is improved by being argued with.",
  },
  {
    title:
      "You believe “let’s slow down” is sometimes the correct executive decision &mdash; and you have made it at least once.",
    body:
      "You have a track record of pumping the brakes when the team wanted to ship. You can describe what that cost you and why it was right.",
  },
];

const LIKELY_NOT_COMPATRIOT: ReadonlyArray<Item> = [
  {
    title:
      "You believe the right response to AI is to install it everywhere first and figure out the implications later.",
    body:
      "The platforms that move at that speed will outrun your governance and your formation work. That is by design, not by accident.",
  },
  {
    title:
      "You measure adoption success exclusively in efficiency metrics, with no formation metrics alongside.",
    body:
      "If the dashboard cannot register a loss to the people inside the work, the dashboard cannot tell you when to stop.",
  },
  {
    title:
      "You are looking for a vendor who will tell you AI will fix your fundraising, staffing, or engagement problems if you just deploy hard enough.",
    body:
      "Movemental is not that vendor. The work it does is upstream of those metrics, and slower than that pitch.",
  },
  {
    title:
      "You expect to share donor lists, beneficiary data, or pastoral conversations with vendor LLMs without an audit trail.",
    body:
      "The asymmetric harm risk lands on the people whose data this is. The relationship we are offering refuses that.",
  },
  {
    title:
      "You consider editorial pushback from practitioners a friction to be minimized rather than a signal to be heard.",
    body:
      "The Movement Leader network exists, in part, to push back on each other’s work. If that posture sounds like a problem, this network will read as one.",
  },
  {
    title:
      "You want a logo-wall partnership with Movemental and are uninterested in the underlying work.",
    body:
      "There is no logo wall on this site, and there will not be one. Borrowed credibility is not what the work needs and not what we offer.",
  },
  {
    title:
      "You see this work as a way to scale your existing program without changing the program.",
    body:
      "Movemental sometimes ends with an organization recognizing that the program is no longer serving the mission. If that outcome is unacceptable up front, the engagement will not serve you.",
  },
];

function NumberedBand({
  bandLabel,
  heading,
  lede,
  items,
  startCount = 1,
}: {
  bandLabel: string;
  heading: string;
  lede: string;
  items: ReadonlyArray<Item>;
  startCount?: number;
}) {
  return (
    <section
      className="band-default border-b border-border py-16 md:py-24"
      aria-labelledby={`compatriots-${bandLabel.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Container className="max-w-(--prose-max)">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          {bandLabel}
        </p>
        <h2
          id={`compatriots-${bandLabel.toLowerCase().replace(/\s+/g, "-")}`}
          className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
        >
          {heading}
        </h2>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">{lede}</p>
        <ol className="mt-12 space-y-10 list-none">
          {items.map((item, idx) => (
            <li
              key={`${bandLabel}-${idx + 1}`}
              className="grid grid-cols-[3rem_1fr] gap-4"
            >
              <span className="font-serif italic text-2xl font-normal text-muted-foreground">
                {String(startCount + idx).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="font-serif italic text-[1.375rem] font-normal text-foreground"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export default function AreWeCompatriotsPage() {
  return (
    <>
      <section
        className="band-default border-b border-border py-16 md:py-24"
        aria-labelledby="compatriots-h1"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            For practitioners considering the path
          </p>
          <h1
            id="compatriots-h1"
            className="mt-3 font-serif italic text-4xl font-normal tracking-tight text-foreground md:text-5xl"
          >
            Are we compatriots?
          </h1>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-foreground">
            Movemental is a specific kind of work, with a specific stance. Before you start a
            conversation, this page lays out the convictions we hold in common with our partners
            and the traits that suggest the relationship will &mdash; or will not yet &mdash; fit.
            It is a self-check, not a gate.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Draft &mdash; pending founder ratification before this page is treated as final.
          </p>
        </Container>
      </section>

      <NumberedBand
        bandLabel="Convictions"
        heading="Seven convictions we share."
        lede="The premises beneath every engagement. Disagree with one and the relationship will strain; disagree with several and we are doing different work."
        items={SEVEN_CONVICTIONS}
      />

      <NumberedBand
        bandLabel="Compatriot"
        heading="You are likely a compatriot if&hellip;"
        lede="Seven traits we have observed in the leaders this work serves well. Read them as a mirror, not a checklist."
        items={LIKELY_COMPATRIOT}
      />

      <NumberedBand
        bandLabel="Not yet"
        heading="You are likely not a compatriot (yet) if&hellip;"
        lede="Seven traits that suggest the relationship is not the right shape right now. None of these mean you cannot get there &mdash; only that starting here will frustrate both of us."
        items={LIKELY_NOT_COMPATRIOT}
      />

      <section
        className="band-default py-16 md:py-24"
        aria-labelledby="compatriots-cta-h2"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Three ways forward
          </p>
          <h2
            id="compatriots-cta-h2"
            className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
          >
            If the read is yes &mdash; here&rsquo;s where to go.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                Read first
              </p>
              <h3 className="mt-2 font-serif italic text-[1.375rem] font-normal text-foreground">
                Read the field guides.
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                The clearest single move is to read what we teach before opening a conversation.
                Two short books; full sources.
              </p>
              <Link
                href="/field-guides"
                className="mt-5 inline-flex items-center text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Read the field guides &rarr;
              </Link>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                Start now
              </p>
              <h3 className="mt-2 font-serif italic text-[1.375rem] font-normal text-foreground">
                Start a conversation.
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                If you lead an organization and read the convictions and traits above as
                yours, the next move is a real conversation, not a form.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Start a conversation &rarr;
              </Link>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                If you write
              </p>
              <h3 className="mt-2 font-serif italic text-[1.375rem] font-normal text-foreground">
                Sign the Movement Voice Commitments.
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                If you are a senior practitioner whose public work belongs in this conversation,
                the commitments document is the place to put your name.
              </p>
              <Link
                href="/movement-voice-commitments"
                className="mt-5 inline-flex items-center text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Read the commitments &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
