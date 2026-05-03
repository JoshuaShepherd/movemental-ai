import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";

/**
 * Composite fictional case for `/services/sandbox-season/exemplar`.
 * Does not map to any real client; written to show decision density without leaking specifics.
 */
export function SandboxExemplarPageContent() {
  return (
    <>
      <Section variant="midnight" spacing="lg">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Composite case · Fiction</Eyebrow>
            <Display size="lg" className="max-w-4xl text-balance">
              Meridian Public Renewal, <em>Weeks 1, 6, and 12</em>
            </Display>
            <Prose className="mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                Meridian is a mid-sized regional alliance of food banks and legal-aid clinics. It is not a client of
                Movemental. The board is nervous about AI because two member agencies already experimented quietly with
                assistants on donor copy and created inconsistent voice. The CEO wants a season that produces a
                portfolio the alliance can defend, not another slide about innovation.
              </p>
            </Prose>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services/sandbox-season"
                className="inline-flex items-center gap-2 border-b border-inverse-foreground/40 pb-0.5 text-sm font-medium text-inverse-foreground hover:border-inverse-foreground"
              >
                Back to Sandbox Season
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="max-w-prose">
          <Reveal>
            <Prose>
              <h2 className="font-sans text-xl font-medium tracking-tight text-foreground">Week 1 · What hard clarity looks like</h2>
              <p>
                The Senior Sponsor arrives with a generous brief about helping affiliates work smarter. The facilitator
                steers the room to the out-of-scope list first. Personalization on donor stories is parked until the
                Safety Owner publishes a written bar for what may be drafted against live CRM fields. Experiment
                operators look relieved: they had been asked to personalize at scale without a rule. By the end of the
                session the charter names five data classes that may be touched in the sandbox, three that may not, and
                the Observer-veto seat is held by general counsel with authority to stop a brief mid-cycle.
              </p>
              <h2 className="mt-12 font-sans text-xl font-medium tracking-tight text-foreground">Weeks 2–3 · The scan does its job</h2>
              <p>
                The eight-pattern scan runs across real work from the last ninety days. Repetition and translation
                produce the longest lists; personalization produces only two candidates, both held for Safety pre-read.
                The filter meeting is uncomfortable on purpose: vague candidates die on the table instead of dying in
                production. Three experiment briefs emerge with paired reviewers who are not the owners. Someone jokes
                that the organization finally has a shared vocabulary for what an experiment is. Nobody asks to buy a
                tool yet.
              </p>
              <h2 className="mt-12 font-sans text-xl font-medium tracking-tight text-foreground">Week 6 · When scoring changes behavior</h2>
              <p>
                Three experiments have run once. The first scoring sheet is mostly yellow with two honest reds on
                repeatability. A translation-category brief on grant reporting looked fast until a program director
                notices the donor-facing two-pager reads like every other nonprofit two-pager. The team rewrites the
                quality criteria instead of arguing about the model. The Portfolio Owner moves one candidate to a
                reroute column rather than forcing a second run. The weekly session feels less like a demo and more
                like a working group keeping a shared document honest.
              </p>
              <h2 className="mt-12 font-sans text-xl font-medium tracking-tight text-foreground">Weeks 8–9 · The flag earns its keep</h2>
              <p>
                The Safety Owner writes the first ethical and relational flag paragraphs on live candidates. One
                synthesis use case that scored green on time is rerouted because the sources actually disagreed and the
                summary smoothed the disagreement. A decision-support experiment is allowed to continue only with a
                written rule that the assistant may surface trade-offs but may not recommend a choice. The Senior
                Sponsor attends Week 8 and realizes the flag is not a morale gesture; it changes what the alliance is
                willing to put in front of vulnerable populations.
              </p>
              <h2 className="mt-12 font-sans text-xl font-medium tracking-tight text-foreground">Week 12 · What ships to the board</h2>
              <p>
                The portfolio has seven use cases with green or yellow scores, two rerouted for Skills-stage review, and
                one parked with a written flag paragraph about voice on personalization. The governance one-pager names
                who signs off on assisted content, how incident review works, and what may not be automated in season
                two without a new Safety memo. The Senior Sponsor reads the rejection log aloud in the final session:
                fourteen candidates killed with reasons. She says the quiet part out loud: this is the first time the
                alliance has a single story about what it tried and refused. The cohort asks about a quarterly refresh
                before the facilitator mentions it.
              </p>
              <p>
                If your organization is nothing like Meridian, the shape still applies: named roles, explicit outs,
                three cycles, scoring that can stay yellow, and a board artifact that took formation seriously instead
                of borrowing courage from a vendor deck.
              </p>
              <h2 className="mt-12 font-sans text-xl font-medium tracking-tight text-foreground">
                What Meridian did not buy in the same twelve weeks
              </h2>
              <p>
                No procurement. No production deployment. No cross-affiliate mandate beyond the named cohort. No
                assistant vendor picked for everyone. The season stayed inside one shared document, one facilitator
                rhythm, and one refusal to treat green scores as enthusiasm. The board deck they will see next month is
                shorter than the working document because the work was allowed to be boring on the way to being true.
              </p>
              <p>
                Movemental stays redundant by week ten on purpose: the Portfolio Owner runs more of the session, the
                operators challenge each other without waiting for permission, and the facilitator stops being the
                source of momentum. That redundancy is the sign the season did what it claimed. If you read this
                exemplar and want the same structural honesty for your own org, the next move is not to imitate
                Meridian-specific details. It is to ask whether your sponsor, Safety Owner, and cohort composition can carry
                the same load-bearing roles without collapsing them into one exhausted generalist.
              </p>
            </Prose>
            <div className="mt-10 flex flex-wrap gap-6">
              <ArrowLink href="/contact">Request a conversation</ArrowLink>
              <ArrowLink href="/resources/templates" tone="foreground">
                Request the template pack
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
