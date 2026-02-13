'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
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
            There is a rapidly advancing <strong>CREDIBILITY CRISIS</strong>, and for us it was
            personal.
          </h2>
          <p className="text-lg text-sage-300 sm:text-xl" style={{ fontFamily: fontBody }}>
            We&apos;re the team behind Movemental. We built our first platform for Alan
            Hirsch—9+ books, seminal work in missional theology and APEST, organizations that
            multiply practitioners worldwide. We saw his content live in silos: books on retailer
            pages, org content scattered across domains, ideas locked in formats the digital world
            can&apos;t find. And we watched the mechanisms that used to help people discover voices
            like his start to break down.
          </p>
        </div>

        <div ref={fact2Ref} className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ fontFamily: fontHeading }}>
            The crisis is <strong>credibility signals no longer signal.</strong>
          </h2>
          <p className="text-lg text-sage-300 sm:text-xl text-left" style={{ fontFamily: fontBody }}>
            As of 2025, somewhere between 40% and 60% of content online involves AI assistance or
            generation. Volume no longer suggests expertise—AI can produce more in a week than most
            writers produce in a year. Polish no longer signals professionalism. Presence no longer
            shows commitment. People can&apos;t tell what&apos;s real anymore. Studies show 68% of
            internet users struggle to distinguish human-created from AI-generated content. Movement
            leaders, whose credibility is relational and hard-won, feel it acutely.
          </p>
        </div>

        <div ref={fact3Ref} className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl" style={{ fontFamily: fontHeading }}>
            For Alan, the crisis was <strong>invisibility, not authority.</strong>
          </h2>
          <p className="text-lg text-sage-300 sm:text-xl text-left" style={{ fontFamily: fontBody }}>
            Alan&apos;s credibility in the room is clear: seminal books, multiple organizations,
            academic appointments. But online, it&apos;s partial. His content lives as silos—books on
            retailer pages, org content on org sites, academic material behind institutional access.
            There&apos;s no single place where &quot;everything Alan has said and written about
            APEST&quot; is structured, linked, and easy to find. So it doesn&apos;t move. Search and
            AI can&apos;t reliably find it. The gap between people who know his work and people who
            would be formed by it if they could find it—that gap is significant.
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
            This is not a tech problem. <strong className="text-white">It&apos;s a human problem.</strong> It
            requires a human response—mature, thoughtful, personalized AI integration. That
            isn&apos;t technical. But it is hard. And it needs a community to carry it. We decided
            to build <strong className="text-white">credibility through networks</strong>, not
            individual metrics—so your work becomes discoverable through the people who already
            trust you.
          </p>
        </div>
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
            Throughout 2025, the AI that people used to write whatever they wanted could
            <strong> code</strong> whatever they wanted.
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              The reality of working agentically with omni-linguistic experts—systems that can do
              anything language can do, and therefore can program, use your computer, the internet,
              code, and other AI agents—has not yet occurred to most. But a few were suddenly faced
              with the question: what would you build now that you could build anything, digitally,
              for anyone?
            </p>
            <p>
              God put Alan, Brad, and me together to test that question. As it turns out, our
              answer is not to use it to build the perfect digital platform. It&apos;s to use it to
              build the <strong>scenius to wield it</strong>—the scenius infrastructure. The
              network of verified humans who can steward credibility, content, and community in an
              age when the middle has collapsed.
            </p>
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
              The solution isn&apos;t to work harder as individuals. It&apos;s to work together.
              Credibility in the AI age emerges through scenius—networks of verified humans who vouch
              for each other, build on each other&apos;s ideas, and create collective authority
              that&apos;s harder to fake than follower counts or polish.
            </p>
            <p>
              Movemental is that scenius made practical: one place you control where your
              credibility, your content, and your network are clearly attached. Content that&apos;s
              findable, connected, and linked to trusted peers. So your work doesn&apos;t sit alone—it
              becomes discoverable through the people who already trust you.
            </p>
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
              But AI is also the tool that can help us navigate it—when we use it to amplify what&apos;s
              real, not to simulate what isn&apos;t.
            </p>
            <p>
              Your expertise is hard-won. Your voice is distinctive. Your credibility is relational.
              AI can help you communicate more clearly, reach more people, adapt your teaching for
              different audiences, handle structure and formatting so you can focus on what only you
              can do. But the credibility is still yours. It&apos;s still grounded in what&apos;s
              real—verified through the network, not fabricated by the algorithm.
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
              <strong className="text-foreground">10%.</strong> Revenue share aligns us with your
              success. We don&apos;t make money unless your content moves. That keeps us building
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
              exists to reduce digital burden—so leaders can stay present to the people in front of
              them. Success is being heard by your people, not everyone.
            </p>
            <p>
              We&apos;re not building the perfect digital platform for its own sake. We&apos;re
              building the scenius to wield it: the infrastructure so that the middle—publication,
              wisdom that travels—can hold again. So that movement leaders can teach and publish
              there, and movement can still happen in the room.
            </p>
          </div>
        </div>
      </NarrativeSection>
    </>
  )
}
