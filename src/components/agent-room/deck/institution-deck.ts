import type { DeckData } from "./deck-types";

/**
 * "Movemental, or a website builder?" — the institution category-reframe deck.
 * Ported from the standalone `movemental-for-institutions.html` deck into the
 * typed `DeckData` contract, reusing the same `DeckSection` / `StandaloneDeck`
 * renderers as the nonprofit deck (see ./nonprofit-deck.ts).
 *
 * Audience difference: an institution's first thought is NOT "isn't this a lot
 * for a website" — it's "which budget does this even come from?" The deck
 * reframes the spend as credibility + governance infrastructure, not a website
 * line-item. Seam-in (slide 1) picks up the category/budget question "The build"
 * leaves an institutional reader with (see institutions-config `bridgeQuestion`);
 * seam-out (slide 11) resolves forward into Formation — forming the leaders who
 * will face this everywhere.
 *
 * Cold-read discipline: this deck gets forwarded to a skeptical provost, dean,
 * or CFO with no salesperson present, so the substance carries the argument, not
 * momentum. The credibility-is-the-product claim, the fragmentation / two-
 * timelines logic, and the "we gather and draft; you discern and govern" trust
 * gate all stand on a standalone read.
 *
 * Gesture restraint: at most one hand-drawn gesture per slide, and exactly one
 * highlighter swipe across the whole deck — on "credibility is the product"
 * (slide 6, the core claim), never on the close.
 */
export const institutionDeck: DeckData = {
  id: "institution-why-a-platform",
  audience: "institution",
  navLabel: "Why a platform",
  ariaLabel: "Movemental, or a website builder — a slide deck for institutions",
  slides: [
    {
      id: "title",
      kind: "title",
      eyebrow: "A real choice",
      heading: "Movemental, or a website builder?",
      body: ["A real choice — and for an institution, the obvious question is the wrong one."],
    },
    {
      id: "category-thought",
      kind: "content",
      eyebrow: "The first thought",
      heading: "Your first question isn't about the price.",
      body: [
        "A seminary, a denomination, a university doesn't flinch at this number — you spend it on a single consultant engagement. So the first question isn't whether this is a lot for a website. It's quieter: which part of the institution does this even belong to?",
      ],
    },
    {
      id: "reframe",
      kind: "content",
      eyebrow: "The real question",
      heading: "This isn't a website line-item.",
      body: [
        "It's credibility and governance infrastructure — the thing that decides whether your institution's authority survives this moment, and whether decades of work still hold together. That doesn't come from the marketing budget.",
        "Yes, the custom version of this used to cost hundreds of thousands and a software team, and building with AI collapsed that. But for an institution, the point was never the price. It's the category.",
      ],
    },
    {
      id: "concede",
      kind: "content",
      eyebrow: "Let's be fair",
      heading: "You can already make a fine website.",
      body: [
        "Between a website builder and your own IT, a clean public site is well within reach. If that's all you need, you have it.",
        "But a public website doesn't touch the two things that actually put an institution at risk right now.",
      ],
    },
    {
      id: "two-risks",
      kind: "content",
      eyebrow: "The two risks",
      heading: "Credibility, and coherence.",
      parts: [
        {
          n: "01",
          title: "Credibility.",
          desc: "Whether, in an age of synthetic everything, your institution is still distinguishable from a convincing fake.",
        },
        {
          n: "02",
          title: "Coherence.",
          desc: "Whether decades of work, scattered across committees and archives, still add up to something you can stand behind.",
        },
      ],
      body: ["A website addresses neither."],
    },
    {
      id: "credibility",
      kind: "content",
      eyebrow: "Risk one · Credibility",
      heading: "For an institution, credibility is the product.",
      body: [
        "A business that makes a mistake loses a client. You'd lose trust in the credential itself — and there's no fallback. AI now imitates institutional voice trivially, and a young leader's search mixes your real scholarship with synthetic approximations of it.",
        "An institution that hasn't gathered its work into something with verifiable provenance becomes, to that searcher, indistinguishable from a well-made fake. The authority is real. The means of proving it are quietly disappearing.",
      ],
      gesture: { type: "highlight", phrase: "credibility is the product" },
    },
    {
      id: "coherence",
      kind: "content",
      eyebrow: "Risk two · Coherence",
      heading: "Your work is fragmented — and it compounds.",
      body: [
        "The 2011 curriculum, the 2014 textbook, the 2023 statement: never reconciled, so the credential means subtly different things by year. The archive is preserved and unsearchable. The institution chartered to provide continuity can no longer learn from itself.",
        "And you carry two timelines at once. Whatever you decide internally becomes the template every graduate carries into the churches and classrooms they'll lead. Doing nothing is still a template.",
      ],
    },
    {
      id: "stays-yours",
      kind: "content",
      eyebrow: "And it stays yours",
      heading: "We gather and draft. You discern and govern.",
      body: [
        "We do the research, the gathering, the structure, the first drafts. That's the work that buries an institution and never gets done.",
        "We never author scholarship under a scholar's name, and the discernment — what your institution believes, ratifies, and stands behind — never leaves your hands. That isn't a limit on the work. It's the point of it.",
      ],
      gesture: { type: "underline", phrase: "never leaves your hands" },
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
        "If you only need a public-facing website, and you have IT for the rest, you may not need us. Say so, and use what you have.",
        "We're for the institution whose body of knowledge and credibility is the thing at risk — the one that has realized a young leader now asks a machine about it before they ask anyone. That institution needs more than a website. It always did.",
      ],
      gesture: { type: "underline", phrase: "not for" },
    },
    {
      id: "close",
      kind: "close",
      eyebrow: "In short",
      heading: "You form the people who will face this everywhere.",
      body: [
        "An institution that meets this moment with wisdom forms a generation of leaders who meet it with wisdom. Begin where it begins — by gathering what you stand for, and proving it's still yours.",
      ],
    },
  ],
  diagram: {
    surfaceTiles: ["Home", "About", "Programs", "Apply"],
    surfaceChips: ["Hosting", "Templates", "A public face"],
    systemTiles: [
      { title: "Your scholarship, gathered", site: "scattered, unsearchable", platform: "gathered, one source" },
      { title: "Governance & policy tools", site: "not possible", platform: "built to your work" },
      { title: "Verifiable & cited", site: "looks credible only", platform: "provenance, sourced" },
      { title: "Legible to the AI they ask", site: "mixed with fakes", platform: "represented accurately" },
    ],
    captions: {
      site: "Just a site. A public website gives you the surface — and leaves the part that matters unsolved. Gathering your scholarship, proving it's yours, governing how AI is used across the institution: all still on you.",
      home: "A platform. Movemental gives you the same site — and the system underneath. Your scholarship gathered and verifiable, governance tools built for you, and a presence the AI represents accurately instead of inventing.",
    },
    toggleLabels: { off: "Just a site", on: "A platform" },
  },
};
