# Scroll-driven network panel: library proposal

**Purpose:** Propose the best library/libraries to use with GSAP for a new panel whose content starts with a large avatar (Alan Hirsch), then on scroll the image zooms out and moves left while a network link is drawn to a second avatar (Brad Brisco), then the zoom-out continues as a third, fourth, fifth node appear, scaling up to ~100 interconnected nodes—with great-looking nodes, scroll-tied lines, and controllable framing.

**Status:** Proposal for implementation.  
**Location:** Content lives in a new panel (e.g. on the why-movemental-final page or a dedicated route).  
**Stack context:** Next.js 15, React 19, GSAP + ScrollTrigger already in use.

---

## 1. Experience summary

### 1.1 Initial state
- Panel starts with a **single large avatar** (~500px) of Alan Hirsch, like a profile photo.
- Avatar is **clickable** → opens a **modal** (e.g. bio, short copy, or link).

### 1.2 On scroll (first phase)
- The Alan Hirsch image **shrinks** (zoom-out).
- It **moves left**.
- A **link is drawn** (like a network edge) from that node to an **identically sized** image of Brad Brisco (second node).
- Both nodes and the line are **tied to scroll** (e.g. scrub or discrete steps).

### 1.3 On continued scroll
- **Zoom-out continues**; more nodes appear (3rd, 4th, 5th…).
- **Lines are drawn** between connected nodes.
- Scale up to **~100 interconnected nodes**.
- **Framing** of the network is controlled (camera/view) so the growing graph stays readable and intentional.

### 1.4 Non‑goals for this doc
- Exact copy and imagery (placeholders OK).
- Back-end or real “network” data (static or mock data is fine initially).
- Infinite scroll or real-time layout changes (layout can be precomputed).

---

## 2. Technical requirements (inferred)

| Requirement | Implication |
|------------|-------------|
| Large initial avatar (~500px) then shrinking | Scale/transform and possibly size transitions; nodes at many scales (hero → small). |
| Clickable avatar → modal | DOM or SVG nodes must be interactive (click, focus); modal from existing UI (e.g. Radix/shadcn). |
| “Link drawn” between nodes | Edges as lines or curves, **animated** (e.g. stroke reveal) and **scroll-driven**. |
| 3rd, 4th, 5th … up to 100 nodes | Layout for many nodes; performant rendering; clear visual hierarchy. |
| “Interconnected” | Graph structure: nodes + edges; layout so the graph looks good (not overlapping, readable). |
| “Framing of the network” | Viewport/camera: pan and zoom so we can start on the hero and pull back to show the full network. |
| Tied to scroll | Scroll position drives: hero scale/position, node/edge reveal, and possibly camera. |

So we need:

1. **Scroll-driven orchestration** — Map scroll to: hero scale/position, node visibility/position, edge draw, and framing.
2. **Node/avatar UI** — Look good from ~500px down to small; support images and click.
3. **Edge UI** — Lines (or curves) between nodes, with scroll-driven draw animation.
4. **Layout** — Positions for up to ~100 nodes so the graph is readable and stable.
5. **Framing/camera** — Control what’s visible (e.g. zoom out from hero to full network).

---

## 3. Recommended libraries (with GSAP)

### 3.1 Core: GSAP + ScrollTrigger (already in use)

- **Role:** Single source of truth for **scroll-driven behavior**.
- **Use for:**
  - One or more ScrollTrigger instances (or a timeline scrubbed by scroll) that drive:
    - Hero node: `scale`, `x` (and optionally `y`) so it shrinks and moves left.
  - When each new node “appears” (opacity/scale/position) and when each edge is drawn (e.g. `stroke-dashoffset` or DrawSVG).
  - Optional: scroll-driven “camera” (e.g. a wrapper’s `scale` and `x,y` so the view zooms out and repositions).
- **Why:** You already use GSAP; ScrollTrigger is the standard way to tie animation to scroll and fits “scroll as timeline” perfectly.

**Recommendation:** Keep GSAP + ScrollTrigger as the **only** scroll driver. Other libs compute layout and provide structure; GSAP animates based on scroll.

---

### 3.2 Layout and edges: D3.js

- **Role:** **Graph layout** and **edge path geometry** (not animation).
- **Use for:**
  - **Force-directed layout** (e.g. `d3-force`) to compute x,y for up to ~100 nodes so the network looks good and doesn’t overlap excessively.
  - **Link shape:** Curved or straight paths between node pairs (e.g. `d3.linkHorizontal()` or custom paths). Output **path `d`** (and optionally stroke length) for SVG.
  - Run layout **once** (or when data changes); export `{ nodes: [{ id, x, y, ... }], links: [{ source, target, pathD }] }` and feed that into React/GSAP.
- **Why:** D3 is the standard for graph layout and path generation; it does not dictate how you animate—GSAP does. You get stable, readable positions and nice edges without building a layout engine.

**Recommendation:** Add **D3** (e.g. `d3-force`, `d3-shape`) for layout and link paths. Use it as a **preprocessing step** (or a hook that runs when node/link data is set); render the result with SVG + React; animate with GSAP.

---

### 3.3 Rendering: SVG (no extra library)

- **Role:** Draw **nodes** and **edges** in the DOM so they are styleable, accessible, and easy to animate with GSAP.
- **Use for:**
  - **Nodes:** One `<g>` per node containing a `<circle>` (or `<rect>`) and either `<image>` (avatar) or `<clipPath>` + `<image>`. Size/position via `transform` (e.g. `translate(x,y) scale(s)`) so GSAP can animate the same node from hero size down to small.
  - **Edges:** `<path d="...">` with `stroke-dasharray` / `stroke-dashoffset` (or DrawSVG if you use Club GreenSock) so “link is drawn” = animating the stroke.
  - **Framing:** A single wrapping `<g>` (or div with transform) whose `transform` (scale + translate) is controlled by GSAP from scroll → “camera”.
