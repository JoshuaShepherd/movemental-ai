# Scenius Network Visualization

> **Why Movemental final — scroll-driven network panel: anchor focus, tiered reveal, and path to credibility-crisis transition**

**Last updated**: February 2026

---

## Purpose

The network visualization on the Why Movemental page shows the scenius as a graph: Alan Hirsch at the center, then Brad Brisco and others revealed by tier, then persona nodes (“who’s next”). It supports the narrative that credibility in the AI age comes from **networks of verified voices**, not going viral. Getting this panel right is a prerequisite for locking in the transition into the credibility-crisis section.

---

## Best Practices (Current Implementation)

### 1. **Anchor / fixed focal point**

- **Practice**: Keep the camera centered on a single “anchor” node (Alan) for every tier except the last. Zoom out from that point instead of recentering on the bounding box of visible nodes each time.
- **Why**: A moving center makes the scene feel like it’s drifting. A fixed anchor (Alan) makes the story “we’re expanding from this person” and keeps the viewer oriented.
- **Implementation**: `ANCHOR_NODE_ID = 'alan-hirsch'`. Camera focus uses `anchorFocus` (Alan’s position from the layout) for tiers 0 through second-to-last; only the **final tier** uses `getBoundsCenter(visibleNodes)` so the full network fits in frame.
- **Layout**: In `useNetworkLayout`, the tier-0 node is pinned at world center (`CENTER`, `CENTER`) so the force simulation expands around Alan.

### 2. **Tiered reveal**

- Nodes and edges are revealed by tier (0 → 1 → … → 12). Links are assigned to the max tier of their endpoints so edges appear when both nodes are visible.
- Scale and duration are tier-dependent: e.g. longer duration for Alan→two and for the final hold.

### 3. **Single pinned viewport**

- One ScrollTrigger pins the whole panel for `+=580vh`. All camera and reveal animations are on one timeline so scroll position drives a single, linear story.

### 4. **Consistent world and camera math**

- World size is fixed (2000×2000). Camera is implemented as `scale` + `translate` on a group; `getCameraTransform()` keeps the focus point at the viewport center.

---

## What Still Needs Development

The visualization is intentionally “needs more time to develop.” The following are not yet fully done or decided:

1. **Pacing and scroll length**  
   - Total scroll (580vh), per-tier durations, and scale curve may need tuning so the reveal feels clear and not rushed or slow.

2. **Layout stability and diversity**  
   - Force-directed layout is run with a fixed tick count; no explicit seed, so layout can vary run-to-run. Consider a stable seed or precomputed positions for production.
   - Persona nodes are placed by the simulation; link targets are generic (e.g. first N known nodes). Could be refined for clearer “who’s next” storytelling.

3. **Transition into credibility crisis**  
   - When the network panel is solid, add a narrative bridge: e.g. a single line at the end of the network scroll (“But this network exists in a world where trust is collapsing”) and optionally a subtle darkening so the handoff to the crisis section feels intentional. See the “ideal transition” discussion in product/design notes.

4. **Accessibility and motion**  
   - No `prefers-reduced-motion` handling yet. Best practice: offer a reduced-motion path (e.g. static or stepped states, or skip scroll-driven animation).
   - Keyboard and screen-reader access to nodes (e.g. focusable nodes, aria labels) not yet implemented.

5. **Mobile and performance**  
   - Touch, viewport size, and performance with many nodes/edges may need testing and possibly level-of-detail or simplification on small screens.

6. **Copy and labels**  
   - Intro overlay and any on-graph labels may need another pass for tone and clarity.

---

## Overlay story map (teleprompter text)

The bottom overlay shows one line at a time, synced to scroll/tier. Only **Alan Hirsch** and **Brad Brisco** show names on the graph; all other nodes are initials or role labels. Story beats:

| Tier(s) | What’s on screen | Overlay text |
|--------|-------------------|--------------|
| 0 | Alan only | One voice. The beginning of the scenius. |
| 1 | Alan + Brad | Two. Alan and Brad. The graph begins—who points to you. |
| 2–4 | First wave of connections | Connected voices. Each addition makes the whole more findable. |
| 5–8 | Mid expansion | The scenius grows. |
| 9–11 | Nearing full network | At 100: a real credibility graph. |
| 12 (final) | Full network, scale-to-fit | Your content discoverable through the people who already trust you. Click a node to explore. |

Defined in `SceniusVisualization.tsx` as `OVERLAY_STORY_BEATS`; timeline switches beat at tier indices 1, 4, 7, 11, and last tier.

---

## Aesthetic review (proportion and design)

- **Desktop**: Full network appears as a dense graph of initials (e.g. MF, DH, CP, R1). The pinned viewport is full viewport height; the overlay sits at the bottom with a soft gradient so the graph can extend behind it. On large screens the graph can feel small until the final zoom-out; tier scales and final scale-to-fit may need tuning so the “one → two → many” progression reads clearly and the final frame feels balanced.
- **Mobile**: Same content in a narrower viewport; section nav (HERO, NETWORK, …) remains. Node circles and overlay text scale with viewport; the overlay’s max-width (42rem) and gradient keep the teleprompter readable. Touch targets for nodes and section nav should be checked for comfort.
- **Proportion opportunities**: (1) Consider slightly larger anchor node (Alan) or longer hold on tier 0/1 so “one voice” and “two” land before the pace quickens. (2) Final frame: ensure the scale-to-fit padding and vertical balance with the overlay feel intentional rather than cramped. (3) Overlay height (min 32vh) reserves space for story; if copy grows, ensure line count and font size stay within the blend zone.

---

## File Map

| File | Role |
|------|------|
| `components/scenius-visualization/SceniusVisualization.tsx` | Main component: ScrollTrigger, timeline, camera focus (anchor vs bounds), tier loop |
| `components/scenius-visualization/useNetworkLayout.ts` | D3 force layout; pins tier-0 (Alan) at world center |
| `components/scenius-visualization/network-data.ts` | Nodes (known + personas), links, tiers |
| `components/scenius-visualization/NetworkNode.tsx` | Node rendering (avatar/initials, tier styling) |
| `components/scenius-visualization/NetworkEdge.tsx` | Edge rendering (path, stroke-dash for draw-in) |
| `components/scenius-visualization/NodeModal.tsx` | Modal on node click |

---

## Changing the Anchor

To center the story on a different node (e.g. another tier-0 in the future):

1. Set `ANCHOR_NODE_ID` in `SceniusVisualization.tsx` to that node’s `id`.
2. In `useNetworkLayout.ts`, pin that node at `(CENTER, CENTER)` (e.g. by `id === ANCHOR_NODE_ID` or a dedicated “anchor” flag in data) so the layout is built around them.

Keeping anchor and layout pin in sync ensures the camera’s fixed focal point matches the graph’s conceptual center.
