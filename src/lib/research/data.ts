/**
 * Research library — structured metadata for the `/research` EEAT flow.
 *
 * Index rows, findings panels, and master sources are sourced from
 * `docs/articles/graded-high/85-99/` (ai-research-archive, movemental-research-corpus-v1,
 * authoritative-sources). Article *bodies* live in `src/components/research/article-bodies.tsx`.
 *
 * Citation index: stable `[n]` across all papers — `<Cite n={} />` in article-bodies must
 * match `MASTER_SOURCES[n].index`. Paper-specific rails use subsets of this registry.
 *
 * Stat conflation guardrails — do NOT merge these headline pairs:
 * - MIT NANDA 95% = pilot ROI failure (GenAI Divide), NOT jagged-frontier productivity
 * - BCG 5% future-built ≠ McKinsey 6% high performers ≠ Virtuous 7% major gains
 * - Barna/Pushpay 60% monthly use ≠ Lifeway 42% ministry use (different questions)
 *
 * Corpus maintenance: re-verify stats every six months; next pass November 2026.
 * Confidence tags (VERIFIED / QUALIFIED / NEW / DROP): docs/build/notes/corpus-confidence-tags.md
 */

export type ResearchKind = "Paper" | "Analysis" | "Thesis";

/** A cited source — used both in a paper's sidebar and the master sources page. */
export interface ResearchSource {
  /** Display index, e.g. 1 → "[1]". */
  index: number;
  title: string;
  /** Provenance line, e.g. "Barna / Pushpay · 2026". */
  meta: string;
  url?: string;
  /** Cited elsewhere but not load-bearing for this piece — rendered dimmed. */
  dim?: boolean;
  /** Pull-quote revealed in the master sources list when the row is active. */
  callout?: string;
}

/** A table-of-contents entry; `id` must match a section anchor in the body. */
export interface ResearchSection {
  id: string;
  label: string;
}

