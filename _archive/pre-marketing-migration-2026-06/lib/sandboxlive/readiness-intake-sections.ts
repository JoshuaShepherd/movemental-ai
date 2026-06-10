/**
 * SandboxLive — staff AI readiness intake questionnaire.
 *
 * Sections, questions, and ids are preserved from the original Claude
 * artifact (`window.storage` + `ADMIN_PASSCODE` version) for downstream CSV
 * compatibility. Treat question ids here as a public contract — renaming or
 * deleting one is a breaking change for any prior export.
 */

export const READINESS_INTAKE_VERSION = "2026-05-15" as const;

/** Single-select value for `mental_model` that triggers the free-text follow-up. */
export const MENTAL_MODEL_OTHER_OPTION = "Other" as const;

/** Sliders that form the “% of week” split — used for live total UI. */
export const WEEK_TIME_SPLIT_SLIDER_IDS = [
  "time_meetings",
  "time_focused",
  "time_admin_comms",
  "time_relational",
] as const;

export type ReadinessQuestionType =
  | "text"
  | "textarea"
  | "single"
  | "multi"
  | "likert"
  | "slider";

interface BaseQuestion {
  id: string;
  label: string;
  required?: boolean;
}

export interface TextQuestion extends BaseQuestion {
  type: "text";
  placeholder?: string;
}

export interface TextAreaQuestion extends BaseQuestion {
  type: "textarea";
  placeholder?: string;
}

export interface SingleQuestion extends BaseQuestion {
  type: "single";
  options: readonly string[];
}

export interface MultiQuestion extends BaseQuestion {
  type: "multi";
  options: readonly string[];
}

export interface LikertQuestion extends BaseQuestion {
  type: "likert";
}

export interface SliderQuestion extends BaseQuestion {
  type: "slider";
  min: number;
  max: number;
  step: number;
  suffix?: string;
  leftLabel?: string;
  rightLabel?: string;
}

export type ReadinessQuestion =
  | TextQuestion
  | TextAreaQuestion
  | SingleQuestion
  | MultiQuestion
  | LikertQuestion
  | SliderQuestion;

export interface ReadinessSection {
  id: string;
  title: string;
  lede: string;
  questions: readonly ReadinessQuestion[];
}

