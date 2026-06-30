# Engine overlay screens

**Component ids:** `network`, `audience`, `handoff_human`  
**Role:** Full-sheet overlays the live host renders via SSE `ui_render` — they have **no** Ink Band `ScreenId` but appear in the same screen zone through `HybridScreen`.

Only appear on **AGENT-classified** turns when the engine calls the matching render tool (not local `SCENES`).

---

## 1. Network (`network`)

### What it is

Constellation / graph of connected movement leaders — trust and scenius proof.

### When it appears

Host chooses `render_network` (or equivalent) when visitor asks about the leader network, who is involved, or ecosystem breadth.

### What the visitor sees

Interactive or static network visualization with leader nodes and relationships.

### Agent behavior

Prose in expanded thread explains the network; screen shows parallel evidence. Paired channels — speak and show.

---

## 2. Audience (`audience`)

### What it is

Segment picker framing — churches, nonprofits, institutions (seminaries).

### When it appears

Visitor asks who Movemental serves or which audience fits them; host renders audience component.

### What the visitor sees

Three audience cards or segments with links to document routes (`/agent/churches`, etc.).

### Agent behavior

May set audience context for subsequent turns (`roomContext` on POST).

---

## 3. Handoff human (`handoff_human`)

### What it is

Direct human contact card — typically Josh's email for off-domain or high-trust handoff.

### When it appears

Host policy: off-domain requests → refusal + `offer_human_handoff` / handoff render.

Contact screen is the **in-product** form; this overlay is the **explicit human card**.

### What the visitor sees

Name, email (`josh@movemental.ai`), short copy inviting direct reach-out.

---

## 4. How overlays differ from stub screens

| | Stub screens (`home`, `pricing`, …) | Engine overlays |
| --- | --- | --- |
| Entry | Local `show` acts, regex, chips | SSE `ui_render` only |
| Data | React stub components + SSOT copy | Engine tool props + honesty rail |
| Offline hybrid | Still work | Skipped (no AGENT turn) |

Client validates props in `validateComponentProps` — engine-side Zod is SSOT.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

Overlays are **AGENT-only** — they never appear from LOCAL chip taps or regex routing in hybrid mode.

### How the visitor gets here

| Step | What happens |
| --- | --- |
| 1 | Visitor send classifies **AGENT** |
| 2 | Drawer **expands** (or stays expanded) |
| 3 | Host streams thread prose **and** calls `ui_render` (`network`, `audience`, `handoff_human`) |
| 4 | Overlay mounts in screen zone; prior stub sheet **hidden behind scrim** |
| 5 | If render changes overlay `screenKey`, drawer may **auto-collapse** — visitor sees overlay full-bleed |

### Type in the composer

Only relevant **after** overlay is shown via AGENT:

| `chatActive` | Behavior |
| --- | --- |
| false (unlikely mid-overlay) | Classifier may LOCAL-navigate **away** to stub screens |
| true | AGENT — host may swap overlay component or return to stub via tools |

### Sheet vs drawer

Visitor cannot see overlay updates while composing in expanded drawer unless collapse happens. **Speak and show** policy: thread explains; overlay is evidence.

**Offline / stub:** Overlays do not appear — no AGENT turn.

---

## 5. Related pages

- [00-room-arrival-and-routing.md](./00-room-arrival-and-routing.md) — AGENT classification
- [15-contact.md](./15-contact.md) — contact form screen
- [19-document-pages.md](./19-document-pages.md) — audience documents
