# Network Discovery - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 3

---

## Design Vision

Network Discovery enables users to find and connect with movement leaders, fellow practitioners, and aligned communities. The design should feel **expansive yet personal**, helping users discover meaningful connections while building their own network. The interface should surface relevant profiles, facilitate following, and visualize community connections.

The reference images show forum community profiles with category navigation (Retool) and author profiles with following lists and network visualization (Medium). These patterns demonstrate how to surface connections and make following/networking intuitive.

---

## Key Patterns Identified

### Pattern 1: Community Profile with Category Navigation
- **Source(s)**: `retool-community-profile.png`
- **What it solves**: Helps users find relevant community members by topic/interest
- **Implementation guidance**:
  - **Left sidebar**: Category navigation
    - Topics, More sections
    - Categories list (color-coded):
      - Tips & Tricks
      - App Building
      - Queries and Resources
      - Feature Requests
      - Community Show & Tell
      - Mobile, Workflows, External Apps
      - Discussion, Announcements
    - Tags section for keyword filtering
  - **Main content**: Profile cards or list
  - Category colors help distinguish topics
  - "All categories" option at bottom
  - Search functionality at top

### Pattern 2: Following/Followers List
- **Source(s)**: `medium-following-sidebar.png`
- **What it solves**: Shows social connections and enables network exploration
- **Implementation guidance**:
  - **Following section header** with count
  - List of followed profiles:
    - Avatar (circular, small)
    - Display name
    - Options menu (three dots)
  - "See all (253)" link to full list
  - Compact spacing for scanning
  - Click profile to visit
  - Options: Unfollow, Mute, etc.

### Pattern 3: Network Constellation View
- **Source(s)**: `framer-network-constellation.png` (from network-discovery-done)
- **What it solves**: Visualizes community connections in an engaging way
- **Implementation guidance**:
  - Abstract visualization of network
  - Nodes represent profiles/communities
  - Lines/connections show relationships
  - Interactive—click to explore
  - Primarily decorative/brand building
  - Can be hero element on discovery page

---

## Visual Language

### Layout
- **Discovery page**: Sidebar categories + main content grid/list
- **Profile cards**: Grid layout (3-4 columns)
- **Following lists**: Compact vertical list in sidebar
- **Network viz**: Full-width hero or featured section

### Typography
- **Category headers**: 12-14px, uppercase, muted
- **Category items**: 14-16px, regular weight
- **Profile names**: 16-18px, bold
- **Following names**: 14-16px, regular
- **Counts**: Bold number + muted label

### Color & Contrast
- **Category colors**: Varied color squares/dots for visual distinction
- **Active category**: Highlighted background or text
- **Profile cards**: White background, subtle shadow
- **Following list**: Minimal styling, focus on avatars

### Interaction
- **Category click**: Filters content
- **Profile card click**: Navigates to profile
- **Following click**: Navigates to profile
- **Follow button**: Toggle state (Following/Follow)
- **Options menu**: Dropdown with actions

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `retool-community-profile.png` | Retool | Category sidebar, color-coded topics, community navigation | P1 |
| `medium-following-sidebar.png` | Medium | Following list, avatar list, see all, options menu | P1 |
| `framer-network-constellation.png` | Framer | Network visualization, decorative, connections | P2 |

---

## Implementation Checklist

### Category Navigation
- [ ] Create `CategorySidebar` component
- [ ] Create `CategoryItem` component (color + label)
- [ ] Implement category filtering
- [ ] Add "All categories" option
- [ ] Create `TagsSection` for keyword filtering

### Profile Discovery
- [ ] Create `ProfileCard` component for grid display
- [ ] Create `ProfileList` component for list display
- [ ] Add search/filter functionality
- [ ] Implement sorting (Most followers, Recently active, etc.)
- [ ] Create empty state for no results

### Following/Network
- [ ] Create `FollowingList` component
- [ ] Create `FollowersList` component
- [ ] Add "See all" modal/page
- [ ] Implement follow/unfollow actions
- [ ] Create `FollowButton` with toggle state
- [ ] Add options menu (Mute, Unfollow, Report)

### Network Visualization (Optional)
- [ ] Evaluate visualization library options
- [ ] Create `NetworkConstellation` component
- [ ] Make interactive (click to explore)
- [ ] Responsive scaling

---

## Open Questions

- What criteria determine "recommended" profiles?
- Should we show mutual connections ("Also followed by...")?
- How do we handle blocking/reporting?
- Is there a "Discover" algorithm or just category browsing?
- Should there be activity-based suggestions?

---

## Related Features

- **leader-profile**: Profile display patterns shared
- **team-credibility**: Team/organization discovery
- **dashboard**: Network activity in feed
- **onboarding-path**: Initial network building during onboarding

---

**Design Direction Status**: Foundation established (ready for implementation)
