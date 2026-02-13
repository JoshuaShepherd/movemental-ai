'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { ExternalQuoteCallout } from '@/components/why-movemental-final/ExternalQuoteCallout'
import { fontHeading, fontBody } from './typography'

gsap.registerPlugin(ScrollTrigger)

/**
 * Facts + implications block: GSAP fade-in for three facts, then an implications card.
 */
function CredibilityCrisisFactsBlock() {
  const sectionRef = useRef<HTMLElement>(null)
  const fact1Ref = useRef<HTMLDivElement>(null)
  const fact2Ref = useRef<HTMLDivElement>(null)
  const fact3Ref = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const fact1 = fact1Ref.current
      const fact2 = fact2Ref.current
      const fact3 = fact3Ref.current
      const card = cardRef.current
      if (!section || !fact1 || !fact2 || !fact3 || !card) return

      gsap.set([fact1, fact2, fact3, card], { opacity: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: '+=120%',
          scrub: 0.8,
        },
      })
      tl.to(fact1, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
      tl.to(fact2, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.25)
      tl.to(fact3, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5)
      tl.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.85)
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="credibility-crisis"
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 px-4 bg-sage-900 text-white"
    >
      <div className="container max-w-5xl mx-auto space-y-20 sm:space-y-28">
        <div ref={fact1Ref} className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ fontFamily: fontHeading }}>
            There is a <strong>credibility crisis</strong>, and for us it was personal.
          </h2>
          <p className="text-lg text-sage-300 sm:text-xl" style={{ fontFamily: fontBody }}>
            We&apos;re the team behind Movemental. We built our first platform for Alan Hirsch—9+
            books, seminal work in missional theology and APEST, organizations that multiply
            practitioners worldwide. We saw his content stuck in silos: books on retailer pages,
            org content scattered across domains, ideas in formats the digital world can&apos;t
            find. The ways people used to discover voices like his were breaking down.
          </p>
        </div>

        <div ref={fact2Ref} className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ fontFamily: fontHeading }}>
            The crisis is <strong>credibility signals no longer signal.</strong>
          </h2>
          <p className="text-lg text-sage-300 sm:text-xl text-left" style={{ fontFamily: fontBody }}>
            As of 2025, 40–60% of content online involves AI. Volume no longer means expertise—AI
            can produce in a week what most writers produce in a year. Polish doesn&apos;t mean
            professionalism. Presence doesn&apos;t mean commitment. People can&apos;t tell what&apos;s
            real. Studies show 68% of users struggle to tell human-created from AI-generated
            content. Movement leaders, whose credibility is relational and hard-won, feel it
            acutely.
          </p>
        </div>

        <div ref={fact3Ref} className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ fontFamily: fontHeading }}>
            For Alan, the crisis was <strong>invisibility, not authority.</strong>
          </h2>
          <p className="text-lg text-sage-300 sm:text-xl text-left" style={{ fontFamily: fontBody }}>
            Alan&apos;s credibility in the room is clear: seminal books, multiple organizations,
            academic appointments. Online it&apos;s partial. His content lives in silos—books on
            retailer pages, org content on org sites, academic material behind paywalls. There&apos;s
            no one place where &quot;everything Alan has said and written about APEST&quot; is
            structured, linked, and findable. So it doesn&apos;t move. Search and AI can&apos;t
            reliably find it. The gap between people who know his work and people who would be
            formed by it if they could find it is large.
          </p>
        </div>

        <div
          ref={cardRef}
          className="mx-auto max-w-2xl rounded-xl border border-sage-600 bg-sage-800/80 p-8 sm:p-10 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-white mb-4" style={{ fontFamily: fontHeading }}>
            So what?
          </h3>
          <p className="text-sage-200 space-y-3" style={{ fontFamily: fontBody }}>
            Many movement leaders feel it: I have credibility in the room. Online I&apos;m
            invisible. I don&apos;t want to create more—I want what I&apos;ve created to do more. I
            don&apos;t have time to become a content strategist, and I shouldn&apos;t have to. For a
            long time it was right not to pour years into &quot;being findable&quot;—the cost made it
            poor stewardship. The moment has flipped: the opportunity now costs you almost nothing,
            and the upside isn&apos;t just your credibility but the network&apos;s. This isn&apos;t a
            tech problem. <strong className="text-white">It&apos;s a human
            problem.</strong> It needs a human response—thoughtful, personalized AI integration.
            That&apos;s not mainly technical. It&apos;s hard. And it needs a community to carry it.
            We decided to build <strong className="text-white">credibility through networks</strong>,
            not individual metrics—so your work becomes discoverable through the people who already
            trust you.
          </p>
        </div>

        <ExternalQuoteCallout
          quote="Who did the posting will soon matter more than what was posted."
          attribution="The Economist"
          source="AI-generated content is raising the value of trust (Jan 2024)"
          sourceUrl="https://www.economist.com/leaders/2024/01/18/ai-generated-content-is-raising-the-value-of-trust"
          variant="light"
          triggerStart="top 75%"
        />
      </div>
    </section>
  )
}

/**
 * Credibility Crisis section for why-movemental-final.
 * Structure: Facts (GSAP fade 1,2,3) + implications card → then rest of narrative.
 */
