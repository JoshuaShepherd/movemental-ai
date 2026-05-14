/**
 * Shared four-stage path content — body of Safety, Sandbox, Skills, Solutions.
 *
 * The three audience pages (nonprofits, churches, institutions) all share the
 * same body content; only the case study and audience footer label differ.
 * Extracted verbatim from the path-sticky mockups in `docs/html/`.
 */

export type SafetyChecklistRow = {
  /** Roman numeral lower index — i, ii, iii … xiv. */
  index: string;
  /** Plain-text row title. */
  name: string;
  /** "An A grade looks like" body — may include `<strong>` and `<em>`. */
  example: string;
};

export type SandboxStep = {
  /** "Step 01", "Step 02"… */
  num: string;
  name: string;
  /** Body paragraph. May include `<strong>` and `<em>`. */
  body: string;
};

export type FormationWeek = {
  num: string;
  name: string;
  desc: string;
};

export type LessonType = {
  /** Bold-prefixed term ("Opening teaching."). */
  label: string;
  /** Description after the label. */
  desc: string;
};

export type BlueprintItem = {
  num: string;
  name: string;
  desc: string;
};

export type StageDoneAndWatch = {
  /** "Done when" checklist items. */
  done: ReadonlyArray<string>;
  /** "Watch for" body — supports `<em>` for italic-serif emphasis. */
  watch: string;
};

/* -------------------------------------------------------------------------- */
/*  Safety                                                                    */
/* -------------------------------------------------------------------------- */

/** The 6 quick "governance baseline" items shown above the disclosure. */
export const safetyQuickItems: ReadonlyArray<string> = [
  "Ownership is assigned",
  "AI posture is agreed",
  "Allowed and prohibited uses are written",
  "Sensitive data is classified",
  "Staff policy is published",
  "Review and update rhythm is scheduled",
];

