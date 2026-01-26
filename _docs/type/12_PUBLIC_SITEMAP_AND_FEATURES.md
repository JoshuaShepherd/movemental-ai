# Public Sitemap and Features

> **Shared bones** - Public pages and UX elements that exist across all tenant sites

**Version**: 1.1.0  
**Last Updated**: January 2026

---

## Overview

This document describes the **public-facing pages and features** that should exist across all tenant sites built on this platform. This is a "bones" list—generic structure that can be customized with tenant-specific content.

**Note**: 
- ❌ **EXCLUDED**: Dashboard routes, archive functionality
- ✅ **INCLUDED**: Public pages, marketing, reading, purchasing, enrolling, assessments (if public-facing)

---

## Public Pages

### Homepage

**Route**: `/`

**Purpose**: Landing page, hero section, featured content

**Features**:
- Hero section with CTA
- Featured content (books, courses, articles)
- Navigation to key sections
- Search functionality

**Status**: Must-have for MVP

---

### Content Pages

#### Books

**Routes**:
- `/books` - Book listing page
- `/books/[slug]` - Individual book page
- `/books/[slug]/chapters/[chapterSlug]` - Chapter reading page

**Purpose**: Display and read books

**Features**:
- Book grid/list view
- Book detail page with description
- Chapter reading interface
- Reading progress tracking
- Bookmarking

**Status**: Must-have for MVP

---

#### Articles

**Routes**:
- `/articles` - Article listing page
- `/articles/[slug]` - Individual article page

**Purpose**: Display and read articles

**Features**:
- Article grid/list view
- Article detail page with content
- Reading progress bar
- Related articles
- Comments (if enabled)

**Status**: Must-have for MVP

---

#### Videos

**Routes**:
- `/videos` - Video listing page
- `/videos/[slug]` - Individual video page

**Purpose**: Display and watch videos

**Features**:
- Video grid/list view
- Video player
- Video metadata
- Related videos

**Status**: Must-have for MVP

---

#### Podcast

**Routes**:
- `/podcast` - Podcast listing page
- `/podcast/[slug]` - Individual episode page
- `/podcast/series/[slug]` - Podcast series page

**Purpose**: Display and listen to podcast episodes

**Features**:
- Episode listing
- Audio player
- Episode metadata
- Series grouping

**Status**: Optional (if podcast content exists)

---

### Learning Pages

#### Courses

**Routes**:
- `/courses` - Course listing page
- `/courses/[slug]` - Course detail page
- `/courses/[slug]/learn` - Course learning interface
- `/courses/[slug]/modules/[moduleNumber]` - Module page
- `/courses/[slug]/progress` - Course progress page

**Purpose**: Display and enroll in courses

**Features**:
- Course grid/list view
- Course detail with description
- Enrollment flow
- Learning interface
- Progress tracking

**Status**: Must-have for MVP (if courses exist)

---

#### Assessments

**Routes**:
- `/assessments` - Assessment listing page
- `/assessments/[slug]` - Assessment detail page
- `/assessments/[slug]/take` - Take assessment
- `/assessments/[slug]/results` - Assessment results
- `/assessments/results/share/[token]` - Shared results

**Purpose**: Display and take assessments

**Features**:
- Assessment listing
- Assessment detail
- Assessment taking interface
- Results display
- Results sharing

**Status**: Optional (if assessments exist)

---

### Marketing Pages

#### About

**Route**: `/about`

**Purpose**: About page, mission, values

**Features**:
- About content
- Team information (if applicable)
- Mission/values

**Status**: Must-have for MVP

---

#### Contact

**Route**: `/contact`

**Purpose**: Contact form, contact information

**Features**:
- Contact form
- Contact information
- Support links

**Status**: Must-have for MVP

---

#### Pricing

**Route**: `/pricing`

**Purpose**: Pricing information, plans

**Features**:
- Pricing tiers
- Plan comparison
- CTA to sign up

**Status**: Optional (if pricing is public)

---

#### Resources

**Route**: `/resources`

**Purpose**: Resource hub, content index

**Features**:
- Resource categories
- Content links
- Search functionality

**Status**: Optional

---

### Legal Pages

#### Privacy Policy

**Route**: `/privacy`

**Purpose**: Privacy policy

**Status**: Must-have for MVP

---

#### Terms of Service

**Route**: `/terms`

**Purpose**: Terms of service

**Status**: Must-have for MVP

---

#### Accessibility

**Route**: `/accessibility`

**Purpose**: Accessibility statement

**Status**: Optional (recommended)

---

### User Account Pages

#### Account

**Routes**:
- `/account` - Account dashboard
- `/account/profile` - Profile settings
- `/account/library` - User's library
- `/account/bookmarks` - User's bookmarks

**Purpose**: User account management

**Features**:
- Account overview
- Profile editing
- Content library
- Bookmarks

**Status**: Must-have for MVP (if user accounts exist)

---

#### Authentication

**Routes**:
- `/login` - Login page
- `/signup` - Sign up page

**Purpose**: User authentication

**Features**:
- Login form
- Sign up form
- Password reset (if applicable)

**Status**: Must-have for MVP (if user accounts exist)

---

### Search

**Route**: `/search`

**Purpose**: Global search functionality

**Features**:
- Search input
- Search results
- Search filters
- Search suggestions

**Status**: Must-have for MVP

---

### Categories

**Routes**:
- `/categories` - Category listing
- `/categories/[slug]` - Category detail page

**Purpose**: Content categorization

**Features**:
- Category listing
- Category-filtered content
- Category navigation

**Status**: Optional

---

### Series

**Routes**:
- `/series` - Series listing
- `/series/[slug]` - Series detail page

