# 16. `/share/ai-reality/[token]` — a shared read-back

**Status** Not built · **Depends on** the Reality Map, already built

## Purpose

Someone completed the Organizational Reality Map and sent the result to a
colleague, a board chair, or a senior pastor. **The person opening this page did
not answer the questions.** That single fact drives every design decision here:
they arrive with no context, possibly sceptical, and quite possibly holding
authority over the person who sent it.

This is the most under-designed high-leverage page in the system. A read-back
forwarded to a board chair is the moment the assessment becomes a decision.

## Read first

- `src/app/share/ai-reality/[token]/page.tsx`
- `src/app/dashboard/ai-reality/page.tsx` — the owner's view of the same data
- Supabase: `ai_reality_share_tokens`, `ai_reality_results`,
  `ai_reality_org_results`, `ai_reality_invites`. Read the columns — they define
  what a shared read-back can contain and whether the sharer chose what to expose.
- `src/lib/agent-room/data/map-q.ts` — `computeMapRead`, `STAGE_CLEAR`,
  `SAFETY_GATE_GAP_LINE`, `SAFETY_GATE_THREAT`
- `Movemental Reality Map.dc.html` in this project — reuse its read-back
  vocabulary exactly; a recipient comparing the two should see one document.

## Structure

1. **Header** — standard sticky. No `Crumb` "back" — there is nowhere back to.
2. **The framing line — the most important element on the page.** Who ran this,
   for which organization, and when. Something like: "<Name> mapped <Org>
   against the four stages on <date>." Without this the page is a stranger's
   diagnosis of your organization, which reads as presumptuous.
3. **The four-stage read-back** — `PathLayer` rows with each stage's worst gap or
   its clear line, and "you are here" on the first unresolved stage. Identical
   treatment to the Reality Map.
4. **The prose** — the read-back lead and body. Where the Safety gate failed,
   this is `SAFETY_GATE_THREAT`, and it is strong language. It reads differently
   to a board chair than to the person who chose their own answers. Keep it
   verbatim, but let the framing line above do the work of contextualising it.
5. **These were the answers** — the six questions with the chosen answers, if
   the token's data carries them. A recipient with authority will want to know
   what was actually said, not just the conclusion. This is what makes the page
   trustworthy rather than a marketing artefact.
6. **What happens next** — the honest fork: the free Handbook, or the Dashboard.
   Cross-link the Safety page.
7. **Run your own** — a link to the Reality Map, so the recipient can answer for
   themselves rather than accept someone else's answers.

## Design system

`PathLayer`, `Eyebrow`, `SectionLabel`, `InkVoice`, `WayCard` for the fork.

## Interactions

Minimal. A recipient reads and leaves. No assessment flow, no dock, no chips
competing with the document.

## Tweaks

`gateOutcome` (enum: failed / passed) and `showAnswers` (boolean), so both states
can be previewed without a real token.

## Honesty constraints

- **Never invent the organization's name, the sharer's name, or the date.** If
  the token data lacks them, the framing line degrades gracefully — "An
  organization mapped itself on the four stages" — rather than fabricating.
- Do not show answers the sharer did not choose to expose. Check the token
  schema for a visibility flag before designing section 5.
- No urgency aimed at the recipient. They are being informed, not sold.

## Done when

- Both gate outcomes render correctly.
- The framing line makes clear this is someone else's assessment.
- The page is legible with no answers exposed and with all six shown.
- Nothing on the page is fabricated when token data is sparse.
