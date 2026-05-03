// shared path data for audience pages

export const stageMeta = [
  {
    num: "01",
    name: "Safety",
    protect: "Protects #2",
    mapDesc: "Trust, data, and mission boundaries.",
    tagline: "Protect trust, data, and mission boundaries.",
    sentence: "Decide as a leadership team what staff are <em>allowed to do with AI today</em>, and put it in writing your people will actually read.",
    doneWhen: [
      "Leaders agree on what is allowed, discouraged, and prohibited",
      "Sensitive information has been classified clearly",
      "Staff know the policy exists and can find it",
      "There is a plan for what happens when something goes wrong"
    ],
    watchFor: "If Safety is skipped, <em>staff form habits before standards exist</em>."
  },
  {
    num: "02",
    name: "Sandbox",
    protect: "Protects #3",
    mapDesc: "Real use cases, no sensitive data.",
    tagline: "Explore real use cases without exposing sensitive information.",
    sentence: "Run a small set of approved experiments <em>without sensitive data</em>, and capture what you learn somewhere leadership can actually see it.",
    doneWhen: [
      "Experiments avoid private or sensitive data",
      "Each experiment has an owner",
      "Learning is captured in one shared place",
      "Leadership can see what is working, what is risky, and what should stop"
    ],
    watchFor: "If Sandbox is skipped, experimentation goes <em>private, scattered, and impossible to learn from</em>."
  },
  {
    num: "03",
    name: "Skills",
    protect: "Protects #4",
    mapDesc: "Judgment, review, shared language.",
    tagline: "Train staff to use AI responsibly across roles.",
    sentence: "Form your people — not just train them — so their <em>judgment holds up</em> when AI is in the room.",
    doneWhen: [
      "Staff can explain what AI is appropriate for",
      "AI-assisted work is reviewed before public or sensitive use",
      "Teams know when human judgment has to lead",
      "Leaders model responsible uncertainty"
    ],
    watchFor: "If Skills is skipped, <em>AI becomes a habit before it becomes a discipline</em>."
  },
  {
    num: "04",
    name: "Solutions",
    protect: "The build",
    mapDesc: "Tools shaped around the work.",
    tagline: "Build tools that fit your workflows, voice, and mission.",
    sentence: "Build only after <em>safety, experimentation, and staff capability</em> are in place.",
    doneWhen: [
      "Tools follow the safety rules already established",
      "Staff know how to use and review outputs",
      "Workflow ownership is clear",
      "The system reduces fragmentation instead of adding another tool"
    ],
    watchFor: "If Solutions are rushed, the organization gets <em>tools that look useful but don’t fit</em> the people, the data, or the mission."
  }
];

export const safetyQuickItems = [
  "Ownership is assigned",
  "AI posture is agreed",
  "Allowed and prohibited uses are written",
  "Sensitive data is classified",
  "Staff policy is published",
  "Review and update rhythm is scheduled"
];

