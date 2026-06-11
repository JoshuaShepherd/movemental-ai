/**
 * Dashboard conversion screen — ported from `docs/html/safety-scene/03-dashboard-conversion.html`.
 */
export const SAFETY_DASHBOARD_COPY = {
  eyebrow: "Safety · step 01",
  headline: "Finish a board-ratified Safety charter — in the dashboard.",
  lede: "The dashboard drafts all five Guidebook documents with you, in your organization's context, to a state your board can actually ratify. Not a template dump — an artifact taking shape.",
  compare: {
    before: {
      tag: "Alone with the PDF",
      text: "Blank page. You read the Guidebook, mean to start, and stall before anything is signable.",
    },
    after: {
      tag: "In the dashboard",
      text: "Guided straight to five drafted layers — Statement through Response Plans — ready for board review.",
    },
  },
  assembleLabel: "Five documents · assembling now",
  proof: {
    eyebrow: "Board-ready output · excerpt",
    title: "AI Organizational Statement",
    excerpt:
      "Our organization will use AI to extend formation and care — never to impersonate pastoral voice, fabricate testimony, or place donor or member data in unvetted consumer tools. Human authorship and disclosure are non-negotiable in anything that carries our name publicly.",
    signature: "Draft v3 · ready for executive review",
  },
} as const;

export const SAFETY_DASHBOARD_DOCUMENTS = [
  { layer: "01", title: "Statement", drafting: false, left: "2%", top: "6%", rot: "-6deg", z: 1 },
  { layer: "02", title: "Policy", drafting: false, left: "16%", top: "2%", rot: "-2deg", z: 2 },
  { layer: "03", title: "Context", drafting: true, left: "32%", top: "8%", rot: "2deg", z: 3 },
  { layer: "04", title: "Rules", drafting: true, left: "48%", top: "0%", rot: "5deg", z: 4 },
  { layer: "05", title: "Response Plans", drafting: true, left: "60%", top: "10%", rot: "7deg", z: 5 },
] as const;
