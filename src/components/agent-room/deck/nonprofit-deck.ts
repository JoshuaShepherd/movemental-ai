import type { DeckData } from "./deck-types";

/**
 * "Why a platform, not a website builder?" — the nonprofit price-reframe deck.
 * Ported from the standalone `movemental-for-organizations.html` deck into the
 * typed `DeckData` contract. Seam-in (slide 1) echoes the question "The build"
 * leaves the reader with; seam-out (slide 11) resolves forward into Formation.
 *
 * Gesture restraint: at most one hand-drawn gesture per slide, and exactly one
 * highlighter swipe across the whole deck (slide 11, "always needed").
 */
export const nonprofitDeck: DeckData = {
  id: "nonprofit-why-a-platform",
  audience: "nonprofit",
  navLabel: "Why a platform",
  ariaLabel: "Why a platform, not a website builder — a slide deck",
  slides: [
    {
      id: "title",
      kind: "title",
      eyebrow: "A fair question",
      heading: "Isn't this just an expensive website?",
      body: ["A real choice — and the real question isn't the one you'd expect."],
    },
    {
      id: "price-thought",
      kind: "content",
      eyebrow: "The first thought",
      heading: "You run on WordPress, and it works.",
      body: [
        "So when you hear the price, the first thought is: that's a lot to pay for a website. Hold that thought — because it's pointing at the wrong thing.",
      ],
      gesture: { type: "underline", phrase: "the wrong thing" },
    },
    {
      id: "reframe",
      kind: "content",
      eyebrow: "The real question",
      heading: "You're not paying more for a website.",
      body: [
        "You're considering something you quietly ruled out years ago. A platform that publishes your work like a real newsroom, and runs tools built for how your organization actually operates, used to cost a quarter of a million dollars and a software team. So you never considered it. You were right not to.",
        "That cost just collapsed. Building software with AI made it far cheaper to make. The price didn't go up on a website. It came down on something you always needed and could never justify.",
      ],
      gesture: { type: "circle", phrase: "ruled out" },
    },
    {
      id: "concede",
      kind: "content",
      eyebrow: "Let's be fair",
      heading: "What you already have is good.",
      body: [
        "WordPress and Squarespace make a clean website, they take donations, they're cheap. If a simple site is all you need, use them. We mean that — we'd rather tell you so than sell you more than you need.",
        "But a tool built to make any website doesn't know what your organization actually is. It hands you an empty container and leaves the hard parts to you.",
      ],
    },
    {
      id: "two-parts",
      kind: "content",
      eyebrow: "The hard parts",
      heading: "For an organization like yours, two of them matter most.",
      parts: [
        {
          n: "01",
          title: "Being understood.",
          desc: "Whether the people you depend on grasp your work, trust it, and feel moved to support it.",
        },
        {
          n: "02",
          title: "The daily grind.",
          desc: "The repeatable work that buries a small staff and never seems to end.",
        },
      ],
      body: ["A website builder helps with neither. They are exactly the parts it leaves to you."],
    },
    {
      id: "being-understood",
      kind: "content",
      eyebrow: "Hard part one · Being understood",
      heading: "Your work is scattered, so your story doesn't land.",
      body: [
        "Some of it sits in an old newsletter. Some lives in one staff member's head. Some never gets told at all. A grant officer can't find proof of your impact. A donor never sees the story that would have moved them. Your own board can't quite say what makes you different.",
        "You need to publish. Steadily, and well. Not marketing for its own sake. Your mission deserves to be understood by the people whose understanding you depend on.",
      ],
      gesture: { type: "underline", phrase: "You need to publish" },
    },
    {
      id: "authorship",
      kind: "content",
      eyebrow: "And it has to be real",
      heading: "Told well — but always by your own people.",
      body: [
        "Most organizations publish below the quality of their own work, because no one has the time or a system to do it well. We give you that system, so your mission gets told at the level it deserves.",
        "It helps your people tell your stories. It never fakes them, and it never writes in place of a real person. The work stays yours. We just make sure it gets told as well as it deserves to be.",
      ],
      gesture: { type: "underline", phrase: "never fakes them" },
    },
    {
      id: "the-grind",
      kind: "content",
      eyebrow: "Hard part two · The daily grind",
      heading: "Your staff is buried in work that repeats.",
      body: [
        "The grant report. Turning one event into a newsletter and three posts. Answering the same donor questions again. Finding that document from 2019.",
        "We build tools shaped to how your team actually works, so that grind gets lighter. Not a fixed product we hand everyone — tools built to your organization. The point is simple: your small team stops drowning.",
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
        "If you need a brochure site and a donate button, use WordPress. It's cheaper and it's fine.",
        "We're for the other organization — the one whose work is bigger than its ability to tell it, whose staff is buried, and who has started to notice that “look us up” now means “ask an AI about us.” That organization needs more than a website. It always did.",
      ],
      gesture: { type: "underline", phrase: "not for" },
    },
    {
      id: "close",
      kind: "close",
      eyebrow: "In short",
      heading: "You're not overpaying for a website.",
      body: [
        "You're finally able to afford the platform your mission always needed — because the cost of building it just came down.",
        "And a platform is only ever as good as the people stewarding it.",
      ],
      gesture: { type: "highlight", phrase: "always needed" },
    },
  ],
  diagram: {
    surfaceTiles: ["Home", "About", "Programs", "Donate"],
    surfaceChips: ["Hosting", "Templates", "Donate button"],
    systemTiles: [
      { title: "Your stories, published", site: "sporadic, if at all", platform: "steady, and told well" },
      { title: "Tools for your staff", site: "not possible", platform: "built to your work" },
      { title: "Donors & board get it", site: "scattered everywhere", platform: "one clear place" },
      { title: "Legible to AI", site: "invisible or made up", platform: "represented as you are" },
    ],
    captions: {
      site: "Just a site. WordPress gives you the surface — pages, hosting, a donate button — and leaves the part that matters to you. Telling your story well, lightening your staff's load, being understood: all on you.",
      home: "A platform. Movemental gives you the same site — and the system underneath it. Your stories published well, tools built for your team, one place people understand you, and a presence the AI can represent accurately.",
    },
    toggleLabels: { off: "Just a site", on: "A platform" },
  },
};