export const safetyChecklistRows = [
  {
    index: "i",
    name: "One leader and one decision group own this",
    example: "One senior leader — your executive director, chief of staff, or COO — is officially the person responsible for AI at the organization. A small group (your senior team plus one or two board members) meets on a recurring schedule to make AI decisions together. <strong>Both are written down, both are on the calendar, and every staff member knows who they are.</strong>"
  },
  {
    index: "ii",
    name: "Leaders agree on what your organization believes about AI",
    example: "Your senior leaders have spent real time talking through what your organization believes about people, truth, privacy, and what should never be handed off to a machine — and they have written it down on one page in plain English. Faith-based organizations name where their faith draws the line. Other organizations name the values that draw it. <strong>Either way, the page is in your own words, not a template.</strong>"
  },
  {
    index: "iii",
    name: "A short, signed list of “here is what we will and won’t do with AI”",
    example: "Five to ten clear sentences, written in your own words and signed by the leaders who actually run the organization, that say what you will and will not do with AI. <strong>Short enough to read out loud at the start of a staff meeting, specific enough to settle an argument</strong>, and used as the standard for every AI decision from now on."
  },
  {
    index: "iv",
    name: "A complete list of every kind of sensitive information you handle",
    example: "A simple spreadsheet listing every type of sensitive information your organization touches: donor names and contact info, the people you serve, employee records, financial data, counseling or case notes, legal records, partner agreements, and so on. For each one, you have written down where it is stored, why you have it, and how long you keep it. <strong>Nothing is missing.</strong>"
  },
  {
    index: "v",
    name: "Information sorted into “safe to use” and “never use” groups",
    example: "Every type of information from your inventory is sorted into clear groups — <strong>fine to use with AI, okay with care, restricted, or never enters AI tools.</strong> The “never” list is short, specific, and written down. Any staff member can look at a document or a piece of information and know which group it falls into."
  },
  {
    index: "vi",
    name: "A short policy that tells staff what they can and can’t do with AI",
    example: "One short document — readable in under ten minutes by a brand-new hire — that says clearly what staff are allowed to do with AI, what they are not allowed to do, and why. Plain English, not legal language. Where it borrows rules from your AI tool’s own policy (ChatGPT, Claude, Microsoft Copilot, etc.), it quotes them directly so <strong>staff have one trusted source to point to when a donor, parent, or partner asks.</strong>"
  },
  {
    index: "vii",
    name: "The AI tool is set up to follow your rules automatically",
    example: "The AI tools you have approved are set up so your policy is built in, not optional. That means: staff sign in with their work account (no personal accounts on the side), accounts are removed when people leave, the tool keeps a record of how it is used, and any tool that connects to your other systems has a named owner. If you handle health, legal, or other regulated information, that work lives in a separate, locked-down environment with the right contracts in place. <strong>A written policy the tool itself ignores does not count.</strong>"
  },
  {
    index: "viii",
    name: "A clear plan for what to do when something goes wrong",
    example: "A short, written plan that says exactly what to do at each level of problem — from a near-miss (“I almost pasted donor info into ChatGPT”) to a real exposure (“a draft with a beneficiary’s name was sent to a vendor”). The plan names <strong>who to tell, how fast, and what happens next.</strong> Staff who report a near-miss are not punished, and near-misses are tracked in a simple log so you can see patterns before they become incidents."
  },
  {
    index: "ix",
    name: "All of these documents live in one easy-to-find place",
    example: "Your beliefs page, AI policy, data list, “never” list, incident plan, and a short glossary all live in one folder or page that any staff member can find from the staff homepage in <strong>less than thirty seconds.</strong> If a new hire on day one cannot find it that fast, it does not yet exist."
  },
  {
    index: "x",
    name: "A practice run of “what if something goes wrong”",
    example: "Before any real incident happens, your senior team sits down together and walks through a realistic scenario — for example, <em>“a staff member uploaded a donor list to an unapproved AI tool”</em> — step by step, with the actual people who would handle it. The exercise exposes gaps you didn’t see on paper, and <strong>the plan gets fixed afterward, before a real incident teaches the same lessons more expensively.</strong>"
  },
  {
    index: "xi",
    name: "Every staff member has read and signed the AI policy",
    example: "Every single staff member who has access to AI tools has signed your AI policy. The list of who signed is checked against your HR roster — not against memory, not “most people.” <strong>This is the clear gate: nobody starts using AI on real work until everyone has signed.</strong>"
  },
  {
    index: "xii",
    name: "A one-page public statement, ready before anyone asks",
    example: "One page, written in your voice, that you can hand to your board, a regulator, a funder, a major donor, your denomination, an accreditor, or a key partner if they ask <em>“how does your organization use AI?”</em> It exists <strong>before the first time anyone asks the question</strong>, and staff use the same wording so the answer is consistent across the organization."
  },
  {
    index: "xiii",
    name: "A regular schedule of check-ups, on the calendar",
    example: "Every quarter, your decision group reviews the AI tool’s usage records, who has access to what, and whether the rules about how long data is kept are being followed. Every month, your senior team sees usage numbers. Each review is on the calendar with a name next to it. <strong>If it is not on the calendar, it does not happen.</strong>"
  },
  {
    index: "xiv",
    name: "A way to update the policy as you learn",
    example: "Every incident, near-miss, or experiment that didn’t go as planned ends with one question: <em>“What should we change in our training, policy, or tools so this is less likely next time?”</em> The policy is dated and numbered (v1.0, v1.1, v1.2…) with a short list of what changed and when. <strong>A policy that has never been updated is a policy that has not yet met the real world.</strong>"
  }
];