export interface ResearchItem {
  slug: string;
  kind: ResearchKind;
  year?: number;
  /** The lead paper — gets the accent bar + "Flagship" tag in the index. */
  flagship?: boolean;
  /** Second-tier prominence below flagship (discernment / stewardship papers). */
  featured?: boolean;
  /** Marginal annotation, e.g. "*Core curriculum material." */
  thesisNote?: string;
  title: string;
  /** Abstract for the index. `{hl}` … `{/hl}` marks the highlighter swipe. */
  abstract: string;
  readMin: number;
  sourceCount: number;
  /** Italic deck shown under the title on the article page. */
  subtitle?: string;
  /** TOC sections for the reader rail (flagship only in the mockups). */
  sections?: ResearchSection[];
  /** Sources shown in the article's right rail. */
  sources?: ResearchSource[];
  /** True when a full read exists in the body registry. */
  hasFullBody?: boolean;
}

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    slug: "ai-credibility-crisis",
    kind: "Analysis",
    year: 2026,
    flagship: true,
    title: "The AI Credibility Crisis",
    abstract:
      "What the evidence actually supports about AI-generated fluency, broken statistics, and the {hl}self-efficacy gap{/hl} ordinary readers face.",
    readMin: 9,
    sourceCount: 12,
    subtitle:
      "A cool-headed stress test of headline statistics and narrative claims — scoped, sourced, and honest about limits.",
    sections: [
      { id: "section-summary", label: "Executive summary" },
      { id: "section-sixty-eight", label: 'The "68%" statistic' },
      { id: "section-prevalence", label: "AI content prevalence" },
      { id: "section-detection", label: "Can people detect AI?" },
      { id: "section-collapse", label: "Credibility collapse" },
      { id: "section-evidence", label: "What the evidence supports" },
      { id: "section-counter", label: "Counterarguments" },
      { id: "section-verification", label: "Verification systems" },
      { id: "section-constructive", label: "Constructive thesis" },
      { id: "section-closing", label: "Closing note" },
    ],
    sources: [
      {
        index: 10,
        title: "Pew Research Center — Artificial Intelligence",
        meta: "Pew · 2025 · n=5,023",
        url: "https://www.pewresearch.org/topic/science/science-issues/artificial-intelligence/",
      },
      {
        index: 18,
        title: "Edelman Trust Barometer 2025 — AI flash poll",
        meta: "Edelman · 2025",
        url: "https://www.edelman.com/trust/2025/trust-barometer/flash-poll-trust-artifical-intelligence",
      },
      {
        index: 8,
        title: "Stanford HAI — AI Index 2026",
        meta: "Stanford HAI · 2026",
        url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/",
        dim: true,
      },
    ],
    hasFullBody: true,
  },
  {
    slug: "finding-ai-guidance-worth-trusting",
    kind: "Paper",
    year: 2026,
    featured: true,
    title: "Finding AI Guidance Worth Trusting",
    abstract:
      "A discernment guide for mission-driven leaders — expert vs guide, the network test, and whose judgment will {hl}shape your staff's judgment{/hl}.",
    readMin: 14,
    sourceCount: 4,
    subtitle:
      "A discernment guide for mission-driven organizations choosing help in a moment no one has mastered yet.",
    sections: [
      { id: "section-summary", label: "Executive summary" },
      { id: "section-real-question", label: "The real question" },
      { id: "section-early", label: "We are early" },
      { id: "section-consulting", label: "Consulting logic" },
      { id: "section-expert-guide", label: "Expert vs guide" },
      { id: "section-look-for", label: "What to look for" },
      { id: "section-network", label: "Network test" },
      { id: "section-hard-test", label: "The hard test" },
      { id: "section-discernment", label: "Discernment layer" },
      { id: "section-counter", label: "Counterarguments" },
      { id: "section-recommendations", label: "Recommendations" },
      { id: "section-movemental", label: "Where Movemental fits" },
      { id: "section-closing", label: "Closing" },
      { id: "section-sequence", label: "In this sequence" },
    ],
    sources: [
      {
        index: 31,
        title: "OpenAI — Introducing ChatGPT",
        meta: "OpenAI · Nov 2022",
        url: "https://openai.com/index/chatgpt/",
      },
      {
        index: 32,
        title: "BCG — Generative AI and knowledge workers (Sept 2024)",
        meta: "BCG · 2024",
        url: "https://www.bcg.com/press/5september2024-generative-ai-knowledge-workers-consultants",
      },
      {
        index: 9,
        title: "Dell'Anna et al. — Navigating the Jagged Technological Frontier",
        meta: "HBS / MIT / BCG · 2023",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321",
        dim: true,
      },
    ],
    hasFullBody: true,
  },
  {
    slug: "credibility-thesis",
    kind: "Thesis",
    year: 2026,
    thesisNote: "*Core curriculum material.*",
    title: "The Credibility Thesis",
    abstract:
      "What credibility means in the AI era — measurable but not reducible — and why {hl}scenius{/hl} is the sustainable response.",
    readMin: 22,
    sourceCount: 2,
    subtitle:
      "What credibility means in the AI era and why scenius is the solution.",
    sections: [
      { id: "section-definition", label: "What is credibility?" },
      { id: "section-gatekeeping", label: "How it used to work" },
      { id: "section-ai-crisis", label: "The AI crisis" },
      { id: "section-influence", label: "Credibility vs influence" },
      { id: "section-scenius", label: "The scenius solution" },
      { id: "section-measurable", label: "Measurable, not reducible" },
      { id: "section-framework", label: "New framework" },
      { id: "section-call", label: "A new way online" },
      { id: "section-beyond", label: "Beyond strategy" },
      { id: "section-choice", label: "The choice" },
    ],
    sources: [
      {
        index: 10,
        title: "Pew Research Center — Artificial Intelligence",
        meta: "Pew · Sep 2025 · n=5,023",
        url: "https://www.pewresearch.org/topic/science/science-issues/artificial-intelligence/",
      },
      {
        index: 24,
        title: "Reuters Institute — Digital News Report 2025",
        meta: "Reuters · 2025",
        url: "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025",
        dim: true,
      },
    ],
    hasFullBody: true,
  },
  {
    slug: "the-cost-of-fragmentation",
    kind: "Paper",
    year: 2026,
    title: "The Cost of Fragmentation",
    abstract:
      "Eight shared cost vectors — memory, continuity, compounding, credibility, and more — levied differently on {hl}leaders, churches, institutions, and nonprofits{/hl}.",
    readMin: 18,
    sourceCount: 1,
    subtitle:
      "What fragmentation charges movement leaders, churches, institutions, and nonprofits — a human cost map, not a dollar figure.",
    sections: [
      { id: "section-summary", label: "Executive summary" },
      { id: "section-universal", label: "Universal tax" },
      { id: "section-currencies", label: "Eight currencies" },
      { id: "section-leaders", label: "Movement leaders" },
      { id: "section-churches", label: "Churches" },
      { id: "section-institutions", label: "Institutions" },
      { id: "section-nonprofits", label: "Nonprofits" },
      { id: "section-thread", label: "Common thread" },
      { id: "section-changes", label: "What changes" },
      { id: "section-counter", label: "Counterarguments" },
      { id: "section-recommendations", label: "Recommendations" },
      { id: "section-choice", label: "The choice" },
    ],
    sources: [
      {
        index: 18,
        title: "Edelman Trust Barometer 2025 — AI flash poll",
        meta: "Edelman · 2025",
        url: "https://www.edelman.com/trust/2025/trust-barometer/flash-poll-trust-artifical-intelligence",
      },
    ],
    hasFullBody: true,
  },
  {
    slug: "sandbox-discovery",
    kind: "Paper",
    year: 2026,
    title: "Sandbox Discovery: Where Learning Actually Happens",
    abstract:
      "Stage 2 of the AI Stewardship Sequence — bounded experimentation after Safety, with four outputs and a {hl}graduation gate{/hl} before Skills or Solutions.",
    readMin: 10,
    sourceCount: 3,
    subtitle:
      "Structured discovery after Safety — not permissionless play, not shadow IT with better branding.",
    sections: [
      { id: "section-summary", label: "Executive summary" },
      { id: "section-evolution", label: "From Discovery Lab" },
      { id: "section-what-is", label: "What a sandbox is" },
      { id: "section-fragmented", label: "Fragmented state" },
      { id: "section-outputs", label: "Four outputs" },
      { id: "section-graduation", label: "Graduation gate" },
      { id: "section-formation", label: "Formation finish" },
      { id: "section-sequence-why", label: "Why this sequence" },
      { id: "section-counter", label: "Counterarguments" },
      { id: "section-recommendations", label: "Recommendations" },
      { id: "section-closing", label: "Closing" },
      { id: "section-sequence", label: "In this sequence" },
    ],
    sources: [
      {
        index: 32,
        title: "BCG — Generative AI and knowledge workers (Sept 2024)",
        meta: "BCG · 2024",
        url: "https://www.bcg.com/press/5september2024-generative-ai-knowledge-workers-consultants",
      },
      {
        index: 9,
        title: "Dell'Anna et al. — Navigating the Jagged Technological Frontier",
        meta: "HBS / MIT / BCG · 2023",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321",
        dim: true,
      },
    ],
    hasFullBody: true,
  },
  {
    slug: "the-skill-of-ai",
    kind: "Paper",
    year: 2026,
    title: "The Skill of AI: Why \"Reskilling\" Is the Wrong Frame",
    abstract:
      "Stage 3 of the AI Stewardship Sequence — judgment, taste, verification, and {hl}collaborative posture{/hl}, not feature tours or certification.",
    readMin: 12,
    sourceCount: 3,
    subtitle:
      "Why reskilling misnames the work — and what formation actually requires after Sandbox.",
    sections: [
      { id: "section-summary", label: "Executive summary" },
      { id: "section-problem", label: "The problem with the frame" },
      { id: "section-not", label: "What Skills is not" },
      { id: "section-skill", label: "What the skill actually is" },
      { id: "section-reskilling", label: "Reskilling, redefined" },
      { id: "section-learned", label: "Can it be learned?" },
      { id: "section-maturity", label: "Maturity model" },
      { id: "section-pedagogy", label: "The pedagogy" },
      { id: "section-nonprofit", label: "Nonprofit employees" },
      { id: "section-produces", label: "What Skills produces" },
      { id: "section-counter", label: "Counterarguments" },
      { id: "section-recommendations", label: "Recommendations" },
      { id: "section-threshold", label: "Threshold test" },
      { id: "section-closing", label: "Closing" },
      { id: "section-sequence", label: "In this sequence" },
    ],
    sources: [
      {
        index: 32,
        title: "BCG — Generative AI and knowledge workers (Sept 2024)",
        meta: "BCG · 2024",
        url: "https://www.bcg.com/press/5september2024-generative-ai-knowledge-workers-consultants",
      },
      {
        index: 9,
        title: "Dell'Anna et al. — Navigating the Jagged Technological Frontier",
        meta: "HBS / MIT / BCG · 2023",
        url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321",
        dim: true,
      },
      {
        index: 33,
        title: "Fernandes et al. — AI-assisted reasoning and calibration",
        meta: "Computers in Human Behavior · 2026",
        url: "https://doi.org/10.1016/j.chb.2025.108779",
        dim: true,
      },
    ],
    hasFullBody: true,
  },
];

