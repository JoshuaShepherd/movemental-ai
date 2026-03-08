# Implementation Request: AI Book Reading

## Context

I need to implement the **AI Book Reading** UI section for the Movemental.ai platform. This is the chapter reading experience for the AI-powered book—a comfortable, distraction-free reading interface that enables AI-enhanced features without disrupting the reading flow. The interface should feel more like a well-designed book than a software application.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/ai-book-reading/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/ai-book-reading/reference-images/`
  - `framer-article-typography.png` - H2 headers, body text, bullet lists, italic emphasis
  - `medium-article-typography.png` - Inline links, audio player, reading time, paragraph spacing

### Content Specification
- `_docs/site-docs/06_ai_book_as_knowledge_spine.md` - Content requirements and book structure

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **Framer Motion** for scroll animations (optional)
- **Lucide React** for icons

---

## Component Structure

```
components/
├── ai-book-reading/
│   ├── ReadingContainer.tsx          # Main reading layout
│   ├── ChapterHeader.tsx             # Chapter title and meta
│   ├── SectionHeader.tsx             # H2 section headers
│   ├── ReadingParagraph.tsx          # Styled paragraph component
│   ├── ReadingList.tsx               # Bullet/numbered lists
│   ├── Emphasis.tsx                  # Italic/highlighted terms
│   ├── BlockQuote.tsx                # Pull quotes and blockquotes
│   ├── ReadingProgress.tsx           # Progress indicator
│   ├── ReadingTime.tsx               # Time remaining estimate
│   ├── AudioPlayer.tsx               # Text-to-speech player
│   ├── TableOfContents.tsx           # Chapter navigation sidebar
│   ├── ChapterNav.tsx                # Previous/next chapter links
│   ├── BookmarkButton.tsx            # Save/bookmark functionality
│   ├── AIHighlight.tsx               # AI-suggested highlights (future)
│   ├── MarginNote.tsx                # AI annotations (future)
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── book/
│       ├── page.tsx                  # Book landing/overview
│       └── [chapterId]/
│           └── page.tsx              # Chapter reading page
```

---

## Key Design Patterns to Implement

### Pattern 1: Longform Article Typography
- **H2 section headers**: Bold, clear hierarchy (24-32px), generous top margin
- **Body paragraphs**: 16-18px, line-height 1.6-1.8, max-width ~700px
- **Bullet lists**: Proper indentation, consistent markers
- **Italic emphasis**: For key terms, questions, highlighted concepts
- **Section spacing**: 40-60px between major sections
- **Reading width**: ~65-75 characters per line

### Pattern 2: Medium Article Reading Experience
- Clean, centered reading column
- Inline links styled distinctively (underlined, accent color)
- Reading time indicator ("4 min remaining")
- Audio player option for text-to-speech
- Comfortable paragraph spacing
- Book/article title references in italics

---

## Visual Language Requirements

### Layout
- **Reading column**: Centered, max-width 700-800px
- **Margins**: Generous (80-120px top/bottom on desktop)
- **Section breaks**: Visual whitespace, optional subtle divider
- **Mobile**: Full-width with padding, adjusted font sizes

### Typography
- **Chapter titles**: 40-48px, bold, centered or left-aligned
- **Section headers (H2)**: 24-32px, bold, clear top margin (60-80px)
- **Subsection headers (H3)**: 18-22px, semibold
- **Body text**: 16-18px, regular weight, line-height 1.6-1.8
- **Bullet lists**: 16-18px, left indent, consistent bullet style
- **Emphasized text**: Italic for terms, questions, key concepts
- **Font family**: System serif or readable sans-serif (Georgia, Merriweather, Inter)

### Color & Contrast
- **Background**: White or very light cream (#fafafa)
- **Body text**: Near-black (#1a1a1a or #222)
- **Headers**: Slightly darker or same as body
- **Links**: Accent color (blue), underline on hover
- **Highlights**: Light yellow or accent tint (AI-highlighted passages)

### Interaction
- **Text selection**: Standard selection for highlighting
- **AI highlights**: Subtle background tint on AI-suggested passages
- **Margin notes**: Slide-in or tooltip on hover/tap
- **Chapter navigation**: Sticky header or sidebar
- **Reading progress**: Subtle progress indicator (top bar or scroll)

---

## Implementation Requirements

### 1. ReadingContainer Component
```tsx
interface ReadingContainerProps {
  chapter: Chapter
  showProgress?: boolean
  showAudioPlayer?: boolean
  showTableOfContents?: boolean
  className?: string
}

