# Nonprofits page — cut content inventory

**Date:** 2026-04-13  
**Context:** `/nonprofits` was rebuilt from the Stitch reference `docs/build/stitch/stitch_movemental_editorial_homepage_non_profit/code.html` (editorial nonprofit homepage). The previous in-repo implementation was the longer “movemental_nonprofit_systems_pathway” page (see git history on `src/app/(site)/nonprofits/page.tsx`).

This document inventories **substantive copy and sections that appeared on the prior nonprofits page but are not present on the new page**, so nothing is lost silently for future reuse in other routes, PDFs, or campaigns.

---

## 1. Intro band after hero (`EditorialShowcaseIntro`)

**Removed block**

- **Eyebrow:** “For nonprofits”
- **Title (h2):** “Install systems — do not rent another year of heroic effort”
- **Description:** “Movemental builds working infrastructure with your team in the room, then leaves it in your hands: content rails, fundraising visibility, governance clarity, and bounded AI where it helps.”

---

## 2. Hero framing change (not a full cut, but copy swap)

**Previous hero eyebrow:** “Systems Architecture”  
**New hero eyebrow:** “Institutional Systems” (from Stitch)

The primary **Display** line and first **Prose** paragraph match Stitch and the prior page; only the eyebrow label changed.

---

## 3. “Status Quo” problem section — replaced narrative

**Previous section**

- **Eyebrow:** “The Status Quo”
- **Title:** “What’s happening now”
- **Body:** Focus on scattered knowledge / siloed data, low visibility, weak growth, information in heads vs structures, “Most organizations are not lacking effort. They are lacking systems.”
- **Image:** `hero-strategy-session-wide.webp` (library / strategy interior)

**New section**

- **Eyebrow:** “Current Reality”
- **Title:** “You’re not lacking activity. You’re lacking systems.”
- **Body:** Stitch copy on willpower, tribal knowledge, spreadsheets, scaling limits, “scattered organization: high energy, low velocity, and perpetual exhaustion.”
- **Image:** Same asset family retained (`hero-strategy-session-wide.webp`) with updated alt text.

The **older paragraphs** about siloed data and visibility are not carried forward verbatim.

---

## 4. Midnight methodology band — shortened

**Previous (richer) content**

- **Eyebrow:** “The Methodology”
- **Title:** “These are not services. These are system builds.”
- **Supporting paragraph:** Engagements build infrastructure and train teams simultaneously; not outsourcing; “installing capacity.”
- **Pull line (pill):** “This is one system, installed in parts.”

**New page**

- Italic **blockquote** only: “These are not services. These are system builds.”

**Cut:** methodology eyebrow, explanatory paragraph, and the pill quote (all recoverable for `/methodology`, `/system-builds`, or a FAQ).

---

## 5. Diagnostic card rail — entire section removed

**Section:** “Diagnostic” / “Where should you start?”

**Three cards (titles + descriptions)**

1. **Content System** — “When knowledge is scattered across documents and inboxes, authority stays invisible — and every departure becomes a setback for the corpus.”
2. **Fundraising System** — “When fundraising is inconsistent, relationships and pipeline visibility suffer — and growth feels like luck instead of stewardship.”
3. **Governance System** — “When decision-making is unclear, execution slows — and good strategy cannot survive ambiguous authority and communication.”

These were **non-linked** `IconFeatureCard` components (diagnostic framing, not system-build deep links).

---

## 6. System builds “bento” grid — replaced by fold cards

**Previous layout:** Four large tiles (three neutral + one **primary** “Discovery Lab (AI)” with **“Emerging”** badge), each with labeled fields:

- **Purpose** (long paragraph each)
- **What gets built** (long paragraph each)
- **Outcome** (long paragraph each)

**Representative structured content (abbreviated labels)**

| Build | Purpose theme | Built theme | Outcome theme |
| ----- | --------------- | ----------- | ------------- |
| Content System | Internal wisdom → external authority | Editorial engine, KB, publishing workflows | Voice without founder dependency |
| Fundraising System | Reactive → systematic cultivation | CRM, sequences, pipeline visibility | Predictable revenue, foresight |
| Governance System | Clarify decisions across the board | Frameworks, cadences, KPI dashboards | Friction down, alignment |
| Discovery Lab (AI) | LLMs for research / admin | Agents, reporting, semantic search | Operational leverage, research scale |

**New page:** Four **compact** cards at the fold with **three bullets each** (from Stitch) and **links** to `/system-builds/*`. The **Purpose / What gets built / Outcome** prose blocks and the **Emerging** badge are not on the nonprofits page anymore (they may still exist on individual system-build routes).

