# Onboarding Form Implementation Prompt
## Complete Type-Safe Multi-Step Onboarding Form

**Purpose**: Comprehensive prompt for implementing a type-safe, visually elegant onboarding form that collects all required information from leaders during onboarding.

**Status**: Implementation Prompt - Ready for Execution

**Visual Reference**: WeTransfer Quiz (dark theme, clean typography, minimalist aesthetic) blended with modern form best practices

---

## Visual Design Direction

### Aesthetic Foundation (Based on WeTransfer Quiz Reference)

**Color Scheme**:
- **Background**: Deep charcoal/dark grey (`#1A1A1A` or similar) with subtle gradients
- **Text**: High-contrast white/light grey for readability
- **Accents**: Subtle accent colors for interactive elements (buttons, links)
- **Borders**: Thin, subtle borders on inputs and cards

**Typography**:
- **Headings**: Bold serif font (large, high-contrast, generous letter spacing) for section titles
- **Body Text**: Clean sans-serif font (readable, medium weight) for labels and instructions
- **Input Text**: Sans-serif, clear and legible
- **Button Text**: Medium-weight sans-serif

**Layout**:
- **Centered content** with generous margins (4-6rem on desktop)
- **Progressive disclosure**: One section at a time, clear navigation
- **Minimal decoration**: Focus on content, not visual noise
- **Generous spacing**: Wide gutters, comfortable padding

**Interactive Elements**:
- **Buttons**: Rounded rectangular buttons with subtle borders, pill-like corners
- **Inputs**: Clean, minimal borders, subtle focus states
- **Progress indicator**: Visual progress through form sections
- **File uploads**: Drag-and-drop zones with clear visual feedback

---

## Required Libraries

Install the following packages before implementation:

```bash
# Form handling
pnpm add react-hook-form @hookform/resolvers

# File upload handling
pnpm add react-dropzone

# Multi-step form navigation
pnpm add zustand  # For form state management across steps

# Supabase client (if not already installed)
pnpm add @supabase/supabase-js

# UI components (if not already installed)
pnpm add @radix-ui/react-progress
pnpm add @radix-ui/react-select
pnpm add @radix-ui/react-checkbox
pnpm add @radix-ui/react-radio-group
pnpm add @radix-ui/react-textarea
pnpm add @radix-ui/react-label

# Icons (if not already installed)
pnpm add lucide-react
```

## Supabase Storage Setup

Before implementation, set up Supabase Storage:

1. **Create Storage Bucket**:
   - Go to Supabase Dashboard → Storage
   - Create bucket: `onboarding-files`
   - Set to **Private** (not public)
   - Enable RLS policies

2. **Configure RLS Policies** (see `multi-tenant-onboarding-architecture.md` for full policies):
   - Users can only upload to their organization's folder
   - Users can only read from their organization's folder

3. **Environment Variables**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # For server-side uploads
   ```

---

## Type Safety Chain Implementation

### CRITICAL: Follow the Six-Layer Chain

**Workflow**: Database → Zod → Services → Routes → Hooks → UI

**Never skip layers. Never work around the chain. Types flow downstream only.**

---

## Step 1: Layer 1 - Database Schema

**File**: `src/lib/database/schema.ts`

**Action**: Add `onboarding_responses` table to store all onboarding form data.

```typescript
import { pgTable, uuid, text, jsonb, timestamp, boolean } from 'drizzle-orm/pg-core';
import { id, createdAt, updatedAt } from '@/lib/database/helpers';
import { organizations } from './schema'; // Adjust import path as needed

