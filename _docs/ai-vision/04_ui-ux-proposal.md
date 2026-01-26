# UI/UX Proposal: Movemental.ai Onboarding Experience

> **Modern UI Patterns for Fit Check, AI Vision, AI Book, and Onboarding**

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Purpose**: Propose UI/UX approaches for Movemental.ai onboarding components based on modern design patterns and online reading behavior

---

## Design Philosophy

### Core Principles

1. **Progressive Disclosure** → Reveal information when needed, not all at once
2. **Visual Hierarchy** → Guide attention through typography, spacing, and contrast
3. **Reading-Optimized** → Design for how people actually read online (scanning, F-pattern, Z-pattern)
4. **Trust Through Transparency** → Show process, not hide it
5. **Respect for Time** → 60-second fit check means 60 seconds, not 5 minutes
6. **Mobile-First** → Design for mobile, enhance for desktop

### Modern UI Patterns (Mobbin-Inspired)

- **Card-Based Layouts** → Modular, scannable content blocks
- **Step Indicators** → Clear progress visualization
- **Micro-Interactions** → Subtle feedback for user actions
- **Smooth Transitions** → Animated state changes that guide attention
- **Clean Typography** → Reading-optimized font choices and spacing
- **Visual Feedback** → Immediate response to user actions
- **Minimal Navigation** → Focus on content, not chrome

---

## Component 1: 60-Second Fit Check

### Design Approach

