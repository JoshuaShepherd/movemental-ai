export type SectionRow = {
  section_type: string;
  nav_title: string | null;
};

export const SANDBOX_AI_NONPROFITS_SLUG = "sandbox-ai-nonprofits";

export const WEEK1: SectionRow[] = [
  { section_type: "video", nav_title: "Opening video" },
  { section_type: "reading", nav_title: null },
  { section_type: "chat_dissonance", nav_title: "Context discovery" },
  { section_type: "looking_ahead", nav_title: null },
];

export const WEEK_CORE: SectionRow[] = [
  { section_type: "video", nav_title: "Opening video" },
  { section_type: "chat_dissonance", nav_title: "Dissonance" },
  { section_type: "reading", nav_title: null },
  { section_type: "case_study", nav_title: null },
  { section_type: "chat_action", nav_title: "Action step" },
  { section_type: "chat_reflection", nav_title: "Reflection" },
  { section_type: "discussion", nav_title: "Cohort meeting" },
  { section_type: "reflection", nav_title: "Exit ticket" },
];

export const WEEK8: SectionRow[] = [
  { section_type: "chat_dissonance", nav_title: "Dissonance" },
  { section_type: "reading", nav_title: null },
  { section_type: "case_study", nav_title: null },
  { section_type: "chat_action", nav_title: "Action step" },
  { section_type: "chat_reflection", nav_title: "Reflection" },
  { section_type: "discussion", nav_title: "Cohort meeting" },
  { section_type: "integration", nav_title: null },
  { section_type: "video", nav_title: "Sending video" },
  { section_type: "reading", nav_title: null },
  { section_type: "chat_reflection", nav_title: "Reflection" },
  { section_type: "field_experiment", nav_title: null },
  { section_type: "discussion", nav_title: "Commissioning" },
  { section_type: "integration", nav_title: null },
  { section_type: "lordship_opening", nav_title: null },
  { section_type: "reflection", nav_title: "Exit ticket" },
];

export function sectionsForWeek(weekNum: number): SectionRow[] {
  if (weekNum === 1) return WEEK1;
  if (weekNum === 8) return WEEK8;
  return WEEK_CORE;
}

export function weekFileName(weekNum: number): string {
  return `week-${String(weekNum).padStart(2, "0")}.md`;
}

export function extractSectionNth(markdown: string, sectionType: string, occurrence: number): string {
  const header = `## ${sectionType}`;
  let searchFrom = 0;
  let start = -1;
  for (let i = 0; i <= occurrence; i++) {
    start = markdown.indexOf(header, searchFrom);
    if (start === -1) {
      return "";
    }
    searchFrom = start + 1;
  }
  const afterHeader = markdown.slice(start + header.length).replace(/^\s*\n/, "");
  const next = afterHeader.indexOf("\n## ");
  if (next === -1) {
    return afterHeader.trim();
  }
  return afterHeader.slice(0, next).trim();
}
