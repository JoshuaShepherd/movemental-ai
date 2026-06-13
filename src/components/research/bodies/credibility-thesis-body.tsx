import type { ReactNode } from "react";
import Link from "next/link";

import styles from "../research.module.css";

function Cite({ n, title }: { n: number; title: string }) {
  return (
    <Link href="/research/sources" className={styles.citationSup} title={title}>
      [{n}]
    </Link>
  );
}

function ResearchLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <Link href={`/research/${slug}`} className={styles.textInkBlue}>
      {children}
    </Link>
  );
}

/** Thesis, ported from `docs/articles/graded-high/85-99/credibility-thesis.md`. */
export const credibilityThesisBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-definition">
      Credibility is the quality of being trusted and believed in. It&rsquo;s the social fabric that
      allows ideas to travel, influence to compound, and leadership to emerge.
    </p>

    <p>But credibility isn&rsquo;t inherent. It&rsquo;s conferred.</p>

    <p>
      Someone, somewhere, has to decide: &ldquo;This person knows what they&rsquo;re talking about. This
      voice deserves attention. These ideas merit serious consideration.&rdquo;
    </p>

    <h4>The philosophical foundation</h4>

    <p>
      A useful working formula: credibility combines trust, expertise, character, and platform.
    </p>

    <p>
      Trust is the audience&rsquo;s belief that the leader is honest, reliable, and acting in their best
      interests rather than personal gain.
    </p>

    <p>
      Expertise is demonstrated knowledge, experience, and practical wisdom in the relevant domain,
      including movemental theology and practice.
    </p>

    <p>
      Character is moral integrity, consistency between beliefs and actions, and the fruit of spiritual
      maturity visible in personal and ministry life.
    </p>

    <p>
      Platform is the means to communicate effectively and reach the people who need to hear the message.
      Historically controlled by institutions, now increasingly digital.
    </p>

    <h4>The deeper social reality</h4>

    <p>
      Credibility as social construction: Credibility doesn&rsquo;t exist in isolation. It&rsquo;s created
      through community recognition, peer validation, and audience response. It&rsquo;s fundamentally
      relational and contextual.
    </p>

    <p>
      The authority paradox: True spiritual authority often emerges from those who least seek it, while those
      who pursue authority most aggressively often prove least worthy of it.
    </p>

    <p>
      The incarnational dimension: In movemental theology, credibility comes through embodied presence,
      suffering with communities, and demonstrated fruit rather than merely intellectual achievement.
    </p>

    <p>
      The network effect: Credibility multiplies through association. Being recognized by credible people
      increases your credibility, creating virtuous or vicious cycles.
    </p>

    <h3 id="section-gatekeeping">How credibility used to work</h3>

    <h4>The gatekeeping era (pre-2000s)</h4>

    <p>Credibility flowed through institutional channels:</p>

    <p>
      Publishers decided who had something worth saying. If you wanted to be taken seriously as a thinker, you
      needed a book contract with a reputable press. Self-published authors were dismissed as amateurs who
      couldn&rsquo;t make it through the real filters.
    </p>

    <p>
      Universities granted academic credentials that functioned as credibility tokens. A PhD from the right
      institution, tenure at a respected school, publications in peer-reviewed journals: these were the
      markers that said, &ldquo;This person&rsquo;s ideas have been vetted by experts.&rdquo;
    </p>

    <p>
      Denominational structures determined who could speak with authority on matters of faith and practice.
      Ordination, seminary degrees, appointments to significant churches or leadership positions: these
      conferred the right to be heard.
    </p>

    <p>
      Media gatekeepers controlled access to audiences. Getting an op-ed in the <em>New York Times</em>, an
      interview on NPR, a speaking slot at a major conference: these were the channels through which thought
      leadership flowed.
    </p>

    <p>The system had obvious problems:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>It favored existing networks and power structures</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>It was slow to recognize new voices</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>It often excluded people based on race, gender, geography, class</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>It confused institutional credentials with actual insight</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>It gave enormous power to a small number of gatekeepers</span>
      </li>
    </ul>

    <p>But it had one undeniable advantage: it filtered.</p>

    <p>
      Not always well. Not always fairly. But it filtered. When you read a book from Oxford University Press
      or heard a speaker at a mainline denominational conference, you knew <em>someone</em> had decided this
      person was worth amplifying. The gatekeepers vouched for them.
    </p>

    <h4>The digital disruption (2000s–2020s)</h4>

    <p>Then the internet democratized access.</p>

    <p>Suddenly anyone could:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Publish (blogs, self-publishing platforms)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Build an audience (social media)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Distribute content globally (YouTube, podcasts, Medium)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Claim expertise (personal websites, LinkedIn)</span>
      </li>
    </ul>

    <p>
      This was liberating. Voices that would never have made it through traditional gatekeepers found
      audiences. Important ideas that didn&rsquo;t fit institutional paradigms gained traction. The
      conversation broadened dramatically.
    </p>

    <p>But credibility became&hellip; complicated.</p>

    <h4>The new credibility signals</h4>

    <p>
      In the digital era, credibility shifted from institutional endorsement to performance metrics:
    </p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Follower counts</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Engagement rates</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Viral content</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>SEO rankings</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Platform verification badges</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Influencer status</span>
      </li>
    </ul>

    <p>The problem: These metrics are terrible proxies for actual credibility.</p>

    <p>Someone could have:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>100,000 Instagram followers and no depth</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Viral content that&rsquo;s entertaining but wrong</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>High SEO rankings for content optimized for algorithms rather than truth</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Platform influence built on controversy rather than insight</span>
      </li>
    </ul>

    <p>
      Meanwhile, genuinely wise voices, people with decades of hard-won experience, deep thinking, and
      transformative ideas, struggled to break through because they didn&rsquo;t understand the game of
      digital performance.
    </p>

    <h4>The fragmentation of trust</h4>

    <p>
      By the 2020s, we had moved from &ldquo;gatekeepers decide credibility&rdquo; to &ldquo;everyone decides
      credibility for themselves.&rdquo;
    </p>

    <p>In some ways, this was democratic and empowering.</p>

    <p>In other ways, it was catastrophic.</p>

    <p>People increasingly lived in information bubbles where credibility was determined by:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Ideological alignment (&ldquo;Do they agree with me?&rdquo;)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Parasocial relationships (&ldquo;Do I feel like I know them?&rdquo;)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Aesthetic performance (&ldquo;Do they look/sound credible?&rdquo;)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Confirmation bias (&ldquo;Do they tell me what I want to hear?&rdquo;)</span>
      </li>
    </ul>

    <p>There was no shared framework for determining who actually knew what they were talking about.</p>

    <h3 id="section-ai-crisis">The AI crisis (2024–present)</h3>

    <p>And then AI arrived. And everything got exponentially more complicated.</p>

    <h4>The flood of generated content</h4>

    <p>
      As of 2025, a substantial share of online content is AI-generated or AI-assisted. Large-scale detector
      studies of newly published English pages find high rates of <em>some</em> AI-flagged content, though
      definitions matter enormously (AI-touched vs. majority-AI vs. pure synthetic). Headline band claims like
      &ldquo;40–60% of blog posts&rdquo; should not ship without tying to a specific report&rsquo;s
      methodology. See{" "}
      <ResearchLink slug="ai-credibility-crisis">The AI Credibility Crisis</ResearchLink> for the full
      prevalence audit.
    </p>

    <p>
      This isn&rsquo;t necessarily bad. AI is a tool, like a word processor or a search engine.
    </p>

    <p>But it creates a fundamental credibility crisis: How do you know what&rsquo;s real?</p>

    <h4>The authenticity problem</h4>

    <p>When anyone can generate:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Plausible-sounding expertise on any topic</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Content that passes basic fact-checking</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Writing that mimics the style of credible voices</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Images, videos, and audio of people saying things they never said</span>
      </li>
    </ul>

    <p>&hellip;how do you determine who actually knows what they&rsquo;re talking about?</p>

    <p>The traditional signals of credibility break down:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Volume of content no longer indicates expertise (AI can produce infinite content)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Articulate writing no longer proves deep thinking (AI writes beautifully)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Consistent presence no longer shows commitment (AI can maintain personas indefinitely)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          Polished production no longer signals professionalism (AI tools make everything look professional)
        </span>
      </li>
    </ul>

    <h4>The trust collapse</h4>

    <p>We&rsquo;re heading toward (or already in) a trust collapse.</p>

    <p>
      Well-sourced surveys show a widening gap between how much people care about authenticity and how
      confident they feel detecting it. In one Pew survey, 76% of U.S. adults say it is extremely or very
      important to tell whether content is AI- or human-made, while 53% are not too or not at all confident
      they can <Cite n={10} title="Pew · AI disclosure · 2025" />. Global news trust remains fragile. The
      Reuters Digital News Report puts overall trust at 40%, stable but low{" "}
      <Cite n={24} title="Reuters DNR · 2025" />. Verification fatigue is real: people are overwhelmed by
      the constant need to question sources. Default skepticism is becoming the norm, even toward legitimate
      expertise.
    </p>

    <p className={styles.marginNote}>
      Stat note: Headline figures like &ldquo;68% struggle to distinguish AI content&rdquo; circulate without
      a primary source matching that exact triad. Prefer named surveys with scope statements. See{" "}
      <ResearchLink slug="ai-credibility-crisis">The AI Credibility Crisis</ResearchLink>.
    </p>

    <p>This isn&rsquo;t sustainable.</p>

    <p>
      In a world where anyone can generate credible-seeming content about anything, actual credibility
      becomes the scarcest resource.
    </p>

    <h3 id="section-influence">Why digital credibility differs from influence</h3>

    <h4>The distinction</h4>

    <p>Influence is the ability to affect others&rsquo; behavior or opinions. It can be:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Bought (advertising, sponsored content)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Gamed (algorithm manipulation, bot networks)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Performed (viral moments, controversy)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Generated (AI content, synthetic engagement)</span>
      </li>
    </ul>

    <p>Credibility is the quality of being trusted and believed in. It requires:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Earned trust over time</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Demonstrated expertise</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Character consistency</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Peer verification</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Sustained substance</span>
      </li>
    </ul>

    <h4>The problem with influence metrics</h4>

    <p>
      In the digital age, influence has become the dominant metric: follower counts, engagement rates, viral
      moments, platform reach.
    </p>

    <p>But these metrics measure performance, not credibility.</p>

    <p>
      Someone can have massive influence (millions of followers, viral content) without credibility (no
      depth, no expertise, no character).
    </p>

    <p>
      Conversely, someone can have deep credibility (decades of proven work, peer recognition, character
      consistency) with limited influence (small audience, low engagement, minimal virality).
    </p>

    <h4>Why this matters</h4>

    <p>
      For movemental leaders: Your credibility is real. You&rsquo;ve spent decades developing expertise,
      leading communities through transformation, writing books that shaped how thousands think, pioneering
      approaches others now copy, earning credibility through decades of faithfulness.
    </p>

    <p>But in the current landscape, you&rsquo;re competing for attention with:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>AI-generated content that sounds just as credible</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Influencers who&rsquo;ve mastered the performance but lack the depth</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Platforms that reward viral moments over sustained wisdom</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Algorithms that can&rsquo;t distinguish substance from simulation</span>
      </li>
    </ul>

    <p>Your credibility is real. But in the current landscape, it&rsquo;s becoming invisible.</p>

    <h4>The formation requirement</h4>

    <p>Formation must accompany amplification.</p>

    <p>Credibility isn&rsquo;t just about reach. It&rsquo;s about:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Character formation: who you are becoming, not just what you&rsquo;re saying</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Intellectual formation: depth of thought developed over time</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Spiritual formation: maturity that shapes how you lead and teach</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Relational formation: trust earned through consistent presence and care</span>
      </li>
    </ul>

    <p>
      Amplification without formation creates influence without credibility, a dangerous combination that
      can mislead and harm.
    </p>

    <p>
      Formation without amplification creates credibility that remains invisible, a tragic waste of wisdom
      that could serve the movement.
    </p>

    <p>Both are necessary. Formation creates credibility. Amplification makes it visible.</p>

    <h3 id="section-scenius">Collective credibility: the scenius model</h3>

    <p>This is where we need a fundamentally new model.</p>

    <p>Not back to gatekeepers (that ship has sailed, and for good reason).</p>

    <p>Not forward into pure digital chaos (that&rsquo;s the crisis we&rsquo;re in).</p>

    <p>
      But toward what Brian Eno called <em>scenius</em>: genius that emerges from a scene, a community of
      people who elevate one another. In this framing, credibility comes from collaborative recognition and
      mutual vouching within networks of aligned thinkers. For the scholarly lineage and honest limits of the
      term, see{" "}
      <ResearchLink slug="scenius-network-credibility">Scenius as Credibility Mechanism</ResearchLink>.
    </p>

    <h4>What scenius means for credibility</h4>

    <p>
      Eno coined <em>scenius</em> to describe how breakthroughs emerge from scenes: communities of practice
      where individuals elevate each other, ideas cross-pollinate, and collective intelligence exceeds what
      any individual could produce.
    </p>

    <p>Applied to credibility in the AI age, scenius means:</p>

    <p>
      1. Network verification. Your credibility isn&rsquo;t established by a distant institution or by
      algorithm-driven metrics. It&rsquo;s established by other credible people vouching for you, not in a
      superficial social media way, but in a substantial, consequential way: &ldquo;I publish alongside this
      person. I link to their work. I build on their ideas. I stake my reputation on the quality of their
      thinking.&rdquo; This is costly peer verification.
    </p>

    <p>
      2. Transparent relationships. In a scenius model, relationships between thinkers are visible and
      traceable: who references whom, who builds on whose ideas, who collaborates with whom. This creates
      accountability.
    </p>

    <p>
      3. Emergent authority. Instead of authority conferred top-down (by institutions) or bottom-up (by
      popularity metrics), it emerges laterally through the network.
    </p>

    <p>
      4. Context-specific credibility. Scenius allows for domain specificity. You might be incredibly
      credible on urban ministry and gentrification, contemplative practice in Protestant traditions, or
      organizational leadership for nonprofits under $2M budget, but not on everything. That is healthy.
    </p>

    <p>
      5. Human verification in an AI world. Scenius creates a web of human verification that AI cannot easily
      fake. Can AI write a plausible article? Yes. Can AI create years of substantive writing with traceable
      intellectual development, a network of verified humans vouching through referencing patterns, and
      consistency between written work and lived presence? Exponentially harder, though not impossible
      eventually. Hard enough to function as a meaningful filter.
    </p>

    <h3 id="section-measurable">Why credibility is measurable but not reducible</h3>

    <h4>Credibility is measurable</h4>

    <p>We can observe and assess credibility through:</p>

    <p>
      Demonstrated expertise: Years of practice, track record of outcomes, body of work showing depth over
      time, recognition from peers and institutions.
    </p>

    <p>
      Character consistency: Alignment between public teaching and private life, response to criticism and
      failure, treatment of those under authority, financial and relational integrity.
    </p>

    <p>
      Peer verification: Who vouches for this person? Who references their work? Who collaborates with them?
    </p>

    <p>
      Audience response: Sustained support over time, transformation in lives and communities, material
      validation, multiplication.
    </p>

    <h4>But credibility is not reducible</h4>

    <p>Credibility cannot be reduced to:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>A single metric (follower count, engagement rate, revenue)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>A formula (expertise + character + platform = credibility)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>A checklist (degree + book + speaking = credibility)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>An algorithm (AI cannot fully assess human credibility)</span>
      </li>
    </ul>

    <p>
      Because credibility is fundamentally relational and contextual. It emerges through relationships, is
      specific to domains, develops over time, requires human judgment, involves character, and is conferred
      by communities, not claimed by individuals.
    </p>

    <h4>The responsibility of stewardship</h4>

    <p>
      Credibility requires stewardship: careful, ongoing attention to maintaining quality, preserving
      character, building relationships, and serving the movement, not just personal platform.
    </p>

    <p>
      Credibility is a trust that must be earned, maintained, and stewarded. It is not a credential that can
      be acquired and forgotten.
    </p>

    <h3 id="section-framework">The new credibility framework</h3>

    <p>So what does credibility look like going forward?</p>

    <p>Not:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>✗</span>
        <span>Institutional credentials alone (still valuable, but insufficient)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✗</span>
        <span>Follower counts (too easy to game)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✗</span>
        <span>Viral content (doesn&rsquo;t indicate depth)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✗</span>
        <span>Individual platforms (too isolated to verify)</span>
      </li>
    </ul>

    <p>But:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Embeddedness in a credible network (scenius membership)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Substantive body of work over time (demonstrated depth)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Cross-referencing by peers (mutual vouching)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Visible intellectual lineage (who influences whom)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Sustained support from real readers (material validation)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Accountability within community (peer oversight)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Discoverability through legitimate SEO (visible expertise)</span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>Consistency between claims and demonstrated knowledge (walk and talk alignment)</span>
      </li>
    </ul>

    <p>
      This is credibility for the AI age. Not perfect, not ungameable, but substantially harder to fake than
      what we have now.
    </p>

    <h3 id="section-call">The call: a new way of being online</h3>

    <p>This requires something from movemental leaders: a shift from solo to scenius.</p>

    <p>For decades, the model was:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Build your own platform</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Grow your own audience</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Protect your own brand</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Compete for attention</span>
      </li>
    </ul>

    <p>
      That model is dying, not just because it&rsquo;s exhausting, but because it&rsquo;s becoming
      ineffective in a world where individual platforms get lost in the noise, credibility requires network
      verification, AI makes solo voices less distinguishable, and meaningful conversations happen in
      interconnected spaces.
    </p>

    <p>The new model is:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Publish within a network of aligned thinkers</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Build collective credibility through mutual elevation</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Share audience rather than hoarding it</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Collaborate on ideas rather than protecting IP</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Reference and build on each other rather than competing</span>
      </li>
    </ul>

    <p>
      This isn&rsquo;t just strategically smart. It&rsquo;s morally better. Ideas come from conversations,
      credibility is relational, influence is magnified through networks, and we&rsquo;re stronger together
      than apart.
    </p>

    <h3 id="section-beyond">Why this matters beyond strategy</h3>

    <p>
      The kind of leadership the world needs right now, movemental leadership that transforms communities,
      speaks truth with wisdom, bridges divides, imagines new futures, requires credibility that
      can&rsquo;t be faked.
    </p>

    <p>
      The challenges we face are too complex for hot takes. The divides we need to bridge require trust earned
      over time. The futures we need to imagine demand depth of thought and lived experience.
    </p>

    <p>In other words: The world needs exactly what movemental leaders have to offer.</p>

    <p>
      But only if that credibility is visible, verifiable, and discoverable in the spaces where conversations
      happen and trust is established.
    </p>

    <p>
      Scenius isn&rsquo;t just a nice model for collaboration. It&rsquo;s the foundation of credibility that
      makes movemental leadership possible in the digital age. In the age of AI, it may be the only
      sustainable model for maintaining the distinction between real expertise and generated fluency, earned
      authority and performed credibility, deep wisdom and shallow content.
    </p>

    <h3 id="section-choice">The choice</h3>

    <p>You can continue to:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Publish in isolation</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Hope your institutional credentials will carry weight</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Try to build individual platforms that compete with AI-generated noise</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Watch your credibility become invisible despite its legitimacy</span>
      </li>
    </ul>

    <p>Or you can:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Join a network of credible peers</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Publish within a scenius that elevates all members</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Build collective credibility that compounds over time</span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>Make your expertise visible and verifiable in the spaces that matter</span>
      </li>
    </ul>

    <p>
      The first path might have worked in 2010. It barely works in 2025. It won&rsquo;t work in 2030.
    </p>

    <p>
      The second path isn&rsquo;t just strategic. It&rsquo;s necessary, because in a world of infinite
      generated content, credibility only matters if it&rsquo;s embedded in networks of human verification
      that AI can&rsquo;t easily replicate.
    </p>

    <p>
      Movemental exists to build that network for leaders who have something real to say, in a world that
      desperately needs to tell the difference.
    </p>

    <p className={styles.marginNote}>
      <em>
        Credibility isn&rsquo;t what you claim. It&rsquo;s what the network verifies through sustained,
        substantive, mutual engagement. In the age of AI, scenius isn&rsquo;t optional. It&rsquo;s survival.
      </em>
    </p>
  </>
);