export function CredibilityCrisisSection() {
  return (
    <>
      <CredibilityCrisisFactsBlock />

      {/* 2025: agentic / what would you build / Alan Brad God / scenius */}
      <NarrativeSection>
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            In 2025, the AI people used to write could <strong>code</strong> too.
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              Most people haven&apos;t yet grasped what it means to work with systems that can do
              anything language can do—program, use your computer, the internet, other AI agents. But
              a few were suddenly faced with the question: what would you build if you could build
              anything, digitally, for anyone?
            </p>
            <p>
              God put Alan, Brad, and me together to test that. Our answer wasn&apos;t to build the
              perfect digital platform. It was to build the <strong>scenius to wield it</strong>—the
              network of verified humans who can steward credibility, content, and community when
              the middle has collapsed.
            </p>
            <ExternalQuoteCallout
              quote="Scenius is the intelligence of a whole operation or group of people—the communal form of the concept of genius."
              attribution="Brian Eno"
              source="Creativity Through Community — Watch on YouTube"
              sourceUrl="https://www.youtube.com/watch?v=a-4VnHWj15o"
              variant="dark"
            />
          </div>
        </div>
      </NarrativeSection>

      {/* What we decided to do */}
      <NarrativeSection background="muted">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            We decided to build <strong>credibility through networks,</strong> not individual
            metrics.
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              The solution isn&apos;t to work harder alone. It&apos;s to work together. Credibility
              in the AI age comes through scenius—networks of verified humans who vouch for each
              other, build on each other&apos;s ideas, and create collective authority that&apos;s
              harder to fake than follower counts or polish.
            </p>
            <p>
              Movemental is that scenius in practice: one place you control where your credibility,
              content, and network are clearly attached. Content that&apos;s findable, connected,
              and linked to trusted peers. Your work doesn&apos;t sit alone—it becomes discoverable
              through the people who already trust you.
            </p>
            <ExternalQuoteCallout
              quote="Most people who want to be creative would be served best not by worrying about genius but by trying to create or join a scenius."
              attribution="Austin Kleon"
              source="Show Your Work!"
              sourceUrl="https://austinkleon.com/show-your-work/"
              variant="dark"
            />
          </div>
        </div>
      </NarrativeSection>

      {/* Credibility amplification via the tool behind the crisis */}
      <NarrativeSection background="dark">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center" variant="dark">
            <strong>Credibility amplification</strong> via the very tool behind the crisis.
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-sage-300">
            <p>
              AI creates the credibility crisis: infinite content, broken signals, trust collapse.
              But AI can also help us navigate it—when we use it to amplify what&apos;s real, not
              simulate what isn&apos;t.
            </p>
            <p>
              Your expertise is hard-won. Your voice is distinctive. Your credibility is relational.
              AI can help you communicate more clearly, reach more people, adapt your teaching,
              handle structure and formatting so you can focus on what only you can do. The
              credibility stays yours. It&apos;s grounded in what&apos;s real—verified through the
              network, not fabricated by the algorithm.
            </p>
            <p>
              Whether you want AI for human flourishing or not: if you don&apos;t know its power,
              you miss the benefits and you miss the harm. The posture that serves movement
              leaders is liminal, experimental, risk-taking in public—toward maturity and formation
              while staying embodied and relational.
            </p>
            <p className="font-medium text-white">
              Use AI to amplify what&apos;s real. Don&apos;t use it to fake what isn&apos;t.
            </p>
          </div>
        </div>
      </NarrativeSection>

      {/* Numbers: 100, 1000, 10% */}
      <NarrativeSection background="muted">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            Our numbers: <strong>100</strong> · <strong>$1,000</strong> · <strong>10%</strong>
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-8 text-lg text-muted-foreground">
            <p>
              <strong className="text-foreground">100 movement leaders.</strong> Relational
              credibility has limits. We&apos;re building a coherent ecology—a scenius—not a
              marketplace. One hundred is enough to form a network of verified humans who vouch for
              each other and carry each other&apos;s work; it&apos;s not so many that the middle
              becomes noise again.
            </p>
            <p>
              <strong className="text-foreground">$1,000 at first.</strong> We wanted the bar to be
              real but reachable. Not $50K and not free. A commitment that says &quot;I&apos;m in&quot;
              without requiring capital that movement leaders don&apos;t have. Ownership and
              infrastructure from day one.
            </p>
            <p>
              <strong className="text-foreground">10%.</strong> Traditional publishing has taken
              85–90% and left the writer with the rest; the only credibility model said you needed
              them to be legit. We take 10% when you succeed. Revenue share aligns us with your
              success—we don&apos;t make money unless your content moves. That keeps us building
              for circulation and credibility, not for extraction. We grow when you do.
            </p>
          </div>
        </div>
      </NarrativeSection>

      {/* Movement happens offline */}
      <NarrativeSection background="dark">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center" variant="dark">
            Movement still happens <strong>offline.</strong>
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-sage-300">
            <p>
              Formation can&apos;t be automated. Community can&apos;t be simulated. Movemental
              exists to reduce digital burden so leaders can stay present to the people in front of
              them. Success is being heard by your people, not everyone.
            </p>
            <p>
              We&apos;re not building the perfect digital platform for its own sake. We&apos;re
              building the scenius to wield it: the infrastructure so the middle—publication, wisdom
              that travels—can hold again. So movement leaders can teach and publish there, and
              movement can still happen in the room.
            </p>
            <ExternalQuoteCallout
              quote="We admire Van Gogh's paintings, not his publication schedule."
              attribution="More Tothat"
              source="Make Classics, Not Content"
              sourceUrl="https://moretothat.com/make-classics-not-content/"
              variant="light"
            />
          </div>
        </div>
      </NarrativeSection>
    </>
  )
}