**Single-Page Progressive Form** with real-time validation and immediate feedback.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Movemental Logo]                      │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Fit Check                       │   │
│  │  ────────                        │   │
│  │  [Progress: 0/6]                 │   │
│  │                                  │   │
│  │  Question 1 of 6                 │   │
│  │  ────────────────────────────   │   │
│  │                                  │   │
│  │  [Question Text]                 │   │
│  │                                  │   │
│  │  [Answer Options]                │   │
│  │  ○ Option A                      │   │
│  │  ○ Option B                      │   │
│  │  ○ Option C                      │   │
│  │                                  │   │
│  │  [Timer: 0:45 remaining]         │   │
│  │                                  │   │
│  │  [Next →]                        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  "This takes 60 seconds. We respect    │
│   your time."                           │
└─────────────────────────────────────────┘
```

### Key UI Elements

#### 1. Progress Indicator
- **Top of form**: Horizontal progress bar showing "Question X of 6"
- **Visual**: Thin line with filled segments (like Stripe checkout)
- **Color**: Subtle gray → Movemental brand color as progress increases
- **Purpose**: Shows completion, not time pressure

#### 2. Question Display
- **Typography**: Large, readable (20-24px on desktop, 18px mobile)
- **Layout**: Single question at a time (progressive disclosure)
- **Spacing**: Generous whitespace (60-80px between question and options)
- **Animation**: Smooth fade-in when question appears

#### 3. Answer Options
- **Format**: Radio buttons or large clickable cards
- **Card Style** (Recommended):
  - Large touch targets (min 44px height)
  - Subtle border on hover/focus
  - Selected state: Brand color border + subtle background
  - Smooth transition on selection
- **Mobile**: Full-width cards, stacked vertically
- **Desktop**: 2-3 columns if options are short

#### 4. Timer Display
- **Position**: Subtle, bottom-right of question area
- **Style**: Small, muted text ("~45s remaining")
- **Purpose**: Sets expectation, not creates pressure
- **Visual**: Simple countdown, no red warning colors

#### 5. Navigation
- **Next Button**: 
  - Disabled until answer selected
  - Enabled: Brand color, clear CTA
  - Smooth transition on enable
- **No Back Button**: Forward-only flow (prevents overthinking)

### Reading Pattern Optimization

**F-Pattern Layout:**
- Question at top-left (where eyes start)
- Options flow vertically (natural scanning)
- Next button bottom-right (where eyes end scan)

**Z-Pattern Alternative:**
- Question top-left
- Options create visual Z
- Next button bottom-right

### Mobile Considerations

- **Full-screen experience**: No distractions
- **Large touch targets**: Minimum 44px height
- **Stacked layout**: Single column, full width
- **Swipe gestures**: Optional swipe to next (with button fallback)
- **Keyboard avoidance**: Ensure inputs don't hide behind keyboard

### Micro-Interactions

1. **Answer Selection**:
   - Immediate visual feedback (border highlight)
   - Subtle scale animation (1.0 → 1.02)
   - Next button enables with smooth fade-in

2. **Question Transition**:
   - Current question fades out (opacity 1 → 0)
   - New question fades in (opacity 0 → 1)
   - Progress bar animates smoothly
   - Duration: 300ms

3. **Completion**:
   - Final question fades out
   - Results screen slides in from right
   - Smooth, confident transition

### Results Screen

**Fit Confirmed:**
```
┌─────────────────────────────────────────┐
│  ✓ Fit Confirmed                        │
│  ────────────────────────────────────   │
│                                         │
│  [Checkmark Icon - Large, Green]       │
│                                         │
│  "You're a fit for Movemental"         │
│                                         │
│  "Movemental is built for leaders      │
│   like you who..."                      │
│                                         │
│  [Continue to Why Movemental →]         │
└─────────────────────────────────────────┘
```

**Non-Fit:**
```
┌─────────────────────────────────────────┐
│  Not a Fit (And That's OK)              │
│  ────────────────────────────────────   │
│                                         │
│  [Gentle Icon - Not a X, but a guide]  │
│                                         │
│  "Movemental is designed for           │
│   movemental leaders with..."           │
│                                         │
│  [Alternative Resources]                │
│  • Link to general resources            │
│  • Link to newsletter                   │
│                                         │
│  [Explore Resources]                    │
└─────────────────────────────────────────┘
```

---

## Component 2: AI Vision Presentation

### Design Approach

**Scrollytelling with Sticky Sections** - Content reveals as user scrolls, key concepts stick and build.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Navigation: Minimal, Sticky]          │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Movemental Intelligence         │   │
│  │  ────────────────────────────   │   │
│  │                                  │   │
│  │  [Hero Statement - Large]       │   │
│  │                                  │   │
│  │  [Scroll Indicator ↓]            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [As user scrolls...]                   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  [Sticky Sidebar: Key Concepts] │   │
│  │  • Movemental DNA                │   │
│  │  • Amplification                 │   │
│  │  • Network Intelligence          │   │
│  │  • Quality Through Curation     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Main Content: Cards/Blocks]           │
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │ Card │  │ Card │  │ Card │         │
│  └──────┘  └──────┘  └──────┘         │
└─────────────────────────────────────────┘
```

### Key UI Elements

#### 1. Hero Section
- **Large Typography**: 48-64px headline (desktop), 32-40px (mobile)
- **Subheadline**: 20-24px, lighter weight
- **Spacing**: Generous padding (120px top, 80px bottom)
- **Background**: Subtle gradient or solid brand color
- **CTA**: "Learn More" or scroll indicator

#### 2. Sticky Sidebar (Desktop)
- **Position**: Left side, sticky as user scrolls
- **Content**: Key concepts from AI vision
- **Visual**: 
  - Active concept highlighted
  - Smooth scroll-to-section on click
  - Progress indicator (dots or line)
- **Mobile**: Convert to top tabs or accordion

#### 3. Content Cards
- **Layout**: 2-3 columns (desktop), 1 column (mobile)
- **Style**: 
  - White/light background
  - Subtle shadow on hover
  - Border-radius: 8-12px
  - Padding: 24-32px
- **Content**:
  - Icon or illustration
  - Headline (20-24px)
  - Body text (16-18px, line-height 1.6-1.8)
  - Optional CTA link

#### 4. Scrollytelling Sections
- **Technique**: Content reveals as user scrolls
- **Animation**: Fade-in from bottom (opacity 0 → 1, translateY 20px → 0)
- **Trigger**: When section enters viewport (Intersection Observer)
- **Duration**: 400-600ms, ease-out

#### 5. Visual Hierarchy
- **Headlines**: 32-40px (section), 24-28px (subsection)
- **Body**: 16-18px, line-height 1.6-1.8
- **Spacing**: 
  - Between sections: 80-120px
  - Between cards: 24-32px
  - Within cards: 16-24px

### Reading Pattern Optimization

**Progressive Disclosure:**
- Start with high-level concept
- Reveal details as user scrolls
- Key concepts stick in sidebar (desktop)

**F-Pattern Support:**
- Headlines left-aligned
- Body text left-aligned (max-width 65-75ch)
- Visual elements (icons, illustrations) support scanning

**Card Scanning:**
- Cards use consistent layout
- Icons/illustrations at top
- Headlines clearly visible
- Body text scannable (short paragraphs, bullet points)

### Mobile Considerations

- **Single column**: Full-width cards
- **Sticky sidebar → Top tabs**: Horizontal scrolling tabs or accordion
- **Touch-friendly**: Large tap targets, generous spacing
- **Reduced animations**: Lighter animations for performance

### Micro-Interactions

1. **Card Hover** (Desktop):
   - Subtle lift (translateY -4px)
   - Shadow increases
   - Border color intensifies
   - Duration: 200ms

2. **Scroll Reveal**:
   - Fade-in + slide-up animation
   - Staggered for multiple elements
   - Smooth, not jarring

3. **Sidebar Navigation**:
   - Active state highlight
   - Smooth scroll to section
   - Progress indicator updates

---

## Component 3: AI Book (Knowledge Spine)

### Design Approach

**Reading-Optimized Long-Form Content** with chapter navigation, reading progress, and inline references.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Minimal Header: Logo + Chapter Nav]  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  [Chapter Navigation - Sticky]  │   │
│  │  • Chapter 1                    │   │
│  │  • Chapter 2 (current)         │   │
│  │  • Chapter 3                    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Chapter 2: [Title]             │   │
│  │  ────────────────────────────   │   │
│  │                                  │   │
│  │  [Reading Progress Bar]          │   │
│  │  ████████░░░░░░░░░░ 45%          │   │
│  │                                  │   │
│  │  [Content - Typography Optimized]│   │
│  │                                  │   │
│  │  Paragraphs with generous        │   │
│  │  line-height and optimal width...│   │
│  │                                  │   │
│  │  [Inline References]             │   │
│  │  [Key Concept Callouts]           │   │
│  │                                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Footer: Next Chapter →]               │
└─────────────────────────────────────────┘
```

### Key UI Elements

#### 1. Chapter Navigation
- **Position**: Sticky sidebar (desktop) or top dropdown (mobile)
- **Style**: 
  - Clean list
  - Current chapter highlighted
  - Completed chapters: Checkmark or muted
  - Unread chapters: Normal weight
- **Interaction**: Smooth scroll to chapter on click

#### 2. Reading Progress
- **Position**: Top of content area, sticky
- **Visual**: Thin progress bar (2-4px height)
- **Color**: Brand color, subtle
- **Calculation**: Based on scroll position in current chapter

#### 3. Typography (Critical for Reading)
- **Font**: Serif for body (reading-optimized) or high-quality sans-serif
- **Size**: 18-20px body text (desktop), 16-18px (mobile)
- **Line Height**: 1.6-1.8 (generous for readability)
- **Line Length**: 65-75 characters (optimal reading width)
- **Paragraph Spacing**: 24-32px (clear separation)

#### 4. Content Structure
- **Headings**: Clear hierarchy (H1: 40-48px, H2: 32-36px, H3: 24-28px)
- **Paragraphs**: Short (3-5 sentences), generous spacing
- **Lists**: Bulleted or numbered, clear indentation
- **Blockquotes**: Distinct styling, left border, italic
- **Code/Examples**: Monospace font, background color, padding

#### 5. Inline Elements
- **Key Concepts**: 
  - Highlighted boxes or callouts
  - Subtle background color
  - Icon or visual indicator
  - Expandable for details (optional)
- **References**: 
  - Inline links (underlined, brand color)
  - Hover: Show preview or tooltip
  - External links: Icon indicator

#### 6. Reading Modes
- **Default**: Light background, dark text
- **Dark Mode**: Dark background, light text (optional)
- **Focus Mode**: Hide navigation, maximize content width
- **Print Mode**: Optimized for printing/PDF export

### Reading Pattern Optimization

**Long-Form Reading:**
- Optimal line length (65-75ch)
- Generous line-height (1.6-1.8)
- Clear paragraph breaks
- Visual hierarchy through typography

**Scanning Support:**
- Clear headings
- Short paragraphs
- Bullet points for lists
- Key concepts highlighted

**Progressive Reading:**
- Chapter navigation for jumping
- Reading progress for orientation
- "Continue reading" prompts
- Bookmark/save for later

### Mobile Considerations

- **Single column**: Full-width content
- **Larger touch targets**: For navigation
- **Simplified navigation**: Dropdown or bottom sheet
- **Optimized typography**: Slightly smaller, but still readable

### Micro-Interactions

1. **Scroll Progress**:
   - Progress bar updates smoothly
   - No jarring jumps
   - Updates on scroll (throttled)

2. **Chapter Navigation**:
   - Smooth scroll to chapter
   - Current chapter highlight updates
   - Reading progress resets

3. **Key Concept Hover** (Desktop):
   - Subtle background color change
   - Optional: Expand for more detail
   - Smooth transition

4. **Link Hover**:
   - Underline animation
   - Optional: Preview tooltip
   - Color change

---

## Component 4: Onboarding Path Overview

### Design Approach

**Timeline Visualization** with interactive stages, progress tracking, and clear expectations.

### Layout Structure

```
┌─────────────────────────────────────────┐
│  Onboarding Path                       │
│  ────────────────────────────────────   │
│                                         │
│  "From fit confirmed to live in 3-4    │
│   weeks. Here's what happens:"         │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  [Timeline - Vertical/Horizontal]│   │
│  │                                  │   │
│  │  Week 1                          │   │
│  │  ────────                        │   │
│  │  [Card: Phase 1]                 │   │
│  │  [Card: Phase 2]                 │   │
│  │                                  │   │
│  │  Week 2                          │   │
│  │  ────────                        │   │
│  │  [Card: Phase 3]                 │   │
│  │                                  │   │
│  │  Week 3-4                        │   │
│  │  ────────                        │   │
│  │  [Card: Phase 4]                 │   │
│  │  [Card: Go Live]                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [CTA: Start Onboarding]               │
└─────────────────────────────────────────┘
```

### Key UI Elements

#### 1. Timeline Visualization
- **Style**: Vertical timeline (desktop) or horizontal scroll (mobile)
- **Visual**: 
  - Connecting line between phases
  - Phase cards with icons
  - Time indicators (Week 1, Week 2, etc.)
- **Interaction**: 
  - Hover: Show more detail
  - Click: Expand for full details
  - Smooth animations

#### 2. Phase Cards
- **Layout**: Consistent card design
- **Content**:
  - Icon/illustration
  - Phase title
  - Brief description (2-3 sentences)
  - Time estimate
  - Key activities (bullet points)
- **Visual States**:
  - Default: Normal opacity
  - Current: Highlighted (if user is in onboarding)
  - Completed: Muted, checkmark
  - Upcoming: Normal

#### 3. Progress Indicator (If User Is Onboarding)
- **Position**: Top of page
- **Visual**: 
  - "You're in Phase X of 4"
  - Progress bar
  - Estimated time remaining
- **Purpose**: Shows where user is in process

#### 4. Expectations Section
- **Content**: 
  - "What to expect"
  - "What's required"
  - "How long it takes"
- **Style**: Clear, scannable list or cards
- **Purpose**: Reduces anxiety through transparency

#### 5. CTA Section
- **Primary CTA**: "Start Onboarding" or "Continue Onboarding"
- **Secondary**: "Learn More" or "Contact Us"
- **Style**: Clear, prominent, brand color

### Reading Pattern Optimization

**Timeline Scanning:**
- Visual timeline supports quick scanning
- Cards provide detail when needed
- Clear time indicators

**Progressive Disclosure:**
- High-level overview first
- Details available on interaction
- Expandable sections for more info

### Mobile Considerations

- **Horizontal scroll**: Timeline scrolls horizontally
- **Card stacking**: Phases stack vertically if needed
- **Touch-friendly**: Large tap targets
- **Simplified timeline**: May use simpler visual

### Micro-Interactions

1. **Card Hover** (Desktop):
   - Subtle lift
   - Shadow increase
   - Optional: Show more detail

2. **Card Click**:
   - Expand for full details
   - Smooth animation
   - Other cards may dim slightly

3. **Timeline Scroll**:
   - Smooth scrolling
   - Snap points for phases
   - Progress indicator updates

---

## Integration: Unified Experience

### Navigation Strategy

**Sticky Minimal Header:**
- Logo (links to homepage)
- Progress indicator (if in onboarding)
- Menu (hamburger on mobile, full nav on desktop)
- "Get Started" CTA (if not yet started)

**Breadcrumb/Progress:**
- Show current location in journey
- "Fit Check → Why Movemental → Onboarding Path"
- Visual progress indicator

### Transition Between Components

**Smooth State Changes:**
- Fit Check → Why Movemental: Fade transition
- Why Movemental → Onboarding Path: Slide transition
- Onboarding Path → AI Book: Smooth scroll or new page

**Context Preservation:**
- Remember user's progress
- Show "Continue where you left off"
- Maintain state across sessions

### Responsive Breakpoints

- **Mobile**: < 768px (single column, stacked)
- **Tablet**: 768px - 1024px (2 columns, adjusted spacing)
- **Desktop**: > 1024px (full layout, sidebars, multi-column)

### Performance Considerations

- **Lazy loading**: Load content as needed
- **Image optimization**: WebP, responsive images
- **Animation performance**: Use transform/opacity, not layout properties
- **Code splitting**: Load components on demand

---

## Accessibility Considerations

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for text
- **Keyboard Navigation**: All interactions keyboard-accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Indicators**: Clear focus states for keyboard navigation
- **Text Alternatives**: Alt text for images, descriptions for icons

### Inclusive Design

- **Font Size**: Minimum 16px, scalable
- **Touch Targets**: Minimum 44x44px
- **Reading Support**: Dyslexia-friendly fonts (optional), adjustable line-height
- **Motion**: Respect prefers-reduced-motion

---

## Implementation Priorities

### Phase 1: Core Experience
1. Fit Check (60-second form)
2. Basic AI Vision page (cards, no scrollytelling)
3. AI Book (reading-optimized typography)
4. Onboarding Path (simple timeline)

### Phase 2: Enhanced Interactions
1. Fit Check micro-interactions
2. AI Vision scrollytelling
3. AI Book reading modes
4. Onboarding Path expandable cards

### Phase 3: Advanced Features
1. Progress tracking across sessions
2. Personalized recommendations
3. Advanced animations
4. Dark mode

---

## Design System Elements

### Colors
- **Primary**: Movemental brand color
- **Secondary**: Supporting colors
- **Neutral**: Grays for text and backgrounds
- **Status**: Success (green), warning (yellow), error (red)

### Typography
- **Headlines**: Bold, 32-64px
- **Subheadlines**: Medium, 20-28px
- **Body**: Regular, 16-20px
- **Small**: Regular, 14-16px

### Spacing
- **Base Unit**: 8px
- **Scale**: 8, 16, 24, 32, 48, 64, 96, 128px

### Components
- **Buttons**: Primary (brand color), Secondary (outline), Text (link style)
- **Cards**: White background, subtle shadow, border-radius 8-12px
- **Forms**: Clear labels, helpful error messages, inline validation
- **Navigation**: Minimal, sticky, clear hierarchy

---

## Summary

This UI/UX proposal integrates modern design patterns (Mobbin-inspired) with Movemental's content structure and business requirements:

### Core Onboarding Components
- **Fit Check**: Progressive form with real-time feedback (60 seconds)
- **AI Vision**: Scrollytelling with sticky navigation
- **AI Book**: Reading-optimized long-form content
- **Onboarding Path**: Interactive timeline visualization

### Additional Platform Features
- **Movement Leader Profiles**: Rich author profiles built from research data
- **Dashboard & Analytics**: Data-rich overview with actionable insights
- **Content Workbench**: Unified content creation with AI copilot
- **AI Media Lab**: Guided workflow for AI-generated media
- **E-Commerce & Monetization**: Seamless subscriptions, courses, books, consulting
- **Assessment System**: Interactive assessments with progress tracking

All components prioritize:
- **Progressive disclosure** (reveal when needed)
- **Reading optimization** (how people actually read online)
- **Trust through transparency** (show process, not hide it)
- **Mobile-first** (responsive, touch-friendly)
- **Accessibility** (WCAG 2.1 AA compliant)
- **Mission-aligned** (commerce supports mission, doesn't dominate)

The result is a cohesive, modern, conversion-optimized experience that respects users' time while building trust through clarity and transparency. Each component is designed to serve movemental leaders' specific needs while maintaining the platform's focus on amplification, not extraction.

---

## Additional Features & Tools

### Component 5: Movement Leader Author Profiles

#### Design Approach

**Rich Profile Pages** that showcase movemental leaders' expertise, content, and network connections—built from research data in `_docs/movement_leader_research`.

#### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Leader Name] - Movemental Leader     │
│  ────────────────────────────────────   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  [Hero: Photo + Key Info]       │   │
│  │  • Location, Role               │   │
│  │  • Movement Focus               │   │
│  │  • Network Connections          │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  [Tabs: About | Content | Network]│   │
│  │                                  │   │
│  │  About Tab:                      │   │
│  │  • Personal Background           │   │
│  │  • Theological Framework        │   │
│  │  • Movement Positioning         │   │
│  │  • Credibility Markers          │   │
│  │                                  │   │
│  │  Content Tab:                   │   │
│  │  • Books (with covers)          │   │
│  │  • Articles (grid/list)         │   │
│  │  • Courses                       │   │
│  │  • Speaking Topics              │   │
│  │                                  │   │
│  │  Network Tab:                   │   │
│  │  • Connected Leaders            │   │
│  │  • Collaborations               │   │
│  │  • Organizations                │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [CTA: Follow | Subscribe | Connect]   │
└─────────────────────────────────────────┘
```