/** The full 14-item Safety checklist with "An A grade looks like" examples. */
export const safetyChecklistRows: ReadonlyArray<SafetyChecklistRow> = [
  {
    index: "i.",
    name: "One leader and one decision group own this",
    example:
      "One senior leader — your executive director, chief of staff, or COO — is officially the person responsible for AI at the organization. A small group (your senior team plus one or two board members) meets on a recurring schedule to make AI decisions together. <strong>Both are written down, both are on the calendar, and every staff member knows who they are.</strong>",
  },
  {
    index: "ii.",
    name: "Leaders agree on what your organization believes about AI",
    example:
      "Your senior leaders have spent real time talking through what your organization believes about people, truth, privacy, and what should never be handed off to a machine — and they have written it down on one page in plain English. Faith-based organizations name where their faith draws the line. Other organizations name the values that draw it. <strong>Either way, the page is in your own words, not a template.</strong>",
  },
  {
    index: "iii.",
    name: "A short, signed list of “here is what we will and won’t do with AI”",
    example:
      "Five to ten clear sentences, written in your own words and signed by the leaders who actually run the organization, that say what you will and will not do with AI. <strong>Short enough to read out loud at the start of a staff meeting, specific enough to settle an argument</strong>, and used as the standard for every AI decision from now on.",
  },
  {
    index: "iv.",
    name: "A complete list of every kind of sensitive information you handle",
    example:
      "A simple spreadsheet listing every type of sensitive information your organization touches: donor names and contact info, the people you serve, employee records, financial data, counseling or case notes, legal records, partner agreements, and so on. For each one, you have written down where it is stored, why you have it, and how long you keep it. <strong>Nothing is missing.</strong>",
  },
  {
    index: "v.",
    name: "Information sorted into “safe to use” and “never use” groups",
    example:
      "Every type of information from your inventory is sorted into clear groups — <strong>fine to use with AI, okay with care, restricted, or never enters AI tools.</strong> The “never” list is short, specific, and written down. Any staff member can look at a document or a piece of information and know which group it falls into.",
  },
  {
    index: "vi.",
    name: "A short policy that tells staff what they can and can’t do with AI",
    example:
      "One short document — readable in under ten minutes by a brand-new hire — that says clearly what staff are allowed to do with AI, what they are not allowed to do, and why. Plain English, not legal language. Where it borrows rules from your AI tool’s own policy (ChatGPT, Claude, Microsoft Copilot, etc.), it quotes them directly so <strong>staff have one trusted source to point to when a donor, parent, or partner asks.</strong>",
  },
  {
    index: "vii.",
    name: "The AI tool is set up to follow your rules automatically",
    example:
      "The AI tools you have approved are set up so your policy is built in, not optional. That means: staff sign in with their work account (no personal accounts on the side), accounts are removed when people leave, the tool keeps a record of how it is used, and any tool that connects to your other systems has a named owner. If you handle health, legal, or other regulated information, that work lives in a separate, locked-down environment with the right contracts in place. <strong>A written policy the tool itself ignores does not count.</strong>",
  },
  {
    index: "viii.",
    name: "A clear plan for what to do when something goes wrong",
    example:
      "A short, written plan that says exactly what to do at each level of problem — from a near-miss (“I almost pasted donor info into ChatGPT”) to a real exposure (“a draft with a beneficiary’s name was sent to a vendor”). The plan names <strong>who to tell, how fast, and what happens next.</strong> Staff who report a near-miss are not punished, and near-misses are tracked in a simple log so you can see patterns before they become incidents.",
  },
  {
    index: "ix.",
    name: "All of these documents live in one easy-to-find place",
    example:
      "Your beliefs page, AI policy, data list, “never” list, incident plan, and a short glossary all live in one folder or page that any staff member can find from the staff homepage in <strong>less than thirty seconds.</strong> If a new hire on day one cannot find it that fast, it does not yet exist.",
  },
  {
    index: "x.",
    name: "A practice run of “what if something goes wrong”",
    example:
      "Before any real incident happens, your senior team sits down together and walks through a realistic scenario — for example, <em>“a staff member uploaded a donor list to an unapproved AI tool”</em> — step by step, with the actual people who would handle it. The exercise exposes gaps you didn’t see on paper, and <strong>the plan gets fixed afterward, before a real incident teaches the same lessons more expensively.</strong>",
  },
  {
    index: "xi.",
    name: "Every staff member has read and signed the AI policy",
    example:
      "Every single staff member who has access to AI tools has signed your AI policy. The list of who signed is checked against your HR roster — not against memory, not “most people.” <strong>This is the clear gate: nobody starts using AI on real work until everyone has signed.</strong>",
  },
  {
    index: "xii.",
    name: "A one-page public statement, ready before anyone asks",
    example:
      "One page, written in your voice, that you can hand to your board, a regulator, a funder, a major donor, your denomination, an accreditor, or a key partner if they ask <em>“how does your organization use AI?”</em> It exists <strong>before the first time anyone asks the question</strong>, and staff use the same wording so the answer is consistent across the organization.",
  },
  {
    index: "xiii.",
    name: "A regular schedule of check-ups, on the calendar",
    example:
      "Every quarter, your decision group reviews the AI tool’s usage records, who has access to what, and whether the rules about how long data is kept are being followed. Every month, your senior team sees usage numbers. Each review is on the calendar with a name next to it. <strong>If it is not on the calendar, it does not happen.</strong>",
  },
  {
    index: "xiv.",
    name: "A way to update the policy as you learn",
    example:
      "Every incident, near-miss, or experiment that didn’t go as planned ends with one question: <em>“What should we change in our training, policy, or tools so this is less likely next time?”</em> The policy is dated and numbered (v1.0, v1.1, v1.2…) with a short list of what changed and when. <strong>A policy that has never been updated is a policy that has not yet met the real world.</strong>",
  },
];

export const safetyDoneWatch: StageDoneAndWatch = {
  done: [
    "Leaders agree on what is allowed, discouraged, and prohibited",
    "Sensitive information has been classified clearly",
    "Staff know the policy exists and can find it",
    "There is a plan for what happens when something goes wrong",
  ],
  watch:
    "If Safety is skipped, <em>staff form habits before standards exist</em>.",
};

/* -------------------------------------------------------------------------- */
/*  Sandbox                                                                   */
/* -------------------------------------------------------------------------- */

/** The two pact rules. */
export const sandboxRules: ReadonlyArray<{
  num: string;
  title: string;
  body: string;
}> = [
  {
    num: "Rule 01",
    title: "Nothing made in the sandbox gets published.",
    body: "While experiments are running, AI-generated work doesn’t leave the organization. Not to donors, not to the public, not to the people you serve. The sandbox is for learning what works — not for shipping it. Anything that ships goes through a separate approval step after the experiment is done.",
  },
  {
    num: "Rule 02",
    title:
      "Private information stays private — by process, not by promise.",
    body: "Before any experiment runs, you have a real, trained procedure for keeping sensitive information out of AI tools. Not a memo people skim — an actual process every staff member has been walked through. If a privacy breach is even possible, the experiment doesn’t run yet.",
  },
];

export const sandboxBridge =
  "With both rules in place, your team is free to actually explore — to find where AI saves time on tedious work, helps generate revenue, or raises the quality of what you produce. Those three places are where most of the value lives.";

