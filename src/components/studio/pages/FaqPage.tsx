"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, question, answer }) => {
  return (
    <details className="group border-b border-border/60 [&_summary::-webkit-details-marker]:hidden" id={id}>
      <summary className="flex cursor-pointer items-center justify-between py-5 text-foreground font-medium hover:text-primary transition-colors">
        <span className="text-[1.0625rem]">{question}</span>
        <span className="ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border group-open:border-primary group-open:bg-primary group-open:text-primary-foreground transition-colors">
          <svg className="h-3 w-3 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </summary>
      <div className="pb-6 text-muted-foreground prose max-w-none text-[0.98rem] leading-relaxed">
        {answer}
      </div>
    </details>
  );
}

const FAQ_GROUPS = [
  {
    id: "getting-started",
    band: "band-default",
    eyebrow: "Getting started",
    display: "Getting started.",
    lede: "What to do before you book…",
    items: [
      { slug: "what-first", q: "What should we do first?", a: <>Start with Safety. Reach out via our <Link href="/contact" className="text-primary hover:underline">Contact page</Link> to schedule a diagnostic call.</> },
      { slug: "technical-expertise", q: "Do we need technical expertise to begin?", a: "No. The AI Stewardship Sequence begins with leadership alignment, not software engineering." },
      { slug: "what-is-it", q: "Is this a tool, a course, or a consulting engagement?", a: <>It is a consulting engagement mapped to a specific architecture. See <Link href="/work-with-us" className="text-primary hover:underline">Ways to Engage</Link>.</> },
      { slug: "first-call", q: "What does the first call look like?", a: "Thirty minutes mapping your specific friction points without any sales pressure." },
      { slug: "are-we-ready", q: "How do we know if we are ready?", a: "If your staff is already using ChatGPT implicitly, you are ready because you are already exposed." },
      { slug: "have-strategy", q: "Do we need to have an AI strategy already?", a: "No. We help you build a durable system rather than a fragile temporary strategy." },
    ]
  },
  {
    id: "the-path",
    band: "band-section",
    eyebrow: "The Path",
    display: "The four stages, in order.",
    lede: "Safety, Sandbox…",
    items: [
      { slug: "what-is-path", q: "What is the Movemental AI Path?", a: <>It is the four-stage AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions. Read it in the <Link href="/path" className="text-primary hover:underline">Path summary</Link>.</> },
      { slug: "why-order", q: "Why this order? Why not all four in parallel?", a: "Attempting solutions before safety opens you to data breaches. Changing the order collapses the required human formation." },
      { slug: "can-we-skip", q: "Can we skip stages if we have already done some of this?", a: "We will audit any work you've done. If it holds up, we move forward. Most organizations discover gaps in their safety foundation." },
      { slug: "do-stages-overlap", q: "Do the stages overlap?", a: "Chronologically, yes. But you cannot start a subsequent stage until the prerequisite is locked." },
      { slug: "safety-covers", q: "What does Safety actually cover?", a: <>Acceptable use policies, data boundary definitions, and theological red lines. See <Link href="/start-with-safety" className="text-primary hover:underline">Start with Safety</Link>.</> },
      { slug: "sandbox-means", q: "What does Sandbox mean in practice?", a: "Isolated environments where staff can securely learn prompts and limits without risking public trust or constituent data." },
      { slug: "skills-solutions", q: "What do Skills and Solutions include?", a: "Skills focuses on forming human judgment; Solutions deploys organization-wide architectural implementations safely." },
    ]
  },
  {
    id: "approach",
    band: "band-default",
    eyebrow: "Approach",
    display: "Approach and philosophy.",
    lede: "",
    items: [
      { slug: "pro-or-anti", q: "Is Movemental pro-AI or anti-AI?", a: "We are pro-mission. We treat AI as an inevitably disruptive change that must be stewarded deliberately rather than accepted universally." },
      { slug: "why-not-just-use", q: "Why not just start using tools?", a: "Because tools shape the people who use them. Untethered tool usage fractures organizational culture." },
      { slug: "tech-problem", q: "Is this primarily a technology problem?", a: "No. It is an adaptive leadership and formation challenge masquerading as a technology shift." },
      { slug: "theological", q: "Is this theological?", a: "Yes. Every tool has an embedded worldview. For faith-based organizations, this intersects directly with human dignity and pastoral care." },
      { slug: "partisan", q: "Are you partisan — politically or ecclesially?", a: "No. We serve orthodox churches across denominations and secular nonprofits united by serious missional constraints." },
      { slug: "tech-changes", q: "What happens when the technology changes?", a: "The technology will change weekly. Good policies govern data behavior and human oversight, remaining stable regardless of which LLM wins." },
    ]
  },
  {
    id: "who-its-for",
    band: "band-section",
    eyebrow: "Who it's for",
    display: "Who Movemental serves.",
    lede: "Three implementation audiences…",
    items: [
      { slug: "who-is-this-for", q: "Who is this actually for?", a: "Leaders responsible for people, mission, and outcomes." },
      { slug: "only-christian", q: "Is this only for Christian organizations?", a: "We primarily serve churches and faith-based nonprofits, but the framework successfully protects any serious mission-driven organization." },
      { slug: "small-orgs", q: "Do you work with small organizations?", a: "Yes. In fact, small organizations often need to implement safety the fastest because they lack large IT departments." },
      { slug: "denominations", q: "What about denominations and judicatories?", a: "Yes. We help networks build baseline policies that their constituent churches can individually adopt." },
      { slug: "individuals", q: "Is this for individual leaders or only organizations?", a: "The system is built for organizational adoption, though it begins with individual leader clarity." },
      { slug: "movement-leaders-fit", q: "Where do movement leaders fit?", a: <>They are the relational glue guiding this transition. See our <Link href="/voices" className="text-primary hover:underline">Voices</Link> context.</> },
    ]
  },
  {
    id: "engagement",
    band: "band-default",
    eyebrow: "Engagement",
    display: "Ways to engage.",
    lede: "One Sequence, three shapes…",
    items: [
      { slug: "options", q: "What are the engagement options?", a: <>Safety Sessions, Guided Pathways, and Solutions Partnerships. See <Link href="/work-with-us" className="text-primary hover:underline">Work with Us</Link>.</> },
      { slug: "model", q: "What is the engagement model?", a: "We partner intensively over a set timeline rather than selling ongoing software subscriptions." },
      { slug: "who-attends", q: "Who needs to attend from our side?", a: "Senior leadership for the initial Safety Session; department heads for Sandbox and Skills phases." },
      { slug: "virtual-in-person", q: "Is this virtual or in-person?", a: "Typically virtual, though we offer in-person executive retreats for large network adoptions." },
      { slug: "how-quickly", q: "How quickly can we start?", a: "Often within two weeks of our initial conversation." },
      { slug: "pause", q: "Can we pause or step out mid-engagement?", a: "Yes. The Sequence is modular. You can stop after safety is attained and wait until you are ready for step two." },
    ]
  },
  {
    id: "cost-time",
    band: "band-section",
    eyebrow: "Cost & time",
    display: "Cost, time, and the boring questions.",
    lede: "Direct answers…",
    items: [
      { slug: "cost", q: "What does this cost?", a: "It scales to the size of the organization and the depth of the pathway chosen. Safety sessions are priced accessibly to ensure no organization remains exposed." },
      { slug: "budget-range", q: "Can you give a budget range?", a: "We provide specific ranges on our initial diagnostic call based on your organizational complexity." },
      { slug: "reduced-rates", q: "Do you offer reduced rates for smaller organizations?", a: "Yes, we reserve capacity to sliding-scale interventions for high-impact, low-resource nonprofits." },
      { slug: "how-long", q: "How long does an engagement take?", a: "A Safety Session takes 14 days. A Guided Pathway can run for 3 to 6 months." },
      { slug: "slow-down", q: "Will this slow our team down?", a: "In the short term, yes. Wisdom is slower than recklessness. In the long term, it creates massive acceleration through clarity." },
      { slug: "time-commitment", q: "What time commitment do our leaders need?", a: "Four to six hours of focused synchronous time over the first month." },
      { slug: "who-pays", q: "Who pays for tools and vendors?", a: "We do not resell. You pay software vendors directly, guaranteeing we have no perverse incentives." },
    ]
  },
  {
    id: "tools-data-safety",
    band: "band-default",
    eyebrow: "Tools, data, safety",
    display: "Tools, data, and the safety boundary.",
    lede: "Where the technology questions…",
    items: [
      { slug: "recommend-tools", q: "Do you recommend specific tools?", a: "Yes, but strictly relative to your established data boundaries and acceptable use policy." },
      { slug: "vendor-relationships", q: "Do you have a vendor relationship with ChatGPT, Claude, Copilot, or Gemini?", a: "No. We remain strictly agnostically independent." },
      { slug: "never-enter", q: "What data should never enter an AI tool?", a: "Unless you have a zero-retention enterprise agreement, PII, pastoral counseling notes, payroll data, and proprietary intellectual property must be locked out." },
      { slug: "real-harms", q: "What about the real harms — labor, environment, copyright, hallucination, bias?", a: "We confront these directly in the Safety Stage when we draft your theological and ethical rubrics." },
      { slug: "custom-assistants", q: "Do you build custom assistants?", a: "Yes, during the Solutions stage, but only after human oversight protocols are thoroughly defined and tested." },
      { slug: "who-owns", q: "Who owns what we produce together?", a: "You own all contextual policies and architectures we draft together." },
      { slug: "data-privacy", q: "What about data privacy and security?", a: "Data security is the literal purpose of starting our sequence with Safety." },
    ]
  },
  {
    id: "voices-evidence",
    band: "band-section",
    eyebrow: "Voices and evidence",
    display: "Voices, evidence, and credibility.",
    lede: "How to read the proof…",
    items: [
      { slug: "voices-vs-evidence", q: "What is the difference between Voices and Evidence?", a: <>Evidence explains the problem structure; Voices are the actual practitioners validating it. See <Link href="/evidence" className="text-primary hover:underline">Evidence</Link>.</> },
      { slug: "case-studies", q: "Where are your case studies?", a: <>They are embedded in the audience path pages. See <Link href="/churches" className="text-primary hover:underline">Churches</Link> for an example.</> },
      { slug: "no-logo-wall", q: "Why no logo wall?", a: "Because trust in this arena shouldn't rely on generic brand association. It depends on coherent structural integrity." },
      { slug: "who-is-voice", q: "Who counts as a \"voice\"?", a: "Active, missional practitioners who prioritize human formation over simple organizational scaling." },
      { slug: "talk-to-partner", q: "Can we talk to a current partner?", a: "Yes. Once an engagement scope is defined, we are happy to provide references." },
    ]
  },
  {
    id: "boundaries",
    band: "band-default",
    eyebrow: "Boundaries",
    display: "What we do not do.",
    lede: "The work has a shape…",
    items: [
      { slug: "start-software", q: "Do you start with software?", a: "Never. We start with policy and boundary setting." },
      { slug: "replace-judgment", q: "Do you replace human judgment with AI?", a: "Never. Our goal is to augment capacity while retaining human agency, particularly in all caring professions." },
      { slug: "efficiency-highest", q: "Do you treat efficiency as the highest goal?", a: "No. Mission integrity is the highest goal. High efficiency applied to the wrong mission produces disaster faster." },
      { slug: "referral-fees", q: "Do you take referral fees, sponsorships, or affiliate revenue from AI vendors?", a: "Emphatically no." },
      { slug: "walk-away", q: "Will you walk away from an engagement that is not a fit?", a: "Yes. We will decline work if we believe replacing a human function with automation would violate the organization's stated missional goals." },
    ]
  },
  {
    id: "after",
    band: "band-section",
    eyebrow: "After",
    display: "What happens after the engagement.",
    lede: "How the work continues…",
    items: [
      { slug: "walk-away-with", q: "What do we walk away with?", a: "Written policies, trained staff, safe sandboxes, and architectural alignment. You walk away with capacity." },
      { slug: "after-safety", q: "What happens after Safety?", a: <>You are free to safely experiment inside structured Sandboxes. Read the <Link href="/field-guide" className="text-primary hover:underline">Field Guide</Link>.</> },
      { slug: "ongoing-relationship", q: "Do we have an ongoing relationship with Movemental after the engagement?", a: "We offer retention/advisory availability for previous pathway clients to assist with subsequent vendor evaluations." },
      { slug: "team-changes", q: "What if our team changes mid-engagement or after?", a: "Because we have written the policies down, new team members can be seamlessly onboarded to the system." },
      { slug: "still-questions", q: "Where do we go if we still have questions?", a: <>Reach out through our <Link href="/contact" className="text-primary hover:underline">Contact page</Link>. We are here.</> },
    ]
  }
];

