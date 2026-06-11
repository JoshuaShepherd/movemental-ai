/**
 * Citation source catalog (Ledger edition).
 *
 * Single source of truth for every research citation rendered on the public
 * site. Entries are derived from the **Movemental Research Corpus v1.0**
 * (`docs/research/state-of-ai-2026/movemental-research-corpus-v1.md`) — the
 * canonical citation document. The `corpusSection` field traces each row back
 * to the corpus paragraph for re-verification.
 *
 * Editorial rules enforced by `tests/citations/catalog.test.ts`:
 *
 *   1. No source carries a confidence tag of `DROP` — DROP claims are removed
 *      from the catalog entirely (per corpus Section 10).
 *   2. Every URL must be `https://`.
 *   3. Every claim in `claims.ts` must reference a source id that exists here.
 *
 * To add a source:
 *   1. Verify it appears in the corpus (or the authoritative-sources router).
 *   2. Pick a stable kebab-case id.
 *   3. Mirror the corpus confidence tag exactly.
 */

export type ConfidenceTag = "VERIFIED" | "QUALIFIED" | "NEW";

export type CitationSource = {
  /** Stable kebab-case identifier — referenced by `claims.ts` */
  id: string;
  /** Author / organization line as rendered in the references rail */
  author: string;
  /** Italicized title in the references rail */
  title: string;
  /** Publication date as a short human string ("February 16, 2026") */
  date: string;
  /** Sample frame summary; e.g. "n = 1,003 Protestant senior pastors · phone · ±3.3%" */
  sample?: string;
  /** Confidence tag — mirrors the corpus exactly */
  tag: ConfidenceTag;
  /** Primary-source URL */
  url: string;
  /** Corpus section reference (Section X.Y) */
  corpusSection: string;
};