export const formationWeeks = [
  { week: "Week 01", name: "Orientation", description: "The course promise, the cohort, and the question every staff member already lives with: when should I use AI, and when shouldn’t I?" },
  { week: "Week 02", name: "Discernment", description: "How to tell plausible from good. The first thing staff need is the ability to see drift before it becomes a habit." },
  { week: "Week 03", name: "Authorship", description: "Staying in control of the work. Using AI without letting it become the senior author in the room." },
  { week: "Week 04", name: "Verification", description: "Checking facts, tone, and integrity. Treating every assisted output as unverified until it’s verified." },
  { week: "Week 05", name: "Stewardship", description: "What AI doesn’t touch. Knowing where the lines are — and why some lines aren’t efficiency questions." },
  { week: "Week 06", name: "Prompting as thinking", description: "Writing prompts that read like a well-written internal brief. (That’s the actual skill.)" },
  { week: "Week 07", name: "Workflow thinking", description: "Putting AI inside the actual shape of real work, so what one person learns is something the whole team can run." },
  { week: "Week 08", name: "Synthesis & sending", description: "Pulling the whole arc together. A 30/60/90 day plan. A real sending into the work, not a graduation." },
];

export const lessonTypes = [
  { name: "Opening teaching.", desc: "The core question and framework for the week." },
  { name: "Guided AI conversation.", desc: "A structured prompt experience that surfaces tension and applies the teaching." },
  { name: "Witness case study.", desc: "A concrete example of the principle at work." },
  { name: "Cohort discussion.", desc: "A facilitated 75-minute session where shared language forms." },
  { name: "Exit ticket.", desc: "One sentence, one commitment, one practice to carry forward." }
];

export const formationMarkers = [
  "The ability to <em>recognize weak or risky AI output</em>.",
  "The instinct to <em>revise without blindly rejecting assistance</em>.",
  "A <em>shared language</em> across roles.",
  "Review practices that <em>hold up under deadline pressure</em>.",
  "A workflow they can <em>hand to a colleague</em>."
];

export const customAiBuildBlueprint = [
  { num: "01", name: "Use cases", description: "Which approved experiments are valuable enough to repeat?" },
  { num: "02", name: "Workflows", description: "Where does the tool sit inside real staff behavior?" },
  { num: "03", name: "Data", description: "What information can the system use, protect, and never touch?" },
  { num: "04", name: "Interface", description: "What do people actually see, ask, review, and approve?" },
  { num: "05", name: "Governance", description: "Who owns the tool, reviews outputs, and keeps it aligned?" },
  { num: "06", name: "Integration", description: "How does the system connect with the platforms, documents, and practices already in place?" }
];

export const solutionsProduces = [
  "Custom AI assistants",
  "Internal knowledge tools",
  "Workflow integrations",
  "Training and resource platforms",
  "Donor, communications, program, or operations support systems",
  "Data and content structures that serve both people and AI"
];

export const solutionsWhyMatters = [
  "Tools built too early amplify confusion. Tools built after the first three stages <strong>amplify clarity.</strong>",
  "By this point, AI is no longer a tool floating above the organization. It becomes <em>infrastructure shaped around the people, mission, data, and decisions</em> that already define the work."
];

export const solutionsArc = [
  { verb: "Integration.", desc: "Your people, information, use cases, and tools stop running as separate projects." },
  { verb: "Activation.", desc: "Knowledge buried in drives, reports, and individual heads starts moving to where decisions are made." },
  { verb: "Transformation.", desc: "Staff spend less time assembling and re-finding information, and more time on judgment, care, and mission-critical work." },
  { verb: "Multiplication.", desc: "What gets learned in one corner of the organization becomes available everywhere else." }
];
