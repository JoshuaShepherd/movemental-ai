/** Sidebar anchors — Section 0 nav */
export const INSTITUTIONS_NAV = [
  { id: "where-you-stand", label: "Where you stand" },
  { id: "deeper-problem", label: "The deeper problem" },
  { id: "the-case", label: "The case" },
  { id: "what-we-build", label: "What we build" },
  { id: "formation", label: "Formation" },
  { id: "start", label: "Start" },
] as const;

/** Every scroll-spy section id → sidebar nav index */
export const INSTITUTIONS_SPY_SECTIONS = [
  { id: "where-you-stand", navIndex: 0 },
  { id: "deeper-problem", navIndex: 1 },
  { id: "the-case", navIndex: 2 },
  { id: "what-we-build", navIndex: 3 },
  { id: "the-build", navIndex: 3 },
  { id: "formation", navIndex: 4 },
  { id: "the-path", navIndex: 5 },
  { id: "start", navIndex: 5 },
] as const;

/** Section 2 — pain cards (editable copy) */
export const PAIN_CARDS = [
  {
    title: "Students are already using it.",
    body: "They draft sermons, do exegesis, and write papers with AI. Most get no guidance on how.",
  },
  {
    title: "Every professor has a different rule.",
    body: "One welcomes AI. The next calls it cheating. The student just guesses.",
  },
  {
    title: "It's not in the curriculum.",
    body: "Your graduates will lead in an AI world. Almost no seminary teaches them how to think about it.",
  },
  {
    title: "Your degree means different things.",
    body: "What it stood for in 2011, 2014, and 2023 quietly drifted. No one ever reconciled it.",
  },
  {
    title: "Your own records are lost to you.",
    body: "The files are saved, but no one can find them. The seminary can't even learn from itself.",
  },
  {
    title: "Your name can be faked.",
    body: "A professor's writing or voice can be copied in minutes. Your name no longer proves it's really you.",
  },
] as const;

/** Section 5 — pain → fix callbacks */
export const FIX_ROWS = [
  {
    pain: "Your records were lost",
    gain: "now they're in one place you can search and build on.",
  },
  {
    pain: "Your name could be faked",
    gain: "now there's a verified record of what's really yours.",
  },
  {
    pain: "Your degree drifted",
    gain: "now there's one clear, canonical account of what it means.",
  },
  {
    pain: "Your chatbot sounded generic",
    gain: "now it can answer real questions about you, because it's grounded in your own material.",
  },
] as const;

/** Section 6 — example tools */
export const TOOL_EXAMPLES = [
  {
    label: "Search",
    text: "that knows your syllabi, archives, and faculty work — not the open web.",
  },
  {
    label: "Assistant",
    text: "that speaks from your material, with sources your board can check.",
  },
  {
    label: "Discovery",
    text: "so the next generation finds your scholarship when they ask the machine, not only the library.",
  },
] as const;

/** Section 8 — four stages (Guidebook canon) */
export const PATH_STAGES = [
  { n: "01", title: "Safety", here: true },
  { n: "02", title: "Sandbox", here: false },
  { n: "03", title: "Skills", here: false },
  { n: "04", title: "Solutions", here: false },
] as const;

/** On-page letter embed omits opening + student-drafting paragraph (Section 2 covers that). */
export function getLetterEmbedParagraphs(markdown: string): string[] {
  const paragraphs = markdown
    .replace(/^#\s+.+\n+/, "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const startIdx = paragraphs.findIndex((p) =>
    p.startsWith("You carry a weight in this moment"),
  );
  return startIdx === -1 ? paragraphs : paragraphs.slice(startIdx);
}

/** Full letter for download / mailto — unchanged artifact. */
export function getLetterFullText(markdown: string): string {
  const title = markdown.match(/^#\s+(.+)/)?.[1] ?? "To a Seminary President";
  const body = markdown.replace(/^#\s+.+\n+/, "").trim();
  return `${title}\n\n${body}`;
}