- **Why:** SVG scales cleanly, works with GSAP’s transform and attribute animation, and keeps nodes in the DOM so **click → modal** is straightforward (e.g. `onClick` on the node `<g>` or a parent). No need for a canvas graph library for 100 nodes.

**Recommendation:** **No extra rendering library.** Use inline SVG (or a small React component tree) for the network. If you later need thousands of edges, you could consider canvas for edges only and keep nodes in DOM/SVG for interaction.

---

### 3.4 Modal and UI: existing stack (Radix / shadcn)

- **Role:** Clicking a node (e.g. Alan Hirsch) opens a **modal** with profile/bio content.
- **Use for:** Existing Dialog/Modal (e.g. Radix `Dialog` or shadcn) keyed by node id; content can be static or from props/state.
- **Why:** No new library; keeps behavior and a11y consistent with the rest of the app.

**Recommendation:** Use **existing modal component**; pass selected node id and render the right copy/image in the modal.

---

### 3.5 What to avoid (for this scope)

- **Heavy graph UIs (e.g. React Flow, Cytoscape.js, vis-network)**  
  They own layout, rendering, and often interaction. Fitting a **scroll-driven**, GSAP-orchestrated narrative (hero → zoom out → 100 nodes) is harder and can conflict with their internal state. Better to own the narrative with GSAP and use D3 only for layout/paths.

- **Canvas-only graph libraries**  
  Click-to-open-modal and accessibility are easier with DOM/SVG nodes. Canvas is an option later for a huge number of edges only.

- **A second animation library for the network**  
  Using GSAP for all scroll-driven motion (nodes, edges, camera) keeps the model simple and avoids two systems fighting over the same elements.

---

## 4. Suggested architecture (high level)

1. **Data**
   - List of nodes (id, label, imageUrl, etc.) and list of links (sourceId, targetId). First node = Alan Hirsch (hero); then e.g. Brad Brisco; then the rest up to 100.

2. **Layout (D3, once)**
   - Run `d3-force` (and optionally `d3-shape` for link curves) to get `nodes[]` with `x,y` and `links[]` with `pathD` (or equivalent). Optionally reserve a “hero” position (e.g. center-right) and fix the hero node there, then simulate the rest.

3. **React structure**
   - One **panel** component that:
     - Renders an SVG (or a div with an SVG) containing:
       - A **wrapper `<g>`** for the “camera” (transform driven by GSAP from scroll).
       - **Edges:** `<path>` elements from layout; `d` from D3; stroke animated by GSAP (e.g. stroke-dashoffset) based on scroll.
       - **Nodes:** `<g>` per node with circle + image; `transform` (and maybe `r` or size) driven by GSAP from scroll. Hero node starts large and moves; others appear and scale as scroll advances.
     - Uses **ScrollTrigger** (and optionally a master timeline) to:
       - Map scroll progress to: hero scale/x, hero y if needed, which nodes are “in” and at what scale, and each edge’s draw progress.
       - Map scroll to camera: wrapper scale and translate so the view zooms out and frames the growing network.

4. **Interaction**
   - Node `<g>` (or a hit area) has `onClick` → set “selected node id” → open modal with that node’s content. Modal is Radix/shadcn.

5. **Styling**
   - Nodes: consistent border/shadow/ring so they read as “avatars” at any size; optional subtle glow or label. Edges: stroke color/width/cap from design system; animated stroke so “link is drawn” feels like a network link.

---

## 5. Implementation notes

- **Phasing:** Implement with 2 nodes and one edge first (Alan → Brad, scroll-driven shrink + move + line draw). Then add 3rd–5th nodes and edges, then generalize to N nodes and framing.
- **Performance:** 100 nodes + ~100–200 edges in SVG is fine. If needed, edges can be simplified (e.g. straight lines instead of curves) or rendered on canvas later while keeping nodes in SVG for clicks.
- **DrawSVG:** If you have Club GreenSock, DrawSVGPlugin is ideal for “drawing” paths. Otherwise animate `stroke-dashoffset` (path length from `getTotalLength()`) with GSAP.
- **Framing:** Start the camera so the hero fills the view; as scroll advances, reduce scale and adjust translate so the graph stays centered or follows a chosen “focus” (e.g. center of mass of visible nodes).

---

## 6. Summary: libraries to use with GSAP

| Need | Library | Role |
|------|---------|------|
| Scroll-driven animation, hero shrink/move, edge draw, framing | **GSAP + ScrollTrigger** | Orchestrate all scroll-tied motion. |
| Node positions and edge paths for up to 100 nodes | **D3.js** (e.g. `d3-force`, `d3-shape`) | Layout and path `d` only; no animation. |
| Draw nodes and edges, clicks, a11y | **SVG** (no new lib) | Render graph; GSAP animates transforms and stroke. |
| Avatar click → modal | **Existing modal** (Radix/shadcn) | No new library. |

**Result:** GSAP drives the narrative from scroll; D3 provides a one-time layout and clean edge geometry; SVG gives you great-looking, clickable nodes and animatable links; framing is a single wrapper transform driven by GSAP. This keeps the stack minimal and the “scroll-driven network panel” behavior clear and maintainable.