export const onboardingResponses = pgTable('onboarding_responses', {
  id: id(),
  organizationId: uuid('organization_id').references(() => organizations.id).notNull(),
  
  // Voice & Content Samples
  bestWorkContent: jsonb('best_work_content'), // Array of content references
  bestWorkSelected: jsonb('best_work_selected'), // Selected items
  
  // Brand Assets
  brandColors: text('brand_colors'), // JSON string or comma-separated hex codes
  fontPreferences: text('font_preferences'),
  admiredWebsites: jsonb('admired_websites'), // Array of URLs
  siteFeelDescription: text('site_feel_description'), // 3-word description
  visitorFeeling: text('visitor_feeling'), // One sentence
  styleConstraints: jsonb('style_constraints'), // Object with constraints
  
  // Vision & Movemental Calling
  movementalStory: text('movemental_story'), // How he got into movemental leadership
  movementalConversation: text('movemental_conversation'), // What conversation he wishes was happening
  targetAudience: text('target_audience'), // Who needs to hear his voice
  threeYearImpact: text('three_year_impact'), // Impact in 3 years
  movementalCalling: text('movemental_calling'), // What he's called to do
  twelveMonthSuccess: text('twelve_month_success'), // Success in 12 months
  whatExcitesHim: text('what_excites_him'), // What excites him most
  
  // Audience Understanding
  whoToReach: text('who_to_reach'), // Demographics, roles, contexts
  audienceQuestions: jsonb('audience_questions'), // Array of questions
  currentContentLocations: jsonb('current_content_locations'), // Where audience finds content
  audienceNeeds: text('audience_needs'), // What audience struggles with
  
  // Content Inventory
  regularContentTypes: jsonb('regular_content_types'), // What content he creates regularly
  archiveContentToImport: jsonb('archive_content_to_import'), // Past content to make available
  existingBlogUrls: jsonb('existing_blog_urls'), // Array of URLs
  contentSources: jsonb('content_sources'), // Where content lives
  
  // Capacity & Timeline
  timePerWeek: text('time_per_week'), // Hours per week
  publishingCadence: text('publishing_cadence'), // How often to publish
  callAvailability: jsonb('call_availability'), // Preferred times
  timelineExpectations: text('timeline_expectations'), // When to launch
  
  // Goals & Concerns
  incomeGoal: text('income_goal'), // Revenue goals
  contentGoals: text('content_goals'), // What he wants to accomplish
  audienceGrowthGoals: text('audience_growth_goals'), // Subscriber targets
  digitalPublishingConcerns: text('digital_publishing_concerns'), // What worries him
  quitRiskFactors: text('quit_risk_factors'), // What would make him quit
  supportNeeds: text('support_needs'), // What support he needs most
  
  // Decisions & Approvals
  designReviewPreference: text('design_review_preference'), // Trust judgment, see options, or review all
  preferredDomain: text('preferred_domain'), // Custom domain preference
  domainOwnership: text('domain_ownership'), // Who owns domain
  emailSendingDomain: text('email_sending_domain'), // Email domain
  paymentProcessingPreferences: jsonb('payment_processing_preferences'), // Stripe info
  featurePreferences: jsonb('feature_preferences'), // Which features to enable
  networkParticipation: boolean('network_participation').default(true), // Opt-in to network
  networkCrossReferences: boolean('network_cross_references').default(true), // Permission to link
  networkDiscovery: boolean('network_discovery').default(true), // Permission to feature
  networkIntroductionPreferences: jsonb('network_introduction_preferences'), // Who to connect with
  collaborationInterests: text('collaboration_interests'), // What collaboration he's open to
  
  // Profile Information
  bio: text('bio'), // Professional biography
  photoUrl: text('photo_url'), // Author photo URL (after upload)
  socialMediaLinks: jsonb('social_media_links'), // Object with platform: URL
  email: text('email').notNull(), // For platform access
  contactInformation: jsonb('contact_information'), // For contact page
  
  // Status & Progress
  currentStep: text('current_step'), // Current step in form
  isComplete: boolean('is_complete').default(false), // Form completion status
  submittedAt: timestamp('submitted_at'), // When form was submitted
  
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

**Commands**:
```bash
pnpm drizzle:gen
# Review migration file
pnpm drizzle:push
pnpm db:check  # Must return "status": "LOCKED"
```

---

## Step 2: Layer 2 - Zod Schemas

**File**: `src/lib/schemas/index.ts`

**Action**: Add Zod schemas for onboarding responses.

```typescript
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { schema } from '@/lib/database/schema';
import { BaseFiltersSchema, IdSchema } from './base';

// Select Schema
export const OnboardingResponsesSelectSchema = createSelectSchema(schema.onboardingResponses);
export type OnboardingResponses = z.infer<typeof OnboardingResponsesSelectSchema>;

// Insert Schema (for creating new responses)
export const OnboardingResponsesInsertSchema = createInsertSchema(schema.onboardingResponses);
export type OnboardingResponsesCreate = z.infer<typeof OnboardingResponsesInsertSchema>;

// Update Schema (for updating existing responses)
export const OnboardingResponsesUpdateSchema = createUpdateSchema(schema.onboardingResponses);
export type OnboardingResponsesUpdate = z.infer<typeof OnboardingResponsesUpdateSchema>;

// Filters Schema
export const OnboardingResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  organizationId: IdSchema.optional(),
  isComplete: z.boolean().optional(),
  currentStep: z.string().optional(),
});
export type OnboardingResponsesFilters = z.infer<typeof OnboardingResponsesFiltersSchema>;

// Form-specific schemas for multi-step validation
export const VoiceContentSamplesSchema = z.object({
  bestWorkContent: z.array(z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(['sermon', 'talk', 'article', 'email', 'other']),
    url: z.string().url().optional(),
    file: z.instanceof(File).optional(),
  })).optional(),
  bestWorkSelected: z.array(z.string()).optional(), // IDs of selected items
});

export const BrandAssetsSchema = z.object({
  brandColors: z.string().optional(), // Comma-separated hex codes or JSON
  fontPreferences: z.string().optional(),
  admiredWebsites: z.array(z.string().url()).optional(),
  siteFeelDescription: z.string().min(1).max(50), // 3-word description
  visitorFeeling: z.string().min(1).max(200), // One sentence
  styleConstraints: z.object({
    dontUse: z.array(z.string()).optional(),
    mustInclude: z.array(z.string()).optional(),
    mustAvoid: z.array(z.string()).optional(),
  }).optional(),
});

export const VisionCallingSchema = z.object({
  movementalStory: z.string().min(50).max(2000),
  movementalConversation: z.string().min(20).max(500),
  targetAudience: z.string().min(20).max(500),
  threeYearImpact: z.string().min(20).max(500),
  movementalCalling: z.string().min(20).max(500),
  twelveMonthSuccess: z.string().min(20).max(500),
  whatExcitesHim: z.string().min(20).max(500),
});

export const AudienceUnderstandingSchema = z.object({
  whoToReach: z.string().min(20).max(500),
  audienceQuestions: z.array(z.string().min(10).max(200)),
  currentContentLocations: z.array(z.enum(['email', 'social', 'blog', 'sermons', 'other'])),
  audienceNeeds: z.string().min(20).max(500),
});

export const ContentInventorySchema = z.object({
  regularContentTypes: z.array(z.enum(['sermons', 'talks', 'emails', 'articles', 'videos', 'other'])),
  archiveContentToImport: z.string().optional(),
  existingBlogUrls: z.array(z.string().url()).optional(),
  contentSources: z.array(z.string()).optional(),
});

export const CapacityTimelineSchema = z.object({
  timePerWeek: z.string().min(1),
  publishingCadence: z.enum(['daily', 'weekly', 'bi-weekly', 'monthly', 'as-needed']),
  callAvailability: z.array(z.string()), // Array of preferred times
  timelineExpectations: z.string().min(1),
});

export const GoalsConcernsSchema = z.object({
  incomeGoal: z.string().optional(),
  contentGoals: z.string().min(20).max(500),
  audienceGrowthGoals: z.string().optional(),
  digitalPublishingConcerns: z.string().min(20).max(500),
  quitRiskFactors: z.string().min(20).max(500),
  supportNeeds: z.string().min(20).max(500),
});

export const DecisionsApprovalsSchema = z.object({
  designReviewPreference: z.enum(['trust-judgment', 'see-options', 'review-all']),
  preferredDomain: z.string().optional(),
  domainOwnership: z.string().optional(),
  emailSendingDomain: z.string().optional(),
  paymentProcessingPreferences: z.object({
    stripeAccountId: z.string().optional(),
  }).optional(),
  featurePreferences: z.array(z.string()).optional(),
  networkParticipation: z.boolean().default(true),
  networkCrossReferences: z.boolean().default(true),
  networkDiscovery: z.boolean().default(true),
  networkIntroductionPreferences: z.array(z.string()).optional(),
  collaborationInterests: z.string().optional(),
});

export const ProfileInformationSchema = z.object({
  bio: z.string().min(100).max(2000),
  photo: z.instanceof(File).optional(),
  socialMediaLinks: z.object({
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
  email: z.string().email(),
  contactInformation: z.object({
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
});

// Combined form schema for step-by-step validation
export const OnboardingFormSchema = z.object({
  step1: VoiceContentSamplesSchema,
  step2: BrandAssetsSchema,
  step3: VisionCallingSchema,
  step4: AudienceUnderstandingSchema,
  step5: ContentInventorySchema,
  step6: CapacityTimelineSchema,
  step7: GoalsConcernsSchema,
  step8: DecisionsApprovalsSchema,
  step9: ProfileInformationSchema,
});
```

**Commands**:
```bash
pnpm contracts:check  # Must return "status": "LOCKED"
```

---

## Step 3: Layer 3 - Services

**File**: `src/lib/services/simplified/onboardingResponses.ts`

**Action**: Create service methods for onboarding responses with tenant scoping.

**CRITICAL**: All methods must filter by `organizationId` for tenant isolation. See `multi-tenant-onboarding-architecture.md` for full tenant scoping details.

```typescript
import { db } from '@/lib/database';
import { schema } from '@/lib/database/schema';
import { eq, and } from 'drizzle-orm';
import type { 
  OnboardingResponsesCreate, 
  OnboardingResponsesUpdate, 
  OnboardingResponsesFilters 
} from '@/lib/schemas';

/**
 * Create onboarding response for a specific organization (tenant)
 * CRITICAL: organizationId must come from tenant context (middleware)
 */
export async function createOnboardingResponse(
  data: OnboardingResponsesCreate,
  organizationId: string  // From tenant context - NEVER trust client input
) {
  if (!organizationId) {
    throw new Error('Organization ID is required for tenant scoping');
  }
  
  const [response] = await db
    .insert(schema.onboardingResponses)
    .values({
      ...data,
      organizationId,  // ← Tenant scoping - CRITICAL
    })
    .returning();
  
  return response;
}

/**
 * Get onboarding response for a specific organization (tenant)
 * CRITICAL: Only returns data for the specified organizationId
 */
export async function getOnboardingResponse(
  organizationId: string  // From tenant context - NEVER trust client input
) {
  if (!organizationId) {
    throw new Error('Organization ID is required for tenant scoping');
  }
  
  const [response] = await db
    .select()
    .from(schema.onboardingResponses)
    .where(
      and(
        eq(schema.onboardingResponses.organizationId, organizationId),  // ← Tenant filter
        // ... other filters
      )
    )
    .limit(1);
  
  return response || null;
}

/**
 * Update onboarding response for a specific organization (tenant)
 * CRITICAL: Only updates data for the specified organizationId
 */
export async function updateOnboardingResponse(
  organizationId: string,  // From tenant context - NEVER trust client input
  data: OnboardingResponsesUpdate
) {
  if (!organizationId) {
    throw new Error('Organization ID is required for tenant scoping');
  }
  
  const [response] = await db
    .update(schema.onboardingResponses)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(schema.onboardingResponses.organizationId, organizationId),  // ← Tenant filter
        // ... other filters
      )
    )
    .returning();
  
  return response;
}

/**
 * Complete onboarding response for a specific organization (tenant)
 * CRITICAL: Only completes data for the specified organizationId
 */
export async function completeOnboardingResponse(
  organizationId: string  // From tenant context - NEVER trust client input
) {
  if (!organizationId) {
    throw new Error('Organization ID is required for tenant scoping');
  }
  
  const [response] = await db
    .update(schema.onboardingResponses)
    .set({
      isComplete: true,
      submittedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(schema.onboardingResponses.organizationId, organizationId),  // ← Tenant filter
        // ... other filters
      )
    )
    .returning();
  
  return response;
}
```

**Commands**:
```bash
pnpm services:check  # Must return "status": "LOCKED"
```

---

## Step 4: Layer 4 - Routes

**File**: `src/app/api/simplified/onboarding-responses/route.ts`

**Action**: Create API routes for onboarding responses with tenant context extraction.

**CRITICAL**: All routes must extract `organizationId` from tenant context (middleware), never from client input. See `multi-tenant-onboarding-architecture.md` for tenant resolution details.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getOrganizationId } from '@/lib/middleware/tenant'; // Tenant context helper
import {
  createOnboardingResponse,
  getOnboardingResponse,
  updateOnboardingResponse,
  completeOnboardingResponse,
} from '@/lib/services/simplified/onboardingResponses';
import {
  OnboardingResponsesInsertSchema,
  OnboardingResponsesUpdateSchema,
} from '@/lib/schemas';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // CRITICAL: Get organizationId from tenant context (middleware)
    // NEVER trust client input for organizationId
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return NextResponse.json(
        { error: 'No organization context found' },
        { status: 401 }
      );
    }
    
    // Service automatically filters by organizationId (tenant scoping)
    const response = await getOnboardingResponse(organizationId);
    
    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // CRITICAL: Get organizationId from tenant context (middleware)
    // NEVER trust client input for organizationId
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return NextResponse.json(
        { error: 'No organization context found' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validated = OnboardingResponsesInsertSchema.parse(body);
    
    // CRITICAL: organizationId comes from tenant context, not client input
    // Remove organizationId from validated data if present (security)
    const { organizationId: _, ...dataWithoutOrgId } = validated as any;
    
    const response = await createOnboardingResponse(
      dataWithoutOrgId,
      organizationId  // From tenant context
    );
    
    return NextResponse.json({ data: response }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // CRITICAL: Get organizationId from tenant context (middleware)
    // NEVER trust client input for organizationId
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return NextResponse.json(
        { error: 'No organization context found' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const validated = OnboardingResponsesUpdateSchema.parse(body);
    
    // CRITICAL: organizationId comes from tenant context, not client input
    // Remove organizationId from validated data if present (security)
    const { organizationId: _, ...dataWithoutOrgId } = validated as any;
    
    // Service automatically filters by organizationId (tenant scoping)
    const response = await updateOnboardingResponse(
      organizationId,  // From tenant context
      dataWithoutOrgId
    );
    
    return NextResponse.json({ data: response });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**File**: `src/app/api/simplified/onboarding-responses/complete/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getOrganizationId } from '@/lib/middleware';
import { completeOnboardingResponse } from '@/lib/services/simplified/onboardingResponses';

export async function POST(request: NextRequest) {
  try {
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const response = await completeOnboardingResponse(organizationId);
    
    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Commands**:
```bash
pnpm routes:check  # Must return "status": "LOCKED"
```

---

### File Upload Route (Supabase Storage)

**File**: `src/app/api/onboarding/upload/route.ts`

**Action**: Create file upload endpoint for onboarding files (photos, content samples) using Supabase Storage with tenant isolation.

**CRITICAL**: Files are stored in tenant-scoped folders: `onboarding-files/{organizationId}/{type}/{filename}`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getOrganizationId } from '@/lib/middleware/tenant';

export async function POST(request: NextRequest) {
  try {
    // CRITICAL: Get organizationId from tenant context (middleware)
    const organizationId = await getOrganizationId(request);
    if (!organizationId) {
      return NextResponse.json(
        { error: 'No organization context found' },
        { status: 401 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'photo' | 'content-sample'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    if (!['photo', 'content-sample'].includes(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }
    
    // Create Supabase client with service role key for admin access
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!  // Service role for server-side uploads
    );
    
    // Generate file path with tenant isolation
    const fileExt = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const fileName = `${timestamp}_${randomId}.${fileExt}`;
    const filePath = `${organizationId}/${fileType}/${fileName}`;  // ← Tenant-scoped path
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('onboarding-files')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });
    
    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      );
    }
    
    // Get public URL (or signed URL for private buckets)
    const { data: urlData } = supabase.storage
      .from('onboarding-files')
      .getPublicUrl(filePath);
    
    // For private buckets, use signed URL instead:
    // const { data: signedUrlData } = await supabase.storage
    //   .from('onboarding-files')
    //   .createSignedUrl(filePath, 3600); // 1 hour expiry
    
    return NextResponse.json({
      path: filePath,
      url: urlData.publicUrl,
      // signedUrl: signedUrlData?.signedUrl, // For private buckets
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Storage Bucket Setup** (Supabase Dashboard):
1. Go to **Storage** → Create bucket: `onboarding-files`
2. Set to **Private** (recommended for tenant isolation)
3. Configure RLS policies (see `multi-tenant-onboarding-architecture.md`)

---

## Step 5: Layer 5 - Hooks

**File**: `src/hooks/simplified/useOnboardingResponse.ts`

**Action**: Create React hooks for onboarding responses.

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  OnboardingResponses,
  OnboardingResponsesCreate,
  OnboardingResponsesUpdate,
} from '@/lib/schemas';

export function useOnboardingResponse() {
  return useQuery<OnboardingResponses | null>({
    queryKey: ['onboarding-response'],
    queryFn: async () => {
      const response = await fetch('/api/simplified/onboarding-responses');
      if (!response.ok) throw new Error('Failed to fetch onboarding response');
      const { data } = await response.json();
      return data;
    },
  });
}

export function useCreateOnboardingResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: OnboardingResponsesCreate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create onboarding response');
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-response'] });
    },
  });
}

export function useUpdateOnboardingResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: OnboardingResponsesUpdate) => {
      const response = await fetch('/api/simplified/onboarding-responses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update onboarding response');
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-response'] });
    },
  });
}

export function useCompleteOnboardingResponse() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/simplified/onboarding-responses/complete', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to complete onboarding response');
      const { data: result } = await response.json();
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-response'] });
    },
  });
}

/**
 * Hook for uploading onboarding files (photos, content samples) to Supabase Storage
 * Files are automatically scoped to the current tenant's organization
 */
export function useUploadOnboardingFile() {
  return useMutation({
    mutationFn: async ({ file, type }: { file: File; type: 'photo' | 'content-sample' }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      const response = await fetch('/api/onboarding/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload file');
      }
      
      const { data } = await response.json();
      return data;
    },
  });
}
```

**Commands**:
```bash
pnpm hooks:check  # Must return "status": "LOCKED"
```

---

## Step 6: Layer 6 - UI Components

**File**: `src/components/onboarding/OnboardingForm.tsx`

**Action**: Create the main onboarding form component with multi-step navigation.

### Visual Design Requirements

1. **Dark Theme**: Deep charcoal background (`#1A1A1A` or similar)
2. **Typography**: 
   - Section headings: Bold serif, large, high contrast
   - Body text: Clean sans-serif, readable
3. **Layout**: Centered content, generous margins, progressive disclosure
4. **Progress Indicator**: Visual progress bar showing current step
5. **Navigation**: Previous/Next buttons, clear step indicators
6. **File Uploads**: Drag-and-drop zones with visual feedback
7. **Form Fields**: Clean inputs with subtle borders, clear focus states

### Implementation

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOnboardingResponse, useUpdateOnboardingResponse } from '@/hooks/simplified/useOnboardingResponse';
import {
  VoiceContentSamplesSchema,
  BrandAssetsSchema,
  VisionCallingSchema,
  AudienceUnderstandingSchema,
  ContentInventorySchema,
  CapacityTimelineSchema,
  GoalsConcernsSchema,
  DecisionsApprovalsSchema,
  ProfileInformationSchema,
} from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Voice & Content', schema: VoiceContentSamplesSchema },
  { id: 2, title: 'Brand Assets', schema: BrandAssetsSchema },
  { id: 3, title: 'Vision & Calling', schema: VisionCallingSchema },
  { id: 4, title: 'Audience', schema: AudienceUnderstandingSchema },
  { id: 5, title: 'Content Inventory', schema: ContentInventorySchema },
  { id: 6, title: 'Capacity & Timeline', schema: CapacityTimelineSchema },
  { id: 7, title: 'Goals & Concerns', schema: GoalsConcernsSchema },
  { id: 8, title: 'Decisions & Approvals', schema: DecisionsApprovalsSchema },
  { id: 9, title: 'Profile Information', schema: ProfileInformationSchema },
] as const;

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { data: existingResponse, isLoading } = useOnboardingResponse();
  const updateResponse = useUpdateOnboardingResponse();
  
  const currentStepConfig = STEPS[currentStep - 1];
  const progress = (currentStep / STEPS.length) * 100;
  
  const form = useForm({
    resolver: zodResolver(currentStepConfig.schema),
    defaultValues: existingResponse || {},
  });
  
  const onSubmit = async (data: unknown) => {
    try {
      await updateResponse.mutateAsync({
        ...data,
        currentStep: currentStep.toString(),
      } as any);
      
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        form.reset();
      } else {
        // Complete onboarding
        // Handle completion
      }
    } catch (error) {
      console.error('Error saving step:', error);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Form Card */}
        <Card className="bg-[#2A2A2A] border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-serif tracking-wide">
              {currentStepConfig.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Render step-specific fields */}
              {renderStepFields(currentStep, form)}
              
              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-[#1A1A1A] hover:bg-gray-100"
                >
                  {currentStep === STEPS.length ? 'Complete' : 'Next'}
                  {currentStep < STEPS.length && (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function renderStepFields(step: number, form: any) {
  // Implement step-specific field rendering
  // This is a placeholder - implement each step's fields based on schemas
  switch (step) {
    case 1:
      return <VoiceContentStep form={form} />;
    case 2:
      return <BrandAssetsStep form={form} />;
    case 3:
      return <VisionCallingStep form={form} />;
    // ... implement all steps
    default:
      return null;
  }
}
```

### Step-Specific Components

Create individual step components for each section. Example for Step 1 (Voice & Content):

```typescript
'use client';

import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function VoiceContentStep({ form }: { form: any }) {
  const { register, watch, setValue } = useFormContext();
  
  const onDrop = (acceptedFiles: File[]) => {
    const currentFiles = watch('bestWorkContent') || [];
    setValue('bestWorkContent', [
      ...currentFiles,
      ...acceptedFiles.map(file => ({
        id: crypto.randomUUID(),
        title: file.name,
        type: 'other' as const,
        file,
      })),
    ]);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.mov'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.doc', '.docx'],
    },
  });
  
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg mb-4 block">
          Select Your Best Work
        </Label>
        <p className="text-sm text-gray-400 mb-4">
          Upload or link to 2-3 pieces of content that best represent your voice and perspective.
        </p>
        
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-white bg-gray-800' : 'hover:border-gray-500'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-300">
            {isDragActive
              ? 'Drop files here'
              : 'Drag and drop files here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Audio, video, PDF, or text files
          </p>
        </div>
      </div>
      
      {/* Display selected files */}
      {watch('bestWorkContent')?.length > 0 && (
        <div className="space-y-2">
          {watch('bestWorkContent').map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-gray-400" />
                <span className="text-white">{item.title}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const current = watch('bestWorkContent') || [];
                  setValue(
                    'bestWorkContent',
                    current.filter((f: any) => f.id !== item.id)
                  );
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Commands**:
```bash
pnpm ui:check  # Must return "status": "LOCKED"
```

---

## Form Questions (Based on Input Checklist)

### Step 1: Voice & Content Samples
- File upload for best work (sermons, talks, articles)
- Selection interface to choose from uploaded content

### Step 2: Brand Assets
- Brand colors input (hex codes or "use defaults")
- Font preferences
- 2-3 admired websites (URL inputs)
- 3-word site feel description
- One sentence visitor feeling
- Style constraints (optional)

### Step 3: Vision & Movemental Calling
- Movemental story (textarea, 50-2000 chars)
- Movemental conversation wish (textarea, 20-500 chars)
- Target audience (textarea, 20-500 chars)
- 3-year impact vision (textarea, 20-500 chars)
- Movemental calling (textarea, 20-500 chars)
- 12-month success (textarea, 20-500 chars)
- What excites him (textarea, 20-500 chars)

### Step 4: Audience Understanding
- Who to reach (textarea, 20-500 chars)
- Audience questions (dynamic array of text inputs)
- Current content locations (multi-select checkboxes)
- Audience needs (textarea, 20-500 chars)

### Step 5: Content Inventory
- Regular content types (multi-select checkboxes)
- Archive content to import (textarea, optional)
- Existing blog URLs (dynamic array of URL inputs)
- Content sources (dynamic array of text inputs)

### Step 6: Capacity & Timeline
- Time per week (text input)
- Publishing cadence (select dropdown)
- Call availability (multi-select or time picker)
- Timeline expectations (text input)

### Step 7: Goals & Concerns
- Income goal (text input, optional)
- Content goals (textarea, 20-500 chars)
- Audience growth goals (text input, optional)
- Digital publishing concerns (textarea, 20-500 chars)
- Quit risk factors (textarea, 20-500 chars)
- Support needs (textarea, 20-500 chars)

### Step 8: Decisions & Approvals
- Design review preference (radio buttons: trust judgment, see options, review all)
- Preferred domain (text input, optional)
- Domain ownership (text input, optional)
- Email sending domain (text input, optional)
- Payment processing preferences (object input)
- Feature preferences (multi-select checkboxes)
- Network participation (checkbox, default true)
- Network cross-references (checkbox, default true)
- Network discovery (checkbox, default true)
- Network introduction preferences (dynamic array)
- Collaboration interests (textarea, optional)

### Step 9: Profile Information
- Bio (textarea, 100-2000 chars, required)
- Photo upload (file input)
- Social media links (object with platform: URL)
- Email (email input, required)
- Contact information (object, optional)

---

## Validation & Error Handling

- All fields validated using Zod schemas
- Real-time validation feedback
- Clear error messages
- Progress saved automatically on each step
- Form state persisted across page refreshes

---

## Final Validation

After completing all layers:

```bash
pnpm validate:all
```

All layers must return `"status": "LOCKED"` before the form is considered complete.

---

## Related Documents

- `brad-brisco-input-checklist.md` - Complete list of required inputs
- `launch-day-readiness-checklist.md` - What must be true on launch day
- `multi-tenant-onboarding-architecture.md` - **CRITICAL**: Multi-tenant architecture and tenant scoping
- `08_CHAIN_WORKFLOW_CHECKLIST.md` - Type safety chain workflow
- `07_LAYER_6_UI.md` - UI component patterns
- `09_MULTI_TENANT_NOTES.md` - General multi-tenant patterns

---

## Multi-Tenant Security Checklist

Before implementation, ensure:

- [ ] `onboarding_responses` table includes `organization_id` foreign key
- [ ] All service methods filter by `organizationId` (tenant scoping)
- [ ] All API routes extract `organizationId` from tenant context (never from client)
- [ ] RLS policies configured for `onboarding_responses` table
- [ ] Storage bucket `onboarding-files` created in Supabase
- [ ] RLS policies configured for storage bucket
- [ ] Tenant context helper (`getOrganizationId`) implemented
- [ ] File uploads use tenant-scoped paths: `{organizationId}/{type}/{filename}`
- [ ] No `organizationId` accepted from client input (security)

**See `multi-tenant-onboarding-architecture.md` for complete multi-tenant implementation details.**

---

**Document Status**: Implementation Prompt - Ready for Execution  
**Last Updated**: January 2026  
**Multi-Tenant**: ✅ Documented and integrated