#### Key UI Elements

**1. Hero Section**
- **Large photo**: Professional headshot or action shot
- **Key Info Cards**:
  - Location & Role
  - Movement Focus (tags/chips)
  - Assessment Score (if public)
  - Years of Experience
- **Quick Stats**: Books published, articles written, network connections
- **Follow/Subscribe CTA**: Prominent, clear action

**2. Tabbed Navigation**
- **About**: Personal background, theological framework, movement positioning
- **Content**: Books, articles, courses, speaking topics
- **Network**: Connected leaders, collaborations, organizations
- **Activity**: Recent content, network interactions (optional)

**3. Content Grid**
- **Books**: Cover images, titles, descriptions, purchase links
- **Articles**: Thumbnails, headlines, excerpts, read time
- **Courses**: Course cards with enrollment status
- **Filtering**: By type, date, topic, format

**4. Network Visualization**
- **Connected Leaders**: Avatar grid with names
- **Collaboration History**: Joint content, co-authored works
- **Organizations**: Affiliations, roles, links
- **Network Map**: Visual graph showing connections (optional, advanced)

**5. Credibility Markers**
- **Published Works**: Book covers, article counts
- **Speaking Engagements**: Conference logos, topics
- **Academic Affiliations**: Institution logos, roles
- **Network Influence**: Follower counts, engagement metrics

