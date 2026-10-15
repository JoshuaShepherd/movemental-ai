/**
 * Reality Assessment questions and the sample results, verbatim from the canvas board
 * Assessment (docs/handoff/assessment-new/source/Assessment.dc.html). "{org}" stands for the
 * organization's short name (the board's "Riverbend"). Generated; edit the board, not this file.
 */

export interface AssessmentQuestion {
  area: string;
  leader: string;
  staff: string;
  leaderOptions: readonly string[];
  staffOptions: readonly string[];
}

export const QUESTIONS: readonly AssessmentQuestion[] = [
  {
    area: "Use",
    leader: "Of your people, how many use AI for their work at least weekly?",
    staff: "How often do you use AI for your work?",
    leaderOptions: ["Few, under a quarter", "Some, up to half", "Most, up to three quarters", "Nearly everyone"],
    staffOptions: ["Never", "A few times", "Weekly", "Daily or almost daily"],
  },
  {
    area: "What for",
    leader: "What do you think they use it for most?",
    staff: "What do you use it for most?",
    leaderOptions: ["Writing and editing", "Research and summaries", "Planning and ideas", "Work with people we serve"],
    staffOptions: ["Writing and editing", "Research and summaries", "Planning and ideas", "Work with people we serve"],
  },
  {
    area: "Personal tools",
    leader: "How many use AI through personal accounts rather than tools {org} provides?",
    staff: "Do you use AI for work through a personal account?",
    leaderOptions: ["Few", "Some", "Most", "Nearly everyone"],
    staffOptions: ["No", "Sometimes", "Usually", "It’s the only way I use it"],
  },
  {
    area: "Sensitive information",
    leader: "How many have put information about someone you serve into an AI tool?",
    staff: "Have you ever put information about someone {org} serves into an AI tool?",
    leaderOptions: ["No one", "A few", "Some", "Many"],
    staffOptions: ["No", "Once or twice", "Yes, more than that", "I’m not sure"],
  },
  {
    area: "Confidence",
    leader: "How confident do you think they feel using AI well?",
    staff: "How confident do you feel using AI well in your work?",
    leaderOptions: ["Not at all", "A little", "Fairly", "Very"],
    staffOptions: ["Not at all", "A little", "Fairly", "Very"],
  },
  {
    area: "Disclosure",
    leader: "When AI substantially shapes their work, how often do they say so?",
    staff: "When AI substantially shapes something you share, how often do you say so?",
    leaderOptions: ["Rarely", "Sometimes", "Usually", "Always"],
    staffOptions: ["Rarely", "Sometimes", "Usually", "Always"],
  },
  {
    area: "Rules",
    leader: "Does {org} have rules about AI use today?",
    staff: "Does {org} have rules about AI use?",
    leaderOptions: ["No", "Spoken guidance only", "Written guidance", "A written policy"],
    staffOptions: ["No", "Yes, but I don’t know them", "Yes, and I know them", "I’m not sure"],
  },
  {
    area: "Leaders’ own use",
    leader: "How often do you, as leaders, use AI in your own work?",
    staff: "Do you think {org}’s leaders use AI in their own work?",
    leaderOptions: ["Never", "Sometimes", "Weekly", "Daily"],
    staffOptions: ["No", "Probably not", "Probably", "Yes, and they’ve said so"],
  },
];

/** The board's sample results for Riverbend: area, question, thought, reported, tag, thought %, reported %. */
export const SAMPLE_GAPS = [
  ["Sensitive information", "Information about people we serve, put into AI tools", "No one", "4 of 12 have, and 2 aren’t sure", "Widest gap", 30, 50],
  ["Rules", "Whether Riverbend has rules about AI", "Spoken guidance exists", "5 of 12 say there are none; 4 aren’t sure", "Wide gap", 50, 75],
  ["Personal tools", "Using AI through personal accounts", "Some", "9 of 12, usually or only", "Wide gap", 40, 75],
  ["Leaders’ own use", "Leaders using AI in their own work", "Leaders use it weekly", "3 of 12 think leaders use it", "Wide gap", 75, 25],
  ["Use", "Using AI for work at least weekly", "Some, up to half", "7 of 12, weekly or daily", "Some gap", 40, 58],
  ["Disclosure", "Saying so when AI shaped the work", "Usually", "8 of 12 say rarely or sometimes", "Some gap", 70, 33],
  ["Confidence", "Feeling confident using AI well", "Fairly confident", "7 of 12 feel a little or not at all", "Some gap", 65, 42],
  ["What for", "What it is used for most", "Writing and editing", "Writing and editing, 8 of 12", "Close", 65, 67],
] as const;
