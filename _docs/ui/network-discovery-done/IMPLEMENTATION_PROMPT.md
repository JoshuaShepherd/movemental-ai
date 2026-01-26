# Implementation Request: Network Discovery

## Context

I need to implement the **Network Discovery** UI section for the Movemental.ai platform. This is where users explore connections within the broader community of movement leaders, discover potential collaborators, and understand their place within the network. The design prioritizes a sense of belonging and serendipitous discovery over rigid directory listings.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/network-discovery/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/network-discovery/reference-images/`
  - `framer-network-constellation.png` - Radial layout, avatar constellation, central hub

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

---

## Component Structure

```
components/
├── network-discovery/
│   ├── NetworkVisualization.tsx      # Main constellation visualization
│   ├── NetworkCanvas.tsx             # SVG/Canvas container
│   ├── NetworkNode.tsx               # Individual avatar node
│   ├── NetworkHub.tsx                # Central brand element
│   ├── ConnectionLine.tsx            # Lines between nodes
│   ├── NodeTooltip.tsx               # Hover tooltip with member info
│   ├── NetworkSearch.tsx             # Search/filter overlay
│   ├── NetworkFilters.tsx            # Filter controls
│   ├── MemberCard.tsx                # Detailed member card (fallback)
│   ├── MemberGrid.tsx                # Grid fallback for mobile
│   ├── ZoomControls.tsx              # Zoom in/out/reset
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── network/
│       └── page.tsx                  # Network discovery page
├── dashboard/
│   └── network/
│       └── page.tsx                  # Authenticated network view
```

---

## Key Design Patterns to Implement

### Pattern 1: Network Constellation Visualization
- Central element: Brand logo or "hub" representing Movemental
- Concentric rings radiating outward (closer = more prominent)
- Avatar circles positioned organically along rings
- Subtle connection lines between related members (optional)
- Varying avatar sizes for visual hierarchy
- Hover reveals name + basic info tooltip
- Click navigates to member profile

**Technical considerations**:
- Use SVG for scalability and interactivity
- Limit visible nodes (20-40 max) for clarity
- Implement filtering/search to find specific people
- Consider force-directed layout for organic positioning
- Lazy load avatar images

---

## Visual Language Requirements

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

## Implementation Requirements

### 1. NetworkVisualization Component
```tsx
interface NetworkVisualizationProps {
  members: NetworkMember[]
  connections?: Connection[]
  centerElement?: React.ReactNode
  onMemberClick?: (memberId: string) => void
  className?: string
}

interface NetworkMember {
  id: string
  name: string
  role: string
  organization?: string
  avatarUrl: string
  position: { ring: number; angle: number } // Polar coordinates
  size: 'sm' | 'md' | 'lg'
  featured?: boolean
}

interface Connection {
  from: string
  to: string
  strength?: 'weak' | 'medium' | 'strong'
}
```

### 2. NetworkNode Component
```tsx
interface NetworkNodeProps {
  member: NetworkMember
  isHovered: boolean
  isHighlighted: boolean
  onClick: () => void
  onHover: (isHovered: boolean) => void
  className?: string
}
```

### 3. NodeTooltip Component
```tsx
interface NodeTooltipProps {
  member: NetworkMember
  position: { x: number; y: number }
  visible: boolean
  className?: string
}
```

### 4. NetworkSearch Component
```tsx
interface NetworkSearchProps {
  onSearch: (query: string) => void
  onFilter: (filters: NetworkFilters) => void
  results?: NetworkMember[]
  className?: string
}

interface NetworkFilters {
  role?: string
  organization?: string
  topics?: string[]
}
```

---

## Positioning Algorithm

```tsx
// Convert ring/angle to x/y position
function polarToCartesian(
  ring: number, // 0-4 (0 = center, 4 = outer)
  angle: number, // 0-360 degrees
  canvasSize: { width: number; height: number }
): { x: number; y: number } {
  const centerX = canvasSize.width / 2;
  const centerY = canvasSize.height / 2;
  const maxRadius = Math.min(centerX, centerY) * 0.9;
  const radius = (ring / 4) * maxRadius;
  const radians = (angle * Math.PI) / 180;
  
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians),
  };
}
```

---

## Responsive Design

### Mobile (<768px)
- Simplified grid view instead of constellation
- Search prominent at top
- Member cards in scrollable list
- Constellation hidden or very simplified

### Tablet (768-1024px)
- Smaller constellation canvas
- Fewer visible nodes
- Touch-friendly interactions

### Desktop (>1024px)
- Full constellation visualization
- Hover tooltips
- Pan/zoom controls
- Maximum node count (30-40)

---

## Deliverables

1. **Components**: All components listed in structure
2. **Constellation Visualization**: SVG-based network display
3. **Network Nodes**: Avatar circles with hover states
4. **Central Hub**: Brand element at center
5. **Tooltips**: Member info on hover
6. **Search/Filter**: Overlay controls
7. **Mobile Fallback**: Grid/list view
8. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Constellation rendering correctly
- [ ] Avatar nodes displaying with proper sizes
- [ ] Hover tooltips showing member info
- [ ] Central hub element visible
- [ ] Connection lines rendering (if implemented)
- [ ] Search/filter working
- [ ] Mobile fallback grid working
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Performance acceptable (30-40 nodes)
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Network discovery is about community and belonging
- Visualization should feel organic, not like an org chart
- Limit visible nodes for performance and clarity
- Consider lazy loading avatar images
- Click should navigate to member profile
- Search helps find specific connections
- Mobile experience may need to be grid-based fallback

---

## Open Questions to Consider

- What determines "proximity" to center? (Activity, tenure, role?)
- How do we define connections between members?
- Should clicking open a modal or navigate to profile?
- How many members should be visible at once?

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing the constellation reference image
3. Planning the SVG structure
4. Implementing `NetworkCanvas` container
5. Building `NetworkNode` with hover states
6. Adding `NetworkHub` at center
7. Implementing `NodeTooltip` display
8. Building mobile fallback grid
9. Testing performance with multiple nodes