#### Reading Pattern Optimization

**Scannable Layout:**
- Hero section provides immediate context
- Tabs enable focused exploration
- Content grid supports quick scanning
- Network section shows relationships at a glance

**Progressive Disclosure:**
- High-level info in hero
- Details in tabs
- Expandable sections for more info
- Related content suggestions

#### Mobile Considerations

- **Stacked layout**: Hero, then tabs, then content
- **Horizontal scroll**: For content grids if needed
- **Touch-friendly**: Large tap targets for navigation
- **Simplified network**: Avatar list instead of complex visualization

---

### Component 6: Dashboard & Analytics

#### Design Approach

**Data-Rich Dashboard** with clear metrics, actionable insights, and intuitive navigation to specialized modules.

#### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Global Header: Logo, Notifications]  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Dashboard Overview             │   │
│  │  ────────────────────────────   │   │
│  │                                  │   │
│  │  [Metric Tiles - 4 columns]     │   │
│  │  Revenue | Reach | Content | AI  │   │
│  │                                  │   │
│  │  [Quick Actions]                 │   │
│  │  [Create] [Launch] [Invite]     │   │
│  │                                  │   │
│  │  [Task List]                    │   │
│  │  • Review AI disclosure         │   │
│  │  • Approve collaboration         │   │
│  │                                  │   │
│  │  [Content Performance]           │   │
│  │  [Network Insights]              │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

