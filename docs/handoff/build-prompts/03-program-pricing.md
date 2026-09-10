# 03. `/program` — the four stages and all public pricing

**Status** Not built
**Inbound links** "See the path" across the home page and the three editions

## Purpose

The whole path in one place, with every price flat and public. This is the page
that proves the pricing claim the brand makes: the same figure for a 500-person
church and a 50,000-member denomination, and no negotiation.

## Read first

- `src/app/program/page.tsx` and `src/app/program/[category]/[templateId]/page.tsx`
- **`src/lib/agent-room/data/pricing.ts`** — the SSOT. Its own header says: "Do
  not change values here without product sign-off." Lift every figure exactly.
- `src/lib/agent-room/naming.ts` — stage labels are **Safety · Sandbox ·
  Training · Tech**, not the older Skills/Solutions pair
- `src/lib/agent-room/data/faq.ts` — engagement length and start-time answers
- `src/components/agent-room/screen/stub/pricing-screen.tsx` and `path-screen.tsx`

## The figures (verify against `pricing.ts`, do not trust this list)

| Stage | Free route | Paid route |
| --- | --- | --- |
| 01 Safety | Free · about 1 to 2 months, self-paced | **$1,000** · two weeks, start to finish |
| 02 Sandbox | Free · self-paced | **$5,000** one-time digital licence · **~$15,000** facilitated in person |
| 03 Training | Field guide · coming soon | **$2,000 per person** · 8 weeks · online |
| 04 Tech | Field guide · coming soon | Foundation built in · **$30,000** per module (Publishing / Formation / Relationships) |

Two placeholders are real: Training's and Tech's free field guides are marked
`placeholder: true` and have **no CTA**. Render them as honestly unavailable —
"coming soon", no button. Do not invent a link.

## Structure

1. **Header** — standard sticky.
2. **Hero** — `Eyebrow` "The path", a Playfair claim on order, and the flat-price
   statement. `InkVoice`: "Each step earns the next."
3. **The order argument** — four `PathLayer` rows, or the `PRICING_STAGE_HEADERS`
   descriptors ("Ratify your AI Charter before anything else", etc). Make clear
   the order is the product, not a menu.
4. **Stage panels** — one expandable panel per stage (`FaqItem`, or an
   accordion), each containing its free and paid routes as `WayCard` pairs with
   `paid` on the paid one. Tech's panel holds the four module rows instead.
5. **The refusals section** — the brand's honesty block: no urgency, no
   limited-time discounts, no "spots filling fast", the same price for everyone,
   and what Movemental will decline to do. Source from `faq.ts` and the design
   system guide's content-fundamentals section.
6. **FAQ** — `FaqItem` per entry from `faq.ts`. Real questions only.
7. **Start** — "Map where we stand" → the Reality Map; "Talk to us" → mailto.

## Design system

`WayCard` is built for exactly this (title, mono price line, body, `paid`
border). `FaqItem` for the accordion and FAQ. `PathLayer` for the stage rail.
`Eyebrow`, `SectionLabel`, `Button`, `InkVoice`.

## Interactions

One stage panel open at a time, Safety open by default. Deep-link each panel by
id so the editions can link straight to a stage.

## Tweaks

`openStage` (enum: safety / sandbox / training / tech), `showFaq` (boolean).

## Honesty constraints

- Not one figure adjusted, rounded, or "simplified" for layout.
- Placeholder tiers render as placeholders, with no CTA.
- No comparison table implying competitors. No savings maths.

## Done when

- Every figure matches `pricing.ts` character for character.
- Both placeholder tiers are visibly unavailable and have no link.
- Every CTA resolves to a real destination.
