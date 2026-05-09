/**
 * It Starts With Safety — the readable toolkit at /toolkit/read.
 *
 * This is the web rendering of the toolkit field guide that the lead-magnet
 * landing page (/toolkit) sells. The PDF and the web view are intended to
 * render from a single content source — this file is that source. When a
 * print pipeline is chosen later, the PDF generator should consume the same
 * data tables and JSX defined here; do not maintain a parallel copy.
 *
 * Citations are wired through the same `<CitationsProvider />` chip + rail
 * mechanism the home page uses. Every research claim in this file traces to
 * a row in `src/lib/citations/claims.ts`. Do NOT invent or paraphrase a
 * statistic without first adding the corresponding claim to that catalog
 * with a verified source. The Movemental Research Corpus
 * (`docs/research/state-of-ai-2026/movemental-research-corpus-v1.md`)
 * §10 enumerates the claims that have been intentionally dropped or
 * revised — those numbers must not appear here.
 *
 * v1 is a founder-review draft. Sections marked with `[REVIEW]` are the
 * places I would most like Brad / Alan / Josh to revise before public
 * shipping (specific phrasings, the exact Position A vs Position B framings
 * in the self-assessment, the named-refusals list).
 */

import Link from "next/link";

import { Cite, CitationsProvider, ReferencesRail } from "@/components/citations";
import type { CitationId } from "@/lib/citations/claims";
import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import { Section } from "@/components/primitives";
import { ToolkitOpenButton } from "@/components/toolkit/ToolkitOpenButton";

/* -------------------------------------------------------------------------- */
/*  Citation order — chip numbers and the references rail track this array.  */
/*  Add new chips at the position they are first cited in document order.    */
/* -------------------------------------------------------------------------- */

const TOOLKIT_CLAIMS = [
  "nonprofit-92-adoption",
  "nonprofit-81-adhoc",
  "barna-pushpay-church-tech-2026",
  "lifeway-pastor-42-use",
  "high-performer-cohort-5-7",
  "mckinsey-workflow-redesign",
  "nonprofit-47-no-policy",
  "forvis-fiduciary-ai",
  "fbi-ic3-893m",
  "barna-gloo-spiritual-trust-1-in-3",
  "antiqua-et-nova-complement",
] as const satisfies ReadonlyArray<CitationId>;

/* -------------------------------------------------------------------------- */
/*  Section 2 data — the seven artifacts                                      */
/* -------------------------------------------------------------------------- */

interface Artifact {
  number: string;
  title: string;
  /** One-sentence definition the artifact's name resolves into. */
  definition: string;
  /** 2–3 paragraphs of substance: what it is, why it matters, what's at stake. */
  body: readonly string[];
  /** Concrete sample structure or sentence so the reader can begin drafting. */
  inPractice: string;
}

