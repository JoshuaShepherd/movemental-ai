# Network Discovery - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 1

---

## Design Vision

The network discovery experience should make **exploring connections feel natural and engaging**. Users should be able to visualize the broader community of movement leaders, discover potential collaborators, and understand their place within the network. The design prioritizes a sense of belonging and serendipitous discovery over rigid directory listings.

The Framer reference shows a "constellation" visualization—avatars arranged in a radial pattern around a central brand element, creating an organic, community-centered feel. This pattern works well for networks where relationships and community identity matter more than hierarchical org charts.

---

## Key Patterns Identified

### Pattern 1: Network Constellation Visualization
- **Source(s)**: `framer-network-constellation.png`
- **What it solves**: Visualizes community membership and relationships in an engaging way
- **Implementation guidance**:
  - Central element: Brand logo or "hub" representing Movemental
  - Concentric rings radiating outward (closer = more active/prominent)
  - Avatar circles positioned organically along rings
  - Subtle connection lines between related members (optional)
  - Varying avatar sizes for visual hierarchy
  - Hover reveals name + basic info tooltip
  - Click navigates to member profile
  - Name labels for prominent/featured members

**Technical considerations**:
- Use SVG or Canvas for performance
- Limit visible nodes (20-40 max) for clarity
- Implement filtering/search to find specific people
- Consider force-directed layout algorithm for organic positioning
- Lazy load avatar images

---

## Visual Language

### Layout
- **Full-viewport canvas** for immersive experience
- **Central focal point** with brand element
- **3-4 concentric rings** defining proximity zones
- **Floating UI** for search/filter controls

### Typography
- **Name labels**: Small, 12-14px, positioned near avatar
- **Tooltip content**: Name (bold), role/org (regular), 14-16px
- **Filter UI**: Standard form typography

### Color & Contrast
- **Background**: White or very light gray
- **Ring lines**: Very subtle gray (#eee)
- **Connection lines**: Light gray, thin stroke
- **Avatars**: Full color photos
- **Central hub**: Brand colors (blue/purple gradient)
- **Hover state**: Subtle glow or ring around avatar

### Interaction
- **Hover**: Show name tooltip, highlight connections
- **Click**: Navigate to profile or open modal
- **Drag/pan**: Allow exploring if network is large
- **Zoom**: Optional for dense networks
- **Search**: Filter/highlight matching members

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-network-constellation.png` | Framer | Radial layout, avatar constellation, central hub | P1 |

---

## Implementation Checklist

- [ ] Create `NetworkVisualization` container component
- [ ] Implement radial positioning algorithm (or use static positions)
- [ ] Create `NetworkNode` component for avatar + interactions
- [ ] Add hover tooltip with member info
- [ ] Implement connection lines between related members
- [ ] Add central brand hub element
- [ ] Create search/filter overlay UI
- [ ] Implement zoom/pan controls if needed
- [ ] Add loading state for avatar images
- [ ] Ensure mobile-friendly fallback (list or simplified view)
- [ ] Performance optimization: limit nodes, lazy loading

---

## Open Questions

- What determines "proximity" to the center? (Activity, tenure, role?)
- How do we define connections between members? (Collaborations, shared topics?)
- Should this be explorable or primarily decorative?
- What's the mobile experience? (Simplified list, horizontal scroll, or responsive viz?)
- Do we show all network members or a curated subset?
- Should clicking a member open a modal or navigate to a full profile page?