/** Archived items revealed by "Load archive" on the index. */
/** Archived items revealed by "Load archive" on the index. */
export const RESEARCH_ARCHIVE: ResearchItem[] = [
  {
    slug: "scenius-network-credibility",
    kind: "Thesis",
    year: 2026,
    thesisNote: "*Network verification, not growth hacking.*",
    title: "Scenius as Credibility Mechanism",
    abstract:
      "From Brian Eno to network verification — what scenius actually means, what scholarship supports, and {hl}honest limits{/hl} Movemental should not dodge.",
    readMin: 8,
    sourceCount: 6,
    subtitle:
      "Tracing the lineage of scenius, mapping adjacent theory, and separating moral-aesthetic vision from epistemic claims.",
    sections: [
      { id: "section-why", label: "Why this matters" },
      { id: "section-eno-kelly", label: "Eno and Kelly" },
      { id: "section-academic", label: "Academic neighbors" },
      { id: "section-novelty", label: "Novelty or rebranding?" },
      { id: "section-counter", label: "Counter-arguments" },
      { id: "section-religious", label: "Religious movements" },
      { id: "section-recommendations", label: "Recommendations" },
      { id: "section-closing", label: "Closing" },
    ],
    sources: [
      {
        index: 1,
        title: "Kelly — Scenius, or Communal Genius (2008)",
        meta: "The Technium · 2008",
        url: "https://kk.org/thetechnium/scenius-or-comm/",
      },
      {
        index: 2,
        title: "Haas — Epistemic communities (1992)",
        meta: "International Organization · 1992",
        dim: true,
      },
      {
        index: 3,
        title: "Wenger — Communities of practice (1998)",
        meta: "Cambridge University Press · 1998",
        dim: true,
      },
    ],
    hasFullBody: true,
  }
,
  {
    slug: "trust-verification",
    kind: "Paper",
    year: 2026,
    title: "Trust, Verification, and Digital Identity",
    abstract:
      "What survey evidence and trust theory support about relationship-visible verification — and where {hl}network graphs can be gamed{/hl} as easily as polished solo text.",
    readMin: 12,
    sourceCount: 6,
    subtitle:
      "Stress-testing Movemental's network-verification thesis against Edelman, Reuters, Pew, Mayer, and the limits of AI labels.",
    sections: [
      { id: "section-question", label: "The core question" },
      { id: "section-changing", label: "Fragmentation" },
      { id: "section-theory", label: "Trust theory" },
      { id: "section-evaluation", label: "What users do" },
      { id: "section-network", label: "Network trust" },
      { id: "section-identity", label: "Digital identity" },
      { id: "section-eeat", label: "EEAT alignment" },
      { id: "section-ai-sources", label: "AI source choice" },
      { id: "section-labels", label: "AI labels" },
      { id: "section-design", label: "Design principles" },
      { id: "section-overstated", label: "Overstated claims" },
      { id: "section-bottom-line", label: "Bottom line" },
    ],
    sources: [
      {
        index: 24,
        title: "Reuters Institute — Digital News Report 2025",
        meta: "Reuters · 2025 · global sample",
        url: "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025",
      },
      {
        index: 10,
        title: "Pew Research Center — Artificial Intelligence",
        meta: "Pew · ongoing",
        url: "https://www.pewresearch.org/topic/science/science-issues/artificial-intelligence/",
      },
      {
        index: 18,
        title: "Edelman Trust Barometer 2025 — AI flash poll",
        meta: "Edelman · 2025",
        url: "https://www.edelman.com/trust/2025/trust-barometer/flash-poll-trust-artifical-intelligence",
        dim: true,
      },
    ],
    hasFullBody: true,
  }
,
  {
    slug: "voice-preservation",
    kind: "Paper",
    year: 2026,
    title: "Can AI Actually Sound Like You?",
    abstract:
      "What NLP can and cannot preserve — voice-aligned assistance and corpus-grounded generation, not {hl}identity substitution{/hl}.",
    readMin: 11,
    sourceCount: 8,
    subtitle:
      "Voice preservation, fidelity metrics, and honest product language for movement leaders who remain the author of record.",
    sections: [
      { id: "section-summary", label: "Executive summary" },
      { id: "section-nlp", label: "NLP field" },
      { id: "section-stack", label: "RAG / fine-tuning" },
      { id: "section-fidelity", label: "Measuring fidelity" },
      { id: "section-cowriting", label: "70/30 co-writing" },
      { id: "section-ethics", label: "Ethics & trust" },
      { id: "section-almost-right", label: "Almost-right failure" },
      { id: "section-ghostwriters", label: "Editors vs AI" },
      { id: "section-faith", label: "Faith-sector reception" },
      { id: "section-theology", label: "Theology of voice" },
      { id: "section-public", label: "Public language" },
      { id: "section-closing", label: "Closing" },
    ],
    sources: [
      {
        index: 26,
        title: "Pew — Reactions to learning AI was involved",
        meta: "Pew · Sep 2025 · n=5,023 · field Jun 9–15",
        url: "https://www.pewresearch.org/short-reads/2025/09/17/from-political-speeches-to-songs-how-would-americans-react-if-they-found-out-ai-was-involved/",
      },
      {
        index: 15,
        title: "NPR — Clergy grapple with the ethics of using AI to write sermons",
        meta: "NPR / Barna · 2025",
        url: "https://www.npr.org/2025/07/17/nx-s1-5468637/clergy-grapple-with-the-ethics-of-using-ai-to-write-sermons",
      },
      {
        index: 29,
        title: "COPE — Authorship and AI tools",
        meta: "COPE · position statement",
        url: "https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools",
        dim: true,
      },
    ],
    hasFullBody: true,
  }
,
  {
    slug: "seo-geo-discoverability",
    kind: "Analysis",
    year: 2026,
    title: "Expert Discoverability in the Age of AI Search",
    abstract:
      "SEO, GEO, and the gap between intellectual paternity and SERP primacy — why {hl}discoverability is infrastructural{/hl}, not a moral reward for being first.",
    readMin: 11,
    sourceCount: 3,
    subtitle:
      "From ten blue links to synthesized answers — what EEAT and GEO actually buy you, and what networks can and cannot multiply.",
    sections: [
      { id: "section-uncomfortable-truth", label: "Who owns the idea" },
      { id: "section-what-changed", label: "Synthesized answers" },
      { id: "section-eeat", label: "EEAT limits" },
      { id: "section-geo", label: "GEO playbook" },
      { id: "section-networks", label: "Network effects" },
      { id: "section-multiplier", label: "Multiplier narrative" },
      { id: "section-social-email", label: "Social vs email" },
      { id: "section-safe-to-say", label: "Safe to say" },
      { id: "section-early-geo", label: "Early to GEO?" },
      { id: "section-next-steps", label: "Next steps" },
    ],
    sources: [
      {
        index: 22,
        title: "Google — Search Quality Rater Guidelines",
        meta: "Google · EEAT reference",
        url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
      },
      {
        index: 23,
        title: "Aggarwal et al. — GEO: Generative Engine Optimization",
        meta: "Princeton / arXiv · 2023",
        url: "https://arxiv.org/abs/2311.09735",
      },
    ],
    hasFullBody: true,
  }
,
  {
    slug: "convergence-thesis",
    kind: "Thesis",
    year: 2026,
    thesisNote: "*Convergence on trial — design coupling, not macro-law.*",
    title: "Convergence on Trial",
    abstract:
      "Four forces, one story — and how honest Movemental can be when {hl}convergence{/hl} is a kairos reading backed by separable evidence, not a physics of history.",
    readMin: 12,
    sourceCount: 5,
    subtitle:
      "Credibility, publication, scenius, and movement — stress-testing the philosophical spine against Jenkins, Castells, and the research series.",
    sections: [
      { id: "section-clarify", label: "Define convergence" },
      { id: "section-four-forces", label: "Four forces" },
      { id: "section-crux", label: "Crux" },
      { id: "section-counter", label: "Steel-man" },
      { id: "section-kairos", label: "Kairos vs hype" },
      { id: "section-why-now", label: "Why now" },
      { id: "section-recommendations", label: "Recommendations" },
      { id: "section-closing", label: "Verdict" },
      { id: "section-coupling", label: "How the four forces connect" },
    ],
    sources: [
      {
        index: 19,
        title: "Authors Guild — 2023 Author Income Survey",
        meta: "Authors Guild · 2023 · n=5,699",
        url: "https://authorsguild.org/news/key-takeaways-from-2023-author-income-survey",
        dim: true,
      },
      {
        index: 20,
        title: "Substack — How much does Substack cost?",
        meta: "Substack Support · fee documentation",
        url: "https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost",
        dim: true,
      },
      {
        index: 10,
        title: "Pew Research Center — Artificial Intelligence",
        meta: "Pew · ongoing",
        url: "https://www.pewresearch.org/topic/science/science-issues/artificial-intelligence/",
        dim: true,
      },
    ],
    hasFullBody: true,
  }
,
  {
    slug: "publishing-economics",
    kind: "Analysis",
    year: 2026,
    title: "Publishing Economics and the 90/10 Question",
    abstract:
      "Traditional publishing, platform fees, and Movemental's revenue share — separating {hl}cash economics{/hl} from power economics so the argument holds up under scrutiny.",
    readMin: 10,
    sourceCount: 4,
    subtitle:
      "What the evidence supports about author income, platform fees, and where 90/10 is — and is not — a fair comparison.",
    sections: [
      { id: "section-publisher-ninety", label: "The publisher's 90%" },
      { id: "section-digital-stack", label: "Digital stack fees" },
      { id: "section-false-choice", label: "False choice framing" },
      { id: "section-stress-test", label: "Stress-testing 90/10" },
      { id: "section-scenario-band", label: "The $140K–$380K band" },
      { id: "section-creator-inequality", label: "Creator inequality" },
      { id: "section-recommendations", label: "Recommendations" },
    ],
    sources: [
      {
        index: 19,
        title: "Authors Guild — 2023 Author Income Survey",
        meta: "Authors Guild · 2023 · n=5,699",
        url: "https://authorsguild.org/news/key-takeaways-from-2023-author-income-survey",
      },
      {
        index: 20,
        title: "Substack — How much does Substack cost?",
        meta: "Substack Support · fee documentation",
        url: "https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost",
      },
      {
        index: 21,
        title: "Pew — U.S. streaming and subscription habits",
        meta: "Pew · 2025",
        url: "https://www.pewresearch.org/short-reads/2025/07/01/83-of-us-adults-use-streaming-services-far-fewer-subscribe-to-cable-or-satellite-tv/",
        dim: true,
      },
    ],
    hasFullBody: true,
  }
,
  {
    slug: "the-credibility-crisis",
    kind: "Paper",
    year: 2026,
    title: "The Credibility Crisis",
    abstract:
      "A narrative diagnosis — when fluent text {hl}performs expertise{/hl}, cheap signals decay, and formation still matters.",
    readMin: 6,
    sourceCount: 4,
    subtitle:
      "Chapter 1 — the decay of volume, polish, and pace as proxies for human formation.",
    sections: [
      { id: "section-opening", label: "You are reading an article" },
      { id: "section-changing", label: "What is changing" },
      { id: "section-evidence", label: "What the evidence supports" },
      { id: "section-organizations", label: "Organizations" },
      { id: "section-signals", label: "Volume, polish, presence" },
      { id: "section-not", label: "What this is not" },
      { id: "section-tool", label: "Stresser and tool" },
      { id: "section-first", label: "Why this comes first" },
      { id: "section-reflection", label: "Reflection questions" },
    ],
    sources: [
      {
        index: 10,
        title: "Pew Research Center — Artificial Intelligence",
        meta: "Pew · Jun 2025 · n=5,023",
        url: "https://www.pewresearch.org/topic/science/science-issues/artificial-intelligence/",
      },
      {
        index: 34,
        title: "Ahrefs — What percentage of new content is AI-generated?",
        meta: "Ahrefs · Apr 2025 · 900k pages",
        url: "https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated",
      },
      {
        index: 35,
        title: "Cooke et al. — As Good As A Coin Toss",
        meta: "CACM · 2025 · ~1,300 participants",
        url: "https://doi.org/10.1145/3729417",
      },
      {
        index: 24,
        title: "Reuters Institute — Digital News Report 2025",
        meta: "Reuters · 2025",
        url: "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025",
        dim: true,
      },
    ],
    hasFullBody: true,
  },
  {
    slug: "movemental-research-corpus-v1",
    kind: "Analysis",
    year: 2026,
    title: "Movemental Research Corpus v1",
    abstract:
      "Citation-quality reference for adoption, governance, and formation stats across faith and nonprofit sectors — {hl}80+ primary sources{/hl} with confidence tags.",
    readMin: 45,
    sourceCount: 80,
    hasFullBody: false, // Reference index only — no reader body (RL-90)
  },
];

