# Profile Workspace UI

A calm, editorial "profile workspace" experience for movement leaders to review their voice, audience, and content.

## Purpose

The Profile Workspace presents an interpretive profile of a leader's work across three dimensions:

1. **Author** - Reflective, biographical, voice-centric analysis
2. **Audience** - Interpretive memo on who finds them and why
3. **Content** - Inventory of published work with gentle suggestions

### Design Principles

- **Interpretation, not inspection** - Feels like reading, not a dashboard
- **No scoring** - No percentages, performance metrics, or optimization language
- **Progressive disclosure** - Collapsibles for "Why we think this" explanations
- **Revisable** - Built-in feedback mechanism for corrections
- **Explicit uncertainty** - "What we're uncertain about" is a feature

## Component Tree

```
app/(public)/profile-workspace/page.tsx
└── ProfileWorkspacePage.tsx (layout shell)
    ├── ProfileWorkspaceHeader.tsx
    │   ├── Title + Subtitle
    │   ├── Metadata row (last updated, sources count)
    │   ├── HowGeneratedModal.tsx (Dialog)
    │   └── FeedbackSheet.tsx link
    └── ProfileWorkspaceTabs.tsx (Tabs)
        ├── AuthorProfilePanel.tsx (Tab: Author)
        │   ├── Executive Summary
        │   ├── Core Themes (Badge chips + Cards)
        │   ├── Repeated Convictions (quotes + evidence)
        │   ├── Tensions You Hold
        │   ├── Language & Voice Notes
        │   └── "Does this sound like you?" (feedback trigger)
        ├── AudienceProfilePanel.tsx (Tab: Audience)
        │   ├── Who tends to find you
        │   ├── Why they trust you
        │   ├── What they're asking for (implicitly)
        │   ├── Barriers & Entry Points
        │   └── What we're uncertain about (uncertainty callout)
        └── ContentProfilePanel.tsx (Tab: Content)
            ├── What exists (Accordion groups)
            ├── Where it lives (platform list)
            ├── Underutilized assets
            └── Next sensible moves
```

## File Locations

| File | Path |
|------|------|
| Route | `app/(public)/profile-workspace/page.tsx` |
| Main component | `components/profile-workspace/ProfileWorkspacePage.tsx` |
| Header | `components/profile-workspace/ProfileWorkspaceHeader.tsx` |
| Tabs container | `components/profile-workspace/ProfileWorkspaceTabs.tsx` |
| Author panel | `components/profile-workspace/AuthorProfilePanel.tsx` |
| Audience panel | `components/profile-workspace/AudienceProfilePanel.tsx` |
| Content panel | `components/profile-workspace/ContentProfilePanel.tsx` |
| Modal | `components/profile-workspace/HowGeneratedModal.tsx` |
| Feedback sheet | `components/profile-workspace/FeedbackSheet.tsx` |
| **Sample data** | `lib/data/profile-workspace.sample.ts` |
| Index exports | `components/profile-workspace/index.ts` |

## Sample Data

Sample data lives at `lib/data/profile-workspace.sample.ts` and includes:

- `ProfileWorkspaceData` - Root type containing all profile data
- `AuthorProfileData` - Executive summary, themes, convictions, tensions, voice notes
- `AudienceProfileData` - Who finds them, trust signals, implicit asks, barriers/entry points
- `ContentProfileData` - Content inventory, locations, underutilized assets, next moves

### Type exports

```typescript
import type {
  ProfileWorkspaceData,
  AuthorProfileData,
  AudienceProfileData,
  ContentProfileData,
  ThemeItem,
  ConvictionItem,
  TensionItem,
  VoiceNote,
  ContentGroup,
  ContentItem,
  UnderutilizedAsset,
  NextMove,
} from '@/lib/data/profile-workspace.sample'
```

## Replacing Sample Data with Real Data

1. **Create a data fetching service** in `lib/services/` that returns `ProfileWorkspaceData`
2. **Update `ProfileWorkspacePage.tsx`** to fetch data server-side or via React Query
3. **Keep the sample data file** as a fallback/reference for the data shape

Example server component integration:

```typescript
// In ProfileWorkspacePage.tsx (convert to server component)
import { getProfileWorkspaceData } from '@/lib/services/profile-workspace'

export async function ProfileWorkspacePage({ userId }: { userId: string }) {
  const data = await getProfileWorkspaceData(userId)
  // ... rest of component
}
```

## Feedback Mechanism

The `FeedbackSheet` component:

1. Captures feedback context (Author/Audience/Content tab)
2. Collects user description of what's wrong
3. Optionally collects alternative source suggestions
4. Currently logs to console (MVP)

To enable persistence, create `POST /api/profile-feedback`:

```typescript
// app/api/profile-feedback/route.ts
export async function POST(request: Request) {
  const { context, feedback, alternativeSource } = await request.json()
  // Store in database or send to webhook
}
```

## Navigation

The Profile Workspace link is added to the "Explore" dropdown in `PublicNavigation.tsx`:

```typescript
{
  label: 'Profile Workspace',
  href: '/profile-workspace',
  icon: <User className="h-4 w-4" />,
  description: 'Your voice & work'
}
```

## UI Components Used

- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` (shadcn/ui)
- `Card`, `CardContent` (shadcn/ui)
- `Badge` (shadcn/ui)
- `Button` (shadcn/ui)
- `Separator` (shadcn/ui)
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` (shadcn/ui)
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` (shadcn/ui)
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle` (shadcn/ui)
- `Textarea` (shadcn/ui)