export const sources = {
  "virtuous-2026": {
    id: "virtuous-2026",
    author: "Virtuous & Fundraising.AI",
    title: "The 2026 Nonprofit AI Adoption Report",
    date: "February 16, 2026",
    sample: "n = 346",
    tag: "VERIFIED",
    url: "https://virtuous.org/resource/the-2026-nonprofit-ai-adoption-report-download/",
    corpusSection: "2.1.1",
  },
  "techsoup-2025": {
    id: "techsoup-2025",
    author: "TechSoup & Tapp Network",
    title: "State of AI in Nonprofits 2025",
    date: "January 24, 2025",
    sample: "n = 1,321",
    tag: "VERIFIED",
    url: "https://page.techsoup.org/ai-benchmark-report-2025",
    corpusSection: "2.1.2",
  },
  "lifeway-pastors-2026": {
    id: "lifeway-pastors-2026",
    author: "Lifeway Research",
    title: "Pastors' Views on Artificial Intelligence",
    date: "Conducted Sept 2025 · released April 21, 2026",
    sample: "n = 1,003 Protestant senior pastors · phone · ±3.3%",
    tag: "VERIFIED",
    url: "https://research.lifeway.com/2026/04/21/pastors-churchgoers-see-ai-as-concerning-and-confusing/",
    corpusSection: "2.2.1",
  },
  "barna-pushpay-2026": {
    id: "barna-pushpay-2026",
    author: "Barna Group & Pushpay",
    title: "Technology for Missional Impact: State of Church Tech 2026",
    date: "Released March 9, 2026",
    sample: "n = 1,306 U.S. church leaders",
    tag: "VERIFIED",
    url: "https://www.barna.com/research/church-leaders-ai-usage-concerns/",
    corpusSection: "2.2.2",
  },
  "barna-gloo-sotc-2026": {
    id: "barna-gloo-sotc-2026",
    author: "Barna Group & Gloo",
    title: "State of the Church 2026: AI Series",
    date: "November 2025 onward",
    sample: "n = 1,514 U.S. adults · online",
    tag: "VERIFIED",
    url: "https://www.barna.com/research/state-of-the-church-2026-trends/",
    corpusSection: "2.2.3",
  },
  "lifeway-churchgoers-2026": {
    id: "lifeway-churchgoers-2026",
    author: "Lifeway Research",
    title: "Protestant Churchgoer Views on Artificial Intelligence",
    date: "Conducted Sept 2025 · released April 21, 2026",
    sample: "n = 1,200 monthly-attending Protestant churchgoers · ±3.2%",
    tag: "VERIFIED",
    url: "https://research.lifeway.com/wp-content/uploads/2026/04/American-Churchgoers-Sept-2025-AI-Report.pdf",
    corpusSection: "2.2.4",
  },
  "mckinsey-soa-2025": {
    id: "mckinsey-soa-2025",
    author: "McKinsey & Company",
    title: "The State of AI in 2025: Agents, Innovation, and Transformation",
    date: "November 2025",
    sample: "n = 1,993 across 105 nations",
    tag: "VERIFIED",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    corpusSection: "2.3.1",
  },
  "bcg-value-gap-2025": {
    id: "bcg-value-gap-2025",
    author: "Boston Consulting Group",
    title: "The Widening AI Value Gap: Build for the Future 2025",
    date: "September 2025",
    sample: "n = 1,250 firms",
    tag: "VERIFIED",
    url: "https://media-publications.bcg.com/The-Widening-AI-Value-Gap-October-2025.pdf",
    corpusSection: "2.3.2",
  },
  "mit-nanda-2025": {
    id: "mit-nanda-2025",
    author: "MIT NANDA Initiative",
    title: "The GenAI Divide: State of AI in Business 2025",
    date: "July 2025",
    sample: "150 interviews · 350 surveys · 300 deployments",
    tag: "VERIFIED",
    url: "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/",
    corpusSection: "2.3.3",
  },
  "stanford-hai-2026": {
    id: "stanford-hai-2026",
    author: "Stanford HAI",
    title: "AI Index Report 2026",
    date: "April–May 2026",
    tag: "VERIFIED",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    corpusSection: "2.4.2",
  },
  "fbi-ic3-2025": {
    id: "fbi-ic3-2025",
    author: "FBI Internet Crime Complaint Center",
    title: "2025 IC3 Annual Report",
    date: "Published 2026",
    tag: "VERIFIED",
    url: "https://www.ic3.gov/",
    corpusSection: "4.1.1",
  },
  "forvis-mazars-2026": {
    id: "forvis-mazars-2026",
    author: "Forvis Mazars",
    title: "AI Governance for Nonprofit Boards",
    date: "February 13, 2026",
    tag: "VERIFIED",
    url: "https://www.forvismazars.us/forsights/2026/02/ai-governance-for-nonprofit-boards",
    corpusSection: "3.1",
  },
  "vatican-antiqua-et-nova-2025": {
    id: "vatican-antiqua-et-nova-2025",
    author: "Vatican (Dicastery for the Doctrine of the Faith and Dicastery for Culture and Education)",
    title: "Antiqua et Nova: Note on the Relationship Between AI and Human Intelligence",
    date: "January 28, 2025",
    tag: "VERIFIED",
    url: "https://www.vatican.va/roman_curia/congregations/cfaith/documents/rc_ddf_doc_20250128_antiqua-et-nova_en.html",
    corpusSection: "6.3.2",
  },
  "kolb-1984": {
    id: "kolb-1984",
    author: "David A. Kolb",
    title: "Experiential Learning: Experience as the Source of Learning and Development",
    date: "1984; 2nd ed. 2014",
    tag: "VERIFIED",
    url: "https://www.pearson.com/en-us/subject-catalog/p/experiential-learning-experience-as-the-source-of-learning-and-development/P200000005942",
    corpusSection: "6.1.1",
  },
  "pink-drive-2009": {
    id: "pink-drive-2009",
    author: "Daniel H. Pink",
    title: "Drive: The Surprising Truth About What Motivates Us",
    date: "Riverhead Books, 2009",
    tag: "VERIFIED",
    url: "https://www.danpink.com/books/drive/",
    corpusSection: "6.2.1",
  },
  "smith-yawl-2016": {
    id: "smith-yawl-2016",
    author: "James K. A. Smith",
    title: "You Are What You Love",
    date: "Brazos Press, 2016",
    tag: "VERIFIED",
    url: "https://bakerpublishinggroup.com/books/you-are-what-you-love/385920",
    corpusSection: "6.3.1",
  },
  "gloo-faic-2025": {
    id: "gloo-faic-2025",
    author: "Gloo",
    title: "Flourishing AI Christian (FAI-C) Benchmark",
    date: "December 15, 2025",
    sample: "807 curated questions · 7 dimensions",
    tag: "VERIFIED",
    url: "https://gloo.com/press/releases/gloo-unveils-the-first-benchmark-exposing-how-ai-misses-christian-worldview-and-values",
    corpusSection: "8.3.1",
  },
  "pew-ai-impact-2025": {
    id: "pew-ai-impact-2025",
    author: "Pew Research Center",
    title: "How Americans View AI and Its Impact on People and Society",
    date: "September 17, 2025",
    sample: "n = 5,023 U.S. adults · ATP · June 9–15, 2025 fieldwork",
    tag: "VERIFIED",
    url: "https://www.pewresearch.org/science/2025/09/17/how-americans-view-ai-and-its-impact-on-people-and-society/",
    corpusSection: "Trust · public AI literacy",
  },
} as const satisfies Record<string, CitationSource>;

export type SourceId = keyof typeof sources;

/** Convergent-finding shorthand — when the sentence describes a pattern across
 *  multiple studies (e.g. the 5–7% high-performer cohort), the popover lists
 *  the contributing studies inside one chip rather than chaining three.
 *  Anchor source = McKinsey (cleanest sample); secondary studies named in the
 *  claim text. See §7.4 rule 6 of the build prompt. */
export function getSource(id: SourceId): CitationSource {
  return sources[id];
}