export function getResearchItem(slug: string): ResearchItem | undefined {
  return [...RESEARCH_ITEMS, ...RESEARCH_ARCHIVE].find((item) => item.slug === slug);
}

export function allResearchSlugs(): string[] {
  return [...RESEARCH_ITEMS, ...RESEARCH_ARCHIVE].map((item) => item.slug);
}

/* --------------------------------------------------------------------------
 * Findings page — what the research shows.
 * ------------------------------------------------------------------------ */

export interface StatPanel {
  primary: string;
  secondary: string;
  copy: string;
  source: string;
}

export interface TrustChart {
  label: string;
  value: number;
  /** Bar colour. */
  tone: "blue" | "ink";
  source: string;
}

export const FINDINGS_HERO = {
  eyebrow: "The data",
  title: "What the research shows.",
  /** `{hl}` … `{/hl}` marks the highlighter swipe. */
  lede:
    "Six independent studies converge on the same pattern: adoption is broad, {hl}capability is rare{/hl}, governance is mostly absent.",
  marginNote: "A consistent trend across all sectors surveyed.",
} as const;

export const FINDINGS_STAT_PANELS: StatPanel[] = [
  {
    primary: "92%",
    secondary: "7%",
    copy: "92% of nonprofits use AI in some form vs 7% report major capability gains",
    source: "Nonprofits · Virtuous · 2026 · n=346",
  },
  {
    primary: "60%",
    secondary: "5%",
    copy: "60% of church leaders use AI monthly vs 5% of churches have an established AI policy",
    source: "Churches · Barna/Pushpay · 2026 · n=1,306",
  },
  {
    primary: "88%",
    secondary: "6%",
    copy: "88% of organizations use AI in at least one function vs 6% qualify as high performers",
    source: "Enterprise · McKinsey · 2025 · n=1,993",
  },
  {
    primary: "60%",
    secondary: "5%",
    copy: "60% of firms generate no material AI value vs 5% qualify as future-built",
    source: "Enterprise · BCG · 2025 · n=1,250",
  },
];

