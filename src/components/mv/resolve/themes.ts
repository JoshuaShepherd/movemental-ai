/**
 * The nine themes of the Resolution, verbatim from the canvas board R3-Flow
 * (docs/handoff/resolve-new/source/R3-Flow.dc.html). Generated; edit the board, not this file.
 */

export interface ResolveTheme {
  name: string;
  question: string;
  statements: readonly string[];
  stake: string;
}

export const RESOLVE_THEMES: readonly ResolveTheme[] = [
  {
    name: "Presence",
    question: "Where must a person always be present in our work?",
    statements: [
      "We should name the work that is made of presence, and keep it human.",
      "We should never put what someone told us in confidence into an AI tool.",
      "We should keep the moments of care human.",
      "No one we serve should believe a person attended to them when none did.",
      "If AI helps more people get a timely answer, that is care too.",
    ],
    stake:
      "Some work matters because a person does it: a hospital visit, a hard conversation, a prayer, a welcome. Some leaders want that work named and kept human, whatever AI could offer. Others point out that a timely, accurate answer at two in the morning can be real care, especially when no person is available. The first guards something irreplaceable. The second reaches people the first might miss.",
  },
  {
    name: "Voice",
    question: "When people receive words in our name, what should they be able to assume?",
    statements: [
      "Everything we publish should sound like us and say what we believe.",
      "A person should remain responsible for anything sent in our name.",
      "We should say when AI substantially shaped something presented as ours.",
      "We should resist sounding, deciding and serving like everyone else.",
      "Clear and well made should matter more than whose words they are.",
    ],
    stake:
      "AI writes clear, polished prose that sounds like everyone else’s. Some leaders hold that what an organization publishes should sound like its people, and that readers deserve to know when a machine shaped it. Others care most that communication is clear and useful, whoever drafted it. The first takes more effort and some disclosure. The second risks an organization that slowly stops sounding like itself.",
  },
  {
    name: "Truth",
    question: "How open should we be about how AI is used here?",
    statements: [
      "We should say plainly how AI is used here, including by our leaders.",
      "We should name what’s true now and expect to name it again.",
      "We should know what AI already tells people about us.",
      "How each person uses AI should stay their own business.",
      "Until we have a policy, we should keep our use of AI quiet.",
    ],
    stake:
      "In most organizations, people are already using AI, often quietly. Some leaders want that use said out loud, including their own, so decisions start from what is actually happening. Others see each person’s use as private, or would rather wait for a policy before talking about it. Openness can feel exposing and may surface uncomfortable things. Silence protects people for now, but decisions get made without the facts.",
  },
  {
    name: "Thinking",
    question: "Which judgment should stay with us, even when AI could offer one?",
    statements: [
      "We should form our own views before we ask AI for one.",
      "We should notice when we’re becoming dependent, and step back.",
      "We should use AI as a thinking partner, not an answer machine.",
      "We should let AI draft first, and do our real thinking in the edit.",
      "For routine decisions, we should trust a good AI recommendation by default.",
    ],
    stake:
      "AI can draft a memo, summarize a meeting and recommend a decision in seconds. Some leaders want people to think first and use AI to test their thinking, because judgment weakens when it isn’t exercised. Others see letting AI draft first as a sensible division of labor, with the real thinking happening in the edit. The first is slower. The second is faster, but it becomes easy to stop noticing what you’ve stopped deciding.",
  },
  {
    name: "Learning",
    question: "How should our people learn to work with AI?",
    statements: [
      "We should keep learning as if we just arrived.",
      "We should make time for everyone here to try new things with AI.",
      "We should learn from people whose wisdom predates AI.",
      "We should wait for tools to prove themselves before we train anyone.",
      "We should leave AI fluency to a few specialists.",
    ],
    stake:
      "AI tools change every few months, so whatever anyone learned last year is already partly out of date. Some leaders want everyone experimenting now, because fluency only comes from use. Others would rather wait for the tools to settle, or leave fluency to a few people, so staff time stays on the mission. The first costs time and some false starts. The second risks a staff that can’t judge what the specialists bring back.",
  },
  {
    name: "Time",
    question: "What should happen to the time AI saves?",
    statements: [
      "We should give the time AI saves back to people, to creation and to play.",
      "We should let roles change and help people grow into new work.",
      "We shouldn’t assume saved time has to be filled with more output.",
      "Time AI saves should first lower our costs, so more reaches the mission.",
      "If AI can do a role well, we should let that role get smaller.",
    ],
    stake:
      "When AI saves hours, someone decides where those hours go. Some leaders want them given back to people as more presence, more creativity and more rest, with room for roles to grow. Others want the savings to lower costs so more money reaches the mission, even if some roles get smaller. Both can be faithful choices. The first protects people and culture. The second stretches resources further for the people being served.",
  },
  {
    name: "Risk",
    question: "How much should we try while the stakes are real?",
    statements: [
      "We should keep a place to experiment where being wrong is survivable.",
      "We should tolerate the mess that experimenting brings.",
      "We should share what didn’t work as readily as what did.",
      "When in doubt, we should slow down.",
      "With trust at stake, we should wait until others have proven it safe.",
    ],
    stake:
      "Learning what AI is good for means trying things, and some of them won’t work. Some leaders want a safe place to experiment and are willing to tolerate the mess. Others, knowing that trust is what the organization serves with, would rather wait until a use has been proven safe elsewhere. Experimenting risks visible mistakes. Waiting risks learning late, and on someone else’s terms.",
  },
  {
    name: "People",
    question: "Who should we work this out with?",
    statements: [
      "We shouldn’t walk this alone.",
      "We should find others beyond our walls who are walking it too.",
      "We should reach past the relationships we already have.",
      "We should help voices unlike ours, and still unseen, become easier to find.",
      "This is an internal matter, and we should keep it inside our walls.",
    ],
    stake:
      "Few organizations have walked this road, and none have walked it far. Some leaders want to find others beyond their walls, learning together and building relationships they don’t have yet. Others see AI decisions as internal matters best kept in-house. Reaching out takes time and means being seen while still figuring things out. Staying inside keeps things private, but it means learning alone.",
  },
  {
    name: "Leading",
    question: "What kind of leadership does this need from us?",
    statements: [
      "Leading through AI should be something we practice, not only a policy we write.",
      "We should decide what AI may touch before it touches anything that matters.",
      "We should make ethical decisions as we go, without waiting for certainty.",
      "Our leaders should put their own practice in order first.",
      "A clear policy should be most of the work, with the rest left to staff.",
    ],
    stake:
      "A written policy can settle a lot: what’s allowed, what isn’t, and who decides. Some leaders see policy as most of the job, with the day-to-day left to staff. Others see leading through AI as an ongoing practice that leaders model, try and revise as they go. Policy-first is clear and contained, but it can go stale quickly. Practice-first asks more of leaders’ time and attention.",
  },
];

/** The leadership turn. Index 4 means "not ready" and never appears on the document. */
export const RESOLVE_ACTS: readonly string[] = [
  "I’ll share this with someone who decides.",
  "I’ll invite a colleague to write theirs.",
  "I’ll ask for this conversation at our next team meeting.",
  "I have authority to begin this conversation for our organization.",
  "I’m not ready to share this yet.",
];

export const NOT_READY_ACT = 4;
