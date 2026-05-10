/**
 * FAQ — comprehensive build per docs/build/prompts/faq-page-comprehensive-build.md.
 *
 * Ten groups, ~50+ questions. Alternating-band rhythm matches the rest of
 * sections-mock. Each item carries a stable slug for deep-linking
 * (e.g. /faq#faq-engagement--how-long-does-an-engagement-take).
 */

import Link from "next/link";
import type { ReactNode } from "react";

import { BtnPill, SectionHead } from "@/components/sections-mock/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  slug: string;
  q: string;
  a: ReactNode;
}

interface FaqGroup {
  id: string;
  num: string;
  band: "default" | "section";
  eyebrow: string;
  display: ReactNode;
  lede?: string;
  tocLabel: string;
  items: readonly FaqItem[];
}

const GROUPS: readonly FaqGroup[] = [
  {
    id: "getting-started",
    num: "01",
    band: "section",
    eyebrow: "Getting started",
    display: "Getting started.",
    lede: "What to do before you book a call — and what the first conversation actually looks like.",
    tocLabel: "Getting started",
    items: [
      {
        slug: "what-should-we-do-first",
        q: "What should we do first?",
        a: (
          <>
            Start with Safety. Most organizations need shared clarity — what
            AI is already in use, where the boundaries are, who is responsible
            — before any new tool, training, or system can hold.{" "}
            <Link href="/start-with-safety">See Start with Safety</Link>.
          </>
        ),
      },
      {
        slug: "do-we-need-technical-expertise",
        q: "Do we need technical expertise to begin?",
        a: "No. Movemental is a leadership process first. Your senior team needs to be willing to be in the room while AI changes how the mission gets done. The technical work comes later, on a foundation we help you build.",
      },
      {
        slug: "is-this-a-tool-or-a-process",
        q: "Is this a tool, a course, or a consulting engagement?",
        a: (
          <>
            It is a guided pathway. Engagements include facilitated work,
            written artifacts, and — when appropriate — solutions built on a
            human foundation. It is not software you buy.{" "}
            <Link href="/work-with-us">See Work With Us</Link>.
          </>
        ),
      },
      {
        slug: "what-does-the-first-call-look-like",
        q: "What does the first call look like?",
        a: (
          <>
            A focused thirty-minute conversation with our team. We ask about
            your context, current AI usage, what is in motion, and what the
            senior team is prepared to commit. By the end of the call, we will
            tell you whether the timing is right and what the first move would
            be. <Link href="/contact">Talk With Us</Link>.
          </>
        ),
      },
      {
        slug: "how-do-we-know-if-we-are-ready",
        q: "How do we know if we are ready?",
        a: "If staff are already using AI without a written boundary, you are ready. If senior leaders cannot answer “what is allowed and what is off-limits,” you are ready. The Safety Session exists for exactly this moment.",
      },
      {
        slug: "do-we-need-to-have-an-ai-strategy-already",
        q: "Do we need to have an AI strategy already?",
        a: (
          <>
            No. Most organizations we work with have <em>fragmentation</em>,
            not strategy — staff using tools privately, no shared standards,
            leadership reacting case by case. Naming that on the record is the
            first move of Safety, not a failure that needs hiding.
          </>
        ),
      },
    ],
  },
  {
    id: "the-path",
    num: "02",
    band: "default",
    eyebrow: "The Path",
    display: "The four stages, in order.",
    lede: "Safety, Sandbox, Skills, Solutions. Each stage builds on the one before it.",
    tocLabel: "The Path",
    items: [
      {
        slug: "what-is-the-path",
        q: "What is the Movemental Path?",
        a: (
          <>
            A four-stage path for adopting AI without losing trust,
            formation, or mission: <strong>Safety</strong> (boundaries first),{" "}
            <strong>Sandbox</strong> (guided exploration next),{" "}
            <strong>Skills</strong> (capability before systems),{" "}
            <strong>Solutions</strong> (tools built on a human foundation).{" "}
            <Link href="/path">See the full Path</Link>.
          </>
        ),
      },
      {
        slug: "why-this-order",
        q: "Why this order? Why not all four in parallel?",
        a: "The order is the work. Skipping Safety means deploying before you know what you are willing to defend. Skipping Sandbox means training judgment in production, on real people. Skipping Skills means importing someone else’s. Solutions deployed without the prior three stages are technical answers to questions the organization has not yet asked itself.",
      },
      {
        slug: "can-we-skip-stages",
        q: "Can we skip stages if we have already done some of this?",
        a: "In practice, every engagement starts where you are. If a Solution has already been deployed, we walk Safety in writing, run the Sandbox the deployment skipped, and form the Skills the deployment assumed. The Solution stays. What changes is whether the organization can defend it.",
      },
      {
        slug: "do-the-stages-overlap",
        q: "Do the stages overlap?",
        a: (
          <>
            Yes — early Sandbox can run while Safety is still being ratified.
            But the order in which work is <em>finished</em> matters: nothing
            leaves the Sandbox into production before Safety is named, and no
            Solutions ship before Skills are formed. The order of completion is
            load-bearing.
          </>
        ),
      },
      {
        slug: "what-does-safety-actually-cover",
        q: "What does Safety actually cover?",
        a: (
          <>
            Five areas: acceptable use, data boundaries, human oversight,
            voice and trust, and ethical/theological guardrails. The artifact
            is a written set of guidelines, a data-boundary map, and shared
            leadership alignment.{" "}
            <Link href="/start-with-safety">
              See what Safety includes
            </Link>
            .
          </>
        ),
      },
      {
        slug: "what-does-sandbox-mean-in-practice",
        q: "What does Sandbox mean in practice?",
        a: (
          <>
            Guided experimentation inside trusted limits. Real use cases,
            controlled scope, leadership-guided. The point is to develop
            judgment in cases that resemble the organization’s real work —
            without that work being put at risk.{" "}
            <Link href="/path">See the Path</Link>.
          </>
        ),
      },
      {
        slug: "what-do-skills-and-solutions-include",
        q: "What do Skills and Solutions include?",
        a: (
          <>
            <strong>Skills</strong>: shared language, role-specific training,
            judgment formation across the team.{" "}
            <strong>Solutions</strong>: workflow integration, custom
            assistants, organization-specific tools — built only after Safety,
            Sandbox, and Skills are in place.{" "}
            <Link href="/path">See the Path</Link>.
          </>
        ),
      },
    ],
  },
  {
    id: "approach",
    num: "03",
    band: "section",
    eyebrow: "Approach",
    display: (
      <>
        Approach and <em>philosophy.</em>
      </>
    ),
    tocLabel: "Approach",
    items: [
      {
        slug: "is-movemental-pro-or-anti-ai",
        q: "Is Movemental pro-AI or anti-AI?",
        a: (
          <>
            Neither, on purpose. We are pro <em>responsible adoption</em>.
            Organizations stuck on the for/against frame are usually stuck on
            Stage 1 — which is fine, that is where Safety lives — but the rest
            of the Sequence assumes you have already moved past the
            all-or-nothing posture.
          </>
        ),
      },
      {
        slug: "why-not-just-start-using-tools",
        q: "Why not just start using tools?",
        a: "Because unstructured adoption creates risk and fragmentation. Tools spread before standards exist, staff form habits in private, and the senior team learns by surprise. Order is what protects mission.",
      },
      {
        slug: "is-this-primarily-a-technology-problem",
        q: "Is this primarily a technology problem?",
        a: (
          <>
            No. AI changes how people think, how work is done, and how trust
            is formed. That makes it a leadership and formation challenge
            first, and a technology challenge second.{" "}
            <Link href="/about">More on the core belief</Link>.
          </>
        ),
      },
      {
        slug: "is-this-theological",
        q: "Is this theological?",
        a: (
          <>
            For churches, it includes theological reflection on formation,
            witness, and pastoral responsibility. For nonprofits and
            institutions, it is ethical and organizational — values, mission,
            governance, and care for the people the organization serves.{" "}
            <Link href="/churches">Churches</Link> ·{" "}
            <Link href="/nonprofits">Nonprofits</Link> ·{" "}
            <Link href="/institutions">Institutions</Link>.
          </>
        ),
      },
      {
        slug: "are-you-partisan",
        q: "Are you partisan — politically or ecclesially?",
        a: "No. The Sequence holds across the sector. The Voices page is curated to span streams and traditions; if you read it and see only one tribe, that is a curatorial mistake we want to hear about.",
      },
      {
        slug: "what-if-the-technology-changes",
        q: "What happens when the technology changes?",
        a: "It will. The Sequence is designed to be more durable than any single model or vendor — the artifacts (a posture, written boundaries, a Sandbox process, a formation curriculum) survive model upgrades. When the technology shifts, you re-walk the relevant stages with the new facts. You do not start over.",
      },
    ],
  },
  {
    id: "who-its-for",
    num: "04",
    band: "default",
    eyebrow: "Who it’s for",
    display: "Who Movemental serves.",
    lede: "Three implementation audiences. One Sequence. Different translations.",
    tocLabel: "Who it’s for",
    items: [
      {
        slug: "who-is-this-actually-for",
        q: "Who is this actually for?",
        a: (
          <>
            Churches, nonprofits, and institutions — organizations where AI
            decisions affect people, culture, formation, mission, and trust.{" "}
            <Link href="/churches">Churches</Link> ·{" "}
            <Link href="/nonprofits">Nonprofits</Link> ·{" "}
            <Link href="/institutions">Institutions</Link>.
          </>
        ),
      },
      {
        slug: "is-this-only-for-christian-organizations",
        q: "Is this only for Christian organizations?",
        a: "No. Of the three implementation audiences, only churches are Christian by default. The Sequence does not depend on a particular theology. It depends on having a mission worth protecting and a senior team willing to be in the room while AI changes how the mission gets done.",
      },
      {
        slug: "do-you-work-with-small-organizations",
        q: "Do you work with small organizations?",
        a: "Yes. Engagements scope to context. A small organization typically begins with a Safety Session and decides from there whether to continue. We will tell you in the first call if the work is too big for your current capacity — and recommend a smaller move if so.",
      },
      {
        slug: "what-about-denominations-and-judicatories",
        q: "What about denominations and judicatories?",
        a: "We have worked alongside leaders inside several streams; we do not represent any. If your denomination wants to translate the Sequence into its own polity, we are happy to be a resource and an editorial partner — not a vendor.",
      },
      {
        slug: "is-this-for-individual-leaders",
        q: "Is this for individual leaders or only organizations?",
        a: (
          <>
            Movemental is built for organizations. Individual leaders can read
            along — <Link href="/path">the Path</Link>,{" "}
            <Link href="/start-with-safety">Start with Safety</Link>, and{" "}
            <Link href="/voices">Voices</Link> are open — but engagements are
            built around senior teams that carry organizational responsibility.
          </>
        ),
      },
      {
        slug: "where-do-movement-leaders-fit",
        q: "Where do movement leaders fit?",
        a: (
          <>
            Movement leaders are an ecosystem layer, not a fourth audience
            peer. They are the trusted-voice surface (
            <Link href="/voices">Voices</Link>) — credible practitioners
            helping shape the conversation — not a parallel funnel.
            Organizations are the implementation audience; movement leaders
            are the people who sharpen the work in public.
          </>
        ),
      },
    ],
  },
  {
    id: "engagement",
    num: "05",
    band: "section",
    eyebrow: "Engagement",
    display: "Ways to engage.",
    lede: "One Sequence, three shapes — sized to where your organization actually is.",
    tocLabel: "Engagement",
    items: [
      {
        slug: "what-are-the-engagement-options",
        q: "What are the engagement options?",
        a: (
          <>
            Three shapes: a <strong>Safety Session</strong> for leaders who
            need a clear first step; a <strong>Guided Pathway</strong> for
            organizations ready to move through Safety, Sandbox, and Skills;
            and a <strong>Solutions Partnership</strong> for organizations
            ready to build on a human foundation.{" "}
            <Link href="/work-with-us">See the engagement options</Link>.
          </>
        ),
      },
      {
        slug: "what-is-the-engagement-model",
        q: "What is the engagement model?",
        a: (
          <>
            Listen → Clarify → Equip → Build. We start by understanding
            context, risks, and current AI use. We establish shared language,
            safety boundaries, and leadership alignment. We train your people.
            We build tools — last, on a human foundation.{" "}
            <Link href="/work-with-us">More on how we work</Link>.
          </>
        ),
      },
      {
        slug: "who-attends-from-our-side",
        q: "Who needs to attend from our side?",
        a: (
          <>
            At minimum a <strong>Senior Sponsor</strong> (CEO/ED), a{" "}
            <strong>Portfolio Owner</strong> (the leader who carries the work
            after handoff), and a <strong>Safety Owner</strong>{" "}
            (governance/ethics). For Sandbox and Skills work, add 3–4 staff
            from 2–3 departments. We will tell you in the first call if the
            roster you can field is enough for the engagement to hold.
          </>
        ),
      },
      {
        slug: "is-this-virtual-or-in-person",
        q: "Is this virtual or in-person?",
        a: "Most facilitated work is virtual on a regular cadence, with selective on-site sessions when the organization’s context calls for it. The artifacts and discipline are the same either way.",
      },
      {
        slug: "how-quickly-can-we-start",
        q: "How quickly can we start?",
        a: "A first conversation is usually within two weeks. A Safety Session can typically begin within four to six weeks of that call. Larger engagements take longer to scope and schedule, especially around board cycles.",
      },
      {
        slug: "can-we-pause-or-step-out",
        q: "Can we pause or step out mid-engagement?",
        a: "Yes. Engagements are scoped in stages, not a single contract. If a board change, leadership transition, or unexpected event makes it the right call to pause, we will say so before you do.",
      },
    ],
  },
  {
    id: "cost-time",
    num: "06",
    band: "default",
    eyebrow: "Cost & time",
    display: "Cost, time, and the boring questions.",
    lede: "Direct answers. No public price list yet.",
    tocLabel: "Cost & time",
    items: [
      {
        slug: "what-does-this-cost",
        q: "What does this cost?",
        a: "Engagements are scoped per organization. A Safety Session is the smallest entry point. A Guided Pathway is mid-tier. A Solutions Partnership runs higher. We do not publish a price list because the price tracks the scope, the team’s hours, and the depth of the human work involved.",
      },
      {
        slug: "can-you-give-a-budget-range",
        q: "Can you give a budget range?",
        a: "In the first call, yes. We will give you a good-faith range you can take to your board — and we will tell you directly if your timing or budget is not yet right for the work.",
      },
      {
        slug: "do-you-offer-reduced-rates",
        q: "Do you offer reduced rates for smaller organizations?",
        a: "Sometimes, on a case-by-case basis, when the reduced rate is honest about the smaller scope. We do not run a tiered discount program.",
      },
      {
        slug: "how-long-does-an-engagement-take",
        q: "How long does an engagement take?",
        a: "A Safety Session is short and focused. A facilitated Sandbox stage typically runs eight to twelve weeks. A full Sequence engagement runs four to nine months depending on board cadence, staff size, and how much human work was already in motion before we arrived. We will tell you, before you commit, if the timeline is too short for the work to hold.",
      },
      {
        slug: "will-this-slow-our-team-down",
        q: "Will this slow our team down?",
        a: "No. It prevents rework and confusion. Organizations that begin with clarity move faster six months in than those that started with tools. Order is what unlocks capacity without losing trust.",
      },
      {
        slug: "what-time-commitment-do-our-leaders-need",
        q: "What time commitment do our leaders need?",
        a: (
          <>
            The <strong>Senior Sponsor</strong> attends the bookend sessions
            and a midpoint review — small but non-delegable. The{" "}
            <strong>Portfolio Owner</strong> and <strong>Safety Owner</strong>{" "}
            attend every session. The <strong>Experiment Team</strong>{" "}
            carries 2–4 hours of session time per week, plus the work itself.
            We protect the boundary so it does not bleed into other roles.
          </>
        ),
      },
      {
        slug: "who-pays-for-tools-and-vendors",
        q: "Who pays for tools and vendors?",
        a: "You do, directly. Movemental does not resell, broker, or take referral fees from any AI vendor. If a Solution requires a specific tool, you procure it on your own terms.",
      },
    ],
  },
  {
    id: "tools-data-safety",
    num: "07",
    band: "section",
    eyebrow: "Tools, data, safety",
    display: "Tools, data, and the safety boundary.",
    lede: "Where the technology questions actually land.",
    tocLabel: "Tools, data, safety",
    items: [
      {
        slug: "do-you-recommend-specific-tools",
        q: "Do you recommend specific tools?",
        a: "Only after Safety and Skills are established. The Solutions stage may recommend specific tools — usually two or three options at the relevant tier — but only after the prior three stages have produced enough clarity that the recommendation can be defended in the room.",
      },
      {
        slug: "do-you-have-a-vendor-relationship",
        q: "Do you have a vendor relationship with ChatGPT, Claude, Copilot, or Gemini?",
        a: "No. We do not endorse, sell, resell, or take referral fees from any AI vendor. If a Solution needs a specific tool, we will name the tradeoffs honestly.",
      },
      {
        slug: "what-data-should-never-enter-an-ai-tool",
        q: "What data should never enter an AI tool?",
        a: (
          <>
            That is exactly what the Safety stage answers — concretely, in
            your context. Common defaults: confidential donor records,
            pastoral or counseling notes, student records, regulated financial
            workflows, anything covered by a confidentiality obligation. By
            the end of Safety, your organization has a written boundary the
            whole team can recognize.{" "}
            <Link href="/start-with-safety">See the Safety foundation</Link>.
          </>
        ),
      },
      {
        slug: "what-about-the-real-harms",
        q: "What about the real harms — labor, environment, copyright, hallucination, bias?",
        a: "Real, named, and load-bearing. The Safety stage turns these into specific organizational refusals — not abstract concerns. By the end of Safety, organizations typically have a written list of things they will not use AI for and a written list of things they will, with the harms they care about most named explicitly in both.",
      },
      {
        slug: "do-you-build-custom-assistants",
        q: "Do you build custom assistants?",
        a: (
          <>
            Yes — in the Solutions stage, on a human foundation. Custom
            assistants are scoped to your voice, constraints, and mission. We
            do not build them as a first move.{" "}
            <Link href="/path">See Solutions on the Path</Link>.
          </>
        ),
      },
      {
        slug: "who-owns-what-we-produce-together",
        q: "Who owns what we produce together?",
        a: "You do. The artifacts of an engagement — guidelines, governance documents, training materials, custom assistants — are owned by your organization. Movemental holds no equity in your IP.",
      },
      {
        slug: "what-about-data-privacy-and-security",
        q: "What about data privacy and security?",
        a: "We follow a principle of minimum necessary access and never paste your data into AI tools without an explicit Safety boundary covering it. NDAs and DPAs are routine. Specific compliance regimes (HIPAA, FERPA, etc.) are scoped on a per-engagement basis.",
      },
    ],
  },
  {
    id: "voices-evidence",
    num: "08",
    band: "default",
    eyebrow: "Voices and evidence",
    display: "Voices, evidence, and credibility.",
    lede: "How to read the proof on this site — and what we will not put on it.",
    tocLabel: "Voices and evidence",
    items: [
      {
        slug: "what-is-the-difference-between-voices-and-evidence",
        q: "What is the difference between Voices and Evidence?",
        a: (
          <>
            <strong>Voices</strong> is leaders joining the conversation —
            credible movement leaders, pastors, and practitioners helping
            shape the moment. <strong>Evidence</strong> is proof of the
            framework, the problem it answers, and the practice. Distinct
            surfaces, distinct jobs.{" "}
            <Link href="/voices">Voices</Link> ·{" "}
            <Link href="/evidence">Evidence</Link>.
          </>
        ),
      },
      {
        slug: "where-are-your-case-studies",
        q: "Where are your case studies?",
        a: (
          <>
            We do not currently publish named case studies. Most partners do
            not want their AI posture work narrated publicly while it is still
            in formation. We can share specific, anonymized stories on a call
            when the question is concrete.{" "}
            <Link href="/evidence">Read the practice snapshots</Link>.
          </>
        ),
      },
      {
        slug: "why-no-logo-wall",
        q: "Why no logo wall?",
        a: "Logos do nothing for the kind of trust this work depends on. The relevant question is not “who else uses this” but “do the people in your seat trust the people in our seat to read this honestly.” That is answered by named voices and written work — not by a logo wall.",
      },
      {
        slug: "who-are-the-voices",
        q: "Who counts as a “voice”?",
        a: (
          <>
            Leaders helping shape the conversation — not customers, sponsors,
            or product endorsers. The current circle is small and growing, and
            the curation is editorial, not promotional.{" "}
            <Link href="/voices">See the Voices page</Link>.
          </>
        ),
      },
      {
        slug: "can-we-talk-to-a-current-partner",
        q: "Can we talk to a current partner?",
        a: "On request, in the second or third call, and only after we have read whether the question is concrete enough to be useful for them. We do not ask partners to take cold reference calls.",
      },
    ],
  },
  {
    id: "boundaries",
    num: "09",
    band: "section",
    eyebrow: "Boundaries",
    display: (
      <>
        What we do <em>not</em> do.
      </>
    ),
    lede: "The work has a shape. Saying so on the record protects both sides.",
    tocLabel: "Boundaries",
    items: [
      {
        slug: "do-you-start-with-software",
        q: "Do you start with software?",
        a: (
          <>
            No. Tools come after Safety, Sandbox, and Skills.{" "}
            <Link href="/work-with-us">See our boundaries</Link>.
          </>
        ),
      },
      {
        slug: "do-you-replace-human-judgment",
        q: "Do you replace human judgment with AI?",
        a: "No. AI can support leadership; it cannot carry responsibility.",
      },
      {
        slug: "do-you-treat-efficiency-as-the-goal",
        q: "Do you treat efficiency as the highest goal?",
        a: "No. Efficiency matters, but it must serve formation, trust, and mission. The goal of an engagement is organizational clarity, not AI activity.",
      },
      {
        slug: "do-you-take-vendor-money",
        q: "Do you take referral fees, sponsorships, or affiliate revenue from AI vendors?",
        a: "No. Engagements are paid by the organizations we serve. If we recommend a tool inside an engagement, we do not get paid for the recommendation.",
      },
      {
        slug: "will-you-walk-away-from-an-engagement",
        q: "Will you walk away from an engagement that is not a fit?",
        a: "Yes — and we will tell you why. If the timing, posture, or capacity is not right for the work to hold, we will recommend a smaller move, a different timing, or a different organization. We try to leave no one worse off than they came in.",
      },
    ],
  },
  {
    id: "after",
    num: "10",
    band: "default",
    eyebrow: "After",
    display: "What happens after the engagement.",
    lede: "How the work continues — and how it does not.",
    tocLabel: "After",
    items: [
      {
        slug: "what-do-we-walk-away-with",
        q: "What do we walk away with?",
        a: (
          <>
            Practical artifacts: AI Use Guidelines, a Data Boundary Map,
            leadership alignment, a risk register, review standards, and a
            next-step roadmap. After larger engagements: a portfolio of
            validated use cases and a governance one-pager your board can read
            together. <Link href="/work-with-us">See outcomes</Link>.
          </>
        ),
      },
      {
        slug: "what-happens-after-safety",
        q: "What happens after Safety?",
        a: "We tell you whether your organization is ready for Sandbox, Skills, or further Safety work. Some organizations stop after Safety and run everything else internally. That is the design.",
      },
      {
        slug: "do-we-have-an-ongoing-relationship",
        q: "Do we have an ongoing relationship with Movemental after the engagement?",
        a: "Optionally. Quarterly portfolio refreshes are available for organizations that want a continuing cadence. We do not require ongoing retainers, and we do not extract recurring revenue from organizations that have done the work and are running it themselves.",
      },
      {
        slug: "what-if-our-team-changes",
        q: "What if our team changes mid-engagement or after?",
        a: "Leadership transitions are part of organizational life. The artifacts you produce are written so that a new leader can read them and pick up the work. If a transition happens during an engagement, we re-scope honestly with the new team.",
      },
      {
        slug: "where-do-we-go-if-we-still-have-questions",
        q: "Where do we go if we still have questions?",
        a: (
          <>
            Read <Link href="/path">the Path</Link>,{" "}
            <Link href="/voices">Voices</Link>, and{" "}
            <Link href="/evidence">Evidence</Link> — and then write us. Our
            most useful first calls start from a question we have not yet
            written down. <Link href="/contact">Talk With Us</Link>.
          </>
        ),
      },
    ],
  },
];

