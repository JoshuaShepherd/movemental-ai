'use client'

import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'

/**
 * Credibility Crisis section for why-movemental-final.
 * Structure: Introduce us → Describe crisis (AI) → How it affected Alan → What we decided → Amplification via the tool.
 */
export function CredibilityCrisisSection() {
  return (
    <>
      {/* Intro: Personal stake */}
      <NarrativeSection id="credibility-crisis" background="dark">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center" variant="dark">
            There is a rapidly advancing <strong>CREDIBILITY CRISIS</strong>, and for us it was
            personal.
          </NarrativeStatement>
          <p className="mx-auto max-w-2xl text-center text-lg text-sage-300 sm:text-xl">
            Introduce us: We&apos;re the team behind Movemental. We built our first platform for Alan
            Hirsch—9+ books, seminal work in missional theology and APEST, organizations that
            multiply practitioners worldwide. We saw his content live in silos: books on retailer
            pages, org content scattered across domains, ideas locked in formats the digital world
            can&apos;t find. And we watched the mechanisms that used to help people discover voices
            like his start to break down.
          </p>
        </div>
      </NarrativeSection>

      {/* Describe the crisis in real terms (AI) */}
      <NarrativeSection background="muted">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            The crisis is <strong>credibility signals no longer signal.</strong>
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              As of 2025, somewhere between 40% and 60% of content online involves AI assistance or
              generation. Volume no longer suggests expertise—AI can produce more in a week than most
              writers produce in a year. Polish no longer signals professionalism—AI can make
              everything look polished from day one. Presence no longer shows commitment—AI can
              maintain the appearance of consistency without a human involved.
            </p>
            <p>
              People can&apos;t tell what&apos;s real anymore. Studies show 68% of internet users
              struggle to distinguish human-created from AI-generated content. That uncertainty
              creates a trust collapse—and movement leaders, whose credibility is relational and
              hard-won, feel it acutely.
            </p>
          </div>
        </div>
      </NarrativeSection>

      {/* How it affected Alan */}
      <NarrativeSection>
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            For Alan, the crisis was <strong>invisibility, not authority.</strong>
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              Alan&apos;s credibility in the room is clear: seminal books, multiple organizations,
              academic appointments, a clear cost paid for staying at the edge. But online, it&apos;s
              partial. His content lives as silos—books on retailer pages, org content on org sites,
              academic material behind institutional access. There&apos;s no single place where
              &quot;everything Alan has said and written about APEST&quot; or &quot;missional
              movement&quot; is structured, linked, and easy to find.
            </p>
            <p>
              So it doesn&apos;t move. It stays where it was first put. Search and AI can&apos;t
              reliably find it. Algorithms and platforms don&apos;t consistently see him as the
              go-to voice for this space. The gap between people who know his work and people who
              would be formed by it if they could find it—that gap is significant.
            </p>
          </div>
        </div>
      </NarrativeSection>

      {/* AI is not a tech problem */}
      <NarrativeSection background="muted">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            This is not a tech problem. <strong>It&apos;s a human problem.</strong>
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground">
            <p>
              It requires a human response—mature, thoughtful, personalized AI integration. That
              isn&apos;t technical. But it is hard. And it needs a community to carry it.
            </p>
          </div>
        </div>
      </NarrativeSection>

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