const ARTIFACTS: readonly Artifact[] = [
  {
    number: "01",
    title: "Acceptable Use Statement",
    definition:
      "A signed, public organizational position on what AI may and may not do in your context.",
    body: [
      "The Acceptable Use Statement is the document the rest of Safety hangs from. It is one to two pages of plain language, signed by the senior leader, ratified by the body that holds them accountable, and written so the people you serve can read it without translation. It is not a vendor terms-of-service page. It is the statement of who you are when AI is in the room.",
      "Without it, every later question — what staff may do, what a board can defend, what a donor can be told — is answered piecemeal by whoever is in the meeting. With it, those questions resolve to a single referent. Disagreement still happens, but it happens against a shared text instead of across silent assumptions.",
    ],
    inPractice:
      "Sample structure: a one-paragraph posture statement, a list of allowed categories with examples, a list of off-limits categories with reasons, the names and roles of those responsible for review, and the date of the next scheduled revision.",
  },
  {
    number: "02",
    title: "Care Boundaries",
    definition:
      "The explicit list of pastoral, counseling, clinical, and high-trust interactions where AI is not used.",
    body: [
      "Care Boundaries protect the relationships your organization exists to hold. Pastoral correspondence, clinical intake, counseling notes, eulogies, condolences, the first message after a crisis — these are categories where the medium of human presence is the substance of the work. AI can speed the production of language in these moments, but speed is not the value the relationship is asking for.",
      "The Care Boundary document does the work an unwritten norm cannot: it tells a new staff member what not to ask AI to help with, in writing, before the question comes up under pressure. It also tells a board member, an accreditor, or a long-tenured donor that the question has been considered and decided.",
    ],
    inPractice:
      "Examples teams have ratified: pastoral counseling notes are not drafted with AI; condolence and bereavement communication is not AI-assisted; first contact with a person in crisis is not AI-assisted; clinical case formulation is not generated; admissions appeals are read by a human before any AI summary is consulted.",
  },
  {
    number: "03",
    title: "Disclosure Standards",
    definition:
      "The rules your organization follows when AI has substantially shaped a communication, content piece, or decision.",
    body: [
      "Disclosure is what tells the people you serve that the relationship is still real. When AI has substantially shaped a sermon, a letter, an email signed in a leader's name, or a decision affecting them, the people on the other side have a stake in knowing. Quiet substitution erodes trust slowly, then all at once.",
      "The Disclosure Standard names the threshold (when does AI's contribution become substantial enough to disclose?), the form (footer line, in-body acknowledgment, separate notice?), and the exceptions (what's purely operational and does not require disclosure?). It is one of the artifacts most often skipped, and one of the artifacts an outside reader will judge you on most quickly when an incident surfaces.",
    ],
    inPractice:
      "Sample threshold: communication is disclosed when AI generated more than a draft skeleton, when AI selected the framing, when AI authored the tone in the leader's voice, or when AI made or recommended a decision affecting the recipient.",
  },
  {
    number: "04",
    title: "Vendor and Tool Inventory",
    definition:
      "A documented list of every AI tool currently in use across the organization, by whom, for what purpose, with what data.",
    body: [
      "The Vendor and Tool Inventory establishes situational awareness. Most organizations cannot answer, today, the question of which AI tools their staff are using. The answer is almost always longer than the senior team expects: a free chat interface here, a transcription service there, an email-drafting plug-in, a video summarizer. Each of those tools has its own data terms.",
      "The inventory is a living document. It records each tool, who uses it, for what work, with what categories of data, under whose authorization, and the date of the last review. It is the prerequisite for any honest Data Handling Protocol downstream — you cannot govern what you do not know is in use.",
    ],
    inPractice:
      "Minimum columns: tool name and vendor, primary user(s), use case, data categories permitted, authorizing leader, contract or terms-of-service URL, last reviewed date, next review date.",
  },
  {
    number: "05",
    title: "Data Handling Protocol",
    definition:
      "The standard for what data may be shared with AI tools, by whom, under what circumstances, with what review.",
    body: [
      "The Data Handling Protocol protects donor, member, student, client, and staff information from being silently absorbed into third-party systems. It names the categories of data that must never leave the organization's controlled environment, the categories that may be shared with named tools under named conditions, and the categories that are routinely permissible.",
      "Without this artifact, the organization's data perimeter is whatever a junior staff member happens to assume on a Tuesday afternoon. With it, the protocol is the answer when a development associate asks whether to paste a major-donor list into a chat tool to draft thank-you letters.",
    ],
    inPractice:
      "Three tiers most teams settle on: never (PII tied to spiritual-care, clinical, or legal proceedings; financial account data; identifiable minors); only with named tools and named approvals (donor records, payroll, member rolls); routinely permissible (public materials, anonymized case examples, the organization's own published content).",
  },
  {
    number: "06",
    title: "Incident Response Plan",
    definition:
      "The procedure your organization follows when AI produces harmful, inaccurate, deceptive, or impersonating output that reaches the people you serve.",
    body: [
      "AI incidents are coming. They will arrive as a fabricated quote in a sermon citation, a hallucinated grant deadline that was missed, a deepfake voicemail in the senior pastor's voice asking for a wire transfer, an unauthorized chatbot deployed by a volunteer that gives counseling advice with the church's name attached. The question is whether the response is improvised on the day or executed against a plan written before the day.",
      "The Incident Response Plan names the on-call leader, the first-hour communication path, the criteria for public statement, the regulatory and accreditation reporting obligations (where they exist), and the post-incident review cycle. It is short. It is rehearsed. It is the artifact insurance underwriters and accreditors will eventually expect to see.",
    ],
    inPractice:
      "Minimum sections: who gets called in the first hour, who decides whether to communicate publicly, what is said in the first 24 hours, what is documented, what is reviewed at 30 days, and how the relevant Safety artifacts are revised in light of what happened.",
  },
  {
    number: "07",
    title: "Named Refusals",
    definition:
      "The specific applications of AI your organization commits to refuse on principle, regardless of pressure or efficiency gains.",
    body: [
      "Named Refusals are the artifact most directly tied to identity. The Acceptable Use Statement describes the boundaries your organization currently holds; Named Refusals describe what your organization will not do, and would not do, under pressure to grow, raise more, or move faster.",
      "Most organizations have refusals in their unwritten norms. Writing them down is the moment they become institutional rather than personal. A refusal that lives only in the senior leader's head leaves with the senior leader. A refusal on the record outlasts the person who held it. See Section 6 of this guide for Movemental's own list of refusals and the rationale for each.",
    ],
    inPractice:
      "Sample shape: each refusal is a single sentence in the active voice, followed by one paragraph naming what is at stake (for the people you serve, for the organization's identity, for the trust environment around you), and one sentence describing what you do instead.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 3 data — the 15-question self-assessment                          */
/*                                                                            */
/*  [REVIEW] These are the questions Movemental's leadership team should      */
/*  pressure-test before public release. Each is calibrated to surface        */
/*  disagreement among thoughtful leaders, but the precise framing of the    */
/*  underlying tension and the two example positions is the editorial       */
/*  choice that makes the disagreement legible.                              */
/* -------------------------------------------------------------------------- */

interface AssessmentQuestion {
  number: string;
  question: string;
  /** 3–4 sentences naming the underlying tension. */
  tension: string;
  /** Two reasonable positions — not right and wrong, but competing views. */
  positionA: string;
  positionB: string;
}

const ASSESSMENT_QUESTIONS: readonly AssessmentQuestion[] = [
  {
    number: "01",
    question:
      "Should AI ever be used to draft pastoral, clinical, or counseling correspondence — even with disclosure?",
    tension:
      "The case for allowing it is efficiency under pressure: a stretched chaplain, a development associate writing on behalf of a leader, a counselor synthesizing notes for a busy week. The case against it is that the medium of human presence is the substance of the work. Both views are held by serious people. Where your team lands is a definitional choice about what your organization is for.",
    positionA:
      "Position A — Disclosure makes it acceptable. With clear disclosure, AI assistance in drafting pastoral or clinical correspondence is no different from using a search tool or a writing reference. The relationship is preserved by transparency.",
    positionB:
      "Position B — Some categories are human-only by definition. Pastoral and clinical communication is not principally an information transfer; it is a relational act. AI cannot occupy the relational position even with disclosure, so its use degrades the relationship rather than augments it.",
  },
  {
    number: "02",
    question:
      "When is AI-generated content substantial enough to require disclosure to the people who receive it?",
    tension:
      "Almost no one disagrees that pure ghostwriting requires disclosure. Almost no one demands a footnote when AI checked a date. The contested middle is enormous: AI that drafts a skeleton you revise, AI that suggests three subject-line options and you pick one, AI that summarizes a meeting you sign off on. Reasonable teams draw the line in different places.",
    positionA:
      "Position A — Threshold-based disclosure. Disclose when AI generated more than a structural draft, when AI authored the tone, or when AI made a substantive recommendation. Below that, disclosure is unnecessary and would clutter normal communication.",
    positionB:
      "Position B — Always disclose presence. Any communication signed in a leader's voice that AI shaped at all should disclose that fact, even briefly. The threshold approach gives the organization too much latitude to pretend AI absence when it is present.",
  },
  {
    number: "03",
    question:
      "Should the organization publicly publish its position on AI, or treat it as an internal operational matter?",
    tension:
      "Publishing a public position invites scrutiny — donors, members, accreditors, and journalists may hold the organization to it. Keeping it internal preserves flexibility but creates a credibility gap when an incident surfaces and the organization cannot point to a public posture. The right answer depends on how the organization wants to be known.",
    positionA:
      "Position A — Publish. A public Acceptable Use Statement signals seriousness, invites accountability, and gives the people you serve a way to know what relationship they are in with you when they read your communications.",
    positionB:
      "Position B — Internal until tested. Hold the position internally until the organization has lived with it for a season. Premature publication creates obligations the organization may not yet be prepared to meet.",
  },
  {
    number: "04",
    question:
      "Does the leadership team agree on what categories of work AI should be prohibited from, or are different staff currently making different decisions?",
    tension:
      "The honest answer for most organizations is the second. A development director and a teaching pastor and a CFO are likely making different decisions about AI today, in good faith, with no shared standard. Discovering this is the point of the assessment. Whether to consolidate those decisions into a single standard is the question.",
    positionA:
      "Position A — Single organizational standard. AI prohibitions should be set at the organizational level and apply to everyone. Departmental variation creates unmanageable risk and inconsistent posture.",
    positionB:
      "Position B — Departmental discretion within a frame. The senior team sets a small number of organization-wide refusals; departments tune the rest based on the trust dynamics specific to their work.",
  },
  {
    number: "05",
    question:
      "Should staff be permitted to use AI tools the organization has not formally sanctioned?",
    tension:
      "Most organizations are operating under a shadow policy of permission today: staff use whatever they find useful, with no central register. Tightening this requires real work — building an inventory, naming approved tools, setting up an exceptions path. Loosening this further trades governance for convenience.",
    positionA:
      "Position A — Sanctioned tools only. Staff use only tools the organization has explicitly approved. Anything else is a policy violation. The constraint is the point.",
    positionB:
      "Position B — Permission with audit. Staff may use any reputable tool for non-sensitive work, but every tool in use must be registered in the inventory and reviewed quarterly. Constraint is achieved through visibility rather than restriction.",
  },
  {
    number: "06",
    question:
      "Is your board's role in AI governance fiduciary, advisory, or absent — and is that role appropriate to the risks involved?",
    tension:
      "The fiduciary framing — that AI governance expands the board's traditional duties of Care, Loyalty, and Obedience — is now the dominant position in nonprofit governance literature. Many boards have not yet been told this, and the senior leader is left holding what is effectively a board-level question alone. The discomfort of raising the question with a board is real; the cost of not raising it is larger.",
    positionA:
      "Position A — Fiduciary. The board owns AI risk in the same way it owns financial and legal risk, requiring explicit policy, periodic review, and incident reporting.",
    positionB:
      "Position B — Advisory. The senior leader owns AI operationally; the board provides guidance and ratifies major posture decisions but is not in the operational chain.",
  },
  {
    number: "07",
    question:
      "When AI produces an error that reaches the people you serve, who is responsible — the staff member, the organization, the AI vendor, or some combination?",
    tension:
      "This is the question your incident response plan will be tested against the day it is needed. Staff who use AI in good faith may produce harmful output without intent; the vendor's terms-of-service almost always disclaim responsibility; the organization is the entity the public relationship is with. The framing your team chooses now will determine whether staff feel safe naming an incident when one occurs.",
    positionA:
      "Position A — The organization owns the output. The staff member and the vendor are inside our process; the people we serve are in relationship with the organization, and the organization is responsible for what reaches them.",
    positionB:
      "Position B — Layered responsibility. The staff member is responsible for review; the organization is responsible for the standard the staff member was working under; the vendor is responsible for material flaws in the tool. Naming the layers is what makes future improvement possible.",
  },
  {
    number: "08",
    question:
      "Should AI be used in donor or member communications that are sent in the personal voice of leadership?",
    tension:
      "Major-donor letters, pastoral notes to members, presidential communications to alumni — these are formats that carry weight precisely because the recipient believes the leader wrote them. AI can produce passable versions of these letters in seconds. Whether that production preserves or undermines the trust the format was built on is the question.",
    positionA:
      "Position A — Permissible with disclosure or with substantive leader review. The leader's voice is preserved if the leader has reviewed and edited materially before signing.",
    positionB:
      "Position B — Off-limits in the personal voice. Communications signed in the leader's name should be drafted by the leader. AI can prepare research, lists, or talking points, but not the prose the leader's name is on.",
  },
  {
    number: "09",
    question:
      "What categories of data must never be shared with third-party AI tools, and is that list currently documented and followed?",
    tension:
      "Most organizations can name the categories in conversation — donor PII, pastoral records, clinical notes, board minutes, legal correspondence. The harder question is whether that list exists in a document any staff member could pull up before pasting. The gap between known-in-principle and accessible-in-practice is where the failures happen.",
    positionA:
      "Position A — Comprehensive list, narrowly read. The data-handling protocol exhaustively names what cannot be shared. Anything not on the list is permitted with normal judgment.",
    positionB:
      "Position B — Tiered approach. Some categories are absolute prohibitions; some require explicit approval; some are routinely permissible. The protocol's job is to make staff confident about which tier any given piece of data is in.",
  },
  {
    number: "10",
    question:
      "If a senior leader were impersonated tomorrow by an AI deepfake, would your team know what to do — and is the response time fast enough?",
    tension:
      "Voice cloning fraud rose more than four hundred percent year over year in 2025, and senior officials in faith and government sectors have been impersonated at scale. The probability that your organization will encounter an impersonation incident in the next twenty-four months is meaningfully nonzero. Whether you have a written response plan rehearsed enough to execute under pressure is the actual question.",
    positionA:
      "Position A — Plan rehearsed and tested. There is a written incident response plan, the senior team has walked through it, the on-call rotation is named, and the first-hour communication template is drafted.",
    positionB:
      "Position B — Plan exists but untested. There is a document, but no one has rehearsed it. Speed in the first hour is uncertain.",
  },
  {
    number: "11",
    question:
      "Are there specific applications of AI that your organization should refuse on principle — regardless of pressure, efficiency gains, or peer adoption?",
    tension:
      "Movemental's position is that publicly named refusals are themselves formative — that the act of declaring what your organization will not do shapes what your organization is. Many leaders agree in principle and have never written the list. The exercise of writing it is more revealing than the document that results.",
    positionA:
      "Position A — Named refusals as institutional identity. Publish a small list of refusals; treat them as load-bearing; revise rarely and only with deliberation.",
    positionB:
      "Position B — Refusals as private posture. Hold refusals internally; let them shape decisions without making them public commitments. Public lists invite manipulation by adversaries who will probe the edges of what is named.",
  },
  {
    number: "12",
    question:
      "Is your organization currently using AI tools that no one in leadership has explicitly authorized?",
    tension:
      "The answer is almost certainly yes, and the work is to surface the tools rather than to litigate the answer. The vendor inventory is the artifact that closes this gap. Until it exists, this question functions as a temperature check — how surprised would the senior team be by a complete list of AI tools in use across the organization today?",
    positionA:
      "Position A — Probably not many; staff would have flagged most of them. The senior team has high confidence in what is in use.",
    positionB:
      "Position B — Almost certainly several. Free tools, browser extensions, and embedded features in existing software are likely in active use without leadership awareness.",
  },
  {
    number: "13",
    question:
      "Should the people you serve be told when AI has substantially shaped a communication addressed to them — even if disclosure makes the communication feel less personal?",
    tension:
      "Disclosure has an aesthetic cost: a footer line about AI assistance can shift the felt register of a personal note toward the institutional. The benefit is honesty. Whether the felt cost or the integrity benefit weighs more is the question, and reasonable teams do not agree.",
    positionA:
      "Position A — The felt cost is acceptable. Disclosure is a small editorial loss compared with the trust gain of consistent honesty. Train recipients to read the footer.",
    positionB:
      "Position B — The felt cost is the loss the format cannot afford. For categories where the personal register is the point — sympathy notes, recognition letters, personal pastoral communication — disclosure undermines the act. Solve it by not using AI in those categories rather than by disclosing.",
  },
  {
    number: "14",
    question:
      "Does your staff have a shared understanding of what AI is for at your organization, or are individuals making individual decisions?",
    tension:
      "The honest answer for most organizations is the second. Each person is forming a personal stance shaped by their own experiments, their own concerns, and their own peer conversations. A shared understanding does not emerge spontaneously; it is produced by an explicit process of conversation and ratification, which is what the Safety stage exists to do.",
    positionA:
      "Position A — There is enough alignment. Staff broadly understand the posture without it being formally documented.",
    positionB:
      "Position B — There is alignment in conversation but not in writing. Two staff members would describe the organization's AI posture differently if asked separately, even if neither could say what the disagreement is about.",
  },
  {
    number: "15",
    question:
      "Are you ready, today, to defend your organization's AI posture to a board member, a major donor, or an accreditor who asked sharp questions about it?",
    tension:
      "This is the integration question the assessment closes on. It tests whether the artifacts cohere and whether the senior team can speak from them under pressure. The answer is rarely yes for organizations that have not done the Safety work; the answer is rarely no for organizations that have.",
    positionA:
      "Position A — Yes, with confidence. The senior team can articulate the posture, point to the artifacts, and walk a serious questioner through the reasoning behind each.",
    positionB:
      "Position B — Not yet. The senior team has views but cannot assemble them into a defensible account on the spot. The toolkit, taken seriously, closes this gap.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 4 data — common mistakes                                          */
/* -------------------------------------------------------------------------- */

interface Mistake {
  number: string;
  title: string;
  body: string;
}

const COMMON_MISTAKES: readonly Mistake[] = [
  {
    number: "01",
    title: "The unilateral staff member",
    body:
      "One person — often a junior staff member, sometimes a senior one — makes AI decisions for the whole organization without explicit authority. Because the decisions are operational and small at first, no one objects. By the time the pattern is visible at the senior team level, the staff member has effectively set the organization's AI posture. The remedy is not to discipline the staff member; the remedy is to recognize that the senior team has implicitly delegated a posture-setting function to operations and to reclaim it.",
  },
  {
    number: "02",
    title: "The technology-first trap",
    body:
      "The organization picks a tool, a vendor, or a platform before deciding what they want it to do or what they want it not to do. The vendor's defaults become the organization's posture. Six months later the organization is editing a vendor's positioning into its own materials and discovering that the things it would have refused on principle are now embedded in workflows. The remedy is the order of the Sequence — Safety first, Solutions last — applied at the smallest scale: any tool decision is preceded by the relevant Safety artifact.",
  },
  {
    number: "03",
    title: "The unauthorized chatbot",
    body:
      "A volunteer, a contractor, or a junior staff member deploys a public-facing chatbot using the organization's name, brand, or content. The chatbot answers questions about giving, membership, counseling, or theology in ways the organization has not sanctioned. Sometimes the chatbot is helpful. Often it is wrong. Always it is unauthorized. The remedy is the Vendor and Tool Inventory plus a clear authorization path: any public-facing AI deployment requires explicit senior-team approval, full stop.",
  },
  {
    number: "04",
    title: "The disclosure gap",
    body:
      "AI is used in the organization's communications and not disclosed. No one is hiding anything; the omission is a default of busyness. Then a thoughtful donor or member asks whether the leader's last letter was AI-assisted. The leader does not know how to answer. The trust loss is gradual and difficult to measure but it is real. The remedy is the Disclosure Standard, written before the question is asked.",
  },
  {
    number: "05",
    title: "The fiduciary blind spot",
    body:
      "The board has not engaged AI governance because no one has framed it as a fiduciary question. Boards are designed to govern risk, finance, and reputational exposure; AI is all three. The senior leader who treats AI as an operational matter alone is carrying a board-level risk without the board's explicit cover. The remedy is a single twenty-minute item on the next board agenda: 'AI posture, current state, artifacts in development, recommended cadence for review.'",
  },
];

/* -------------------------------------------------------------------------- */
/*  Section 6 data — named refusals                                           */
/*                                                                            */
/*  [REVIEW] This list is opinionated and intended to be quotable. Brad,     */
/*  Alan, and Josh should review the list and the rationale for each.        */
/* -------------------------------------------------------------------------- */

interface Refusal {
  number: string;
  refusal: string;
  rationale: string;
  alternative: string;
}

const NAMED_REFUSALS: readonly Refusal[] = [
  {
    number: "01",
    refusal:
      "We refuse AI used to make eligibility determinations for services, programs, or membership.",
    rationale:
      "Eligibility determinations are decisions about who a community accepts, serves, or excludes. The opacity of AI scoring systems, combined with documented bias in training data, means that an AI-mediated eligibility decision is a decision the organization cannot fully account for. The people who are denied have a right to a reason a human can give them.",
    alternative:
      "Decisions stay with humans. AI may surface relevant context, but the determination — and the explanation that accompanies it — is human work.",
  },
  {
    number: "02",
    refusal:
      "We refuse AI used to surveil the behavior, attendance, or giving patterns of the people we serve in ways that change how we treat them.",
    rationale:
      "Mission-driven organizations exist on a covenant of attention rather than measurement. AI-driven behavioral profiling — predicting which donors are about to lapse, which members are about to leave, which students are at risk — changes the felt relationship from one of presence to one of monitoring. Even when the predictions are accurate, the relationship that produced them is no longer the relationship the people thought they had.",
    alternative:
      "Aggregate analysis to inform organizational learning is fine; individualized predictive scoring that drives differential treatment is not.",
  },
  {
    number: "03",
    refusal:
      "We refuse AI used to generate fundraising appeals, mission communications, or pastoral content in the personal voice of staff or beneficiaries without disclosure.",
    rationale:
      "Personal-voice communication carries weight precisely because the recipient believes a person they trust wrote it. Generating this content with AI — without disclosure — borrows the trust attached to the personal voice for a communication the named person did not actually write. The trust is not renewable once it has been consumed this way at scale.",
    alternative:
      "AI may research, prepare drafts, or surface phrasing options; the published communication is written by the named person, or, where AI assistance was substantive, the assistance is disclosed.",
  },
  {
    number: "04",
    refusal:
      "We refuse AI used in pastoral, clinical, or counseling relationships that require irreducible human presence.",
    rationale:
      "These relationships are not principally information transfers; they are acts of presence. AI cannot occupy the position of presence even when it produces fluent language. The relational form is the substance of the work, not its delivery mechanism.",
    alternative:
      "Operational support around these relationships — scheduling, transcription with consent, summary for one's own recall — may be acceptable in narrow categories with the disclosed and informed consent of the people in the relationship.",
  },
  {
    number: "05",
    refusal: (
      "We refuse AI deepfakes, voice clones, and impersonations of any kind — including of historical figures, denominational or institutional leaders, or current staff."
    ),
    rationale:
      "Voice cloning and AI impersonation are now the dominant fraud vector in the FBI's tracked AI-attributed losses, and faith-sector leaders have been impersonated at scale across multiple denominations and continents. Beyond the fraud risk, deepfaked speech in the voice of historical or current religious figures puts words into mouths they did not speak — an act of forgery the trust environment cannot absorb.",
    alternative:
      "Quote, attribute, and disclose. Where dramatized voicing is desired (audiobooks, accessibility), use a clearly labeled voice actor or a clearly synthetic narrator.",
  },
  {
    number: "06",
    refusal:
      "We refuse AI chatbots that present themselves as human, that impersonate specific staff members, or that operate without clear disclosure of their nature.",
    rationale:
      "Nearly one in three U.S. adults already say spiritual advice from AI is as trustworthy as advice from a pastor. The category boundary between AI assistance and pastoral relationship is collapsing in the public's perception, and chatbots that obscure their nature accelerate the collapse. An organization that is in the trust business cannot deploy machinery that trades on the ambiguity.",
    alternative:
      "AI assistants are clearly named, clearly bounded, and clearly differentiated from staff. Their prompts explicitly direct users to a human for pastoral, clinical, or sensitive matters.",
  },
  {
    number: "07",
    refusal:
      "We refuse AI used to replace prayer, lament, blessing, or other irreducibly human spiritual practices.",
    rationale:
      "These practices are not productions in need of efficiency; they are constitutive acts of the community that performs them. The temptation to outsource them to systems that can produce fluent religious language is real, especially under the time pressures most leaders work under. Yielding to it changes what the community is doing when it gathers.",
    alternative:
      "AI may help a leader prepare to lead these practices — research, language exploration, draft framings — but the practice itself is performed by humans.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page composition                                                          */
/* -------------------------------------------------------------------------- */

export function ToolkitReadContent() {
  return (
    <CitationsProvider claims={TOOLKIT_CLAIMS}>
      <Hero />
      <AuthorNote />
      <HowToUse />
      <WhySafetyIsFirst />
      <SevenArtifacts />
      <SelfAssessment />
      <CommonMistakes />
      <MvpPreview />
      <NamedRefusals />
      <BackMatter />
      <ReferencesRail />
    </CitationsProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <Section variant="default" spacing="lg" className="border-b border-border" aria-labelledby="toolkit-read-hero-title">
      <Container>
        <Reveal>
          <span className="mb-6 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
            A Movemental Field Guide · Version 1.0 · 2026
          </span>
          <h1
            id="toolkit-read-hero-title"
            className="mb-10 max-w-4xl font-serif-display text-5xl italic leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            It Starts With Safety.
          </h1>
          <p className="mb-8 max-w-2xl font-serif-display text-2xl italic leading-snug text-muted-foreground md:text-3xl">
            A field guide for organizational leaders navigating AI.
          </p>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Brad Brisco · Alan Hirsch · Joshua Shepherd
          </p>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Sixteen pages. About a thirty-minute read on your own; about ninety
            minutes if you take the self-assessment with your leadership team,
            which is what we&rsquo;d actually recommend. The disagreement that
            surfaces in that ninety minutes is the work this field guide
            exists to start.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ToolkitOpenButton source="toolkit-read-hero" variant="primary">
              Download the PDF
            </ToolkitOpenButton>
            <Link href="/contact?interest=safety" className="btn-pill btn-pill--ghost">
              Start a conversation
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Author note                                                               */
/* -------------------------------------------------------------------------- */

function AuthorNote() {
  return (
    <Section variant="section" spacing="sm" aria-labelledby="toolkit-read-author-title">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-(--prose-max)">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              From the authors
            </span>
            <h2
              id="toolkit-read-author-title"
              className="mb-8 font-serif-display text-3xl italic tracking-tight text-foreground md:text-4xl"
            >
              A note before you read.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                We wrote this field guide because the public material on AI for
                mission-driven organizations is, at present, mostly two
                kinds of writing. The first is vendor copy &mdash; useful for
                what it is, but written from the inside of a sales motion.
                The second is speculative theology &mdash; valuable, but
                written from outside the daily work of leading an
                organization through a transition.
              </p>
              <p>
                This document is neither. It is a field guide written from
                the seat of the senior leader who has to hold the
                organization together through a season the technology will
                keep moving. We are also a company; we sell facilitation of
                exactly this work. We have tried to make the guide useful
                whether or not your organization ever engages us.
              </p>
              <p>
                Most of the value here is unlocked by reading it with your
                leadership team rather than alone. The self-assessment in
                Section&nbsp;3 is the load-bearing part: it is calibrated to
                produce disagreement among thoughtful leaders, and that
                disagreement is what reveals where the actual governance
                work needs to happen. Read the sections in order, mark the
                parts that surprise you, and bring the marks to the next
                conversation your senior team has.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How to use                                                                */
/* -------------------------------------------------------------------------- */

function HowToUse() {
  return (
    <Section variant="default" spacing="sm" aria-labelledby="toolkit-read-howto-title">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-(--prose-max)">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              How to use this field guide
            </span>
            <h2
              id="toolkit-read-howto-title"
              className="mb-8 font-serif-display text-3xl italic tracking-tight text-foreground md:text-4xl"
            >
              Read it with the team that will live with the answers.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Most of the value in this document comes from reading it
                with the leadership team that will be responsible for AI
                governance at your organization. That is usually some
                combination of the senior leader, the executive team, the
                board chair, the staff lead for technology, and one or two
                trusted longtime members.
              </p>
              <p>
                The arc is straightforward. Section&nbsp;1 makes the
                argument for putting Safety first. Section&nbsp;2 names the
                seven artifacts a Safety engagement produces.
                Section&nbsp;3 is the self-assessment &mdash; the part you
                take together. Section&nbsp;4 names the patterns of
                failure most organizations stumble into. Section&nbsp;5
                describes the two-week facilitated engagement Movemental
                offers, and is honest about when you should not hire us.
                Section&nbsp;6 names refusals &mdash; the AI applications
                we believe mission-driven organizations should refuse on
                principle.
              </p>
              <p>
                <em>
                  Disagreement among your team is the point of the
                  self-assessment, not a problem with it. If your team
                  aligns easily on all fifteen questions, either you are
                  unusually well-formed or the questions need to be taken
                  more seriously.
                </em>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 1 — Why Safety is first                                           */
/* -------------------------------------------------------------------------- */

function WhySafetyIsFirst() {
  return (
    <Section variant="section" spacing="lg" aria-labelledby="toolkit-read-why-title">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Section 1
            </span>
            <h2
              id="toolkit-read-why-title"
              className="mb-10 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
            >
              Why Safety is first.
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                AI is already inside your organization. Across the
                nonprofit sector, ninety-two percent of organizations now
                report using AI in some capacity, while only seven percent
                report a major capability improvement
                <Cite claimId="nonprofit-92-adoption" />. The pattern is
                broad adoption with shallow returns, and it is not unique
                to nonprofits: the same shape appears in cross-sector
                enterprise data, in church-leader surveys, and in
                higher-education research.
              </p>
              <p>
                The shape gets sharper when you look at how the adoption is
                happening. Eighty-one percent of nonprofit organizations
                report using AI individually and on an ad hoc basis;
                only four percent have documented, repeatable AI
                workflows
                <Cite claimId="nonprofit-81-adhoc" />. In the church
                sector, sixty percent of leaders personally use AI at
                least monthly, but only thirty-three percent report their
                church is using AI in any operational capacity, and only
                five percent of churches have an established AI policy
                <Cite claimId="barna-pushpay-church-tech-2026" />. Among
                Protestant senior pastors specifically, ten percent are
                regular users and thirty-two percent are experimenting,
                with eighty-four percent worried about the reliability of
                AI-generated content
                <Cite claimId="lifeway-pastor-42-use" />.
              </p>
              <p>
                Read together, these numbers describe a sector that has
                crossed the adoption threshold without crossing the
                governance threshold. Most organizations are mirroring
                whatever is in the room: the staff member who arrived with
                a workflow, the vendor who moved fastest, the volunteer who
                deployed the chatbot. Most are not the organizations that
                have decided what AI is for.
              </p>
              <p>
                The differentiator between the broad field and the
                organizations producing real capability gain is now
                documented across at least four independent
                <span>&nbsp;</span>2025&ndash;2026 studies as a five to
                seven percent high-performer cohort
                <Cite claimId="high-performer-cohort-5-7" />. McKinsey
                identifies workflow redesign as the single strongest
                correlate of AI EBIT impact: high performers are 3.6&times;
                more likely to pursue transformative change, and 55%
                have fundamentally redesigned at least some workflows,
                versus roughly 20% sector-wide
                <Cite claimId="mckinsey-workflow-redesign" />. BCG&rsquo;s
                &ldquo;future-built&rdquo; cohort shows the same shape;
                MIT NANDA finds the same shape inside individual
                pilots. Across the four studies, the cohort is small,
                stable, and differentiated by organizational work, not by
                tools.
              </p>
              <p>
                Safety is what gets a mission-driven organization into that
                cohort. Forty-seven percent of nonprofits today have no AI
                governance policy at all
                <Cite claimId="nonprofit-47-no-policy" />, and the
                fiduciary framing for the gap is now the dominant position
                in nonprofit governance literature: AI oversight expands
                the board&rsquo;s traditional duties of Care, Loyalty, and
                Obedience
                <Cite claimId="forvis-fiduciary-ai" />. Senior leaders who
                treat AI as an operational matter alone are carrying a
                board-level risk without the board&rsquo;s explicit cover.
              </p>
              <p>
                The risk is not abstract. The FBI&rsquo;s 2025 Internet
                Crime Complaint Center report broke out AI-enabled fraud
                as a dedicated category for the first time and recorded
                $893&nbsp;million in adjusted losses across 22,364
                AI-flagged complaints in a single year, with voice cloning
                fraud rising more than four hundred percent year over year
                <Cite claimId="fbi-ic3-893m" />. Faith-sector leaders have
                been impersonated at scale across multiple denominations
                and continents in the same period.
              </p>
              <p>
                <em>
                  The argument for putting Safety first is not that
                  governance is more interesting than tools. The argument
                  is that the data, taken together, says the human work
                  &mdash; deciding what AI is for, naming the categories
                  it should not touch, governing what is in use &mdash;
                  is the input that predicts whether the technology
                  produces capability gain or just another expense line.
                </em>
              </p>
              <p>
                Safety is not a policy template. It is the prior question
                policy templates downstream from. When the prior question
                is unanswered, the templates do its work badly, and the
                organization spends the next three years retrofitting
                decisions it should have made consciously.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 2 — The seven artifacts                                           */
/* -------------------------------------------------------------------------- */

function SevenArtifacts() {
  return (
    <Section variant="default" spacing="lg" aria-labelledby="toolkit-read-artifacts-title">
      <Container>
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Section 2
            </span>
            <h2
              id="toolkit-read-artifacts-title"
              className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
            >
              The seven artifacts.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              A Safety engagement produces seven concrete documents. Each one
              is short. Each one is signed and ratified. Together they make
              up the foundation any later AI deployment can stand on. The
              descriptions below are substantively richer than the public
              landing page&rsquo;s; they are written so a senior team can
              begin drafting their own first versions.
            </p>
          </div>
          <div className="space-y-16">
            {ARTIFACTS.map((artifact) => (
              <article key={artifact.number} className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="md:col-span-3">
                  <span className="mb-2 block font-serif-display text-5xl italic text-muted-foreground/60">
                    {artifact.number}
                  </span>
                  <h3 className="font-serif-display text-2xl text-foreground">{artifact.title}</h3>
                </div>
                <div className="md:col-span-9">
                  <p className="mb-5 text-lg italic leading-relaxed text-foreground">
                    {artifact.definition}
                  </p>
                  <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                    {artifact.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-border pt-5">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      In practice
                    </span>
                    <p className="text-base leading-relaxed text-muted-foreground">{artifact.inPractice}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 3 — The self-assessment (the centerpiece)                         */
/* -------------------------------------------------------------------------- */

function SelfAssessment() {
  return (
    <Section variant="section" spacing="lg" aria-labelledby="toolkit-read-assessment-title">
      <Container>
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Section 3 — The self-assessment
            </span>
            <h2
              id="toolkit-read-assessment-title"
              className="mb-8 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
            >
              Take this together.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                This is not a quiz. It is not a diagnostic. It is not a
                marketing tool. It is fifteen questions calibrated to
                produce disagreement among thoughtful leaders, written so
                that the disagreement that surfaces is the part that
                matters.
              </p>
              <p>
                <em>How to take it.</em> Each member of the leadership
                team writes their own answer first &mdash; literally
                writes it &mdash; before any conversation happens. Then
                you compare. Most teams who take the assessment seriously
                discover that they disagreed on three to five questions
                they would not have predicted in advance. That discovery
                is what reveals where the governance work is actually
                needed.
              </p>
              <p>
                <em>What to expect.</em> The two example positions under
                each question are not right and wrong. They are
                competing reasonable views, and serious leaders hold both.
                If your team aligns easily on all fifteen, either you are
                unusually well-formed (and probably ready for the next
                stage of the path) or you have not yet engaged the
                questions seriously enough.
              </p>
            </div>
          </div>
          <ol className="space-y-12">
            {ASSESSMENT_QUESTIONS.map((q) => (
              <li
                key={q.number}
                className="grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-2">
                  <span className="font-serif-display text-4xl italic text-muted-foreground/60">{q.number}</span>
                </div>
                <div className="md:col-span-10">
                  <h3 className="mb-4 font-serif-display text-2xl italic leading-snug text-foreground md:text-3xl">
                    {q.question}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground">{q.tension}</p>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    <div className="rounded-md border border-border bg-card p-5">
                      <p className="text-sm leading-relaxed text-foreground">{q.positionA}</p>
                    </div>
                    <div className="rounded-md border border-border bg-card p-5">
                      <p className="text-sm leading-relaxed text-foreground">{q.positionB}</p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-md border border-dashed border-border bg-background p-5">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      Where your team landed
                    </span>
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      Note the position, the disagreement, and what the
                      next conversation needs to resolve.
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-20 max-w-3xl border-t border-border pt-10">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              What to do with what you discovered
            </span>
            <h3 className="mb-6 font-serif-display text-3xl italic tracking-tight text-foreground md:text-4xl">
              Read the disagreement, then decide.
            </h3>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                <em>If your team disagreed on three to five questions:</em>{" "}
                this is the typical pattern, and it indicates that the team
                is ready to do Safety work but has not yet aligned. The
                facilitated Safety engagement is designed for exactly this
                situation: two weeks, seven ratifiable artifacts, the
                disagreement adjudicated and recorded.
              </p>
              <p>
                <em>If your team disagreed on six or more questions:</em>{" "}
                this indicates significant fragmentation in the
                organization&rsquo;s posture. Safety is essential, and the
                Sandbox engagement that follows is likely to surface
                use-case-specific disagreements that need facilitation as
                well.
              </p>
              <p>
                <em>If your team disagreed on fewer than three:</em> this
                indicates either unusual alignment (in which case you may
                be ready for Sandbox directly) or that the team has not
                engaged the questions seriously. Re-take the assessment
                with each member writing their honest answer privately
                first; the disagreement that emerges is usually larger
                than the in-person conversation suggested.
              </p>
              <p>
                In all cases the next step is the same: have the
                conversation about what you discovered. With your team if
                you want to do the work yourselves. With Movemental if
                you want help.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact?interest=safety" className="btn-pill btn-pill--primary">
                Start a conversation
              </Link>
              <Link href="/pathway/safety" className="btn-pill btn-pill--ghost">
                See the Safety stage
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 4 — Common mistakes                                               */
/* -------------------------------------------------------------------------- */

function CommonMistakes() {
  return (
    <Section variant="default" spacing="lg" aria-labelledby="toolkit-read-mistakes-title">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Section 4
            </span>
            <h2
              id="toolkit-read-mistakes-title"
              className="mb-6 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
            >
              Common mistakes.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Five named patterns of failure. Each one is endemic. Each
              one is preventable. Most organizations stumble into at
              least two of the five before recognizing the pattern.
            </p>
          </div>
          <div className="space-y-12">
            {COMMON_MISTAKES.map((mistake) => (
              <article key={mistake.number} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <span className="mb-2 block font-serif-display text-5xl italic text-muted-foreground/60">
                    {mistake.number}
                  </span>
                  <h3 className="font-serif-display text-2xl italic text-foreground">{mistake.title}</h3>
                </div>
                <div className="md:col-span-9">
                  <p className="text-lg leading-relaxed text-muted-foreground">{mistake.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 5 — The two-week MVP preview                                      */
/* -------------------------------------------------------------------------- */

function MvpPreview() {
  return (
    <Section variant="elevated" spacing="lg" aria-labelledby="toolkit-read-mvp-title">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Section 5
            </span>
            <h2
              id="toolkit-read-mvp-title"
              className="mb-8 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
            >
              The two-week facilitated Safety engagement.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              This is the only openly promotional section of the field
              guide. We have tried to make it useful even if you decide
              to do the work yourselves.
            </p>

            <div className="space-y-10 text-base leading-relaxed text-muted-foreground">
              <div>
                <h3 className="mb-3 font-serif-display text-xl text-foreground">What we do</h3>
                <p>
                  Two weeks. Four working sessions, roughly eight hours
                  of synchronous facilitation, plus asynchronous drafting
                  and editing. The output is the seven artifacts named in
                  Section&nbsp;2 &mdash; fully drafted, ready for board
                  ratification &mdash; plus a Sandbox Readiness Assessment
                  that names what the next stage of the path looks like
                  for your specific organization.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-serif-display text-xl text-foreground">What it costs</h3>
                <p>
                  $1,000. Net 15 from signing. No retainers. No success
                  fees. The flat fee is part of the design: pricing is not
                  the place we hide misalignment about scope.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-serif-display text-xl text-foreground">When you should work with us</h3>
                <p>
                  When the leadership team has been unable to make
                  progress on the seven artifacts on their own. When
                  internal disagreement on the assessment questions would
                  benefit from external facilitation. When the timeline
                  to a board meeting, an audit, or a major deployment
                  decision means six months of intermittent internal
                  drafting is not available. When the cost of getting
                  this wrong is larger than the engagement fee.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-serif-display text-xl text-foreground">When you should do this yourselves</h3>
                <p>
                  When you have the team capacity to dedicate to
                  drafting. When the senior team is already in alignment
                  and the work is to write down what is already known.
                  When there is no external timeline pressure. When you
                  would rather invest the engagement fee in formation or
                  staff time. The toolkit, taken seriously, is enough.
                  We mean that.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact?interest=safety" className="btn-pill btn-pill--primary">
                Start a conversation
              </Link>
              <Link href="/pathway/safety" className="btn-pill btn-pill--ghost">
                See the Safety stage page
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section 6 — Named refusals                                                */
/* -------------------------------------------------------------------------- */

function NamedRefusals() {
  return (
    <Section variant="default" spacing="lg" aria-labelledby="toolkit-read-refusals-title">
      <Container>
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Section 6
            </span>
            <h2
              id="toolkit-read-refusals-title"
              className="mb-8 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl"
            >
              Named refusals.
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Most organizations have refusals already. They live in
                the unwritten norms a senior leader applies on a Tuesday
                without remarking on it: this letter does not get
                generated; this conversation does not get summarized;
                this category is human-only because it always has been.
                Writing them down is the moment they become institutional
                rather than personal.
              </p>
              <p>
                Below are seven refusals Movemental believes
                mission-driven organizations should hold. The list is
                opinionated. It is intended to be quoted, debated, and
                adapted to your specific context. Yours will probably
                differ in one or two places. The point is not that these
                are the only refusals worth holding; the point is that
                refusals on the record outlast the leader who held them
                privately.
              </p>
              <p>
                Below each refusal is the rationale &mdash; what the
                refusal protects &mdash; and the alternative, the
                category of work that does the same job without the
                harm.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {NAMED_REFUSALS.map((r) => (
              <article
                key={r.number}
                className="grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-3">
                  <span className="mb-2 block font-serif-display text-5xl italic text-muted-foreground/60">
                    {r.number}
                  </span>
                </div>
                <div className="md:col-span-9 space-y-5">
                  <p className="font-serif-display text-2xl italic leading-snug text-foreground md:text-3xl">
                    {r.refusal}
                  </p>
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      Rationale
                    </span>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {r.number === "05" ? (
                        <>
                          {r.rationale}
                          <Cite claimId="fbi-ic3-893m" />
                        </>
                      ) : r.number === "06" ? (
                        <>
                          {r.rationale}
                          <Cite claimId="barna-gloo-spiritual-trust-1-in-3" />
                        </>
                      ) : (
                        r.rationale
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      Alternative
                    </span>
                    <p className="text-base leading-relaxed text-muted-foreground">{r.alternative}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-(--prose-max) border-t border-border pt-10">
            <p className="text-lg leading-relaxed text-muted-foreground">
              <em>
                The act of publicly committing to specific refusals is
                itself a formative practice. The Vatican&rsquo;s 2025
                note Antiqua et Nova frames the same instinct in
                magisterial terms: AI &ldquo;should be used only as a
                tool to complement human intelligence rather than
                replace its richness&rdquo;
                <Cite claimId="antiqua-et-nova-complement" />. The
                organization that names what it will not do is the
                organization that has decided what it stands for.
              </em>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Back matter — About / How to start a conversation                         */
/* -------------------------------------------------------------------------- */

function BackMatter() {
  return (
    <Section variant="midnight" spacing="lg" aria-labelledby="toolkit-read-back-title">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-eyebrow text-inverse-muted">
              How to start a conversation
            </span>
            <h2
              id="toolkit-read-back-title"
              className="mb-8 font-serif-display text-4xl italic tracking-tight text-inverse-foreground md:text-5xl"
            >
              When you&rsquo;re ready to talk.
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-inverse-foreground/80">
              Email Josh directly at{" "}
              <a
                href="mailto:josh@movemental.ai"
                className="underline decoration-inverse-foreground/40 underline-offset-4 hover:decoration-inverse-foreground"
              >
                josh@movemental.ai
              </a>
              , or use the contact form. A first conversation is thirty
              minutes. We will tell you in that time whether the Safety
              engagement is a fit, and whether the timing is.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?interest=safety" className="btn-pill btn-pill--primary">
                Start a conversation
              </Link>
              <ToolkitOpenButton source="toolkit-read-closing" variant="midnight-primary">
                Send me the PDF
              </ToolkitOpenButton>
            </div>

            <div className="mx-auto mt-16 max-w-2xl border-t border-inverse-border pt-10 text-sm leading-relaxed text-inverse-foreground/70">
              <p className="mb-2 italic">
                It Starts With Safety &middot; Version 1.0 &middot; 2026
              </p>
              <p>
                Brad Brisco &middot; Alan Hirsch &middot; Joshua Shepherd.
                The full source list for every research claim cited above
                is rendered in the references rail below.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
