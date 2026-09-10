# 06. `/how-we-use-ai` — the disclosure page

**Status** Not built

## Purpose

Movemental sells AI governance. This page is where it holds itself to the
standard it sells — its own AI Charter, in public. If this page is weak, every
other page's argument weakens with it. It is the single strongest credibility
asset on the site and the easiest to get wrong by being vague.

## Read first

- `src/app/how-we-use-ai/page.tsx` and `src/app/agent/how-we-use-ai/page.tsx`
- The five Charter layers in `src/lib/agent-room/data/safety-charter.ts` — this
  page should visibly answer the same five questions Movemental asks its clients
- `src/lib/agent-room/data/safety-charter-drafts.ts` — the draft charter HTML
- The design system guide's content-fundamentals section: "Honesty as a feature.
  Whole sections are devoted to what we refuse to do."

## Structure — mirror the five layers

The strongest possible structure is Movemental's own framework applied to
itself. Each layer answers for Movemental what it asks a client to answer:

1. **Statement** — what Movemental believes about AI in its own work.
2. **Policy** — which uses are sanctioned in building this product, and who
   decides.
3. **Context** — what data Movemental holds: assessment answers, contact
   details, transcripts (`agent_room_transcripts`, `ai_reality_results`,
   `contact_submissions` all exist in the database). Name them plainly.
4. **Rules** — how AI is used in the agent room, in drafting client charters, in
   writing site copy. Where a human reviews. What is disclosed.
5. **Response plans** — what happens when the agent gets something wrong, who is
   accountable, how a visitor reports it.

Then:

6. **What the agent will not do** — it says "That's outside what I can help
   with" rather than bluffing. Feature this.
7. **What is AI-assisted on this site** — the specific, honest disclosure. If
   the assessment read-back is generated, say so. If leader profiles are
   human-verified, say so.
8. **How to reach a person** — no form. Just Josh.

## Critical constraint

**Do not write Movemental's AI policy for them.** This page's content is a
commitment the company makes, not copy a designer supplies. Where the repo has
the real text, use it verbatim. Where it does not, build the section structure
and mark the gap explicitly — a mono placeholder reading, for example,
"Movemental to supply: our own Layer 03 context inventory." A visibly unfinished
honest page is worth more than a fluent invented one, and shipping invented
policy on a governance product would be the worst possible failure.

Flag every gap to the user in the delivery summary so they can fill them.

## Design system

`Eyebrow`, `SectionLabel`, `FaqItem` for the layer disclosures, `PathLayer` for
the five-layer rail, `InkVoice` for the agent's own line about its limits. The
notebook margin throughout — this is a reading document.

## Tweaks

`showGaps` (boolean — whether unsupplied sections render as labelled gaps or are
hidden entirely).

## Done when

- All five layers have a section, whether filled or explicitly marked as a gap.
- Zero sentences of invented policy.
- The refusals section is prominent, not buried.
- Every gap is listed in the delivery summary for the user to supply.
