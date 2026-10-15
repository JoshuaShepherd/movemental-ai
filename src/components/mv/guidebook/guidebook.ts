/**
 * The guidebook's structure and editions, from the canvas board Guidebook
 * (docs/handoff/guidebook-new/source/Guidebook.dc.html), with the parts aligned to the five
 * stages of the Map (locked drift: the board still showed "Decisions about technology" and
 * "Keeping it alive"). Only chapters with `written: true` have a page.
 */

export const EDITIONS = [
  { slug: "nonprofit", label: "Nonprofit" },
  { slug: "church", label: "Church" },
  { slug: "school", label: "School and seminary" },
  { slug: "network", label: "Network and denomination" },
] as const;

export type EditionSlug = (typeof EDITIONS)[number]["slug"];

export function editionFor(slug: string | undefined) {
  return EDITIONS.find((e) => e.slug === slug) ?? EDITIONS[0];
}

/** The example refusal shown in the Policy chapter, by edition (verbatim from the board). */
export const POLICY_EXAMPLE: Record<EditionSlug, string> = {
  nonprofit: "No one may enter a young person’s case notes, health information or anything told in confidence into any AI tool.",
  church: "No one may put a prayer request, a pastoral conversation or anything shared in confidence into any AI tool.",
  school: "Students may use AI in coursework only as each syllabus allows, and every syllabus says plainly what it allows.",
  network: "Member organizations keep their own charters. This policy covers only what the network itself does with member information.",
};

export interface Chapter {
  n: number;
  slug: string;
  title: string;
  written: boolean;
}

export interface Part {
  label: string;
  title: string;
  chapters: Chapter[];
}

const RAW: [string, string, [string, string][]][] = [
  ["Opening", "Resolve and respond", [["why-begin", "Why begin with what you believe"], ["writing-a-resolution", "Writing a Resolution"]]],
  ["Part one", "The trailhead", [["who-carries-this", "Who carries this, and who decides"], ["reality-assessment", "The Reality Assessment"]]],
  ["Part two", "The charter", [["statement", "Statement"], ["policy", "Policy"], ["context", "Context"], ["rules", "Rules"], ["response-plans", "Response plans"]]],
  ["Part three", "The organization’s context", [["what-you-know", "What you know"], ["how-the-work-happens", "How the work actually happens"], ["who-the-work-depends-on", "Who the work depends on"]]],
  ["Part four", "Formation", [["team-course", "The team course"], ["ambassador", "Your ambassador"]]],
  ["Part five", "Build only what belongs", [["weighing-a-use", "Weighing a possible use"], ["refusal", "Refusal as a decision"]]],
  ["Part six", "Review what changes", [["review", "Review, learn, revise, continue"]]],
];

const WRITTEN = new Set(["policy"]);

let n = 0;
export const PARTS: Part[] = RAW.map(([label, title, chs]) => ({
  label,
  title,
  chapters: chs.map(([slug, t]) => {
    n += 1;
    return { n, slug, title: t, written: WRITTEN.has(slug) };
  }),
}));

export const CHAPTERS = PARTS.flatMap((p) => p.chapters);

export function chapterBySlug(slug: string) {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function partOf(slug: string) {
  return PARTS.find((p) => p.chapters.some((c) => c.slug === slug))!;
}