export function FaqPage() {
  useEffect(() => {
    document.title = "FAQ | Movemental";
  }, []);

  return (
    <div className="faq-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">FAQ</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              Honest answers to <em dangerouslySetInnerHTML={{__html: 'real questions.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              Clarity is the antidote to anxiety. Here are the questions we hear constantly from leaders sitting exactly where you are.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Talk With Us</Link>
              <Link href="/path" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Read the Path</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="toc">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="In this FAQ"
              display="Ten short groups."
              lede="Jump directly to the answers you need."
            />
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
              {FAQ_GROUPS.map((group, i) => (
                <a key={group.id} href={`#faq-${group.id}`} className="group block bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
                  <span className="text-secondary font-medium block mb-2">{String(i + 1).padStart(2, '0')}</span>
                  <strong className="text-foreground font-medium group-hover:text-primary transition-colors">{group.eyebrow}</strong>
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {FAQ_GROUPS.map((group) => (
        <section key={group.id} id={`faq-${group.id}`} className={group.band}>
          <Container width="narrow">
            <Reveal>
              <SectionHead 
                eyebrow={group.eyebrow}
                display={group.display}
                lede={group.lede}
              />
              <div className="mt-12 max-w-3xl border-t border-border/60">
                {group.items.map((item) => (
                  <AccordionItem 
                    key={item.slug} 
                    id={`faq-${group.id}--${item.slug}`} 
                    question={item.q} 
                    answer={item.a} 
                  />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      ))}

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <h2 className="display mb-8">
              If your question is not on this page
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Then it is exactly the <em dangerouslySetInnerHTML={{__html: 'call we want.'}} /> Talk to us to find clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Talk With Us</Link>
              <Link href="/start-with-safety" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Start with Safety</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
