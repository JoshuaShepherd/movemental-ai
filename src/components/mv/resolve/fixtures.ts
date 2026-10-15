/**
 * Sample data from the canvas boards, shown until the back end exists. Every screen that
 * renders these labels them "Sample data." (fixture seam; see docs/handoff/resolve-new/README.md).
 * Riverbend, Priya, James and everyone else here are fictional.
 */

/** The board's sample invitation, used only with `?invited=sample` on /resolve-new. */
export const SAMPLE_INVITATION = { from: "Priya", pronoun: "she", org: "Riverbend Youth & Family" } as const;

/** R3-Shared: the one shared Resolution that exists, at the board's sample link. */
export const SAMPLE_SHARED = {
  token: "k7p2qx",
  author: "Priya",
  role: "Associate director of programs",
  org: "Riverbend Youth & Family",
  short: "Riverbend",
  date: "October 6, 2026",
  lines: [
    ["Presence", "We should name the work that is made of presence, and keep it human."],
    ["Voice", "A person should remain responsible for anything sent in our name."],
    ["Truth", "We should say plainly how AI is used here, including by our leaders."],
    ["Thinking", "We should form our own views before we ask AI for one."],
    ["Learning", "We should keep learning as if we just arrived."],
    ["Time", "We should give the time AI saves back to people, to creation and to play."],
    ["People", "We should find others beyond our walls who are walking it too."],
    ["Leading", "Leading through AI should be something we practice, not only a policy we write."],
  ] as const,
  hardest: "We should say plainly how AI is used here, including by our leaders.",
  acts: [
    "I’ll share this with someone who decides.",
    "I’ll ask for this conversation at our next team meeting.",
  ],
} as const;

/** R3-Others: how public Resolutions divide on Time. */
export const SAMPLE_TIME_SPLIT = {
  total: "1,074",
  rows: [
    ["We should give the time AI saves back to people, to creation and to play.", 412],
    ["Time AI saves should first lower our costs, so more reaches the mission.", 301],
    ["We should let roles change and help people grow into new work.", 188],
    ["We shouldn’t assume saved time has to be filled with more output.", 129],
    ["If AI can do a role well, we should let that role get smaller.", 44],
  ] as const,
} as const;

/** R4-People: the people a sample writer invited, below the five-person threshold. */
export const SAMPLE_INVITEES = [
  ["James Okafor", "Executive director · invited October 6", "Written theirs"],
  ["Dana Reyes", "Program staff · invited October 6", "Written theirs"],
  ["Tom Whitlock", "Board · invited October 8", "Written theirs"],
  ["Ana Lima", "Volunteer · invited October 8", "Not yet"],
  ["Sam Ortiz", "Program staff · invited October 9", "Prefers not to say"],
  ["dmorgan@riverbendyf.org", "Invited October 12", "Not yet"],
] as const;

export const SAMPLE_WRITTEN = 3;

export const SAMPLE_ROAD = {
  line: [
    ["Marcus Bell", "Grace Street Church", "Also starred, in Time", "We should give the time AI saves back to people, to creation and to play."],
    ["Helen Park", "Northside Food Partners", "Also starred, in Truth", "We should say plainly how AI is used here, including by our leaders."],
    ["Rev. Luis Mendoza", "Iglesia La Roca", "Also starred, in People", "We should find others beyond our walls who are walking it too."],
  ],
  kind: [
    ["Helen Park", "Northside Food Partners · nonprofit", "Also a youth and family nonprofit", "We should keep the moments of care human."],
    ["Ruth Adeyemi", "Open Door Mentoring · nonprofit", "Also a youth and family nonprofit", "We should make time for everyone here to try new things with AI."],
  ],
  near: [
    ["Marcus Bell", "Grace Street Church · Lawrence", "Showed their city", "We should give the time AI saves back to people, to creation and to play."],
  ],
} as const;