export function FaqContent() {
  return (
    <>
      <Hero />
      <Toc />
      {GROUPS.map((group) => (
        <FaqGroupBand key={group.id} group={group} />
      ))}
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section
      className="band-midnight hero hero--fold"
      aria-labelledby="faq-hero-h1"
    >
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h1 className="display" id="faq-hero-h1">
          Honest answers to <em>real questions.</em>
        </h1>
        <p className="lede lede--regular">
          The objections we hear most often, answered directly. If your
          question is not on this page, it is the call we want.
        </p>
        <div className="hero-actions">
          <BtnPill href="/contact" variant="primary">
            Talk With Us
          </BtnPill>
          <BtnPill href="/path" variant="ghost">
            Read the Path
          </BtnPill>
        </div>
      </div>
    </section>
  );
}

function Toc() {
  return (
    <section className="band-default" aria-labelledby="faq-toc-h2">
      <div className="container">
        <SectionHead
          eyebrow="In this FAQ"
          display="Ten short groups."
          displayId="faq-toc-h2"
          lede="The groups are ordered roughly the way questions arrive in a first call. Skip to whichever group matches what you are about to ask."
        />
        <ul className="fg-toc" aria-label="FAQ groups">
          {GROUPS.map((group) => (
            <li key={group.id}>
              <a href={`#faq-${group.id}`}>
                <span>{group.num}</span> {group.tocLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FaqGroupBand({ group }: { group: FaqGroup }) {
  const headingId = `faq-${group.id}-h2`;
  return (
    <section
      className={`band-${group.band}`}
      id={`faq-${group.id}`}
      aria-labelledby={headingId}
    >
      <div className="container">
        <SectionHead
          eyebrow={group.eyebrow}
          display={group.display}
          displayId={headingId}
          lede={group.lede}
        />
        <div className="mx-auto max-w-(--prose-max)">
          <Accordion
            type="single"
            collapsible
            className="border-t border-border"
          >
            {group.items.map((item) => {
              const itemId = `faq-${group.id}--${item.slug}`;
              return (
                <AccordionItem
                  key={item.slug}
                  id={itemId}
                  value={itemId}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-5 text-base font-medium text-foreground">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base text-muted-foreground">
                    <p>{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="faq-cta"
      aria-labelledby="faq-final-cta-h2"
    >
      <div className="container final-cta__inner">
        <p className="eyebrow">If your question is not on this page</p>
        <h2 className="display" id="faq-final-cta-h2">
          Then it is exactly the <em>call we want.</em>
        </h2>
        <p className="lede lede--regular">
          Our most useful first calls start from a question we have not yet
          written down. If you scrolled the whole page and did not find yours,
          that is a good sign — write us.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="/contact" variant="primary">
            Talk With Us
          </BtnPill>
          <BtnPill href="/start-with-safety" variant="ghost">
            Start with Safety
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