#### Key UI Elements

**1. Metric Tiles**
- **Revenue**: MTD, 90-day trend, comparison chart
- **Audience Reach**: Current vs. baseline, amplification gauge
- **Content Cadence**: Published vs. goal, progress bar
- **AI QA Status**: Badge adoption, voice/theology scores
- **Visual**: Large numbers, trend indicators, mini charts

**2. Quick Actions**
- **Create Content**: Link to Content Workbench
- **Launch Media Lab**: Link to AI Media Lab
- **Invite Collaborator**: Modal for collaboration
- **View Analytics**: Link to detailed analytics

**3. Task List**
- **Prioritized Tasks**: Most important first
- **Status Indicators**: Pending, in progress, completed
- **Due Dates**: Clear deadlines
- **Quick Actions**: Complete, defer, delegate

**4. Content Performance**
- **Top Performing**: List or chart of best content
- **Filters**: By format, timeframe, metric
- **Trends**: Growth indicators, comparisons

**5. Network Insights**
- **Audience Overlap**: Percentage with other leaders
- **Collaboration Opportunities**: Suggested connections
- **Cross-Link Performance**: Network referral stats

#### Reading Pattern Optimization

**Dashboard Scanning:**
- Key metrics at top (F-pattern start)
- Actions easily accessible
- Details available on demand
- Clear visual hierarchy