interface Chapter {
  id: string
  number: number
  title: string
  content: ContentBlock[]
  readingTime: number // in minutes
  previousChapter?: { id: string; title: string }
  nextChapter?: { id: string; title: string }
}

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'image'
  content: string
  level?: 2 | 3 // For headings
  items?: string[] // For lists
}
```

### 2. ReadingProgress Component
```tsx
interface ReadingProgressProps {
  progress: number // 0-100
  variant?: 'bar' | 'circle' | 'text'
  position?: 'top' | 'bottom' | 'floating'
  className?: string
}
```

### 3. ReadingTime Component
```tsx
interface ReadingTimeProps {
  totalMinutes: number
  currentProgress: number // 0-100
  format?: 'remaining' | 'total' | 'both'
  className?: string
}
```

### 4. TableOfContents Component
```tsx
interface TableOfContentsProps {
  chapters: { id: string; number: number; title: string }[]
  currentChapterId: string
  variant?: 'sidebar' | 'dropdown' | 'drawer'
  onNavigate?: (chapterId: string) => void
  className?: string
}
```

---

## Typography Scale

```css
/* Recommended scale */
--chapter-title: clamp(32px, 5vw, 48px);
--section-header: clamp(20px, 3vw, 32px);
--subsection-header: clamp(16px, 2.5vw, 22px);
--body-text: clamp(16px, 1.8vw, 18px);
--line-height: 1.7;
--max-width: min(700px, 90vw);
```

---

## Responsive Design

### Mobile (<768px)
- Full-width with 16-24px padding
- Chapter title: 32px
- Body text: 16px
- Progress bar at top
- Table of contents: Drawer

### Tablet (768-1024px)
- Centered content, 48px padding
- Chapter title: 40px
- Body text: 17px
- Progress bar at top

### Desktop (>1024px)
- Max-width 700-800px, centered
- Chapter title: 48px
- Body text: 18px
- Table of contents: Sidebar option

---

## Deliverables

1. **Components**: All components listed in structure
2. **Reading Layout**: Centered, comfortable typography
3. **Chapter Header**: Title, meta, reading time
4. **Content Blocks**: Paragraphs, lists, quotes, headings
5. **Progress Tracking**: Progress bar and time remaining
6. **Navigation**: Table of contents, previous/next
7. **Audio Player**: Text-to-speech option
8. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Typography hierarchy clear and readable
- [ ] Comfortable reading width (65-75 chars)
- [ ] Proper line-height (1.6-1.8)
- [ ] Section headers with generous spacing
- [ ] Bullet lists properly indented
- [ ] Reading progress indicator working
- [ ] Reading time estimate displaying
- [ ] Table of contents navigation working
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] Proper alt text for images
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Typography is the hero—no complex imagery needed
- Should feel like reading a well-designed book
- AI features should enhance, not interrupt reading
- Consider dark mode / reader mode option (future)
- Audio player enhances accessibility
- Progress tracking helps users resume where they left off

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing both reference images for typography patterns
3. Planning the component structure
4. Implementing `ReadingContainer` with proper max-width
5. Building typography components (paragraphs, headers, lists)
6. Adding `ReadingProgress` indicator
7. Implementing `TableOfContents` navigation
8. Testing typography at all breakpoints
