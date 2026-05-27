/**
 * FAQ content for Movemental.
 * Categories: fit, philosophy, ownership, economics, time/embodiment, AI, infrastructure, credibility, process, exit.
 * Tone: calm, transparent, non-marketing.
 */

export interface FaqItem {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}

export const FAQ_CATEGORIES = [
  "Fit & audience",
  "Philosophy & framing",
  "Ownership & intellectual property",
  "Economics & alignment",
  "Time & embodiment",
  "AI & technology",
  "Infrastructure & platform",
  "Credibility network",
  "Process & onboarding",
  "Exit & long-term commitment",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export const FAQ_ITEMS: { category: FaqCategory; items: FaqItem[] }[] = [
  {
    category: "Fit & audience",
    items: [
      {
        question: "Who is this for?",
        answer:
          "Movemental is for credible movement leaders: authors, teachers, and practitioners who catalyze lasting change through incarnational theology and movement practice. We serve people who already have a body of work and an audience, and who want that work structured for discoverability and longevity rather than scattered across silos. The Self-Screen (Fit Check) helps you determine fit before you invest time in the rest of the journey.",
      },
      {
        question: "Who is it not for?",
        answer:
          "It is not for people who want a generic content platform, a growth-hack funnel, or a replacement for embodied leadership. It is not for those who prefer to rent someone else's platform or who are not aligned with a shared credibility network. The Self-Screen surfaces misalignment early so both sides can redirect without wasted effort.",
      },
      {
        question: "What qualifies someone as a movement leader?",
        answer:
          "We look for alignment with missional and incarnational theology, movement-oriented practice, and a demonstrated body of work (books, talks, courses, or consistent teaching). Audience size and engagement matter less than credibility in your domain and a willingness to participate in a network of verified humans. The Fit Check assesses movement alignment, content quality, and platform-ownership mindset.",
      },
      {
        question: "What if I am early-stage?",
        answer:
          "Early-stage leaders with a clear movement alignment and a growing body of work may still be a fit. The bar is not celebrity; it is credibility and trajectory. If you have a small but real audience and content that reflects your calling, the Self-Screen and a conversation can clarify whether now is the right time or whether to revisit later.",
      },
      {
        question: "What if I already have a publisher?",
        answer:
          "Movemental is not a substitute for a traditional publisher. It is infrastructure for your digital presence: your platform, your discoverability, your connection to a credibility network. Many authors keep publishing with houses for certain works while using Movemental to structure and amplify their broader corpus and to own their audience and revenue.",
      },
      {
        question: "What if I don't create books but create talks or courses?",
        answer:
          "The platform supports books, articles, courses, videos, and other content types. The focus is on structuring what you already have and making it discoverable. If your primary output is talks or courses rather than long-form print, the same logic applies: codification, structure, and network alignment matter more than format.",
      },
      {
        question: "What if I don't want to scale?",
        answer:
          "Movemental is not a scaling engine. It is built for stewardship and longevity, not virality. You are not required to grow an audience or monetize aggressively. The model supports leaders who want their existing work to do more without turning them into full-time content producers. If you don't want to scale, that is consistent with the offer.",
      },
    ],
  },
  {
    category: "Philosophy & framing",
    items: [
      {
        question: "Why call this a commons?",
        answer:
          "The commons is shared infrastructure that no single participant owns but everyone benefits from. Movemental provides shared digital architecture, a credibility network, and aligned economics. You own your content and your audience; the infrastructure, optimization, and network are held in common. The language signals that this is not a marketplace or a rental platform but a shared resource for movement leaders.",
      },
      {
        question: "Why focus on infrastructure?",
        answer:
          "Discovery and credibility in the age of AI depend on structure. Scattered content cannot be found, linked, or trusted. Infrastructure—canonical structuring, codification, discoverability, and network alignment—is what makes your work findable and durable. We focus on infrastructure so you can focus on what only you can do: teach, write, and lead.",
      },
      {
        question: "Why not just 'do SEO'?",
        answer:
          "SEO alone does not solve the credibility crisis. Volume and polish no longer signal expertise; AI can produce both at scale. Movement leaders were right to be skeptical of spending years on algorithmic gaming. The shift is that structure plus network credibility creates signals that are harder to fake. Discoverability is a byproduct of that structure and those relationships, not a substitute for them.",
      },
      {
        question: "Is this about growth or stewardship?",
        answer:
          "Stewardship. The goal is to steward credible work in an environment that increasingly mediates discovery. Growth may follow, but we do not promise virality or guaranteed traffic. Success is defined as your work being findable and durable, and your primary calling—embodied leadership—remaining central.",
      },
      {
        question: "How does this relate to embodiment?",
        answer:
          "Movemental exists to support embodied work, not replace it. Formation, community, and movement happen in the room. The digital layer exists to extend reach and preserve credibility so that what you do in person can be discovered and trusted by those who are not in the room. The time boundary (no more than two hours per week) is designed to keep the digital in service of the embodied.",
      },
      {
        question: "Is this a theological position?",
        answer:
          "The team holds a missional and incarnational theology; the platform is built for movement leaders who share that general orientation. We do not police doctrine. We do curate for credibility and alignment with movement practice. The credibility network is relational and curatorial, not confessional in a narrow sense.",
      },
      {
        question: "Why hold the tool/threat tension around AI?",
        answer:
          "AI amplifies both credibility and confusion. It can help your work reach more people and stay coherent; it can also flood the world with content that is hard to verify. We hold the tension by using AI to amplify what is real (structure, translation, discoverability) and by being explicit about what we do not do: replace your voice, auto-generate content as if it were yours, or promise that AI will not change. The posture is liminal and honest, not triumphalist.",
      },
    ],
  },
  {
    category: "Ownership & intellectual property",
    items: [
      {
        question: "Who owns my content?",
        answer:
          "You do. All original intellectual property—text, audio, video, courses, assessments—remains yours. Movemental operates the platform under a non-exclusive license to host and display your content. We never take ownership or exclusive rights. You can reuse your content elsewhere subject to reasonable transition rules if you leave.",
      },
      {
        question: "Can I leave?",
        answer:
          "Yes. You can leave. Your content is yours. We offer content export (e.g. markdown or HTML), a redirect grace period so your audience is not cut off, and optional paid transition support. You do not receive the codebase, agent systems, or platform infrastructure—those stay with Movemental because this is a managed platform, not software you purchase. Exit is designed to be humane.",
      },
      {
        question: "What happens if I leave?",
        answer:
          "You retain ownership of all content you created and may reuse it elsewhere. We provide content export and a redirect period (typically 3–6 months). You do not receive the platform code, AI systems, or multi-tenant architecture; that is the nature of a managed partnership. Revenue share stops when you stop using the platform for new transactions. There is no lock-in on your intellectual property.",
      },
      {
        question: "Can I publish elsewhere?",
        answer:
          "Yes. You own your content. Non-exclusive means you can publish the same work elsewhere, subject to any existing agreements (e.g. with a traditional publisher for a specific book). Movemental does not demand exclusivity.",
      },
      {
        question: "What happens to translations?",
        answer:
          "Translations of your work are derivative works. Ownership and licensing depend on how they are produced (by you, by Movemental tools, or by third parties) and are addressed in the agreement. The principle is that your voice and your original IP remain yours; translation support is part of making your work discoverable and usable, not a transfer of rights.",
      },
      {
        question: "What about derivative works?",
        answer:
          "Derivative works (adaptations, summaries, translations) are addressed in the participation agreement. The default is that you retain ownership of your originals and that derivatives created through the platform are governed by clear terms. We do not claim ownership of your ideas or your voice.",
      },
      {
        question: "How is my voice protected?",
        answer:
          "Your voice is yours. AI integration is designed to amplify and reflect your voice, not replace it. We do not auto-publish content as if it were yours without your approval. Voice capture and style preferences are used to support you, not to simulate you. The credibility network also protects voice: your work is attached to you and to the people who vouch for you.",
      },
    ],
  },
  {
    category: "Economics & alignment",
    items: [
      {
        question: "Why the upfront commitment?",
        answer:
          "The upfront amount funds onboarding, architecture configuration, and initial corpus structuring. It reflects commitment to shared infrastructure and covers work that would otherwise require high-cost custom consulting. It is priced so that credible movement leaders can enter without prohibitive capital. The amount may be adjusted over time as the commons grows; there is no artificial scarcity.",
      },
      {
        question: "Why 90/10?",
        answer:
          "Alignment. Movemental succeeds only when creators succeed. A revenue share keeps incentives aligned: we earn when your content moves. Ten percent funds platform operation, evolution, and network stewardship. Ninety percent stays with you. The split is transparent and automatic at the moment of each transaction. We do not make money unless you do.",
      },
      {
        question: "What happens if I don't generate revenue?",
        answer:
          "The revenue share applies only when you earn. If you are building audience and not monetizing yet, you pay nothing beyond the upfront commitment. There are no monthly platform fees. We are invested in long-term success, not in pressuring you to monetize before you are ready.",
      },
      {
        question: "Is there pressure to monetize?",
        answer:
          "No. The model aligns us with your success, but we do not require you to monetize. Some participants use the platform primarily for discoverability and credibility; revenue may follow later or not at all. There are no hidden costs or recurring fees if you are not earning.",
      },
      {
        question: "What is Movemental incentivized to do?",
        answer:
          "We are incentivized to help your content circulate, stay discoverable, and earn when you choose to monetize. We are not incentivized to extract maximum fees, lock you in, or push you toward volume over quality. The 10% revenue share means we benefit from your success, not from your dependency.",
      },
      {
        question: "How does sustainability work?",
        answer:
          "Sustainability comes from the combination of upfront commitment and revenue share, plus a curated network size that keeps quality high. We bet on long-term partnership and network effects: when the commons grows and creators succeed, the model sustains itself. We do not rely on advertising, data sale, or aggressive scaling.",
      },
      {
        question: "Are there hidden costs?",
        answer:
          "No. The model is the upfront infrastructure commitment and 10% of content revenue. There are no monthly platform fees, no per-transaction charges on top of the revenue share, and no surprise fees. Payment processing (e.g. Stripe) has its own small fees; those are visible and standard. Custom work outside the standard build may be quoted separately; that is the only exception.",
      },
    ],
  },
  {
    category: "Time & embodiment",
    items: [
      {
        question: "How much time does this require?",
        answer:
          "The architecture is designed for no more than two hours per week. Your primary calling remains embodied. Movemental supports your work; it does not consume it. Infrastructure carries the technical load so you can focus on teaching, writing, and leading.",
      },
      {
        question: "What if I don't want to become a content machine?",
        answer:
          "You don't have to. The goal is to structure what you already have and make it discoverable, not to turn you into a full-time content producer. We do not require a publishing cadence or a content treadmill. Many participants have existing corpuses; the work is codification and connection, not constant creation.",
      },
      {
        question: "How does this avoid replacing embodied work?",
        answer:
          "By design. The digital layer exists to support the physical: reach, discoverability, and credibility so that what you do in the room can be found and trusted. We do not promise that digital presence replaces presence. Formation and community cannot be automated. The time boundary and the framing of infrastructure (not replacement) keep embodiment central.",
      },
      {
        question: "What are expectations of participation?",
        answer:
          "Participation means maintaining your presence on the platform, keeping content and profile reasonably current, and adhering to the quality and conduct expectations of the network. It does not mean a fixed number of posts per month or mandatory engagement. The expectation is stewardship of your corner of the commons, not performance metrics.",
      },
      {
        question: "Is there community obligation?",
        answer:
          "The network is a shared credibility commons. There is no formal obligation to promote others or to participate in group activities. The value of the network is that your work is discoverable through trusted peers and that the whole benefits from coherence. How you engage beyond that is up to you.",
      },
      {
        question: "What if I'm already overwhelmed?",
        answer:
          "The two-hour boundary exists for people who are already carrying a lot. If you are overwhelmed, the question is whether adding structure to existing work (rather than creating net-new work) reduces or increases load. For many, it reduces it: once the corpus is structured, discoverability and updates can stay within the boundary. The Self-Screen and a conversation can help you decide.",
      },
    ],
  },
  {
    category: "AI & technology",
    items: [
      {
        question: "How is AI used?",
        answer:
          "AI is used for structure, discoverability, translation, and assistance—not to replace your voice or to publish as you. It can help codify your corpus, optimize for search and network discovery, support writing and repurposing in your voice, and translate or adapt content. Use is guided by voice preservation and transparency. We do not hide where AI is involved.",
      },
      {
        question: "Is my voice replaced?",
        answer:
          "No. Your voice remains yours. AI is trained or configured to reflect your style and theology, not to simulate you for unattributed output. We do not auto-publish content as if it were yours without your approval. The aim is amplification and assistance, not replacement.",
      },
      {
        question: "Is content auto-generated?",
        answer:
          "No. Content on your platform is yours: written, approved, or clearly attributed. AI may assist with drafts, summaries, or adaptations, but we do not fill your site with machine-generated content that passes as yours. The credibility of the network depends on real humans standing behind real work.",
      },
      {
        question: "What about hallucination risk?",
        answer:
          "AI can hallucinate or misattribute. We take that seriously. Outputs are meant to be reviewed; we do not treat AI as an autonomous author. Where AI is used for discovery, translation, or assistance, we aim for transparency and human oversight. The tension is acknowledged, not papered over.",
      },
      {
        question: "How is data handled?",
        answer:
          "Your content and audience data are scoped to your organization and are not shared with other tenants for marketing or training without agreement. Data handling is described in our Privacy Policy. We do not sell your data or use it for advertising. AI systems may use your content for your own experience (e.g. voice matching) under the terms you agree to.",
      },
      {
        question: "What happens if AI changes?",
        answer:
          "AI will change. We do not promise a fixed technical stack forever. We do promise that the posture—amplify what is real, don't fake what isn't, preserve voice and credibility—will guide how we adopt new tools. If a provider or model changes, we adapt in line with that posture.",
      },
      {
        question: "Is this dependent on one provider?",
        answer:
          "We use specific providers for AI and infrastructure today. We are not locked to a single vendor for all time; we can evolve providers and models. The dependency that matters is the partnership with Movemental and the shared infrastructure, not a particular AI API.",
      },
    ],
  },
  {
    category: "Infrastructure & platform",
    items: [
      {
        question: "What is multi-tenant architecture?",
        answer:
          "Multi-tenant means one shared platform serves many organizations. Each organization's data and content are strictly isolated; you do not see another leader's content or audience. The infrastructure—codebase, deployment, AI systems, design system—is shared so that we can maintain quality, security, and evolution for everyone without each person running their own stack.",
      },
      {
        question: "How is this different from hiring a developer?",
        answer:
          "Hiring a developer typically gets you a one-off build and ongoing maintenance on you. Movemental gives you a place inside a shared infrastructure: you get a bespoke front-end and your own data, but the platform evolves for the whole network. You get network effects, credibility alignment, and ongoing evolution without owning the entire technical burden.",
      },
      {
        question: "How is discoverability handled?",
        answer:
          "Discoverability comes from structure (canonical content, clear taxonomy, internal linking), technical optimization (e.g. for search), and the credibility network (your work is discoverable through the people who already trust you). We do not promise guaranteed rankings or traffic. We do work so that your work can be found by humans and systems that are looking for it.",
      },
      {
        question: "What about search engines?",
        answer:
          "The platform is built to be crawlable and indexable. Structure and metadata support search. We do not rely on tricks or black-hat tactics. Search is one channel; the credibility network is another. Both matter for discovery.",
      },
      {
        question: "What about translation?",
        answer:
          "Translation support is part of the offering: making your work available in other languages while preserving voice and meaning. How translation is produced (AI-assisted, human-reviewed, etc.) and who owns or licenses translations is covered in the agreement and in our approach to derivative works.",
      },
      {
        question: "What happens as the platform evolves?",
        answer:
          "The platform will evolve. We add capabilities, improve performance, and respond to the needs of the commons. You benefit from that evolution. Constraints (e.g. design system, shared patterns) keep the network coherent. We do not promise that every feature will never change; we do promise that evolution is in service of the mission and the participants.",
      },
      {
        question: "Is there lock-in?",
        answer:
          "Your content and audience are not locked in. You can export content and leave. The platform code, agent systems, and infrastructure stay with Movemental because this is a managed partnership, not a product you take with you. So there is lock-in to the partnership and the ecosystem, but not to your intellectual property or your ability to leave with your work.",
      },
    ],
  },
  {
    category: "Credibility network",
    items: [
      {
        question: "How is credibility curated?",
        answer:
          "Participation is curated. We assess fit through the Self-Screen and through conversation. The network is not open signup. We look for movement alignment, a body of work, and willingness to participate in shared infrastructure and norms. Curation keeps the network coherent and the credibility signal meaningful.",
      },
      {
        question: "Who decides who participates?",
        answer:
          "Movemental decides, in line with fit criteria and capacity. The decision is not algorithmic; it involves human judgment and sometimes conversation. We are transparent about what we look for and why. We do not publish a public formula because fit is relational and contextual.",
      },
      {
        question: "Is there gatekeeping?",
        answer:
          "There is selection. Not everyone is a fit; the Self-Screen and our process filter for alignment. We call it curation rather than gatekeeping: the goal is to build a network of verified humans who strengthen each other's credibility, not to exclude arbitrarily. We would rather say no clearly than create misaligned expectations.",
      },
      {
        question: "What if I disagree with others in the network?",
        answer:
          "Participation does not require agreement on every point. The network is united by movement orientation and shared infrastructure, not by a single line on every doctrine or strategy. You are not endorsing every other participant's views. You are sharing infrastructure and a credibility signal. Disagreement can coexist with that.",
      },
      {
        question: "Is this denominational?",
        answer:
          "No. We serve movement leaders from a range of traditions and contexts. The alignment is with missional and incarnational theology and movement practice in a broad sense, not with a particular denomination or confession. The network is ecumenical in that way.",
      },
      {
        question: "How public is participation?",
        answer:
          "Your presence on the platform is public: your site, your content, your place in the network. Your participation in the commons (e.g. that you are part of Movemental) is visible. We do not hide who is in the network; the credibility signal depends on it being knowable.",
      },
      {
        question: "How is trust maintained?",
        answer:
          "Trust is maintained through transparency (what we do and don't do), through the quality of the network (curation), and through aligned incentives (we succeed when you succeed). We do not sell your data, lock you in to your IP, or promise what we can't deliver. The agreement and our behavior are meant to be consistent with that.",
      },
    ],
  },
  {
    category: "Process & onboarding",
    items: [
      {
        question: "What happens after I click 'I've Decided'?",
        answer:
          "You are taken to the structured offer page, where you can review what you are agreeing to. From there you can accept and continue (e.g. to checkout or proposal) or go to the discernment companion if you still have questions. After acceptance, we schedule a kickoff conversation and begin onboarding.",
      },
      {
        question: "What is onboarding like?",
        answer:
          "Onboarding includes discovery and vision, content research, platform architecture, and network integration. You work with the team to structure your corpus, configure your presence, and connect to the commons. Timeline is typically a few weeks from kickoff to launch. The focus is on your movement and your content, not on technical training for its own sake.",
      },
      {
        question: "What materials do I need?",
        answer:
          "You need a sense of your existing body of work (books, talks, articles, courses) and access to it in some form. You don't need everything perfectly organized in advance. We help with content audit and structuring. A short questionnaire and a kickoff call set the direction.",
      },
      {
        question: "How long does setup take?",
        answer:
          "From contract to launch, typically a few weeks. The exact timeline depends on the size of your corpus and your availability. We will give you a clearer estimate during the kickoff conversation.",
      },
      {
        question: "What if I don't have clean archives?",
        answer:
          "Many movement leaders don't. Content may be in PDFs, old blogs, video, or notes. We work with what you have. The process includes identifying and importing what matters and structuring it. You don't need a pristine archive to start.",
      },
      {
        question: "What support is provided?",
        answer:
          "Support includes onboarding, platform configuration, and ongoing access to the team for questions and evolution. The scope is defined in the agreement. We are not a 24/7 help desk; we are a partnership. For billing, legal, and account issues, there are clear channels (e.g. Billing in settings, contact form, Terms and Privacy).",
      },
    ],
  },
  {
    category: "Exit & long-term commitment",
    items: [
      {
        question: "Can I leave?",
        answer:
          "Yes. You can leave. Your content is yours. We provide content export and a redirect period. You do not receive the platform code or systems. There is no punitive exit; we offer humane paths because we are confident in the partnership value.",
      },
      {
        question: "What happens to my structured site if I leave?",
        answer:
          "Your content is exported so you can take it elsewhere. The live site on our infrastructure is eventually retired after the redirect period. You do not get a copy of the running platform; you get your content and the chance to rebuild elsewhere if you choose.",
      },
      {
        question: "What about ongoing revenue after I leave?",
        answer:
          "Revenue share applies to transactions that occur while you are on the platform. After you leave, new revenue through Movemental stops. Historical payouts are yours. Any revenue you generate on another platform is entirely yours.",
      },
      {
        question: "What happens if Movemental ceases to exist?",
        answer:
          "Your content is yours. We would provide content export and reasonable transition support. We are building for long-term sustainability; the model aligns us with your success over time. We do not have a plan for shutdown, but we do have a commitment to orderly transition if that ever changed.",
      },
      {
        question: "Is there a minimum term?",
        answer:
          "Terms (including any minimum commitment) are set out in the agreement. We do not use long minimum terms as a lock-in tactic. The partnership is intended to be long-term because the value is in the relationship and the network, not in a contract length.",
      },
      {
        question: "Can I pause participation?",
        answer:
          "Pausing is addressed in the agreement. In principle, we would rather find a way to accommodate a season of reduced participation than force an all-or-nothing exit. The details (e.g. what happens to your site, revenue share, and reinstatement) depend on the situation and the terms.",
      },
    ],
  },
];

export const FAQ_ITEMS_FLAT: FaqItem[] = FAQ_ITEMS.flatMap((c) => c.items);