export const sandboxSteps: ReadonlyArray<SandboxStep> = [
  {
    num: "Step 01",
    name: "Recipes",
    body: "Movemental brings a starting list of proven AI use cases — across fundraising, communications, programs, and operations. Your team picks the ones worth testing for your organization.",
  },
  {
    num: "Step 02",
    name: "Experiment",
    body: "Each use case gets a designated owner and runs as a structured experiment, using anonymized examples or made-up data. No real donors, no real client records, no real financials.",
  },
  {
    num: "Step 03",
    name: "Log the value",
    body: "Every experiment is logged in one shared place — what was tried, what worked, and what kind of value it produced (time saved, revenue generated, or quality improved). AI helps assess the value; a human reviews every entry.",
  },
  {
    num: "Step 04",
    name: "Open visibility",
    body: "The whole organization can see the running list. Anyone on staff can flag an ethical or trust concern on any use case — no special training, no permission needed.",
  },
  {
    num: "Step 05",
    name: "Governance review",
    body: "At the end of the eight weeks, your decision group reviews each use case — its value, and any concerns staff flagged — and assigns one of three lights:",
  },
];

/** Traffic-light statuses. The dot colors are the only allowed raw hex values
 *  in the path components — they encode semantic green / yellow / red status
 *  per the design spec. */
export const sandboxLights: ReadonlyArray<{
  tone: "green" | "yellow" | "red";
  name: string;
  desc: string;
}> = [
  {
    tone: "green",
    name: "Green light",
    desc: "Clear value, no concerns. Ready to use across the team.",
  },
  {
    tone: "yellow",
    name: "Yellow light",
    desc: "Real value, but only with specific guardrails — <em>used this way, and only this way.</em>",
  },
  {
    tone: "red",
    name: "Red light",
    desc: "Off the table. Added to the “never” list, alongside the boundaries from Safety.",
  },
];

export const sandboxOutcome =
  "What you walk away with is a recipe book your organization actually agreed on.";

export const sandboxDoneWatch: StageDoneAndWatch = {
  done: [
    "Experiments avoid private or sensitive data",
    "Each experiment has an owner",
    "Learning is captured in one shared place",
    "Leadership can see what is working, what is risky, and what should stop",
  ],
  watch:
    "If Sandbox is skipped, experimentation goes <em>private, scattered, and impossible to learn from</em>.",
};

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

export const formationWeeks: ReadonlyArray<FormationWeek> = [
  {
    num: "Week 01",
    name: "Orientation",
    desc: "The course promise, the cohort, and the question every staff member already lives with: when should I use AI, and when shouldn’t I?",
  },
  {
    num: "Week 02",
    name: "Discernment",
    desc: "How to tell plausible from good. The first thing staff need is the ability to see drift before it becomes a habit.",
  },
  {
    num: "Week 03",
    name: "Authorship",
    desc: "Staying in control of the work. Using AI without letting it become the senior author in the room.",
  },
  {
    num: "Week 04",
    name: "Verification",
    desc: "Checking facts, tone, and integrity. Treating every assisted output as unverified until it’s verified.",
  },
  {
    num: "Week 05",
    name: "Stewardship",
    desc: "What AI doesn’t touch. Knowing where the lines are — and why some lines aren’t efficiency questions.",
  },
  {
    num: "Week 06",
    name: "Prompting as thinking",
    desc: "Writing prompts that read like a well-written internal brief. (That’s the actual skill.)",
  },
  {
    num: "Week 07",
    name: "Workflow thinking",
    desc: "Putting AI inside the actual shape of real work, so what one person learns is something the whole team can run.",
  },
  {
    num: "Week 08",
    name: "Synthesis & sending",
    desc: "Pulling the whole arc together. A 30/60/90 day plan. A real sending into the work, not a graduation.",
  },
];

export const lessonTypes: ReadonlyArray<LessonType> = [
  {
    label: "Opening teaching.",
    desc: "The core question and framework for the week.",
  },
  {
    label: "Guided AI conversation.",
    desc: "A structured prompt experience that surfaces tension and applies the teaching.",
  },
  {
    label: "Witness case study.",
    desc: "A concrete example of the principle at work.",
  },
  {
    label: "Cohort discussion.",
    desc: "A facilitated 75-minute session where shared language forms.",
  },
  {
    label: "Exit ticket.",
    desc: "One sentence, one commitment, one practice to carry forward.",
  },
];

/** "What people walk away with" markers — `<em>` segments render serif italic. */
export const formationMarkers: ReadonlyArray<string> = [
  "The ability to <em>recognize weak or risky AI output</em>.",
  "The instinct to <em>revise without blindly rejecting assistance</em>.",
  "A <em>shared language</em> across roles.",
  "Review practices that <em>hold up under deadline pressure</em>.",
  "A workflow they can <em>hand to a colleague</em>.",
];