export const READINESS_SECTIONS: readonly ReadinessSection[] = [
  {
    id: "about",
    title: "About you",
    lede: "A few quick basics so we can connect your answers to who you are and what you do.",
    questions: [
      { id: "name", type: "text", label: "Your full name", required: true, placeholder: "Jane Doe" },
      { id: "email", type: "text", label: "Work email", required: true, placeholder: "you@your-org.org" },
      {
        id: "role",
        type: "text",
        label: "Your role or title",
        required: true,
        placeholder: "e.g. Camp Director, Donor Relations Manager",
      },
      {
        id: "team",
        type: "single",
        label: "Which team or area do you primarily work in?",
        options: [
          "Camps & retreats",
          "Urban / community ministry",
          "Development & fundraising",
          "Communications & marketing",
          "Operations & admin",
          "Finance & accounting",
          "Leadership / executive",
          "Programs & curriculum",
          "Other",
        ],
      },
      {
        id: "tenure",
        type: "single",
        label: "How long have you been at your organization?",
        options: ["Less than a year", "1–3 years", "4–7 years", "8–15 years", "15+ years"],
      },
      {
        id: "setting",
        type: "multi",
        label: "Where does your work usually happen? (select all that apply)",
        options: [
          "Office / desk",
          "At camp or a site",
          "Remote / home",
          "Out in the community or in the field",
          "Traveling",
          "In meetings with people",
        ],
      },
      {
        id: "data_handling",
        type: "multi",
        label:
          "In your daily work, which kinds of sensitive information do you handle? (select all that apply)",
        options: [
          "Donor names and giving history",
          "Beneficiary or youth personal information",
          "Pastoral, care, or counseling notes",
          "Financial account or payment details",
          "Employee or HR records",
          "Health or medical information",
          "None of these",
          "I'm not sure",
        ],
      },
    ],
  },
  {
    id: "week",
    title: "Your work week",
    lede:
      "Help us picture what a typical week actually looks like for you — the rhythms, the energy, the friction.",
    questions: [
      {
        id: "hours",
        type: "single",
        label: "In a typical week, about how many hours do you work?",
        options: ["Under 20", "20–35", "36–45", "46–55", "55+"],
      },
      {
        id: "time_meetings",
        type: "slider",
        label: "Roughly what % of your week is spent in meetings or calls?",
        min: 0,
        max: 100,
        step: 5,
        suffix: "%",
      },
      {
        id: "time_focused",
        type: "slider",
        label: "Roughly what % is focused work — writing, planning, designing, deep tasks?",
        min: 0,
        max: 100,
        step: 5,
        suffix: "%",
      },
      {
        id: "time_admin_comms",
        type: "slider",
        label: "Roughly what % is admin, email, logistics, and async communication?",
        min: 0,
        max: 100,
        step: 5,
        suffix: "%",
      },
      {
        id: "time_relational",
        type: "slider",
        label: "Roughly what % is relational or in-person ministry?",
        min: 0,
        max: 100,
        step: 5,
        suffix: "%",
      },
      {
        id: "energizing",
        type: "textarea",
        label: "What part of your work energizes you most?",
        placeholder: "A sentence or two is plenty.",
      },
      {
        id: "draining",
        type: "textarea",
        label: "What part most drains you, or feels like a slog?",
        placeholder: "Be honest — this is the gold.",
      },
      {
        id: "time_eaters",
        type: "textarea",
        label: "What recurring tasks eat the most time you wish you could spend elsewhere?",
        placeholder: "List as many as you like.",
      },
    ],
  },
  {
    id: "stack",
    title: "Your tech stack",
    lede:
      "Where does your work actually live? Pick everything you use regularly — even if you only use it a little.",
    questions: [
      {
        id: "email_tool",
        type: "single",
        label: "Email",
        options: ["Gmail / Google Workspace", "Outlook / Microsoft 365", "Other", "I don't really use email"],
      },
      {
        id: "docs",
        type: "multi",
        label: "Documents & files",
        options: [
          "Google Docs / Drive",
          "Microsoft Word / OneDrive",
          "Dropbox",
          "Notion",
          "Apple iCloud / Pages",
          "Paper / printed",
          "Other",
        ],
      },
      {
        id: "crm",
        type: "multi",
        label: "Donor management or CRM",
        options: [
          "Salesforce",
          "Bloomerang",
          "Planning Center",
          "DonorPerfect",
          "Kindful",
          "Virtuous",
          "Mailchimp (as light CRM)",
          "Spreadsheets",
          "I don't touch this",
          "Other",
        ],
      },
      {
        id: "pm",
        type: "multi",
        label: "Project / task management",
        options: [
          "Asana",
          "Trello",
          "Monday",
          "ClickUp",
          "Notion",
          "Basecamp",
          "A whiteboard or paper list",
          "I don't really use one",
          "Other",
        ],
      },
      {
        id: "comms",
        type: "multi",
        label: "Team communication",
        options: [
          "Slack",
          "Microsoft Teams",
          "Discord",
          "GroupMe",
          "Text / SMS",
          "Voxer / walkie apps",
          "WhatsApp",
          "Other",
        ],
      },
      {
        id: "design",
        type: "multi",
        label: "Design & creative tools",
        options: [
          "Canva",
          "Adobe (Photoshop / Illustrator / etc.)",
          "Figma",
          "Procreate",
          "I don't do design work",
          "Other",
        ],
      },
      {
        id: "social",
        type: "multi",
        label: "Social media & content",
        options: [
          "Native Instagram / Facebook / TikTok apps",
          "Buffer",
          "Hootsuite",
          "Later",
          "Sprout Social",
          "Metricool",
          "I don't manage social",
          "Other",
        ],
      },
      {
        id: "video",
        type: "multi",
        label: "Video calls & meetings",
        options: ["Zoom", "Google Meet", "Microsoft Teams", "FaceTime", "In-person only", "Other"],
      },
      {
        id: "finance",
        type: "multi",
        label: "Finance / accounting tools (if applicable)",
        options: ["QuickBooks", "Xero", "Expensify", "Bill.com", "I don't touch this", "Other"],
      },
      {
        id: "camp_ops",
        type: "multi",
        label: "Camp registration / event tools (if applicable)",
        options: [
          "CampMinder",
          "CampBrain",
          "Eventbrite",
          "Custom forms / spreadsheets",
          "Doesn't apply to me",
          "Other",
        ],
      },
      {
        id: "work_shared",
        type: "single",
        label:
          "Does most of your work live somewhere your team can see it, or mostly in your own space?",
        options: [
          "Mostly in shared docs / systems the team can access",
          "A mix of shared and personal",
          "Mostly in my own inbox, files, or head",
          "Not sure",
        ],
      },
      {
        id: "work_lives",
        type: "textarea",
        label: "In one or two sentences, where does most of your work actually live day-to-day?",
        placeholder:
          'e.g. "Mostly Gmail and a couple of Google Docs, with everything in my head."',
      },
      {
        id: "tools_other",
        type: "textarea",
        label: "Any other tools, apps, or platforms not listed above?",
        placeholder: "Optional.",
      },
    ],
  },
  {
    id: "experience",
    title: "Your AI experience so far",
    lede:
      "No wrong answers here. Whether you've never touched it or use it daily, just give us the honest picture.",
    questions: [
      {
        id: "ai_used",
        type: "single",
        label: "Have you used AI tools (like ChatGPT, Claude, Gemini, Copilot)?",
        options: [
          "Yes — regularly (weekly or more)",
          "Yes — occasionally",
          "Tried it once or twice",
          "Never used any",
        ],
      },
      {
        id: "mental_model",
        type: "single",
        label:
          "When you think about what AI actually IS, which comes closest to how you picture it?",
        options: [
          "A search engine that finds answers",
          "A person who knows things",
          "A kind of calculator, but for words and language",
          "Fancy autocomplete that predicts text",
          "A computer program that genuinely thinks",
          "Honestly, I don't know what it is",
          "Other",
        ],
      },
      {
        id: "mental_model_other",
        type: "textarea",
        label: "If you picked Other, how do you picture AI? (A sentence or two is enough.)",
        required: false,
        placeholder: "Describe your own mental model…",
      },
      {
        id: "ai_tools",
        type: "multi",
        label: "Which have you tried or used? (select all that apply)",
        options: [
          "ChatGPT",
          "Claude",
          "Google Gemini",
          "Microsoft Copilot",
          "Perplexity",
          "Grammarly / writing AI",
          "AI image generators (DALL-E, Midjourney, etc.)",
          "AI in Canva or design tools",
          "AI in Notion / Google Docs",
          "I haven't tried any",
        ],
      },
      {
        id: "ai_tasks",
        type: "multi",
        label: "For what kinds of tasks have you used AI? (if any)",
        options: [
          "Writing emails or messages",
          "Drafting documents, letters, reports",
          "Brainstorming ideas",
          "Summarizing long documents or articles",
          "Research / answering questions",
          "Editing or improving my writing",
          "Translating",
          "Generating images",
          "Coding or technical work",
          "Personal stuff (recipes, travel, etc.)",
          "Curriculum or lesson planning",
          "Social media content",
          "I haven't used it yet",
        ],
      },
      {
        id: "youthfront_use",
        type: "single",
        label: "Have you already used AI for actual work at your organization?",
        options: [
          "Yes — and I felt fine about it",
          "Yes — but I wasn't sure if I was allowed to",
          "No, but I've thought about it",
          "No, it hasn't come up",
        ],
      },
      {
        id: "ai_confidence",
        type: "slider",
        label: "How confident do you feel using AI tools right now?",
        min: 1,
        max: 10,
        step: 1,
        suffix: " / 10",
        leftLabel: "Total beginner",
        rightLabel: "Very confident",
      },
      {
        id: "ai_winning",
        type: "textarea",
        label: "If you HAVE used AI: what's one thing it's actually been useful for?",
        placeholder: "Skip if not applicable.",
      },
      {
        id: "ai_failing",
        type: "textarea",
        label: "And one thing where it disappointed you or didn't work?",
        placeholder: "Skip if not applicable.",
      },
    ],
  },
  {
    id: "sentiment",
    title: "How you feel about it",
    lede:
      "Quick gut-check on attitude. There are no right answers — skepticism is just as welcome as excitement.",
    questions: [
      { id: "sent_excited", type: "likert", label: "I'm excited about what AI could do for our work." },
      {
        id: "sent_worried",
        type: "likert",
        label: "I'm worried about the risks of AI — for our org, our people, or society.",
      },
      { id: "sent_overwhelmed", type: "likert", label: "I feel overwhelmed by how fast AI is changing." },
      {
        id: "sent_save_time",
        type: "likert",
        label: "I believe AI could meaningfully save me time on my actual job.",
      },
      {
        id: "sent_threat",
        type: "likert",
        label: "I worry AI threatens jobs in nonprofit or ministry work.",
      },
      { id: "sent_trust", type: "likert", label: "I trust AI tools enough to use them on real work." },
      {
        id: "sent_disclosure",
        type: "likert",
        label:
          "It would bother me if a colleague used AI on shared work and didn't mention it.",
      },
      { id: "sent_avoid", type: "likert", label: "Honestly, I'd rather not use AI if I don't have to." },
      {
        id: "sent_curious",
        type: "likert",
        label: "I'm curious and want to learn more, regardless of how I feel about it.",
      },
      {
        id: "three_words",
        type: "text",
        label: 'Three words that come to mind when you hear "AI"',
        placeholder: "e.g. fast, scary, useful",
      },
    ],
  },
  {
    id: "ministry",
    title: "Ministry & ethical lens",
    lede:
      "We want to know what feels off-limits, what feels fair game, and where you'd draw lines.",
    questions: [
      {
        id: "off_limits",
        type: "multi",
        label: "Where would you NOT want to use AI? (select all that apply)",
        options: [
          "Pastoral or spiritual conversations",
          "Prayer or devotional content",
          "Sermon or teaching writing",
          "Personal donor relationships",
          "Direct conversations with youth",
          "Counseling or care situations",
          "Sensitive HR / personnel matters",
          "Anything that should sound personally from me",
          "I'm not sure yet",
          "Nothing — it's all on the table",
        ],
      },
      {
        id: "fair_game",
        type: "multi",
        label: "Where does it feel clearly fine to use AI?",
        options: [
          "Drafting routine emails",
          "Meeting notes and summaries",
          "Scheduling and logistics",
          "Research and gathering info",
          "Summarizing long documents",
          "Brainstorming ideas",
          "Editing and polishing my writing",
          "Social media drafts",
          "Internal reports and admin docs",
          "Learning new things",
          "I'm not sure",
        ],
      },
      {
        id: "ministry_concerns",
        type: "textarea",
        label: "What concerns you about AI in faith-based or relational ministry work?",
        placeholder: "Theological, practical, ethical — whatever's on your mind.",
      },
      {
        id: "ministry_hopes",
        type: "textarea",
        label: "And what could AI free you up to do MORE of in ministry?",
        placeholder: "Optional.",
      },
    ],
  },
  {
    id: "capacity",
    title: "How you learn",
    lede: "So we can design training you'll actually finish, not training that sits in a tab.",
    questions: [
      {
        id: "tech_comfort",
        type: "slider",
        label: "How would you rate your overall tech comfort?",
        min: 1,
        max: 10,
        step: 1,
        suffix: " / 10",
        leftLabel: "I struggle with tech",
        rightLabel: "Power user",
      },
      {
        id: "learning_style",
        type: "multi",
        label: "How do you learn new tools best? (pick your top 2–3)",
        options: [
          "Short video tutorials",
          "Hands-on practice / experimenting",
          "Written guides or docs",
          "Live group sessions",
          "1-on-1 coaching",
          "Learning alongside a peer",
          "Self-paced at my own time",
          "Structured cohort with deadlines",
        ],
      },
      {
        id: "past_learning",
        type: "textarea",
        label:
          "Think of a time your organization rolled out a new tool or training. What made it stick for you — or what made it not stick?",
        placeholder: "This helps us design something you'll actually finish.",
      },
      {
        id: "time_per_week",
        type: "single",
        label: "Realistically, how much time per week could you give to AI training?",
        options: ["Less than 30 minutes", "30–60 minutes", "1–2 hours", "2–4 hours", "4+ hours"],
      },
      {
        id: "best_time",
        type: "multi",
        label: "When are you most likely to actually do the training?",
        options: [
          "Early morning",
          "Mid-morning",
          "Lunch / midday",
          "Afternoon",
          "Evening",
          "Weekends",
          "Honestly, I have no idea",
        ],
      },
      {
        id: "format",
        type: "multi",
        label: "What format would you find most useful?",
        options: [
          "Live workshops with Q&A",
          "Recorded videos I can rewatch",
          "Step-by-step written guides",
          "A Slack channel for questions",
          "Office hours / drop-in help",
          "Templates and prompts I can copy",
          "Real-world projects from my actual work",
        ],
      },
      {
        id: "safe_experiment",
        type: "textarea",
        label:
          "What would make you feel safe experimenting with AI on real work — not just in theory?",
        placeholder:
          "Permission, privacy, a low-stakes place to start, a peer to try it with — whatever it is for you.",
      },
    ],
  },
  {
    id: "goals",
    title: "Goals & wishes",
    lede: "Last one. The open prompts here help us tailor the training to what you actually want.",
    questions: [
      {
        id: "magic_wand",
        type: "textarea",
        label: "If AI could take ONE thing off your plate tomorrow, what would it be?",
        placeholder: "Be as specific as you want.",
      },
      {
        id: "most_hope",
        type: "textarea",
        label: "What do you most hope to learn or be able to do by the end of training?",
      },
      {
        id: "worried_about",
        type: "textarea",
        label: "Any worries about the training itself — pace, content, embarrassment, anything?",
        placeholder: "We'd rather know now.",
      },
      {
        id: "questions",
        type: "textarea",
        label: "Questions you'd love us to answer about AI?",
      },
      {
        id: "anything_else",
        type: "textarea",
        label: "Anything else we should know to meet you where you are?",
        placeholder: "Optional, but read carefully.",
      },
    ],
  },
] as const;

