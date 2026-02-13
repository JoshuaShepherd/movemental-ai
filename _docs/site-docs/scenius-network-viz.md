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