export const skillsDoneWatch: StageDoneAndWatch = {
  done: [
    "Staff can explain what AI is appropriate for",
    "AI-assisted work is reviewed before public or sensitive use",
    "Teams know when human judgment has to lead",
    "Leaders model responsible uncertainty",
  ],
  watch:
    "If Skills is skipped, <em>AI becomes a habit before it becomes a discipline</em>.",
};

/* -------------------------------------------------------------------------- */
/*  Solutions                                                                 */
/* -------------------------------------------------------------------------- */

export const blueprintItems: ReadonlyArray<BlueprintItem> = [
  {
    num: "01",
    name: "Use cases",
    desc: "Which approved experiments are valuable enough to repeat?",
  },
  {
    num: "02",
    name: "Workflows",
    desc: "Where does the tool sit inside real staff behavior?",
  },
  {
    num: "03",
    name: "Data",
    desc: "What information can the system use, protect, and never touch?",
  },
  {
    num: "04",
    name: "Interface",
    desc: "What do people actually see, ask, review, and approve?",
  },
  {
    num: "05",
    name: "Governance",
    desc: "Who owns the tool, reviews outputs, and keeps it aligned?",
  },
  {
    num: "06",
    name: "Integration",
    desc: "How does the system connect with the platforms, documents, and practices already in place?",
  },
];

export const solutionsProduces: ReadonlyArray<string> = [
  "Custom AI assistants",
  "Internal knowledge tools",
  "Workflow integrations",
  "Training and resource platforms",
  "Donor, communications, program, or operations support systems",
  "Data and content structures that serve both people and AI",
];

export const solutionsArc: ReadonlyArray<{ lead: string; body: string }> = [
  {
    lead: "Integration.",
    body: "Your people, information, use cases, and tools stop running as separate projects.",
  },
  {
    lead: "Activation.",
    body: "Knowledge buried in drives, reports, and individual heads starts moving to where decisions are made.",
  },
  {
    lead: "Transformation.",
    body: "Staff spend less time assembling and re-finding information, and more time on judgment, care, and mission-critical work.",
  },
  {
    lead: "Multiplication.",
    body: "What gets learned in one corner of the organization becomes available everywhere else.",
  },
];

export const solutionsDoneWatch: StageDoneAndWatch = {
  done: [
    "Tools follow the safety rules already established",
    "Staff know how to use and review outputs",
    "Workflow ownership is clear",
    "The system reduces fragmentation instead of adding another tool",
  ],
  watch:
    "If Solutions are rushed, the organization gets <em>tools that look useful but don’t fit</em> the people, the data, or the mission.",
};

/* -------------------------------------------------------------------------- */
/*  Stage step-card / stage-map shared metadata                               */
/* -------------------------------------------------------------------------- */

export type StageMeta = {
  /** "01", "02", "03", "04". */
  num: string;
  /** "Safety", "Sandbox", "Skills", "Solutions". */
  name: string;
  /** Italic-serif tagline shown in the rail card. */
  tagline: string;
  /** "Protects #2", "Protects #3", "Protects #4", "The build". */
  protect: string;
  /** Stage-map description below the title. */
  mapDesc: string;
  /** Sentence shown at the top of the right-side panel. May include `<em>`. */
  sentence: string;
};

export const stageMeta: ReadonlyArray<StageMeta> = [
  {
    num: "01",
    name: "Safety",
    tagline: "Protect trust, data, and mission boundaries.",
    protect: "Protects #2",
    mapDesc: "Trust, data, and mission boundaries.",
    sentence:
      "Decide as a leadership team what staff are <em>allowed to do with AI today</em>, and put it in writing your people will actually read.",
  },
  {
    num: "02",
    name: "Sandbox",
    tagline:
      "Explore real use cases without exposing sensitive information.",
    protect: "Protects #3",
    mapDesc: "Real use cases, no sensitive data.",
    sentence:
      "Run a small set of approved experiments <em>without sensitive data</em>, and capture what you learn somewhere leadership can actually see it.",
  },
  {
    num: "03",
    name: "Skills",
    tagline: "Train staff to use AI responsibly across roles.",
    protect: "Protects #4",
    mapDesc: "Judgment, review, shared language.",
    sentence:
      "Form your people — not just train them — so their <em>judgment holds up</em> when AI is in the room.",
  },
  {
    num: "04",
    name: "Solutions",
    tagline: "Build tools that fit your workflows, voice, and mission.",
    protect: "The build",
    mapDesc: "Tools shaped around the work.",
    sentence:
      "Build only after <em>safety, experimentation, and staff capability</em> are in place.",
  },
];