export const FINDINGS_TRUST_CHARTS: TrustChart[] = [
  {
    label: "43% of churchgoers disagree with their pastor using AI for sermon prep",
    value: 43,
    tone: "blue",
    source: "Lifeway · 2026 · n=1,200 churchgoers",
  },
  {
    label: "62% of pastors are concerned about non-disclosure of AI involvement",
    value: 62,
    tone: "ink",
    source: "Lifeway · 2026 · n=1,003 pastors",
  },
];

/* --------------------------------------------------------------------------
 * Master sources page — every claim, sourced.
 * ------------------------------------------------------------------------ */

/** Master citation registry — indices are stable across all research article bodies. */
export const MASTER_SOURCES: ResearchSource[] = [
  {
    index: 1,
    title: "Virtuous & Fundraising.AI — The 2026 Nonprofit AI Adoption Report",
    meta: "Virtuous · 2026 · n=346",
    url: "https://virtuous.org/resource/the-2026-nonprofit-ai-adoption-report-download/",
    callout:
      "92% use AI in some form; only 7% report major organizational capability improvements; 47% have no governance policy.",
  },
  {
    index: 2,
    title: "Barna & Pushpay — State of Church Tech 2026",
    meta: "Barna / Pushpay · 2026 · n=1,306",
    url: "https://www.barna.com/research/church-leaders-ai-usage-concerns",
    callout:
      "60% of church leaders use AI monthly; only 5% of churches have an established AI policy.",
  },
  {
    index: 3,
    title: "McKinsey — The State of AI in 2025",
    meta: "McKinsey · 2025 · n=1,993",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    callout:
      "88% use AI in at least one function; 6% qualify as high performers; 55% of high performers redesigned workflows.",
  },
  {
    index: 4,
    title: "BCG — The Widening AI Value Gap (Build for the Future 2025)",
    meta: "BCG · 2025 · n=1,250",
    url: "https://www.bcg.com/publications/2025/widening-ai-value-gap-build-for-future-2025",
    callout: "60% generate no material value from AI; 5% qualify as future-built with AI-first operating models.",
  },
  {
    index: 5,
    title: "MIT NANDA — The GenAI Divide: State of AI in Business 2025",
    meta: "MIT NANDA · 2025",
    url: "https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf",
    callout:
      "Roughly 95% of corporate gen-AI pilots fail meaningful financial returns — integration and governance, not model quality, drive outcomes.",
  },
  {
    index: 6,
    title: "Lifeway Research — Pastors' Views on Artificial Intelligence",
    meta: "Lifeway · 2025 field / 2026 release · n=1,003 pastors",
    url: "https://research.lifeway.com/2026/04/21/pastors-churchgoers-see-ai-as-concerning-and-confusing/",
    callout: "42% of pastors use AI for ministry; 62% concerned about non-disclosure of AI involvement.",
  },
  {
    index: 7,
    title: "Lifeway Research — Churchgoers and AI in Sermon Preparation",
    meta: "Lifeway · 2026 · n=1,200 churchgoers",
    url: "https://research.lifeway.com/2026/04/21/pastors-churchgoers-see-ai-as-concerning-and-confusing/",
    callout: "43% disagree with their pastor using AI for sermon preparation (24% strongly).",
  },
  {
    index: 8,
    title: "Stanford HAI — AI Index 2026",
    meta: "Stanford HAI · 2026",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/",
    callout: "Documents broad organizational uptake with uneven depth — transformation lags adoption.",
  },
  {
    index: 9,
    title: "Dell'Anna et al. — Navigating the Jagged Technological Frontier",
    meta: "HBS / MIT / BCG · 2023",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321",
    callout:
      "Large gains inside the frontier (+12% tasks, 25% faster); 19 points less accurate on one outside-frontier task.",
  },
  {
    index: 10,
    title: "Pew Research Center — Artificial Intelligence",
    meta: "Pew · ongoing",
    url: "https://www.pewresearch.org/topic/science/science-issues/artificial-intelligence/",
    callout: "Gold-standard US public opinion; use for disclosure reactions and trust trends, not vendor ROI.",
  },
  {
    index: 11,
    title: "NIST — AI Risk Management Framework",
    meta: "NIST · 2023+",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    callout: "Voluntary US baseline for AI risk management; widely referenced by boards and CIOs.",
  },
  {
    index: 12,
    title: "Forvis Mazars — AI Governance for Nonprofit Boards",
    meta: "Forvis Mazars · 2026",
    url: "https://forvismazars.us/forsights/2026/02/ai-governance-for-nonprofit-boards",
    callout: "AI governance as a fiduciary issue — Care, Loyalty, and Obedience extend to technological oversight.",
  },
  {
    index: 13,
    title: "TechSoup & Tapp Network — State of AI in Nonprofits 2025",
    meta: "TechSoup · 2025 · n=1,321",
    url: "https://page.techsoup.org/ai-benchmark-report-2025",
    callout: "85.6% exploring AI; 24% with formal strategy; larger orgs adopt at roughly twice the rate of smaller ones.",
  },
  {
    index: 14,
    title: "FBI IC3 — Internet Crime Complaint Center (AI-enabled fraud)",
    meta: "FBI · 2025",
    url: "https://www.ic3.gov/",
    callout: "$893M in AI-attributed losses in 2025; voice-cloning fraud up sharply — sector underestimates exposure.",
    dim: true,
  },
  {
    index: 15,
    title: "NPR — Clergy grapple with the ethics of using AI to write sermons",
    meta: "NPR / Barna · 2025",
    url: "https://www.npr.org/2025/07/17/nx-s1-5468637/clergy-grapple-with-the-ethics-of-using-ai-to-write-sermons",
    callout: "12% comfortable with AI-written sermons; 43% see merit for preparation and research.",
  },
  {
    index: 16,
    title: "NTEN — 2025 Data Empowerment Report",
    meta: "NTEN · 2025 · n=220+",
    url: "https://word.nten.org/wp-content/uploads/2025/07/2025-Data-Empowerment-Report.pdf",
    callout: "AI data policies among the least implemented governance items as tool adoption rises.",
    dim: true,
  },
  {
    index: 17,
    title: "Barna & Gloo — State of the Church 2026 (AI & spiritual authority)",
    meta: "Barna / Gloo · 2026 · n=1,514",
    url: "https://www.barna.com/research/",
    callout: "Public attitudes on AI and spiritual authority — pair with Lifeway pastor data for leader/congregation gap.",
    dim: true,
  },
  {
    index: 18,
    title: "Edelman Trust Barometer 2025 — AI flash poll",
    meta: "Edelman · 2025",
    url: "https://www.edelman.com/trust/2025/trust-barometer/flash-poll-trust-artifical-intelligence",
    callout: "Uneven comfort with corporate AI use; geographic divergence in AI trust.",
    dim: true,
  },
  {
    index: 19,
    title: "Authors Guild — 2023 Author Income Survey",
    meta: "Authors Guild · 2023 · n=5,699 · income year 2022",
    url: "https://authorsguild.org/news/key-takeaways-from-2023-author-income-survey",
    callout:
      "Median book income $10,000 for full-time authors; $2,000 for whole sample including part-time; half of full-time authors below minimum wage on all writing work.",
  },
  {
    index: 20,
    title: "Substack — How much does Substack cost?",
    meta: "Substack Support · fee documentation",
    url: "https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost",
    callout:
      "10% platform fee on paid subscriptions plus Stripe processing (2.9% + $0.30) and 0.7% recurring billing on renewals as of July 2024.",
  },
  {
    index: 21,
    title: "Pew — U.S. streaming and subscription habits",
    meta: "Pew · 2025",
    url: "https://www.pewresearch.org/short-reads/2025/07/01/83-of-us-adults-use-streaming-services-far-fewer-subscribe-to-cable-or-satellite-tv/",
    callout:
      "83% of U.S. adults use streaming services — reminder that attention and wallet share are contested even when creator tools are cheap.",
    dim: true,
  },
  {
    index: 22,
    title: "Google — Search Quality Rater Guidelines",
    meta: "Google · EEAT reference · updated periodically",
    url: "https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf",
    callout:
      "Primary reference for Experience, Expertise, Authoritativeness, and Trustworthiness — raters align systems, not hand-rank pages.",
  },
  {
    index: 23,
    title: "Aggarwal et al. — GEO: Generative Engine Optimization",
    meta: "Princeton / arXiv · 2023 · KDD 2024",
    url: "https://arxiv.org/abs/2311.09735",
    callout:
      "Introduces GEO framing and benchmark; reports material but bounded improvements with domain dependence — not a settled spec from Google or OpenAI.",
  },
  {
    index: 24,
    title: "Reuters Institute — Digital News Report 2025",
    meta: "Reuters · 2025 · global sample",
    url: "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025",
    callout:
      "40% overall trust in news (stable three years); 58% globally worry about true vs false online (73% U.S.); AI expected to make news cheaper but less trustworthy.",
  },
  {
    index: 25,
    title: "Stanford HAI — Labeling AI-Generated Content May Not Change Its Persuasiveness",
    meta: "Stanford HAI · policy brief",
    url: "https://hai.stanford.edu/policy/labeling-ai-generated-content-may-not-change-its-persuasiveness",
    callout:
      "Labels can shift attribution without reliably reducing persuasion for some message types — disclosure alone is insufficient for credibility protection.",
    dim: true,
  },
  {
    index: 26,
    title: "Pew — Reactions to learning AI was involved in content",
    meta: "Pew · Sep 2025 · n=5,023 · field Jun 9–15",
    url: "https://www.pewresearch.org/short-reads/2025/09/17/from-political-speeches-to-songs-how-would-americans-react-if-they-found-out-ai-was-involved/",
    callout:
      "71% would view a political candidate less favorably if AI helped write a speech they liked; 56% negative for a news article — post-hoc disclosure matters.",
  },
  {
    index: 27,
    title: "Hu et al. — Parameter-efficient fine-tuning of large language models",
    meta: "Nature Machine Intelligence · 2023",
    url: "https://doi.org/10.1038/s42256-023-00626-4",
    callout:
      "Survey of PEFT methods (LoRA, adapters); tenant-specific adaptation is feasible but entangled with base-model updates and data rights.",
  },
  {
    index: 28,
    title: "Ippolito et al. — Automatic detection of generated text",
    meta: "ACL · 2020",
    url: "https://doi.org/10.18653/v1/2020.acl-main.164",
    callout:
      "Human-likeness and machine detectability are not aligned — optimizing for plausibility can diverge from statistical consistency.",
  },
  {
    index: 29,
    title: "COPE — Authorship and AI tools",
    meta: "COPE · position statement",
    url: "https://publicationethics.org/guidance/cope-position/authorship-and-ai-tools",
    callout: "AI cannot be an author; disclosure required; humans accountable for every line.",
  },
  {
    index: 30,
    title: "Dwivedi et al. — So what if ChatGPT wrote it?",
    meta: "International Journal of Information Management · 2023",
    url: "https://doi.org/10.1016/j.ijinfomgt.2023.102642",
    callout:
      "ChatGPT-era authorship stock-take — governance, accountability, and epistemic risk remain open; voice preservation not solved.",
    dim: true,
  },
  {
    index: 31,
    title: "OpenAI — Introducing ChatGPT",
    meta: "OpenAI · Nov 2022",
    url: "https://openai.com/index/chatgpt/",
    callout: "Public launch 30 November 2022 — fair marker for how recent lived generative-AI practice is at scale.",
  },
  {
    index: 32,
    title: "BCG — Generative AI and knowledge workers (Sept 2024)",
    meta: "BCG · 2024",
    url: "https://www.bcg.com/press/5september2024-generative-ai-knowledge-workers-consultants",
    callout:
      "Follow-on experiments with consultants — gains on some tasks, failure modes when junior staff use AI without senior verification.",
  },
  {
    index: 33,
    title: "Fernandes et al. — AI-assisted reasoning and calibration",
    meta: "Computers in Human Behavior · 2026",
    url: "https://doi.org/10.1016/j.chb.2025.108779",
    callout:
      "AI-assisted work can improve performance while worsening calibration — overconfidence sometimes higher among users with greater AI literacy.",
    dim: true,
  },
  {
    index: 34,
    title: "Ahrefs — What percentage of new content is AI-generated?",
    meta: "Ahrefs · Apr 2025 · 900k pages",
    url: "https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated",
    callout:
      "74.2% of newly detected English pages contained some AI-flagged content; 2.5% pure AI, 25.8% pure human — detector-dependent, not peer-reviewed.",
  },
  {
    index: 35,
    title: "Cooke et al. — As Good As A Coin Toss",
    meta: "CACM · 2025 · ~1,300 participants",
    url: "https://doi.org/10.1145/3729417",
    callout:
      "Realistic multimodal synthetic stimuli — mean human discrimination accuracy near chance (~50%); do not rely on unaided perception alone.",
  },
];