---

## 7. “This is not a menu” — partial rewrite

**Previous closing line emphasis:** “This is not a menu. It’s a system.”  
**Body:** Cross-feeds between Content, Fundraising, Governance, Discovery Lab; “We build with the whole in mind.”

**New:** Stitch headline uses quotes only on “This is not a menu.” Body follows Stitch: interconnected systems, “cohesive organizational engine” (differs in wording from the prior paragraph).

If you need the **exact prior sentence** for cross-page consistency with churches/movement leaders, recover it from git history.

---

## 8. “Typical paths” / implementation sequence — entire section removed

**Eyebrow:** “Common Implementation Sequences”  
**Visual:** Horizontal sequence **Content → Fundraising → Discovery Lab** with styled chips (Discovery Lab highlighted as primary).

No equivalent on the new page.

---

## 9. “What you leave with” / post-build — major restructure

**Previous structure**

- **Left column — “What you leave with”** with checklist:

  - **Working Systems** — “Fully functional technical architecture integrated into your workflow.”
  - **Documented Processes** — “Clear operating procedures so the system doesn't rely on us—or any one individual.”
  - **Trained Team** — “Your staff coached to operate, manage, and evolve the systems we install.”

- **Right column — SurfaceCard “What happens after”**

  - Paragraph on systems as “living engines,” stewardship, maintenance/expansion markers.
  - **Inset quote:** “The goal is not to stay with us forever. The goal is for you to own your infrastructure.”

**New page**

- Stitch **“What you leave with.”** band with four **icon-led** items: **The Architecture**, **The Playbook**, **Trained Team**, **Analytics Suite** (different labels and copy from the old checklist).

**Cut:** the entire **“What happens after”** column and the **ownership** quote; the old three-item checklist wording (partial overlap with new “Architecture / Playbook / Team” but not identical).

---

## 10. Requirements — entire section removed

**Eyebrow:** “Requirements” (destructive tone)  
**Title:** “Building systems requires commitment”

**Three columns**

1. **Team Participation** — Active involvement from daily operators.
2. **Data Access** — Open access to current messy data for clean architectures.
3. **Leadership Engagement** — Strategic buy-in so systems become the permanent standard.

---

## 11. “Why Movemental?” — entire section removed

**Title:** “Why Movemental?”  
**Body:** Obsession with structure; partners focus on “what” (content, campaign, strategy); Movemental focuses on “how” (underlying machines, repeatable, sustainable).

---

## 12. Closing CTA — layout and component change

**Previous**

- `GhostCtaPanel` on a **light** section: title “Ready to install structure?”, description about bottlenecks and `/system-builds`, primary CTA **“Start a conversation”** → `/contact`, secondary outline **“See system builds”** → `/system-builds`.

**New**

- **Midnight** closing band (Stitch): same headline theme; body “Move beyond fragmented effort…”; primary **“Schedule a System Consultation”** → `/contact`; secondary **“View System Builds”** → `/system-builds`.

**Cut relative to prior UX:** `GhostCtaPanel` marketing paragraph about “bottlenecks” and “four-week installs”; CTA label changed from “Start a conversation” to “Schedule a System Consultation.”

---

## 13. Stitch HTML-only placeholders (never shipped in React)

The exported Stitch file included a **full duplicate nav and footer** (placeholder links: Our Vision, Impact, Annual Report, fictional address, social icons). Those were **intentionally omitted** — the live site uses `SiteNav` / `SiteFooter`. No movemental.org React page contained that placeholder chrome.

---

## Suggested reuse destinations

| Cut cluster | Possible home |
| ----------- | -------------- |
| Diagnostic three-card copy | `/who-we-serve`, `/inquiry`, or a future `/nonprofits/diagnostic` |
| Methodology paragraph + pill quote | `/methodology` or `/system-builds` intro |
| Purpose / Built / Outcome bento prose | Already aligned to individual `/system-builds/*` pages — verify parity there |
| Requirements + Why Movemental | `/services`, `/about`, or org inquiry follow-up materials |
| “What happens after” + ownership quote | Case studies, proposal template, or `/walkthrough` |

---

## File references

- **Stitch source:** `docs/build/stitch/stitch_movemental_editorial_homepage_non_profit/code.html`
- **Live route:** `src/app/(site)/nonprofits/page.tsx`
- **Design spec:** `docs/design/DESIGN.md`
