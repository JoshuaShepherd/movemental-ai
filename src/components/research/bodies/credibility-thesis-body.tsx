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

/** Thesis — ported from `docs/articles/graded-high/85-99/credibility-thesis.md`. */
export const credibilityThesisBody: ReactNode = (
  <>
    <p className={styles.dropCap} id="section-definition">
      Credibility is the quality of being trusted and believed in. It&rsquo;s the social fabric that
      allows ideas to travel, influence to compound, and leadership to emerge.
    </p>

    <p>
      But credibility isn&rsquo;t inherent. It&rsquo;s <strong>conferred</strong>.
    </p>

    <p>
      Someone, somewhere, has to decide: &ldquo;This person knows what they&rsquo;re talking about. This
      voice deserves attention. These ideas merit serious consideration.&rdquo;
    </p>

    <h4>The philosophical foundation</h4>

    <p>
      <strong>Credibility = Trust + Expertise + Character + Platform</strong>
    </p>

    <p>
      <strong>Trust:</strong> The audience&rsquo;s belief that the leader is honest, reliable, and acting
      in their best interests rather than personal gain.
    </p>

    <p>
      <strong>Expertise:</strong> Demonstrated knowledge, experience, and practical wisdom in the relevant
      domain — in our case, movemental theology and practice.
    </p>

    <p>
      <strong>Character:</strong> Moral integrity, consistency between beliefs and actions, and the fruit
      of spiritual maturity visible in personal and ministry life.
    </p>

    <p>
      <strong>Platform:</strong> The means to communicate effectively and reach the people who need to hear
      the message. Historically controlled by institutions, now increasingly digital.
    </p>

    <h4>The deeper social reality</h4>

    <p>
      <strong>Credibility as social construction:</strong> Credibility doesn&rsquo;t exist in isolation.
      It&rsquo;s created through community recognition, peer validation, and audience response. It&rsquo;s
      fundamentally relational and contextual.
    </p>

    <p>
      <strong>The authority paradox:</strong> True spiritual authority often emerges from those who least
      seek it, while those who pursue authority most aggressively often prove least worthy of it.
    </p>

    <p>
      <strong>The incarnational dimension:</strong> In movemental theology, credibility comes through
      embodied presence, suffering with communities, and demonstrated fruit rather than merely intellectual
      achievement.
    </p>

    <p>
      <strong>The network effect:</strong> Credibility multiplies through association. Being recognized by
      credible people increases your credibility, creating virtuous or vicious cycles.
    </p>

    <h3 id="section-gatekeeping">How credibility used to work</h3>

    <h4>The gatekeeping era (pre-2000s)</h4>

    <p>Credibility flowed through institutional channels:</p>

    <p>
      <strong>Publishers</strong> decided who had something worth saying. If you wanted to be taken
      seriously as a thinker, you needed a book contract with a reputable press. Self-published authors
      were dismissed as amateurs who couldn&rsquo;t make it through the real filters.
    </p>

    <p>
      <strong>Universities</strong> granted academic credentials that functioned as credibility tokens. A
      PhD from the right institution, tenure at a respected school, publications in peer-reviewed
      journals: these were the markers that said, &ldquo;This person&rsquo;s ideas have been vetted by
      experts.&rdquo;
    </p>

    <p>
      <strong>Denominational structures</strong> determined who could speak with authority on matters of
      faith and practice. Ordination, seminary degrees, appointments to significant churches or leadership
      positions: these conferred the right to be heard.
    </p>

    <p>
      <strong>Media gatekeepers</strong> controlled access to audiences. Getting an op-ed in the{" "}
      <em>New York Times</em>, an interview on NPR, a speaking slot at a major conference: these were the
      channels through which thought leadership flowed.
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

    <p>
      But it had one undeniable advantage: <strong>It filtered.</strong>
    </p>

    <p>
      Not always well. Not always fairly. But it filtered. When you read a book from Oxford University
      Press or heard a speaker at a mainline denominational conference, you knew <em>someone</em> had
      decided this person was worth amplifying. The gatekeepers vouched for them.
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
      In the digital era, credibility shifted from institutional endorsement to{" "}
      <strong>performance metrics</strong>:
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

    <p>
      The problem: These metrics are terrible proxies for actual credibility.
    </p>

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
      Meanwhile, genuinely wise voices — people with decades of hard-won experience, deep thinking, and
      transformative ideas — struggled to break through because they didn&rsquo;t understand the game of
      digital performance.
    </p>

    <h4>The fragmentation of trust</h4>

    <p>
      By the 2020s, we had moved from &ldquo;gatekeepers decide credibility&rdquo; to &ldquo;everyone
      decides credibility for themselves.&rdquo;
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
      As of 2025, a substantial share of online content is AI-generated or AI-assisted. Large-scale
      detector studies of newly published English pages find high rates of <em>some</em> AI-flagged
      content — with definitions that matter enormously (AI-touched vs. majority-AI vs. pure synthetic).
      Headline band claims like &ldquo;40–60% of blog posts&rdquo; should not ship without tying to a
      specific report&rsquo;s methodology. See{" "}
      <ResearchLink slug="ai-credibility-crisis">The AI Credibility Crisis</ResearchLink> for the full
      prevalence audit.
    </p>

    <p>
      This isn&rsquo;t necessarily bad. AI is a tool, like a word processor or a search engine.
    </p>

    <p>
      But it creates a fundamental credibility crisis: <strong>How do you know what&rsquo;s real?</strong>
    </p>

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
        <span>
          <strong>Volume of content</strong> no longer indicates expertise (AI can produce infinite content)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Articulate writing</strong> no longer proves deep thinking (AI writes beautifully)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Consistent presence</strong> no longer shows commitment (AI can maintain personas
          indefinitely)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Polished production</strong> no longer signals professionalism (AI tools make everything
          look professional)
        </span>
      </li>
    </ul>

    <h4>The trust collapse</h4>

    <p>We&rsquo;re heading toward (or already in) a <strong>trust collapse</strong>.</p>

    <p>
      Well-sourced surveys show a widening gap between how much people care about authenticity and how
      confident they feel detecting it — <strong>76%</strong> of U.S. adults say it is extremely or very
      important to tell whether content is AI- or human-made, while <strong>53%</strong> are not too or
      not at all confident they can <Cite n={10} title="Pew · AI disclosure · 2025" />. Global news trust
      remains fragile — <strong>40%</strong> overall trust in news in the Reuters Digital News Report,
      stable but low <Cite n={24} title="Reuters DNR · 2025" />.{" "}
      <strong>Verification fatigue</strong> is real: people are overwhelmed by the constant need to
      question sources. <strong>Default skepticism</strong> is becoming the norm, even toward legitimate
      expertise.
    </p>

    <p className={styles.marginNote}>
      <strong>Stat note:</strong> Headline figures like &ldquo;68% struggle to distinguish AI content&rdquo;
      circulate without a primary source matching that exact triad. Prefer named surveys with scope
      statements — see{" "}
      <ResearchLink slug="ai-credibility-crisis">The AI Credibility Crisis</ResearchLink>.
    </p>

    <p>This isn&rsquo;t sustainable.</p>

    <p>
      In a world where anyone can generate credible-seeming content about anything,{" "}
      <strong>actual credibility becomes the scarcest resource</strong>.
    </p>

    <h3 id="section-influence">Why digital credibility differs from influence</h3>

    <h4>The distinction</h4>

    <p>
      <strong>Influence</strong> is the ability to affect others&rsquo; behavior or opinions. It can be:
    </p>

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

    <p>
      <strong>Credibility</strong> is the quality of being trusted and believed in. It requires:
    </p>

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
      In the digital age, influence has become the dominant metric: follower counts, engagement rates,
      viral moments, platform reach.
    </p>

    <p>
      But these metrics measure <strong>performance</strong>, not <strong>credibility</strong>.
    </p>

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
      <strong>For movemental leaders:</strong> Your credibility is real. You&rsquo;ve spent decades
      developing expertise, leading communities through transformation, writing books that shaped how
      thousands think, pioneering approaches others now copy, earning credibility through decades of
      faithfulness.
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

    <p>
      <strong>Your credibility is real. But in the current landscape, it&rsquo;s becoming invisible.</strong>
    </p>

    <h4>The formation requirement</h4>

    <p>
      This is why <strong>formation must accompany amplification</strong>.
    </p>

    <p>Credibility isn&rsquo;t just about reach. It&rsquo;s about:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Character formation:</strong> Who you are becoming, not just what you&rsquo;re saying
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Intellectual formation:</strong> Depth of thought developed over time
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Spiritual formation:</strong> Maturity that shapes how you lead and teach
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Relational formation:</strong> Trust earned through consistent presence and care
        </span>
      </li>
    </ul>

    <p>
      Amplification without formation creates influence without credibility — a dangerous combination that
      can mislead and harm.
    </p>

    <p>
      Formation without amplification creates credibility that remains invisible — a tragic waste of wisdom
      that could serve the movement.
    </p>

    <p>
      <strong>Both are necessary. Formation creates credibility. Amplification makes it visible.</strong>
    </p>

    <h3 id="section-scenius">The scenius solution: collective credibility</h3>

    <p>
      This is where we need a fundamentally new model.
    </p>

    <p>
      Not back to gatekeepers (that ship has sailed, and for good reason).
    </p>

    <p>
      Not forward into pure digital chaos (that&rsquo;s the crisis we&rsquo;re in).
    </p>

    <p>
      But toward <strong>scenius</strong>: collaborative genius, collective credibility, mutual vouching
      within networks of aligned thinkers. For the scholarly lineage and honest limits of the term, see{" "}
      <ResearchLink slug="scenius-network-credibility">Scenius as Credibility Mechanism</ResearchLink>.
    </p>

    <h4>What scenius means for credibility</h4>

    <p>
      The term <em>scenius</em> was coined by Brian Eno to describe how genius emerges from scenes:
      communities of practice where individuals elevate each other, ideas cross-pollinate, and collective
      intelligence exceeds what any individual could produce.
    </p>

    <p>Applied to credibility in the AI age, scenius means:</p>

    <p>
      <strong>1. Network verification.</strong> Your credibility isn&rsquo;t established by a distant
      institution or by algorithm-driven metrics. It&rsquo;s established by{" "}
      <strong>other credible people vouching for you</strong> — not in a superficial social media way, but
      in a substantial, consequential way: &ldquo;I publish alongside this person. I link to their work. I
      build on their ideas. I stake my reputation on the quality of their thinking.&rdquo; This is{" "}
      <strong>costly</strong> peer verification.
    </p>

    <p>
      <strong>2. Transparent relationships.</strong> In a scenius model, relationships between thinkers are
      visible and traceable — who references whom, who builds on whose ideas, who collaborates with whom.
      This creates <strong>accountability</strong>.
    </p>

    <p>
      <strong>3. Emergent authority.</strong> Instead of authority conferred top-down (by institutions) or
      bottom-up (by popularity metrics), it emerges <strong>laterally</strong> through the network.
    </p>

    <p>
      <strong>4. Context-specific credibility.</strong> Scenius allows for domain specificity. You might be
      incredibly credible on urban ministry and gentrification, contemplative practice in Protestant
      traditions, or organizational leadership for nonprofits under $2M budget — but not on everything.
      That is healthy.
    </p>

    <p>
      <strong>5. Human verification in an AI world.</strong> Scenius creates a web of human verification
      that AI cannot easily fake. Can AI write a plausible article? Yes. Can AI create years of substantive
      writing with traceable intellectual development, a network of verified humans vouching through
      referencing patterns, and consistency between written work and lived presence? Exponentially harder —
      not impossible eventually, but hard enough to function as a meaningful filter.
    </p>

    <h3 id="section-measurable">Why credibility is measurable but not reducible</h3>

    <h4>Credibility is measurable</h4>

    <p>We can observe and assess credibility through:</p>

    <p>
      <strong>Demonstrated expertise:</strong> Years of practice, track record of outcomes, body of work
      showing depth over time, recognition from peers and institutions.
    </p>

    <p>
      <strong>Character consistency:</strong> Alignment between public teaching and private life, response to
      criticism and failure, treatment of those under authority, financial and relational integrity.
    </p>

    <p>
      <strong>Peer verification:</strong> Who vouches for this person? Who references their work? Who
      collaborates with them?
    </p>

    <p>
      <strong>Audience response:</strong> Sustained support over time, transformation in lives and
      communities, material validation, multiplication.
    </p>

    <h4>But credibility is not reducible</h4>

    <p>Credibility cannot be reduced to:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>A single metric</strong> (follower count, engagement rate, revenue)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>A formula</strong> (expertise + character + platform = credibility)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>A checklist</strong> (degree + book + speaking = credibility)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>An algorithm</strong> (AI cannot fully assess human credibility)
        </span>
      </li>
    </ul>

    <p>
      Because credibility is fundamentally <strong>relational and contextual</strong> — it emerges through
      relationships, is specific to domains, develops over time, requires human judgment, involves character,
      and is conferred by communities, not claimed by individuals.
    </p>

    <h4>The responsibility of stewardship</h4>

    <p>
      Credibility requires <strong>stewardship</strong>: careful, ongoing attention to maintaining quality,
      preserving character, building relationships, and serving the movement — not just personal platform.
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
        <span>
          <strong>Embeddedness in a credible network</strong> (scenius membership)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>
          <strong>Substantive body of work over time</strong> (demonstrated depth)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>
          <strong>Cross-referencing by peers</strong> (mutual vouching)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>
          <strong>Visible intellectual lineage</strong> (who influences whom)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>
          <strong>Sustained support from real readers</strong> (material validation)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>
          <strong>Accountability within community</strong> (peer oversight)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>
          <strong>Discoverability through legitimate SEO</strong> (visible expertise)
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>✓</span>
        <span>
          <strong>Consistency between claims and demonstrated knowledge</strong> (walk and talk alignment)
        </span>
      </li>
    </ul>

    <p>
      This is credibility for the AI age. Not perfect, not ungameable, but{" "}
      <strong>substantially harder to fake</strong> than what we have now.
    </p>

    <h3 id="section-call">The call: a new way of being online</h3>

    <p>
      This requires something from movemental leaders: <strong>a shift from solo to scenius.</strong>
    </p>

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
      That model is dying — not just because it&rsquo;s exhausting, but because{" "}
      <strong>it&rsquo;s becoming ineffective</strong> in a world where individual platforms get lost in the
      noise, credibility requires network verification, AI makes solo voices less distinguishable, and
      meaningful conversations happen in interconnected spaces.
    </p>

    <p>The new model is:</p>

    <ul className={styles.articleList}>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Publish within a network</strong> of aligned thinkers
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Build collective credibility</strong> through mutual elevation
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Share audience</strong> rather than hoarding it
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Collaborate on ideas</strong> rather than protecting IP
        </span>
      </li>
      <li>
        <span className={styles.articleListNum}>•</span>
        <span>
          <strong>Reference and build on each other</strong> rather than competing
        </span>
      </li>
    </ul>

    <p>
      This isn&rsquo;t just strategically smart. It&rsquo;s <strong>morally better</strong> — ideas come
      from conversations, credibility is relational, influence is magnified through networks, and we&rsquo;re
      stronger together than apart.
    </p>

    <h3 id="section-beyond">Why this matters beyond strategy</h3>

    <p>
      <strong>
        The kind of leadership the world needs right now — movemental leadership that transforms
        communities, speaks truth with wisdom, bridges divides, imagines new futures — requires credibility
        that can&rsquo;t be faked.
      </strong>
    </p>

    <p>
      The challenges we face are too complex for hot takes. The divides we need to bridge require trust
      earned over time. The futures we need to imagine demand depth of thought and lived experience.
    </p>

    <p>
      In other words: <strong>The world needs exactly what movemental leaders have to offer.</strong>
    </p>

    <p>
      But only if that credibility is <strong>visible, verifiable, and discoverable</strong> in the spaces
      where conversations happen and trust is established.
    </p>

    <p>
      Scenius isn&rsquo;t just a nice model for collaboration. It&rsquo;s the{" "}
      <strong>foundation of credibility</strong> that makes movemental leadership possible in the digital
      age — and in the age of AI, the <strong>only sustainable model</strong> for maintaining the
      distinction between real expertise and generated fluency, earned authority and performed credibility,
      deep wisdom and shallow content.
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
      The second path isn&rsquo;t just strategic. It&rsquo;s <strong>necessary</strong> — because in a world
      of infinite generated content, <strong>credibility only matters if it&rsquo;s embedded in networks of
      human verification that AI can&rsquo;t easily replicate</strong>.
    </p>

    <p>
      Movemental exists to build that network — for leaders who have something real to say, in a world that
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