/** Default slider value — used for unanswered sliders so the thumb sits sensibly. */
export function defaultSliderValue(q: SliderQuestion): number {
  return Math.round((q.min + q.max) / 2);
}

/** Sum of the four “% of week” sliders — uses default thumb value when unset. */
export function weekTimeSplitPercentTotal(answers: Record<string, unknown>): number {
  let sum = 0;
  for (const id of WEEK_TIME_SPLIT_SLIDER_IDS) {
    const q = findReadinessQuestion(id);
    if (!q || q.type !== "slider") continue;
    const raw = answers[id];
    const v = typeof raw === "number" && Number.isFinite(raw) ? raw : defaultSliderValue(q);
    sum += v;
  }
  return sum;
}

/** Flatten all question ids in declaration order. */
export function allReadinessQuestionIds(): string[] {
  return READINESS_SECTIONS.flatMap((s) => s.questions.map((q) => q.id));
}

/** Find a question by id (linear scan — questionnaire is small). */
export function findReadinessQuestion(id: string): ReadinessQuestion | undefined {
  for (const s of READINESS_SECTIONS) {
    for (const q of s.questions) {
      if (q.id === id) return q;
    }
  }
  return undefined;
}

/** Whether a value satisfies a `required` question. */
export function isAnswered(q: ReadinessQuestion, value: unknown): boolean {
  if (value == null) return false;
  switch (q.type) {
    case "text":
    case "textarea":
      return typeof value === "string" && value.trim().length > 0;
    case "single":
      return typeof value === "string" && value.length > 0;
    case "multi":
      return Array.isArray(value) && value.length > 0;
    case "likert":
    case "slider":
      return typeof value === "number" && Number.isFinite(value);
  }
}
