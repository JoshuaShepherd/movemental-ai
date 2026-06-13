import type { DeckData } from "./deck-types";

/**
 * "Why a platform, not a website builder?" — the church price-reframe deck.
 * Ported from the standalone `movemental-for-churches.html` deck into the
 * typed `DeckData` contract. Seam-in (slide 1) echoes the question "The build"
 * leaves the reader with ("isn't this just an expensive church website?");
 * seam-out (slide 11) resolves forward into Formation — the people formed to
 * steward what's been built.
 *
 * Gesture restraint: at most one hand-drawn gesture per slide, and exactly one
 * highlighter swipe across the whole deck (slide 11, "always needed").
 *
 * The authorship-and-discernment slide (`authorship`) is the deck's conscience
 * for this audience: it stays at full strength, with its underline gesture on
 * "never touches the discernment". Do not soften, shorten, or merge it.
 */
export const churchDeck: DeckData = {
  id: "church-why-a-platform",
  audience: "church",
  navLabel: "Why a platform",
  ariaLabel: "Why a platform, not a website builder, a slide deck for churches",
  slides: [
    {
      id: "title",
      kind: "title",
      eyebrow: "A fair question",
      heading: "Isn't this just an expensive church website?",
      body: ["A real choice. And the real question isn't the one you'd expect."],
    },
    {
      id: "price-thought",
      kind: "content",
      eyebrow: "The first thought",
      heading: "Your church has a website, and it works.",
      body: [
        "So when you hear the price, the first thought is: that's a lot for a church website. Hold that thought. It's pointing at the wrong thing.",
      ],
      gesture: { type: "underline", phrase: "the wrong thing" },
    },
    {
      id: "reframe",
      kind: "content",
      eyebrow: "The real question",
      heading: "You're not paying more for a website.",
      body: [
        "You're considering something you quietly ruled out long ago. A platform that shares your teaching like a real publication, and runs tools built for how your church actually works, used to cost a quarter of a million dollars and a software team. So you never considered it. You were right not to.",
        "That cost just collapsed. Building software with AI made it far cheaper. The price didn't go up on a website. It came down on something you always needed and could never justify.",
      ],
      gesture: { type: "circle", phrase: "ruled out" },
    },
    {
      id: "concede",
      kind: "content",
      eyebrow: "Let's be fair",
      heading: "What you already have is good.",
      body: [
        "Website builders make a clean site, they take giving, they're cheap. If a simple site is all you need, use them. We mean that. We'd rather tell you so than sell you more than you need.",
        "But a tool built to make any website doesn't know what a church actually is. It hands you an empty container and leaves the hard parts to you.",
      ],
    },
    {
      id: "two-parts",
      kind: "content",
      eyebrow: "The hard parts",
      heading: "For a church, two of them matter most.",
      parts: [
        {
          n: "01",
          title: "Being found and followed.",
          desc: "Whether the people you're trying to reach can find your teaching, and whether your community knows you're here.",
        },
        {
          n: "02",
          title: "The weekly grind.",
          desc: "The repeating work that buries a small team and never seems to end.",
        },
      ],
      body: ["A website builder helps with neither. They're exactly the parts it leaves to you."],
    },
    {
      id: "being-found",
      kind: "content",
      eyebrow: "Hard part one · Being found & followed",
      heading: "Your teaching scatters, and the story doesn't reach.",
      body: [
        "A visitor checks you out online before they ever walk in. A member wants last week's sermon and can't find it. Your best teaching evaporates the day after it's preached. It survives, if at all, as an un-searchable video. The wisdom of this church lives in a few heads instead of a place anyone can return to.",
        "You're called to reach people and form them. That's hard when your own teaching can't be found.",
      ],
    },
    {
      id: "authorship",
      kind: "content",
      eyebrow: "And it has to be real",
      heading: "Shared well, but always by your own people.",
      body: [
        "Most churches share their teaching below the quality of the teaching itself, because no one has the time or a system to do it well. We give you that system.",
        "It helps your people tell what God is doing here. It never puts words in a pastor's mouth, and it never touches the discernment, the shepherding, or the care. The ministry stays yours.",
      ],
      gesture: { type: "underline", phrase: "never touches the discernment" },
    },
    {
      id: "the-grind",
      kind: "content",
      eyebrow: "Hard part two · The weekly grind",
      heading: "Your team is buried in work that repeats.",
      body: [
        "The bulletin. Turning Sunday's sermon into something people can actually use during the week. Answering the same questions again. Finding that document from three years ago.",
        "We build tools shaped to how your church actually works, so that grind gets lighter. Not a fixed product we hand everyone. Tools built to your church. The point is simple: your small team stops drowning.",
      ],
    },
    {
      id: "diagram",
      kind: "diagram",
      eyebrow: "See the difference",
      heading: "Same website. Different system underneath.",
    },
    {
      id: "not-for",
      kind: "content",
      eyebrow: "Honest about fit",
      heading: "Here's who we're not for.",
      body: [
        "If you need a simple site and a way to give, use a website builder. It's cheaper and it's fine.",
        "We're for the other church. The one whose teaching and story are bigger than its ability to share them, whose team is buried, and who's noticed that “look them up” now means “ask an AI about them.” That church needs more than a website. It always did.",
      ],
      gesture: { type: "underline", phrase: "not for" },
    },
    {
      id: "close",
      kind: "close",
      eyebrow: "In short",
      heading: "You're not overpaying for a website.",
      body: [
        "You're finally able to share the ministry God has given you the way it deserves. The platform your church always needed, now that the cost of building it just came down.",
        "And a platform is only ever as good as the people formed to steward it.",
      ],
      gesture: { type: "highlight", phrase: "always needed" },
    },
  ],
  diagram: {
    surfaceTiles: ["Home", "About", "Ministries", "Give"],
    surfaceChips: ["Hosting", "Templates", "Give button"],
    systemTiles: [
      { title: "Your teaching, shared", site: "scattered, if at all", platform: "found, and shared well" },
      { title: "Tools for your team", site: "not possible", platform: "built to your church" },
      { title: "Your community knows you", site: "easy to miss", platform: "present and clear" },
      { title: "Legible to AI", site: "invisible or made up", platform: "represented faithfully" },
    ],
    captions: {
      site: "Just a site. A website builder gives you the pages, hosting, and a give button, and leaves the part that matters to you. Sharing your teaching, reaching your community, lightening your team's load: all on you.",
      home: "A platform. Movemental gives you the same site, and the system underneath it. Your teaching shared well, tools built for your team, a community that knows you're here, and a presence the AI can represent faithfully.",
    },
    toggleLabels: { off: "Just a site", on: "A platform" },
  },
};