**Purpose**: Content series grouping

**Features**:
- Series listing
- Series detail with episodes/items
- Series navigation

**Status**: Optional

---

## Shared UI Modules

### Navigation

#### Public Header

**Component**: `PublicHeader`

**Features**:
- Site logo/branding
- Main navigation menu
- Search bar
- User account link (if authenticated)
- Mobile menu

**Status**: Must-have for MVP

---

#### Footer

**Component**: `Footer`

**Features**:
- Site links
- Legal links (Privacy, Terms)
- Social media links (if applicable)
- Copyright information

**Status**: Must-have for MVP

---

### Search Components

#### Search Bar

**Component**: `SearchBar`

**Features**:
- Search input
- Search suggestions
- Search results dropdown
- Keyboard navigation

**Status**: Must-have for MVP

---

#### Search Results

**Component**: `SearchResults`

**Features**:
- Search results display
- Result filtering
- Result pagination
- Empty state

**Status**: Must-have for MVP

---

### Content Cards

#### Book Card

**Component**: `BookCard`

**Features**:
- Book cover image
- Book title
- Book author
- Book description (truncated)
- Link to book page

**Status**: Must-have for MVP

---

#### Article Card

**Component**: `ArticleCard`

**Features**:
- Article image (if applicable)
- Article title
- Article excerpt
- Article metadata (date, author)
- Link to article page

**Status**: Must-have for MVP

---

#### Course Card

**Component**: `CourseCard`

**Features**:
- Course image
- Course title
- Course description
- Course metadata (duration, lessons)
- Link to course page

**Status**: Must-have for MVP (if courses exist)

---

### Content Display

#### Content Grid

**Component**: `ContentGrid`

**Features**:
- Responsive grid layout
- Content cards
- Pagination
- Empty state

**Status**: Must-have for MVP

---

#### Content List

**Component**: `ContentList`

**Features**:
- List layout
- Content items
- Sorting/filtering
- Pagination

**Status**: Optional

---

### Reading Interface

#### Reading Layout

**Component**: `ReadingPageLayout`

**Features**:
- Reading content area
- Table of contents (if applicable)
- Reading progress
- Navigation (prev/next)
- Focus mode toggle

**Status**: Must-have for MVP (if reading content exists)

---

#### Reading Progress

**Component**: `ReadingProgressBar`

**Features**:
- Progress indicator
- Scroll-based progress
- Completion tracking

**Status**: Optional

---

## MVP vs Optional Features

### Must-Have for MVP

✅ **Navigation**:
- Public header
- Footer
- Main navigation menu

✅ **Content Pages**:
- Homepage
- Books listing and detail
- Articles listing and detail
- Videos listing and detail (if video content exists)

✅ **Search**:
- Search bar
- Search results page

✅ **Legal**:
- Privacy policy
- Terms of service

✅ **Authentication** (if user accounts):
- Login page
- Sign up page
- Account pages

✅ **UI Components**:
- Content cards (Book, Article)
- Content grid
- Reading layout (if reading content exists)

---

### Optional Features

🔲 **Content Pages**:
- Podcast pages
- Series pages
- Category pages

🔲 **Learning**:
- Courses (if not core to tenant)
- Assessments (if not core to tenant)

🔲 **Marketing**:
- Pricing page
- Resources page
- Accessibility page

🔲 **UI Components**:
- Content list view
- Reading progress bar
- Advanced search filters

---

## Customization Notes

### Tenant-Specific Content

While the structure is shared, each tenant can customize:
- **Content**: Books, articles, courses specific to tenant
- **Branding**: Logo, colors, fonts
- **Navigation**: Menu items, links
- **Features**: Enable/disable optional features

### Content Types

The platform supports various content types:
- Books (with chapters)
- Articles
- Videos
- Podcasts
- Courses (with modules/lessons)
- Assessments

**Note**: Not all content types need to be used. Enable only what's needed for each tenant.

---

## Implementation Notes

### Route Structure

All public pages live under `app/(public)/` directory in Next.js App Router structure.

### Component Reusability

Components are designed to be reusable across tenants:
- Content cards adapt to different content types
- Navigation adapts to tenant branding
- Search works across all content types

### Type Safety

All pages and components follow the six-layer type safety chain:
- UI components use hooks (Layer 6 → Layer 5)
- Hooks call API routes (Layer 5 → Layer 4)
- Routes call services (Layer 4 → Layer 3)
- Services use Zod types (Layer 3 → Layer 2)
- Zod schemas derived from database (Layer 2 → Layer 1)

**SSOT**: All TypeScript types are exported from Zod schemas (`lib/schemas/`) using `z.infer<>`

---

## Summary

### Core Public Pages

1. **Homepage** (`/`)
2. **Books** (`/books`, `/books/[slug]`)
3. **Articles** (`/articles`, `/articles/[slug]`)
4. **Videos** (`/videos`, `/videos/[slug]`)
5. **Search** (`/search`)
6. **About** (`/about`)
7. **Contact** (`/contact`)
8. **Privacy** (`/privacy`)
9. **Terms** (`/terms`)

### Core UI Modules

1. **Public Header** (navigation)
2. **Footer** (site links)
3. **Search Bar** (search functionality)
4. **Content Cards** (Book, Article, Course)
5. **Content Grid** (content listing)
6. **Reading Layout** (content reading)

### Optional Features

- Podcast pages
- Course pages (if not core)
- Assessment pages (if not core)
- Series pages
- Category pages
- Advanced search filters

---

**Remember**: This is a "bones" structure. Customize content and branding per tenant, but maintain the shared architecture and type safety chain.
