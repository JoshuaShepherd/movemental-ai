/**
 * Agent Room — FAQ content (ported from `js/data/faq.js`).
 *
 * Ten groups of question/answer pairs, byte-identical to the prototype. The
 * `<details>` markup + jump links become React in AF-09; this is data only.
 */
export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqSection {
  /** Anchor id, used by the in-page jump links. */
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_SECTIONS: readonly FaqSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      { q: "What should we do first?", a: "Start with Safety. Reach out via our Contact page to schedule a diagnostic call." },
      { q: "Do we need technical expertise to begin?", a: "No. The Movemental Path begins with leadership alignment, not software engineering." },
      { q: "Is this a tool, a course, or a consulting engagement?", a: "It is consulting with a clear method behind it. See Ways to Engage on the Contact page." },
      { q: "What does the first call look like?", a: "Thirty minutes mapping your specific friction points without any sales pressure." },
      { q: "How do we know if we are ready?", a: "If your staff is already using ChatGPT implicitly, you are ready, because you are already exposed." },
      { q: "Do we need to have an AI strategy already?", a: "No. We help you build something that lasts rather than a strategy that falls apart under pressure." },
    ],
  },
  {
    id: "the-four-stages-in-order",
    title: "The four stages, in order",
    items: [
      { q: "What is the Movemental Path?", a: "Movemental’s public methodology, four stages in order: Safety, Sandbox, Training, Technology. Read the Path summary for the full arc." },
      { q: "Why this order? Why not all four in parallel?", a: "Attempting tech before safety opens you to data breaches. Changing the order collapses the required human formation." },
      { q: "Can we skip stages if we have already done some of this?", a: "We will audit any work you’ve done. If it holds up, we move forward. Most organizations discover gaps in their safety foundation." },
      { q: "Do the stages overlap?", a: "Yes, in time. But you cannot start the next stage until the one before it is actually done." },
      { q: "What does Safety actually cover?", a: "Acceptable use policies, data boundary definitions, and theological red lines: your AI Charter, ratified before anything else." },
      { q: "What does Sandbox mean in practice?", a: "Isolated environments where staff can securely learn prompts and limits without risking public trust or constituent data." },
      { q: "What do Training and Technology include?", a: "Training forms human judgment. Technology is building AI into your actual workflows, only after safety and skill are in place." },
    ],
  },
  {
    id: "approach-and-philosophy",
    title: "Approach and philosophy",
    items: [
      { q: "Is Movemental pro-AI or anti-AI?", a: "We are pro-mission. We treat AI as an inevitably disruptive change that must be stewarded deliberately rather than accepted universally." },
      { q: "Why not just start using tools?", a: "Because tools shape the people who use them. Untethered tool usage fractures organizational culture." },
      { q: "Is this primarily a technology problem?", a: "No. It is a leadership and formation challenge that looks like a technology problem." },
      { q: "Is this theological?", a: "Yes. Every tool has an embedded worldview. For faith-based organizations, this intersects directly with human dignity and pastoral care." },
      { q: "Are you partisan, politically or ecclesially?", a: "No. We serve orthodox churches across denominations and secular nonprofits united by serious missional constraints." },
      { q: "What happens when the technology changes?", a: "The technology will change weekly. Good policies govern data behavior and human oversight, remaining stable regardless of which LLM wins." },
    ],
  },
  {
    id: "who-movemental-serves",
    title: "Who Movemental serves",
    items: [
      { q: "Who is this actually for?", a: "Leaders responsible for people, mission, and outcomes." },
      { q: "Is this only for Christian organizations?", a: "We primarily serve churches and faith-based nonprofits, but the framework successfully protects any serious mission-driven organization." },
      { q: "Do you work with small organizations?", a: "Yes. Small organizations often need to implement safety the fastest because they lack large IT departments." },
      { q: "What about denominations and judicatories?", a: "Yes. We help networks build baseline policies that their constituent churches can individually adopt." },
      { q: "Is this for individual leaders or only organizations?", a: "The system is built for organizational adoption, though it begins with individual leader clarity." },
      { q: "Where do movement leaders fit?", a: "They are the relational glue guiding this transition. See the leaders on the home page and the Founders screen." },
    ],
  },
  {
    id: "ways-to-engage",
    title: "Ways to engage",
    items: [
      { q: "What are the engagement options?", a: "Safety Sessions, Guided Pathways, and Tech Partnerships. See Work with Us on the Contact page." },
      { q: "What is the engagement model?", a: "We partner intensively over a set timeline rather than selling ongoing software subscriptions." },
      { q: "Who needs to attend from our side?", a: "Senior leadership for the initial Safety Session; department heads for Sandbox and Training phases." },
      { q: "Is this virtual or in-person?", a: "Typically virtual, though we offer in-person executive retreats for large network adoptions." },
      { q: "How quickly can we start?", a: "Often within two weeks of our initial conversation." },
      { q: "Can we pause or step out mid-engagement?", a: "Yes. The sequence is modular. You can stop after safety is attained and wait until you are ready for step two." },
    ],
  },
  {
    id: "cost-time-and-the-boring-questions",
    title: "Cost, time, and the boring questions",
    items: [
      { q: "What does this cost?", a: "It scales to the size of the organization and the depth of the pathway chosen. Safety sessions are priced accessibly so no organization remains exposed." },
      { q: "Can you give a budget range?", a: "We provide specific ranges on our initial diagnostic call based on your organizational complexity. Every price is on the Pricing page." },
      { q: "Do you offer reduced rates for smaller organizations?", a: "Yes. We reserve capacity for sliding-scale interventions for high-impact, low-resource nonprofits." },
      { q: "How long does an engagement take?", a: "A Safety Session takes two weeks with us, or one to two months on your own. A Guided Pathway can run for three to six months." },
      { q: "Will this slow our team down?", a: "In the short term, yes. Wisdom is slower than recklessness. In the long term, it creates massive acceleration through clarity." },
      { q: "What time commitment do our leaders need?", a: "Four to six hours of focused synchronous time over the first month." },
      { q: "Who pays for tools and vendors?", a: "We do not resell. You pay software vendors directly, guaranteeing we have no perverse incentives." },
    ],
  },
  {
    id: "tools-data-and-the-safety-boundary",
    title: "Tools, data, and the safety boundary",
    items: [
      { q: "Do you recommend specific tools?", a: "Yes, but strictly relative to your established data boundaries and acceptable use policy." },
      { q: "Do you have a vendor relationship with ChatGPT, Claude, Copilot, or Gemini?", a: "No. We remain strictly agnostically independent." },
      { q: "What data should never enter an AI tool?", a: "Unless you have a zero-retention enterprise agreement, PII, pastoral counseling notes, payroll data, and proprietary intellectual property must be locked out." },
      { q: "Do you build custom assistants?", a: "Yes, during the Technology stage, but only after clear review rules are defined and tested." },
      { q: "Who owns what we produce together?", a: "You own all contextual policies and architectures we draft together." },
      { q: "What about data privacy and security?", a: "Data security is the literal purpose of starting our sequence with Safety." },
    ],
  },
  {
    id: "voices-evidence-and-credibility",
    title: "Voices, evidence, and credibility",
    items: [
      { q: "What is the difference between Voices and Evidence?", a: "Evidence explains the problem structure; Voices are the practitioners validating it, the movement leaders behind the path." },
      { q: "Where are your case studies?", a: "Named case studies are in development. In the meantime: the field guides (what we teach), the movement leaders directory (who stand alongside this work), and the founders’ longer arc on About. Specific named clients come once we have permission to publish them, not before." },
      { q: "Why doesn’t your site have a logo wall?", a: "We do not show client logos without explicit permission, and the kind of trust this work requires is not transferred by brand association. The proof is whether the work actually holds up." },
      { q: 'Who counts as a "voice"?', a: "Active, missional practitioners who prioritize human formation over simple organizational scaling." },
      { q: "Can we talk to a current partner?", a: "Yes. Once an engagement scope is defined, we are happy to provide references." },
    ],
  },
  {
    id: "what-we-will-not-do",
    title: "What we will not do",
    items: [
      { q: "Do you start with software?", a: "No. Safety comes first, governance and policy before deployment. We do not sell tools or begin with a build." },
      { q: "Do you replace human judgment with AI?", a: "No. AI assists; humans decide. Formation and oversight protocols are built before any custom assistant ships." },
      { q: "Do you treat efficiency as the highest goal?", a: "No. Wisdom is slower than recklessness. Clarity and alignment create long-term acceleration; shortcuts fracture culture." },
      { q: "Do you take referral fees, sponsorships, or affiliate revenue from AI vendors?", a: "No. You pay vendors directly. We remain vendor-agnostic with no hidden incentives." },
      { q: "Will you walk away from an engagement that is not a fit?", a: "Yes. If we are not the right partner, we will say so plainly rather than take work we cannot stand behind." },
    ],
  },
  {
    id: "what-happens-after-the-engagement",
    title: "What happens after the engagement",
    items: [
      { q: "What do we walk away with?", a: "Written policies, trained staff, safe sandboxes, and clear alignment across the organization. You walk away with capacity." },
      { q: "What happens after Safety?", a: "You are free to safely experiment inside structured Sandboxes, once your AI Charter is ratified." },
      { q: "Do we have an ongoing relationship with Movemental after the engagement?", a: "We offer retention and advisory availability for previous pathway clients to assist with subsequent vendor evaluations." },
      { q: "What if our team changes mid-engagement or after?", a: "Because we have written the policies down, new team members can be onboarded to the system seamlessly." },
      { q: "Where do we go if we still have questions?", a: "Use the contact form on our Contact page. We answer every message personally." },
    ],
  },
];
