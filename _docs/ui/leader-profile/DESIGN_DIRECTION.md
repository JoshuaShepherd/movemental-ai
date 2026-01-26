# Leader Profile - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 4

---

## Design Vision

The Leader Profile is the public-facing representation of movement leaders on the platform—showcasing their expertise, content, community engagement, and credibility. The design should feel **authoritative yet approachable**, highlighting the leader's body of work, community connections, and platform activity. The interface should build trust with potential followers while giving leaders a professional presence.

The reference images from Retool, Buy Me a Coffee, Medium, and Coinbase show complementary patterns: community forum profiles with stats and badges, creator page edit forms, author profiles with following lists, and developer community profiles with activity metrics. These patterns collectively define a comprehensive leader presence.

---

## Key Patterns Identified

### Pattern 1: Profile Stats & Activity Dashboard
- **Source(s)**: `retool-profile-stats-badges.png`, `coinbase-profile-stats-activity.png`
- **What it solves**: Shows leader's platform engagement and credibility at a glance
- **Implementation guidance**:
  - Profile header: Avatar, display name, real name, role/title
  - Location badge (optional)
  - Bio/tagline describing what they do
  - Social links (Twitter, GitHub, etc.)
  - **Key stats row**: Days visited, read time, topics viewed, posts read, likes given/received
  - **Activity sections**: Top Replies, Top Topics, Top Links
  - **Joined date** and last active indicator
  - Trust level or member status badge
  - Tabbed interface: Summary | Activity | Badges

### Pattern 2: Profile Edit Modal/Form
- **Source(s)**: `buymeacoffee-profile-edit-modal.png`
- **What it solves**: Allows leaders to customize their public profile
- **Implementation guidance**:
  - Modal overlay with Cancel/Save buttons
  - **Profile photo**: Circular avatar with camera icon overlay for change
  - **Form fields**:
    - Full name (text input)
    - What are you creating? (tagline field)
    - About me (rich text editor with bold/italic/link)
    - Featured video (YouTube/Vimeo URL input)
    - Social links (URL inputs with delete option)
  - Clean, minimal styling
  - Single-column form layout
  - Yellow/accent CTA button

### Pattern 3: Author Profile with Following
- **Source(s)**: `medium-author-profile-following.png`
- **What it solves**: Establishes authority and shows network connections
- **Implementation guidance**:
  - Large display name with verified badge
  - Tabbed navigation: Home | Books | About
  - "Book Author" badge for published authors
  - Member since date + expertise areas
  - Follower/following counts (clickable)
  - Connect social link (Twitter)
  - **Right sidebar**: Author card with:
    - Avatar, name, follower count
    - Badge (Book Author)
    - Bio/description
    - Amazon/external links
    - Following/Subscribe buttons
    - Following list (avatar + name)
    - "See all" link for full list

### Pattern 4: Community Engagement Profile
- **Source(s)**: `retool-profile-stats-badges.png`, `coinbase-profile-stats-activity.png`
- **What it solves**: Highlights community participation and contributions
- **Implementation guidance**:
  - **Badges section**: Earned badges/achievements displayed
  - **Top contributions**: Links to best content
  - **Reputation indicators**: Trust level, post counts, likes
  - **Activity timeline**: Recent posts, replies, likes
  - Sidebar category navigation (Topics, Tags)
  - Search functionality

---

## Visual Language

### Layout
- **Profile header**: Full-width or card-style with avatar, name, stats
- **Content area**: Tabbed sections for different content types
- **Sidebar**: Following list, quick stats, related profiles
- **Edit modal**: Centered overlay, max-width 500-600px

### Typography
- **Display name**: 32-40px, bold
- **Real name/subtitle**: 16-18px, muted color
- **Stats numbers**: Bold, accent color for emphasis
- **Stats labels**: 12-14px, muted, uppercase or regular
- **Bio text**: 16-18px, standard line-height

### Color & Contrast
- **Avatar frame**: Can use brand color border for verified leaders
- **Stats highlights**: Accent color (blue, pink for hearts)
- **Badge colors**: Varied by badge type/achievement
- **Background**: White or very light gray
- **Active tab**: Underline or background indicator

### Interaction
- **Avatar hover**: Edit indicator on own profile
- **Stats links**: Clickable to drill down
- **Following**: Click to view profile
- **Tab switching**: Instant content change
- **Edit button**: Opens modal overlay

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `retool-profile-stats-badges.png` | Retool | Stats dashboard, badges, top replies/topics, category sidebar | P1 |
| `buymeacoffee-profile-edit-modal.png` | Buy Me a Coffee | Profile edit modal, avatar upload, rich text bio, social links | P1 |
| `medium-author-profile-following.png` | Medium | Author profile, book author badge, following list, tabs | P1 |
| `coinbase-profile-stats-activity.png` | Coinbase | Developer profile, stats, top links, activity metrics | P1 |

---

## Implementation Checklist

### Profile Display
- [ ] Create `LeaderProfileHeader` component (avatar, name, stats row)
- [ ] Create `ProfileStatsRow` component (configurable stats)
- [ ] Create `ProfileTabs` component (Summary, Activity, Badges)
- [ ] Create `BadgeDisplay` component for achievement badges
- [ ] Create `TopContributions` component (links to best content)
- [ ] Create `ActivityTimeline` component

### Profile Edit
- [ ] Create `ProfileEditModal` component
- [ ] Implement avatar upload with preview
- [ ] Create rich text bio editor
- [ ] Add social links management (add/remove)
- [ ] Add featured video URL input
- [ ] Implement form validation

### Sidebar Components
- [ ] Create `AuthorCard` component for sidebar
- [ ] Create `FollowingList` component (avatars + names)
- [ ] Add "See all" expansion
- [ ] Create `FollowButton` component

### Engagement Features
- [ ] Display follower/following counts
- [ ] Show member since date
- [ ] Display expertise/topic areas
- [ ] Add verified/author badges

---

## Open Questions

- What badges/achievements do we offer leaders?
- How do we calculate "Trust Level" or reputation?
- Should we show content analytics (views, engagement) on public profiles?
- How do we verify/badge book authors?
- Should followers see different info than non-followers?

---

## Related Features

- **user-account**: Edit profile redirects to account settings
- **network-discovery**: Profile discovery and following system
- **team-credibility**: Team member profiles may share patterns
- **ai-book-reading**: Book author badge for published content

---

**Design Direction Status**: Ready for implementation