**Data Visualization:**
- Charts use clear colors and labels
- Numbers are large and readable
- Trends are obvious (up/down arrows)
- Tooltips provide context

#### Mobile Considerations

- **Stacked metrics**: Single column on mobile
- **Collapsible sections**: Expand for details
- **Touch-friendly**: Large tap targets
- **Simplified charts**: Essential data only

---

### Component 7: Content Workbench

#### Design Approach

**Unified Content Creation Environment** with AI copilot, transparency tools, and collaboration features.

#### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Header: Save, Publish, Settings]      │
│                                         │
│  ┌───────────┬───────────────────────┐ │
│  │ Sidebar   │ Main Editor           │ │
│  │           │                        │ │
│  │ • Outline │ [Rich Text Editor]    │ │
│  │ • Media   │                        │ │
│  │ • AI      │ Content goes here...   │ │
│  │ • SEO     │                        │ │
│  │ • Badges  │                        │ │
│  │           │                        │ │
│  └───────────┴───────────────────────┘ │
│                                         │
│  [Footer: Collaboration, Comments]      │
└─────────────────────────────────────────┘
```

#### Key UI Elements

**1. Rich Text Editor**
- **Block-Based**: Paragraphs, headings, lists, quotes
- **Media Embedding**: Images, videos, audio
- **Special Blocks**: Scripture, callouts, code
- **Markdown Support**: For power users
- **Auto-save**: Continuous saving with indicator

**2. AI Copilot Panel**
- **Toggle**: Show/hide sidebar
- **Prompt Interface**: Text input for AI requests
- **Suggestions**: Pre-built prompts (outline, refine, translate)
- **Voice Preservation**: Guardrails indicator
- **History**: Previous AI interactions

**3. Transparency Badge Selector**
- **Required Step**: Before publishing
- **Badge Options**: Visual cards with explanations
- **Disclosure Fields**: Additional context if needed
- **Preview**: How badge appears to readers

**4. SEO Checklist**
- **Sidebar Panel**: Toggle to show/hide
- **Checklist Items**: Title, meta description, keywords
- **Suggestions**: AI-generated recommendations
- **Score**: Overall SEO score with improvements

**5. Collaboration Footer**
- **Comments**: Threaded discussions
- **Assign Reviewer**: Dropdown for team members
- **Version History**: See previous versions
- **Approval Workflow**: Status indicators

#### Reading Pattern Optimization

**Editor Focus:**
- Main editor takes center stage
- Sidebars are collapsible
- Distraction-free writing mode available
- Clear visual separation of tools

**Workflow Support:**
- Clear next steps
- Progress indicators
- Helpful tooltips
- Contextual help

#### Mobile Considerations

- **Full-screen editor**: Sidebars become modals
- **Touch-optimized**: Large tap targets
- **Simplified toolbar**: Essential tools only
- **Voice input**: For mobile content creation

---

### Component 8: AI Media Lab

#### Design Approach

**Guided Workflow** for AI-generated media with human-in-the-loop review and transparency.

#### Layout Structure

```
┌─────────────────────────────────────────┐
│  AI Media Lab                          │
│  ────────────────────────────────────   │
│                                         │
│  [Project Dashboard]                   │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │Proj 1│ │Proj 2│ │Proj 3│           │
│  └──────┘ └──────┘ └──────┘           │
│                                         │
│  [Submission Wizard - Stepper]         │
│  Step 1: Source Intake                │
│  Step 2: Brief Configuration          │
│  Step 3: AI Processing                │
│  Step 4: Review & Edit                 │
│  Step 5: Distribution                 │
│                                         │
│  [Current Step Content]                │
└─────────────────────────────────────────┘
```

#### Key UI Elements

**1. Project Dashboard**
- **Project Cards**: Status, type, date
- **Filters**: By status, type, date
- **New Project**: Prominent CTA
- **Quick Actions**: View, edit, delete

**2. Submission Wizard**
- **Stepper UI**: Clear progress through steps
- **Step 1 - Source Intake**:
  - File upload (drag & drop)
  - Link to external content
  - Thematic focus selection
- **Step 2 - Brief Configuration**:
  - Output selection (podcast, deck, clips)
  - Audience persona
  - Tone selection
- **Step 3 - AI Processing**:
  - Progress indicator
  - Estimated time
  - Processing logs
- **Step 4 - Review & Edit**:
  - Audio player with transcript
  - Slide deck preview
  - Clip list with trimming
  - Badge selector
- **Step 5 - Distribution**:
  - Publish options
  - Network sharing
  - Download assets
  - Schedule announcements

**3. Processing Monitor**
- **Progress Bar**: Visual completion indicator
- **Status Messages**: What's happening now
- **Estimated Time**: Countdown or ETA
- **Cancel Option**: Stop processing if needed

**4. Review Workspace**
- **Multi-Panel Layout**: Audio, transcript, slides, clips
- **Editing Tools**: Text editing, trimming, adjustments
- **Preview**: How it will look when published
- **Transparency**: Badge selection and disclosure

#### Reading Pattern Optimization

**Workflow Clarity:**
- Stepper shows where you are
- Each step is focused and clear
- Progress is visible
- Next steps are obvious

**Review Efficiency:**
- All outputs visible at once
- Easy switching between formats
- Clear editing controls
- Preview before publishing

#### Mobile Considerations

- **Simplified wizard**: One step at a time
- **Touch-optimized**: Large upload areas
- **Streamlined review**: Focus on one format at a time
- **Mobile-friendly players**: Audio/video optimized

---

### Component 9: E-Commerce & Monetization

#### Design Approach

**Seamless Commerce** that supports the mission without dominating the experience.

#### Key UI Elements

**1. Subscription Management**
- **Tier Selection**: Clear cards with features
- **Comparison Table**: Side-by-side plans
- **Current Plan**: Highlighted, upgrade options
- **Billing History**: Past invoices, receipts
- **Payment Methods**: Add, edit, remove cards

**2. Course Enrollment**
- **Course Cards**: Image, title, description, price
- **Enrollment Flow**: Simple checkout
- **Progress Tracking**: Visual progress bars
- **Certificate Display**: Upon completion

**3. Book Purchase**
- **Book Detail Page**: Cover, description, sample
- **Purchase Options**: Digital, physical, bundle
- **Reading Experience**: E-reader interface
- **Library**: User's purchased books

**4. Consulting Booking**
- **Calendar Integration**: Available times
- **Service Selection**: Type of consultation
- **Booking Form**: Details, payment
- **Confirmation**: Email, calendar invite

**5. Donations**
- **Donation Form**: Amount, frequency, message
- **Payment Processing**: Secure, simple
- **Thank You Page**: Gratitude, impact
- **Receipt**: Email confirmation

#### Reading Pattern Optimization

**Clear Value Proposition:**
- What you get is obvious
- Pricing is transparent
- Benefits are clear
- Trust signals visible

**Simple Checkout:**
- Minimal steps
- Clear progress
- Secure indicators
- Easy payment

#### Mobile Considerations

- **Mobile-optimized forms**: Large inputs, clear labels
- **Touch-friendly**: Large buttons, easy selection
- **Simplified flow**: Fewer steps on mobile
- **Mobile payment**: Apple Pay, Google Pay

---

### Component 10: Assessment System

#### Design Approach

**Interactive Assessment** with progress tracking, personalized recommendations, and milestone achievements.

#### Layout Structure

```
┌─────────────────────────────────────────┐
│  Digital Platform Readiness Assessment  │
│  ────────────────────────────────────   │
│                                         │
│  [Progress: 3/5 Stages Complete]       │
│  ████████████░░░░░░░░ 60%              │
│                                         │
│  [Current Stage: Content Strategy]     │
│                                         │
│  [Questions - Progressive Form]         │
│  Question 1 of 8                       │
│  ────────────────────────────────      │
│  [Question Text]                        │
│                                         │
│  [Answer Options]                       │
│  ○ Option A                            │
│  ○ Option B                            │
│  ○ Option C                            │
│                                         │
│  [Next →]                               │
│                                         │
│  [Milestones Unlocked]                  │
│  ✓ Foundation Complete                 │
│  ✓ Content Audit Complete              │
└─────────────────────────────────────────┘
```

#### Key UI Elements

**1. Progress Tracking**
- **Overall Progress**: Percentage, visual bar
- **Stage Progress**: Current stage, remaining
- **Milestones**: Unlocked achievements
- **Time Estimate**: How long remaining

**2. Question Interface**
- **Single Question**: Focused, one at a time
- **Clear Options**: Radio buttons or cards
- **Help Text**: Contextual explanations
- **Skip Option**: For optional questions

**3. Results & Recommendations**
- **Score Display**: Overall score, category breakdown
- **Personalized Recommendations**: Based on answers
- **Action Items**: Next steps to improve
- **Resources**: Links to relevant content

**4. Milestone Achievements**
- **Visual Badges**: Unlocked achievements
- **Progress Indicators**: What's next
- **Celebration**: Subtle animations on completion

#### Reading Pattern Optimization

**Clear Progress:**
- Always know where you are
- See what's completed
- Understand what's next
- Feel accomplishment

**Focused Questions:**
- One question at a time
- Clear options
- Helpful context
- No overwhelm

#### Mobile Considerations

- **Full-screen experience**: No distractions
- **Large touch targets**: Easy selection
- **Progress always visible**: Sticky header
- **Simplified results**: Key info first

---

## Integration Summary

### Unified Navigation

**Global Header:**
- Logo (links to dashboard/home)
- Main navigation (Content, Media, Analytics, Network)
- Notifications
- Profile menu
- Search (optional)

**Contextual Navigation:**
- Breadcrumbs for deep pages
- Sidebar navigation for modules
- Tab navigation for related content
- Footer links for support/legal

### State Management

**User Progress:**
- Track onboarding completion
- Remember preferences
- Save drafts automatically
- Sync across devices

**Session State:**
- Current page/context
- Unsaved changes warnings
- Active filters/selections
- Recent activity

### Responsive Strategy

**Breakpoints:**
- Mobile: < 768px (single column, stacked)
- Tablet: 768px - 1024px (2 columns, adjusted)
- Desktop: > 1024px (full layout, sidebars)

**Adaptive Components:**
- Navigation: Hamburger on mobile, full nav on desktop
- Sidebars: Modals on mobile, persistent on desktop
- Tables: Cards on mobile, tables on desktop
- Forms: Stacked on mobile, multi-column on desktop

---

**Next**: See [01_ai-vision-overview.md](./01_ai-vision-overview.md) for the AI vision framework
