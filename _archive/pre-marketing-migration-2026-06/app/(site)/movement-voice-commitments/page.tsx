import type { Metadata } from "next";
import Link from "next/link";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container } from "@/components/studio/Container";
import { MOVEMENT_VOICE_COMMITMENTS_VERSION } from "@/lib/movement-leaders/commitments-doc";
import { listMovementVoiceCommitmentSigners } from "@/lib/movement-leaders/movement-leaders.server";

export const metadata: Metadata = {
  title: "Movemental Voice Commitments",
  description:
    "Shared commitments for Movement Leaders working with Movemental — plus leaders who have signed.",
};

type RefusalOrPractice = {
  title: string;
  body: string;
};

const FIVE_REFUSALS: ReadonlyArray<RefusalOrPractice> = [
  {
    title: "We will not let AI-generated content stand in our name without our editorial hand on it.",
    body:
      "Our published voice is our own. AI is a drafting and research collaborator inside our work; it is never the final author of work that carries our standing.",
  },
  {
    title: "We will not publish work whose factual claims and citations cannot be inspected.",
    body:
      "Every claim we lend our name to has a traceable source. If a reader asks where a number, a quote, or a framing came from, we can show them.",
  },
  {
    title:
      "We will not lend our standing to AI tools or partners that obscure their data sourcing or training practices.",
    body:
      "If the vendor cannot answer where the training data came from, how user data is handled, and what the model is allowed to do with our submissions, we do not endorse the tool publicly.",
  },
  {
    title:
      "We will not sign onto sweeping promises about AI that ignore the asymmetric harms it can do to vulnerable communities.",
    body:
      "The same technology that saves staff hours in a well-resourced organization can erase agency in a poorly-resourced one. We will not let optimism about the first obscure the second.",
  },
  {
    title:
      "We will not surrender editorial control to platforms whose incentives diverge from the formation work we are committed to.",
    body:
      "Distribution matters, but it is not the work. We retain the right to step away from any platform — including Movemental — if its trajectory stops serving formation and starts serving only its own scale.",
  },
];

const FIVE_PRACTICES: ReadonlyArray<RefusalOrPractice> = [
  {
    title: "We will name where AI is used in our work so readers can calibrate their trust.",
    body:
      "An AI-assisted draft is not the same as a fully-authored essay; a synthesis of citations is not the same as original interview reporting. We tell readers which is which.",
  },
  {
    title: "We will publish primary sources and citation chains so any claim can be audited.",
    body:
      "Footnotes, links, and reference rails are part of the work, not decoration. A reader who wants to verify what we say should be able to do so without contacting us first.",
  },
  {
    title:
      "We will hold the formation question — what is this doing to the people inside the work — equal to the operational question.",
    body:
      "AI gains in efficiency are real. AI losses in human formation are also real. We refuse to let either erase the other in the way we write about the work.",
  },
  {
    title: "We will pressure-test our claims against practitioners actively executing on the ground.",
    body:
      "Theoretical takes are not enough. Before we publish a strong claim about what AI does in a church, a nonprofit, or an institution, we have run it past practitioners doing the actual work.",
  },
  {
    title:
      "We will let our work be edited and corrected by the broader Movement Leader network before we lend it institutional weight.",
    body:
      "Movement Leaders are not a brand. They are a working network of people who will tell each other when a piece of work is wrong, off-tone, or missing the obvious counterargument. We invite that.",
  },
];

export default async function MovementVoiceCommitmentsPage() {
  const signers = await listMovementVoiceCommitmentSigners();

  return (
    <>
      <section
        className="band-default border-b border-border py-16 md:py-24"
        aria-labelledby="commitments-h1"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Movement Voice Commitments
          </p>
          <h1
            id="commitments-h1"
            className="mt-3 font-serif italic text-4xl font-normal tracking-tight text-foreground md:text-5xl"
          >
            What we commit to.
          </h1>
          <p className="mt-8 text-[1.0625rem] leading-relaxed text-foreground">
            These are the public commitments Movement Leaders working with Movemental hold in
            common: what we refuse to do with our standing and our voice, and what we actively
            practice. They are short, specific, and inspectable.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Draft version {MOVEMENT_VOICE_COMMITMENTS_VERSION} &mdash; pending founder
            ratification before the document is publicly signed.
          </p>
        </Container>
      </section>

      <section
        className="band-default border-b border-border py-16 md:py-24"
        aria-labelledby="refusals-h2"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Band one
          </p>
          <h2
            id="refusals-h2"
            className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
          >
            Five refusals.
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
            What we will not do with our standing or our voice.
          </p>
          <ol className="mt-12 space-y-10 list-none">
            {FIVE_REFUSALS.map((item, idx) => (
              <li key={`refusal-${idx + 1}`} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="font-serif italic text-2xl font-normal text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif italic text-[1.375rem] font-normal text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className="band-default border-b border-border py-16 md:py-24"
        aria-labelledby="practices-h2"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Band two
          </p>
          <h2
            id="practices-h2"
            className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
          >
            Five practices.
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
            What we actively commit to doing.
          </p>
          <ol className="mt-12 space-y-10 list-none">
            {FIVE_PRACTICES.map((item, idx) => (
              <li key={`practice-${idx + 1}`} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="font-serif italic text-2xl font-normal text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif italic text-[1.375rem] font-normal text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className="band-default border-b border-border py-16 md:py-24"
        aria-labelledby="signatories-h2"
      >
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Signatories
          </p>
          <h2
            id="signatories-h2"
            className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
          >
            Movement Leaders who have signed.
          </h2>
          {signers.length === 0 ? (
            <p className="mt-6 text-[1rem] leading-relaxed text-muted-foreground">
              No public signings recorded yet. The founding signatories will appear here as the
              commitments document moves out of draft.
            </p>
          ) : (
            <ul className="mt-10 divide-y divide-border">
              {signers.map((s) => (
                <li
                  key={`${s.slug}-${s.signed_at}`}
                  className="flex flex-wrap items-baseline justify-between gap-2 py-4"
                >
                  <span className="font-serif italic text-[1.125rem] font-normal text-foreground">
                    {s.full_name}
                  </span>
                  <span className="text-xs italic text-muted-foreground">
                    v{s.version_signed} &middot;{" "}
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                      new Date(s.signed_at),
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <section className="band-default py-16 md:py-24" aria-labelledby="commitments-cta-h2">
        <Container className="max-w-(--prose-max)">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            Where this leads
          </p>
          <h2
            id="commitments-cta-h2"
            className="mt-3 font-serif italic text-3xl font-normal tracking-tight text-foreground md:text-4xl"
          >
            Three ways forward.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                Practitioner
              </p>
              <h3 className="mt-2 font-serif italic text-[1.375rem] font-normal text-foreground">
                Add your name.
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                If you are a senior practitioner whose public work belongs in this conversation,
                start a Movement Leader application.
              </p>
              <Link
                href="/leader/apply"
                className="mt-5 inline-flex items-center text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                Apply as a Movement Leader &rarr;
              </Link>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
                Organization
              </p>
              <h3 className="mt-2 font-serif italic text-[1.375rem] font-normal text-foreground">
                Walk the path.
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                If you lead an organization considering this work, the commitments above are the
                posture we bring to the engagement. Start a conversation.
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
                Reader
              </p>
              <h3 className="mt-2 font-serif italic text-[1.375rem] font-normal text-foreground">
                Follow without signing.
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
                If you want to follow the work without adding your name yet, subscribe to the
                newsletter.
              </p>
              <div className="mt-5">
                <NewsletterForm source="movement-voice-commitments" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
