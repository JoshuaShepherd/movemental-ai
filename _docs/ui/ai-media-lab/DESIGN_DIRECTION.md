# AI Media Lab - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 4

---

## Design Vision

The AI Media Lab is where users create, enhance, and manage media content with AI assistance—video, audio, and animations. The design should feel **creative, capable, and inspiring**, showcasing media prominently while providing clear tools and navigation. The interface should make AI features feel helpful rather than overwhelming.

The Framer reference shows a video embed section with category tabs, demonstrating how to organize different media types while keeping the primary content (video) as the focal point.

---

## Key Patterns Identified

### Pattern 1: Video Embed with Category Tabs
- **Source(s)**: `framer-video-embed-tabs.png`
- **What it solves**: Organizes media content by type while keeping video prominent
- **Implementation guidance**:
  - Large video player as hero element
  - Gradient background section (pink/coral tones)
  - Video embed with standard controls (play/pause, time, fullscreen)
  - "Watch Later" and "Share" actions
  - Description text below video
  - Category navigation tabs below: "Forms", "Video & Animation", "Audio", "Social", "Shop", "Utilities"
  - Integration badges (YouTube logo, etc.)
  - Clean separation between video and navigation

### Pattern 2: Video Tutorials Sidebar
- **Source(s)**: `framer-video-tutorials-sidebar.png`
- **What it solves**: Organizes video learning content in accessible sidebar
- **Implementation guidance**:
  - Sidebar with search at top
  - "Video Tutorials" section highlighted
  - Thumbnail + title + duration for each video
  - Videos: "App Tour" (5:23), "Layout and Size" (14:17), "Breakpoints" (16:15)
  - "Import from Figma" (9:40)
  - Additional sections: Help Articles, See Templates
  - Component categories below (Layout, Navigation, etc.)
  - Collapsible section design

### Pattern 3: Component Insert Panel
- **Source(s)**: `framer-component-insert-panel.png`
- **What it solves**: Quick access to media components for insertion
- **Implementation guidance**:
  - Grid of insertable components
  - Media section: Image, Video, Carousel, Ticker
  - Slideshow, YouTube embed options
  - Button and interactive elements
  - Icon + label for each component
  - Hover for description
  - Clean, organized grid layout

### Pattern 4: Media Library Dashboard with Folders
- **Source(s)**: `gamma-folder-media-organization.png`
- **What it solves**: Organizes media assets in browsable folder structure
- **Implementation guidance**:
  - **Left sidebar**: Folder/workspace navigation
    - Main sections: All media, AI Images, etc.
    - Custom folders support
    - Templates and Themes sections
  - **Content grid**: Preview cards with thumbnails
  - **Filter tabs**: All, Recently viewed, Created by you, Favorites
  - Each card shows: Preview, title, shared status, author, timestamp
  - Support for different media types (images, videos, presentations)
  - Workspace/team switching at top
  - Import functionality

---

## Visual Language

### Layout
- **Video hero**: Large, centered, prominent
- **Category tabs**: Horizontal, centered below video
- **Content area**: Adjusts based on selected category
- **Gradient backgrounds**: For visual interest and section separation

### Typography
- **Video title**: In player or below
- **Description**: 16-18px, below video
- **Tab labels**: 14-16px, clear, clickable
- **Integration callouts**: Smaller, with brand logos

### Color & Contrast
- **Video section**: Can use gradient background (pink, coral, purple)
- **Video player**: Dark with white text/controls
- **Tabs**: Neutral on light background
- **Active tab**: Underline or bold indicator

### Interaction
- **Video controls**: Standard play/pause, seek, volume, fullscreen
- **Tab switching**: Instant content change
- **Watch Later**: Saves to user's list
- **Share**: Opens share options

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-video-embed-tabs.png` | Framer | Video embed, category tabs, gradient background | P1 |
| `framer-video-tutorials-sidebar.png` | Framer | Tutorial sidebar, video list, durations | P1 |
| `framer-component-insert-panel.png` | Framer | Component grid, media inserts, icons | P2 |
| `gamma-folder-media-organization.png` | Gamma | Media library, folder navigation, content grid | P1 |

---

## Implementation Checklist

### Video Player
- [ ] Create `VideoPlayer` component with standard controls
- [ ] Support YouTube, Vimeo, and self-hosted video
- [ ] Add "Watch Later" and "Share" actions
- [ ] Implement gradient background variant

### Category Navigation
- [ ] Create `CategoryTabs` component
- [ ] Style active/inactive states
- [ ] Implement tab content switching
- [ ] Support responsive collapse on mobile

### Media Organization
- [ ] Create section layouts for each category
- [ ] Implement grid/list views for media items
- [ ] Add filtering and sorting options

### AI Features (Future)
- [ ] AI-powered video enhancement tools
- [ ] Audio transcription and editing
- [ ] Animation generation suggestions
- [ ] Content optimization recommendations

---

## Open Questions

- What AI features are prioritized for v1?
- How do we handle large video uploads and processing?
- Should there be collaborative editing features?
- How to integrate with external platforms (YouTube, Vimeo)?

---

## Related Features

- **content-workbench**: Overlapping media management patterns
- **course-enrollment**: Video playback patterns shared
- **ai-book-reading**: Media consumption patterns

---

**Design Direction Status**: Foundation established (more reference images needed for AI-specific features and editing interfaces)
